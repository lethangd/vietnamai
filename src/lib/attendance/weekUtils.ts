import { startOfWeek, endOfWeek, addWeeks, format, differenceInHours } from "date-fns";
import { vi } from "date-fns/locale";
import type { TimeEntry } from "@/types/domain";

/**
 * Utility functions cho attendance - Tuần tính từ Thứ 2 → Chủ Nhật
 */

/**
 * Lấy tuần hiện tại (Thứ 2 → Chủ Nhật)
 */
export function getCurrentWeekRange() {
  const now = new Date();
  const start = startOfWeek(now, { weekStartsOn: 1 }); // 1 = Monday
  const end = endOfWeek(now, { weekStartsOn: 1 });
  return { start, end };
}

/**
 * Lấy range tuần bất kỳ (offset từ tuần hiện tại)
 * @param weekOffset 0 = tuần này, -1 = tuần trước, 1 = tuần sau
 */
export function getWeekRange(weekOffset: number = 0) {
  const now = new Date();
  const targetDate = addWeeks(now, weekOffset);
  const start = startOfWeek(targetDate, { weekStartsOn: 1 });
  const end = endOfWeek(targetDate, { weekStartsOn: 1 });
  return { start, end };
}

/**
 * Format tuần dạng "Tuần 1-7/1/2026"
 */
export function formatWeekLabel(start: Date, end: Date): string {
  const startDay = format(start, "d", { locale: vi });
  const endFull = format(end, "d/M/yyyy", { locale: vi });
  return `Tuần ${startDay}-${endFull}`;
}

/**
 * Tính tổng giờ làm từ danh sách time_entries
 */
export function calculateTotalHours(entries: TimeEntry[]): number {
  let total = 0;
  for (const entry of entries) {
    if (entry.check_out_at) {
      const checkIn = new Date(entry.check_in_at);
      const checkOut = new Date(entry.check_out_at);
      const hours = differenceInHours(checkOut, checkIn);
      total += hours;
    }
  }
  return total;
}

/**
 * Filter entries theo tuần
 */
export function filterEntriesByWeek(entries: TimeEntry[], start: Date, end: Date): TimeEntry[] {
  return entries.filter((e) => {
    const checkIn = new Date(e.check_in_at);
    return checkIn >= start && checkIn <= end;
  });
}

/**
 * Group entries theo ngày, tính tổng giờ mỗi ngày
 */
export function groupEntriesByDay(entries: TimeEntry[]): Record<string, number> {
  const result: Record<string, number> = {};
  
  for (const entry of entries) {
    if (entry.check_out_at) {
      const day = format(new Date(entry.check_in_at), "yyyy-MM-dd");
      const checkIn = new Date(entry.check_in_at);
      const checkOut = new Date(entry.check_out_at);
      const hours = differenceInHours(checkOut, checkIn);
      
      if (!result[day]) result[day] = 0;
      result[day] += hours;
    }
  }
  
  return result;
}
