"use client";

import Link from "next/link";
import { FlagStarMark } from "@/components/vietnam/FlagStarMark";
import { Facebook, Mail, Phone, MapPin } from "lucide-react";

/**
 * Site Footer - Vietnamese Branding
 */
import { DrumDivider } from "@/components/vietnam/DrumDivider";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

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
    <footer className="relative border-t border-zinc-800 bg-black">
      {/* Drum divider top */}
      <div className="absolute -top-8 left-0 right-0">
        <DrumDivider />
      </div>

      {/* Background với drum pattern cực nhẹ */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: "url('/images/drum-background.png')",
            backgroundSize: "800px",
            backgroundPosition: "center bottom",
            mixBlendMode: "luminosity",
          }}
        />
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

            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              Giải pháp AI Chatbot hàng đầu cho doanh nghiệp Việt Nam. 
              Tự động hóa chăm sóc khách hàng, tăng doanh thu.
            </p>

            {/* Contact info */}
            <div className="mt-6 space-y-2">
              <a
                href="mailto:contact@vietnamai.vn"
                className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-gold-400"
              >
                <Mail className="h-4 w-4" />
                contact@vietnamai.vn
              </a>
              <a
                href="tel:+84123456789"
                className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-gold-400"
              >
                <Phone className="h-4 w-4" />
                +84 123 456 789
              </a>
              <div className="flex items-start gap-2 text-sm text-zinc-400">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>Hà Nội, Việt Nam</span>
              </div>
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
                  href="https://facebook.com/vietnamai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-400 transition-all hover:border-gold-500/50 hover:bg-gold-500/10 hover:text-gold-400"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                {/* Thêm social icons khác nếu cần */}
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
