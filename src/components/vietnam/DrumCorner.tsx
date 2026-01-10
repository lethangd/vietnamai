"use client";

/**
 * Drum Corner - Họa tiết góc trống đồng
 * Dùng để trang trí góc card featured
 */
export function DrumCorner({ position = "top-left" }: { position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const positionClass = {
    "top-left": "top-0 left-0 rotate-0",
    "top-right": "top-0 right-0 -scale-x-100",
    "bottom-left": "bottom-0 left-0 -scale-y-100",
    "bottom-right": "bottom-0 right-0 scale-[-1]",
  }[position];

  return (
    <div className={`pointer-events-none absolute ${positionClass} h-24 w-24 opacity-20`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="bronzeCorner" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#B87333" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        {/* Vòng cung góc */}
        <path
          d="M 0,50 Q 0,0 50,0"
          fill="none"
          stroke="url(#bronzeCorner)"
          strokeWidth="2"
        />
        <path
          d="M 0,35 Q 0,0 35,0"
          fill="none"
          stroke="url(#bronzeCorner)"
          strokeWidth="1"
        />
        
        {/* Các chấm tròn trang trí */}
        <circle cx="15" cy="15" r="3" fill="url(#bronzeCorner)" />
        <circle cx="30" cy="8" r="2" fill="url(#bronzeCorner)" />
        <circle cx="8" cy="30" r="2" fill="url(#bronzeCorner)" />
        
        {/* Đường tia nhỏ */}
        <line x1="5" y1="5" x2="20" y2="20" stroke="url(#bronzeCorner)" strokeWidth="1" opacity="0.5" />
      </svg>
    </div>
  );
}
