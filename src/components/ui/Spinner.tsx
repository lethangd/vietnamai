import { cn } from "@/lib/cn";

export function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-4 w-4 animate-spin rounded-full border-2 border-white/25 border-t-white/80",
        className
      )}
      aria-label="Loading"
    />
  );
}

