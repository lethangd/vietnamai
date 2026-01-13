"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { useEffect, useMemo, useState } from "react";

type StaffRow = {
  id: string;
  email: string | null;
  created_at: string;
  display_name: string | null;
};

function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  const storedToken = localStorage.getItem("vietnamai_admin_token");
  const expiresAt = localStorage.getItem("vietnamai_admin_expires");
  if (!storedToken || !expiresAt) return null;
  if (parseInt(expiresAt, 10) <= Date.now()) return null;
  return storedToken;
}

async function adminFetchJson<T>(input: RequestInfo, init?: RequestInit) {
  const token = getAdminToken();
  const headers: HeadersInit = {
    ...(init?.headers as Record<string, string> | undefined),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  const res = await fetch(input, { ...init, headers });
  const data = (await res.json().catch(() => null)) as any;
  if (!res.ok) {
    if (res.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("vietnamai_admin_token");
      localStorage.removeItem("vietnamai_admin_expires");
      window.location.href = "/admin/login";
    }
    throw new Error(data?.error ?? "Admin API error");
  }
  return data as { data?: T; ok?: boolean };
}

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<StaffRow[]>([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const canCreate = useMemo(() => email.trim() && password.trim(), [email, password]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await adminFetchJson<StaffRow[]>("/api/admin/staff");
      setRows(res.data ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không tải được dữ liệu");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function createStaff() {
    if (!canCreate) return;
    setBusy(true);
    setError(null);
    try {
      await adminFetchJson("/api/admin/staff", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          type: "create",
          email: email.trim(),
          password,
          display_name: displayName.trim() || null
        })
      });
      setEmail("");
      setPassword("");
      setDisplayName("");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Tạo staff thất bại");
    } finally {
      setBusy(false);
    }
  }

  async function deleteStaff(id: string) {
    if (!confirm("Xóa tài khoản staff này? (Sẽ xóa user + profile + time_entries theo cascade)")) return;
    setBusy(true);
    setError(null);
    try {
      await adminFetchJson(`/api/admin/staff?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Xóa thất bại");
    } finally {
      setBusy(false);
    }
  }

  async function resetPassword(id: string) {
    const newPass = prompt("Nhập mật khẩu mới cho staff:");
    if (!newPass) return;
    setBusy(true);
    setError(null);
    try {
      await adminFetchJson("/api/admin/staff", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ type: "reset_password", id, password: newPass })
      });
      alert("Đã reset mật khẩu.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Reset mật khẩu thất bại");
    } finally {
      setBusy(false);
    }
  }

  async function updateDisplayName(id: string, current: string | null) {
    const next = prompt("Display name:", current ?? "");
    if (next === null) return;
    setBusy(true);
    setError(null);
    try {
      await adminFetchJson("/api/admin/staff", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ type: "update_display_name", id, display_name: next })
      });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update thất bại");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="text-lg font-semibold text-zinc-50">Tài khoản staff</div>
        <div className="mt-2 text-sm text-zinc-300">
          Admin quản lý user trong Supabase Auth (create/reset/delete) + cập nhật display name trong `profiles`.
        </div>
      </Card>

      <Card className="p-5">
        <div className="text-sm font-semibold text-zinc-50">Tạo staff</div>
        <div className="mt-4 grid gap-2 md:grid-cols-3">
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email staff" />
          <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="mật khẩu" />
          <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="display name (tuỳ chọn)" />
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <Button onClick={() => void createStaff()} disabled={!canCreate || busy}>
            {busy ? (
              <>
                <Spinner /> Đang xử lý…
              </>
            ) : (
              "Tạo staff"
            )}
          </Button>
          <Button variant="outline" onClick={() => void load()} disabled={busy}>
            Reload
          </Button>
        </div>
        {error ? (
          <div className="mt-3 rounded-xl border border-lacquer-400/30 bg-lacquer-500/10 px-3 py-2 text-xs text-lacquer-200">
            {error}
          </div>
        ) : null}
      </Card>

      <Card className="p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold text-zinc-50">Danh sách</div>
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-zinc-300">
              <Spinner /> Đang tải…
            </div>
          ) : (
            <div className="text-xs text-zinc-500">Tổng: {rows.length}</div>
          )}
        </div>

        <div className="mt-4 space-y-2">
          {rows.map((r) => (
            <div
              key={r.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-zinc-100">
                  {r.display_name || "(chưa đặt tên)"}{" "}
                  <span className="text-xs font-normal text-zinc-500">
                    • {r.email ?? "no-email"}
                  </span>
                </div>
                <div className="truncate text-xs text-zinc-500">
                  {r.id} • {new Date(r.created_at).toLocaleString("vi-VN")}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="ghost" onClick={() => void updateDisplayName(r.id, r.display_name)} disabled={busy}>
                  Sửa tên
                </Button>
                <Button variant="outline" onClick={() => void resetPassword(r.id)} disabled={busy}>
                  Reset mật khẩu
                </Button>
                <Button variant="outline" onClick={() => void deleteStaff(r.id)} disabled={busy}>
                  Xóa
                </Button>
              </div>
            </div>
          ))}
          {!loading && rows.length === 0 ? (
            <div className="text-sm text-zinc-300">Chưa có staff.</div>
          ) : null}
        </div>
      </Card>
    </div>
  );
}

