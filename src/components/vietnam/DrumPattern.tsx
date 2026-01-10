"use client";

import { motion } from "framer-motion";

/**
 * Drum Pattern - Họa tiết trống đồng Đông Sơn thật
 * Sử dụng SVG chi tiết: Ngôi sao mặt trời + Chim Lạc + Viền trang trí
 */
export function DrumPattern() {
  return (
    <svg
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 1200"
    >
      <defs>
        {/* Gradient bronze cho trống đồng */}
        <radialGradient id="bronze" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#B87333" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#8C7853" stopOpacity="0.15" />
        </radialGradient>

        {/* Ngôi sao mặt trời - trung tâm */}
        <g id="sunStar">
          <circle cx="0" cy="0" r="30" fill="url(#bronze)" />
          <polygon
            points="0,-120 15,-85 60,-105 35,-75 85,-60 50,-50 85,0 50,10 60,55 15,30 0,70 -15,30 -60,55 -50,10 -85,0 -50,-50 -85,-60 -35,-75 -60,-105 -15,-85"
            fill="url(#bronze)"
          />
          <circle cx="0" cy="0" r="100" fill="none" stroke="url(#bronze)" strokeWidth="3" />
          <circle cx="0" cy="0" r="115" fill="none" stroke="url(#bronze)" strokeWidth="1.5" strokeDasharray="4,4" />
        </g>

        {/* Chim Lạc bay */}
        <g id="flyingCrane">
          <path
            fill="url(#bronze)"
            d="M115,25 C100,20 85,22 75,28 C70,20 65,10 55,5 C45,0 35,5 30,10 C32,18 38,22 45,25 C35,28 25,26 15,20 C10,17 5,18 2,22 C0,25 5,30 12,32 C25,36 40,34 50,30 C55,38 60,45 70,42 C80,39 85,30 88,25 C95,30 105,32 115,30 C118,29 118,26 115,25 Z M 40,15 C42,15 42,17 40,17 C38,17 38,15 40,15 Z"
          />
        </g>

        {/* Pattern viền răng cưa */}
        <pattern id="sawtooth" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <polygon points="0,30 15,0 30,30" fill="url(#bronze)" opacity="0.3" />
        </pattern>

        {/* Pattern vòng tròn chấm */}
        <pattern id="circlesDots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="15" fill="none" stroke="url(#bronze)" strokeWidth="2" opacity="0.3" />
          <circle cx="20" cy="20" r="4" fill="url(#bronze)" opacity="0.4" />
        </pattern>
      </defs>

      {/* Background rotate animation */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "600px 600px" }}
      >
        {/* Vòng ngoài cùng - viền răng cưa */}
        <circle cx="600" cy="600" r="580" fill="none" stroke="url(#sawtooth)" strokeWidth="40" />

        {/* Vòng pattern chấm tròn */}
        <circle cx="600" cy="600" r="520" fill="none" stroke="url(#circlesDots)" strokeWidth="60" />

        {/* Vòng chim Lạc bay (6 con) */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 600 + Math.cos(rad) * 400;
          const y = 600 + Math.sin(rad) * 400;
          return (
            <motion.g
              key={angle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: i * 0.2 }}
            >
              <use
                href="#flyingCrane"
                x={x}
                y={y}
                transform={`rotate(${angle + 90} ${x} ${y})`}
              />
            </motion.g>
          );
        })}

        {/* Vòng họa tiết phụ */}
        <circle cx="600" cy="600" r="250" fill="none" stroke="url(#bronze)" strokeWidth="2" opacity="0.4" />

        {/* 8 đường tia từ ngôi sao trung tâm */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 600 + Math.cos(rad) * 140;
          const y1 = 600 + Math.sin(rad) * 140;
          const x2 = 600 + Math.cos(rad) * 240;
          const y2 = 600 + Math.sin(rad) * 240;
          return (
            <line
              key={angle}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#bronze)"
              strokeWidth="2"
              opacity="0.3"
            />
          );
        })}

        {/* Ngôi sao mặt trời - trung tâm */}
        <motion.g
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <use href="#sunStar" x="600" y="600" />
        </motion.g>
      </motion.g>
    </svg>
  );
}
