"use client";

import Link from "next/link";
import { FlagStarMark } from "@/components/vietnam/FlagStarMark";
import { Facebook, Mail, Phone } from "lucide-react";
import { normalizeFacebookUrl, normalizeTiktokUrl } from "@/lib/socialLinks";
import { fetchSettings } from "@/lib/supabase/publicQueries";
import { useEffect, useState } from "react";
import type { Settings } from "@/types/domain";

/**
 * Site Footer - Vietnamese Branding
 */
import { DrumDivider } from "@/components/vietnam/DrumDivider";

function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.6 5.82c-.9-.98-1.4-2.25-1.4-3.57h-3.05v13.9c0 1.56-1.27 2.83-2.83 2.83a2.83 2.83 0 0 1-2.83-2.83 2.83 2.83 0 0 1 2.83-2.83c.29 0 .57.04.83.13V10.4a5.9 5.9 0 0 0-.83-.06A5.88 5.88 0 0 0 3.5 16.22a5.88 5.88 0 0 0 5.88 5.88 5.88 5.88 0 0 0 5.88-5.88V9.01a8.2 8.2 0 0 0 4.79 1.53V7.5a4.83 4.83 0 0 1-3.45-1.68z" />
    </svg>
  );
}

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchSettings()
      .then((s) => {
        if (!cancelled) setSettings(s);
      })
      .catch(() => {
        // Không chặn hiển thị footer nếu tải settings thất bại
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const facebookUrl = normalizeFacebookUrl(settings?.facebook_url) ?? "https://facebook.com/VietnamAI_store";
  const tiktokUrl = normalizeTiktokUrl(settings?.tiktok_url) ?? "https://tiktok.com/@VietnamAI_store";

  const links = {
    product: [
      { label: "Bảng giá", href: "/#san-pham" },
      { label: "Tính năng", href: "/#tinh-nang" },
      { label: "Câu hỏi thường gặp", href: "/#faq" }
    ],
    company: [
      { label: "Về chúng tôi", href: "/about" },
      { label: "Liên hệ", href: "/contact" },
      { label: "Tuyển dụng", href: "/careers" }
    ],
    legal: [
      { label: "Điều khoản dịch vụ", href: "/terms" },
      { label: "Chính sách bảo mật", href: "/privacy" },
      { label: "Chính sách hoàn tiền", href: "/refund" }
    ]
  };

  return (
    <footer 
      className="relative z-20 border-t border-zinc-800"
      style={{ 
        backgroundColor: '#000000',
        isolation: 'isolate',
      }}
    >
      {/* Drum divider top */}
      <div className="absolute -top-8 left-0 right-0">
        <DrumDivider />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lacquer-700/30 shadow-lacquer-glow transition-all group-hover:bg-lacquer-700/40">
                <FlagStarMark className="h-5 w-5 text-gold-300" />
              </span>
              <div>
                <div className="text-base font-bold tracking-wide text-zinc-50">
                  VietnamAI
                </div>
                <div className="text-xs text-zinc-400">AI Chatbot Solutions</div>
              </div>
            </Link>

            <p className="mt-4 text-sm font-semibold leading-relaxed text-zinc-300">
              MANG AI LẠI GẦN HƠN VỚI NGƯỜI VIỆT
            </p>
            <p className="mt-1 text-sm leading-relaxed text-zinc-400">
              UY TÍN - TRÁCH NHIỆM - BẢO MẬT
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Cảm ơn quý khách đã lựa chọn chúng tôi!
              <br />
              www.vietnamai.store
            </p>

            {/* Contact info */}
            <div className="mt-6 space-y-2">
              <a
                href="mailto:vietnamaistore@gmail.com"
                className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-gold-400"
              >
                <Mail className="h-4 w-4" />
                vietnamaistore@gmail.com
              </a>
              <a
                href="tel:0866798154"
                className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-gold-400"
              >
                <Phone className="h-4 w-4" />
                0866798154
              </a>
              <a
                href="tel:0886549877"
                className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-gold-400"
              >
                <Phone className="h-4 w-4" />
                0886549877
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-white">Sản phẩm</h3>
            <ul className="mt-4 space-y-2">
              {links.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-gold-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-white">Công ty</h3>
            <ul className="mt-4 space-y-2">
              {links.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-gold-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-white">Pháp lý</h3>
            <ul className="mt-4 space-y-2">
              {links.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-gold-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social links */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-white">Kết nối</h3>
              <div className="mt-3 flex gap-3">
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-400 transition-all hover:border-gold-500/50 hover:bg-gold-500/10 hover:text-gold-400"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-400 transition-all hover:border-gold-500/50 hover:bg-gold-500/10 hover:text-gold-400"
                >
                  <TiktokIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-zinc-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-zinc-500 md:flex-row">
            <p>
              © {currentYear} VietnamAI. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1">
                🇻🇳 Sản phẩm Việt Nam
              </span>
              <span>•</span>
              <span>Built with Next.js & Supabase</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient glow */}
      <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
    </footer>
  );
}
