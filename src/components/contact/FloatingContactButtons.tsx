"use client";

import { cn } from "@/lib/cn";
import { MessageCircle, Send } from "lucide-react";

type Props = {
  zaloUrl?: string | null;
  telegramUrl?: string | null;
  className?: string;
};

export function FloatingContactButtons({ zaloUrl, telegramUrl, className }: Props) {
  // NOTE: Zalo deep link tùy thiết lập của bạn. Ở đây dùng URL do admin cấu hình.
  const items: Array<{
    key: string;
    href: string;
    label: string;
    icon: React.ReactNode;
    tone: string;
  }> = [];

  if (zaloUrl) {
    items.push({
      key: "zalo",
      href: zaloUrl,
      label: "Zalo",
      icon: <MessageCircle className="h-4 w-4" />,
      tone: "bg-[#0068FF]/85 hover:bg-[#0068FF]"
    });
  }
  if (telegramUrl) {
    items.push({
      key: "telegram",
      href: telegramUrl,
      label: "Telegram",
      icon: <Send className="h-4 w-4" />,
      tone: "bg-[#229ED9]/85 hover:bg-[#229ED9]"
    });
  }

  if (items.length === 0) return null;

  return (
    <div
      className={cn(
        "fixed right-4 top-1/2 z-50 -translate-y-1/2 space-y-2",
        className
      )}
    >
      {items.map((it) => (
        <a
          key={it.key}
          href={it.href}
          target="_blank"
          rel="noreferrer"
          className={cn(
            "flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.35)]",
            "border border-white/10 backdrop-blur",
            it.tone
          )}
        >
          {it.icon}
          {it.label}
        </a>
      ))}
    </div>
  );
}

