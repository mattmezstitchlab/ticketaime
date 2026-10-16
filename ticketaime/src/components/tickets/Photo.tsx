import type { CSSProperties } from "react";
import { u } from "../../lib/units";
import { F } from "../../lib/fonts";
import { paperBg } from "../../lib/paper";

/* ------------------------------------------------------------------ */
/*  Scènes SVG plates, ton sépia                                       */
/* ------------------------------------------------------------------ */

function ScenePlage() {
  return (
    <svg viewBox="0 0 120 100" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      <rect width="120" height="100" fill="#d9c9a9" />
      <rect y="52" width="120" height="20" fill="#9db3ae" />
      <rect y="72" width="120" height="28" fill="#e3d3ac" />
      <circle cx="98" cy="18" r="10" fill="#efe0b8" />
      <path d="M10 30q4-5 8 0M22 34q4-5 8 0" stroke="#7a5c3e" strokeWidth="1.5" fill="none" />
      <rect x="39" y="32" width="2.5" height="48" fill="#5d452c" />
      <path d="M16 40a24 13 0 0 1 48 0z" fill="#b3542e" />
      <path d="M16 40q12 7 24 0q12 7 24 0" stroke="#8e3d20" strokeWidth="1.5" fill="none" />
      <circle cx="86" cy="66" r="4.5" fill="#4e3a26" />
      <path d="M81 71h10l-2.5 16h-5z" fill="#4e3a26" />
      <ellipse cx="60" cy="90" rx="12" ry="3" fill="#b9a67f" />
    </svg>
  );
}

function ScenePortrait() {
  return (
    <svg viewBox="0 0 120 100" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      <rect width="120" height="100" fill="#d3c19e" />
      <rect y="70" width="120" height="30" fill="#b39c74" />
      <circle cx="60" cy="38" r="13" fill="#5d452c" />
      <path d="M60 51q-22 2-24 49h48q-2-47-24-49z" fill="#4e3a26" />
      <path d="M46 51l14 9 14-9" stroke="#d3c19e" strokeWidth="2.5" fill="none" />
      <path d="M38 26q22-12 44 0v6H38z" fill="#3a2c1c" />
      <path d="M32 32h56" stroke="#3a2c1c" strokeWidth="4" />
    </svg>
  );
}

function SceneFamille() {
  return (
    <svg viewBox="0 0 120 100" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      <rect width="120" height="100" fill="#d8c7a4" />
      <rect y="74" width="120" height="26" fill="#a58e63" />
      <circle cx="18" cy="26" r="12" fill="#8a7248" />
      <rect x="16" y="36" width="4" height="40" fill="#5d452c" />
      {Array.from({ length: 5 }).map((_, i) => (
        <rect key={i} x={62 + i * 13} y="52" width="3" height="22" fill="#5d452c" />
      ))}
      <path d="M60 74V54" stroke="#5d452c" strokeWidth="3" />
      <circle cx="42" cy="46" r="7" fill="#4e3a26" />
      <path d="M34 53q8 2 8 10l-1 31h-8l1-28q-2-11-4-13z" fill="#4e3a26" />
      <circle cx="78" cy="46" r="7" fill="#4e3a26" />
      <path d="M70 53q8 2 8 10l-1 31h-8l1-28q-2-11-4-13z" fill="#4e3a26" />
      <circle cx="60" cy="54" r="5" fill="#4e3a26" />
      <path d="M54 59q6 2 6 8v27h-12V67q0-6 6-8z" fill="#4e3a26" />
    </svg>
  );
}

function SceneSilhouette() {
  return (
    <svg viewBox="0 0 70 80" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      <rect width="70" height="80" fill="#cfc0a0" />
      <circle cx="35" cy="26" r="11" fill="#4e3a26" />
      <path d="M35 37q-18 2-19 43h38q-1-41-19-43z" fill="#4e3a26" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Polaroid (base + variantes)                                        */
/* ------------------------------------------------------------------ */

function PolaroidBase({
  scene,
  legendeDef,
  personnalisation,
}: {
  scene: React.ReactNode;
  legendeDef: string;
  personnalisation?: Record<string, string>;
}) {
  const legende = personnalisation?.legende ?? legendeDef;
  return (
    <div className="paper edge-soft h-full w-full" style={{ ...paperBg("#f8f5ee", "#f1ede2", "#e5e0d2"), borderRadius: u(4) }}>
      <div
        className="absolute overflow-hidden"
        style={{ inset: `${u(24)} ${u(24)} ${u(66)}`, background: "#efe6d2", boxShadow: `inset 0 ${u(2)} ${u(8)} rgba(90,70,40,.28)` }}
      >
        {scene}
      </div>
      <div className="absolute text-center" style={{ left: 0, right: 0, bottom: u(20) }}>
        <span
          style={{
            fontFamily: F.script,
            fontSize: u(30),
            color: "#4e4030",
            transform: "rotate(-1.5deg)",
            display: "inline-block",
          }}
        >
          {legende}
        </span>
      </div>
    </div>
  );
}

export function PolaroidPlage({ personnalisation }: { personnalisation?: Record<string, string> }) {
  return <PolaroidBase scene={<ScenePlage />} legendeDef="La plage, juillet 1957" personnalisation={personnalisation} />;
}

export function PolaroidPortrait({ personnalisation }: { personnalisation?: Record<string, string> }) {
  return <PolaroidBase scene={<ScenePortrait />} legendeDef="Paris, rue des Martyrs" personnalisation={personnalisation} />;
}

/* ------------------------------------------------------------------ */
/*  Vieux tirage sépia abîmé                                           */
/* ------------------------------------------------------------------ */

export function PhotoVieille({ personnalisation }: { personnalisation?: Record<string, string> }) {
  const legende = personnalisation?.legende ?? "Les Dupont, au jardin";
  const annee = personnalisation?.annee ?? "été 1949";
  return (
    <div
      className="paper paper-heavy-age h-full w-full"
      style={{ ...paperBg("#e9dcc0", "#dcc9a4", "#c9b489"), color: "#4a3a22" }}
    >
      <div
        className="absolute relative overflow-hidden"
        style={{ inset: `${u(18)} ${u(18)} ${u(46)}`, background: "#c9b489", padding: u(10) }}
      >
        <div className="relative h-full w-full overflow-hidden" style={{ background: "#d8c7a4" }}>
          <SceneFamille />
          {/* éraflures */}
          <span className="absolute" style={{ left: u(12), top: u(-10), width: u(2), height: u(130), background: "rgba(255,250,235,0.55)", transform: "rotate(18deg)" }} />
          <span className="absolute" style={{ right: u(26), top: u(20), width: u(1.5), height: u(90), background: "rgba(255,250,235,0.45)", transform: "rotate(-12deg)" }} />
          {/* vignette */}
          <span
            className="absolute inset-0"
            style={{ background: "radial-gradient(120% 100% at 50% 45%, transparent 45%, rgba(60,40,15,0.55) 100%)" }}
          />
          {/* coin brûlé */}
          <span
            className="absolute"
            style={{ right: u(-14), bottom: u(-14), width: u(50), height: u(50), borderRadius: "50%", background: "radial-gradient(circle, rgba(40,22,5,0.75) 0%, rgba(40,22,5,0.35) 45%, transparent 70%)" }}
          />
        </div>
        {/* rubans adhésifs */}
        <span className="absolute" style={{ left: u(-10), top: u(-8), width: u(56), height: u(17), background: "rgba(244,236,209,0.6)", transform: "rotate(-45deg)", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
        <span className="absolute" style={{ right: u(-10), bottom: u(-8), width: u(56), height: u(17), background: "rgba(244,236,209,0.6)", transform: "rotate(-45deg)", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
      </div>
      <div className="absolute text-center" style={{ left: 0, right: 0, bottom: u(16) }}>
        <span style={{ fontFamily: F.script, fontSize: u(26), transform: "rotate(-1deg)", display: "inline-block" }}>
          {legende} · {annee}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Carte photo ancienne avec timbre & tampon                          */
/* ------------------------------------------------------------------ */

export function PhotoCarte({ personnalisation }: { personnalisation?: Record<string, string> }) {
  const legende = personnalisation?.legende ?? "La promenade au bois";
  const annee = personnalisation?.annee ?? "1936";
  return (
    <div className="paper h-full w-full" style={{ ...paperBg("#f2ebdb", "#e7dcc2", "#d8c9a8"), color: "#4a3a22" }}>
      <div
        className="absolute overflow-hidden"
        style={{ left: u(20), top: u(20), width: u(220), height: u(170), background: "#d3c19e", boxShadow: `0 0 0 ${u(6)} #f2ebdb, 0 ${u(2)} ${u(6)} rgba(60,40,15,0.3)` }}
      >
        <SceneFamille />
      </div>
      {/* timbre */}
      <div
        className="absolute edge-perf"
        style={{ right: u(22), top: u(22), width: u(48), height: u(58), background: "#9e493f", "--perf": u(6) } as CSSProperties}
      >
        <div className="absolute" style={{ inset: u(6), border: `${u(1)} solid rgba(255,240,230,0.8)` }} />
        <span className="absolute inset-0 flex items-center justify-center" style={{ fontFamily: F.cinzel, fontSize: u(13), color: "#f5e9d8" }}>
          50
        </span>
      </div>
      {/* tampon */}
      <svg
        viewBox="0 0 100 100"
        className="absolute"
        aria-hidden="true"
        style={{ right: u(14), top: u(40), width: u(84), height: u(84), opacity: 0.55, transform: "rotate(-10deg)" }}
      >
        <circle cx="50" cy="50" r="46" fill="none" stroke="#7a5c3e" strokeWidth="3" />
        <circle cx="50" cy="50" r="32" fill="none" stroke="#7a5c3e" strokeWidth="1.5" />
        <text x="50" y="46" textAnchor="middle" fontSize="12" fill="#7a5c3e" fontFamily="Courier Prime, monospace" fontWeight="700">PARIS 11</text>
        <text x="50" y="62" textAnchor="middle" fontSize="11" fill="#7a5c3e" fontFamily="Courier Prime, monospace" fontWeight="700">{annee}</text>
      </svg>
      <div className="absolute text-center" style={{ left: u(20), right: u(20), bottom: u(18) }}>
        <span style={{ fontFamily: F.script, fontSize: u(24), transform: "rotate(-1deg)", display: "inline-block" }}>{legende}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Photo d'identité (bande de quatre)                                 */
/* ------------------------------------------------------------------ */

export function PhotoIdentite({ personnalisation }: { personnalisation?: Record<string, string> }) {
  const nom = personnalisation?.nom ?? "MARTIN JEANNE";
  return (
    <div className="paper edge-soft h-full w-full" style={{ ...paperBg("#f7f4ea", "#efeadd", "#e2dbc8"), color: "#2b2622" }}>
      <div className="absolute" style={{ left: u(20), right: u(20), top: u(18) }}>
        <div className="flex items-center justify-between">
          <span style={{ fontFamily: F.cond, fontWeight: 600, fontSize: u(12), letterSpacing: u(3) }}>PHOTO D'IDENTITÉ</span>
          <span style={{ fontFamily: F.mono, fontSize: u(10), opacity: 0.7 }}>35 × 45</span>
        </div>
        <div style={{ height: u(1.5), background: "#2b2622", marginTop: u(4) }} />
      </div>
      <div
        className="absolute grid"
        style={{ left: u(20), right: u(20), top: u(52), bottom: u(64), gridTemplateColumns: "repeat(4, 1fr)", gap: u(8) }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="relative overflow-hidden" style={{ border: `${u(1.5)} solid #2b2622` }}>
            <SceneSilhouette />
            <span
              className="absolute"
              style={{ left: u(3), bottom: u(3), fontFamily: F.mono, fontSize: u(8), color: "#2b2622", background: "rgba(247,244,234,0.85)", padding: `0 ${u(2)}` }}
            >
              {i + 1}
            </span>
          </div>
        ))}
      </div>
      <div className="absolute" style={{ left: u(20), right: u(20), bottom: u(20) }}>
        <div style={{ borderTop: `${u(1.5)} dashed #2b2622`, padding: `${u(8)} 0 0` }}>
          <div className="flex justify-between" style={{ fontFamily: F.type, fontSize: u(11), lineHeight: 1.4 }}>
            <span>NOM : {nom}</span>
            <span>4 POSITIONS</span>
          </div>
          <div style={{ fontFamily: F.type, fontSize: u(9), opacity: 0.7 }}>TÊTE DÉCOUVERTE · FOND NEUTRE</div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Ticket de cabine photo                                             */
/* ------------------------------------------------------------------ */

export function TicketCabine({ personnalisation }: { personnalisation?: Record<string, string> }) {
  const nom = personnalisation?.nom ?? "";
  return (
    <div
      className="paper edge-zigzag-tb h-full w-full"
      style={{ ...paperBg("#f3e2b4", "#e9d39a", "#d9bf7e"), "--z": u(7), color: "#4a3a14" } as CSSProperties}
    >
      <div className="absolute inset-0 ink-worn text-center" style={{ padding: `${u(16)} ${u(22)}` }}>
        <div style={{ fontFamily: F.bebas, fontSize: u(32), letterSpacing: u(3), lineHeight: 1 }}>CABINE</div>
        <div style={{ fontFamily: F.bebas, fontSize: u(32), letterSpacing: u(3), color: "#a3392e", lineHeight: 1 }}>PHOTO</div>
        {/* fente à pièces */}
        <div className="mx-auto" style={{ width: u(52), height: u(9), background: "#241c0a", borderRadius: u(5), margin: `${u(10)} 0` }} />
        <div style={{ fontFamily: F.type, fontSize: u(10.5), letterSpacing: u(1) }}>5 FRANCS · DURÉE 1 MINUTE</div>
        {/* les quatre photos à venir */}
        <div className="flex justify-center gap-[calc(8*var(--u))]" style={{ margin: `${u(10)} 0` }}>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} style={{ width: u(22), height: u(26), border: `${u(1.5)} solid #4a3a14`, background: i === 0 ? "rgba(74,58,20,0.2)" : "transparent" }} />
          ))}
        </div>
        <div style={{ fontFamily: F.type, fontSize: u(10), letterSpacing: u(1) }}>
          {nom ? `NOM : ${nom.toUpperCase()}` : "NOM : __________________"}
        </div>
        <div style={{ fontFamily: F.mono, fontSize: u(8.5), letterSpacing: u(2), marginTop: u(4), opacity: 0.7 }}>N° 0047 · HÔTEL DE VILLE</div>
      </div>
    </div>
  );
}
