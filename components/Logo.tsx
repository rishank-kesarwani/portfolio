export function Logo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logo-bg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0284c7" />
            <stop offset="0.5" stopColor="#0ea5e9" />
            <stop offset="1" stopColor="#38bdf8" />
          </linearGradient>
          <linearGradient id="logo-glow" x1="5" y1="5" x2="35" y2="35" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Background rounded squircle */}
        <rect width="40" height="40" rx="10" fill="url(#logo-bg)" />
        <rect
          x="1"
          y="1"
          width="38"
          height="38"
          rx="9"
          stroke="url(#logo-glow)"
          strokeWidth="1.5"
        />

        {/* Geometric stylized 'RK' Monogram */}
        {/* R - Stem */}
        <path
          d="M11 11V29"
          stroke="white"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* R - Loop */}
        <path
          d="M11 12H18C20.7614 12 23 14.0147 23 16.5C23 18.9853 20.7614 21 18 21H11"
          stroke="white"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* R - Leg & K - Dynamic Angled Arm */}
        <path
          d="M17 21L24 29"
          stroke="white"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* K - Top Diagonal */}
        <path
          d="M29 11L21 20"
          stroke="white"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* K - Bottom Diagonal */}
        <path
          d="M22 20L30 29"
          stroke="white"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Small glowing accent dot */}
        <circle cx="31" cy="9" r="2.2" fill="#38bdf8" stroke="#ffffff" strokeWidth="0.8" />
      </svg>
    </div>
  );
}
