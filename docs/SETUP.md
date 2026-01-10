## VietnamAI — Hướng dẫn cấu hình Supabase + chạy local + deploy Vercel

### 1) Tạo Supabase Project
- Vào Supabase, tạo project mới.
- Vào **Project Settings → API**:
  - Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
  - Copy **Publishable key** (anon) → `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

### 2) Tạo bảng + RLS (DB)
- Mở **SQL Editor** trên Supabase.
- Copy toàn bộ nội dung file `supabase/schema.sql` và chạy.
- Sau khi chạy xong, kiểm tra có các bảng:
  - `categories`, `products`, `settings`, `orders`, `profiles`, `time_entries`

### 3) Cấu hình Storage (ảnh sản phẩm)
- Vào **Storage → New bucket**
  - **Name**: `product-images`
  - **Public bucket**: bật ON (để khách xem ảnh)
- Vào **SQL Editor**, chạy file `supabase/storage.sql` để tạo policies:
  - Public read ảnh
  - Admin upload/update/delete thông qua **Service Role API** (bypass RLS)

### 4) Auth (chỉ cho Staff)
- Vào **Authentication → Providers** bật **Email**
- Tạo user staff trong **Authentication → Users** (email/password)
- Staff đăng nhập tại `/login` và dùng các trang `/staff/*`

### 5) Admin login bằng ENV (không lưu trong DB)
- Admin đăng nhập tại `/admin/login`
- Bạn cần set các env sau trong `.env.local` và Vercel:
  - `ADMIN_EMAIL`
  - `ADMIN_PASSWORD`
  - `ADMIN_SESSION_SECRET`
  - `SUPABASE_SERVICE_ROLE_KEY` (**service_role key** trong Supabase Settings → API)
    - Nên dùng key dạng JWT bắt đầu bằng `eyJ...` (service_role). Nếu bạn copy nhầm `sb_publishable_*` hoặc key của project khác sẽ báo `Invalid API key`.

### (Tuỳ chọn) Quản lý tài khoản Staff
- Admin vào `/admin/staff` để:
  - Tạo user staff (email/password)
  - Reset mật khẩu
  - Xóa user
  - Sửa `display_name`

### 6) Cấu hình env cho Next.js
Do workspace đang chặn tạo `.env.example`, bạn làm như sau:
- Copy file `docs/env.example`
- Tạo file `.env.local` ở root project
- Dán 2 biến:
  - `NEXT_PUBLIC_SUPABASE_URL=...`
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=...`

### 7) Chạy project local
Trong thư mục project:

```bash
npm install
npm run dev
```

Sau đó mở `http://localhost:3000`

### 8) Sử dụng
- **Trang khách**:
  - `/` xem danh sách sản phẩm
  - `/products/[slug]` xem chi tiết + nút Zalo/Telegram
- **Đăng nhập**:
  - `/login`
- **Admin**:
  - `/admin/products` CRUD sản phẩm + upload ảnh
  - `/admin/categories` CRUD thể loại
  - `/admin/settings` set link Zalo/Telegram
  - `/admin/orders` CRUD đơn hàng + filter theo ngày mua/hết hạn
  - `/admin/attendance` quản lý chấm công + gán role
- **Staff**:
  - `/staff` check-in/check-out
  - `/staff/history` xem lịch sử

### 9) Deploy Vercel
- Push repo lên GitHub.
- Vào Vercel → **New Project** → import repo.
- **Environment Variables**:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
  - `ADMIN_EMAIL`
  - `ADMIN_PASSWORD`
  - `ADMIN_SESSION_SECRET`
  - `SUPABASE_SERVICE_ROLE_KEY`
- Deploy.

