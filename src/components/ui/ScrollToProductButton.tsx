"use client";

import { motion } from "framer-motion";
import { ShoppingBag, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * Scroll To Product Button - FIXED bottom-left
 * UX Critical: Người dùng LUÔN thấy nút này
 * Pulse animation liên tục để không thể bỏ qua
 */
export function ScrollToProductButton() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Ẩn nút khi đã scroll tới section sản phẩm
      const productSection = document.getElementById("san-pham");
      if (productSection) {
        const rect = productSection.getBoundingClientRect();
        setIsVisible(rect.top > 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToProducts = () => {
    const element = document.getElementById("san-pham");
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!isVisible) return null;

  return (
    <motion.button
      onClick={scrollToProducts}
      className="group fixed bottom-8 left-8 z-50 flex items-center gap-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-4 text-base font-bold text-black shadow-2xl shadow-gold-500/60 transition-all hover:scale-105 hover:shadow-gold-500/80 md:px-8 md:py-5"
      initial={{ x: -100, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
        scale: [1, 1.05, 1],
        boxShadow: [
          "0 20px 60px rgba(255, 215, 0, 0.6)",
          "0 25px 80px rgba(255, 215, 0, 0.8)",
          "0 20px 60px rgba(255, 215, 0, 0.6)",
        ],
      }}
      transition={{
        x: { duration: 0.6, delay: 1.5 },
        opacity: { duration: 0.6, delay: 1.5 },
        scale: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
        boxShadow: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Icon bag */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <ShoppingBag className="h-6 w-6 md:h-7 md:w-7" />
        {/* Glow pulse behind icon */}
        <div className="absolute inset-0 -z-10 rounded-full bg-gold-300 blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
      </motion.div>

      {/* Text */}
      <span className="hidden md:inline">Xem sản phẩm</span>

      {/* Chevron down - bounce */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-5 w-5 md:h-6 md:w-6" />
      </motion.div>

      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-gold-400"
        animate={{
          scale: [1, 1.3],
          opacity: [0.8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
    </motion.button>
  );
}
