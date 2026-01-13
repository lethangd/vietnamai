import { getAdminEnv } from "@/lib/admin/env";
import { verifyAdminSession, type AdminPayload } from "@/lib/admin/session";
import { headers } from "next/headers";

/**
 * Require admin authentication
 * Đọc JWT token từ Authorization header: "Bearer <token>"
 */
export async function requireAdmin(): Promise<AdminPayload | null> {
  const { secret } = getAdminEnv();
  const headersList = await headers();
  const authHeader = headersList.get("authorization");
  
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }
  
  const token = authHeader.slice(7); // Remove "Bearer " prefix
  if (!token) return null;
  
  return verifyAdminSession(token, secret);
}

