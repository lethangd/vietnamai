import { requireAdmin } from "@/lib/admin/requireAdmin";
import { getSupabaseServiceClient } from "@/lib/supabase/serviceClient";
import { NextResponse } from "next/server";

type StaffRow = {
  id: string;
  email: string | null;
  created_at: string;
  display_name: string | null;
};

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const supabase = getSupabaseServiceClient();

  const [{ data: usersData, error: usersError }, { data: profiles, error: profilesError }] =
    await Promise.all([
      supabase.auth.admin.listUsers({ page: 1, perPage: 200 }),
      supabase.from("profiles").select("id, display_name, created_at").order("created_at", { ascending: false }).limit(2000)
    ]);

  if (usersError) return NextResponse.json({ error: usersError.message }, { status: 400 });
  if (profilesError) return NextResponse.json({ error: profilesError.message }, { status: 400 });

  const displayNameById = new Map<string, string | null>(
    (profiles ?? []).map((p: any) => [p.id as string, (p.display_name as string | null) ?? null])
  );

  const rows: StaffRow[] = (usersData?.users ?? []).map((u) => ({
    id: u.id,
    email: u.email ?? null,
    created_at: u.created_at,
    display_name: displayNameById.get(u.id) ?? null
  }));

  return NextResponse.json({ data: rows });
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = (await req.json().catch(() => null)) as any;
  const supabase = getSupabaseServiceClient();

  // Create staff
  if (body?.type === "create") {
    const email = String(body?.email ?? "").trim().toLowerCase();
    const password = String(body?.password ?? "");
    const displayName = String(body?.display_name ?? "").trim();

    if (!email || !password) return NextResponse.json({ error: "missing email/password" }, { status: 400 });

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    // trigger sẽ tạo profiles row; set display_name nếu có
    if (data.user?.id && displayName) {
      const { error: updErr } = await supabase
        .from("profiles")
        .update({ display_name: displayName })
        .eq("id", data.user.id);
      if (updErr) return NextResponse.json({ error: updErr.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  }

  // Reset password
  if (body?.type === "reset_password") {
    const id = String(body?.id ?? "");
    const password = String(body?.password ?? "");
    if (!id || !password) return NextResponse.json({ error: "missing id/password" }, { status: 400 });
    const { error } = await supabase.auth.admin.updateUserById(id, { password });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  }

  // Update display name
  if (body?.type === "update_display_name") {
    const id = String(body?.id ?? "");
    const displayName = String(body?.display_name ?? "").trim();
    if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });
    const { error } = await supabase.from("profiles").update({ display_name: displayName || null }).eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "unknown action" }, { status: 400 });
}

export async function DELETE(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });

  const supabase = getSupabaseServiceClient();
  const { error } = await supabase.auth.admin.deleteUser(id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ ok: true });
}

