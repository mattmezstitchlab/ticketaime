import type { CSSProperties, ReactNode } from "react";
import { u } from "../../lib/units";
import { Barcode, Postmark } from "../primitives";

/* ------------------------------------------------------------------ */
/*  Small helpers                                                      */
/* ------------------------------------------------------------------ */

const INK_KRAFT = "#3a2d1b";
const INK_TYPE = "#2b2622";
const INK_NAVY = "#1d3b66";

interface FieldProps {
  label: string;
  value?: ReactNode;
  labelSize?: number;
  valueSize?: number;
  font?: string;
  color?: string;
  gap?: number;
  align?: "left" | "center" | "right";
  style?: CSSProperties;
  className?: string;
  tracking?: number;
}

function Field({
  label,
  value,
  labelSize = 15,
  valueSize = 36,
  font = "var(--font-condensed)",
  color = INK_KRAFT,
  gap = 2,
  align = "left",
  style,
  className,
  tracking = 1,
}: FieldProps) {
  return (
    <div
      className={className}
      style={{ color, textAlign: align, fontFamily: font, lineHeight: 1, ...style }}
    >
      <div
        style={{
          fontSize: u(labelSize),
          fontWeight: 600,
          letterSpacing: u(tracking),
          marginBottom: u(gap),
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      {value !== undefined && (
        <div style={{ fontSize: u(valueSize), fontWeight: 600, letterSpacing: u(0.5) }}>{value}</div>
      )}
    </div>
  );
}

const rule = (color: string, h = 2): CSSProperties => ({ height: u(h), background: color });

/* ------------------------------------------------------------------ */
/*  1. Kraft boarding pass - Gate 3 / New York → Paris                 */
/* ------------------------------------------------------------------ */

export function KraftBoardingPass({ personnalisation = {} }: { personnalisation?: Record<string, string> }) {
  const ink = INK_KRAFT;
  const border = `${u(2.5)} solid ${ink}`;
  return (
    <div className="paper paper-kraft edge-soft w-full h-full" style={{ padding: `${u(22)} ${u(26)}` }}>
      <h2
        className="text-center uppercase ink-worn"
        style={{
          fontFamily: "var(--font-condensed)",
          fontWeight: 600,
          fontSize: u(34),
          letterSpacing: u(4),
          color: ink,
          lineHeight: 1,
          margin: `0 0 ${u(14)}`,
        }}
      >
        Carte d'embarquement
      </h2>
      <div className="ink-worn" style={{ borderTop: border, borderBottom: border }}>
        {/* Row 1 */}
        <div
          className="grid"
          style={{ gridTemplateColumns: "104fr 132fr 124fr 144fr", borderBottom: border }}
        >
          {[
            ["Porte", personnalisation.porte ?? "3"],
            ["Date", personnalisation.date ?? "18 Sept"],
            ["Heure", personnalisation.heure ?? "10h30"],
            ["Vol", personnalisation.vol ?? "AB815"],
          ].map(([l, v], i) => (
            <Field
              key={l}
              label={l}
              value={v}
              align="center"
              valueSize={32}
              labelSize={15}
              style={{
                padding: `${u(8)} ${u(4)} ${u(10)}`,
                borderLeft: i === 0 ? "none" : border,
                whiteSpace: "nowrap",
              }}
            />
          ))}
        </div>
        {/* Row 2 */}
        <div className="grid" style={{ gridTemplateColumns: "104fr 400fr" }}>
          <Field
            label="Siège"
            value={personnalisation.siege ?? "A22"}
            align="center"
            valueSize={34}
            style={{ padding: `${u(10)} ${u(4)} ${u(12)}` }}
          />
          <div
            style={{
              borderLeft: border,
              padding: `${u(10)} ${u(14)} ${u(10)} ${u(14)}`,
              color: ink,
              fontFamily: "var(--font-condensed)",
              fontWeight: 600,
              lineHeight: 1,
            }}
          >
            <div className="flex items-end justify-between" style={{ marginBottom: u(6) }}>
              <span style={{ fontSize: u(15), letterSpacing: u(1), paddingBottom: u(6) }}>DE</span>
              <span style={{ fontSize: u(36), letterSpacing: u(1), marginRight: u(44) }}>{personnalisation.depart ?? "NEW YORK"}</span>
            </div>
            <div className="flex items-end justify-between">
              <span style={{ fontSize: u(15), letterSpacing: u(1), paddingBottom: u(6) }}>À</span>
              <span style={{ fontSize: u(36), letterSpacing: u(1), marginRight: u(78) }}>{personnalisation.destination ?? "PARIS"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  2. Rose typewriter boarding pass - Vol 304 → Paris                 */
/* ------------------------------------------------------------------ */

export function RoseTypewriterPass() {
  const ink = INK_TYPE;
  const type: CSSProperties = { fontFamily: "var(--font-type)", color: ink, lineHeight: 1 };
  const label: CSSProperties = { ...type, fontSize: u(13), letterSpacing: u(2) };
  const value: CSSProperties = { ...type, fontSize: u(27), letterSpacing: u(1.5), marginTop: u(8) };
  return (
    <div
      className="paper paper-rose edge-soft w-full h-full relative"
      style={{ padding: `${u(36)} ${u(30)} ${u(24)} ${u(30)}` }}
    >
      <div style={{ width: u(425) }}>
        <h2
          className="uppercase ink-worn"
          style={{ ...type, fontSize: u(26), letterSpacing: u(3.5), margin: 0, fontWeight: 400, whiteSpace: "nowrap" }}
        >
          Carte d'embarquement
        </h2>

        <div style={{ ...rule(ink, 2), marginTop: u(18), opacity: 0.85 }} />
        <div style={{ padding: `${u(8)} 0 ${u(8)}` }}>
          <div style={label}>NOM</div>
        </div>
        <div style={{ ...rule(ink, 1.5), opacity: 0.8 }} />

        <div className="grid" style={{ gridTemplateColumns: "1fr 1.3fr", padding: `${u(10)} 0 ${u(8)}` }}>
          <div>
            <div style={label}>VOL</div>
            <div style={value}>304</div>
          </div>
          <div>
            <div style={label}>DESTINATION</div>
            <div style={value}>PARIS</div>
          </div>
        </div>
        <div style={{ ...rule(ink, 1.5), opacity: 0.8 }} />

        <div
          className="grid"
          style={{ gridTemplateColumns: "1fr 1.1fr 0.6fr", padding: `${u(10)} 0 ${u(8)}` }}
        >
          <div>
            <div style={label}>DATE</div>
            <div style={value}>13 SEPT</div>
          </div>
          <div>
            <div style={label}>EMBARQUEMENT</div>
            <div style={value}>8H00</div>
          </div>
          <div>
            <div style={label}>PORTE</div>
            <div style={value}>A5</div>
          </div>
        </div>
        <div style={{ ...rule(ink, 1.5), opacity: 0.8 }} />
        <div className="flex justify-end" style={{ padding: `${u(10)} ${u(30)} 0 0` }}>
          <div style={label}>
            SIÈGE <span style={{ marginLeft: u(26) }}>12</span>
          </div>
        </div>
      </div>

      {/* Vertical barcode */}
      <div
        className="absolute"
        style={{ right: u(42), top: u(70), width: u(62), height: u(210), color: ink }}
      >
        <Barcode seed={304} bars={54} vertical />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  3. Cream typewriter boarding pass - Edwards / Susan                */
/* ------------------------------------------------------------------ */

export function CreamTypewriterPass() {
  const ink = INK_TYPE;
  const type: CSSProperties = { fontFamily: "var(--font-type)", color: ink, lineHeight: 1 };
  const label: CSSProperties = { ...type, fontSize: u(13), letterSpacing: u(2.5) };
  const value: CSSProperties = { ...type, fontSize: u(25), letterSpacing: u(1.5), marginTop: u(9) };
  const row: CSSProperties = { marginTop: u(22) };
  return (
    <div className="paper paper-ivory edge-soft w-full h-full relative" style={{ color: ink }}>
      <h2
        className="uppercase ink-worn"
        style={{
          ...type,
          fontSize: u(22),
          letterSpacing: u(3),
          fontWeight: 400,
          margin: 0,
          whiteSpace: "nowrap",
          padding: `${u(30)} ${u(34)} 0`,
        }}
      >
        Carte d'embarquement
      </h2>
      <div className="tear-line" style={{ margin: `${u(22)} ${u(14)} 0` }} />

      <div style={{ padding: `${u(26)} ${u(44)} 0` }}>
        <div>
          <div style={label}>NOM</div>
          <div style={value}>EDWARDS / SUSAN</div>
        </div>
        <div className="grid" style={{ ...row, gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <div style={label}>DE</div>
            <div style={value}>NEW YORK</div>
          </div>
          <div>
            <div style={label}>À</div>
            <div style={value}>LONDRES</div>
          </div>
        </div>
        <div className="grid" style={{ ...row, gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <div style={label}>VOL</div>
            <div style={value}>WZ 456</div>
          </div>
          <div>
            <div style={label}>DATE</div>
            <div style={value}>10 AOÛT</div>
          </div>
        </div>
        <div className="grid" style={{ ...row, gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <div style={label}>HEURE</div>
            <div style={value}>20H15</div>
          </div>
          <div>
            <div style={label}>PORTE</div>
            <div style={value}>B12</div>
          </div>
        </div>
        <div className="grid" style={{ ...row, gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <div style={label}>SIÈGE</div>
            <div style={value}>22A</div>
          </div>
          <div>
            <div style={label}>SIÈGE</div>
          </div>
        </div>
        <div style={{ ...label, fontSize: u(15), letterSpacing: u(2.5), marginTop: u(26) }}>
          EMBARQUEMENT : 19H45
        </div>
      </div>

      <div className="tear-line" style={{ margin: `${u(26)} ${u(14)} 0` }} />
      <div
        className="absolute"
        style={{ left: u(44), right: u(44), bottom: u(22), height: u(38), color: ink }}
      >
        <Barcode seed={456} bars={70} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  4. Tall kraft boarding pass - Los Angeles → New York               */
/* ------------------------------------------------------------------ */

export function TallKraftPass() {
  const ink = "#43331d";
  const border = `${u(2.5)} solid ${ink}`;
  const cond: CSSProperties = {
    fontFamily: "var(--font-condensed)",
    fontWeight: 600,
    color: ink,
    lineHeight: 1,
  };
  return (
    <div
      className="paper paper-kraft-dark paper-heavy-age edge-soft w-full h-full"
      style={{ padding: `${u(26)} ${u(30)} ${u(26)}` }}
    >
      <h2
        className="uppercase ink-worn"
        style={{ ...cond, fontSize: u(30), letterSpacing: u(3.2), margin: `0 0 ${u(14)}`, whiteSpace: "nowrap" }}
      >
        Carte d'embarquement
      </h2>
      <div className="ink-worn">
        <div style={{ borderTop: border, borderBottom: border }}>
          <div className="grid" style={{ gridTemplateColumns: "118fr 130fr 122fr" }}>
            {[
              ["Porte", "B7"],
              ["Vol", "0849"],
              ["Siège", "21A"],
            ].map(([l, v], i) => (
              <Field
                key={l}
                label={l}
                value={v}
                color={ink}
                labelSize={15}
                valueSize={40}
                align={i === 0 ? "left" : "center"}
                style={{
                  padding: `${u(10)} ${u(6)} ${u(12)}`,
                  borderLeft: i === 0 ? "none" : border,
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ padding: `${u(22)} 0 ${u(12)}` }}>
          <div style={{ ...cond, fontSize: u(15), letterSpacing: u(1.2) }}>DE</div>
          <div style={{ ...cond, fontSize: u(47), letterSpacing: u(0.5), marginTop: u(8) }}>LOS ANGELES</div>
          <div style={{ ...cond, fontSize: u(15), letterSpacing: u(1.2), marginTop: u(18) }}>À</div>
          <div style={{ ...cond, fontSize: u(47), letterSpacing: u(0.5), marginTop: u(8) }}>NEW YORK</div>
        </div>

        <div style={{ borderTop: border, paddingTop: u(18) }}>
          <div
            style={{
              fontFamily: "var(--font-mono-vintage)",
              fontWeight: 700,
              color: ink,
              fontSize: u(30),
              letterSpacing: u(4),
              lineHeight: 1,
            }}
          >
            1234667890
          </div>
          <div style={{ height: u(168), marginTop: u(24), color: ink }}>
            <Barcode seed={849} bars={66} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  5. Trans Air airmail boarding pass - Paris → New York              */
/* ------------------------------------------------------------------ */

export function TransAirPass() {
  const ink = INK_NAVY;
  const border = `${u(2.5)} solid ${ink}`;
  const cond: CSSProperties = {
    fontFamily: "var(--font-condensed)",
    fontWeight: 600,
    color: ink,
    lineHeight: 1,
  };
  const label: CSSProperties = { ...cond, fontSize: u(14), letterSpacing: u(1) };
  const big: CSSProperties = { ...cond, fontSize: u(54), letterSpacing: u(0.5) };

  return (
    <div className="airmail w-full h-full edge-soft" style={{ padding: u(14), "--stripe": u(12) } as CSSProperties}>
      <div
        className="paper paper-kraft paper-heavy-age w-full h-full relative"
        style={{ padding: `${u(22)} ${u(22)} ${u(20)}`, backgroundImage: "linear-gradient(165deg,#ead9b3,#dcc496 55%,#cdb17e)" }}
      >
        {/* Logo */}
        <div
          className="flex items-center justify-end ink-worn"
          style={{ gap: u(4), color: "#b8372e", fontFamily: "var(--font-condensed)", fontWeight: 700 }}
        >
          <span style={{ fontSize: u(19), letterSpacing: u(0.5), transform: "skewX(-10deg)", display: "inline-block" }}>
            TRANS
          </span>
          <span
            className="inline-flex items-center"
            style={{ fontSize: u(19), transform: "skewX(-14deg)", gap: u(2) }}
          >
            <svg viewBox="0 0 40 16" style={{ width: u(30), height: u(12) }} fill="#b8372e" aria-hidden="true">
              <path d="M0 8h30l-6-6h4l10 6-10 6h-4l6-6H0z" />
            </svg>
            AIR
          </span>
        </div>

        <h2
          className="uppercase ink-worn"
          style={{ ...cond, fontSize: u(29), letterSpacing: u(2.2), margin: `${u(6)} 0 ${u(14)}`, whiteSpace: "nowrap" }}
        >
          Carte d'embarquement
        </h2>

        <div className="ink-worn">
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", borderTop: border, borderBottom: border }}>
            <div style={{ padding: `${u(10)} 0 ${u(10)}` }}>
              <div style={label}>PORTE</div>
              <div style={{ ...big, marginTop: u(6) }}>B 12</div>
            </div>
            <div style={{ padding: `${u(10)} 0 ${u(10)} ${u(16)}`, borderLeft: border }}>
              <div style={label}>SIÈGE</div>
              <div style={{ ...big, marginTop: u(6) }}>C 5</div>
            </div>
          </div>

          <div style={{ padding: `${u(12)} 0 ${u(10)}`, borderBottom: border }}>
            <div style={label}>DE</div>
            <div className="flex items-end" style={{ gap: u(36) }}>
              <span style={{ ...big, marginTop: u(2), marginLeft: u(148) }}>PARIS</span>
            </div>
          </div>

          <div style={{ padding: `${u(12)} 0 ${u(10)}`, borderBottom: border }}>
            <div style={label}>À</div>
            <div style={{ ...big, marginTop: u(-16), marginLeft: u(108) }}>NEW YORK</div>
          </div>

          <div className="grid" style={{ gridTemplateColumns: "1fr 1.15fr", borderBottom: border }}>
            <div style={{ padding: `${u(10)} 0 ${u(8)}` }}>
              <div style={label}>VOL</div>
              <div style={{ ...cond, fontSize: u(40), marginTop: u(6) }}>TA 907</div>
            </div>
            <div style={{ padding: `${u(10)} 0 ${u(8)} ${u(14)}`, borderLeft: border }}>
              <div style={label}>EMBARQUEMENT</div>
              <div style={{ ...cond, fontSize: u(40), marginTop: u(6) }}>
                10:20<span style={{ fontSize: u(22) }}>H</span>
              </div>
            </div>
          </div>

          <div style={{ ...label, fontSize: u(22), letterSpacing: u(0.5), marginTop: u(12) }}>EMBARQUEMENT</div>
        </div>

        {/* Red postmark */}
        <Postmark
          id="transair"
          size={112}
          color="#c2473f"
          top="NEW YORK · JFK"
          bottom="U.S.A."
          center={["12 SEPT", "1965"]}
          className="absolute"
          style={{ right: u(2), bottom: u(2), transform: "rotate(-14deg)", opacity: 0.82 }}
        />
      </div>
    </div>
  );
}
