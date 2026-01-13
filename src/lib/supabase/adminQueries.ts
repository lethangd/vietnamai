import type { Category, Order, Product, Profile, Settings, TimeEntry } from "@/types/domain";
import { getAdminToken } from "@/lib/admin/AdminAuthProvider";

/**
 * Fetch JSON từ Admin API với JWT Authorization header
 */
async function adminFetchJson<T>(input: RequestInfo, init?: RequestInit) {
  const token = getAdminToken();
  
  const headers: HeadersInit = {
    ...(init?.headers as Record<string, string> | undefined),
  };
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  const res = await fetch(input, {
    ...init,
    headers,
  });
  
  const data = (await res.json().catch(() => null)) as any;
  
  if (!res.ok) {
    // Nếu unauthorized, có thể token hết hạn
    if (res.status === 401) {
      // Clear token và redirect đến login
      if (typeof window !== "undefined") {
        localStorage.removeItem("vietnamai_admin_token");
        localStorage.removeItem("vietnamai_admin_expires");
        window.location.href = "/admin/login";
      }
    }
    throw new Error(data?.error ?? "Admin API error");
  }
  
  return data as { data?: T; ok?: boolean };
}

export async function adminListCategories() {
  const res = await adminFetchJson<Category[]>("/api/admin/categories");
  return res.data ?? [];
}

export async function adminUpsertCategory(input: { id?: string; name: string; slug: string }) {
  await adminFetchJson("/api/admin/categories", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input)
  });
}

export async function adminDeleteCategory(id: string) {
  await adminFetchJson(`/api/admin/categories?id=${encodeURIComponent(id)}`, { method: "DELETE" });
}

export async function adminListProducts() {
  const res = await adminFetchJson<Product[]>("/api/admin/products");
  return res.data ?? [];
}

export async function adminUpsertProduct(input: Partial<Product> & { id?: string }) {
  const res = await adminFetchJson<Product | null>("/api/admin/products", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input)
  });
  return res.data ?? null;
}

export async function adminDeleteProduct(id: string) {
  await adminFetchJson(`/api/admin/products?id=${encodeURIComponent(id)}`, { method: "DELETE" });
}

export async function adminGetSettings() {
  const res = await adminFetchJson<Settings | null>("/api/admin/settings");
  return res.data ?? null;
}

export async function adminUpdateSettings(input: Partial<Settings> & { id: number }) {
  await adminFetchJson("/api/admin/settings", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input)
  });
}

export async function adminListOrders() {
  const res = await adminFetchJson<Order[]>("/api/admin/orders");
  return res.data ?? [];
}

export async function adminUpsertOrder(input: Partial<Order> & { id?: string }) {
  await adminFetchJson("/api/admin/orders", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input)
  });
}

export async function adminDeleteOrder(id: string) {
  await adminFetchJson(`/api/admin/orders?id=${encodeURIComponent(id)}`, { method: "DELETE" });
}

export async function adminListTimeEntries() {
  const res = await adminFetchJson<{ profiles: Profile[]; timeEntries: TimeEntry[] }>(
    "/api/admin/attendance"
  );
  return res.data?.timeEntries ?? [];
}

export async function adminUpdateTimeEntry(input: {
  id: string;
  check_out_at?: string | null;
}) {
  await adminFetchJson("/api/admin/attendance", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ type: "update_time_entry", ...input })
  });
}

export async function adminListProfiles() {
  const res = await adminFetchJson<{ profiles: Profile[]; timeEntries: TimeEntry[] }>(
    "/api/admin/attendance"
  );
  return res.data?.profiles ?? [];
}

