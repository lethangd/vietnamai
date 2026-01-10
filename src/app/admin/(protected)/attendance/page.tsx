"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import {
  adminListProfiles,
  adminListTimeEntries,
  adminUpdateTimeEntry
} from "@/lib/supabase/adminQueries";
import type { Profile, TimeEntry } from "@/types/domain";
import { isAfter, isBefore, parseISO } from "date-fns";
import { useEffect, useMemo, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [rows, setRows] = useState<TimeEntry[]>([]);

  const [staffId, setStaffId] = useState<string>("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const [p, t] = await Promise.all([adminListProfiles(), adminListTimeEntries()]);
      setProfiles(p);
      setRows(t);
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
    const dFrom = from ? parseISO(from) : null;
    const dTo = to ? parseISO(to) : null;
    return rows.filter((r) => {
      const okStaff = staffId === "all" ? true : r.staff_user_id === staffId;
      const d = new Date(r.check_in_at);
      const okDate = (!dFrom || !isBefore(d, dFrom)) && (!dTo || !isAfter(d, dTo));
      return okStaff && okDate;
    });
  }, [rows, staffId, from, to]);

  const profileMap = useMemo(() => {
    return new Map(profiles.map((p) => [p.id, p]));
  }, [profiles]);

  async function forceCheckout(id: string) {
    if (!confirm("Force check-out cho bản ghi này?")) return;
    try {
      await adminUpdateTimeEntry({ id, check_out_at: new Date().toISOString() });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update thất bại");
    }
  }

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="text-lg font-semibold text-zinc-50">Chấm công (Admin)</div>
        <div className="mt-2 text-sm text-zinc-300">
          Xem lịch sử check-in/check-out của staff, filter theo người và ngày.
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="text-sm font-semibold text-zinc-50">Filter</div>
          <div className="flex flex-wrap gap-2">
            <select
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
              className="h-10 rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300/60"
            >
              <option value="all">Tất cả staff</option>
              {profiles.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.display_name || p.id.slice(0, 8)}
                </option>
              ))}
            </select>
            <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
            <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <div className="text-sm font-semibold text-zinc-50">Bảng chấm công</div>

        <div className="mt-4">
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-zinc-300">
              <Spinner /> Đang tải…
            </div>
          ) : error ? (
            <div className="text-sm text-lacquer-200">{error}</div>
          ) : filtered.length === 0 ? (
            <div className="text-sm text-zinc-300">Chưa có dữ liệu.</div>
          ) : (
            <div className="space-y-2">
              {filtered.map((r) => {
                const p = profileMap.get(r.staff_user_id);
                const active = !r.check_out_at;
                return (
                  <div
                    key={r.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-zinc-100">
                        {p?.display_name || r.staff_user_id.slice(0, 8)}{" "}
                        <span className="text-xs font-normal text-zinc-500">(staff)</span>
                      </div>
                      <div className="mt-1 text-xs text-zinc-400">
                        In: {new Date(r.check_in_at).toLocaleString("vi-VN")} • Out:{" "}
                        {r.check_out_at ? new Date(r.check_out_at).toLocaleString("vi-VN") : "—"}
                      </div>
                      {active ? (
                        <div className="mt-1 text-xs text-gold-200">Đang làm (chưa check-out)</div>
                      ) : null}
                    </div>
                    {active ? (
                      <Button variant="outline" onClick={() => void forceCheckout(r.id)}>
                        Force check-out
                      </Button>
                    ) : null}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Card>

      <Card className="p-5">
        <div className="text-sm font-semibold text-zinc-50">Danh sách staff</div>
        <div className="mt-2 text-xs text-zinc-400">
          DB chỉ lưu staff. Admin đăng nhập bằng ENV nên không có trong DB.
        </div>

        <div className="mt-4 grid gap-2">
          {profiles.map((p) => (
            <div
              key={p.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-zinc-100">
                  {p.display_name || p.id.slice(0, 8)}
                </div>
                <div className="truncate text-xs text-zinc-500">{p.id}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

