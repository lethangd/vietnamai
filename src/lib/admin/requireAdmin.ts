import { getAdminEnv } from "@/lib/admin/env";
import { ADMIN_COOKIE_NAME } from "@/lib/admin/guard";
import { verifyAdminSession } from "@/lib/admin/session";
import { cookies } from "next/headers";

/**
 * Require admin authentication
 * Đọc cookie từ cookies() API (Next.js App Router)
 */
export async function requireAdmin() {
  const { secret } = getAdminEnv();
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminSession(token, secret);
}

