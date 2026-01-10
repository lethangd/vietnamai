"use client";

import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300/70 " +
    "disabled:pointer-events-none disabled:opacity-60";

  const variants: Record<Variant, string> = {
    primary:
      "bg-lacquer-600 text-white shadow-lacquer-glow hover:bg-lacquer-500 active:bg-lacquer-700",
    ghost: "bg-transparent text-zinc-100 hover:bg-white/10 active:bg-white/15",
    outline:
      "border border-white/12 bg-white/5 text-zinc-100 hover:bg-white/10 active:bg-white/15"
  };

  const sizes: Record<Size, string> = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-5 text-base"
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

