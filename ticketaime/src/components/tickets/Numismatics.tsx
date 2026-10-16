import { u } from "../../lib/units";
import { F } from "../../lib/fonts";
import { paperBg } from "../../lib/paper";

/* ------------------------------------------------------------------ */
/*  Helper types & styles for metallic coins and tokens               */
/* ------------------------------------------------------------------ */

type P = { personnalisation?: Record<string, string> };

/* ------------------------------------------------------------------ */
/*  1. NYC Subway Token 1953 — "Small Y" (Brass, center cutout)        */
/* ------------------------------------------------------------------ */

export function TokenNYC1953({ personnalisation }: P) {
  const annee = personnalisation?.annee ?? "1953";
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{
        width: "100%",
        height: "100%",
        filter: `drop-shadow(0 ${u(4)} ${u(8)} rgba(0,0,0,0.5)) drop-shadow(0 ${u(1)} ${u(2)} rgba(0,0,0,0.4))`,
      }}
    >
      <svg viewBox="0 0 160 160" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="nyc-brass" cx="42%" cy="38%" r="62%">
            <stop offset="0%" stopColor="#f7e4a3" />
            <stop offset="35%" stopColor="#d4af37" />
            <stop offset="70%" stopColor="#9e7b20" />
            <stop offset="100%" stopColor="#634c0e" />
          </radialGradient>
          <linearGradient id="nyc-rim" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff2be" />
            <stop offset="50%" stopColor="#a37c1a" />
            <stop offset="100%" stopColor="#573e05" />
          </linearGradient>
          <path id="nyc-text-path-top" d="M 80 80 m -58 0 a 58 58 0 1 1 116 0" />
          <path id="nyc-text-path-bot" d="M 80 80 m 58 0 a 58 58 0 1 1 -116 0" />
          <mask id="nyc-y-cutout">
            <rect width="160" height="160" fill="#fff" />
            {/* Cutout stylized 'Y' in center */}
            <path
              d="M 72 52 L 80 66 L 88 52 L 95 56 L 85 73 L 85 96 L 75 96 L 75 73 L 65 56 Z"
              fill="#000"
            />
          </mask>
        </defs>

        {/* Outer coin body with center cutout */}
        <circle cx="80" cy="80" r="76" fill="url(#nyc-brass)" stroke="url(#nyc-rim)" strokeWidth="5" mask="url(#nyc-y-cutout)" />

        {/* Outer reeded edge effect */}
        <circle cx="80" cy="80" r="72" fill="none" stroke="#755610" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.65" />
        <circle cx="80" cy="80" r="46" fill="none" stroke="#f7e4a3" strokeWidth="1.2" opacity="0.5" />

        {/* Outer raised border */}
        <circle cx="80" cy="80" r="73.5" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />

        {/* Embossed text on paths */}
        <text
          fill="#523903"
          fontSize="8.6"
          fontFamily="Oswald, sans-serif"
          fontWeight="700"
          letterSpacing="2.8"
        >
          <textPath href="#nyc-text-path-top" startOffset="50%" textAnchor="middle">
            NEW YORK CITY TRANSIT AUTHORITY
          </textPath>
        </text>
        <text
          fill="#523903"
          fontSize="9"
          fontFamily="Oswald, sans-serif"
          fontWeight="700"
          letterSpacing="3.5"
        >
          <textPath href="#nyc-text-path-bot" startOffset="50%" textAnchor="middle">
            ★ GOOD FOR ONE FARE ★
          </textPath>
        </text>

        {/* Embossed rim highlight around the cutout Y */}
        <path
          d="M 72 52 L 80 66 L 88 52 L 95 56 L 85 73 L 85 96 L 75 96 L 75 73 L 65 56 Z"
          fill="none"
          stroke="#523903"
          strokeWidth="1.8"
          opacity="0.75"
        />
        <text x="80" y="112" textAnchor="middle" fill="#694d0c" fontSize="7" fontFamily="Courier Prime, monospace" fontWeight="700">
          {annee}
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  2. NYC Subway Token 1970 — "Large Y" (Solid Brass)                 */
/* ------------------------------------------------------------------ */

export function TokenNYC1970({ personnalisation }: P) {
  const annee = personnalisation?.annee ?? "1970";
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{
        width: "100%",
        height: "100%",
        filter: `drop-shadow(0 ${u(4)} ${u(8)} rgba(0,0,0,0.5)) drop-shadow(0 ${u(1)} ${u(2)} rgba(0,0,0,0.4))`,
      }}
    >
      <svg viewBox="0 0 160 160" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="nyc70-brass" cx="38%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#ffea9f" />
            <stop offset="25%" stopColor="#e5be49" />
            <stop offset="65%" stopColor="#ab8720" />
            <stop offset="100%" stopColor="#5c440a" />
          </radialGradient>
          <mask id="nyc70-hole">
            <rect width="160" height="160" fill="#fff" />
            {/* Round center hole with cut-out Y */}
            <circle cx="80" cy="80" r="28" fill="#000" />
          </mask>
        </defs>

        <circle cx="80" cy="80" r="77" fill="url(#nyc70-brass)" stroke="#4d3504" strokeWidth="3" mask="url(#nyc70-hole)" />
        <circle cx="80" cy="80" r="74" fill="none" stroke="#ffe785" strokeWidth="1.5" opacity="0.6" />
        <circle cx="80" cy="80" r="32" fill="none" stroke="#ffe785" strokeWidth="2" opacity="0.75" />
        <circle cx="80" cy="80" r="30" fill="none" stroke="#4d3504" strokeWidth="2" />

        {/* Lettering */}
        <path id="nyc70-t1" d="M 80 80 m -50 0 a 50 50 0 1 1 100 0" />
        <path id="nyc70-t2" d="M 80 80 m 50 0 a 50 50 0 1 1 -100 0" />
        <text fill="#422f03" fontSize="10.5" fontFamily="Oswald, sans-serif" fontWeight="700" letterSpacing="3">
          <textPath href="#nyc70-t1" startOffset="50%" textAnchor="middle">
            NEW YORK CITY
          </textPath>
        </text>
        <text fill="#422f03" fontSize="9" fontFamily="Oswald, sans-serif" fontWeight="700" letterSpacing="3.5">
          <textPath href="#nyc70-t2" startOffset="50%" textAnchor="middle">
            TRANSIT AUTHORITY · {annee}
          </textPath>
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  3. 10 Centimes Lindauer 1917 — Pièce percée au centre             */
/* ------------------------------------------------------------------ */

export function Piece10CentimesLindauer({ personnalisation }: P) {
  const annee = personnalisation?.annee ?? "1917";
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{
        width: "100%",
        height: "100%",
        filter: `drop-shadow(0 ${u(4)} ${u(8)} rgba(0,0,0,0.52)) drop-shadow(0 ${u(1)} ${u(2)} rgba(0,0,0,0.35))`,
      }}
    >
      <svg viewBox="0 0 160 160" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="lindauer-cupro" cx="36%" cy="32%" r="70%">
            <stop offset="0%" stopColor="#f2e3be" />
            <stop offset="30%" stopColor="#c7b07c" />
            <stop offset="70%" stopColor="#876f41" />
            <stop offset="100%" stopColor="#4f3e1b" />
          </radialGradient>
          <mask id="lindauer-hole">
            <rect width="160" height="160" fill="#fff" />
            {/* Circular center hole (4.5mm on the real coin) */}
            <circle cx="80" cy="80" r="16.5" fill="#000" />
          </mask>
        </defs>

        <circle cx="80" cy="80" r="76" fill="url(#lindauer-cupro)" stroke="#3b2d0d" strokeWidth="3" mask="url(#lindauer-hole)" />
        <circle cx="80" cy="80" r="73" fill="none" stroke="#fceec2" strokeWidth="1.2" opacity="0.6" />
        <circle cx="80" cy="80" r="19" fill="none" stroke="#fceec2" strokeWidth="1.5" opacity="0.7" />
        <circle cx="80" cy="80" r="18" fill="none" stroke="#3b2d0d" strokeWidth="1.8" />

        {/* Phrygian Cap on the left, Laurel on the right, RF Monogram */}
        <text x="44" y="87" fill="#382907" fontSize="26" fontFamily="Bebas Neue, sans-serif" fontWeight="700">R</text>
        <text x="100" y="87" fill="#382907" fontSize="26" fontFamily="Bebas Neue, sans-serif" fontWeight="700">F</text>

        {/* Top: 10 Centimes */}
        <text x="80" y="44" textAnchor="middle" fill="#382907" fontSize="22" fontFamily="Bebas Neue, sans-serif" letterSpacing="1">
          10 C<tspan fontSize="13">MES</tspan>
        </text>

        {/* Bottom date */}
        <text x="80" y="132" textAnchor="middle" fill="#382907" fontSize="13" fontFamily="Courier Prime, monospace" fontWeight="700" letterSpacing="2">
          {annee}
        </text>

        {/* Laurel wreath sprigs */}
        <path d="M 40 108 C 50 118 70 120 80 120 C 90 120 110 118 120 108" fill="none" stroke="#382907" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  4. 1 Franc Semeuse — Roty (Argent / Nickel)                        */
/* ------------------------------------------------------------------ */

export function Piece1FrancSemeuse({ personnalisation }: P) {
  const annee = personnalisation?.annee ?? "1960";
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{
        width: "100%",
        height: "100%",
        filter: `drop-shadow(0 ${u(4)} ${u(8)} rgba(0,0,0,0.5)) drop-shadow(0 ${u(1)} ${u(2)} rgba(0,0,0,0.38))`,
      }}
    >
      <svg viewBox="0 0 160 160" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="semeuse-silver" cx="35%" cy="30%" r="72%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="28%" stopColor="#dfe6eb" />
            <stop offset="65%" stopColor="#9ba8b2" />
            <stop offset="100%" stopColor="#55616b" />
          </radialGradient>
          <path id="semeuse-path" d="M 80 80 m -62 0 a 62 62 0 1 1 124 0" />
        </defs>

        <circle cx="80" cy="80" r="77" fill="url(#semeuse-silver)" stroke="#3e4852" strokeWidth="3" />
        <circle cx="80" cy="80" r="74" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.65" />
        <circle cx="80" cy="80" r="68" fill="none" stroke="#3e4852" strokeWidth="1" opacity="0.3" />

        {/* Legend */}
        <text fill="#2f373e" fontSize="9.5" fontFamily="Cinzel, serif" fontWeight="700" letterSpacing="3">
          <textPath href="#semeuse-path" startOffset="50%" textAnchor="middle">
            RÉPUBLIQUE FRANÇAISE
          </textPath>
        </text>

        {/* Silhouette of Oscar Roty's Sower (La Semeuse marchant face au soleil levant) */}
        <g transform="translate(42, 38) scale(0.72)">
          {/* Rising sun rays in background */}
          <path d="M 85 85 L 120 75 M 85 85 L 125 90 M 85 85 L 115 105" stroke="#ffffff" strokeWidth="2.5" opacity="0.7" />
          <circle cx="88" cy="85" r="16" fill="#ffffff" opacity="0.5" />
          {/* Sower figure with flowing cap and blowing dress */}
          <path
            d="M 48 20 C 44 20 40 24 40 28 C 40 32 44 36 48 36 C 52 36 56 32 56 28 Z
               M 48 37 C 42 45 36 55 34 68 C 38 68 44 65 52 64 C 50 78 44 95 38 110 L 48 110 C 56 94 62 76 66 64 C 74 66 84 72 90 78 L 92 74 C 84 66 74 58 64 54 C 62 48 58 42 50 37 Z"
            fill="#2c343b"
          />
          {/* Bag of seeds held on left hip */}
          <path d="M 38 52 C 30 54 28 64 34 70 C 40 70 42 62 38 52 Z" fill="#2c343b" />
          {/* Ground line */}
          <path d="M 20 110 L 98 110" stroke="#2c343b" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Denomination and Year */}
        <text x="80" y="142" textAnchor="middle" fill="#2f373e" fontSize="13" fontFamily="Bebas Neue, sans-serif" letterSpacing="2.5">
          1 FRANC · {annee}
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  5. 2 Francs Chambre de Commerce 1923 — "Bon pour 2 Francs"         */
/* ------------------------------------------------------------------ */

export function Piece2FrancsChambreCommerce({ personnalisation }: P) {
  const annee = personnalisation?.annee ?? "1923";
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{
        width: "100%",
        height: "100%",
        filter: `drop-shadow(0 ${u(4)} ${u(8)} rgba(0,0,0,0.52)) drop-shadow(0 ${u(1)} ${u(2)} rgba(0,0,0,0.38))`,
      }}
    >
      <svg viewBox="0 0 160 160" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="alubronze" cx="36%" cy="32%" r="72%">
            <stop offset="0%" stopColor="#f7e8a8" />
            <stop offset="32%" stopColor="#d6b845" />
            <stop offset="70%" stopColor="#967718" />
            <stop offset="100%" stopColor="#4f3b04" />
          </radialGradient>
          <path id="cc-top" d="M 80 80 m -58 0 a 58 58 0 1 1 116 0" />
        </defs>

        <circle cx="80" cy="80" r="77" fill="url(#alubronze)" stroke="#453102" strokeWidth="3" />
        <circle cx="80" cy="80" r="73.5" fill="none" stroke="#fff4be" strokeWidth="1.2" opacity="0.65" />
        <circle cx="80" cy="80" r="66" fill="none" stroke="#453102" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />

        <text fill="#3b2901" fontSize="9" fontFamily="Cinzel, serif" fontWeight="700" letterSpacing="2.6">
          <textPath href="#cc-top" startOffset="50%" textAnchor="middle">
            CHAMBRES DE COMMERCE DE FRANCE
          </textPath>
        </text>

        <text x="80" y="66" textAnchor="middle" fill="#3b2901" fontSize="12" fontFamily="Oswald, sans-serif" fontWeight="600" letterSpacing="2">
          BON POUR
        </text>
        <text x="80" y="102" textAnchor="middle" fill="#3b2901" fontSize="38" fontFamily="Bebas Neue, sans-serif" letterSpacing="1">
          2 F<tspan fontSize="20">RANCS</tspan>
        </text>
        <text x="80" y="128" textAnchor="middle" fill="#3b2901" fontSize="12" fontFamily="Courier Prime, monospace" fontWeight="700" letterSpacing="3">
          {annee}
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  6. 10 Francs Hercule (Argent massif)                               */
/* ------------------------------------------------------------------ */

export function Piece10FrancsHercule({ personnalisation }: P) {
  const annee = personnalisation?.annee ?? "1965";
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{
        width: "100%",
        height: "100%",
        filter: `drop-shadow(0 ${u(5)} ${u(10)} rgba(0,0,0,0.55)) drop-shadow(0 ${u(1)} ${u(2)} rgba(0,0,0,0.4))`,
      }}
    >
      <svg viewBox="0 0 160 160" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="hercule-silver" cx="34%" cy="30%" r="72%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#d5dde3" />
            <stop offset="70%" stopColor="#8d9da8" />
            <stop offset="100%" stopColor="#434e57" />
          </radialGradient>
          <path id="hercule-top" d="M 80 80 m -62 0 a 62 62 0 1 1 124 0" />
        </defs>

        <circle cx="80" cy="80" r="77" fill="url(#hercule-silver)" stroke="#313a42" strokeWidth="3" />
        <circle cx="80" cy="80" r="74" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.6" />
        <circle cx="80" cy="80" r="68" fill="none" stroke="#313a42" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />

        <text fill="#2b333a" fontSize="9" fontFamily="Cinzel, serif" fontWeight="700" letterSpacing="3">
          <textPath href="#hercule-top" startOffset="50%" textAnchor="middle">
            LIBERTÉ ÉGALITÉ FRATERNITÉ
          </textPath>
        </text>

        {/* Hercules standing between Liberty and Equality */}
        <g transform="translate(50, 42) scale(0.65)">
          {/* Hercules center */}
          <path d="M 46 20 a 7 7 0 1 1 0.1 0 Z M 46 34 L 38 60 L 54 60 Z M 38 60 L 35 100 M 54 60 L 57 100" stroke="#252c33" strokeWidth="5" strokeLinecap="round" />
          {/* Club in right hand */}
          <path d="M 64 36 L 72 88" stroke="#252c33" strokeWidth="6" strokeLinecap="round" />
          {/* Liberty left holding pike */}
          <path d="M 16 28 a 5 5 0 1 1 0.1 0 Z M 16 38 L 10 95 L 26 95 Z" stroke="#252c33" strokeWidth="3" fill="#252c33" opacity="0.9" />
          <path d="M 6 15 L 6 95" stroke="#252c33" strokeWidth="2.5" />
          {/* Equality right holding level */}
          <path d="M 76 28 a 5 5 0 1 1 0.1 0 Z M 76 38 L 70 95 L 86 95 Z" stroke="#252c33" strokeWidth="3" fill="#252c33" opacity="0.9" />
        </g>

        <text x="80" y="132" textAnchor="middle" fill="#2b333a" fontSize="15" fontFamily="Bebas Neue, sans-serif" letterSpacing="2">
          10 FRANCS · {annee}
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  7. Billet 100 Francs Delacroix (Banque de France, 1979)           */
/* ------------------------------------------------------------------ */

export function Billet100FrancsDelacroix({ personnalisation }: P) {
  const serie = personnalisation?.serie ?? "Y.184 07482";
  const date = personnalisation?.date ?? "06-05-1982";
  return (
    <div
      className="paper paper-heavy-age edge-soft select-none overflow-hidden"
      style={{
        width: "100%",
        height: "100%",
        ...paperBg("#ede3cb", "#dfcfb0", "#cdb992"),
        border: `${u(1.5)} solid #4a3822`,
        color: "#2e2114",
        boxShadow: `inset 0 0 ${u(14)} rgba(90,60,20,0.25)`,
      }}
    >
      {/* Intricate guilloche border */}
      <div className="absolute inset-[calc(6*var(--u))] border-[calc(2*var(--u))] border-[#694827] border-double opacity-85" />
      <div className="absolute inset-[calc(10*var(--u))] border border-[#8a6842] border-dashed opacity-60" />

      {/* Top Bank Header */}
      <div className="absolute left-[calc(16*var(--u))] right-[calc(16*var(--u))] top-[calc(14*var(--u))] flex justify-between items-baseline">
        <span style={{ fontFamily: F.cinzel, fontWeight: 700, fontSize: u(13), letterSpacing: u(3), color: "#54371b" }}>
          BANQUE DE FRANCE
        </span>
        <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: u(10), color: "#7a4e22" }}>
          {serie}
        </span>
        <span style={{ fontFamily: F.bebas, fontSize: u(28), color: "#8a2b22", lineHeight: 1 }}>
          100
        </span>
      </div>

      {/* Central engraving composition: Delacroix & La Liberté guidant le peuple */}
      <div className="absolute left-[calc(16*var(--u))] right-[calc(16*var(--u))] top-[calc(42*var(--u))] bottom-[calc(30*var(--u))] flex items-center justify-between">
        {/* Left: Eugène Delacroix portrait sketch */}
        <div className="relative" style={{ width: u(110), height: "100%" }}>
          <svg viewBox="0 0 110 120" style={{ width: "100%", height: "100%" }}>
            <circle cx="55" cy="55" r="48" fill="#f5edd8" stroke="#8a6842" strokeWidth="1.2" />
            {/* Watermark circle */}
            <circle cx="55" cy="55" r="42" fill="none" stroke="#7a552e" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
            <path d="M 32 80 C 30 65 38 45 55 45 C 72 45 80 65 78 80 Z" fill="#4d351e" />
            <circle cx="55" cy="40" r="16" fill="#4d351e" />
            {/* Cravat and jacket */}
            <path d="M 46 56 L 55 72 L 64 56 Z" fill="#8c3328" />
            <text x="55" y="108" textAnchor="middle" fontSize="7.5" fontFamily="Cinzel, serif" fill="#634526" fontWeight="700">
              E. DELACROIX
            </text>
          </svg>
        </div>

        {/* Center: Large Denomination with micro-lettering */}
        <div className="text-center flex-1 px-[calc(8*var(--u))]">
          <div style={{ fontFamily: F.display, fontSize: u(38), lineHeight: 0.95, color: "#7a221a" }}>
            CENT FRANCS
          </div>
          <div style={{ fontFamily: F.type, fontSize: u(8.5), letterSpacing: u(1.5), color: "#54371b", marginTop: u(6) }}>
            L'ARTICLE 139 DU CODE PÉNAL PUNIT DE RÉCLUSION CRIMINELLE À PERPÉTUITÉ
            CEUX QUI AURONT CONTREFAIT OU FALSIFIÉ LES BILLETS
          </div>
          <div style={{ fontFamily: F.mono, fontSize: u(9), color: "#7a4e22", marginTop: u(6) }}>
            LE CONTRÔLEUR GÉNÉRAL · LE CAISSIER GÉNÉRAL
          </div>
        </div>

        {/* Right: La Liberté guidant le peuple silhouette & tricolor flag */}
        <div className="relative" style={{ width: u(110), height: "100%" }}>
          <svg viewBox="0 0 110 120" style={{ width: "100%", height: "100%" }}>
            {/* Tricolor flag waving */}
            <path d="M 35 20 Q 55 14 75 22 L 75 52 Q 55 44 35 50 Z" fill="#476999" opacity="0.85" />
            <path d="M 50 18 Q 65 17 75 22 L 75 52 Q 65 48 50 48 Z" fill="#b03e35" opacity="0.85" />
            <path d="M 34 18 L 34 85" stroke="#4a3822" strokeWidth="2.5" />
            {/* Marianne silhouette holding flag */}
            <path d="M 45 44 C 40 50 38 65 38 85 L 68 85 C 64 70 60 55 52 44 Z" fill="#3b2b1a" />
            <circle cx="48" cy="36" r="8" fill="#3b2b1a" />
            {/* Barricade stone base */}
            <path d="M 15 85 L 95 85 L 90 98 L 10 98 Z" fill="#755636" opacity="0.75" />
          </svg>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="absolute left-[calc(18*var(--u))] right-[calc(18*var(--u))] bottom-[calc(10*var(--u))] flex justify-between items-center" style={{ fontFamily: F.mono, fontSize: u(8.5), color: "#5c3f21" }}>
        <span>DATE D'ÉMISSION : {date}</span>
        <span style={{ fontFamily: F.bebas, fontSize: u(18), color: "#8a2b22" }}>100 F</span>
        <span>BANQUE DE FRANCE</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  8. Billet 50 Francs Saint-Exupéry (Le Petit Prince, 1993)          */
/* ------------------------------------------------------------------ */

export function Billet50FrancsSaintExupery({ personnalisation }: P) {
  const serie = personnalisation?.serie ?? "T.042 19827";
  const date = personnalisation?.date ?? "18-03-1993";
  return (
    <div
      className="paper edge-soft select-none overflow-hidden"
      style={{
        width: "100%",
        height: "100%",
        ...paperBg("#e2f0f2", "#cce6eb", "#bad9df"),
        border: `${u(1.5)} solid #23546b`,
        color: "#183b4a",
        boxShadow: `inset 0 0 ${u(14)} rgba(20,80,110,0.22)`,
      }}
    >
      {/* Turquoise & saffron gradient accents */}
      <div className="absolute inset-[calc(6*var(--u))] border-[calc(2*var(--u))] border-[#3d7a96] border-solid opacity-70" />

      {/* Top Header */}
      <div className="absolute left-[calc(16*var(--u))] right-[calc(16*var(--u))] top-[calc(12*var(--u))] flex justify-between items-baseline">
        <span style={{ fontFamily: F.cinzel, fontWeight: 700, fontSize: u(13), letterSpacing: u(3), color: "#164459" }}>
          BANQUE DE FRANCE
        </span>
        <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: u(10), color: "#b86a23" }}>
          {serie}
        </span>
        <span style={{ fontFamily: F.bebas, fontSize: u(28), color: "#c7621a", lineHeight: 1 }}>
          50
        </span>
      </div>

      {/* Middle Content */}
      <div className="absolute left-[calc(16*var(--u))] right-[calc(16*var(--u))] top-[calc(40*var(--u))] bottom-[calc(28*var(--u))] flex items-center justify-between">
        {/* Left: Antoine de Saint-Exupéry portrait */}
        <div className="relative" style={{ width: u(110), height: "100%" }}>
          <svg viewBox="0 0 110 120" style={{ width: "100%", height: "100%" }}>
            <circle cx="55" cy="55" r="46" fill="#eef7f8" stroke="#3d7a96" strokeWidth="1.2" />
            {/* Aviator leather jacket & profile */}
            <path d="M 32 80 C 30 65 40 46 55 46 C 70 46 78 65 76 80 Z" fill="#1b4254" />
            <circle cx="55" cy="40" r="15" fill="#1b4254" />
            <path d="M 40 48 L 55 58 L 70 48" stroke="#fff" strokeWidth="2" fill="none" />
            <text x="55" y="108" textAnchor="middle" fontSize="7" fontFamily="Cinzel, serif" fill="#1b4254" fontWeight="700">
              A. DE SAINT-EXUPÉRY
            </text>
          </svg>
        </div>

        {/* Center: Latécoère Breguet 14 biplane flying over Sahara desert */}
        <div className="text-center flex-1 px-[calc(6*var(--u))]">
          <div style={{ fontFamily: F.bebas, fontSize: u(34), color: "#c7621a", letterSpacing: u(1) }}>
            CINQUANTE FRANCS
          </div>
          {/* Biplane illustration */}
          <div className="my-[calc(4*var(--u))] flex justify-center">
            <svg viewBox="0 0 120 40" style={{ width: u(120), height: u(36) }}>
              <path d="M 20 18 L 95 18 L 105 14 L 105 22 Z" fill="#205169" />
              <path d="M 35 8 L 85 8 L 82 12 L 32 12 Z" fill="#205169" />
              <path d="M 35 24 L 85 24 L 82 28 L 32 28 Z" fill="#205169" />
              <line x1="42" y1="8" x2="42" y2="28" stroke="#205169" strokeWidth="1.5" />
              <line x1="75" y1="8" x2="75" y2="28" stroke="#205169" strokeWidth="1.5" />
              <circle cx="18" cy="18" r="4" fill="#c7621a" />
            </svg>
          </div>
          <div style={{ fontFamily: F.script, fontSize: u(18), color: "#164459" }}>
            « On ne voit bien qu'avec le cœur »
          </div>
        </div>

        {/* Right: Le Petit Prince on his asteroid B612 with sheep box and stars */}
        <div className="relative" style={{ width: u(110), height: "100%" }}>
          <svg viewBox="0 0 110 120" style={{ width: "100%", height: "100%" }}>
            {/* Stars */}
            <circle cx="28" cy="24" r="2" fill="#d97725" />
            <circle cx="85" cy="20" r="3" fill="#d97725" />
            <circle cx="92" cy="45" r="2" fill="#d97725" />
            <circle cx="20" cy="55" r="1.5" fill="#d97725" />
            {/* Asteroid B612 */}
            <circle cx="55" cy="100" r="34" fill="#a4cbcf" stroke="#2a617a" strokeWidth="1.5" />
            {/* Little Prince figure with flowing scarf */}
            <path d="M 52 48 L 58 48 L 60 74 L 50 74 Z" fill="#1b4254" />
            <circle cx="55" cy="42" r="7" fill="#e89838" />
            {/* Flying golden scarf */}
            <path d="M 58 48 Q 78 44 88 56 Q 74 52 58 52 Z" fill="#e89838" />
            {/* Rose on asteroid */}
            <path d="M 35 78 L 35 70 Q 35 65 30 65 Q 25 65 30 72 Z" fill="#ba3c32" />
          </svg>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="absolute left-[calc(18*var(--u))] right-[calc(18*var(--u))] bottom-[calc(10*var(--u))] flex justify-between items-center" style={{ fontFamily: F.mono, fontSize: u(8.5), color: "#1b4254" }}>
        <span>1993 · ANTOINE DE SAINT-EXUPÉRY</span>
        <span style={{ fontFamily: F.bebas, fontSize: u(18), color: "#c7621a" }}>50 F</span>
        <span>DATE : {date}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  9. Billet 200 Francs Gustave Eiffel (1995)                         */
/* ------------------------------------------------------------------ */

export function Billet200FrancsEiffel({ personnalisation }: P) {
  const serie = personnalisation?.serie ?? "E.014 83921";
  const date = personnalisation?.date ?? "12-10-1995";
  return (
    <div
      className="paper edge-soft select-none overflow-hidden"
      style={{
        width: "100%",
        height: "100%",
        ...paperBg("#f5e8d5", "#ebd2b7", "#dcbe9f"),
        border: `${u(1.5)} solid #854020`,
        color: "#4a210d",
        boxShadow: `inset 0 0 ${u(14)} rgba(130,60,20,0.22)`,
      }}
    >
      <div className="absolute inset-[calc(6*var(--u))] border-[calc(2*var(--u))] border-[#a6542d] border-solid opacity-70" />

      <div className="absolute left-[calc(16*var(--u))] right-[calc(16*var(--u))] top-[calc(12*var(--u))] flex justify-between items-baseline">
        <span style={{ fontFamily: F.cinzel, fontWeight: 700, fontSize: u(13), letterSpacing: u(3), color: "#662c12" }}>
          BANQUE DE FRANCE
        </span>
        <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: u(10), color: "#a85223" }}>
          {serie}
        </span>
        <span style={{ fontFamily: F.bebas, fontSize: u(28), color: "#9c3510", lineHeight: 1 }}>
          200
        </span>
      </div>

      <div className="absolute left-[calc(16*var(--u))] right-[calc(16*var(--u))] top-[calc(40*var(--u))] bottom-[calc(28*var(--u))] flex items-center justify-between">
        {/* Gustave Eiffel portrait */}
        <div className="relative" style={{ width: u(110), height: "100%" }}>
          <svg viewBox="0 0 110 120" style={{ width: "100%", height: "100%" }}>
            <circle cx="55" cy="55" r="46" fill="#fcf3e6" stroke="#a6542d" strokeWidth="1.2" />
            <path d="M 32 80 C 30 65 40 46 55 46 C 70 46 78 65 76 80 Z" fill="#4d2413" />
            <circle cx="55" cy="40" r="15" fill="#4d2413" />
            <text x="55" y="108" textAnchor="middle" fontSize="7" fontFamily="Cinzel, serif" fill="#4d2413" fontWeight="700">
              GUSTAVE EIFFEL
            </text>
          </svg>
        </div>

        {/* Center: Denomination and Tower Base Arc */}
        <div className="text-center flex-1 px-[calc(6*var(--u))]">
          <div style={{ fontFamily: F.bebas, fontSize: u(36), color: "#9c3510", letterSpacing: u(1) }}>
            DEUX CENTS FRANCS
          </div>
          <div className="my-[calc(4*var(--u))] flex justify-center">
            {/* Eiffel Tower Iron Lattice Arch */}
            <svg viewBox="0 0 120 34" style={{ width: u(120), height: u(32) }}>
              <path d="M 20 34 Q 60 4 100 34" fill="none" stroke="#753518" strokeWidth="4" />
              <path d="M 30 34 Q 60 14 90 34" fill="none" stroke="#753518" strokeWidth="2.5" />
              <line x1="40" y1="26" x2="48" y2="18" stroke="#753518" strokeWidth="1.5" />
              <line x1="72" y1="18" x2="80" y2="26" stroke="#753518" strokeWidth="1.5" />
            </svg>
          </div>
          <div style={{ fontFamily: F.cond, fontWeight: 600, fontSize: u(11), letterSpacing: u(1.5), color: "#662c12" }}>
            EXPOSITION UNIVERSELLE DE 1889
          </div>
        </div>

        {/* Right: Full Eiffel Tower graphic */}
        <div className="relative" style={{ width: u(110), height: "100%" }}>
          <svg viewBox="0 0 110 120" style={{ width: "100%", height: "100%" }}>
            {/* Tower silhouette */}
            <path
              d="M 53 14 L 57 14 L 59 44 L 64 74 L 75 106 L 68 106 L 60 84 Q 55 80 50 84 L 42 106 L 35 106 L 46 74 L 51 44 Z"
              fill="#5e2913"
            />
            {/* Spire light beam */}
            <path d="M 55 14 L 30 0 L 80 0 Z" fill="#ffd978" opacity="0.3" />
          </svg>
        </div>
      </div>

      <div className="absolute left-[calc(18*var(--u))] right-[calc(18*var(--u))] bottom-[calc(10*var(--u))] flex justify-between items-center" style={{ fontFamily: F.mono, fontSize: u(8.5), color: "#542510" }}>
        <span>1832–1923 · G. EIFFEL</span>
        <span style={{ fontFamily: F.bebas, fontSize: u(18), color: "#9c3510" }}>200 F</span>
        <span>ÉMISSION : {date}</span>
      </div>
    </div>
  );
}
