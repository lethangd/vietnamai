"use client";

/**
 * Drum Divider - Họa tiết trống đồng làm divider giữa sections
 * Tinh tế, không lấn át nội dung
 */
export function DrumDivider() {
  return (
    <div className="relative h-16 w-full overflow-hidden">
      {/* Background gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-900/50 to-transparent" />
      
      {/* SVG pattern trống đồng - viền trang trí */}
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 60"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="bronzeLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0" />
            <stop offset="20%" stopColor="#d4af37" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#B87333" stopOpacity="0.5" />
            <stop offset="80%" stopColor="#d4af37" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </linearGradient>

          {/* Pattern vòng tròn nhỏ */}
          <pattern id="miniCircles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="8" fill="none" stroke="#B87333" strokeWidth="1" opacity="0.2" />
            <circle cx="20" cy="20" r="2" fill="#d4af37" opacity="0.3" />
          </pattern>
        </defs>

        {/* Line chính */}
        <line x1="0" y1="30" x2="1200" y2="30" stroke="url(#bronzeLine)" strokeWidth="2" />
        
        {/* Các vòng tròn trang trí rải đều */}
        {[150, 350, 600, 850, 1050].map((x) => (
          <g key={x} opacity="0.4">
            <circle cx={x} cy="30" r="20" fill="none" stroke="#d4af37" strokeWidth="1" />
            <circle cx={x} cy="30" r="12" fill="none" stroke="#B87333" strokeWidth="0.5" />
            <circle cx={x} cy="30" r="4" fill="#d4af37" />
          </g>
        ))}

        {/* Pattern nhỏ background */}
        <rect x="0" y="0" width="1200" height="60" fill="url(#miniCircles)" opacity="0.15" />
      </svg>
    </div>
  );
}
