-- Migration: Thêm field facebook_url, tiktok_url vào bảng settings
-- Chạy file này trong Supabase SQL Editor

ALTER TABLE public.settings
ADD COLUMN IF NOT EXISTS facebook_url text null;

ALTER TABLE public.settings
ADD COLUMN IF NOT EXISTS tiktok_url text null;

COMMENT ON COLUMN public.settings.facebook_url IS 'Link Facebook hiển thị ở footer';
COMMENT ON COLUMN public.settings.tiktok_url IS 'Link TikTok hiển thị ở footer';
