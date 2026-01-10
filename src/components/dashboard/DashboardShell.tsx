import { cn } from "@/lib/cn";
import Link from "next/link";

export type NavItem = { href: string; label: string };

export function DashboardShell({
  title,
  nav,
  children
}: {
  title: string;
  nav: NavItem[];
  children: React.ReactNode;
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
          </nav>
        </aside>

        <section>{children}</section>
      </div>
    </main>
  );
}

