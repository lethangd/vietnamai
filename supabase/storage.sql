-- Supabase Storage policies for product images
-- Bucket: product-images (public read, admin write)

-- Option A (khuyên dùng): tạo bucket trong Dashboard > Storage > New bucket
-- - Name: product-images
-- - Public bucket: ON
--
-- Option B: tạo bucket bằng SQL (nếu quyền cho phép)
-- insert into storage.buckets (id, name, public)
-- values ('product-images', 'product-images', true)
-- on conflict (id) do update set public = true;

-- Policies
-- Lưu ý: Storage cũng có RLS riêng trên storage.objects.
-- Admin thao tác upload/update/delete thông qua Supabase Service Role (bypass RLS),
-- nên ở đây chỉ cần public read là đủ.

drop policy if exists "Product images public read" on storage.objects;
create policy "Product images public read"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'product-images');

-- Không tạo policy write cho authenticated (staff), để tránh lộ quyền upload từ client.

