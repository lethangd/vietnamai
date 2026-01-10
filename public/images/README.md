# Images Folder

## 📁 Cần thêm ảnh

Bạn cần copy 1 trong 2 ảnh đã gửi vào đây:

### 1. **Hero Background**
- Tên file: `drum-background.png`
- Vị trí: `public/images/drum-background.png`
- Ảnh gợi ý: Ảnh trống đồng HOẶC ảnh AI brain với circuit

### 2. **(Optional) Ảnh phụ**
- Có thể thêm thêm ảnh cho Product detail hoặc Features
- Đặt tên tùy ý, dùng `<Image src="/images/ten-anh.jpg" .../>`

---

## 🎨 Quy cách ảnh đề xuất

### Hero Background:
- **Kích thước:** 1920x1080 trở lên
- **Format:** JPG (tối ưu dung lượng) hoặc PNG
- **Dung lượng:** < 500KB (đã optimize)
- **Nội dung:** 
  - Ảnh trống đồng (bronze drum) → Cổ điển, văn hóa
  - Ảnh AI brain circuit → Công nghệ, hiện đại

### Favicon:
- ✅ Đã có `public/favicon.svg` (ngôi sao mặt trời trống đồng)
- Không cần thêm gì

---

## 🚀 Sau khi copy ảnh

1. Refresh browser (`Ctrl+F5` hoặc `Cmd+Shift+R`)
2. Hero background sẽ hiện ảnh bạn vừa copy
3. Nếu muốn đổi ảnh, chỉ cần replace file `drum-background.png`

---

## 🎨 Tips tối ưu ảnh

### Nếu ảnh quá nặng (> 500KB):

**Online tools:**
- https://tinypng.com (nén PNG/JPG)
- https://squoosh.app (Google, rất tốt)

**Hoặc dùng ImageMagick:**
```bash
# Resize + optimize
convert drum-background.png -resize 1920x1080 -quality 85 drum-background-optimized.jpg
```

---

Thế là xong! 🎉
