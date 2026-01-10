"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function HomeHero() {
  return (
    <Card className="relative overflow-hidden p-6 md:p-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(650px_circle_at_10%_0%,rgba(255,208,18,0.18),transparent_42%),radial-gradient(700px_circle_at_80%_10%,rgba(244,63,94,0.18),transparent_45%)]" />

      <div className="relative grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div>
          <motion.h1
            className="text-balance text-3xl font-semibold tracking-tight text-zinc-50 md:text-5xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            AI Chatbot “chuẩn Việt”, bán hàng & CSKH nhanh, gọn, đẹp.
          </motion.h1>
          <p className="mt-4 max-w-xl text-pretty text-sm leading-6 text-zinc-300 md:text-base">
            VietnamAI cung cấp các gói chatbot theo nhu cầu: tư vấn sản phẩm, chăm sóc
            khách hàng, hỗ trợ sale — vận hành tối ưu chi phí trên Supabase.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="#san-pham">
              <Button size="lg">
                <Sparkles className="h-4 w-4" />
                Xem sản phẩm
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline">
                <ShieldCheck className="h-4 w-4" />
                Admin/Staff
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-3">
          <Card className="p-4">
            <div className="text-xs text-zinc-400">Điểm nổi bật</div>
            <div className="mt-2 text-sm text-zinc-200">
              - UI cảm hứng <span className="text-gold-300">cờ đỏ sao vàng</span>
              <br />- Mô tả sản phẩm dạng <span className="text-gold-300">HTML</span>
              <br />- Admin quản lý đơn hàng + filter theo ngày
              <br />- Staff chấm công check-in / check-out
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-xs text-zinc-400">Hạ tầng</div>
            <div className="mt-2 text-sm text-zinc-200">
              Next.js (FE) + Supabase (Auth/DB/Storage) + Vercel Deploy
            </div>
          </Card>
        </div>
      </div>
    </Card>
  );
}

