function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  const storedToken = localStorage.getItem("vietnamai_admin_token");
  const expiresAt = localStorage.getItem("vietnamai_admin_expires");
  if (!storedToken || !expiresAt) return null;
  if (parseInt(expiresAt, 10) <= Date.now()) return null;
  return storedToken;
}

export async function uploadProductImage(file: File, productId: string) {
  const form = new FormData();
  form.set("productId", productId);
  form.set("file", file);

  const token = getAdminToken();
  const headers: HeadersInit = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch("/api/admin/products/upload", { 
    method: "POST", 
    body: form,
    headers,
  });
  const json = (await res.json().catch(() => null)) as any;
  if (!res.ok) throw new Error(json?.error ?? "Upload thất bại");
  return json.data as { publicUrl: string; path: string };
}

