import { requireAdmin } from "@/lib/admin/requireAdmin";
import { getSupabaseServiceClient } from "@/lib/supabase/serviceClient";
import { NextResponse } from "next/server";

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, created_at")
    .order("name");
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = (await req.json().catch(() => null)) as any;
  const supabase = getSupabaseServiceClient();
  const { error } = await supabase.from("categories").upsert(
    {
      id: body?.id ?? undefined,
      name: body?.name,
      slug: body?.slug
    },
    { onConflict: "id" }
  );
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });
  const supabase = getSupabaseServiceClient();
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}

