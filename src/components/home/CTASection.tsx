"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { DrumPattern } from "@/components/vietnam/DrumPattern";

/**
 * CTA Section - Final conversion push
 */
export function CTASection() {
  return (
    <section id="lien-he" className="relative py-20 md:py-24">
      {/* Background với drum pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-lacquer-900/40 via-black to-gold-900/30">
          {/* Drum background image - tinh tế */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: "url('/images/drum-background.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              mixBlendMode: "luminosity",
            }}
          />
          {/* SVG pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <DrumPattern />
          </div>
        </div>
        <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-500/20 blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 h-80 w-80 rounded-full bg-lacquer-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-medium text-gold-300 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Bắt đầu ngay hôm nay
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            Sẵn sàng trải nghiệm{" "}
            <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              AI tốt nhất
            </span>
            <br />
            với VietNamAI.store?
          </h2>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-zinc-400 md:text-lg">
            Tư vấn trực tiếp qua Zalo/Telegram hoặc Facebook.
            Thanh toán an toàn qua MoMo, ZaloPay, ViettelPay, ... sau khi hoàn thành đơn hàng.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="#san-pham">
              <Button
                size="lg"
                className="group h-14 bg-gradient-to-r from-gold-500 to-gold-600 px-8 text-base font-semibold text-black shadow-gold-glow transition-all hover:shadow-xl hover:shadow-gold-500/50"
              >
                <Sparkles className="h-5 w-5" />
                Xem bảng giá ngay
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="h-14 border-zinc-700 bg-zinc-900/50 px-8 text-base font-semibold text-zinc-100 backdrop-blur-sm hover:border-zinc-600 hover:bg-zinc-800/50"
              >
                Đăng nhập Staff
              </Button>
            </Link>
          </div>

          {/* Trust line */}
          <p className="mt-8 text-sm text-zinc-500">
            ✨ Không ràng buộc • Hủy bất cứ lúc nào • Hỗ trợ 24/7
          </p>
        </motion.div>
      </div>
    </section>
  );
}
