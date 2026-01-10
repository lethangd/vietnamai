"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { DrumDivider } from "@/components/vietnam/DrumDivider";
import { DrumCorner } from "@/components/vietnam/DrumCorner";
import { applyDiscount, formatVnd } from "@/lib/money";
import { fetchPublicCatalog } from "@/lib/supabase/publicQueries";
import type { Category, Product } from "@/types/domain";
import { motion } from "framer-motion";
import { Check, Sparkles, Search, Filter, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

/**
 * Product Grid Section - CARD LÀ TRUNG TÂM THỊ GIÁC
 * Card to, shadow sâu, featured nổi bật cực kỳ
 */
export function ProductGridSection() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function run() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchPublicCatalog();
        setCategories(res.categories);
        setProducts(res.products);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Không tải được dữ liệu");
      } finally {
        setLoading(false);
      }
    }
    void run();
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return products.filter((p) => {
      const okCategory = category === "all" ? true : p.category_id === category;
      const okQuery = needle
        ? `${p.name} ${p.slug}`.toLowerCase().includes(needle)
        : true;
      return okCategory && okQuery;
    });
  }, [q, category, products]);

  // Featured product (discount > 0 hoặc tên chứa "Tuần")
  const featuredProductId = useMemo(() => {
    const featured = products.find(p => p.discount_percent > 0 || p.name.includes("Tuần"));
    return featured?.id;
  }, [products]);

  return (
    <section id="san-pham" className="relative scroll-mt-20 py-16 md:py-20">
      {/* Drum divider top */}
      <div className="absolute top-0 left-0 right-0">
        <DrumDivider />
      </div>

      {/* Background với drum pattern cực nhẹ */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/50 to-black">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "url('/images/drum-background.png')",
            backgroundSize: "600px",
            backgroundPosition: "center",
            backgroundRepeat: "repeat",
            mixBlendMode: "luminosity",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-gold-500/10 px-4 py-1.5 text-xs font-medium text-gold-300">
            <Sparkles className="h-3.5 w-3.5" />
            Các gói ChatGPT Plus
          </div>
          
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            Chọn gói phù hợp với nhu cầu của bạn
          </h2>
          
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-zinc-400 md:text-lg">
            Linh hoạt, minh bạch, không ràng buộc. Nâng cấp hoặc hủy bất cứ lúc nào.
          </p>
        </motion.div>

        {/* Filter & Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm theo tên gói..."
              className="h-11 w-64 border-zinc-800 bg-zinc-900/50 pl-10 text-sm backdrop-blur-sm focus:border-gold-500/50"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 appearance-none rounded-xl border border-zinc-800 bg-zinc-900/50 pl-10 pr-10 text-sm text-zinc-100 backdrop-blur-sm focus:border-gold-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300/30"
            >
              <option value="all">Tất cả thể loại</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Loading / Error */}
        {loading && (
          <div className="mt-12 flex items-center justify-center gap-2 text-sm text-zinc-400">
            <Spinner /> Đang tải sản phẩm…
          </div>
        )}

        {error && (
          <div className="mx-auto mt-12 max-w-md rounded-2xl border border-lacquer-500/30 bg-lacquer-500/10 px-4 py-3 text-center text-sm text-lacquer-300">
            {error}
          </div>
        )}

        {/* Product Cards Grid - TRUNG TÂM THỊ GIÁC */}
        {!loading && !error && (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((p, idx) => {
              const finalPrice = applyDiscount(p.price_vnd, p.discount_percent);
              const hasDiscount = p.discount_percent > 0;
              const isFeatured = p.id === featuredProductId;
              const cat = categories.find((c) => c.id === p.category_id)?.name;

              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={isFeatured ? "lg:col-span-2" : ""}
                >
                  <Link
                    href={`/products/${p.slug}`}
                    className="group relative block h-full"
                  >
                    {/* FEATURED BADGE - CỰC NỔI */}
                    {isFeatured && (
                      <motion.div
                        className="absolute -top-4 left-1/2 z-20 -translate-x-1/2"
                        animate={{
                          y: [0, -4, 0],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-5 py-2 text-sm font-bold text-black shadow-2xl shadow-gold-500/60">
                          <Star className="h-4 w-4 fill-current" />
                          Phổ biến nhất
                        </div>
                      </motion.div>
                    )}

                    {/* CARD - TO, SHADOW SÂU, NỔI BẬT */}
                    <motion.div
                      className={`
                        relative h-full overflow-hidden rounded-3xl border-2 bg-gradient-to-br transition-all duration-500
                        ${
                          isFeatured
                            ? "border-gold-500/60 from-gold-950/40 via-zinc-900 to-zinc-950 shadow-2xl shadow-gold-500/40 hover:shadow-[0_30px_90px_rgba(255,215,0,0.6)] hover:-translate-y-3"
                            : "border-zinc-800 from-zinc-900/80 to-black shadow-xl shadow-black/60 hover:border-zinc-700 hover:shadow-2xl hover:shadow-zinc-900/80 hover:-translate-y-2"
                        }
                      `}
                      whileHover={{ scale: isFeatured ? 1.02 : 1.01 }}
                    >
                      {/* Drum pattern background trong card - cực nhẹ */}
                      <div
                        className="absolute inset-0 opacity-[0.02]"
                        style={{
                          backgroundImage: "url('/images/drum-background.png')",
                          backgroundSize: "400px",
                          backgroundPosition: "center",
                          mixBlendMode: "overlay",
                        }}
                      />
                      {/* Glow overlay khi featured */}
                      {isFeatured && (
                        <>
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold-500/20 via-transparent to-gold-600/10 opacity-0 transition-opacity group-hover:opacity-100" />
                          {/* Animated border glow */}
                          <motion.div
                            className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 opacity-0 blur-xl transition-opacity group-hover:opacity-50"
                            animate={{
                              opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                          {/* Họa tiết trống đồng 4 góc */}
                          <DrumCorner position="top-left" />
                          <DrumCorner position="top-right" />
                          <DrumCorner position="bottom-left" />
                          <DrumCorner position="bottom-right" />
                        </>
                      )}

                      <div className={`relative ${isFeatured ? "p-8" : "p-6"}`}>
                        {/* Category badge */}
                        {cat && (
                          <div className="mb-4">
                            <Badge className={`border-zinc-700 bg-zinc-800/50 text-xs ${isFeatured ? "text-gold-300 border-gold-600/30 bg-gold-600/10" : "text-zinc-300"}`}>
                              {cat}
                            </Badge>
                          </div>
                        )}

                        {/* Product name - TO HƠN */}
                        <h3 className={`font-bold text-white transition-colors ${isFeatured ? "text-2xl md:text-3xl group-hover:text-gold-300" : "text-xl group-hover:text-gold-400"}`}>
                          {p.name}
                        </h3>

                        {/* Quantity info */}
                        {p.quantity > 0 && (
                          <p className="mt-2 text-xs text-zinc-500">
                            Thời gian sử dụng: <span className="text-zinc-400 font-medium">{p.quantity} ngày</span>
                          </p>
                        )}

                        {/* Price - CỰC NỔI */}
                        <div className={`${isFeatured ? "mt-8" : "mt-6"}`}>
                          {hasDiscount && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-zinc-500 line-through">
                                {formatVnd(p.price_vnd)}
                              </span>
                              <Badge className="border-lacquer-500/30 bg-lacquer-500/10 text-xs text-lacquer-300 font-bold">
                                -{p.discount_percent}%
                              </Badge>
                            </div>
                          )}
                          <div className="mt-1 flex items-baseline gap-1">
                            <span className={`font-bold ${isFeatured ? "text-4xl md:text-5xl text-gold-400" : "text-3xl text-white"}`}>
                              {formatVnd(finalPrice)}
                            </span>
                            <span className="text-sm text-zinc-500">/gói</span>
                          </div>
                        </div>

                        {/* Features list - RÕHƠN */}
                        <ul className={`space-y-3 ${isFeatured ? "mt-8" : "mt-6"}`}>
                          <li className="flex items-start gap-2 text-sm text-zinc-300">
                            <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${isFeatured ? "bg-gold-500/30" : "bg-gold-500/20"}`}>
                              <Check className={`h-3.5 w-3.5 ${isFeatured ? "text-gold-300" : "text-gold-400"}`} />
                            </div>
                            <span className={isFeatured ? "font-medium" : ""}>Tự do lựa chọn tài khoản ChatGPT</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm text-zinc-300">
                            <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${isFeatured ? "bg-gold-500/30" : "bg-gold-500/20"}`}>
                              <Check className={`h-3.5 w-3.5 ${isFeatured ? "text-gold-300" : "text-gold-400"}`} />
                            </div>
                            <span className={isFeatured ? "font-medium" : ""}>Không giới hạn tạo ảnh trong ngày</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm text-zinc-300">
                            <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${isFeatured ? "bg-gold-500/30" : "bg-gold-500/20"}`}>
                              <Check className={`h-3.5 w-3.5 ${isFeatured ? "text-gold-300" : "text-gold-400"}`} />
                            </div>
                            <span className={isFeatured ? "font-medium" : ""}>Không giới hạn hỏi thoại trong ngày</span>
                          </li>
                        </ul>

                        {/* CTA Button - TO, RÕ, TƯƠNG PHẢN */}
                        <Button
                          size={isFeatured ? "lg" : "default"}
                          className={`
                            mt-8 w-full transition-all group/btn
                            ${
                              isFeatured
                                ? "h-14 bg-gradient-to-r from-gold-500 to-gold-600 font-bold text-black shadow-xl shadow-gold-500/40 hover:shadow-2xl hover:shadow-gold-500/60 hover:scale-[1.02]"
                                : "h-12 border-2 border-zinc-700 bg-zinc-800/50 text-zinc-100 hover:border-gold-500/50 hover:bg-zinc-700/50"
                            }
                          `}
                        >
                          {isFeatured ? "Chọn gói ngay" : "Xem chi tiết"}
                          <ArrowRight className={`transition-transform group-hover/btn:translate-x-1 ${isFeatured ? "h-5 w-5" : "h-4 w-4"}`} />
                        </Button>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* No results */}
        {!loading && !error && filtered.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-sm text-zinc-400">
              Không tìm thấy sản phẩm phù hợp. Thử thay đổi bộ lọc.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
