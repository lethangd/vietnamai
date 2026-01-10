"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { formatVnd } from "@/lib/money";
import {
  adminDeleteOrder,
  adminListOrders,
  adminUpsertOrder
} from "@/lib/supabase/adminQueries";
import type { Order } from "@/types/domain";
import { isAfter, isBefore, parseISO } from "date-fns";
import { useEffect, useMemo, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<Order[]>([]);

  // filters
  const [q, setQ] = useState("");
  const [purchaseFrom, setPurchaseFrom] = useState("");
  const [purchaseTo, setPurchaseTo] = useState("");
  const [expiryFrom, setExpiryFrom] = useState("");
  const [expiryTo, setExpiryTo] = useState("");

  // editor
  const [editId, setEditId] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [supporterName, setSupporterName] = useState("");
  const [accountType, setAccountType] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [margin, setMargin] = useState<number>(0);
  const [notes, setNotes] = useState("");

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await adminListOrders();
      setRows(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không tải được dữ liệu");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const pFrom = purchaseFrom ? parseISO(purchaseFrom) : null;
    const pTo = purchaseTo ? parseISO(purchaseTo) : null;
    const eFrom = expiryFrom ? parseISO(expiryFrom) : null;
    const eTo = expiryTo ? parseISO(expiryTo) : null;

    return rows.filter((r) => {
      const hay = `${r.customer_name} ${r.supporter_name ?? ""} ${r.account_type}`.toLowerCase();
      const okQ = needle ? hay.includes(needle) : true;

      const pd = parseISO(r.purchase_date);
      const ed = parseISO(r.expiry_date);

      const okPurchase =
        (!pFrom || !isBefore(pd, pFrom)) && (!pTo || !isAfter(pd, pTo));
      const okExpiry = (!eFrom || !isBefore(ed, eFrom)) && (!eTo || !isAfter(ed, eTo));

      return okQ && okPurchase && okExpiry;
    });
  }, [rows, q, purchaseFrom, purchaseTo, expiryFrom, expiryTo]);

  function startCreate() {
    setEditId(null);
    setCustomerName("");
    setSupporterName("");
    setAccountType("");
    setPurchaseDate("");
    setExpiryDate("");
    setPrice(0);
    setMargin(0);
    setNotes("");
  }

  function startEdit(o: Order) {
    setEditId(o.id);
    setCustomerName(o.customer_name);
    setSupporterName(o.supporter_name ?? "");
    setAccountType(o.account_type);
    setPurchaseDate(o.purchase_date);
    setExpiryDate(o.expiry_date);
    setPrice(o.price_vnd);
    setMargin(o.margin_vnd);
    setNotes(o.notes ?? "");
  }

  const canSave = useMemo(() => {
    return (
      customerName.trim().length > 0 &&
      accountType.trim().length > 0 &&
      purchaseDate.length === 10 &&
      expiryDate.length === 10 &&
      price >= 0 &&
      margin >= 0
    );
  }, [customerName, accountType, purchaseDate, expiryDate, price, margin]);

  async function onSave() {
    if (!canSave) return;
    setSaving(true);
    setError(null);
    try {
      await adminUpsertOrder({
        id: editId ?? undefined,
        customer_name: customerName.trim(),
        supporter_name: supporterName.trim() || null,
        account_type: accountType.trim(),
        purchase_date: purchaseDate,
        expiry_date: expiryDate,
        price_vnd: price,
        margin_vnd: margin,
        notes: notes.trim() || null
      });
      await load();
      startCreate();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lưu thất bại");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Xóa đơn hàng này?")) return;
    setError(null);
    try {
      await adminDeleteOrder(id);
      await load();
      if (editId === id) startCreate();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Xóa thất bại");
    }
  }

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="text-lg font-semibold text-zinc-50">Đơn hàng</div>
        <div className="mt-2 text-sm text-zinc-300">
          Admin tự nhập đơn hàng. Có filter theo{" "}
          <span className="text-gold-200">ngày mua</span> và{" "}
          <span className="text-gold-200">ngày hết hạn</span>.
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[1fr_420px]">
        <Card className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm font-semibold text-zinc-50">Danh sách & Filter</div>
            <Button variant="outline" onClick={startCreate}>
              + Thêm mới
            </Button>
          </div>

          <div className="mt-4 grid gap-2 md:grid-cols-2">
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm theo tên/supporter/loại tk…" />
            <div className="grid grid-cols-2 gap-2">
              <Input type="date" value={purchaseFrom} onChange={(e) => setPurchaseFrom(e.target.value)} />
              <Input type="date" value={purchaseTo} onChange={(e) => setPurchaseTo(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-2 md:col-span-2">
              <Input type="date" value={expiryFrom} onChange={(e) => setExpiryFrom(e.target.value)} />
              <Input type="date" value={expiryTo} onChange={(e) => setExpiryTo(e.target.value)} />
            </div>
            <div className="text-xs text-zinc-500 md:col-span-2">
              Filter ngày mua: (from → to). Filter ngày hết hạn: (from → to).
            </div>
          </div>

          <div className="mt-4">
            {loading ? (
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <Spinner /> Đang tải…
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-sm text-zinc-300">Không có dữ liệu phù hợp.</div>
            ) : (
              <div className="space-y-2">
                {filtered.map((o) => (
                  <div
                    key={o.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-zinc-100">
                        {o.customer_name} — {o.account_type}
                      </div>
                      <div className="mt-1 text-xs text-zinc-400">
                        Mua: {o.purchase_date} • Hết: {o.expiry_date} • Giá:{" "}
                        <span className="text-zinc-200">{formatVnd(o.price_vnd)}</span> • Lãi:{" "}
                        <span className="text-gold-200">{formatVnd(o.margin_vnd)}</span>
                      </div>
                      {o.supporter_name ? (
                        <div className="mt-1 text-xs text-zinc-500">
                          Supporter: {o.supporter_name}
                        </div>
                      ) : null}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" onClick={() => startEdit(o)}>
                        Sửa
                      </Button>
                      <Button variant="outline" onClick={() => void onDelete(o.id)}>
                        Xóa
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-sm font-semibold text-zinc-50">
            {editId ? "Sửa đơn hàng" : "Thêm đơn hàng"}
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <div className="mb-1 text-xs text-zinc-300">Tên khách hàng</div>
              <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            </div>
            <div>
              <div className="mb-1 text-xs text-zinc-300">Tên supporter</div>
              <Input value={supporterName} onChange={(e) => setSupporterName(e.target.value)} placeholder="(tuỳ chọn)" />
            </div>
            <div>
              <div className="mb-1 text-xs text-zinc-300">Loại tài khoản</div>
              <Input value={accountType} onChange={(e) => setAccountType(e.target.value)} placeholder="VD: Pro / Enterprise / ..." />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="mb-1 text-xs text-zinc-300">Ngày mua</div>
                <Input type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} />
              </div>
              <div>
                <div className="mb-1 text-xs text-zinc-300">Ngày hết hạn</div>
                <Input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="mb-1 text-xs text-zinc-300">Giá (VND)</div>
                <Input value={String(price)} onChange={(e) => setPrice(Math.max(0, Number(e.target.value || 0)))} inputMode="numeric" />
              </div>
              <div>
                <div className="mb-1 text-xs text-zinc-300">Biên lợi nhuận (VND)</div>
                <Input value={String(margin)} onChange={(e) => setMargin(Math.max(0, Number(e.target.value || 0)))} inputMode="numeric" />
              </div>
            </div>

            <div>
              <div className="mb-1 text-xs text-zinc-300">Ghi chú</div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-24 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300/60"
              />
            </div>

            {error ? (
              <div className="rounded-xl border border-lacquer-400/30 bg-lacquer-500/10 px-3 py-2 text-xs text-lacquer-200">
                {error}
              </div>
            ) : null}

            <Button className="w-full" onClick={() => void onSave()} disabled={!canSave || saving}>
              {saving ? (
                <>
                  <Spinner /> Đang lưu…
                </>
              ) : (
                "Lưu"
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

