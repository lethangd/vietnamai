import { getAdminEnv } from "@/lib/admin/env";
import { verifyAdminSession } from "@/lib/admin/session";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "vietnamai_admin";

export async function getAdminFromCookie() {
  const { secret } = getAdminEnv();
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminSession(token, secret);
}

