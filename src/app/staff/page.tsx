"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "@/lib/auth/AuthProvider";
import { getSupabaseBrowserClient } from "@/lib/supabase/browserClient";
import { getCurrentWeekRange, calculateTotalHours, filterEntriesByWeek } from "@/lib/attendance/weekUtils";
import { Clock, LogIn, LogOut } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type TimeEntryRow = {
  id: string;
  staff_user_id: string;
  check_in_at: string;
  check_out_at: string | null;
  created_at: string;
};

/**
 * Staff Attendance Page - Check-in/out + Tổng giờ tuần
 */
export default function Page() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<TimeEntryRow | null>(null);
  const [allEntries, setAllEntries] = useState<TimeEntryRow[]>([]);
  const [err, setErr] = useState<string | null>(null);

  async function loadData() {
    if (!user) return;
    setLoading(true);
    setErr(null);
    
    // Load active entry
    const { data: activeData } = await supabase
      .from("time_entries")
      .select("id, staff_user_id, check_in_at, check_out_at, created_at")
      .eq("staff_user_id", user.id)
      .is("check_out_at", null)
      .order("check_in_at", { ascending: false })
      .limit(1);
    
    setActive((activeData?.[0] as TimeEntryRow | undefined) ?? null);

    // Load tất cả entries (để tính tuần)
    const { data: allData, error } = await supabase
      .from("time_entries")
      .select("id, staff_user_id, check_in_at, check_out_at, created_at")
      .eq("staff_user_id", user.id)
      .order("check_in_at", { ascending: false })
      .limit(200);

    setLoading(false);
    if (error) setErr(error.message);
    setAllEntries((allData as TimeEntryRow[] | null) ?? []);
  }

  useEffect(() => {
    void loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Tổng giờ tuần này (Thứ 2 → Chủ Nhật)
  const weekRange = useMemo(() => getCurrentWeekRange(), []);
  const entriesThisWeek = useMemo(() => {
    return filterEntriesByWeek(allEntries, weekRange.start, weekRange.end);
  }, [allEntries, weekRange]);
  const totalHoursThisWeek = useMemo(() => {
    return calculateTotalHours(entriesThisWeek);
  }, [entriesThisWeek]);

  async function checkIn() {
    if (!user) return;
    setErr(null);
    const { error } = await supabase.from("time_entries").insert({
      staff_user_id: user.id,
      check_in_at: new Date().toISOString()
    });
    if (error) setErr(error.message);
    await loadData();
  }

  async function checkOut() {
    if (!active) return;
    setErr(null);
    const { error } = await supabase
      .from("time_entries")
      .update({ check_out_at: new Date().toISOString() })
      .eq("id", active.id);
    if (error) setErr(error.message);
    await loadData();
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/20">
            <Clock className="h-5 w-5 text-gold-400" />
          </div>
          <div>
            <div className="text-lg font-semibold text-zinc-50">Chấm công</div>
            <div className="text-sm text-zinc-400">
              Check-in/out mỗi ngày làm việc
            </div>
          </div>
        </div>
      </Card>

      {/* Stats - Tổng giờ tuần */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/20">
              <Clock className="h-6 w-6 text-gold-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gold-400">
                {totalHoursThisWeek.toFixed(1)}h
              </div>
              <div className="text-xs text-zinc-500">Tổng giờ tuần này (T2-CN)</div>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-700/50">
              <Clock className="h-6 w-6 text-zinc-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">
                {entriesThisWeek.length}
              </div>
              <div className="text-xs text-zinc-500">Lượt chấm công tuần này</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Check-in/out Actions */}
      <Card className="p-5">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-zinc-300">
            <Spinner /> Đang tải…
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-zinc-300">
                Trạng thái:{" "}
                {active ? (
                  <span className="font-semibold text-green-400">✅ Đang làm việc</span>
                ) : (
                  <span className="font-semibold text-zinc-100">Chưa check-in</span>
                )}
              </div>
            </div>

            {active && (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3">
                <div className="text-xs text-zinc-500">Check-in lúc</div>
                <div className="mt-1 text-sm font-semibold text-white">
                  {new Date(active.check_in_at).toLocaleString("vi-VN")}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              {!active ? (
                <Button onClick={() => void checkIn()} size="lg" className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/50">
                  <LogIn className="h-5 w-5" />
                  Check-in
                </Button>
              ) : (
                <Button onClick={() => void checkOut()} size="lg" variant="outline" className="flex-1 border-2 border-zinc-700 hover:border-lacquer-500/50 hover:bg-lacquer-500/10">
                  <LogOut className="h-5 w-5" />
                  Check-out
                </Button>
              )}
            </div>
          </div>
        )}

        {err && (
          <div className="mt-3 rounded-xl border border-lacquer-400/30 bg-lacquer-500/10 px-3 py-2 text-xs text-lacquer-200">
            {err}
          </div>
        )}
      </Card>
    </div>
  );
}
