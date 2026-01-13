export async function uploadProductImage(file: File, productId: string) {
  const form = new FormData();
  form.set("productId", productId);
  form.set("file", file);

  const res = await fetch("/api/admin/products/upload", { 
    method: "POST", 
    body: form,
    credentials: "include", // BẮT BUỘC để gửi cookie trong production
  });
  const json = (await res.json().catch(() => null)) as any;
  if (!res.ok) throw new Error(json?.error ?? "Upload thất bại");
  return json.data as { publicUrl: string; path: string };
}

