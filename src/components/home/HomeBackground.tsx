"use client";

/**
 * HomeBackground - phủ trống đồng toàn bộ Home
 * Dùng CSS background-image trực tiếp (theo Context7) để opacity hoạt động đúng
 */
export function HomeBackground() {
  return (
    <>
      {/* Drum background - LAYER ĐẦU TIÊN, opacity cao để THẤY RÕ */}
      <div 
        className="pointer-events-none fixed inset-0 -z-0 overflow-hidden"
        style={{
          backgroundImage: "url('/images/drum-background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          opacity: 0.52,
          filter: "blur(0.8px)",
          mixBlendMode: "luminosity",
        }}
      />

      {/* Base gradient NHẸ (đỏ → đen) - overlay sau */}
      <div className="pointer-events-none fixed inset-0 -z-0 bg-gradient-to-b from-lacquer-950/25 via-black/40 to-black/70" />

      {/* Vignette CỰC NHẸ chỉ ở mép */}
      <div className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_65%,rgba(0,0,0,0.3)_92%)]" />
      
      {/* Golden light nhẹ bên phải */}
      <div className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(circle_at_72%_32%,rgba(255,215,0,0.06)_0%,transparent_42%)]" />
    </>
  );
}

