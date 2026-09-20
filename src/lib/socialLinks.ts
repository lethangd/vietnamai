/**
 * Chuẩn hóa link mạng xã hội do admin nhập.
 * Cho phép nhập nhiều kiểu: "@username", "username", "t.me/username",
 * hoặc URL đầy đủ "https://t.me/username" — luôn trả ra URL tuyệt đối hợp lệ.
 */
function normalizeSocialUrl(raw: string | null | undefined, host: string): string | null {
  const value = raw?.trim();
  if (!value) return null;

  // Đã là URL tuyệt đối (http/https) -> giữ nguyên
  if (/^https?:\/\//i.test(value)) return value;

  // Dạng "domain.com/..." hoặc "www.domain.com/..." thiếu scheme
  if (/^([\w-]+\.)+[\w-]+\//i.test(value) || /^([\w-]+\.)+[\w-]+$/i.test(value)) {
    return `https://${value}`;
  }

  // Dạng "@username" hoặc "username"
  const username = value.replace(/^@/, "");
  return `https://${host}/${username}`;
}

export function normalizeTelegramUrl(raw: string | null | undefined): string | null {
  return normalizeSocialUrl(raw, "t.me");
}

export function normalizeFacebookUrl(raw: string | null | undefined): string | null {
  return normalizeSocialUrl(raw, "facebook.com");
}

export function normalizeTiktokUrl(raw: string | null | undefined): string | null {
  const value = raw?.trim();
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return value;
  if (/^([\w-]+\.)+[\w-]+\//i.test(value) || /^([\w-]+\.)+[\w-]+$/i.test(value)) {
    return `https://${value}`;
  }
  const username = value.replace(/^@/, "");
  return `https://tiktok.com/@${username}`;
}

export function normalizeZaloUrl(raw: string | null | undefined): string | null {
  const value = raw?.trim();
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return value;
  if (/^([\w-]+\.)+[\w-]+\//i.test(value) || /^([\w-]+\.)+[\w-]+$/i.test(value)) {
    return `https://${value}`;
  }
  return `https://zalo.me/${value.replace(/^@/, "")}`;
}
