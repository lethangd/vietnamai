"use client";

import Image from "next/image";

/**
 * HomeBackground - phủ trống đồng toàn bộ Home (mờ + blur + overlay đỏ→đen)
 * Mục tiêu: thấy trống đồng nhưng không rối, không bị "viền ảnh".
 */
export function HomeBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-lacquer-950/75 via-black to-black" />

      {/* Golden light on right */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_28%,rgba(255,215,0,0.18)_0%,transparent_52%)]" />

      {/* Drum image (center + scale) */}
      <div className="absolute inset-0">
        <Image
          src="/images/drum-background.png"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-[0.22] blur-[1.5px]"
          style={{
            mixBlendMode: "luminosity",
            // fade edges để tránh cảm giác “viền ảnh”
            maskImage:
              "radial-gradient(circle at 55% 45%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 78%)",
          }}
        />
      </div>

      {/* Extra soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_72%)]" />
    </div>
  );
}

