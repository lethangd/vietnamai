"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { BadgeCheck, ChevronDown, Sparkles, TrendingDown, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

/**
 * Hero Section - LEFT ALIGN (bắt buộc)
 * Layout: Trái nội dung / Phải không gian + ánh sáng
 * Asset bắt buộc: drum-background.png + logo.png
 */
export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background được handle bởi HomeBackground ở `app/page.tsx` */}

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="grid items-start gap-10 md:grid-cols-[1.45fr_0.55fr]">
          {/* LEFT: CONTENT (bắt buộc căn trái) */}
          <div className="text-left">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/30 ring-1 ring-white/10 backdrop-blur-md">
                <Image
                  src="/images/logo.png"
                  alt="VietNamAI.store"
                  width={34}
                  height={34}
                  className="h-9 w-9 object-contain"
                  priority
                />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-bold tracking-wide text-zinc-50">VietNamAI.store</div>
                <div className="text-xs text-zinc-400">Gói AI PRO / PREMIUM • Giá cực tốt</div>
              </div>
            </motion.div>

            {/* Pill (giống design) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="inline-flex items-center gap-2 rounded-full border border-gold-400/25 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-300 backdrop-blur-md"
            >
              <TrendingDown className="h-4 w-4" />
              SẢN PHẨM AI DÀNH CHO NGƯỜI VIỆT
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-balance text-5xl font-black leading-[1.02] tracking-tight text-white md:text-6xl lg:text-7xl"
            >
              <span className="text-white">VietNamAI.store -</span>
              <br />
              <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 bg-clip-text text-transparent">
                TÍN - TÂM - TRÍ - TỐC
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-zinc-300 md:text-lg"
            >
              Gói PRO/PREMIUM đa nền tảng (ChatGPT, Claude, Gemini, Midjourney, Copilot…)
              <br className="hidden md:block" />
              <span className="font-semibold text-gold-300">Giá cực tốt</span> • Nhận nhanh • Dùng mượt
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link href="#san-pham">
                <Button
                  size="lg"
                  className="h-12 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 px-7 font-bold text-black shadow-2xl shadow-gold-500/35 transition-all hover:scale-[1.02] hover:shadow-[0_20px_70px_rgba(255,215,0,0.55)]"
                >
                  <Sparkles className="h-5 w-5" />
                  Xem Gói AI & Bảng Giá
                </Button>
              </Link>
              <Link href="#lien-he">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-2xl border border-white/12 bg-zinc-900/40 px-7 font-semibold text-zinc-100 backdrop-blur-md hover:border-white/20 hover:bg-zinc-800/40"
                >
                  <BadgeCheck className="h-5 w-5 text-zinc-200" />
                  Chat Trực Tiếp - Tư Vấn Ngay (Zalo/Telegram)
                </Button>
              </Link>
            </motion.div>

            {/* Trust chips (giống design) */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm font-semibold text-zinc-200 backdrop-blur-md">
                <BadgeCheck className="h-4 w-4 text-gold-400" />
                TRUNG – TÍN – TÂM – TRÍ – TỐC
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm font-semibold text-zinc-200 backdrop-blur-md">
                <BadgeCheck className="h-4 w-4 text-gold-400" />
                Hỗ trợ người thật
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm font-semibold text-zinc-200 backdrop-blur-md">
                <BadgeCheck className="h-4 w-4 text-gold-400" />
                Sản phẩm được bảo hành đầy đủ
              </div>
            </div>
          </div>

          {/* RIGHT: để trống cho background hiện rõ (theo yêu cầu) */}
          <div className="hidden md:block" />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
      </div>
    </section>
  );
}
