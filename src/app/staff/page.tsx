"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "@/lib/auth/AuthProvider";
import { getSupabaseBrowserClient } from "@/lib/supabase/browserClient";
import { useEffect, useMemo, useState } from "react";

type TimeEntryRow = {
  id: string;
  staff_user_id: string;
  check_in_at: string;
  check_out_at: string | null;
};

export default function Page() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<TimeEntryRow | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function loadActive() {
    if (!user) return;
    setLoading(true);
    setErr(null);
    const { data, error } = await supabase
      .from("time_entries")
      .select("id, staff_user_id, check_in_at, check_out_at")
      .eq("staff_user_id", user.id)
      .is("check_out_at", null)
      .order("check_in_at", { ascending: false })
      .limit(1);
    setLoading(false);
    if (error) setErr(error.message);
    setActive((data?.[0] as TimeEntryRow | undefined) ?? null);
  }

  useEffect(() => {
    void loadActive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  async function checkIn() {
    if (!user) return;
    setErr(null);
    const { error } = await supabase.from("time_entries").insert({
      staff_user_id: user.id,
      check_in_at: new Date().toISOString()
    });
    if (error) setErr(error.message);
    await loadActive();
  }

  async function checkOut() {
    if (!active) return;
    setErr(null);
    const { error } = await supabase
      .from("time_entries")
      .update({ check_out_at: new Date().toISOString() })
      .eq("id", active.id);
    if (error) setErr(error.message);
    await loadActive();
  }

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="text-lg font-semibold text-zinc-50">Chấm công</div>
        <div className="mt-2 text-sm text-zinc-300">
          Nhấn check-in khi bắt đầu làm, check-out khi kết thúc. Dữ liệu sẽ được lưu
          vào Supabase.
        </div>
      </Card>

      <Card className="p-5">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-zinc-300">
            <Spinner /> Đang tải…
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-zinc-300">
              Trạng thái:{" "}
              {active ? (
                <span className="font-semibold text-gold-200">Đang làm</span>
              ) : (
                <span className="font-semibold text-zinc-100">Chưa check-in</span>
              )}
            </div>
            <div className="flex gap-2">
              {!active ? (
                <Button onClick={() => void checkIn()}>Check-in</Button>
              ) : (
                <Button variant="outline" onClick={() => void checkOut()}>
                  Check-out
                </Button>
              )}
            </div>
          </div>
        )}

        {err ? (
          <div className="mt-3 rounded-xl border border-lacquer-400/30 bg-lacquer-500/10 px-3 py-2 text-xs text-lacquer-200">
            {err}
          </div>
        ) : null}
      </Card>
    </div>
  );
}

