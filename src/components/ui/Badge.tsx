import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-200",
        className
      )}
      {...props}
    />
  );
}

