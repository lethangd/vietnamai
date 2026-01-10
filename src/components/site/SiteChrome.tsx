"use client";

import { DrumPattern } from "@/components/vietnam/DrumPattern";
import { FlagStarMark } from "@/components/vietnam/FlagStarMark";
import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthProvider";
import { Button } from "@/components/ui/Button";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-vietnam-gradient">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/35 backdrop-blur supports-[backdrop-filter]:bg-black/20">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <Link href="/" className="group flex items-center gap-2">
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-lacquer-700/30 shadow-lacquer-glow">
              <FlagStarMark className="h-5 w-5 text-gold-300" />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide text-zinc-50">
                VietnamAI
              </div>
              <div className="text-[11px] text-zinc-300/90">AI Chatbot • Supabase</div>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            <Link
              href="/admin"
              className={cn(
                "rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200",
                "hover:bg-white/10 hover:text-white"
              )}
            >
              Admin
            </Link>

            {user ? (
              <Link
                href="/staff"
                className={cn(
                  "rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200",
                  "hover:bg-white/10 hover:text-white"
                )}
              >
                Staff
              </Link>
            ) : null}

            {user ? (
              <Button
                variant="outline"
                onClick={() => void signOut()}
                className="h-10"
              >
                Đăng xuất
              </Button>
            ) : (
              <Link
                href="/login"
                className={cn(
                  "rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200",
                  "hover:bg-white/10 hover:text-white"
                )}
              >
                Đăng nhập
              </Link>
            )}
          </nav>
        </div>
      </header>

      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.18]">
        <DrumPattern />
      </div>

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        {children}
      </motion.div>

      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 text-xs text-zinc-400 md:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              © {new Date().getFullYear()} VietnamAI. Giao diện cảm hứng cờ đỏ sao
              vàng & họa tiết trống đồng.
            </div>
            <div className="text-zinc-500">Build on Next.js + Supabase</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

