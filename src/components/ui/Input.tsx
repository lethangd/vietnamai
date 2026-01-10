"use client";

import { cn } from "@/lib/cn";
import type { InputHTMLAttributes } from "react";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-zinc-100 placeholder:text-zinc-500",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300/60",
        className
      )}
      {...props}
    />
  );
}

