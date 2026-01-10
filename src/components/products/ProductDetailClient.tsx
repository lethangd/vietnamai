"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { applyDiscount, formatVnd } from "@/lib/money";
import type { Product, Settings } from "@/types/domain";
import { motion } from "framer-motion";
import { Check, Sparkles, MessageCircle, Send, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: Product;
  settings: Settings | null;
  categoryName?: string;
};

/**
 * Product Detail Client - Chi tiết sản phẩm
 * CTA Zalo/Telegram đẹp, chuyên nghiệp, đồng bộ
 */
export function ProductDetailClient({ product, settings, categoryName }: Props) {
  const finalPrice = applyDiscount(product.price_vnd, product.discount_percent);
  const hasDiscount = product.discount_percent > 0;

  return (
    <main className="relative min-h-screen py-12 md:py-16">
      {/* Background với drum pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-lacquer-950/20 to-black">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "url('/images/drum-background.png')",
            backgroundSize: "800px",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat",
            mixBlendMode: "luminosity",
          }}
        />
      </div>

      {/* Back button */}
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <Link
          href="/#san-pham"
          className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-gold-400"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Quay lại
        </Link>
      </div>

      {/* Main content */}
      <div className="mx-auto mt-8 max-w-6xl px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          {/* Left: Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Product image */}
            {product.image_url && (
              <Card className="relative mb-8 aspect-video w-full overflow-hidden border-zinc-800 bg-gradient-to-br from-zinc-900/50 to-black">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </Card>
            )}

            {/* Title & Category */}
            <div className="mb-6">
              {categoryName && (
                <Badge className="mb-3 border-gold-500/30 bg-gold-500/10 text-xs text-gold-300">
                  {categoryName}
                </Badge>
              )}
              <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <Card className="mb-8 border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-black p-6">
              <div className="flex flex-wrap items-end gap-4">
                <div>
                  {hasDiscount && (
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-lg text-zinc-500 line-through">
                        {formatVnd(product.price_vnd)}
                      </span>
                      <Badge className="border-lacquer-500/30 bg-lacquer-500/10 text-xs font-bold text-lacquer-300">
                        -{product.discount_percent}%
                      </Badge>
                    </div>
                  )}
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gold-400 md:text-5xl">
                      {formatVnd(finalPrice)}
                    </span>
                    <span className="text-lg text-zinc-500">/ gói</span>
                  </div>
                </div>

                {product.quantity > 0 && (
                  <div className="ml-auto rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-2">
                    <div className="text-xs text-zinc-500">Thời gian sử dụng</div>
                    <div className="mt-1 text-base font-semibold text-white">
                      {product.quantity} ngày
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Features */}
            <Card className="mb-8 border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-black p-6">
              <h3 className="mb-4 text-lg font-semibold text-white">
                ✨ Tính năng nổi bật
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gold-500/20">
                    <Check className="h-3.5 w-3.5 text-gold-400" />
                  </div>
                  <span className="text-sm leading-relaxed text-zinc-300">
                    Tự do lựa chọn tài khoản ChatGPT
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gold-500/20">
                    <Check className="h-3.5 w-3.5 text-gold-400" />
                  </div>
                  <span className="text-sm leading-relaxed text-zinc-300">
                    Không giới hạn tạo ảnh trong ngày
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gold-500/20">
                    <Check className="h-3.5 w-3.5 text-gold-400" />
                  </div>
                  <span className="text-sm leading-relaxed text-zinc-300">
                    Không giới hạn hỏi thoại trong ngày
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gold-500/20">
                    <Check className="h-3.5 w-3.5 text-gold-400" />
                  </div>
                  <span className="text-sm leading-relaxed text-zinc-300">
                    Hỗ trợ 24/7 qua Zalo và Telegram
                  </span>
                </li>
              </ul>
            </Card>

            {/* Description */}
            {product.description_html && (
              <Card className="border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-black p-6">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  📋 Mô tả chi tiết
                </h3>
                <div
                  className="prose prose-sm prose-invert max-w-none prose-headings:text-white prose-p:text-zinc-300 prose-a:text-gold-400 prose-strong:text-white prose-ul:text-zinc-300"
                  dangerouslySetInnerHTML={{ __html: product.description_html }}
                />
              </Card>
            )}
          </motion.div>

          {/* Right: Sticky CTA Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:sticky lg:top-24 lg:h-fit"
          >
            {/* CTA Card - GLASSMORPHISM với drum pattern */}
            <Card className="relative overflow-hidden border-zinc-800 bg-gradient-to-br from-zinc-900/90 via-zinc-900/80 to-black p-6 backdrop-blur-xl">
              {/* Drum pattern background trong CTA */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: "url('/images/drum-background.png')",
                  backgroundSize: "300px",
                  backgroundPosition: "center",
                  mixBlendMode: "overlay",
                }}
              />
              
              {/* Glow effect */}
              <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-gold-500/20 blur-3xl" />

              <div className="relative">
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 shadow-lg shadow-gold-500/50">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Heading */}
                <h3 className="mb-2 text-center text-xl font-bold text-white">
                  Sẵn sàng bắt đầu?
                </h3>
                <p className="mb-6 text-center text-sm text-zinc-400">
                  Tư vấn miễn phí • Phản hồi nhanh • Hỗ trợ 24/7
                </p>

                {/* CTA Buttons - ĐỒNG BỘ & ĐẸP */}
                <div className="space-y-3">
                  {/* Zalo button */}
                  {settings?.zalo_url && (
                    <a
                      href={settings.zalo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <Button
                        size="lg"
                        className="h-14 w-full bg-gradient-to-r from-[#0068ff] to-[#0084ff] text-base font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/50"
                      >
                        <MessageCircle className="h-5 w-5" />
                        Tư vấn qua Zalo
                      </Button>
                    </a>
                  )}

                  {/* Telegram button */}
                  {settings?.telegram_url && (
                    <a
                      href={settings.telegram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <Button
                        size="lg"
                        variant="outline"
                        className="h-14 w-full border-2 border-[#0088cc] bg-[#0088cc]/10 text-base font-semibold text-[#0088cc] backdrop-blur-sm transition-all hover:scale-[1.02] hover:border-[#0088cc] hover:bg-[#0088cc]/20 hover:text-white hover:shadow-lg hover:shadow-cyan-500/30"
                      >
                        <Send className="h-5 w-5" />
                        Chat qua Telegram
                      </Button>
                    </a>
                  )}
                </div>

                {/* Trust badges */}
                <div className="mt-6 space-y-2 border-t border-zinc-800 pt-6">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    <span>Online • Phản hồi trong 5 phút</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                    <span>🇻🇳 Tư vấn bằng tiếng Việt</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    <span>Được tin dùng bởi 100+ khách hàng</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Security note */}
            <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-500/10">
                  <Check className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Thanh toán an toàn
                  </div>
                  <div className="mt-1 text-xs text-zinc-400">
                    Hỗ trợ chuyển khoản, ví điện tử. Bảo mật thông tin tuyệt đối.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
