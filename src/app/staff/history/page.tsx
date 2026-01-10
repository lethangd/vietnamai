"use client";

import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "@/lib/auth/AuthProvider";
import { getSupabaseBrowserClient } from "@/lib/supabase/browserClient";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";

type TimeEntryRow = {
  id: string;
  check_in_at: string;
  check_out_at: string | null;
};

export default function Page() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<TimeEntryRow[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    async function run() {
      if (!user) return;
      setLoading(true);
      setErr(null);
      const { data, error } = await supabase
        .from("time_entries")
        .select("id, check_in_at, check_out_at")
        .eq("staff_user_id", user.id)
        .order("check_in_at", { ascending: false })
        .limit(50);
      setLoading(false);
      if (error) setErr(error.message);
      setRows((data as TimeEntryRow[] | null) ?? []);
    }
    void run();
  }, [supabase, user]);

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="text-lg font-semibold text-zinc-50">Lịch sử chấm công</div>
        <div className="mt-2 text-sm text-zinc-300">
          Hiển thị 50 bản ghi gần nhất.
        </div>
      </Card>

      <Card className="p-5">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-zinc-300">
            <Spinner /> Đang tải…
          </div>
        ) : err ? (
          <div className="text-sm text-lacquer-200">{err}</div>
        ) : rows.length === 0 ? (
          <div className="text-sm text-zinc-300">Chưa có dữ liệu.</div>
        ) : (
          <div className="space-y-2">
            {rows.map((r) => (
              <div
                key={r.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
              >
                <div className="text-sm text-zinc-200">
                  Check-in:{" "}
                  <span className="text-zinc-50">
                    {format(new Date(r.check_in_at), "PPpp", { locale: vi })}
                  </span>
                </div>
                <div className="text-sm text-zinc-200">
                  Check-out:{" "}
                  <span className="text-zinc-50">
                    {r.check_out_at
                      ? format(new Date(r.check_out_at), "PPpp", { locale: vi })
                      : "—"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

