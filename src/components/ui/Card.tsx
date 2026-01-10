import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-black/35 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur",
        className
      )}
      {...props}
    />
  );
}

