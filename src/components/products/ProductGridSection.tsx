"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { applyDiscount, formatVnd } from "@/lib/money";
import { fetchPublicCatalog } from "@/lib/supabase/publicQueries";
import type { Category, Product } from "@/types/domain";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export function ProductGridSection() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function run() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchPublicCatalog();
        setCategories(res.categories);
        setProducts(res.products);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Không tải được dữ liệu");
      } finally {
        setLoading(false);
      }
    }
    void run();
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return products.filter((p) => {
      const okCategory = category === "all" ? true : p.category_id === category;
      const okQuery = needle
        ? `${p.name} ${p.slug}`.toLowerCase().includes(needle)
        : true;
      return okCategory && okQuery;
    });
  }, [q, category, products]);

  return (
    <section id="san-pham">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-zinc-50 md:text-2xl">Sản phẩm</h2>
          <p className="mt-1 text-sm text-zinc-300">
            Chọn gói phù hợp — bấm vào để xem chi tiết.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm theo tên…"
            className="w-56"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-10 rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300/60"
          >
            <option value="all">Tất cả thể loại</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-zinc-300">
            <Spinner /> Đang tải sản phẩm…
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-lacquer-400/30 bg-lacquer-500/10 px-4 py-3 text-sm text-lacquer-200">
            {error}
          </div>
        ) : null}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => {
          const finalPrice = applyDiscount(p.price_vnd, p.discount_percent);
          const hasDiscount = p.discount_percent > 0;
          const cat = categories.find((c) => c.id === p.category_id)?.name ?? "Khác";
          return (
            <Link key={p.id} href={`/products/${p.slug}`} className="group">
              <Card className="h-full overflow-hidden p-4 transition hover:border-white/20 hover:bg-black/45">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-lacquer-700/25 to-gold-500/15">
                  {p.image_url ? (
                    <Image
                      src={p.image_url}
                      alt={p.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-zinc-300">
                      (Ảnh sản phẩm)
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-base font-semibold text-zinc-50">
                      {p.name}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <Badge>{cat}</Badge>
                      {hasDiscount ? (
                        <Badge className="border-gold-400/30 bg-gold-400/10 text-gold-200">
                          Giảm {p.discount_percent}%
                        </Badge>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <div className="text-sm text-zinc-300">Giá</div>
                  <div className="text-right">
                    {hasDiscount ? (
                      <div className="text-xs text-zinc-500 line-through">
                        {formatVnd(p.price_vnd)}
                      </div>
                    ) : null}
                    <div className="text-lg font-semibold text-gold-200">
                      {formatVnd(finalPrice)}
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-xs text-zinc-400">
                  Còn lại: <span className="text-zinc-200">{p.quantity}</span>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

