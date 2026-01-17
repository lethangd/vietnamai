import { requireAdmin } from "@/lib/admin/requireAdmin";
import { getSupabaseServiceClient } from "@/lib/supabase/serviceClient";
import { NextResponse } from "next/server";

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("settings")
    .select("id, zalo_url, telegram_url, gifts_html, updated_at")
    .eq("id", 1)
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = (await req.json().catch(() => null)) as any;
  const supabase = getSupabaseServiceClient();
  const { error } = await supabase
    .from("settings")
    .update({
      zalo_url: body?.zalo_url ?? null,
      telegram_url: body?.telegram_url ?? null,
      gifts_html: body?.gifts_html ?? null
    })
    .eq("id", 1);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}

