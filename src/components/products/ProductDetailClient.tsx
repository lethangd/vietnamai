"use client";

import { FloatingContactButtons } from "@/components/contact/FloatingContactButtons";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { applyDiscount, formatVnd } from "@/lib/money";
import type { Category, Product, Settings } from "@/types/domain";
import DOMPurify from "dompurify";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

type Props = {
  product: Product;
  category?: Category | null;
  settings?: Settings | null;
};

export function ProductDetailClient({ product, category, settings }: Props) {
  const sanitized = useMemo(() => {
    // Important: mô tả lưu HTML, phải sanitize trước khi render để tránh XSS.
    return DOMPurify.sanitize(product.description_html ?? "");
  }, [product.description_html]);

  const finalPrice = applyDiscount(product.price_vnd, product.discount_percent);
  const hasDiscount = product.discount_percent > 0;

  return (
    <>
      <FloatingContactButtons
        zaloUrl={settings?.zalo_url ?? null}
        telegramUrl={settings?.telegram_url ?? null}
      />

      <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-12">
        <div className="mb-5 text-sm text-zinc-400">
          <Link href="/" className="hover:text-zinc-200">
            Trang chủ
          </Link>{" "}
          / <span className="text-zinc-200">{product.name}</span>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr] lg:items-start">
          <Card className="overflow-hidden p-4">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-lacquer-700/25 to-gold-500/15">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-zinc-300">
                  (Ảnh sản phẩm)
                </div>
              )}
            </div>
          </Card>

          <div className="space-y-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {category?.name ? <Badge>{category.name}</Badge> : null}
                {hasDiscount ? (
                  <Badge className="border-gold-400/30 bg-gold-400/10 text-gold-200">
                    Giảm {product.discount_percent}%
                  </Badge>
                ) : null}
                <Badge>Còn: {product.quantity}</Badge>
              </div>
              <h1 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
                {product.name}
              </h1>
            </div>

            <Card className="p-4">
              <div className="flex items-baseline justify-between gap-4">
                <div className="text-sm text-zinc-300">Giá</div>
                <div className="text-right">
                  {hasDiscount ? (
                    <div className="text-xs text-zinc-500 line-through">
                      {formatVnd(product.price_vnd)}
                    </div>
                  ) : null}
                  <div className="text-2xl font-semibold text-gold-200">
                    {formatVnd(finalPrice)}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="text-sm font-semibold text-zinc-50">Mô tả</div>
              <div
                className="prose prose-invert mt-3 max-w-none prose-a:text-gold-200 prose-strong:text-zinc-50"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: sanitized }}
              />
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}

