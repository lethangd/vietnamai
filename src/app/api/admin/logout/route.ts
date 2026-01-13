import { ADMIN_COOKIE_NAME } from "@/lib/admin/guard";
import { getDeleteCookieOptions } from "@/lib/admin/cookieUtils";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const res = NextResponse.redirect(new URL("/admin/login", req.url));
  res.cookies.set(ADMIN_COOKIE_NAME, "", getDeleteCookieOptions());
  return res;
}

