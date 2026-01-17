-- Migration: Thêm field gifts_html (JSON array HTML string) vào bảng settings
-- Chạy file này trong Supabase SQL Editor

ALTER TABLE public.settings
ADD COLUMN IF NOT EXISTS gifts_html jsonb null default '[]'::jsonb;

ALTER TABLE public.settings
ALTER COLUMN gifts_html TYPE jsonb
USING CASE
  WHEN gifts_html IS NULL THEN '[]'::jsonb
  WHEN gifts_html::text ~ '^\s*\[' THEN gifts_html::jsonb
  ELSE jsonb_build_array(gifts_html::text)
END;

COMMENT ON COLUMN public.settings.gifts_html IS 'JSON array các HTML string quà tặng';
