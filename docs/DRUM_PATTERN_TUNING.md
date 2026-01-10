# Điều Chỉnh Độ Rõ Họa Tiết Trống Đồng

## 🎚️ Nếu bạn muốn TĂNG/GIẢM độ rõ của trống đồng

---

## 1️⃣ HERO SECTION (Quan trọng nhất)

**File:** `src/components/home/HomeHero.tsx`

**Tìm dòng:**
```tsx
<Image
  src="/images/drum-background.png"
  ...
  className="... opacity-25 blur-[2px]"
/>
```

**Điều chỉnh:**
- **Rõ hơn:** `opacity-30` hoặc `opacity-35`
- **Mờ hơn:** `opacity-20` hoặc `opacity-15`
- **Blur nhiều hơn:** `blur-[3px]` hoặc `blur-[4px]`
- **Blur ít hơn:** `blur-[1px]` hoặc bỏ blur

---

## 2️⃣ SECTION PRODUCTS

**File:** `src/components/products/ProductGridSection.tsx`

**Tìm:**
```tsx
style={{
  backgroundImage: "url('/images/drum-background.png')",
  ...
}}
className="... opacity-[0.02]"
```

**Điều chỉnh:**
- **Rõ hơn:** `opacity-[0.03]` → `opacity-[0.05]`
- **Mờ hơn:** `opacity-[0.01]`

---

## 3️⃣ CARD SẢN PHẨM (Trong card)

**File:** `src/components/products/ProductGridSection.tsx`

**Tìm trong card rendering:**
```tsx
<div className="... opacity-[0.02]" style={{ backgroundImage: ... }} />
```

**Điều chỉnh:**
- **Rõ hơn trong card:** `opacity-[0.04]`
- **Ẩn đi:** Xóa đoạn này

---

## 4️⃣ FEATURED CARD CORNERS

**File:** `src/components/vietnam/DrumCorner.tsx`

**Tìm:**
```tsx
<div className="... opacity-20">
```

**Điều chỉnh:**
- **Rõ hơn:** `opacity-30` hoặc `opacity-40`
- **Mờ hơn:** `opacity-10` hoặc `opacity-15`

---

## 5️⃣ DRUM DIVIDERS (Giữa sections)

**File:** `src/components/vietnam/DrumDivider.tsx`

**Tìm các opacity trong SVG:**
```tsx
<g ... opacity="0.4">
<pattern ... opacity="0.15">
```

**Điều chỉnh:**
- **Rõ hơn:** Tăng lên `0.5`, `0.6`
- **Mờ hơn:** Giảm xuống `0.2`, `0.1`

---

## 🎨 RECOMMENDATIONS (Đã test tối ưu)

### Nếu màn hình sáng:
- Tăng opacity Hero lên `0.3`
- Tăng Divider opacity lên `0.5`

### Nếu màn hình tối:
- Giữ nguyên (đã optimize cho dark mode)

### Nếu muốn "hồn Việt" mạnh hơn:
- Hero: `opacity-30`
- Featured corners: `opacity-30`
- Dividers: tăng SVG opacity lên `0.6`

### Nếu muốn "công nghệ hiện đại" hơn:
- Giảm opacity Hero xuống `0.15`
- Bỏ DrumCorners (comment out)
- Giữ Dividers nhẹ

---

## 🚀 QUICK TUNING EXAMPLES

### Example 1: "Đậm bản sắc Việt"
```tsx
// Hero
opacity-35 blur-[1px]

// Sections
opacity-[0.04]

// Corners
opacity-30
```

### Example 2: "Tech minimalist"
```tsx
// Hero
opacity-15 blur-[3px]

// Sections
opacity-[0.01]

// Corners
opacity-10 or remove
```

### Example 3: "Balanced" (Hiện tại - recommended)
```tsx
// Hero
opacity-25 blur-[2px]

// Sections
opacity-[0.015] - opacity-[0.02]

// Corners
opacity-20
```

---

## 🎯 SAU KHI ĐIỀU CHỈNH

1. Save file
2. Browser tự reload (Next.js Fast Refresh)
3. Nhìn lại → tinh chỉnh tiếp nếu cần

**Mục tiêu:** Nhận ra trống đồng, nhưng không gây rối mắt! ✅

---

Built with cultural pride 🇻🇳
