"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { adminGetSettings, adminUpdateSettings } from "@/lib/supabase/adminQueries";
import { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [zalo, setZalo] = useState("");
  const [telegram, setTelegram] = useState("");
  const [giftsHtml, setGiftsHtml] = useState("");

  useEffect(() => {
    async function run() {
      setLoading(true);
      setError(null);
      try {
        const s = await adminGetSettings();
        setZalo(s?.zalo_url ?? "");
        setTelegram(s?.telegram_url ?? "");
        setGiftsHtml(s?.gifts_html ?? "");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Không tải được dữ liệu");
      } finally {
        setLoading(false);
      }
    }
    void run();
  }, []);

  async function save() {
    setSaving(true);
    setError(null);
    try {
      await adminUpdateSettings({
        id: 1,
        zalo_url: zalo.trim() || null,
        telegram_url: telegram.trim() || null,
        gifts_html: giftsHtml.trim() || null
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lưu thất bại");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="text-lg font-semibold text-zinc-50">Cài đặt</div>
        <div className="mt-2 text-sm text-zinc-300">
          Cập nhật link <span className="text-gold-200">Zalo</span> /{" "}
          <span className="text-gold-200">Telegram</span> hiển thị ở trang chi tiết sản phẩm.
        </div>
      </Card>

      <Card className="p-5">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-zinc-300">
            <Spinner /> Đang tải…
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <div className="mb-1 text-xs text-zinc-300">Zalo URL</div>
              <Input
                value={zalo}
                onChange={(e) => setZalo(e.target.value)}
                placeholder="https://zalo.me/..."
              />
            </div>
            <div>
              <div className="mb-1 text-xs text-zinc-300">Telegram URL</div>
              <Input
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                placeholder="https://t.me/..."
              />
            </div>

            <div>
              <div className="mb-1 text-xs text-zinc-300">Quà tặng (HTML)</div>
              <textarea
                value={giftsHtml}
                onChange={(e) => setGiftsHtml(e.target.value)}
                placeholder={`Ví dụ:\n<p>🎁 Giảm 10% đơn đầu tiên</p>\n<!--gift-->\n<p>🎁 Tặng 3 ngày dùng thử miễn phí</p>\n<!--gift-->\n<p>🎁 Hỗ trợ ưu tiên 24/7</p>`}
                className="min-h-40 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300/60"
              />
              <div className="mt-2 text-xs text-zinc-500">
                Mỗi quà tách bằng <span className="text-zinc-200">&lt;!--gift--&gt;</span> hoặc dòng{" "}
                <span className="text-zinc-200">---</span>.
              </div>
            </div>

            {error ? (
              <div className="rounded-xl border border-lacquer-400/30 bg-lacquer-500/10 px-3 py-2 text-xs text-lacquer-200">
                {error}
              </div>
            ) : null}

            <Button onClick={() => void save()} disabled={saving}>
              {saving ? (
                <>
                  <Spinner /> Đang lưu…
                </>
              ) : (
                "Lưu"
              )}
            </Button>

            <div className="text-xs text-zinc-500">
              Gợi ý: giảm giá hiện đang quản lý theo từng sản phẩm qua trường{" "}
              <span className="text-zinc-200">discount_percent</span>.
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

