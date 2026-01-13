/**
 * Cookie utilities for admin authentication
 * Đảm bảo cookie hoạt động đúng trong production (Vercel)
 */

/**
 * Detect if running in production environment
 * Check cả NODE_ENV và VERCEL env variable
 */
export function isProduction(): boolean {
  return (
    process.env.NODE_ENV === "production" ||
    process.env.VERCEL === "1" ||
    !!process.env.VERCEL_ENV
  );
}

/**
 * Lấy domain cho cookie
 * Trong production, set domain để cookie hoạt động với cả www và non-www
 */
function getCookieDomain(): string | undefined {
  // Trong production với custom domain, cần set domain để cookie hoạt động với www
  const vercelUrl = process.env.VERCEL_URL;
  const productionDomain = process.env.COOKIE_DOMAIN; // Optional: set COOKIE_DOMAIN=vietnamai.store
  
  if (productionDomain) {
    return productionDomain;
  }
  
  // Không set domain trong development hoặc preview
  // Để browser tự động dùng current host
  return undefined;
}

/**
 * Cookie options cho admin session
 * Đảm bảo secure flag được set đúng trong production
 */
export function getAdminCookieOptions() {
  const domain = getCookieDomain();
  const options: {
    httpOnly: boolean;
    secure: boolean;
    sameSite: "lax";
    path: string;
    maxAge: number;
    domain?: string;
  } = {
    httpOnly: true,
    secure: isProduction(), // Luôn secure trong production
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 ngày
  };
  
  // Chỉ thêm domain nếu được set
  if (domain) {
    options.domain = domain;
  }
  
  return options;
}

/**
 * Cookie options để xóa cookie (logout)
 */
export function getDeleteCookieOptions() {
  const domain = getCookieDomain();
  const options: {
    httpOnly: boolean;
    secure: boolean;
    sameSite: "lax";
    path: string;
    maxAge: number;
    domain?: string;
  } = {
    httpOnly: true,
    secure: isProduction(),
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
  
  if (domain) {
    options.domain = domain;
  }
  
  return options;
}
