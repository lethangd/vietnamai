"use client";

import { cn } from "@/lib/cn";
import Link from "next/link";
import { LogOut } from "lucide-react";

export type NavItem = { href: string; label: string };

export function DashboardShell({
  title,
  nav,
  children,
  onLogout,
}: {
  title: string;
  nav: NavItem[];
  children: React.ReactNode;
  onLogout?: () => void;
}) {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-10">
      <div className="grid gap-5 lg:grid-cols-[260px_1fr] lg:items-start">
        <aside className="rounded-2xl border border-white/10 bg-black/35 p-3 backdrop-blur">
          <div className="px-3 py-2 text-sm font-semibold text-zinc-50">{title}</div>
          <nav className="mt-2 space-y-1">
            {nav.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className={cn(
                  "block rounded-xl px-3 py-2 text-sm text-zinc-200",
                  "hover:bg-white/10 hover:text-white"
                )}
              >
                {it.label}
              </Link>
            ))}
            
            {/* Logout button */}
            {onLogout && (
              <button
                onClick={onLogout}
                className={cn(
                  "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-lacquer-300",
                  "hover:bg-lacquer-500/20 hover:text-lacquer-200"
                )}
              >
                <LogOut className="h-4 w-4" />
                Đăng xuất
              </button>
            )}
          </nav>
        </aside>

        <section>{children}</section>
      </div>
    </main>
  );
}

