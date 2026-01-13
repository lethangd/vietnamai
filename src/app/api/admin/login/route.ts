import { getAdminEnv } from "@/lib/admin/env";
import { ADMIN_COOKIE_NAME } from "@/lib/admin/guard";
import { signAdminSession } from "@/lib/admin/session";
import { getAdminCookieOptions } from "@/lib/admin/cookieUtils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email: adminEmail, password: adminPassword, secret } = getAdminEnv();
  const body = await req.json().catch(() => null) as
    | { email?: string; password?: string }
    | null;

  const email = body?.email?.trim() ?? "";
  const password = body?.password ?? "";

  // NOTE: Không log password.
  if (email !== adminEmail || password !== adminPassword) {
    return NextResponse.json({ ok: false, error: "Sai tài khoản hoặc mật khẩu" }, { status: 401 });
  }

  const token = signAdminSession({ email, iat: Math.floor(Date.now() / 1000) }, secret);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, token, getAdminCookieOptions());
  return res;
}

