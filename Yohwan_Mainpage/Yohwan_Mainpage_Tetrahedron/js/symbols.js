export const FACE_LINKS = {
  west: "subproject-1/index.html",
  middleEast: "middleeast_alchemy_subpage2/index.html",
  east: "east_rowing_subpage3/index.html",
};

/* Exact violin composition from subproject-1/index.html */
export const VIOLIN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="250 -50 720 900">
  <defs>
    <linearGradient id="varnish" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A0522D"/>
      <stop offset="35%" stop-color="#CD853F"/>
      <stop offset="70%" stop-color="#8B4513"/>
      <stop offset="100%" stop-color="#5C2E0A"/>
    </linearGradient>
    <linearGradient id="neckWood" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2C1810"/>
      <stop offset="100%" stop-color="#4A2C1A"/>
    </linearGradient>
    <linearGradient id="fingerboardGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0f0a06"/>
      <stop offset="50%" stop-color="#1a1208"/>
      <stop offset="100%" stop-color="#0f0a06"/>
    </linearGradient>
    <radialGradient id="spotGrad" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFE8C8" stop-opacity="0"/>
      <stop offset="100%" stop-color="#FFE8C8" stop-opacity="0"/>
    </radialGradient>
    <filter id="violinShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="12" dy="24" stdDeviation="28" flood-color="#000" flood-opacity="0.55"/>
    </filter>
    <filter id="stringGlow" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <ellipse cx="600" cy="200" rx="500" ry="350" fill="url(#spotGrad)"/>
  <g transform="rotate(-28 600 450)" filter="url(#violinShadow)">
    <path d="M598,60 C570,55 545,35 530,10 C515,-15 535,-28 565,-18 C585,-10 598,20 598,60" fill="url(#neckWood)"/>
    <rect x="584" y="60" width="28" height="110" rx="5" fill="url(#neckWood)"/>
    <g fill="#1a0f08">
      <rect x="572" y="78" width="52" height="7" rx="3.5"/>
      <rect x="572" y="102" width="52" height="7" rx="3.5"/>
      <rect x="572" y="126" width="52" height="7" rx="3.5"/>
      <rect x="572" y="150" width="52" height="7" rx="3.5"/>
    </g>
    <rect x="590" y="170" width="16" height="280" rx="2" fill="url(#fingerboardGrad)"/>
    <ellipse cx="598" cy="520" rx="130" ry="100" fill="url(#varnish)"/>
    <ellipse cx="598" cy="660" rx="145" ry="108" fill="url(#varnish)"/>
    <path d="M468,520 Q598,490 728,520 L728,580 Q598,550 468,580 Z" fill="url(#varnish)"/>
    <path d="M540,540 Q530,580 535,620 Q540,660 532,700" stroke="#1a0c06" stroke-width="4" fill="none" opacity="0.8"/>
    <path d="M656,540 Q666,580 661,620 Q656,660 664,700" stroke="#1a0c06" stroke-width="4" fill="none" opacity="0.8"/>
    <path d="M585,490 L598,475 L611,490 L608,510 L588,510 Z" fill="#E8DCC8" stroke="#C4B8A8" stroke-width="1"/>
    <path d="M575,730 L598,755 L621,730 L615,730 L598,745 L581,730 Z" fill="#1a1208"/>
    <ellipse cx="598" cy="770" rx="50" ry="12" fill="#2a1810" opacity="0.7"/>
    <g filter="url(#stringGlow)">
      <line x1="592" y1="170" x2="592" y2="730" stroke="#7eb8da" stroke-width="2"/>
      <line x1="596" y1="170" x2="596" y2="730" stroke="#d4af37" stroke-width="1.8"/>
      <line x1="600" y1="170" x2="600" y2="730" stroke="#f0c878" stroke-width="1.6"/>
      <line x1="604" y1="170" x2="604" y2="730" stroke="#ccc" stroke-width="1.2" opacity="0.35"/>
    </g>
    <g transform="rotate(12 598 420)">
      <rect x="350" y="415" width="500" height="10" rx="5" fill="url(#neckWood)"/>
      <rect x="340" y="412" width="30" height="16" rx="4" fill="#3d2314"/>
      <rect x="830" y="412" width="30" height="16" rx="4" fill="#1a0f08"/>
      <path d="M355,420 Q598,400 845,420" stroke="#E8E0D0" stroke-width="1.5" fill="none" opacity="0.5"/>
    </g>
  </g>
</svg>`;

export const FLASK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.28"/>
      <stop offset="45%" stop-color="#bfe9ff" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.20"/>
    </linearGradient>
    <radialGradient id="clayGrad" cx="38%" cy="32%" r="75%">
      <stop offset="0%" stop-color="#f7f1e2"/>
      <stop offset="55%" stop-color="#e3d6bd"/>
      <stop offset="100%" stop-color="#b9a886"/>
    </radialGradient>
    <clipPath id="flaskClip">
      <path d="M82 18 h36 v74 l44 120 a48 48 0 0 1 -44 66 h-36 a48 48 0 0 1 -44 -66 l44 -120 z"/>
    </clipPath>
  </defs>
  <g transform="translate(156 96) scale(1.0)">
    <path d="M82 18 h36 v74 l44 120 a48 48 0 0 1 -44 66 h-36 a48 48 0 0 1 -44 -66 l44 -120 z" fill="#d9bc5e" stroke="#8a6d1f" stroke-width="2"/>
    <rect x="76" y="10" width="48" height="12" rx="4" fill="#e8d890" stroke="#8a6d1f" stroke-width="1.5"/>
    <g clip-path="url(#flaskClip)">
      <circle cx="100" cy="218" r="34" fill="url(#clayGrad)"/>
      <ellipse cx="88" cy="204" rx="10" ry="6" fill="#fff4dc"/>
    </g>
    <path d="M70 60 q-18 60 6 120" fill="none" stroke="#f5edd0" stroke-width="3" stroke-linecap="round"/>
  </g>
</svg>`;

/* Boat from east_rowing_subpage3 — centered for triangular face */
export const BOAT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 120">
  <defs>
    <g id="blade">
      <rect x="-8" y="-11" width="16" height="22" rx="3" fill="#c8102e" stroke="#1c1410" stroke-width="1.5"/>
      <line x1="-8" y1="-11" x2="8" y2="11" stroke="#ffffff" stroke-width="3.2" stroke-linecap="round"/>
      <line x1="8" y1="-11" x2="-8" y2="11" stroke="#ffffff" stroke-width="3.2" stroke-linecap="round"/>
    </g>
  </defs>
  <g>
    <g><line x1="70" y1="50" x2="70" y2="16" stroke="#1c1410" stroke-width="2.5"/><use href="#blade" x="70" y="13"/></g>
    <g><line x1="102" y1="70" x2="102" y2="104" stroke="#1c1410" stroke-width="2.5"/><use href="#blade" x="102" y="107"/></g>
    <g><line x1="134" y1="50" x2="134" y2="16" stroke="#1c1410" stroke-width="2.5"/><use href="#blade" x="134" y="13"/></g>
    <g><line x1="166" y1="70" x2="166" y2="104" stroke="#1c1410" stroke-width="2.5"/><use href="#blade" x="166" y="107"/></g>
    <g><line x1="198" y1="50" x2="198" y2="16" stroke="#1c1410" stroke-width="2.5"/><use href="#blade" x="198" y="13"/></g>
    <g><line x1="230" y1="70" x2="230" y2="104" stroke="#1c1410" stroke-width="2.5"/><use href="#blade" x="230" y="107"/></g>
    <g><line x1="262" y1="50" x2="262" y2="16" stroke="#1c1410" stroke-width="2.5"/><use href="#blade" x="262" y="13"/></g>
    <g><line x1="294" y1="70" x2="294" y2="104" stroke="#1c1410" stroke-width="2.5"/><use href="#blade" x="294" y="107"/></g>
    <path d="M 14 60 Q 30 47 90 47 L 300 47 Q 348 47 356 60 Q 348 73 300 73 L 90 73 Q 30 73 14 60 Z" fill="#181410" stroke="#1c1410" stroke-width="1.5"/>
    <circle cx="354" cy="60" r="5" fill="#181410" stroke="#1c1410" stroke-width="1"/>
    <circle cx="38" cy="60" r="7" fill="#2a211c"/>
    <circle cx="70" cy="60" r="5.5" fill="#2a211c"/>
    <circle cx="102" cy="60" r="5.5" fill="#2a211c"/>
    <circle cx="134" cy="60" r="5.5" fill="#2a211c"/>
    <circle cx="166" cy="60" r="5.5" fill="#2a211c"/>
    <circle cx="198" cy="60" r="5.5" fill="#2a211c"/>
    <circle cx="230" cy="60" r="5.5" fill="#2a211c"/>
    <circle cx="262" cy="60" r="5.5" fill="#2a211c"/>
    <circle cx="294" cy="60" r="5.5" fill="#2a211c"/>
  </g>
</svg>`;

export const IDENTITY_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <g fill="none" stroke="#8fa8c4" stroke-width="2">
    <path d="M256 176 L186 336 L326 336 Z"/>
    <path d="M206 256 H306"/>
    <path d="M256 256 V316"/>
  </g>
  <circle cx="256" cy="256" r="12" fill="#9eb8d8"/>
  <text x="256" y="380" text-anchor="middle" fill="#5a7090" font-family="Cormorant Garamond, serif" font-size="28" font-weight="300">TCK</text>
</svg>`;
