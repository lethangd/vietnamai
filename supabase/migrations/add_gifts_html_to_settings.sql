-- Migration: Thêm field gifts_html (HTML string) vào bảng settings
-- Chạy file này trong Supabase SQL Editor

ALTER TABLE public.settings
ADD COLUMN IF NOT EXISTS gifts_html text null;

COMMENT ON COLUMN public.settings.gifts_html IS 'HTML string chứa danh sách quà tặng (phân tách bằng <!--gift--> hoặc ---)';
