import React from 'react';

interface ShahzeinBrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ShahzeinBrandLogo: React.FC<ShahzeinBrandLogoProps> = ({ size = 'md', className = '' }) => {
  // Sizing configurations ensuring it is bold and prominent (never tiny)
  const emblemSizes = {
    sm: 'h-11 w-9.5',
    md: 'h-14 w-12 sm:h-16 sm:w-14',
    lg: 'h-18 w-15 sm:h-22 sm:w-18',
  };

  const titleSizes = {
    sm: 'text-lg tracking-[0.2em]',
    md: 'text-xl sm:text-2xl lg:text-[26px] tracking-[0.22em]',
    lg: 'text-2xl sm:text-3xl lg:text-4xl tracking-[0.25em]',
  };

  const subSizes = {
    sm: 'text-[8.5px] tracking-[0.2em]',
    md: 'text-[9.5px] sm:text-[11px] tracking-[0.26em]',
    lg: 'text-xs sm:text-sm tracking-[0.3em]',
  };

  const taglineSizes = {
    sm: 'text-[7px] tracking-[0.14em]',
    md: 'text-[8px] sm:text-[9.5px] tracking-[0.18em]',
    lg: 'text-[10px] sm:text-xs tracking-[0.22em]',
  };

  return (
    <div className={`flex items-center gap-3 sm:gap-4 select-none ${className}`}>
      {/* ======================================================== */}
      {/* OFFICIAL GEOMETRIC ARCHITECTURAL SA PERFUME BOTTLE EMBLEM */}
      {/* ======================================================== */}
      <div className={`relative flex-shrink-0 ${emblemSizes[size]} transition-transform duration-300 group-hover:scale-105`}>
        <svg
          viewBox="0 0 320 380"
          className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] filter overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="brandGoldSheen" x1="15%" y1="0%" x2="85%" y2="100%">
              <stop offset="0%" stopColor="#fff9ea" />
              <stop offset="25%" stopColor="#f5dc99" />
              <stop offset="50%" stopColor="#ffd87d" />
              <stop offset="75%" stopColor="#c59b43" />
              <stop offset="100%" stopColor="#7a5518" />
            </linearGradient>

            <linearGradient id="brandGoldLight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fffdf6" />
              <stop offset="50%" stopColor="#f7e4b2" />
              <stop offset="100%" stopColor="#d4aa4d" />
            </linearGradient>

            <linearGradient id="brandGoldDeep" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#b88d3b" />
              <stop offset="70%" stopColor="#6e4d14" />
              <stop offset="100%" stopColor="#3d2a08" />
            </linearGradient>

            <filter id="subtleGoldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.8" />
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#faecc1" floodOpacity="0.25" />
            </filter>
          </defs>

          <g filter="url(#subtleGoldGlow)" strokeLinecap="round" strokeLinejoin="round">
            {/* 1. FACETED DIAMOND JEWEL STOPPER (CAP) */}
            <polygon
              points="128,36 192,36 226,62 160,102 94,62"
              fill="url(#brandGoldSheen)"
              stroke="#fffdf7"
              strokeWidth="1.5"
            />
            {/* Stopper facet reflections */}
            <polygon points="128,36 192,36 160,62" fill="#fffdf7" opacity="0.9" />
            <polygon points="128,36 94,62 160,62" fill="url(#brandGoldLight)" opacity="0.95" />
            <polygon points="192,36 226,62 160,62" fill="url(#brandGoldDeep)" />
            <polygon points="94,62 160,102 160,62" fill="url(#brandGoldLight)" />
            <polygon points="226,62 160,102 160,62" fill="url(#brandGoldDeep)" />
            <line x1="160" y1="36" x2="160" y2="102" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.95" />

            {/* 2. NECK & COLLAR RINGS */}
            {/* Upper Collar */}
            <rect x="120" y="104" width="80" height="7" rx="1.5" fill="url(#brandGoldLight)" stroke="#fff" strokeWidth="0.5" />
            {/* Neck Vertical Stem */}
            <rect x="134" y="111" width="12" height="24" fill="url(#brandGoldLight)" />
            <rect x="174" y="111" width="12" height="24" fill="url(#brandGoldDeep)" />
            {/* Lower Collar (Bottle Shoulder Ridge) */}
            <rect x="114" y="135" width="92" height="8" rx="2" fill="url(#brandGoldLight)" stroke="#fff" strokeWidth="0.5" />

            {/* 3. RIGHT FLACON SHOULDER & RIGHT VERTICAL WALL */}
            <path
              d="M 188 139 L 212 139 L 240 172 L 240 322"
              fill="none"
              stroke="url(#brandGoldSheen)"
              strokeWidth="8"
              strokeLinejoin="miter"
              strokeMiterlimit="4"
            />

            {/* Bottom Base Bar */}
            <path
              d="M 148 322 L 240 322"
              fill="none"
              stroke="url(#brandGoldSheen)"
              strokeWidth="8"
              strokeLinecap="square"
            />

            {/* 4. ARCHITECTURAL LETTER 'A' */}
            {/* Right leg of A (Slanted pillar to base) */}
            <path
              d="M 160 143 L 236 322"
              fill="none"
              stroke="url(#brandGoldSheen)"
              strokeWidth="11"
              strokeLinecap="square"
            />

            {/* Left leg of A (Slanted down to left base behind S) */}
            <path
              d="M 160 143 L 102 312"
              fill="none"
              stroke="url(#brandGoldSheen)"
              strokeWidth="9.5"
              strokeLinecap="square"
            />

            {/* Crossbar of A */}
            <path
              d="M 124 238 L 202 238"
              fill="none"
              stroke="url(#brandGoldSheen)"
              strokeWidth="8"
              strokeLinecap="square"
            />

            {/* 5. FLOWING INTERLOCKING LETTER 'S' */}
            {/* Forms the left shoulder of the flacon, sweeps across and loops at bottom */}
            <path
              d="M 148 143 C 114 138 82 158 82 194 C 82 230 120 236 144 248 C 172 262 178 282 172 304 C 164 326 134 334 104 330 C 78 326 66 310 66 286"
              fill="none"
              stroke="url(#brandGoldSheen)"
              strokeWidth="11.5"
              strokeLinecap="round"
            />

            {/* Beveled Highlight Accent Stripe on S */}
            <path
              d="M 144 145 C 116 140 86 160 86 194 C 86 228 122 234 146 246 C 170 260 174 278 168 300"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.85"
            />
          </g>
        </svg>
      </div>

      {/* ======================================================== */}
      {/* BRAND TYPOGRAPHY: SHAHZEIN.A PARFUMERIE                    */}
      {/* Bold, regal, luxury proportions                           */}
      {/* ======================================================== */}
      <div className="flex flex-col text-left">
        <div className="flex items-center">
          <span
            className={`font-cinzel font-bold ${titleSizes[size]} text-transparent bg-clip-text bg-gradient-to-r from-[#fff9ea] via-[#f7e0a3] to-[#c59b43] group-hover:from-[#ffffff] group-hover:via-[#ffebbd] group-hover:to-[#dfb967] transition-all duration-300 leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]`}
          >
            SHAHZEIN.A
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 mt-1 sm:mt-1.5">
          <span
            className={`font-cinzel font-semibold ${subSizes[size]} text-[#c59b43] tracking-[0.28em] group-hover:text-[#dfb967] transition-colors uppercase`}
          >
            PARFUMERIE
          </span>
          <span className="text-[#685333] font-light text-[9px]">•</span>
          <span
            className={`font-sans font-medium ${taglineSizes[size]} text-[#d6cab8] group-hover:text-[#f3ede2] transition-colors uppercase`}
          >
            BE REMEMBERED DIFFERENTLY
          </span>
        </div>
      </div>
    </div>
  );
};
