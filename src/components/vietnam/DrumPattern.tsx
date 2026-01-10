export function DrumPattern() {
  // Simple, lightweight SVG pattern inspired by Đông Sơn drum geometry (abstracted).
  return (
    <svg
      aria-hidden="true"
      className="h-full w-full"
      viewBox="0 0 1200 800"
      preserveAspectRatio="none"
    >
      <defs>
        <radialGradient id="g1" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="rgba(255,208,18,0.35)" />
          <stop offset="55%" stopColor="rgba(255,208,18,0.08)" />
          <stop offset="100%" stopColor="rgba(255,208,18,0)" />
        </radialGradient>
        <pattern id="p" width="140" height="140" patternUnits="userSpaceOnUse">
          <circle cx="70" cy="70" r="46" fill="none" stroke="rgba(255,208,18,0.35)" strokeWidth="1" />
          <circle cx="70" cy="70" r="30" fill="none" stroke="rgba(244,63,94,0.28)" strokeWidth="1" />
          <path
            d="M70 18 L80 70 L70 122 L60 70 Z"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
          />
          <path
            d="M18 70 L70 60 L122 70 L70 80 Z"
            fill="none"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect width="1200" height="800" fill="url(#p)" />
      <circle cx="260" cy="220" r="220" fill="url(#g1)" />
      <circle cx="980" cy="160" r="180" fill="url(#g1)" />
    </svg>
  );
}

