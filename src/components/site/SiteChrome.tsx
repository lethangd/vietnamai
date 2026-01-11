"use client";

import { DrumPattern } from "@/components/vietnam/DrumPattern";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ScrollToProductButton } from "@/components/ui/ScrollToProductButton";
import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthProvider";
import { Button } from "@/components/ui/Button";
import { LogOut } from "lucide-react";
import Image from "next/image";

/**
 * Site Chrome - Header + Footer + Background
 * Vietnamese Modern AI Theme
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 border-b border-zinc-800/50 bg-black/80 backdrop-blur-xl"
      >
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
        
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-lacquer-700/30 shadow-lacquer-glow transition-all group-hover:bg-lacquer-700/40 group-hover:shadow-lacquer-glow">
              <Image
                src="/images/logo.png"
                alt="VietNamAI.store"
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
                priority
              />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-bold tracking-wide text-zinc-50">
                VietNamAI.store
              </div>
              <div className="text-[10px] text-zinc-400">
                Sản phẩm AI với chất lượng tốt nhất
              </div>
            </div>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-3">
            {/* Staff login/logout */}
            {user ? (
              <>
                <Link
                  href="/staff"
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 transition-colors",
                    "hover:text-white hover:bg-zinc-800/50"
                  )}
                >
                  Staff
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => void signOut()}
                  className="text-zinc-400 hover:text-white"
                >
                  <LogOut className="h-4 w-4" />
                  Đăng xuất
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button
                  size="sm"
                  className="border-zinc-700 bg-zinc-900/50 font-medium text-zinc-100 hover:border-zinc-600 hover:bg-zinc-800/50"
                  variant="outline"
                >
                  Đăng nhập Staff
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </motion.header>

      {/* Background pattern */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]">
        <DrumPattern />
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {children}
      </motion.div>

      {/* Footer - z-index cao để không bị HomeBackground phủ lên */}
      <div className="relative z-20" style={{ backgroundColor: '#000000' }}>
        <SiteFooter />
      </div>
    </div>
  );
}
