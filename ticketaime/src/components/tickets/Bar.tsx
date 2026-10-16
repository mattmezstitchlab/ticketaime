import type { CSSProperties } from "react";
import { fit, u } from "../../lib/units";
import { F } from "../../lib/fonts";
import { perfMask } from "../../lib/masks";
import { clip, paperBg } from "../../lib/paper";
import { useUid } from "../../lib/useUid";
import { Barcode } from "../primitives";

const nowrap: CSSProperties = { whiteSpace: "nowrap" };

/* ------------------------------------------------------------------ */
/*  1. Sous-bock                                                        */
/* ------------------------------------------------------------------ */

interface CoasterProps {
  tone?: "cream" | "green";
  ring?: string;
  drink?: string;
  sub?: string;
}

export function Coaster({
  tone = "cream",
  ring = "BRASSERIE DU COIN ✦ BIÈRE FRAÎCHE ✦ DEPUIS 1892 ✦",
  drink = "BIÈRE",
  sub = "PRESSION · BOUTEILLE",
}: CoasterProps) {
  const uid = useUid("co");
  const c =
    tone === "green"
      ? { paper: paperBg("#d6e4ca", "#c6d9b7", "#abc29b"), ink: "#2b5a3a", acc: "#b8352b" }
      : { paper: paperBg("#f1e6cb", "#e8d9b6", "#d6c49c"), ink: "#b8352b", acc: "#26406b" };
  const path = "M150 150 m-114 0 a114 114 0 1 1 228 0 a114 114 0 1 1 -228 0";
  return (
    <div className="paper w-full h-full" style={{ ...c.paper, borderRadius: "50%" }}>
      <svg aria-hidden="true" viewBox="0 0 300 300" className="absolute inset-0 ink-worn" style={{ width: "100%", height: "100%" }}>
        <defs>
          <path id={`${uid}-r`} d={path} />
        </defs>
        <circle cx="150" cy="150" r="141" fill="none" stroke={c.ink} strokeWidth="5" />
        <circle cx="150" cy="150" r="132" fill="none" stroke={c.ink} strokeWidth="1.5" />
        <text fill={c.ink} fontSize="19" letterSpacing="2" style={{ fontFamily: F.cond, fontWeight: 600 }}>
          <textPath href={`#${uid}-r`} textLength="705" lengthAdjust="spacing">
            {ring}
          </textPath>
        </text>
        <circle cx="150" cy="150" r="89" fill="none" stroke={c.acc} strokeWidth="2.5" />
        <circle cx="150" cy="150" r="83" fill="none" stroke={c.acc} strokeWidth="1" />
        <text x="150" y="113" textAnchor="middle" fill={c.acc} fontSize="16" letterSpacing="8" style={{ fontFamily: F.cond }}>
          ★ ★ ★
        </text>
        <text x="150" y="176" textAnchor="middle" fill={c.ink} fontSize={Math.min(68, 340 / Math.max(drink.length, 4) * 1.5)} letterSpacing="3" style={{ fontFamily: F.bebas }}>
          {drink}
        </text>
        <text x="150" y="203" textAnchor="middle" fill={c.acc} fontSize="11.5" letterSpacing="2.5" style={{ fontFamily: F.cond, fontWeight: 600 }}>
          {sub}
        </text>
      </svg>
      {/* ring stain from a wet glass */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: "50%",
          zIndex: 4,
          background: `radial-gradient(circle at 74% 28%, rgba(110,66,24,0.05) 0 ${u(50)}, rgba(110,66,24,0.3) ${u(51)} ${u(54)}, transparent ${u(56)})`,
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  2. Carnet de tickets de consommation                                */
/* ------------------------------------------------------------------ */

interface CouponsProps {
  tone?: "amber" | "green" | "red";
  word?: string;
  start?: number;
}

export function DrinkCoupons({ tone = "amber", word = "VERRE", start = 321 }: CouponsProps) {
  const c = {
    amber: { paper: paperBg("#f3c854", "#ebb239", "#d99b2b"), ink: "#4a2a12" },
    green: { paper: paperBg("#a9cca3", "#93bb8d", "#79a273"), ink: "#1f3a22" },
    red: { paper: paperBg("#de6556", "#cf4f41", "#b43c31"), ink: "#fbeed3" },
  }[tone];
  return (
    <div
      className="paper w-full h-full grid"
      style={{ ...c.paper, ...perfMask(["25%", "50%", "75%"], u(10)), gridTemplateColumns: "repeat(4, 1fr)" } as CSSProperties}
    >
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="relative flex flex-col items-center justify-center text-center ink-worn"
          style={{ color: c.ink, borderLeft: i === 0 ? "none" : `${u(2.5)} dashed ${c.ink}`, lineHeight: 1 }}
        >
          <div style={{ fontFamily: F.cond, fontWeight: 600, fontSize: u(12), letterSpacing: u(5) }}>BON POUR</div>
          <div style={{ fontFamily: F.display, fontSize: u(78), margin: `${u(4)} 0 ${u(2)}` }}>1</div>
          <div style={{ fontFamily: F.cond, fontWeight: 700, fontSize: u(22), letterSpacing: u(6), paddingLeft: u(6) }}>{word}</div>
          <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: u(11), letterSpacing: u(2), marginTop: u(10), opacity: 0.85 }}>
            N° {String(start + i).padStart(4, "0")}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  3. Carte des cocktails                                              */
/* ------------------------------------------------------------------ */

export function CocktailMenu() {
  const gold = "#d8b66a";
  const items: [string, string, string][] = [
    ["Old Fashioned", "bourbon, sucre, angostura", "12"],
    ["Negroni", "gin, campari, vermouth rouge", "11"],
    ["French 75", "gin, citron, champagne", "13"],
    ["Sidecar", "cognac, triple sec, citron", "12"],
    ["Spritz Maison", "aperol, prosecco, orange", "9"],
    ["Dry Martini", "gin, vermouth sec, olive", "12"],
  ];
  return (
    <div
      className="paper paper-dark edge-notch w-full h-full"
      style={{ ...paperBg("#1f4236", "#183a2f", "#10281f"), "--notch": u(24) } as CSSProperties}
    >
      <div className="absolute ink-worn" style={{ inset: u(13), border: `${u(2.5)} solid ${gold}` }} />
      <div className="absolute" style={{ inset: u(21), border: `${u(1)} solid ${gold}`, opacity: 0.6 }} />
      <div className="absolute inset-0 ink-worn flex flex-col" style={{ padding: `${u(42)} ${u(40)} ${u(38)}`, color: gold }}>
        <div className="text-center" style={{ lineHeight: 1 }}>
          <div style={{ fontFamily: F.cinzel, fontWeight: 700, fontSize: u(15), letterSpacing: u(7) }}>CARTE DES</div>
          <div style={{ fontFamily: F.script, fontSize: u(84), margin: `${u(2)} 0 ${u(4)}`, color: "#f1d99a" }}>Cocktails</div>
          <div style={{ fontFamily: F.cinzel, fontSize: u(14), letterSpacing: u(8), opacity: 0.9 }}>- ✦ -</div>
        </div>
        <ul className="m-0 flex flex-col justify-between p-0" style={{ listStyle: "none", flex: 1, marginTop: u(22) }}>
          {items.map(([name, desc, price]) => (
            <li key={name}>
              <div className="flex items-baseline" style={{ gap: u(8) }}>
                <span style={{ fontFamily: F.playfair, fontWeight: 700, fontSize: u(20), letterSpacing: u(1.5), textTransform: "uppercase", color: "#f1d99a", ...nowrap }}>
                  {name}
                </span>
                <span style={{ flex: 1, borderBottom: `${u(2)} dotted ${gold}`, opacity: 0.7, transform: `translateY(${u(-4)})` }} />
                <span style={{ fontFamily: F.playfair, fontWeight: 700, fontSize: u(20), color: "#f1d99a" }}>{price}</span>
              </div>
              <div style={{ fontFamily: F.playfair, fontStyle: "italic", fontSize: u(13.5), marginTop: u(3), opacity: 0.85 }}>{desc}</div>
            </li>
          ))}
        </ul>
        <div className="text-center" style={{ fontFamily: F.cond, fontWeight: 500, fontSize: u(12), letterSpacing: u(5), marginTop: u(14) }}>
          SERVICE JUSQU'À 2 H
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  4. Jeton de vestiaire                                               */
/* ------------------------------------------------------------------ */

export function CloakroomTag() {
  const navy = "#23375a";
  const red = "#b8352b";
  const brass = "#b99a52";
  const holeY = 44;
  return (
    <div
      className="paper w-full h-full"
      style={{
        ...paperBg("#f4ebd3", "#ebdfc0", "#d9c8a0"),
        clipPath: "polygon(16% 0, 84% 0, 100% 10%, 100% 100%, 0 100%, 0 10%)",
        WebkitMask: `radial-gradient(circle at 50% ${u(holeY)}, transparent ${u(14)}, #000 ${u(14.6)})`,
        mask: `radial-gradient(circle at 50% ${u(holeY)}, transparent ${u(14)}, #000 ${u(14.6)})`,
      } as CSSProperties}
    >
      <div
        className="absolute"
        style={{
          left: `calc(50% - ${u(19)})`,
          top: u(holeY - 19),
          width: u(38),
          height: u(38),
          borderRadius: "50%",
          border: `${u(5)} solid ${brass}`,
          boxShadow: `inset 0 0 ${u(3)} rgba(0,0,0,0.35)`,
          zIndex: 3,
        }}
      />
      <div
        className="absolute inset-0 flex flex-col items-center text-center ink-worn"
        style={{ padding: `${u(84)} ${u(22)} ${u(22)}`, color: navy, lineHeight: 1 }}
      >
        <div style={{ fontFamily: F.cond, fontWeight: 600, fontSize: u(19), letterSpacing: u(7), paddingLeft: u(7) }}>VESTIAIRE</div>
        <div style={{ width: "70%", height: u(2), background: navy, margin: `${u(8)} 0 ${u(2)}` }} />
        <div style={{ fontFamily: F.bebas, fontSize: u(158), lineHeight: 0.95, color: red, letterSpacing: u(2) }}>47</div>
        <div style={{ fontFamily: F.stat, fontSize: u(15), letterSpacing: u(4), marginTop: u(2) }}>OBJET : MANTEAU</div>
        <div style={{ fontFamily: F.type, fontSize: u(10.5), letterSpacing: u(1), marginTop: u(14), opacity: 0.85, lineHeight: 1.4 }}>
          PAS DE TICKET,
          <br />
          PAS DE MANTEAU.
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  5. L'addition                                                       */
/* ------------------------------------------------------------------ */

export function BarReceipt() {
  const ink = "#2b2622";
  const t: CSSProperties = { fontFamily: F.type, color: ink, fontSize: u(14.5), lineHeight: 1 };
  const row = (a: string, b: string, bold = false) => (
    <div className="flex justify-between" style={{ ...t, fontSize: u(bold ? 17 : 14.5), marginTop: u(9), ...nowrap }}>
      <span>{a}</span>
      <span>{b}</span>
    </div>
  );
  const dash = <div style={{ borderTop: `${u(2)} dashed ${ink}`, opacity: 0.6, margin: `${u(14)} 0 ${u(4)}` }} />;
  return (
    <div className="paper edge-zigzag-tb w-full h-full" style={{ ...paperBg("#f8f5ee", "#f1ede2", "#e6e0d1"), "--z": u(7) } as CSSProperties}>
      <div className="absolute inset-0 ink-worn" style={{ padding: `${u(34)} ${u(28)} ${u(34)}` }}>
        <div className="text-center" style={{ color: ink }}>
          <div style={{ fontFamily: F.display, fontSize: u(46), lineHeight: 1 }}>LE ZINC</div>
          <div style={{ ...t, fontSize: u(12.5), letterSpacing: u(3), marginTop: u(8) }}>BAR · BRASSERIE · DEPUIS 1932</div>
          <div style={{ ...t, fontSize: u(12), marginTop: u(8), opacity: 0.85 }}>12 RUE DES MARTYRS, PARIS 9E</div>
          <div style={{ ...t, fontSize: u(12), marginTop: u(6), opacity: 0.85 }}>TÉL. 01 42 85 00 00</div>
        </div>
        {dash}
        {row("TABLE 07", "COUVERTS 02")}
        {row("SERVEUR : MARCEL", "21:47")}
        {dash}
        {row("2 DEMI PRESSION", "7,00")}
        {row("1 OLD FASHIONED", "12,00")}
        {row("1 NEGRONI", "11,00")}
        {row("1 PLANCHE MIXTE", "16,50")}
        {row("2 CAFÉ", "4,80")}
        {dash}
        {row("TOTAL EUR", "51,30", true)}
        {row("ESPÈCES", "60,00")}
        {row("RENDU", "8,70")}
        {dash}
        <div className="text-center" style={{ ...t, fontSize: u(13.5), lineHeight: 1.5, marginTop: u(12) }}>
          MERCI DE VOTRE VISITE
          <br />À TRÈS VITE !
        </div>
        <div style={{ height: u(46), marginTop: u(14), color: ink }}>
          <Barcode seed={4718} bars={54} />
        </div>
        <div className="text-center" style={{ ...t, fontSize: u(11), letterSpacing: u(4), marginTop: u(6) }}>0004718</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  6. Carte d'accès du speakeasy (personnalisable)                     */
/* ------------------------------------------------------------------ */

export interface SpeakeasyProps {
  personnalisation?: Record<string, string>;
  venue?: string;
  motto?: string;
  holder?: string;
  number?: string;
  until?: string;
}

export function SpeakeasyCard({
  personnalisation = {},
  venue = "LA CAVE N° 7",
  motto = "Frappez trois fois",
  holder = "Mme Élise Marchand",
  number = "0007",
  until = "31 DÉC.",
}: SpeakeasyProps) {
  venue = personnalisation.venue ?? venue;
  motto = personnalisation.motto ?? motto;
  holder = personnalisation.holder ?? holder;
  number = personnalisation.number ?? number;
  until = personnalisation.until ?? until;
  const gold = "#d9b866";
  return (
    <div
      className="paper paper-dark edge-notch w-full h-full"
      style={{ ...paperBg("#211e22", "#161417", "#0d0b0e"), "--notch": u(20) } as CSSProperties}
    >
      <div className="absolute ink-worn" style={{ inset: u(11), border: `${u(2.5)} solid ${gold}` }} />
      <div className="absolute" style={{ inset: u(18), border: `${u(1)} solid ${gold}`, opacity: 0.55 }} />
      <div className="absolute inset-0 grid ink-worn" style={{ gridTemplateColumns: "0.27fr minmax(0, 1fr)", padding: `${u(32)} ${u(30)}`, color: gold }}>
        <div className="flex flex-col items-center justify-center" style={{ borderRight: `${u(1.5)} solid rgba(217,184,102,0.5)`, paddingRight: u(10) }}>
          <svg aria-hidden="true" viewBox="0 0 80 110" style={{ width: u(80), height: u(110) }}>
            <circle cx="40" cy="55" r="36" fill="none" stroke={gold} strokeWidth="2.5" />
            <circle cx="40" cy="55" r="30" fill="none" stroke={gold} strokeWidth="1" />
            <circle cx="40" cy="45" r="9" fill={gold} />
            <path d="M33 52 L47 52 L51 80 L29 80 Z" fill={gold} />
          </svg>
        </div>
        <div className="flex flex-col justify-between" style={{ paddingLeft: u(20), lineHeight: 1, minWidth: 0 }}>
          <div>
            <div style={{ fontFamily: F.cinzel, fontWeight: 700, fontSize: u(13), letterSpacing: u(4.5), ...nowrap }}>LE MOT DE PASSE</div>
            <div style={{ fontFamily: F.script, fontSize: u(fit(motto, 48, 12)), color: "#f1d99a", marginTop: u(8), lineHeight: 1.05, ...nowrap }}>
              {motto}
            </div>
          </div>
          <div style={{ height: u(1.5), background: gold, opacity: 0.6 }} />
          <div>
            <div style={{ fontFamily: F.cond, fontWeight: 600, fontSize: u(10.5), letterSpacing: u(3), ...clip }}>
              CARTE D'ACCÈS · {venue}
            </div>
            <div style={{ fontFamily: F.playfair, fontStyle: "italic", fontSize: u(fit(holder, 22, 20)), color: "#f1d99a", marginTop: u(10), ...clip }}>
              {holder}
            </div>
            <div className="flex justify-between" style={{ fontFamily: F.mono, fontWeight: 700, fontSize: u(11), letterSpacing: u(1.5), marginTop: u(12), opacity: 0.85 , gap: u(8) }}>
              <span style={{ flex: "none" }}>N° {number}</span>
              <span style={{ ...clip, minWidth: 0 }}>JUSQU'AU {until}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  7. Happy hour                                                       */
/* ------------------------------------------------------------------ */

export function HappyHourTicket() {
  const ink = "#3b1d0e";
  return (
    <div
      className="paper w-full h-full grid"
      style={{ ...paperBg("#f9cf63", "#f1b63d", "#e29a2a"), ...perfMask(["80%"], u(14)), gridTemplateColumns: "80fr 20fr" } as CSSProperties}
    >
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 rays"
          style={
            {
              "--rx": "20%",
              "--ry": "50%",
              "--rc": "rgba(255,255,255,0.3)",
              WebkitMaskImage: "radial-gradient(circle at 20% 50%, #000, transparent 60%)",
              maskImage: "radial-gradient(circle at 20% 50%, #000, transparent 60%)",
            } as CSSProperties
          }
        />
        <svg aria-hidden="true" viewBox="0 0 100 130" className="absolute ink-worn" style={{ left: u(24), top: u(48), width: u(122), height: u(160) }}>
          <path d="M6 10H94L50 68Z" fill={ink} />
          <path d="M16 15H84L50 60Z" fill="#f6d36a" opacity="0.85" />
          <path d="M47 68H53V110H47Z" fill={ink} />
          <path d="M24 116Q50 104 76 116V122H24Z" fill={ink} />
          <circle cx="68" cy="30" r="7" fill="#5f8a3a" />
          <path d="M60 6 L74 36" stroke={ink} strokeWidth="2.5" />
        </svg>
        <div className="absolute ink-worn" style={{ left: u(178), top: u(22), color: ink, lineHeight: 0.9 }}>
          <div style={{ fontFamily: F.display, fontSize: u(80), ...nowrap }}>HAPPY</div>
          <div style={{ fontFamily: F.display, fontSize: u(80), ...nowrap }}>HOUR</div>
          <div style={{ fontFamily: F.bebas, fontSize: u(56), letterSpacing: u(4), marginTop: u(6), color: "#b8352b", ...nowrap }}>
            18H – 20H
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center ink-worn" style={{ borderLeft: `${u(2.5)} dashed ${ink}`, color: ink, lineHeight: 1 }}>
        <span className="vtext-up" style={{ fontFamily: F.bebas, fontSize: u(46), letterSpacing: u(4), ...nowrap }}>2 POUR 1</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  8. Pochette d'allumettes                                            */
/* ------------------------------------------------------------------ */

export function Matchbook() {
  const cream = "#f6e9cd";
  return (
    <div className="paper w-full h-full" style={{ ...paperBg("#cf4034", "#b73126", "#98241c"), borderRadius: u(6) }}>
      {/* flap */}
      <div className="absolute left-0 right-0 top-0" style={{ height: u(78), background: "linear-gradient(180deg,rgba(0,0,0,0.25),rgba(0,0,0,0.06))", borderBottom: `${u(2)} solid rgba(0,0,0,0.35)` }} />
      <div className="absolute flex" style={{ left: "50%", top: u(10), transform: "translateX(-50%)", gap: u(60) }}>
        {[0, 1].map((i) => (
          <span key={i} style={{ width: u(20), height: u(7), background: "linear-gradient(180deg,#e9e6df,#9c9a94)", borderRadius: u(1) }} />
        ))}
      </div>
      <div className="absolute inset-0 flex flex-col items-center ink-worn" style={{ padding: `${u(30)} ${u(12)} 0`, color: cream, lineHeight: 1 }}>
        <div style={{ fontFamily: F.cond, fontWeight: 600, fontSize: u(11), letterSpacing: u(5), marginTop: u(12), paddingLeft: u(5) }}>BAR · BRASSERIE</div>
        <div style={{ fontFamily: F.display, fontSize: u(40), marginTop: u(36), ...nowrap }}>LE ZINC</div>
        <svg aria-hidden="true" viewBox="0 0 100 100" style={{ width: u(58), height: u(58), marginTop: u(10) }}>
          <path d="M50 4C60 24 80 36 80 60C80 78 66 92 50 92C34 92 20 78 20 60C20 46 30 40 34 28C38 38 44 40 46 30C47 22 48 12 50 4Z" fill="#f6a63a" />
          <path d="M50 44C56 56 66 62 66 74C66 84 59 90 50 90C41 90 34 84 34 74C34 66 40 62 42 54C45 60 48 58 48 52Z" fill="#fff1c0" />
        </svg>
      </div>
      {/* striker */}
      <div
        className="absolute left-0 right-0 bottom-0 flex items-center justify-center"
        style={{
          height: u(52),
          background: `repeating-linear-gradient(90deg,#3a2a22 0 ${u(2)},#2a1d17 ${u(2)} ${u(4)})`,
          borderTop: `${u(2)} solid rgba(0,0,0,0.4)`,
          borderRadius: `0 0 ${u(6)} ${u(6)}`,
        }}
      >
        <span style={{ fontFamily: F.stat, fontSize: u(14), letterSpacing: u(5), color: "rgba(246,233,205,0.7)" }}>FROTTER ICI</span>
      </div>
    </div>
  );
}
