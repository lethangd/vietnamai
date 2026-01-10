import { requireAdmin } from "@/lib/admin/requireAdmin";
import { getSupabaseServiceClient } from "@/lib/supabase/serviceClient";
import { NextResponse } from "next/server";

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const supabase = getSupabaseServiceClient();

  const [profilesRes, timeRes] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, display_name, created_at")
      .order("created_at", { ascending: false })
      .limit(1000),
    supabase
      .from("time_entries")
      .select("id, staff_user_id, check_in_at, check_out_at, created_at")
      .order("check_in_at", { ascending: false })
      .limit(2000)
  ]);

  if (profilesRes.error) return NextResponse.json({ error: profilesRes.error.message }, { status: 400 });
  if (timeRes.error) return NextResponse.json({ error: timeRes.error.message }, { status: 400 });

  return NextResponse.json({ data: { profiles: profilesRes.data, timeEntries: timeRes.data } });
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = (await req.json().catch(() => null)) as any;
  const supabase = getSupabaseServiceClient();

  if (body?.type === "update_time_entry") {
    const { id, check_out_at } = body ?? {};
    const { error } = await supabase
      .from("time_entries")
      .update({ check_out_at: check_out_at ?? null })
      .eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "unknown action" }, { status: 400 });
}

