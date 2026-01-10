"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "@/lib/auth/AuthProvider";
import { getSupabaseBrowserClient } from "@/lib/supabase/browserClient";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự")
});
type FormValues = z.infer<typeof schema>;

export default function Page() {
  const router = useRouter();
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const { user, loading } = useAuth();
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" }
  });

  useEffect(() => {
    if (loading) return;
    if (!user) return;
    router.replace("/staff");
  }, [loading, user, router]);

  async function onSubmit(values: FormValues) {
    setBusy(true);
    setErr(null);
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password
    });
    setBusy(false);
    if (error) setErr(error.message);
  }

  return (
    <main className="mx-auto w-full max-w-md px-4 py-12 md:py-16">
      <Card className="p-6">
        <div className="text-lg font-semibold text-zinc-50">Đăng nhập</div>
        <div className="mt-1 text-sm text-zinc-300">
          Dành cho Admin/Staff. Khách hàng không cần đăng nhập để xem sản phẩm.
        </div>

        <form
          className="mt-6 space-y-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div>
            <div className="mb-1 text-xs text-zinc-300">Email</div>
            <Input type="email" placeholder="you@company.com" {...form.register("email")} />
            {form.formState.errors.email ? (
              <div className="mt-1 text-xs text-lacquer-300">
                {form.formState.errors.email.message}
              </div>
            ) : null}
          </div>
          <div>
            <div className="mb-1 text-xs text-zinc-300">Mật khẩu</div>
            <Input type="password" placeholder="••••••••" {...form.register("password")} />
            {form.formState.errors.password ? (
              <div className="mt-1 text-xs text-lacquer-300">
                {form.formState.errors.password.message}
              </div>
            ) : null}
          </div>

          {err ? (
            <div className="rounded-xl border border-lacquer-400/30 bg-lacquer-500/10 px-3 py-2 text-xs text-lacquer-200">
              {err}
            </div>
          ) : null}

          <Button className="w-full" size="lg" type="submit" disabled={busy}>
            {busy ? (
              <>
                <Spinner className="h-4 w-4" /> Đang đăng nhập…
              </>
            ) : (
              "Đăng nhập"
            )}
          </Button>
        </form>
      </Card>
    </main>
  );
}

