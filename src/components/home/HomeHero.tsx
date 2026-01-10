"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FlagStarMark } from "@/components/vietnam/FlagStarMark";

/**
 * Hero Section - WOW TRONG 3 GIÂY
 * Trống đồng background với xử lý tinh tế
 */
export function HomeHero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* ===== BACKGROUND LAYERS - XỬ LÝ TINH TẾ ===== */}
      
      {/* Layer 1: Gradient đỏ đậm → đen (base) */}
      <div className="absolute inset-0 bg-gradient-to-br from-lacquer-950 via-black to-black" />

      {/* Layer 2: Trống đồng background - BLUR + OPACITY + RADIAL FADE */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_70%)]" />
        <Image
          src="/images/drum-background.png"
          alt=""
          fill
          className="object-cover object-center opacity-25 blur-[2px]"
          style={{ mixBlendMode: "luminosity" }}
          priority
        />
        {/* Overlay gradient đỏ đậm để hòa trống đồng vào background */}
        <div className="absolute inset-0 bg-gradient-to-br from-lacquer-900/60 via-lacquer-950/70 to-black/90" />
      </div>

      {/* Layer 3: Radial glow vàng (ánh sao) */}
      <motion.div
        className="absolute top-1/4 right-1/3 h-[700px] w-[700px] rounded-full bg-gold-500/20 blur-[140px]"
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-gold-400/15 blur-[100px]"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Layer 4: Họa tiết trống đồng chi tiết SVG (overlay cực nhẹ) */}
      <div className="absolute inset-0 opacity-[0.04]">
        {/* Sử dụng SVG pattern từ DrumPattern nếu cần, hoặc để subtle */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_40%,black_70%)]" />
      </div>

      {/* ===== CONTENT LAYER ===== */}
      <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center md:px-6">
        {/* Logo / Sao vàng - floating */}
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            {/* Glow behind logo */}
            <div className="absolute inset-0 scale-150 rounded-full bg-gold-400/40 blur-3xl" />
            
            {/* Logo box */}
            <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 p-1 shadow-2xl shadow-gold-500/60">
              <div className="flex h-full w-full items-center justify-center rounded-[1.3rem] bg-black/20 backdrop-blur-sm">
                <FlagStarMark className="h-12 w-12 text-white drop-shadow-2xl" />
              </div>
            </div>

            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 rounded-3xl border-2 border-gold-400"
              animate={{
                scale: [1, 1.4],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-gold-400/40 bg-gradient-to-r from-gold-500/15 to-lacquer-600/15 px-6 py-2.5 text-sm font-bold text-gold-300 shadow-xl shadow-gold-500/20 backdrop-blur-md">
            <Sparkles className="h-4 w-4" />
            🇻🇳 Sản phẩm AI của Việt Nam
          </div>
        </motion.div>

        {/* Main Heading - TO ĐẬM DỨT KHOÁT */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 text-balance text-5xl font-black leading-[1.08] tracking-tight text-white md:text-6xl lg:text-7xl xl:text-8xl"
        >
          AI Chatbot
          <br />
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 bg-clip-text text-transparent">
              Việt Nam
            </span>
            {/* Underline vàng với họa tiết trống đồng */}
            <motion.div
              className="absolute -bottom-3 left-0 right-0 h-2 overflow-hidden md:-bottom-4 md:h-2.5"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
            >
              <div className="h-full w-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600" />
              {/* Mini pattern overlay trên underline */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC4zIi8+PC9zdmc+')] opacity-20" />
            </motion.div>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mx-auto mt-10 max-w-3xl text-pretty text-lg leading-relaxed text-zinc-300 md:text-xl lg:text-2xl"
        >
          Tự động hóa chăm sóc khách hàng{" "}
          <span className="font-bold text-gold-300">24/7</span>.
          <br className="hidden md:block" />
          Tăng doanh thu, giảm chi phí - Công nghệ AI hiểu{" "}
          <span className="font-bold text-white">tiếng Việt</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Primary CTA */}
          <Link href="#san-pham">
            <Button
              size="lg"
              className="group h-14 bg-gradient-to-r from-gold-500 to-gold-600 px-8 text-base font-bold text-black shadow-2xl shadow-gold-500/50 transition-all hover:scale-105 hover:shadow-[0_20px_70px_rgba(255,215,0,0.7)]"
            >
              <Sparkles className="h-5 w-5" />
              Xem bảng giá
            </Button>
          </Link>

          {/* Secondary CTA */}
          <Link href="/login">
            <Button
              size="lg"
              variant="outline"
              className="h-14 border-2 border-zinc-700 bg-black/50 px-8 text-base font-semibold text-zinc-100 backdrop-blur-md hover:border-gold-500/50 hover:bg-zinc-900/50"
            >
              <Zap className="h-5 w-5" />
              Đăng nhập Staff
            </Button>
          </Link>
        </motion.div>

        {/* Trust line với họa tiết */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-12 flex items-center gap-3"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500/30" />
          <p className="text-sm font-medium text-zinc-400">
            <span className="text-gold-400">100+</span> doanh nghiệp Việt Nam tin dùng
          </p>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500/30" />
        </motion.div>
      </div>

      {/* Bottom fade với họa tiết trống đồng mờ */}
      <div className="absolute bottom-0 left-0 right-0 h-40">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        {/* Pattern cực nhẹ ở viền dưới */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
      </div>
    </section>
  );
}
