"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { slugify } from "@/lib/slug";
import {
  adminDeleteCategory,
  adminListCategories,
  adminUpsertCategory
} from "@/lib/supabase/adminQueries";
import type { Category } from "@/types/domain";
import { useEffect, useMemo, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<Category[]>([]);

  const [editId, setEditId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const canSave = useMemo(
    () => name.trim().length > 0 && slug.trim().length > 0,
    [name, slug]
  );

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await adminListCategories();
      setRows(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không tải được dữ liệu");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  function startCreate() {
    setEditId(null);
    setName("");
    setSlug("");
  }

  function startEdit(c: Category) {
    setEditId(c.id);
    setName(c.name);
    setSlug(c.slug);
  }

  async function onSave() {
    if (!canSave) return;
    setSaving(true);
    setError(null);
    try {
      await adminUpsertCategory({
        id: editId ?? undefined,
        name: name.trim(),
        slug: slug.trim()
      });
      await load();
      startCreate();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lưu thất bại");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Xóa thể loại này?")) return;
    setError(null);
    try {
      await adminDeleteCategory(id);
      await load();
      if (editId === id) startCreate();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Xóa thất bại");
    }
  }

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="text-lg font-semibold text-zinc-50">Thể loại</div>
        <div className="mt-2 text-sm text-zinc-300">
          Quản lý thể loại để filter sản phẩm ở trang khách hàng.
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <Card className="p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-zinc-50">Danh sách</div>
            <Button variant="outline" onClick={startCreate}>
              + Thêm mới
            </Button>
          </div>

          <div className="mt-4">
            {loading ? (
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <Spinner /> Đang tải…
              </div>
            ) : rows.length === 0 ? (
              <div className="text-sm text-zinc-300">Chưa có thể loại.</div>
            ) : (
              <div className="space-y-2">
                {rows.map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-zinc-100">
                        {c.name}
                      </div>
                      <div className="truncate text-xs text-zinc-400">{c.slug}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" onClick={() => startEdit(c)}>
                        Sửa
                      </Button>
                      <Button variant="outline" onClick={() => void onDelete(c.id)}>
                        Xóa
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-sm font-semibold text-zinc-50">
            {editId ? "Sửa thể loại" : "Thêm thể loại"}
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <div className="mb-1 text-xs text-zinc-300">Tên</div>
              <Input
                value={name}
                onChange={(e) => {
                  const v = e.target.value;
                  setName(v);
                  if (!editId) setSlug(slugify(v));
                }}
                placeholder="VD: Chatbot CSKH"
              />
            </div>
            <div>
              <div className="mb-1 text-xs text-zinc-300">Slug</div>
              <Input value={slug} onChange={(e) => setSlug(slugify(e.target.value))} />
            </div>

            {error ? (
              <div className="rounded-xl border border-lacquer-400/30 bg-lacquer-500/10 px-3 py-2 text-xs text-lacquer-200">
                {error}
              </div>
            ) : null}

            <Button className="w-full" onClick={() => void onSave()} disabled={!canSave || saving}>
              {saving ? (
                <>
                  <Spinner /> Đang lưu…
                </>
              ) : (
                "Lưu"
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

