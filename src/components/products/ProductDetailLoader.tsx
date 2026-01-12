"use client";

import { ProductDetailClient } from "@/components/products/ProductDetailClient";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import {
  fetchCategoryById,
  fetchProductBySlug,
  fetchSettings
} from "@/lib/supabase/publicQueries";
import type { Category, Product, Settings } from "@/types/domain";
import Link from "next/link";
import { useEffect, useState } from "react";

export function ProductDetailLoader({ slug }: { slug: string }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    async function run() {
      setLoading(true);
      setError(null);
      try {
        const p = await fetchProductBySlug(slug);
        if (!p) {
          setProduct(null);
          return;
        }
        setProduct(p);
        const [cat, set] = await Promise.all([
          p.category_id ? fetchCategoryById(p.category_id) : Promise.resolve(null),
          fetchSettings()
        ]);
        setCategory(cat);
        setSettings(set);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Không tải được dữ liệu");
      } finally {
        setLoading(false);
      }
    }
    void run();
  }, [slug]);

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
        <div className="flex items-center gap-2 text-sm text-zinc-300">
          <Spinner /> Đang tải…
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
        <Card className="p-5">
          <div className="text-sm text-lacquer-200">{error}</div>
          <div className="mt-3 text-sm">
            <Link href="/" className="text-gold-200 hover:underline">
              ← Về trang chủ
            </Link>
          </div>
        </Card>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
        <Card className="p-5">
          <div className="text-lg font-semibold text-zinc-50">Không tìm thấy</div>
          <div className="mt-2 text-sm text-zinc-300">
            Sản phẩm không tồn tại hoặc đã bị ẩn/xóa.
          </div>
          <div className="mt-4 text-sm">
            <Link href="/" className="text-gold-200 hover:underline">
              ← Về trang chủ
            </Link>
          </div>
        </Card>
      </main>
    );
  }

  return (
    <ProductDetailClient 
      product={product} 
      categoryName={category?.name} 
      settings={settings} 
    />
  );
}

