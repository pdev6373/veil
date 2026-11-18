/** Hidden SVG sprite with the Veil mark + logo tile. Render once in the layout. */
export function LogoDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <linearGradient id="tileBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8E73FF" />
          <stop offset="1" stopColor="#5B3DF0" />
        </linearGradient>
        <radialGradient id="tileGlow" cx="0.22" cy="0.18" r="0.75">
          <stop offset="0" stopColor="#fff" stopOpacity=".28" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <symbol id="mark" viewBox="0 0 1024 1024">
          <path d="M318 330 C 380 420, 452 560, 512 690" fill="none" stroke="currentColor" strokeWidth="108" strokeLinecap="round" />
          <path d="M706 330 C 644 420, 572 560, 512 690" fill="none" stroke="currentColor" strokeOpacity=".5" strokeWidth="108" strokeLinecap="round" />
          <circle cx="512" cy="398" r="40" fill="currentColor" fillOpacity=".92" />
        </symbol>
        <symbol id="logo" viewBox="0 0 1024 1024">
          <rect width="1024" height="1024" rx="232" fill="url(#tileBg)" />
          <rect width="1024" height="1024" rx="232" fill="url(#tileGlow)" />
          <use href="#mark" color="#fff" />
        </symbol>
      </defs>
    </svg>
  );
}

export const Logo = ({ className }: { className?: string }) => (
  <svg className={className} aria-hidden="true">
    <use href="#logo" />
  </svg>
);

export const Mark = ({ className }: { className?: string }) => (
  <svg className={className} aria-hidden="true">
    <use href="#mark" color="#fff" />
  </svg>
);
