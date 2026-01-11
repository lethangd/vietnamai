"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Shield, Zap, UserRoundCheck, Globe } from "lucide-react";
import { DrumDivider } from "@/components/vietnam/DrumDivider";

/**
 * Commitment Section (theo design mẫu)
 */
export function FeaturesSection() {
  const commitments = [
    {
      icon: BadgeCheck,
      title: "Sản phẩm đúng mô tả",
      description: "Dùng ổn định, không bán hàng kém chất lượng.",
      color: "from-gold-500 to-gold-600",
    },
    {
      icon: Shield,
      title: "Uy tín lâu dài",
      description: "Không đánh đổi niềm tin khách lấy lợi nhuận ngắn hạn.",
      color: "from-gold-500 to-gold-600",
    },
    {
      icon: Zap,
      title: "Tư vấn đúng nhu cầu",
      description: "Chỉ thanh toán khi quý khách cảm thấy ưng ý.",
      color: "from-lacquer-500 to-lacquer-600",
    },
    {
      icon: UserRoundCheck,
      title: "Hỗ trợ người thật",
      description: "Sẵn sàng call Zalo / Telegram khi khách cần.",
      color: "from-gold-500 to-gold-600",
    },
    {
      icon: Globe,
      title: "Minh bạch – rõ ràng",
      description: "Có lỗi xử lý thẳng, hoàn/đổi khi phát sinh sự cố.",
      color: "from-lacquer-500 to-lacquer-600",
    },
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
          <h2 className="text-balance text-3xl font-black tracking-tight text-white md:text-4xl lg:text-5xl">
            <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              CAM KẾT
            </span>{" "}
            CỦA{" "}
            <span className="text-zinc-200">VIETNAMAI.STORE</span>
          </h2>
        </motion.div>

        {/* Commitment Grid (giống ảnh: 3 trên, 2 dưới) */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {commitments.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative"
            >
              <div className="relative h-full overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/70 to-black p-6 shadow-[0_20px_60px_rgba(0,0,0,0.55)] transition-all hover:-translate-y-1 hover:border-zinc-700">
                {/* Icon (square) */}
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} shadow-lg`}
                >
                  <item.icon className="h-6 w-6 text-black/90" />
                </div>

                <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {item.description}
                </p>

                {/* Hover glow */}
                <div
                  className={`absolute -bottom-2 -right-2 h-28 w-28 rounded-full bg-gradient-to-br ${item.color} opacity-0 blur-3xl transition-opacity group-hover:opacity-20`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
