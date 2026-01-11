"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import {
  adminListProfiles,
  adminListTimeEntries,
  adminUpdateTimeEntry
} from "@/lib/supabase/adminQueries";
import {
  getCurrentWeekRange,
  getWeekRange,
  formatWeekLabel,
  calculateTotalHours,
  filterEntriesByWeek,
  groupEntriesByDay
} from "@/lib/attendance/weekUtils";
import type { Profile, TimeEntry } from "@/types/domain";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Clock, ChevronLeft, ChevronRight, UserCheck } from "lucide-react";

/**
 * Attendance Admin Page - CHARTS + FILTER + TUẦN THỨ 2-CN
 */
export default function Page() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [allEntries, setAllEntries] = useState<TimeEntry[]>([]);

  // Filter state
  const [selectedStaffId, setSelectedStaffId] = useState<string>("all");
  const [weekOffset, setWeekOffset] = useState<number>(0); // 0 = tuần này

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const [p, t] = await Promise.all([adminListProfiles(), adminListTimeEntries()]);
      setProfiles(p);
      setAllEntries(t);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không tải được dữ liệu");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  // Tuần hiện tại (Thứ 2 → Chủ Nhật)
  const weekRange = useMemo(() => getWeekRange(weekOffset), [weekOffset]);
  const weekLabel = useMemo(() => formatWeekLabel(weekRange.start, weekRange.end), [weekRange]);

  // Filter entries theo staff + tuần
  const filteredEntries = useMemo(() => {
    let entries = allEntries;
    
    // Filter theo staff
    if (selectedStaffId !== "all") {
      entries = entries.filter((e) => e.staff_user_id === selectedStaffId);
    }
    
    // Filter theo tuần
    entries = filterEntriesByWeek(entries, weekRange.start, weekRange.end);
    
    return entries;
  }, [allEntries, selectedStaffId, weekRange]);

  // Tổng giờ tuần
  const totalHoursThisWeek = useMemo(() => {
    return calculateTotalHours(filteredEntries);
  }, [filteredEntries]);

  // Chart data - Group theo ngày
  const chartData = useMemo(() => {
    const grouped = groupEntriesByDay(filteredEntries);
    const days = [];
    
    // 7 ngày từ Thứ 2 → Chủ Nhật
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekRange.start);
      date.setDate(date.getDate() + i);
      const dayKey = format(date, "yyyy-MM-dd");
      const dayLabel = format(date, "EEE", { locale: vi }); // Thứ 2, 3, 4...
      
      days.push({
        day: dayLabel,
        hours: grouped[dayKey] || 0,
      });
    }
    
    return days;
  }, [filteredEntries, weekRange]);

  // Profile map
  const profileMap = useMemo(() => {
    return new Map(profiles.map((p) => [p.id, p]));
  }, [profiles]);

  async function forceCheckout(id: string) {
    if (!confirm("Force check-out cho bản ghi này?")) return;
    setError(null);
    try {
      await adminUpdateTimeEntry({ id, check_out_at: new Date().toISOString() });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update thất bại");
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/20">
            <Clock className="h-5 w-5 text-gold-400" />
          </div>
          <div>
            <div className="text-lg font-semibold text-zinc-50">Chấm công (Quản lý)</div>
            <div className="text-sm text-zinc-400">
              Theo dõi giờ làm việc staff • Tuần tính từ <span className="text-gold-300">Thứ 2 → Chủ Nhật</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Filter Controls */}
      <Card className="p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_auto_auto]">
          {/* Staff Filter */}
          <div>
            <div className="mb-2 text-xs text-zinc-400">Chọn nhân viên</div>
            <select
              value={selectedStaffId}
              onChange={(e) => setSelectedStaffId(e.target.value)}
              className="h-11 w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 text-sm text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300/30"
            >
              <option value="all">Tất cả nhân viên</option>
              {profiles.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.display_name || p.id.slice(0, 8)}
                </option>
              ))}
            </select>
          </div>

          {/* Week Navigation */}
          <div>
            <div className="mb-2 text-xs text-zinc-400">Tuần</div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setWeekOffset(weekOffset - 1)}
                className="h-11 w-11 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex h-11 min-w-[180px] items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 text-sm font-medium text-zinc-200">
                {weekLabel}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setWeekOffset(weekOffset + 1)}
                className="h-11 w-11 p-0"
                disabled={weekOffset >= 0}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Reset button */}
          <div className="flex items-end">
            <Button
              variant="ghost"
              onClick={() => {
                setWeekOffset(0);
                setSelectedStaffId("all");
              }}
              className="h-11 text-xs text-zinc-400 hover:text-white"
            >
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/20">
              <Clock className="h-6 w-6 text-gold-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gold-400">
                {totalHoursThisWeek.toFixed(1)}h
              </div>
              <div className="text-xs text-zinc-500">Tổng giờ tuần này</div>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lacquer-500/20">
              <UserCheck className="h-6 w-6 text-lacquer-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {filteredEntries.length}
              </div>
              <div className="text-xs text-zinc-500">Lượt chấm công</div>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-700/50">
              <Clock className="h-6 w-6 text-zinc-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {filteredEntries.filter(e => !e.check_out_at).length}
              </div>
              <div className="text-xs text-zinc-500">Đang làm việc</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Chart - Biểu đồ giờ làm theo ngày */}
      <Card className="p-5">
        <div className="mb-4 text-sm font-semibold text-zinc-50">
          📊 Biểu đồ giờ làm việc theo ngày
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

      {/* Table - Chi tiết chấm công */}
      <Card className="p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm font-semibold text-zinc-50">
            📋 Chi tiết chấm công
          </div>
          <div className="text-xs text-zinc-500">
            {filteredEntries.length} bản ghi
          </div>
        </div>

        <div className="mt-4">
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-zinc-300">
              <Spinner /> Đang tải…
            </div>
          ) : error ? (
            <div className="text-sm text-lacquer-200">{error}</div>
          ) : filteredEntries.length === 0 ? (
            <div className="text-sm text-zinc-400">Chưa có dữ liệu.</div>
          ) : (
            <div className="space-y-2">
              {filteredEntries.map((r) => {
                const p = profileMap.get(r.staff_user_id);
                const active = !r.check_out_at;
                const hours = r.check_out_at
                  ? ((new Date(r.check_out_at).getTime() - new Date(r.check_in_at).getTime()) / (1000 * 60 * 60)).toFixed(1)
                  : null;

                return (
                  <div
                    key={r.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="truncate text-sm font-semibold text-zinc-100">
                          {p?.display_name || r.staff_user_id.slice(0, 8)}
                        </div>
                        {active && (
                          <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">
                            Đang làm
                          </span>
                        )}
                      </div>
                      <div className="mt-1 text-xs text-zinc-400">
                        In: {format(new Date(r.check_in_at), "dd/MM HH:mm", { locale: vi })}
                        {" • "}
                        Out: {r.check_out_at ? format(new Date(r.check_out_at), "dd/MM HH:mm", { locale: vi }) : "—"}
                        {hours && (
                          <>
                            {" • "}
                            <span className="font-semibold text-gold-400">{hours}h</span>
                          </>
                        )}
                      </div>
                    </div>
                    {active && (
                      <Button variant="outline" size="sm" onClick={() => void forceCheckout(r.id)}>
                        Force check-out
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
