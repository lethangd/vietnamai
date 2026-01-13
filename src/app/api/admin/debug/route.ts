import { ADMIN_COOKIE_NAME } from "@/lib/admin/guard";
import { isProduction } from "@/lib/admin/cookieUtils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Debug endpoint to check cookie status
 * XÓA SAU KHI DEBUG XONG
 */
export async function GET() {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get(ADMIN_COOKIE_NAME);
  const allCookies = cookieStore.getAll();
  
  return NextResponse.json({
    debug: true,
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      VERCEL_ENV: process.env.VERCEL_ENV,
      VERCEL_URL: process.env.VERCEL_URL,
      isProduction: isProduction(),
      hasAdminEmail: !!process.env.ADMIN_EMAIL,
      hasAdminPassword: !!process.env.ADMIN_PASSWORD,
      hasAdminSecret: !!process.env.ADMIN_SESSION_SECRET,
    },
    cookies: {
      adminCookieName: ADMIN_COOKIE_NAME,
      adminCookiePresent: !!adminCookie,
      adminCookieValue: adminCookie ? `${adminCookie.value.substring(0, 20)}...` : null,
      allCookieNames: allCookies.map(c => c.name),
    },
  });
}
