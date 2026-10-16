import type { CSSProperties } from "react";
import { fit, u } from "../../lib/units";
import { F } from "../../lib/fonts";
import { perfMask } from "../../lib/masks";
import { clip, paperBg } from "../../lib/paper";
import { useUid } from "../../lib/useUid";
import { Postmark } from "../primitives";

const nowrap: CSSProperties = { whiteSpace: "nowrap" };

/* ------------------------------------------------------------------ */
/*  1. Ticket de rouleau « ENTRÉE »                                     */
/* ------------------------------------------------------------------ */

export function RollTicket({ personnalisation = {} }: { personnalisation?: Record<string, string> }) {
  const cream = "#f8e9cf";
  const side: CSSProperties = { fontFamily: F.stat, fontSize: u(17), letterSpacing: u(3), color: cream, ...nowrap };
  return (
    <div
      className="paper edge-side-notch w-full h-full"
      style={{ ...paperBg("#dd5144", "#cd4034", "#b2322a"), "--notch": u(18) } as CSSProperties}
    >
      <div
        className="absolute ink-worn"
        style={{ inset: u(11), border: `${u(2)} dashed ${cream}`, opacity: 0.85 }}
      />
      <div
        className="absolute inset-0 grid ink-worn"
        style={{ gridTemplateColumns: `${u(54)} 1fr ${u(54)}` }}
      >
        <div className="flex items-center justify-center">
          <span className="vtext-up" style={side}>N° {personnalisation.numero ?? "004217"}</span>
        </div>
        <div className="flex flex-col items-center justify-center text-center" style={{ color: cream }}>
          <span style={{ fontFamily: F.cond, fontWeight: 600, fontSize: u(13), letterSpacing: u(6), ...nowrap }}>
            {personnalisation.organisation ?? "CINÉMA PARADIS"}
          </span>
          <span style={{ fontFamily: F.bebas, fontSize: u(fit(personnalisation.titre ?? "ENTRÉE", 80, 6)), letterSpacing: u(3), lineHeight: 0.95 }}>{personnalisation.titre ?? "ENTRÉE"}</span>
          <span style={{ fontFamily: F.cond, fontWeight: 600, fontSize: u(14), letterSpacing: u(5), ...nowrap }}>
            {personnalisation.sousTitre ?? "★ UNE PERSONNE ★"}
          </span>
          <span style={{ fontFamily: F.type, fontSize: u(10), letterSpacing: u(2), opacity: 0.85, marginTop: u(5), ...nowrap }}>
            {personnalisation.mention ?? "NI REPRIS NI ÉCHANGÉ"}
          </span>
        </div>
        <div className="flex items-center justify-center">
          <span className="vtext" style={side}>N° {personnalisation.numero ?? "004217"}</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  2. Billet de salle à talon détachable (personnalisable)             */
/* ------------------------------------------------------------------ */

export interface CinemaStubProps {
  personnalisation?: Record<string, string>;
  tone?: "cream" | "blue";
  cinema?: string;
  film?: string;
  date?: string;
  heure?: string;
  salle?: string;
  place?: string;
  holder?: string;
  prix?: string;
}

export function CinemaStub({
  personnalisation = {},
  tone = "cream",
  cinema = "LE GRAND ROYAL",
  film = "LE DERNIER TRAIN",
  date = "SAM 14 JUIN",
  heure = "20H45",
  salle = "4",
  place = "F 12",
  holder = "",
  prix = "9,50 €",
}: CinemaStubProps) {
  cinema = personnalisation.cinema ?? cinema;
  film = personnalisation.film ?? film;
  date = personnalisation.date ?? date;
  heure = personnalisation.heure ?? heure;
  salle = personnalisation.salle ?? salle;
  place = personnalisation.place ?? place;
  holder = personnalisation.holder ?? holder;
  prix = personnalisation.prix ?? prix;
  const t =
    tone === "blue"
      ? { paper: paperBg("#2f4b7a", "#27406b", "#1b3057"), ink: "#f1e4c4", title: "#fbf3df", dark: true }
      : { paper: paperBg("#f6edd6", "#efe3c6", "#e1d1ae"), ink: "#7b2a22", title: "#2a211b", dark: false };
  const cells: [string, string][] = [
    ["DATE", date],
    ["HEURE", heure],
    ["SALLE", salle],
    ["PLACE", place],
  ];
  return (
    <div
      className={`paper ${t.dark ? "paper-dark" : ""} w-full h-full grid`}
      style={{ ...t.paper, ...perfMask(["77%"], u(13)), gridTemplateColumns: "minmax(0,77fr) minmax(0,23fr)" } as CSSProperties}
    >
      <div
        className="relative ink-worn flex flex-col justify-between"
        style={{ padding: `${u(20)} ${u(24)} ${u(20)} ${u(26)}`, color: t.ink, minWidth: 0 }}
      >
        <div>
          <div className="flex items-baseline justify-between" style={{ gap: u(10) }}>
            <span style={{ fontFamily: F.deco, fontSize: u(fit(cinema, 18, 15)), letterSpacing: u(3), ...clip, minWidth: 0 }}>
              {cinema}
            </span>
            <span style={{ fontFamily: F.cond, fontWeight: 600, fontSize: u(12), letterSpacing: u(2), flex: "none", ...nowrap }}>
              TARIF PLEIN · {prix}
            </span>
          </div>
          <div
            style={{
              height: u(5),
              marginTop: u(9),
              borderTop: `${u(2.5)} solid ${t.ink}`,
              borderBottom: `${u(1)} solid ${t.ink}`,
            }}
          />
        </div>
        <div
          style={{
            fontFamily: F.bebas,
            fontSize: u(fit(film, 62, 17)),
            letterSpacing: u(2),
            lineHeight: 1,
            color: t.title,
            textTransform: "uppercase",
            ...clip,
          }}
        >
          {film}
        </div>
        <div className="grid" style={{ gridTemplateColumns: "minmax(0,1.5fr) minmax(0,1fr) minmax(0,0.75fr) minmax(0,1fr)", gap: u(6) }}>
          {cells.map(([l, v]) => (
            <div key={l} style={{ lineHeight: 1, minWidth: 0 }}>
              <div style={{ fontFamily: F.cond, fontWeight: 600, fontSize: u(11), letterSpacing: u(2.5), marginBottom: u(4) }}>
                {l}
              </div>
              <div style={{ fontFamily: F.bebas, fontSize: u(fit(v, 30, 9)), letterSpacing: u(1), color: t.title, textTransform: "uppercase", ...clip }}>
                {v}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="relative flex min-w-0 flex-col items-center justify-center overflow-hidden text-center ink-worn"
        style={{ borderLeft: `${u(2)} dashed ${t.ink}`, color: t.ink, padding: `${u(10)} ${u(6)}`, lineHeight: 1 }}
      >
        <div style={{ fontFamily: F.cond, fontWeight: 600, fontSize: u(11), letterSpacing: u(3) }}>SALLE</div>
        <div style={{ fontFamily: F.bebas, fontSize: u(78), color: t.title }}>{salle}</div>
        <div style={{ fontFamily: F.cond, fontWeight: 600, fontSize: u(11), letterSpacing: u(3), marginTop: u(4) }}>PLACE</div>
        <div style={{ fontFamily: F.bebas, fontSize: u(fit(place, 32, 5)), color: t.title, textTransform: "uppercase", ...clip }}>
          {place}
        </div>
        <div
          style={{
            fontFamily: F.type,
            fontSize: u(9),
            letterSpacing: u(1.5),
            marginTop: u(10),
            opacity: 0.85,
            textTransform: "uppercase",
            ...clip,
          }}
        >
          {holder || "À CONSERVER"}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  3. Séance de minuit (art déco)                                      */
/* ------------------------------------------------------------------ */

export function MidnightTicket() {
  const gold = "#dcb865";
  return (
    <div
      className="paper paper-dark edge-notch w-full h-full"
      style={{ ...paperBg("#24212a", "#17151b", "#0e0d11"), "--notch": u(26) } as CSSProperties}
    >
      <div
        className="absolute inset-0 rays"
        style={
          {
            "--rx": "50%",
            "--ry": "62%",
            "--rc": "rgba(220,184,101,0.22)",
            WebkitMaskImage: "radial-gradient(circle at 50% 62%, #000, transparent 72%)",
            maskImage: "radial-gradient(circle at 50% 62%, #000, transparent 72%)",
          } as CSSProperties
        }
      />
      <div className="absolute ink-worn" style={{ inset: u(12), border: `${u(2.5)} solid ${gold}` }} />
      <div className="absolute" style={{ inset: u(19), border: `${u(1)} solid ${gold}`, opacity: 0.65 }} />
      <div
        className="absolute inset-0 flex flex-col items-center justify-between text-center ink-worn"
        style={{ padding: `${u(36)} ${u(28)} ${u(34)}`, color: gold }}
      >
        <div>
          <div style={{ fontFamily: F.cinzel, fontWeight: 700, fontSize: u(15), letterSpacing: u(5), ...nowrap }}>
            ★ CINÉMA ROYAL ★
          </div>
          <div style={{ fontFamily: F.playfair, fontStyle: "italic", fontSize: u(15), marginTop: u(6), opacity: 0.85 }}>
            présente
          </div>
        </div>
        <div style={{ lineHeight: 1 }}>
          <div style={{ fontFamily: F.deco, fontSize: u(50), letterSpacing: u(2), ...nowrap }}>SÉANCE</div>
          <div style={{ fontFamily: F.script, fontSize: u(46), margin: `${u(-2)} 0 ${u(2)}` }}>de</div>
          <div style={{ fontFamily: F.deco, fontSize: u(58), letterSpacing: u(3), color: "#f3dfa2", ...nowrap }}>MINUIT</div>
        </div>
        <div style={{ width: "100%" }}>
          <div style={{ fontFamily: F.cond, fontWeight: 500, fontSize: u(14), letterSpacing: u(4), ...nowrap }}>
            DEUX FILMS D'ÉPOUVANTE
          </div>
          <div style={{ height: u(1.5), background: gold, margin: `${u(10)} 0`, opacity: 0.7 }} />
          <div style={{ fontFamily: F.cond, fontWeight: 600, fontSize: u(13), letterSpacing: u(4), ...nowrap }}>
            ✦ ENTRÉE · UNE PERSONNE ✦
          </div>
          <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: u(13), letterSpacing: u(3), marginTop: u(6), opacity: 0.85 }}>
            N° 0013
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  4. Séance en relief 3D                                              */
/* ------------------------------------------------------------------ */

export function ThreeDTicket() {
  const red = "#e8342e";
  const cyan = "#1cc3e0";
  const ink = "#1d1b1a";
  const stripe = `repeating-linear-gradient(90deg, ${red} 0 ${u(14)}, ${cyan} ${u(14)} ${u(28)})`;
  return (
    <div
      className="paper edge-notch w-full h-full"
      style={{ ...paperBg("#f3ecdb", "#ece3cd", "#ddd1b4"), "--notch": u(15) } as CSSProperties}
    >
      <div className="absolute" style={{ left: u(14), right: u(14), top: u(14), height: u(10), background: stripe }} />
      <div className="absolute" style={{ left: u(14), right: u(14), bottom: u(14), height: u(10), background: stripe }} />
      <div
        className="absolute inset-0 grid ink-worn"
        style={{ gridTemplateColumns: "0.95fr 1.05fr", padding: `${u(36)} ${u(26)}` }}
      >
        <div className="flex items-center justify-center">
          <span
            style={{
              fontFamily: F.bebas,
              fontSize: u(150),
              lineHeight: 0.9,
              color: ink,
              letterSpacing: u(2),
              textShadow: `${u(-6)} 0 0 rgba(232,52,46,0.85), ${u(6)} 0 0 rgba(28,195,224,0.85)`,
            }}
          >
            3D
          </span>
        </div>
        <div className="flex flex-col justify-center" style={{ color: ink, lineHeight: 1 }}>
          <span style={{ fontFamily: F.cond, fontWeight: 600, fontSize: u(13), letterSpacing: u(5) }}>SÉANCE SPÉCIALE</span>
          <span style={{ fontFamily: F.bebas, fontSize: u(54), letterSpacing: u(2), margin: `${u(4)} 0 ${u(8)}`, ...nowrap }}>
            EN RELIEF
          </span>
          <span style={{ fontFamily: F.type, fontSize: u(11), letterSpacing: u(1.5), lineHeight: 1.35 }}>
            LUNETTES FOURNIES
            <br />À L'ENTRÉE DE LA SALLE
          </span>
          <span style={{ fontFamily: F.cond, fontWeight: 600, fontSize: u(15), letterSpacing: u(3), marginTop: u(10), color: red }}>
            SALLE 2 · 16H15
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  5. Bande de pellicule                                               */
/* ------------------------------------------------------------------ */

export function FilmStripTicket() {
  const holeBg = "#eadfc4";
  const holes = (pos: CSSProperties) => (
    <div className="absolute flex overflow-hidden" style={{ left: u(10), right: u(10), gap: u(14), ...pos }}>
      {Array.from({ length: 27 }).map((_, i) => (
        <span key={i} style={{ flex: "none", width: u(16), height: u(11), borderRadius: u(2.5), background: holeBg }} />
      ))}
    </div>
  );
  const frame: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    borderRadius: u(4),
    boxShadow: `inset 0 0 ${u(10)} rgba(0,0,0,0.35)`,
  };
  return (
    <div
      className="paper paper-dark w-full h-full"
      style={{ ...paperBg("#1f1c1a", "#171412", "#0e0c0b"), borderRadius: u(5) }}
    >
      {holes({ top: u(11) })}
      {holes({ bottom: u(11) })}
      <div
        className="absolute grid ink-worn"
        style={{ left: u(14), right: u(14), top: u(34), bottom: u(34), gridTemplateColumns: "repeat(4, 1fr)", gap: u(10) }}
      >
        {/* Frame 1 - title */}
        <div className="flex flex-col items-center justify-center text-center" style={{ ...frame, background: "linear-gradient(160deg,#e9d6a8,#cfb67c)", color: "#3a2a17", lineHeight: 0.95 }}>
          <span style={{ fontFamily: F.cond, fontWeight: 600, fontSize: u(10), letterSpacing: u(4) }}>CINÉMA PARADIS</span>
          <span style={{ fontFamily: F.bebas, fontSize: u(44), letterSpacing: u(1), marginTop: u(4) }}>LE DERNIER</span>
          <span style={{ fontFamily: F.bebas, fontSize: u(44), letterSpacing: u(1) }}>TRAIN</span>
        </div>
        {/* Frame 2 - nuit */}
        <div className="flex items-center justify-center" style={{ ...frame, background: "linear-gradient(180deg,#14224a,#2c3f78 70%,#3a2d4a)" }}>
          <div style={{ position: "absolute", top: u(14), right: u(24), width: u(34), height: u(34), borderRadius: "50%", background: "#f4e6b0", boxShadow: `0 0 ${u(22)} rgba(244,230,176,0.6)` }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: u(30), background: "#0b0f22", clipPath: "polygon(0 60%, 18% 20%, 34% 55%, 52% 10%, 70% 50%, 86% 25%, 100% 55%, 100% 100%, 0 100%)" }} />
          <span style={{ position: "relative", fontFamily: F.playfair, fontStyle: "italic", fontSize: u(15), color: "#f4e6b0", marginTop: u(14) }}>minuit</span>
        </div>
        {/* Frame 3 - rails */}
        <div style={{ ...frame, background: "linear-gradient(180deg,#e3c585 0%,#d79a52 55%,#6a3d22 55%,#3b2214)" }}>
          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: 0,
              width: "100%",
              height: "46%",
              transform: "translateX(-50%)",
              background: `repeating-linear-gradient(0deg, transparent 0 ${u(9)}, rgba(240,220,180,0.55) ${u(9)} ${u(11)})`,
              clipPath: "polygon(42% 0, 58% 0, 100% 100%, 0 100%)",
            }}
          />
          <span style={{ position: "absolute", left: u(8), top: u(8), fontFamily: F.stat, fontSize: u(15), letterSpacing: u(3), color: "#3b2214" }}>VOIE 9</span>
        </div>
        {/* Frame 4 - fin */}
        <div className="flex flex-col items-center justify-center" style={{ ...frame, background: "linear-gradient(160deg,#f1e7cd,#d9c9a3)", color: "#3a2a17" }}>
          <span style={{ fontFamily: F.script, fontSize: u(56), lineHeight: 1 }}>Fin</span>
          <span style={{ fontFamily: F.cond, fontWeight: 600, fontSize: u(10), letterSpacing: u(4), marginTop: u(4) }}>★ VOSTFR ★</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  6. Carte de membre du ciné-club                                     */
/* ------------------------------------------------------------------ */

function Reel({ color, size }: { color: string; size: number }) {
  const holes = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2;
    return [50 + Math.cos(a) * 27, 50 + Math.sin(a) * 27] as const;
  });
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" style={{ width: u(size), height: u(size) }}>
      <circle cx="50" cy="50" r="46" fill="none" stroke={color} strokeWidth="4" />
      <circle cx="50" cy="50" r="40" fill={color} opacity="0.12" />
      {holes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="10" fill="none" stroke={color} strokeWidth="3.5" />
      ))}
      <circle cx="50" cy="50" r="7" fill={color} />
    </svg>
  );
}

export function MemberCard() {
  const navy = "#26406b";
  const red = "#b8352b";
  return (
    <div
      className="paper w-full h-full"
      style={{ ...paperBg("#f5ebd1", "#ecdfbc", "#dccb9f"), borderRadius: u(12) }}
    >
      <div className="absolute ink-worn" style={{ inset: u(10), border: `${u(5)} double ${navy}`, borderRadius: u(6) }} />
      <div className="absolute ink-worn" style={{ inset: u(26), color: navy }}>
        <div className="flex items-center" style={{ gap: u(14) }}>
          <Reel color={navy} size={56} />
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontFamily: F.cinzel, fontWeight: 700, fontSize: u(24), letterSpacing: u(4), ...nowrap }}>CINÉ-CLUB</div>
            <div style={{ fontFamily: F.cond, fontWeight: 500, fontSize: u(12), letterSpacing: u(3.5), marginTop: u(6), ...nowrap }}>
              DU QUARTIER SAINT-MICHEL
            </div>
          </div>
        </div>
        <div className="flex items-baseline justify-between" style={{ marginTop: u(14) }}>
          <span style={{ fontFamily: F.bebas, fontSize: u(40), letterSpacing: u(3), color: red, lineHeight: 1, ...nowrap }}>
            CARTE DE MEMBRE
          </span>
          <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: u(14), letterSpacing: u(2) }}>N° 0371</span>
        </div>
        <div style={{ marginTop: u(14) }}>
          <div style={{ fontFamily: F.cond, fontWeight: 600, fontSize: u(10), letterSpacing: u(4) }}>TITULAIRE</div>
          <div style={{ fontFamily: F.script, fontSize: u(44), lineHeight: 1.1, borderBottom: `${u(1.5)} solid ${navy}`, width: "72%", color: "#1d2c4d" }}>
            Jeanne Moreau
          </div>
          <div style={{ fontFamily: F.type, fontSize: u(11), letterSpacing: u(1.5), marginTop: u(8) }}>
            VALABLE JUSQU'AU 31 DÉC. 1962 · 1 FILM / SEMAINE
          </div>
        </div>
      </div>
      <Postmark
        id="cineclub"
        size={96}
        color={red}
        top="CINÉ-CLUB"
        bottom="COTISATION PAYÉE"
        center={["PAYÉ", "1962"]}
        className="absolute"
        style={{ right: u(18), bottom: u(14), transform: "rotate(-14deg)", opacity: 0.8 }}
        stroke={2.6}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  7. Bon pour un pop-corn                                             */
/* ------------------------------------------------------------------ */

export function PopcornVoucher() {
  const uid = useUid("pop");
  const red = "#c63a2f";
  const kernels: [number, number, number][] = [
    [52, 52, 17], [76, 38, 19], [102, 34, 21], [128, 42, 18], [150, 56, 15], [92, 56, 20], [66, 66, 15], [120, 64, 17],
  ];
  return (
    <div
      className="paper edge-notch w-full h-full"
      style={{ ...paperBg("#f6eed9", "#efe4c6", "#e0d1aa"), "--notch": u(15) } as CSSProperties}
    >
      <div className="absolute inset-0 flex flex-col items-center ink-worn" style={{ padding: `${u(18)} ${u(22)} ${u(18)}` }}>
        <svg aria-hidden="true" viewBox="0 0 200 150" style={{ width: u(160), height: u(120) }}>
          <defs>
            <clipPath id={`${uid}-c`}>
              <path d="M44 74 H156 L146 146 H54 Z" />
            </clipPath>
          </defs>
          {kernels.map(([x, y, r], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r={r} fill="#f8ecb8" stroke="#dcc16a" strokeWidth="2" />
              <circle cx={x + r * 0.25} cy={y - r * 0.15} r={r * 0.32} fill="#efc74d" opacity="0.8" />
            </g>
          ))}
          <g clipPath={`url(#${uid}-c)`}>
            <rect x="40" y="70" width="120" height="80" fill="#f3e9d0" />
            {Array.from({ length: 9 }).map((_, i) => (
              <rect key={i} x={40 + i * 14} y="70" width="7" height="80" fill={red} />
            ))}
          </g>
          <path d="M44 74 H156 L146 146 H54 Z" fill="none" stroke={red} strokeWidth="2.5" />
          <rect x="40" y="70" width="120" height="9" rx="3" fill={red} />
        </svg>
        <div className="text-center" style={{ color: red, lineHeight: 1, marginTop: u(8) }}>
          <div style={{ fontFamily: F.cond, fontWeight: 600, fontSize: u(13), letterSpacing: u(6) }}>BON POUR</div>
          <div style={{ fontFamily: F.display, fontSize: u(38), marginTop: u(4), ...nowrap }}>UN POP-CORN</div>
          <div style={{ fontFamily: F.type, fontSize: u(10), letterSpacing: u(1.5), marginTop: u(8), color: "#5a3a22" }}>
            TAILLE MOYENNE · SALÉ OU SUCRÉ
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  8. Drive-in                                                         */
/* ------------------------------------------------------------------ */

export function DriveInTicket() {
  const cream = "#fbf0d6";
  const orange = "#f27a2f";
  const dark = "#1f4a45";
  return (
    <div
      className="paper w-full h-full grid"
      style={{ ...paperBg("#86c4b4", "#6fb09f", "#559a89"), ...perfMask(["78%"], u(14)), gridTemplateColumns: "78fr 22fr" } as CSSProperties}
    >
      <div className="relative overflow-hidden ink-worn" style={{ padding: `${u(22)} ${u(26)}` }}>
        {/* stars */}
        {[[12, 14], [30, 8], [52, 20], [70, 10], [88, 22], [20, 40], [62, 38]].map(([x, y], i) => (
          <span key={i} className="absolute" style={{ left: `${x}%`, top: `${y}%`, fontSize: u(10 + (i % 3) * 3), color: cream, opacity: 0.75 }}>
            ✦
          </span>
        ))}
        <div className="relative" style={{ color: cream, lineHeight: 0.9 }}>
          <div style={{ fontFamily: F.bebas, fontSize: u(100), letterSpacing: u(3), textShadow: `${u(4)} ${u(4)} 0 ${orange}`, ...nowrap }}>
            DRIVE-IN
          </div>
          <div style={{ fontFamily: F.cond, fontWeight: 600, fontSize: u(17), letterSpacing: u(7), marginTop: u(8), ...nowrap }}>
            CINÉMA SOUS LES ÉTOILES
          </div>
        </div>
        <svg
          aria-hidden="true"
          viewBox="0 0 160 56"
          className="absolute"
          style={{ left: u(24), bottom: u(18), width: u(150), height: u(52) }}
        >
          <path
            d="M4 38C4 30 10 28 18 27L34 12C38 8 44 7 50 7H92C100 7 106 10 110 15L122 27C134 28 140 31 140 38V44H4Z"
            fill={orange}
          />
          <path d="M40 25L52 12H70V25Z M76 25V12H94C98 12 101 14 104 17L110 25Z" fill="#cfe9df" />
          <g fill={dark}>
            <circle cx="36" cy="44" r="10" />
            <circle cx="112" cy="44" r="10" />
          </g>
          <g fill="#cfe9df">
            <circle cx="36" cy="44" r="4.5" />
            <circle cx="112" cy="44" r="4.5" />
          </g>
        </svg>
        <div
          className="absolute text-right"
          style={{ right: u(26), bottom: u(22), color: dark, fontFamily: F.stat, fontSize: u(19), letterSpacing: u(3), lineHeight: 1.25 }}
        >
          1 VOITURE
          <br />4 PERSONNES MAX.
        </div>
      </div>
      <div
        className="flex flex-col items-center justify-center text-center ink-worn"
        style={{ borderLeft: `${u(2.5)} dashed ${cream}`, color: cream, lineHeight: 1 }}
      >
        <span className="vtext-up" style={{ fontFamily: F.stat, fontSize: u(24), letterSpacing: u(5) }}>N° 0786</span>
        <span style={{ fontSize: u(30), marginTop: u(14), color: orange }}>★</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  9. Claquette - entrée plateau                                       */
/* ------------------------------------------------------------------ */

export function ClapperTicket() {
  const chalk = "#efe9dc";
  const stripes = `repeating-linear-gradient(-45deg, ${chalk} 0 ${u(17)}, #151414 ${u(17)} ${u(34)})`;
  const lab: CSSProperties = { fontFamily: F.type, fontSize: u(11), letterSpacing: u(2.5), opacity: 0.8, lineHeight: 1 };
  const val: CSSProperties = { fontFamily: F.bebas, fontSize: u(34), letterSpacing: u(2), lineHeight: 1, marginTop: u(4), ...nowrap };
  const cell = (extra: CSSProperties = {}): CSSProperties => ({
    padding: `${u(8)} ${u(12)} ${u(10)}`,
    borderTop: `${u(2.5)} solid ${chalk}`,
    ...extra,
  });
  return (
    <div
      className="paper paper-dark w-full h-full"
      style={{ ...paperBg("#2a2827", "#1d1c1b", "#121110"), borderRadius: u(8) }}
    >
      {/* clap arm */}
      <div
        className="absolute"
        style={{
          left: u(10),
          right: u(10),
          top: u(38),
          height: u(36),
          background: stripes,
          border: `${u(3)} solid ${chalk}`,
          transform: "rotate(-5.5deg)",
          transformOrigin: "left bottom",
        }}
      />
      <div
        className="absolute"
        style={{ left: u(10), right: u(10), top: u(76), height: u(36), background: stripes, border: `${u(3)} solid ${chalk}` }}
      />
      <div
        className="absolute ink-worn"
        style={{ left: u(10), right: u(10), top: u(112), bottom: u(10), color: chalk, border: `${u(3)} solid ${chalk}`, borderTop: "none" }}
      >
        <div className="grid" style={{ gridTemplateColumns: "1.25fr 1fr" }}>
          <div style={{ padding: `${u(10)} ${u(12)} ${u(10)}` }}>
            <div style={lab}>PRODUCTION</div>
            <div style={val}>PARADIS FILMS</div>
          </div>
          <div style={{ padding: `${u(10)} ${u(12)} ${u(10)}`, borderLeft: `${u(2.5)} solid ${chalk}` }}>
            <div style={lab}>RÉALISATEUR</div>
            <div style={val}>M. DUPONT</div>
          </div>
        </div>
        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr 1.3fr" }}>
          <div style={cell()}>
            <div style={lab}>SCÈNE</div>
            <div style={val}>12</div>
          </div>
          <div style={cell({ borderLeft: `${u(2.5)} solid ${chalk}` })}>
            <div style={lab}>PRISE</div>
            <div style={val}>3</div>
          </div>
          <div style={cell({ borderLeft: `${u(2.5)} solid ${chalk}` })}>
            <div style={lab}>ROULEAU</div>
            <div style={val}>A07</div>
          </div>
        </div>
        <div className="flex items-center justify-center" style={cell({ padding: `${u(10)} ${u(14)}` })}>
          <span style={{ fontFamily: F.bebas, fontSize: u(30), letterSpacing: u(5), color: "#f2c14e", ...nowrap }}>
            ENTRÉE VIP · PLATEAU 4
          </span>
        </div>
      </div>
    </div>
  );
}
