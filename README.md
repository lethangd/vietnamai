# VietnamAI 🇻🇳

**Giải pháp AI Chatbot cho doanh nghiệp Việt Nam**  
Landing page + Dashboard bán AI Chatbot với thiết kế **đẳng cấp quốc gia**.

---

## ✨ Highlights

- 🎨 **UI/UX "WOW trong 3 giây":** Gradient đỏ/vàng + họa tiết trống đồng animate
- 🇻🇳 **Vietnamese Modern Tech:** Đậm bản sắc Việt, không sến, không tuyên truyền
- ⚡ **Performance:** Framer Motion animations mượt, scroll smooth
- 💎 **Professional:** CTA Zalo/Telegram đẹp, glassmorphism cards
- 🔒 **Security:** Admin ENV login + Supabase RLS

---

## 🚀 Tech Stack
- **Frontend:** Next.js 15 (App Router) + TailwindCSS + Framer Motion
- **Backend:** Supabase (Auth + Database + Storage)
- **Deploy:** Vercel

---

## 📦 Features

### 🌐 **Landing Page (Public)**
- Hero WOW với sao vàng floating + trống đồng animate
- Product grid với filter/search, featured card viền vàng glow
- Features section (6 tính năng AI cho VN market)
- Trust section (testimonials + stats)
- CTA section cuối

### 🛍️ **Product Detail**
- Layout rõ ràng với card sections
- Pricing card gradient với discount badge
- Features list với checkmarks vàng
- **CTA Sidebar (sticky):** Glassmorphism với nút Zalo/Telegram đẹp chuyên nghiệp
- Trust badges (online, tiếng Việt, 100+ khách)

### 👨‍💼 **Admin Dashboard**
(Đăng nhập bằng ENV tại `/admin/login` - không lưu admin trong DB)
- CRUD **Sản phẩm** (tên, số lượng, ảnh upload, thể loại, giá, giảm giá %, mô tả HTML)
- CRUD **Thể loại**
- **Settings:** Link Zalo/Telegram
- CRUD **Đơn hàng** + filter theo **ngày mua / ngày hết hạn**
- **Quản lý Staff:** Tạo/xóa/reset password tài khoản staff
- **Chấm công:** Xem toàn bộ check-in/check-out + force checkout

### 👷 **Staff Dashboard**
(Đăng nhập bằng Supabase Auth tại `/login`)
- Check-in / Check-out
- Xem lịch sử chấm công

---

## 🎯 Quick Start

```bash
# 1. Clone repo
git clone <repo-url>
cd vietnamai

# 2. Setup ảnh background (QUAN TRỌNG)
# Copy 1 ảnh bạn muốn làm hero background vào:
# public/images/drum-background.png

# 3. Setup environment
cp docs/env.example .env.local
# Edit .env.local:
#   - NEXT_PUBLIC_SUPABASE_URL
#   - NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
#   - SUPABASE_SERVICE_ROLE_KEY
#   - ADMIN_EMAIL + ADMIN_PASSWORD + ADMIN_SESSION_SECRET

# 4. Install & Run
npm install
npm run dev
```

Mở `http://localhost:3000` → **WOW! 🔥**

**Nhìn ngay:**
- 🛍️ Nút scroll FIXED bottom-left pulse vàng (KHÔNG THỂ BỎ QUA)
- 💎 Card sản phẩm featured GẤP ĐÔI size, viền vàng glow
- 🇻🇳 Trống đồng chi tiết với ngôi sao + chim Lạc

---

## 📚 Documentation

- **`docs/SETUP.md`** - Hướng dẫn chi tiết cấu hình Supabase/Storage/Deploy Vercel
- **`docs/UI_UPGRADE_NATIONAL_LEVEL.md`** - Chi tiết redesign "tầm quốc gia"
- **`docs/DRUM_PATTERN_INTEGRATION.md`** - ⭐ Tích hợp trống đồng chi tiết (MỚI)
- **`docs/CONVERSION_FOCUSED_UPGRADE.md`** - Card sản phẩm conversion-focused
- **`docs/env.example`** - Template environment variables
- **`supabase/schema.sql`** - Database schema + RLS policies
- **`supabase/storage.sql`** - Storage bucket policies

---

## 🎨 Design Philosophy

### "Vietnamese Modern AI - Đẳng cấp quốc gia"

**Màu sắc:**
- 🔴 Đỏ đậm (cờ đỏ sao vàng): `lacquer-900` → `lacquer-950`
- 🟡 Vàng kim: `gold-400` → `gold-600`
- ⚫ Đen/xám: công nghệ hiện đại

**Họa tiết:**
- Trống đồng: Circular pattern SVG, animate rotate 360° (120s), opacity 8%
- Sao vàng: Floating animation với glow vàng
- KHÔNG dùng ảnh cờ full, KHÔNG sến

**Typography:**
- Heading: Font-black (900), 5xl → 8xl
- Gradient text vàng cho keywords
- Underline vàng animate

**Animations:**
- Scroll reveal fade-in/slide-up
- Floating elements (sao vàng, badges)
- Bounce animation (scroll button)
- Hover effects mượt (scale, glow)
- KHÔNG lắc/zoom quá/rối mắt

---

## 🔧 Project Structure

```
vietnamai/
├── src/
│   ├── app/
│   │   ├── page.tsx                  ← Home (Hero → Products → Features → Trust → CTA)
│   │   ├── products/[slug]/          ← Product detail
│   │   ├── admin/
│   │   │   ├── login/                ← Admin ENV login
│   │   │   └── (protected)/          ← Admin dashboard (guard bằng cookie)
│   │   ├── staff/                    ← Staff dashboard (guard bằng Supabase auth)
│   │   └── login/                    ← Staff Supabase login
│   ├── components/
│   │   ├── home/
│   │   │   ├── HomeHero.tsx          ← Hero WOW
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── TrustSection.tsx
│   │   │   └── CTASection.tsx
│   │   ├── products/
│   │   │   ├── ProductGridSection.tsx ← Pricing cards
│   │   │   └── ProductDetailClient.tsx ← CTA Zalo/Telegram
│   │   ├── vietnam/
│   │   │   ├── DrumPattern.tsx       ← Trống đồng animate
│   │   │   └── FlagStarMark.tsx      ← Sao vàng icon
│   │   └── site/
│   │       ├── SiteChrome.tsx        ← Header
│   │       └── SiteFooter.tsx
│   └── lib/
│       ├── supabase/
│       │   ├── browserClient.ts      ← Public client
│       │   ├── serviceClient.ts      ← Service role (admin)
│       │   └── adminQueries.ts       ← API calls
│       └── admin/
│           ├── session.ts            ← Admin cookie
│           └── guard.ts              ← Admin guard
├── supabase/
│   ├── schema.sql                    ← DB + RLS
│   └── storage.sql                   ← Storage policies
└── docs/
    ├── SETUP.md
    └── UI_UPGRADE_NATIONAL_LEVEL.md
```

---

## 🚢 Deploy to Vercel

1. Push repo to GitHub
2. Import to Vercel
3. Set Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
   SUPABASE_SERVICE_ROLE_KEY
   ADMIN_EMAIL
   ADMIN_PASSWORD
   ADMIN_SESSION_SECRET
   ```
4. Deploy 🚀

---

## 🎉 Result

**Nhìn vào website sẽ thấy:**

✨ **WOW trong 3 giây**
- Gradient đỏ/đen mạnh mẽ
- Sao vàng floating
- Trống đồng animate tinh tế
- Typography to đậm, dứt khoát

🇻🇳 **Việt Nam Modern Tech**
- Đậm bản sắc nhưng không sến
- Công nghệ AI hiện đại
- Trust signals everywhere

💎 **Chuyên nghiệp - Đáng tin - Đẳng cấp quốc gia**

---

Built with ❤️ in Vietnam 🇻🇳
