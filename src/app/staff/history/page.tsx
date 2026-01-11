"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "@/lib/auth/AuthProvider";
import { getSupabaseBrowserClient } from "@/lib/supabase/browserClient";
import {
  getCurrentWeekRange,
  getWeekRange,
  formatWeekLabel,
  calculateTotalHours,
  filterEntriesByWeek,
  groupEntriesByDay
} from "@/lib/attendance/weekUtils";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";

type TimeEntryRow = {
  id: string;
  check_in_at: string;
  check_out_at: string | null;
};

/**
 * Staff History Page - Chart + Tuần Thứ 2-CN
 */
export default function Page() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<TimeEntryRow[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [weekOffset, setWeekOffset] = useState<number>(0);

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
        .limit(200);
      setLoading(false);
      if (error) setErr(error.message);
      setRows((data as TimeEntryRow[] | null) ?? []);
    }
    void run();
  }, [supabase, user]);

  // Week calculations
  const weekRange = useMemo(() => getWeekRange(weekOffset), [weekOffset]);
  const weekLabel = useMemo(() => formatWeekLabel(weekRange.start, weekRange.end), [weekRange]);
  
  const entriesThisWeek = useMemo(() => {
    return filterEntriesByWeek(rows, weekRange.start, weekRange.end);
  }, [rows, weekRange]);

  const totalHoursThisWeek = useMemo(() => {
    return calculateTotalHours(entriesThisWeek);
  }, [entriesThisWeek]);

  // Chart data
  const chartData = useMemo(() => {
    const grouped = groupEntriesByDay(entriesThisWeek);
    const days = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekRange.start);
      date.setDate(date.getDate() + i);
      const dayKey = format(date, "yyyy-MM-dd");
      const dayLabel = format(date, "EEE", { locale: vi });
      
      days.push({
        day: dayLabel,
        hours: grouped[dayKey] || 0,
      });
    }
    
    return days;
  }, [entriesThisWeek, weekRange]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/20">
            <Clock className="h-5 w-5 text-gold-400" />
          </div>
          <div>
            <div className="text-lg font-semibold text-zinc-50">Lịch sử chấm công</div>
            <div className="text-sm text-zinc-400">
              Xem biểu đồ giờ làm • Tuần tính từ Thứ 2 → Chủ Nhật
            </div>
          </div>
        </div>
      </Card>

      {/* Week Navigation */}
      <Card className="p-5">
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setWeekOffset(weekOffset - 1)}
            className="h-10"
          >
            <ChevronLeft className="h-4 w-4" />
            Tuần trước
          </Button>
          
          <div className="flex flex-col items-center">
            <div className="text-sm font-semibold text-white">{weekLabel}</div>
            <div className="mt-1 text-xs text-zinc-500">
              Tổng: <span className="font-bold text-gold-400">{totalHoursThisWeek.toFixed(1)}h</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setWeekOffset(weekOffset + 1)}
            disabled={weekOffset >= 0}
            className="h-10"
          >
            Tuần sau
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Chart */}
      <Card className="p-5">
        <div className="mb-4 text-sm font-semibold text-zinc-50">
          📊 Biểu đồ giờ làm việc
        </div>
        
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Spinner />
          </div>
        ) : chartData.every(d => d.hours === 0) ? (
          <div className="flex h-64 items-center justify-center text-sm text-zinc-400">
            Chưa có dữ liệu trong tuần này
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" opacity={0.3} />
              <XAxis
                dataKey="day"
                tick={{ fill: "#a1a1aa", fontSize: 12 }}
                axisLine={{ stroke: "#3f3f46" }}
              />
              <YAxis
                tick={{ fill: "#a1a1aa", fontSize: 12 }}
                axisLine={{ stroke: "#3f3f46" }}
                label={{ value: "Giờ", angle: -90, position: "insideLeft", fill: "#a1a1aa" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #3f3f46",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "#fafafa" }}
                itemStyle={{ color: "#fbbf24" }}
              />
              <Bar dataKey="hours" fill="#fbbf24" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>

      {/* Chi tiết gần đây */}
      <Card className="p-5">
        <div className="mb-4 text-sm font-semibold text-zinc-50">
          📋 Chi tiết gần đây (50 bản ghi)
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-sm text-zinc-300">
            <Spinner /> Đang tải…
          </div>
        ) : err ? (
          <div className="text-sm text-lacquer-200">{err}</div>
        ) : entriesThisWeek.length === 0 ? (
          <div className="text-sm text-zinc-300">Chưa có dữ liệu tuần này.</div>
        ) : (
          <div className="space-y-2">
            {entriesThisWeek.slice(0, 10).map((r) => {
              const hours = r.check_out_at
                ? ((new Date(r.check_out_at).getTime() - new Date(r.check_in_at).getTime()) / (1000 * 60 * 60)).toFixed(1)
                : null;

              return (
                <div
                  key={r.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                >
                  <div className="text-sm text-zinc-200">
                    {format(new Date(r.check_in_at), "dd/MM HH:mm", { locale: vi })}
                    {" → "}
                    {r.check_out_at ? format(new Date(r.check_out_at), "HH:mm", { locale: vi }) : "—"}
                  </div>
                  {hours && (
                    <div className="text-sm font-semibold text-gold-400">
                      {hours}h
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
