# VietnamAI

Web bán AI chatbot cho khách hàng + dashboard Admin/Staff. Tối ưu chi phí server:

- **Frontend**: Next.js (App Router) + Tailwind
- **Backend/DB/Auth/Storage**: Supabase
- **Deploy**: Vercel

## Tính năng
- **Khách hàng (public)**: xem danh sách sản phẩm, lọc theo thể loại, xem chi tiết sản phẩm (mô tả HTML) + nút **Zalo/Telegram** bên phải.
- **Admin**:
  - CRUD **Sản phẩm** (tên, số lượng, ảnh, thể loại, giá, mô tả HTML, giảm giá %)
  - CRUD **Thể loại**
  - **Cài đặt** link Zalo/Telegram
  - CRUD **Đơn hàng** + filter theo **ngày mua / ngày hết hạn**
  - **Chấm công**: xem toàn bộ check-in/check-out + gán role staff/admin
- **Staff**: check-in/check-out + xem lịch sử.
  - Staff đăng nhập bằng Supabase Auth tại `/login`
  - Admin đăng nhập bằng ENV tại `/admin/login` (không lưu admin trong DB)

## Setup
Xem hướng dẫn chi tiết tại `docs/SETUP.md`.

## Env
Workspace hiện chặn tạo file `.env.example`. Bạn copy `docs/env.example` sang `.env.local` (root).
