"use client";

import { motion } from "framer-motion";
import { Bot, Zap, Globe, Shield, TrendingUp, Clock } from "lucide-react";
import { DrumDivider } from "@/components/vietnam/DrumDivider";

/**
 * Features Section - AI Capabilities cho thị trường Việt Nam
 */
export function FeaturesSection() {
  const features = [
    {
      icon: Bot,
      title: "AI Hiểu Tiếng Việt",
      description: "Chatbot được huấn luyện chuyên sâu với ngữ cảnh Việt Nam, hiểu văn hóa địa phương.",
      color: "from-gold-500 to-gold-600"
    },
    {
      icon: Zap,
      title: "Phản Hồi Tức Thì",
      description: "Trả lời khách hàng trong < 1 giây. Không để khách chờ đợi.",
      color: "from-lacquer-500 to-lacquer-600"
    },
    {
      icon: Clock,
      title: "Hoạt Động 24/7",
      description: "Chatbot làm việc không nghỉ, phục vụ khách hàng mọi lúc mọi nơi.",
      color: "from-gold-500 to-gold-600"
    },
    {
      icon: TrendingUp,
      title: "Tăng Doanh Thu",
      description: "Tự động tư vấn, up-sell, cross-sell thông minh. Tăng conversion 3-5x.",
      color: "from-lacquer-500 to-lacquer-600"
    },
    {
      icon: Shield,
      title: "Bảo Mật Tuyệt Đối",
      description: "Dữ liệu khách hàng được mã hóa, lưu trữ an toàn trên Supabase.",
      color: "from-gold-500 to-gold-600"
    },
    {
      icon: Globe,
      title: "Dễ Dàng Tích Hợp",
      description: "Kết nối với Website, Facebook, Zalo, Telegram chỉ trong vài phút.",
      color: "from-lacquer-500 to-lacquer-600"
    }
  ];

  return (
    <section className="relative py-20 md:py-24">
      {/* Drum divider top */}
      <div className="absolute top-0 left-0 right-0">
        <DrumDivider />
      </div>

      {/* Background gradient với drum pattern cực nhẹ */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/30 to-black">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: "url('/images/drum-background.png')",
            backgroundSize: "1200px",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            mixBlendMode: "overlay",
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
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            Tại sao chọn{" "}
            <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              VietnamAI
            </span>
            ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-zinc-400 md:text-lg">
            Giải pháp AI Chatbot được thiết kế riêng cho doanh nghiệp Việt Nam
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative"
            >
              <div className="relative h-full overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/50 to-black p-6 transition-all hover:border-zinc-700 hover:bg-zinc-900/70">
                {/* Icon */}
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>

                {/* Title */}
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {feature.description}
                </p>

                {/* Hover glow */}
                <div className={`absolute -bottom-2 -right-2 h-24 w-24 rounded-full bg-gradient-to-br ${feature.color} opacity-0 blur-2xl transition-opacity group-hover:opacity-20`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
