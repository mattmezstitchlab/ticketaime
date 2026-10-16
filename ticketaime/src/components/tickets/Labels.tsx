import type { CSSProperties } from "react";
import { u } from "../../lib/units";
import { Plane, Postmark, Rules } from "../primitives";

/* ------------------------------------------------------------------ */
/*  Blank label with orange frame and blue rules                       */
/* ------------------------------------------------------------------ */

export function OrangeFrameLabel() {
  const orange = "#d8673b";
  const blue = "#4f7ba8";
  return (
    <div
      className="paper paper-ivory w-full h-full edge-notch"
      style={{ "--notch": u(12), borderRadius: u(6) } as CSSProperties}
    >
      <div className="absolute" style={{ inset: u(9), border: `${u(3)} solid ${orange}`, borderRadius: u(4), opacity: 0.92 }} />
      <div className="absolute" style={{ inset: u(16), border: `${u(1)} solid ${orange}`, opacity: 0.8 }} />
      <div className="absolute flex items-center" style={{ inset: u(34) }}>
        <Rules count={5} gap={26} color={blue} thickness={1.4} className="w-full" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  USPS-style eagle logo                                              */
/* ------------------------------------------------------------------ */

function EagleMark({ size, color = "#2e5aa6" }: { size: number; color?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" style={{ width: u(size), height: u(size) }}>
      <rect width="100" height="100" fill={color} />
      <path
        d="M14 62c10-18 26-30 44-34 8-2 16 0 24 6l-10 2 8 6-12-1c-10 6-24 10-36 14 10 0 20-2 30-6-8 8-20 14-34 16l-14-3z"
        fill="#f3eee2"
      />
      <path d="M16 70h40v3H16zM16 78h30v3H16z" fill="#f3eee2" opacity="0.9" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Small airmail "PAR AVION" pass with eagle & stamp                  */
/* ------------------------------------------------------------------ */

export function AirmailEaglePass() {
  const red = "#c33f36";
  return (
    <div className="airmail w-full h-full edge-soft" style={{ padding: u(11), "--stripe": u(10) } as CSSProperties}>
      <div className="paper paper-ivory w-full h-full relative" style={{ padding: `${u(14)} ${u(16)} ${u(12)}` }}>
        <EagleMark size={60} />
        {/* Postage stamp */}
        <div
          className="absolute edge-perf"
          style={{
            right: u(28),
            top: u(16),
            width: u(50),
            height: u(62),
            background: "linear-gradient(160deg,#d9655a,#b53a34)",
            "--perf": u(6),
          } as CSSProperties}
        >
          <div className="absolute" style={{ inset: u(7), border: `${u(1)} solid rgba(255,240,230,0.8)` }} />
          <Plane color="rgba(255,240,230,0.9)" className="absolute" style={{ width: u(26), left: u(12), top: u(16), transform: "rotate(30deg)" }} />
        </div>
        <Postmark
          id="eaglepass"
          size={64}
          color="#2a2622"
          top="NEW YORK"
          center={["1962"]}
          className="absolute"
          style={{ right: u(2), top: u(44), opacity: 0.55, transform: "rotate(-12deg)" }}
          stroke={2.5}
        />
        <div
          className="flex justify-between ink-worn"
          style={{
            marginTop: u(22),
            fontFamily: "var(--font-condensed)",
            fontWeight: 600,
            fontSize: u(20),
            letterSpacing: u(6),
            color: red,
            lineHeight: 1,
            paddingRight: u(10),
          }}
        >
          <span>PAR</span>
          <span>AVION</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Pink grungy "COURRIER" label                                       */
/* ------------------------------------------------------------------ */

export function MailLabelPink() {
  const red = "#c7433a";
  return (
    <div
      className="airmail w-full h-full edge-soft"
      style={{ padding: u(10), "--stripe": u(9), "--am-blue": "#c7433a", "--am-paper": "#efe3dd" } as CSSProperties}
    >
      <div
        className="paper paper-blush paper-heavy-age w-full h-full relative"
        style={{ backgroundImage: "linear-gradient(160deg,#efe1dc,#e6d1cb 60%,#dcc2bb)" }}
      >
        <div className="absolute ink-worn" style={{ inset: u(10), border: `${u(1.8)} solid ${red}` }}>
          <div className="absolute" style={{ left: 0, right: 0, top: "58%", height: u(1.6), background: red }} />
          <div className="absolute" style={{ left: "32%", top: 0, bottom: 0, width: u(1.6), background: red, opacity: 0.8 }} />
        </div>
        <Postmark
          id="mailpink1"
          size={96}
          color="#4b4440"
          top="NEW YORK · N.Y."
          bottom="PAR AVION"
          center={["4 MAI", "1957"]}
          className="absolute"
          style={{ left: u(10), top: u(16), opacity: 0.5, transform: "rotate(-8deg)" }}
          stroke={2.5}
        />
        <Postmark
          id="mailpink2"
          size={78}
          color="#4b4440"
          top="PREMIER VOL"
          center={["AM"]}
          className="absolute"
          style={{ left: u(48), top: u(80), opacity: 0.35, transform: "rotate(12deg)" }}
          stroke={2.5}
        />
        <div
          className="absolute text-right ink-worn"
          style={{
            right: u(20),
            top: u(16),
            fontFamily: "var(--font-condensed)",
            fontWeight: 600,
            fontSize: u(14),
            letterSpacing: u(1.5),
            lineHeight: 1.1,
            color: red,
          }}
        >
          PAR
          <br />
          AVION
        </div>
        <div
          className="absolute ink-worn"
          style={{
            right: u(22),
            top: u(78),
            fontFamily: "var(--font-condensed)",
            fontWeight: 700,
            fontSize: u(50),
            letterSpacing: u(1.5),
            lineHeight: 1,
            color: red,
          }}
        >
          COURRIER
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Small airmail label - "VIA / PAR AVION"                            */
/* ------------------------------------------------------------------ */

export function AirmailSmallLabel() {
  const blue = "#3d6aa5";
  const red = "#c7433a";
  return (
    <div className="airmail w-full h-full edge-soft" style={{ padding: u(12), "--stripe": u(11) } as CSSProperties}>
      <div className="paper paper-white w-full h-full relative" style={{ padding: `${u(14)} ${u(16)}` }}>
        <div className="absolute" style={{ inset: u(10), right: u(44), border: `${u(1)} solid ${blue}`, opacity: 0.5 }} />
        <div
          style={{
            fontFamily: "var(--font-condensed)",
            fontWeight: 500,
            fontSize: u(17),
            letterSpacing: u(2),
            color: blue,
            lineHeight: 1,
            paddingLeft: u(8),
            paddingTop: u(4),
          }}
        >
          VIA
        </div>
        <Rules
          count={3}
          gap={22}
          color={blue}
          thickness={1.2}
          style={{ marginTop: u(18), marginLeft: u(8), marginRight: u(56) }}
        />
        <span
          className="vtext-up absolute"
          style={{
            right: u(14),
            top: u(10),
            bottom: u(10),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-condensed)",
            fontWeight: 500,
            fontSize: u(16),
            letterSpacing: u(2),
            color: red,
          }}
        >
          PAR AVION
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Large airmail address label                                        */
/* ------------------------------------------------------------------ */

export function AirmailLargeLabel() {
  const red = "#c7433a";
  return (
    <div className="airmail w-full h-full edge-soft" style={{ padding: u(14), "--stripe": u(13) } as CSSProperties}>
      <div className="paper paper-white w-full h-full relative">
        <div
          className="absolute flex items-center"
          style={{
            left: u(96),
            right: u(96),
            top: u(16),
            bottom: u(16),
            border: `${u(1.6)} solid ${red}`,
            borderRadius: u(8),
            padding: `0 ${u(26)}`,
          }}
        >
          <Rules count={3} gap={30} color={red} thickness={1.4} className="w-full" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Small red "COURRIER" pass                                          */
/* ------------------------------------------------------------------ */

export function MailPassSmall() {
  const red = "#c33f36";
  const tiny: CSSProperties = {
    fontFamily: "var(--font-condensed)",
    fontWeight: 500,
    fontSize: u(10),
    letterSpacing: u(2.5),
    color: "#4a403a",
    lineHeight: 1,
    display: "flex",
    justifyContent: "space-between",
  };
  return (
    <div className="airmail w-full h-full edge-soft" style={{ padding: u(10), "--stripe": u(9) } as CSSProperties}>
      <div
        className="paper paper-ivory paper-heavy-age w-full h-full relative flex flex-col"
        style={{ padding: `${u(10)} ${u(12)} ${u(8)}` }}
      >
        <div style={{ ...tiny, padding: `0 ${u(4)}` }}>
          <span>D·VU·T</span>
          <span>MRO</span>
          <span>LOLS·DIS</span>
        </div>
        <div
          className="relative flex items-center ink-worn"
          style={{
            flex: 1,
            margin: `${u(8)} 0`,
            background: "linear-gradient(165deg,#d7463c,#b9352d)",
            borderRadius: u(3),
            padding: `0 ${u(10)} 0 ${u(12)}`,
            boxShadow: `inset 0 0 0 ${u(2)} rgba(255,235,225,0.35)`,
          }}
        >
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width: u(48),
              height: u(48),
              borderRadius: "50%",
              background: "#2d4f8f",
              border: `${u(2)} solid #e8e0d2`,
            }}
          >
            <Plane color="#eee6d8" style={{ width: u(26), transform: "rotate(35deg)" }} />
          </div>
          <div
            style={{
              fontFamily: "var(--font-condensed)",
              fontWeight: 700,
              fontSize: u(37),
              letterSpacing: u(1),
              color: "#f6efe2",
              lineHeight: 1,
              marginLeft: u(8),
              textShadow: `0 ${u(1)} 0 rgba(80,10,10,0.5)`,
            }}
          >
            COURRIER
          </div>
        </div>
        <div style={{ ...tiny, color: red, padding: `0 ${u(6)}` }}>
          <span>351</span>
          <span>PASSE</span>
          <span>55</span>
        </div>
      </div>
    </div>
  );
}
