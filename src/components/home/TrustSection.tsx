"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { DrumDivider } from "@/components/vietnam/DrumDivider";

/**
 * Trust Section - Social Proof & Testimonials
 */
export function TrustSection() {
  const testimonials = [
    {
      name: "Nguyễn Văn A",
      role: "CEO, Công ty TNHH ABC",
      content: "VietnamAI giúp chúng tôi giảm 70% chi phí nhân sự CSKH. Chatbot hiểu tiếng Việt rất tốt, khách hàng hài lòng hơn.",
      rating: 5
    },
    {
      name: "Trần Thị B",
      role: "Founder, Shop Thời Trang XYZ",
      content: "Từ khi dùng VietnamAI, tỷ lệ chuyển đổi tăng 3 lần. Bot tư vấn sản phẩm 24/7, không bỏ lỡ khách hàng nào.",
      rating: 5
    },
    {
      name: "Lê Minh C",
      role: "Marketing Manager, Tech Startup",
      content: "Dễ tích hợp, giao diện thân thiện, support nhiệt tình. Recommend cho mọi doanh nghiệp Việt.",
      rating: 5
    }
  ];

  const stats = [
    { value: "100+", label: "Doanh nghiệp tin dùng" },
    { value: "50K+", label: "Khách hàng được phục vụ" },
    { value: "99.9%", label: "Uptime" },
    { value: "< 1s", label: "Thời gian phản hồi" }
  ];

  return (
    <section className="relative py-20 md:py-24">
      {/* Drum divider top */}
      <div className="absolute top-0 left-0 right-0">
        <DrumDivider />
      </div>

      {/* Background gradient với drum pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-lacquer-950/20 to-black">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "url('/images/drum-background.png')",
            backgroundSize: "900px",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            mixBlendMode: "luminosity",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/50 to-black p-6 text-center"
              >
                <div className="text-3xl font-bold text-gold-400 md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-zinc-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            Được tin dùng bởi{" "}
            <span className="bg-gradient-to-r from-lacquer-400 to-lacquer-600 bg-clip-text text-transparent">
              doanh nghiệp Việt
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-zinc-400 md:text-lg">
            Hàng trăm doanh nghiệp Việt Nam đã tối ưu chi phí và tăng doanh thu với VietnamAI
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group relative"
            >
              <div className="relative h-full overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-black p-6 transition-all hover:border-zinc-700">
                {/* Drum pattern background trong testimonial card */}
                <div
                  className="absolute inset-0 opacity-[0.02]"
                  style={{
                    backgroundImage: "url('/images/drum-background.png')",
                    backgroundSize: "250px",
                    backgroundPosition: "bottom right",
                    mixBlendMode: "overlay",
                  }}
                />
                {/* Quote icon */}
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/10">
                  <Quote className="h-5 w-5 text-gold-400" />
                </div>

                {/* Rating */}
                <div className="mb-3 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-sm leading-relaxed text-zinc-300">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="mt-4 border-t border-zinc-800 pt-4">
                  <div className="font-semibold text-white">
                    {testimonial.name}
                  </div>
                  <div className="mt-1 text-xs text-zinc-500">
                    {testimonial.role}
                  </div>
                </div>

                {/* Hover glow */}
                <div className="absolute -bottom-2 -right-2 h-24 w-24 rounded-full bg-gold-500/20 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-zinc-500">
            🇻🇳 Sản phẩm Việt Nam • 🔒 Bảo mật tuyệt đối • ⚡ Hỗ trợ 24/7
          </p>
        </motion.div>
      </div>
    </section>
  );
}
