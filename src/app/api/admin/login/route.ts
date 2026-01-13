import { getAdminEnv } from "@/lib/admin/env";
import { signAdminSession } from "@/lib/admin/session";
import { NextResponse } from "next/server";

/**
 * Admin Login API
 * Trả về JWT token trong response body (không dùng cookie)
 */
export async function POST(req: Request) {
  const { email: adminEmail, password: adminPassword, secret } = getAdminEnv();
  const body = await req.json().catch(() => null) as
    | { email?: string; password?: string }
    | null;

  const email = body?.email?.trim() ?? "";
  const password = body?.password ?? "";

  if (email !== adminEmail || password !== adminPassword) {
    return NextResponse.json({ ok: false, error: "Sai tài khoản hoặc mật khẩu" }, { status: 401 });
  }

  // Tạo JWT token với thời hạn 7 ngày
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7; // 7 ngày
  const token = signAdminSession({ email, iat, exp }, secret);
  
  return NextResponse.json({ 
    ok: true, 
    token,
    expiresAt: exp * 1000, // milliseconds for client
  });
}

