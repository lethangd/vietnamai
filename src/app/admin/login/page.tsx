"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit() {
    setBusy(true);
    setErr(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include", // Đảm bảo cookie được set đúng trong production
    });
    setBusy(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as any;
      setErr(data?.error ?? "Đăng nhập thất bại");
      return;
    }
    router.replace("/admin");
  }

  return (
    <main className="mx-auto w-full max-w-md px-4 py-12 md:py-16">
      <Card className="p-6">
        <div className="text-lg font-semibold text-zinc-50">Admin Login</div>
        <div className="mt-1 text-sm text-zinc-300">
          Admin đăng nhập bằng <span className="text-gold-200">ENV</span> (không dùng Supabase Auth).
        </div>

        <div className="mt-6 space-y-3">
          <div>
            <div className="mb-1 text-xs text-zinc-300">Email</div>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <div className="mb-1 text-xs text-zinc-300">Mật khẩu</div>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {err ? (
            <div className="rounded-xl border border-lacquer-400/30 bg-lacquer-500/10 px-3 py-2 text-xs text-lacquer-200">
              {err}
            </div>
          ) : null}

          <Button className="w-full" size="lg" onClick={() => void submit()} disabled={busy}>
            {busy ? (
              <>
                <Spinner className="h-4 w-4" /> Đang đăng nhập…
              </>
            ) : (
              "Đăng nhập Admin"
            )}
          </Button>
        </div>
      </Card>
    </main>
  );
}

