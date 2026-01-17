"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { fetchSettings } from "@/lib/supabase/publicQueries";
import type { Settings } from "@/types/domain";
import { AnimatePresence, motion } from "framer-motion";
import { Gift, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "vietnamai_gift_claimed";

function normalizeGiftList(input: unknown) {
  if (!input) return [];
  if (Array.isArray(input)) {
    return input.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof input === "string") {
    const raw = input.trim();
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item).trim()).filter(Boolean);
      }
    } catch {
      return [raw];
    }
  }
  return [];
}

export function GiftBoxPopup() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [claimed, setClaimed] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const alreadyClaimed = localStorage.getItem(STORAGE_KEY) === "1";
    if (alreadyClaimed) {
      setClaimed(true);
      setLoading(false);
      return;
    }

    setClaimed(false);
    async function run() {
      try {
        const s = await fetchSettings();
        setSettings(s);
      } catch {
        setSettings(null);
      } finally {
        setLoading(false);
      }
    }
    void run();
  }, []);

  const gifts = useMemo(() => normalizeGiftList(settings?.gifts_html), [settings?.gifts_html]);
  const canShowGift = !loading && !claimed && gifts.length > 0;

  function openGift() {
    if (!gifts.length) return;
    const picked = gifts[Math.floor(Math.random() * gifts.length)];
    setSelectedGift(picked);
    setOpen(true);
    localStorage.setItem(STORAGE_KEY, "1");
    setClaimed(true);
  }

  function closeGift() {
    setOpen(false);
  }

  if (!canShowGift && !open) return null;

  return (
    <>
      {canShowGift && (
        <motion.button
          type="button"
          aria-label="Mở quà tặng"
          className="group fixed bottom-6 left-6 z-50 flex items-center gap-3 rounded-full border border-gold-400/40 bg-gradient-to-r from-gold-400 to-gold-600 px-5 py-4 text-sm font-bold text-black shadow-2xl shadow-gold-500/50 transition-all hover:scale-105 hover:shadow-gold-500/70"
          onClick={openGift}
          initial={{ x: -80, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            scale: [1, 1.06, 1],
            boxShadow: [
              "0 12px 40px rgba(255, 215, 0, 0.5)",
              "0 16px 55px rgba(255, 215, 0, 0.8)",
              "0 12px 40px rgba(255, 215, 0, 0.5)",
            ],
          }}
          transition={{
            x: { duration: 0.6 },
            opacity: { duration: 0.6 },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="relative"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Gift className="h-6 w-6" />
            <div className="absolute inset-0 -z-10 rounded-full bg-gold-300 blur-md opacity-70 transition-opacity group-hover:opacity-100" />
          </motion.div>
          <span className="hidden md:inline">Mở quà tặng</span>
          <motion.div
            animate={{ rotate: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="h-5 w-5" />
          </motion.div>
        </motion.button>
      )}

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGift}
          >
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="relative w-full max-w-md"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="relative overflow-hidden border-gold-400/30 bg-gradient-to-br from-black via-zinc-950 to-black p-6 shadow-2xl shadow-gold-500/30">
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage: "url('/images/drum-background.png')",
                    backgroundSize: "500px",
                    backgroundPosition: "center",
                    mixBlendMode: "overlay",
                  }}
                />
                <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-gold-500/20 blur-3xl" />

                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gold-300">
                      <Gift className="h-4 w-4" />
                      Quà tặng dành riêng cho bạn
                    </div>
                    <button
                      className="rounded-lg p-1 text-zinc-400 hover:bg-white/10 hover:text-white"
                      onClick={closeGift}
                      aria-label="Đóng popup"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-200">
                    {selectedGift ? (
                      <div dangerouslySetInnerHTML={{ __html: selectedGift }} />
                    ) : (
                      "Chưa có quà tặng."
                    )}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" onClick={closeGift}>
                      Đóng
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
