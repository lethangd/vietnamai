"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { formatVnd } from "@/lib/money";
import { slugify } from "@/lib/slug";
import {
  adminDeleteProduct,
  adminListCategories,
  adminListProducts,
  adminUpsertProduct
} from "@/lib/supabase/adminQueries";
import { uploadProductImage } from "@/lib/supabase/storage";
import type { Category, Product } from "@/types/domain";
import { useEffect, useMemo, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [rows, setRows] = useState<Product[]>([]);
  const [q, setQ] = useState("");

  const [editId, setEditId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [descriptionHtml, setDescriptionHtml] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const canSave = useMemo(() => {
    return name.trim().length > 0 && slug.trim().length > 0 && price > 0;
  }, [name, slug, price]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter((p) => `${p.name} ${p.slug}`.toLowerCase().includes(needle));
  }, [q, rows]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const [cats, products] = await Promise.all([adminListCategories(), adminListProducts()]);
      setCategories(cats);
      setRows(products);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không tải được dữ liệu");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  function startCreate() {
    setEditId(null);
    setName("");
    setSlug("");
    setQuantity(0);
    setCategoryId("");
    setPrice(0);
    setDiscount(0);
    setDescriptionHtml("<p></p>");
    setImageUrl("");
    setImageFile(null);
  }

  function startEdit(p: Product) {
    setEditId(p.id);
    setName(p.name);
    setSlug(p.slug);
    setQuantity(p.quantity);
    setCategoryId(p.category_id ?? "");
    setPrice(p.price_vnd);
    setDiscount(p.discount_percent);
    setDescriptionHtml(p.description_html ?? "");
    setImageUrl(p.image_url ?? "");
    setImageFile(null);
  }

  async function onSave() {
    if (!canSave) return;
    setSaving(true);
    setError(null);
    try {
      const saved = await adminUpsertProduct({
        id: editId ?? undefined,
        name: name.trim(),
        slug: slug.trim(),
        quantity,
        category_id: categoryId || null,
        price_vnd: price,
        discount_percent: discount,
        description_html: descriptionHtml,
        image_url: imageUrl || null
      });

      // Upload ảnh nếu có file, sau đó update URL
      if (saved?.id && imageFile) {
        const uploaded = await uploadProductImage(imageFile, saved.id);
        await adminUpsertProduct({
          id: saved.id,
          image_url: uploaded.publicUrl,
          image_path: uploaded.path
        } as any);
      }

      await load();
      startCreate();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lưu thất bại");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Xóa sản phẩm này?")) return;
    setError(null);
    try {
      await adminDeleteProduct(id);
      await load();
      if (editId === id) startCreate();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Xóa thất bại");
    }
  }

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="text-lg font-semibold text-zinc-50">Sản phẩm</div>
        <div className="mt-2 text-sm text-zinc-300">
          Mô tả lưu dạng <span className="text-gold-200">HTML string</span>. Ảnh upload lên
          Supabase Storage bucket <span className="text-gold-200">product-images</span>.
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[1fr_420px]">
        <Card className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm font-semibold text-zinc-50">Danh sách</div>
            <div className="flex gap-2">
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm…" className="w-56" />
              <Button variant="outline" onClick={startCreate}>
                + Thêm mới
              </Button>
            </div>
          </div>

          <div className="mt-4">
            {loading ? (
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <Spinner /> Đang tải…
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-sm text-zinc-300">Chưa có sản phẩm.</div>
            ) : (
              <div className="space-y-2">
                {filtered.map((p) => {
                  const cat = categories.find((c) => c.id === p.category_id)?.name ?? "Khác";
                  return (
                    <div
                      key={p.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                    >
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-zinc-100">{p.name}</div>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <Badge>{cat}</Badge>
                          {p.discount_percent > 0 ? (
                            <Badge className="border-gold-400/30 bg-gold-400/10 text-gold-200">
                              -{p.discount_percent}%
                            </Badge>
                          ) : null}
                          <Badge>{formatVnd(p.price_vnd)}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" onClick={() => startEdit(p)}>
                          Sửa
                        </Button>
                        <Button variant="outline" onClick={() => void onDelete(p.id)}>
                          Xóa
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-sm font-semibold text-zinc-50">
            {editId ? "Sửa sản phẩm" : "Thêm sản phẩm"}
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <div className="mb-1 text-xs text-zinc-300">Tên</div>
              <Input
                value={name}
                onChange={(e) => {
                  const v = e.target.value;
                  setName(v);
                  if (!editId) setSlug(slugify(v));
                }}
              />
            </div>

            <div>
              <div className="mb-1 text-xs text-zinc-300">Slug</div>
              <Input value={slug} onChange={(e) => setSlug(slugify(e.target.value))} />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="mb-1 text-xs text-zinc-300">Số lượng</div>
                <Input
                  value={String(quantity)}
                  onChange={(e) => setQuantity(Number(e.target.value || 0))}
                  inputMode="numeric"
                />
              </div>
              <div>
                <div className="mb-1 text-xs text-zinc-300">Giảm giá (%)</div>
                <Input
                  value={String(discount)}
                  onChange={(e) => setDiscount(Math.max(0, Math.min(100, Number(e.target.value || 0))))}
                  inputMode="numeric"
                />
              </div>
            </div>

            <div>
              <div className="mb-1 text-xs text-zinc-300">Thể loại</div>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300/60"
              >
                <option value="">(Không)</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="mb-1 text-xs text-zinc-300">Giá (VND)</div>
              <Input
                value={String(price)}
                onChange={(e) => setPrice(Math.max(0, Number(e.target.value || 0)))}
                inputMode="numeric"
              />
            </div>

            <div>
              <div className="mb-1 text-xs text-zinc-300">Ảnh (upload)</div>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              />
              <div className="mt-1 text-xs text-zinc-500">
                Nếu upload file, hệ thống sẽ tự cập nhật `image_url`.
              </div>
            </div>

            <div>
              <div className="mb-1 text-xs text-zinc-300">Ảnh URL (tuỳ chọn)</div>
              <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            </div>

            <div>
              <div className="mb-1 text-xs text-zinc-300">Mô tả (HTML)</div>
              <textarea
                value={descriptionHtml}
                onChange={(e) => setDescriptionHtml(e.target.value)}
                className="min-h-40 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300/60"
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

