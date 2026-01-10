import type { SVGProps } from "react";

export function FlagStarMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 2.2l2.65 6.15 6.65.55-5.05 4.38 1.52 6.52L12 16.95 6.23 19.8l1.52-6.52L2.7 8.9l6.65-.55L12 2.2z"
        fill="currentColor"
      />
    </svg>
  );
}

