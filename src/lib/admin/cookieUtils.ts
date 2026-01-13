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
 * Cookie options cho admin session
 * Đảm bảo secure flag được set đúng trong production
 */
export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    secure: isProduction(), // Luôn secure trong production
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 ngày
  };
}

/**
 * Cookie options để xóa cookie (logout)
 */
export function getDeleteCookieOptions() {
  return {
    httpOnly: true,
    secure: isProduction(),
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
}
