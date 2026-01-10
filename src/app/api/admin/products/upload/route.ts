import { requireAdmin } from "@/lib/admin/requireAdmin";
import { getSupabaseServiceClient } from "@/lib/supabase/serviceClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const form = await req.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "invalid form" }, { status: 400 });

  const productId = String(form.get("productId") ?? "");
  const file = form.get("file");
  if (!productId) return NextResponse.json({ error: "missing productId" }, { status: 400 });
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "missing file" }, { status: 400 });
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const safeName = file.name.replace(/[^\w.\-]+/g, "_");
  const path = `products/${productId}/${Date.now()}_${safeName}.${ext}`.replace(
    /\.([a-z0-9]+)\.([a-z0-9]+)$/i,
    ".$2"
  );

  const supabase = getSupabaseServiceClient();
  const bytes = new Uint8Array(await file.arrayBuffer());

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(path, bytes, { upsert: true, contentType: file.type });
  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 400 });

  const { data } = supabase.storage.from("product-images").getPublicUrl(path);
  return NextResponse.json({ data: { publicUrl: data.publicUrl, path } });
}

