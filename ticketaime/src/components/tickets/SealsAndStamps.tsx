import { u } from "../../lib/units";
import { F } from "../../lib/fonts";

type P = { personnalisation?: Record<string, string> };

/* ------------------------------------------------------------------ */
/*  1. Sceau de Cire Rouge avec Ruban en Soie (Fleur de Lys)           */
/* ------------------------------------------------------------------ */

export function SceauCireFleurDeLys({ personnalisation }: P) {
  const devise = personnalisation?.devise ?? "SEMPER FIDELIS";
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{
        width: "100%",
        height: "100%",
        filter: `drop-shadow(0 ${u(6)} ${u(10)} rgba(0,0,0,0.48)) drop-shadow(0 ${u(2)} ${u(3)} rgba(0,0,0,0.35))`,
      }}
    >
      <svg viewBox="0 0 160 210" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
        <defs>
          {/* Deep scarlet ribbon gradient */}
          <linearGradient id="ribbon-red" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7a0e14" />
            <stop offset="35%" stopColor="#b51b22" />
            <stop offset="65%" stopColor="#d9252c" />
            <stop offset="100%" stopColor="#6e0b10" />
          </linearGradient>
          <linearGradient id="ribbon-crease" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,0,0,0.3)" />
            <stop offset="20%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.45)" />
          </linearGradient>
          {/* Organic glossy wax seal gradient */}
          <radialGradient id="wax-scarlet" cx="38%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#ff4d4d" />
            <stop offset="25%" stopColor="#d41e24" />
            <stop offset="65%" stopColor="#960d13" />
            <stop offset="100%" stopColor="#4f0407" />
          </radialGradient>
          <radialGradient id="wax-rim-light" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="40%" stopColor="rgba(255,160,160,0.2)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.6)" />
          </radialGradient>
        </defs>

        {/* Trailing double red silk ribbon with notched swallowtail ends */}
        <g id="ribbons">
          {/* Left ribbon */}
          <path
            d="M 68 85 L 50 190 L 65 178 L 80 190 L 78 85 Z"
            fill="url(#ribbon-red)"
            stroke="#59080c"
            strokeWidth="0.8"
          />
          <path
            d="M 68 85 L 50 190 L 65 178 L 80 190 L 78 85 Z"
            fill="url(#ribbon-crease)"
          />
          {/* Right ribbon (angled) */}
          <path
            d="M 82 85 L 105 198 L 92 184 L 78 194 L 75 85 Z"
            fill="url(#ribbon-red)"
            stroke="#59080c"
            strokeWidth="0.8"
          />
          <path
            d="M 82 85 L 105 198 L 92 184 L 78 194 L 75 85 Z"
            fill="url(#ribbon-crease)"
          />
        </g>

        {/* Natural melted irregular organic wax puddle border */}
        <path
          d="M 80 10
             C 98 9, 114 14, 126 26
             C 138 38, 146 54, 144 72
             C 142 88, 134 104, 122 116
             C 110 128, 94 136, 76 135
             C 58 134, 42 126, 30 114
             C 18 102, 12 86, 14 68
             C 16 50, 24 34, 38 22
             C 52 10, 68 11, 80 10 Z"
          fill="url(#wax-scarlet)"
          stroke="#420306"
          strokeWidth="2"
        />

        {/* Glossy melted rim highlight ring */}
        <circle cx="80" cy="72" r="50" fill="none" stroke="url(#wax-rim-light)" strokeWidth="7" opacity="0.85" />
        <circle cx="80" cy="72" r="47" fill="#8f0c11" stroke="#4a0407" strokeWidth="2.5" />
        <circle cx="80" cy="72" r="44" fill="none" stroke="#e63e44" strokeWidth="1" opacity="0.6" />

        {/* Embossed beaded inner border */}
        <circle cx="80" cy="72" r="40" fill="none" stroke="#d41e24" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.75" />

        {/* Embossed Royal Fleur-de-Lys */}
        <g transform="translate(80, 68) scale(0.65)">
          {/* Central petal */}
          <path
            d="M 0 -38 C 12 -28 14 -12 10 12 L -10 12 C -14 -12 -12 -28 0 -38 Z"
            fill="#d9252c"
            stroke="#ff8589"
            strokeWidth="1.5"
          />
          {/* Left side petal */}
          <path
            d="M -10 12 C -24 10 -34 -2 -30 -18 C -26 -30 -16 -24 -14 -14 C -12 -4 -6 6 -2 10 Z"
            fill="#ba181e"
            stroke="#ff8589"
            strokeWidth="1.2"
          />
          {/* Right side petal */}
          <path
            d="M 10 12 C 24 10 34 -2 30 -18 C 26 -30 16 -24 14 -14 C 12 -4 6 6 2 10 Z"
            fill="#ba181e"
            stroke="#ff8589"
            strokeWidth="1.2"
          />
          {/* Horizontal cross bar */}
          <rect x="-24" y="12" width="48" height="6" rx="2" fill="#520508" stroke="#ff8589" strokeWidth="1" />
          {/* Lower foot petal */}
          <path
            d="M -16 20 C -12 36 -2 40 0 42 C 2 40 12 36 16 20 Z"
            fill="#a11217"
            stroke="#ff8589"
            strokeWidth="1.2"
          />
        </g>

        {/* Curved circular motto */}
        <path id="wax-fleur-path" d="M 80 72 m -32 0 a 32 32 0 1 0 64 0" />
        <text fill="#ffb3b5" fontSize="5.5" fontFamily="Cinzel, serif" fontWeight="700" letterSpacing="1.8">
          <textPath href="#wax-fleur-path" startOffset="50%" textAnchor="middle">
            {devise}
          </textPath>
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  2. Sceau de Cire Carmin avec Ruban — "Monogramme R.F."             */
/* ------------------------------------------------------------------ */

export function SceauCireMonogrammeRF({ personnalisation }: P) {
  const initiales = personnalisation?.initiales ?? "R · F";
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{
        width: "100%",
        height: "100%",
        filter: `drop-shadow(0 ${u(6)} ${u(10)} rgba(0,0,0,0.48)) drop-shadow(0 ${u(2)} ${u(3)} rgba(0,0,0,0.35))`,
      }}
    >
      <svg viewBox="0 0 160 210" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="ribbon-crimson" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5c0610" />
            <stop offset="50%" stopColor="#a31221" />
            <stop offset="100%" stopColor="#52040d" />
          </linearGradient>
          <radialGradient id="wax-crimson" cx="36%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ff5266" />
            <stop offset="30%" stopColor="#c71228" />
            <stop offset="70%" stopColor="#7a0715" />
            <stop offset="100%" stopColor="#3d0208" />
          </radialGradient>
        </defs>

        {/* Pleated ribbon tail */}
        <path
          d="M 64 85 L 42 195 L 60 182 L 78 195 L 75 85 Z"
          fill="url(#ribbon-crimson)"
          stroke="#420208"
          strokeWidth="0.8"
        />
        <path
          d="M 85 85 L 115 195 L 98 182 L 82 195 L 80 85 Z"
          fill="url(#ribbon-crimson)"
          stroke="#420208"
          strokeWidth="0.8"
        />

        {/* Wax puddle */}
        <circle cx="80" cy="72" r="58" fill="url(#wax-crimson)" stroke="#380106" strokeWidth="2" />
        <circle cx="80" cy="72" r="48" fill="#820817" stroke="#e63248" strokeWidth="2.5" />
        <circle cx="80" cy="72" r="43" fill="none" stroke="#ff94a2" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />

        {/* Embossed script initials */}
        <text
          x="80"
          y="84"
          textAnchor="middle"
          fill="#ffccd3"
          fontSize="36"
          fontFamily="Pinyon Script, cursive"
          fontWeight="700"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}
        >
          {initiales}
        </text>
        <circle cx="80" cy="72" r="34" fill="none" stroke="#ff8594" strokeWidth="1.2" opacity="0.5" />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  3. Tampon Encreur "PAYÉ" (Usé, Encre Rouge)                         */
/* ------------------------------------------------------------------ */

export function TamponPaye({ personnalisation }: P) {
  const date = personnalisation?.date ?? "14 OCT. 1958";
  const montant = personnalisation?.montant ?? "ACQUITTÉ";
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: "100%", height: "100%", transform: "rotate(-5deg)" }}
    >
      <div
        className="ink-worn border-[calc(4*var(--u))] border-[#c42d27] border-double rounded-[calc(6*var(--u))] text-center"
        style={{
          padding: `${u(8)} ${u(24)}`,
          color: "#c42d27",
          backgroundColor: "rgba(196,45,39,0.05)",
          boxShadow: `inset 0 0 ${u(4)} rgba(196,45,39,0.15)`,
        }}
      >
        <div style={{ fontFamily: F.bebas, fontSize: u(54), letterSpacing: u(6), lineHeight: 0.9 }}>
          PAYÉ
        </div>
        <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: u(12), letterSpacing: u(2.5), marginTop: u(4) }}>
          LE {date}
        </div>
        <div style={{ fontFamily: F.cond, fontWeight: 600, fontSize: u(10), letterSpacing: u(3), marginTop: u(2), borderTop: `${u(1.5)} solid #c42d27`, paddingTop: u(2) }}>
          {montant} · COMPTANT
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  4. Tampon Encreur "CONFIDENTIEL" (Rouge biseauté)                  */
/* ------------------------------------------------------------------ */

export function TamponConfidentiel({ personnalisation }: P) {
  const mention = personnalisation?.mention ?? "DIFFUSION RESTREINTE";
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: "100%", height: "100%", transform: "rotate(6deg)" }}
    >
      <div
        className="ink-worn border-[calc(3.5*var(--u))] border-[#b82a25] rounded-[calc(3*var(--u))] text-center"
        style={{
          padding: `${u(10)} ${u(20)}`,
          color: "#b82a25",
          backgroundColor: "rgba(184,42,37,0.04)",
        }}
      >
        <div style={{ fontFamily: F.heavy, fontSize: u(36), letterSpacing: u(4), lineHeight: 1 }}>
          CONFIDENTIEL
        </div>
        <div style={{ fontFamily: F.cond, fontWeight: 700, fontSize: u(11), letterSpacing: u(3), marginTop: u(4), borderTop: `${u(1.5)} solid #b82a25`, paddingTop: u(3) }}>
          ★ {mention} ★
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  5. Tampon Encreur "VU ET APPROUVÉ" (Encre Bleue de Bureau)        */
/* ------------------------------------------------------------------ */

export function TamponVuApprouve({ personnalisation }: P) {
  const signataire = personnalisation?.signataire ?? "LE DIRECTEUR";
  const date = personnalisation?.date ?? "12 MAI 1963";
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: "100%", height: "100%", transform: "rotate(-3deg)" }}
    >
      <div
        className="ink-worn border-[calc(2.5*var(--u))] border-[#234e8c] rounded-[calc(5*var(--u))] text-center"
        style={{
          padding: `${u(10)} ${u(22)}`,
          color: "#234e8c",
          backgroundColor: "rgba(35,78,140,0.05)",
        }}
      >
        <div style={{ fontFamily: F.cond, fontWeight: 700, fontSize: u(24), letterSpacing: u(3), lineHeight: 1 }}>
          VU ET APPROUVÉ
        </div>
        <div style={{ height: u(1.5), background: "#234e8c", margin: `${u(6)} 0` }} />
        <div className="flex justify-between" style={{ fontFamily: F.mono, fontSize: u(10), letterSpacing: u(1) }}>
          <span>PARIS, LE {date}</span>
        </div>
        <div style={{ fontFamily: F.script, fontSize: u(22), lineHeight: 1, marginTop: u(4), color: "#163461" }}>
          {signataire}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  6. Tampon Encreur "ARCHIVES NATIONALES" (Circulaire Violet)        */
/* ------------------------------------------------------------------ */

export function TamponArchives({ personnalisation }: P) {
  const annee = personnalisation?.annee ?? "1954";
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: "100%", height: "100%", transform: "rotate(4deg)" }}
    >
      <svg viewBox="0 0 140 140" aria-hidden="true" style={{ width: u(140), height: u(140) }} className="ink-worn">
        <defs>
          <path id="arch-top" d="M 70 70 m -50 0 a 50 50 0 1 1 100 0" />
          <path id="arch-bot" d="M 70 70 m 50 0 a 50 50 0 1 1 -100 0" />
        </defs>
        <circle cx="70" cy="70" r="64" fill="none" stroke="#6b2a82" strokeWidth="3" />
        <circle cx="70" cy="70" r="54" fill="none" stroke="#6b2a82" strokeWidth="1.5" />
        <circle cx="70" cy="70" r="34" fill="none" stroke="#6b2a82" strokeWidth="1.2" strokeDasharray="3 2" />

        <text fill="#6b2a82" fontSize="9.5" fontFamily="Cinzel, serif" fontWeight="700" letterSpacing="2.8">
          <textPath href="#arch-top" startOffset="50%" textAnchor="middle">
            ARCHIVES NATIONALES
          </textPath>
        </text>
        <text fill="#6b2a82" fontSize="8" fontFamily="Cinzel, serif" fontWeight="700" letterSpacing="3">
          <textPath href="#arch-bot" startOffset="50%" textAnchor="middle">
            RÉPUBLIQUE FRANÇAISE
          </textPath>
        </text>

        <text x="70" y="68" textAnchor="middle" fill="#6b2a82" fontSize="16" fontFamily="Bebas Neue, sans-serif" letterSpacing="1">
          CONFORME
        </text>
        <text x="70" y="82" textAnchor="middle" fill="#6b2a82" fontSize="10" fontFamily="Courier Prime, monospace" fontWeight="700">
          {annee}
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  7. Tampon Encreur "PRIORITAIRE / PAR AVION"                       */
/* ------------------------------------------------------------------ */

export function TamponPrioritaire({ personnalisation }: P) {
  const service = personnalisation?.service ?? "SERVICE RAPIDE";
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: "100%", height: "100%", transform: "rotate(-8deg)" }}
    >
      <div
        className="ink-worn border-[calc(3*var(--u))] border-[#c43329] rounded-[calc(2*var(--u))] flex items-center"
        style={{
          padding: `${u(6)} ${u(18)}`,
          color: "#c43329",
          backgroundColor: "rgba(196,51,41,0.06)",
          gap: u(12),
        }}
      >
        <svg viewBox="0 0 40 30" style={{ width: u(32), height: u(24) }} fill="#c43329">
          <path d="M 5 15 L 35 5 L 26 25 L 20 18 Z" />
        </svg>
        <div style={{ lineHeight: 1 }}>
          <div style={{ fontFamily: F.heavy, fontSize: u(28), letterSpacing: u(3) }}>
            PRIORITAIRE
          </div>
          <div style={{ fontFamily: F.cond, fontWeight: 700, fontSize: u(10), letterSpacing: u(2), marginTop: u(3) }}>
            ★ {service} ★
          </div>
        </div>
      </div>
    </div>
  );
}
