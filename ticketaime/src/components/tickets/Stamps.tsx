import type { CSSProperties } from "react";
import { u } from "../../lib/units";
import { Plane, Postmark, Rules } from "../primitives";

/* ------------------------------------------------------------------ */
/*  Circular seal with text on a path + plane                           */
/* ------------------------------------------------------------------ */

interface SealProps {
  id: string;
  size: number;
  color: string;
  text: string;
  style?: CSSProperties;
  scalloped?: boolean;
}

function Seal({ id, size, color, text, style, scalloped = true }: SealProps) {
  const scallops = Array.from({ length: 36 }, (_, i) => {
    const a = (i / 36) * Math.PI * 2;
    return { cx: 50 + Math.cos(a) * 46, cy: 50 + Math.sin(a) * 46 };
  });
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className="ink-worn"
      style={{ width: u(size), height: u(size), ...style }}
    >
      <defs>
        <path id={`${id}-ring`} d="M50 50 m-37.5 0 a37.5 37.5 0 1 1 75 0 a37.5 37.5 0 1 1 -75 0" />
      </defs>
      {scalloped &&
        scallops.map((p, i) => <circle key={i} cx={p.cx} cy={p.cy} r={3.4} fill="none" stroke={color} strokeWidth={1.4} />)}
      <circle cx="50" cy="50" r="43" fill="none" stroke={color} strokeWidth={1.6} />
      <circle cx="50" cy="50" r="31" fill="none" stroke={color} strokeWidth={1.2} />
      <text
        fill={color}
        fontSize="8.6"
        fontFamily="Oswald, sans-serif"
        fontWeight="600"
        letterSpacing="1.4"
      >
        <textPath href={`#${id}-ring`} startOffset="0">
          {text}
        </textPath>
      </text>
      <g transform="translate(50 50) rotate(42) translate(-24 -24) scale(0.48)">
        <Plane color={color} />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Rose perforated stamp - "BILLET 1"                                 */
/* ------------------------------------------------------------------ */

export function RoseStamp() {
  const rose = "#b94a62";
  const col: CSSProperties = {
    fontFamily: "var(--font-condensed)",
    fontWeight: 600,
    fontSize: u(17),
    letterSpacing: u(2.5),
    color: rose,
    display: "flex",
    gap: u(6),
    justifyContent: "center",
  };
  return (
    <div className="paper paper-blush edge-perf w-full h-full" style={{ "--perf": u(10) } as CSSProperties}>
      <div
        className="absolute grid ink-worn"
        style={{
          inset: u(17),
          border: `${u(1.8)} solid ${rose}`,
          gridTemplateColumns: `${u(46)} 1fr ${u(46)}`,
        }}
      >
        <div className="flex items-center" style={{ borderRight: `${u(1.8)} solid ${rose}` }}>
          <div className="vtext-up" style={col}>
            <span>BILLET 1</span>
            <span>BILLET 1</span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Seal id="rose" size={118} color={rose} text="COMPAGNIE AÉRIENNE · PASSAGER · SERVICE POSTAL · 1948 · " />
        </div>
        <div className="flex items-center" style={{ borderLeft: `${u(1.8)} solid ${rose}` }}>
          <div className="vtext" style={col}>
            <span>BILLET 1</span>
            <span>BILLET 1</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Red plane admission ticket - "CCS AIA / 2007"                      */
/* ------------------------------------------------------------------ */

export function RedPlaneTicket() {
  const red = "#c2403a";
  const teal = "#3f6f66";
  return (
    <div className="paper paper-cream edge-notch w-full h-full" style={{ "--notch": u(12) } as CSSProperties}>
      <div
        className="absolute ink-worn"
        style={{ inset: u(10), border: `${u(1.5)} solid ${red}`, boxShadow: `inset 0 0 0 ${u(3)} transparent, inset 0 0 0 ${u(4.5)} ${red}00` }}
      >
        <div className="absolute" style={{ inset: u(4), border: `${u(1.2)} solid ${red}` }} />
        <div
          className="grid h-full"
          style={{ gridTemplateColumns: `${u(48)} 1fr ${u(50)}`, padding: u(4) }}
        >
          <div className="flex items-center justify-center" style={{ borderRight: `${u(1.2)} solid ${red}` }}>
            <span
              className="vtext-up"
              style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 600,
                fontSize: u(18),
                letterSpacing: u(2),
                color: red,
              }}
            >
              CCS AIA
            </span>
          </div>
          <div className="flex items-center justify-center">
            <Seal id="redplane" size={122} color={red} text="SERVICE AÉRIEN · RIO DE JANEIRO · PARIS · " />
          </div>
          <div className="flex items-center justify-center" style={{ borderLeft: `${u(1.2)} solid ${red}` }}>
            <div
              className="flex items-center justify-center ink-worn"
              style={{
                width: u(32),
                height: u(108),
                border: `${u(2)} solid ${teal}`,
                boxShadow: `inset 0 0 0 ${u(2)} #f3ecd9, inset 0 0 0 ${u(3.2)} ${teal}`,
                borderRadius: u(3),
              }}
            >
              <span
                className="vtext"
                style={{
                  fontFamily: "var(--font-western)",
                  fontSize: u(17),
                  letterSpacing: u(3),
                  color: teal,
                }}
              >
                2007
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Blank numbered ticket                                              */
/* ------------------------------------------------------------------ */

export function BlankNumberedTicket() {
  const red = "#c54a3f";
  const ink = "#3a3028";
  return (
    <div className="paper paper-cream edge-notch w-full h-full" style={{ "--notch": u(14) } as CSSProperties}>
      <div className="absolute" style={{ inset: u(9), border: `${u(1.4)} solid ${red}`, opacity: 0.9 }} />
      <div
        className="absolute grid ink-worn"
        style={{
          inset: u(14),
          gridTemplateColumns: `${u(54)} 1fr ${u(54)}`,
        }}
      >
        <div
          className="flex items-center justify-center"
          style={{ borderRight: `${u(1.4)} solid ${red}` }}
        >
          <span
            className="vtext-up"
            style={{
              fontFamily: "var(--font-condensed)",
              fontWeight: 500,
              fontSize: u(16),
              letterSpacing: u(2),
              color: red,
            }}
          >
            N° 0710011 SS
          </span>
        </div>
        <div className="flex items-center" style={{ padding: `0 ${u(26)}` }}>
          <Rules count={3} gap={32} color={red} thickness={1.4} className="w-full" />
        </div>
        <div className="flex items-center justify-center" style={{ borderLeft: `${u(1.4)} solid ${red}` }}>
          <span
            className="vtext"
            style={{
              fontFamily: "var(--font-condensed)",
              fontWeight: 500,
              fontSize: u(16),
              letterSpacing: u(2),
              color: ink,
            }}
          >
            T8C00X7KGHT
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Explorer - black letterpress ticket                                */
/* ------------------------------------------------------------------ */

export function ExploreTicket() {
  const ink = "#1b1a18";
  const heavy: CSSProperties = { fontFamily: "var(--font-heavy)", color: ink, lineHeight: 1 };
  return (
    <div
      className="paper paper-grey edge-notch w-full h-full"
      style={{ "--notch": u(18), borderRadius: u(10) } as CSSProperties}
    >
      <div
        className="absolute ink-worn"
        style={{ inset: u(9), border: `${u(4)} solid ${ink}`, borderRadius: u(6) }}
      >
        <div
          className="grid h-full"
          style={{ gridTemplateColumns: `${u(44)} 1fr ${u(44)}` }}
        >
          <div className="flex items-center justify-center" style={{ borderRight: `${u(3)} solid ${ink}` }}>
            <span className="vtext-up" style={{ ...heavy, fontSize: u(30), letterSpacing: u(3) }}>
              38503
            </span>
          </div>
          <div className="flex flex-col items-center justify-center" style={{ padding: `${u(10)} ${u(8)}` }}>
            <div className="flex items-center justify-between w-full" style={{ ...heavy, fontSize: u(15), letterSpacing: u(3) }}>
              <span>BONS</span>
              <span style={{ fontSize: u(34) }}>★</span>
              <span>VENTS</span>
            </div>
            <div style={{ ...heavy, fontSize: u(60), letterSpacing: u(3), marginTop: u(-6) }}>EXPLORER</div>
            <div className="flex items-center" style={{ ...heavy, gap: u(10), fontSize: u(16), marginTop: u(-2) }}>
              <span>★</span>
              <span>★</span>
              <span style={{ fontSize: u(22) }}>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            <div
              className="flex justify-between w-full"
              style={{ ...heavy, fontSize: u(14), letterSpacing: u(2), marginTop: u(8), padding: `0 ${u(14)}` }}
            >
              <span>BILLET</span>
              <span>VISA</span>
              <span>DÉPART</span>
            </div>
          </div>
          <div className="flex items-center justify-center" style={{ borderLeft: `${u(3)} solid ${ink}` }}>
            <span className="vtext" style={{ ...heavy, fontSize: u(30), letterSpacing: u(3) }}>
              10760
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Blue engraved postage stamp - "240705 · BILLET"                    */
/* ------------------------------------------------------------------ */

export function BlueStamp() {
  const blue = "#2c2b6a";
  return (
    <div className="paper paper-white edge-perf w-full h-full" style={{ "--perf": u(12) } as CSSProperties}>
      <div className="absolute" style={{ inset: u(16), border: `${u(2)} solid ${blue}`, opacity: 0.9 }} />
      <div
        className="absolute ink-worn"
        style={{ inset: u(22), border: `${u(1.2)} solid ${blue}` }}
      >
        <div className="relative h-full w-full overflow-hidden">
          {/* Serial */}
          <span
            className="vtext-up absolute"
            style={{
              left: u(10),
              top: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              fontFamily: "var(--font-condensed)",
              fontWeight: 600,
              fontSize: u(26),
              letterSpacing: u(3),
              color: blue,
            }}
          >
            240705
          </span>
          {/* Plane */}
          <Plane
            variant="prop"
            color={blue}
            className="absolute ink-worn"
            style={{ width: u(200), left: u(52), top: u(8), transform: "rotate(-38deg)" }}
          />
          {/* Postmark */}
          <Postmark
            id="bluestamp"
            size={130}
            color={blue}
            top="PARIS · AÉROPOSTALE"
            bottom="PAR AVION"
            center={["7·IV", "1951"]}
            className="absolute"
            style={{ right: u(-14), top: u(-6), transform: "rotate(14deg)", opacity: 0.85 }}
          />
          {/* Caption */}
          <span
            className="absolute"
            style={{
              left: u(120),
              bottom: u(8),
              fontFamily: "var(--font-condensed)",
              fontWeight: 600,
              fontSize: u(17),
              letterSpacing: u(7),
              color: blue,
            }}
          >
            BILLET
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Arrivée - black & white admission ticket                           */
/* ------------------------------------------------------------------ */

export function ArrivalTicket() {
  const ink = "#1d1b19";
  const heavy: CSSProperties = { fontFamily: "var(--font-heavy)", color: ink, lineHeight: 1 };
  return (
    <div
      className="paper paper-grey paper-heavy-age edge-notch w-full h-full"
      style={{ "--notch": u(16), borderRadius: u(8) } as CSSProperties}
    >
      <div
        className="absolute ink-worn"
        style={{ inset: u(10), border: `${u(5)} solid ${ink}`, borderRadius: u(4) }}
      >
        <div className="absolute" style={{ inset: u(5), border: `${u(1.6)} solid ${ink}` }} />
        <div className="flex flex-col items-center justify-center h-full" style={{ padding: `${u(10)} 0` }}>
          <div className="flex items-center" style={{ ...heavy, fontSize: u(26), letterSpacing: u(5), gap: u(18) }}>
            <span style={{ fontSize: u(20) }}>★</span>
            <span>BILLET</span>
            <span style={{ fontSize: u(20) }}>★</span>
          </div>
          <div style={{ ...heavy, fontSize: u(70), letterSpacing: u(2), marginTop: u(-2) }}>ARRIVÉE</div>
          <div className="flex items-center" style={{ ...heavy, fontSize: u(26), letterSpacing: u(5), gap: u(18), marginTop: u(-2) }}>
            <span>D'ENTRÉE</span>
            <span style={{ fontSize: u(20) }}>★</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Retrait bagages - kraft ticket with red frame                      */
/* ------------------------------------------------------------------ */

export function BaggageClaimTicket() {
  const red = "#c6463c";
  const brown = "#3a2819";
  const colStyle: CSSProperties = {
    fontFamily: "var(--font-condensed)",
    fontWeight: 600,
    fontSize: u(26),
    letterSpacing: u(3),
    color: red,
  };
  return (
    <div
      className="paper paper-cream paper-heavy-age edge-notch w-full h-full"
      style={{
        "--notch": u(16),
        backgroundImage: "linear-gradient(160deg,#f3e9d6,#eadbc1 60%,#dcc9a6)",
      } as CSSProperties}
    >
      <div
        className="absolute ink-worn"
        style={{ inset: u(10), border: `${u(3)} solid ${red}` }}
      >
        <div className="absolute" style={{ inset: u(4), border: `${u(1)} solid ${red}` }} />
        <div className="grid h-full" style={{ gridTemplateColumns: `${u(50)} 1fr ${u(50)}` }}>
          <div className="flex items-center justify-center" style={{ borderRight: `${u(1.5)} dashed ${red}` }}>
            <span className="vtext-up" style={colStyle}>
              00ROL0T
            </span>
          </div>
          <div className="flex flex-col items-center justify-center" style={{ padding: `${u(8)} ${u(8)}` }}>
            <div
              style={{
                width: "70%",
                borderTop: `${u(1.5)} dashed ${red}`,
                marginBottom: u(10),
              }}
            />
            <div
              className="text-center"
              style={{
                fontFamily: "var(--font-western)",
                fontSize: u(46),
                lineHeight: 0.98,
                color: brown,
                textShadow: `${u(1.5)} ${u(1.5)} 0 rgba(255,250,235,0.6)`,
              }}
            >
              RETRAIT
              <br />
              BAGAGES
            </div>
            <div style={{ width: "70%", borderTop: `${u(1.5)} dashed ${red}`, marginTop: u(10) }} />
            <div
              style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 600,
                fontSize: u(14),
                letterSpacing: u(5),
                color: red,
                marginTop: u(6),
              }}
            >
              BILLET
            </div>
          </div>
          <div className="flex items-center justify-center" style={{ borderLeft: `${u(1.5)} dashed ${red}` }}>
            <span className="vtext" style={colStyle}>
              10W0Z8
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
