import type { CSSProperties } from "react";
import { u } from "../../lib/units";
import { F } from "../../lib/fonts";
import { perfMask } from "../../lib/masks";
import { BLUE, CornerStars, Dots, GREEN, INK, RED, Rule, Serial, SmallLabel, stock } from "./ArchiveCommon";

export function MuseumAdmission() {
  return (
    <div className="paper edge-notch h-full w-full" style={{ ...stock.cream, "--notch": u(14), color: "#68431d" } as CSSProperties}>
      <div className="absolute ink-worn" style={{ inset: u(10), border: `${u(3)} double #68431d`, padding: `${u(14)} ${u(18)}` }}>
        <div className="flex items-center justify-between"><SmallLabel>Musée des Antiquités</SmallLabel><Serial>07195</Serial></div>
        <div className="grid items-center" style={{ gridTemplateColumns: "0.75fr 1fr", marginTop: u(6) }}>
          <svg viewBox="0 0 100 115" aria-hidden="true" style={{ width: "100%", height: u(105) }}><path d="M50 4L80 20L72 105H28L20 20Z" fill="none" stroke="#68431d" strokeWidth="4"/><path d="M34 31Q50 19 66 31L63 50Q50 61 37 50Z" fill="#68431d"/><path d="M38 69H62M35 80H65M32 91H68" stroke="#68431d" strokeWidth="3"/></svg>
          <div style={{ textAlign: "center", lineHeight: 1 }}><div style={{ fontFamily: F.display, fontSize: u(35) }}>ENTRÉE</div><div style={{ fontFamily: F.cinzel, fontSize: u(13), letterSpacing: u(3), marginTop: u(6) }}>COLLECTIONS<br/>PERMANENTES</div><div style={{ fontFamily: F.bebas, fontSize: u(28), marginTop: u(8) }}>5 FRANCS</div></div>
        </div>
      </div>
    </div>
  );
}

export function WorldFairTicket() {
  const navy = "#193b62";
  const gold = "#d79532";
  return (
    <div className="paper h-full w-full" style={{ ...stock.blue, ...perfMask(["80%"], u(13)), color: navy } as CSSProperties}>
      <div className="grid h-full ink-worn" style={{ gridTemplateColumns: "80fr 20fr" }}>
        <div className="relative flex items-center" style={{ padding: `${u(15)} ${u(22)}` }}>
          <svg viewBox="0 0 90 130" aria-hidden="true" style={{ width: u(96), height: u(125), flex: "none" }}><path d="M45 4L54 28H49L57 51H51L63 116H27L39 51H33L41 28H36Z" fill={navy}/><path d="M10 116H80V124H10Z" fill={navy}/><circle cx="45" cy="45" r="8" fill={gold}/></svg>
          <div style={{ marginLeft: u(12), lineHeight: 1 }}><SmallLabel>Paris · 1937</SmallLabel><div style={{ fontFamily: F.deco, fontSize: u(31), color: navy, margin: `${u(5)} 0` }}>EXPOSITION</div><div style={{ fontFamily: F.bebas, fontSize: u(42), color: gold, letterSpacing: u(2) }}>UNIVERSELLE</div><SmallLabel>Un jour · toutes portes</SmallLabel></div>
        </div>
        <div className="flex flex-col items-center justify-center" style={{ borderLeft: `${u(2)} dashed ${navy}` }}><span className="vtext-up" style={{ fontFamily: F.stat, fontSize: u(18), letterSpacing: u(4) }}>N° 084715</span></div>
      </div>
    </div>
  );
}

export function RideCoupons() {
  const colors = ["#d34d42", "#2f7390", "#dd9c31", "#4a7750"];
  return (
    <div className="paper h-full w-full" style={{ ...stock.cream, ...perfMask(["25%", "50%", "75%"], u(9)) } as CSSProperties}>
      <div className="grid h-full grid-cols-4">
        {colors.map((c, i) => <div key={c} className="relative flex flex-col items-center justify-center text-center ink-worn" style={{ color: c, borderLeft: i ? `${u(2)} dashed ${c}` : "none" }}><span style={{ fontFamily: F.display, fontSize: u(48), lineHeight: 1 }}>{i + 1}</span><SmallLabel>Bon pour</SmallLabel><span style={{ fontFamily: F.bebas, fontSize: u(20), letterSpacing: u(2), marginTop: u(4) }}>UN TOUR</span><span style={{ fontSize: u(15), marginTop: u(4) }}>★</span></div>)}
      </div>
    </div>
  );
}

export function PoolTicket() {
  return (
    <div className="paper edge-notch h-full w-full" style={{ ...stock.blue, "--notch": u(13), color: BLUE } as CSSProperties}>
      <div className="absolute inset-0 ink-worn" style={{ padding: `${u(18)} ${u(20)}` }}>
        <div className="flex justify-between"><SmallLabel>Piscine municipale</SmallLabel><Serial>0412</Serial></div>
        <div className="mt-[calc(8*var(--u))] flex items-center gap-[calc(18*var(--u))]">
          <svg viewBox="0 0 150 90" aria-hidden="true" style={{ width: u(170), height: u(90) }}><circle cx="38" cy="23" r="10" fill={BLUE}/><path d="M48 38L76 52L100 34M76 52L50 66" stroke={BLUE} strokeWidth="10" fill="none" strokeLinecap="round"/><path d="M5 72Q28 61 51 72T97 72T143 72M5 84Q28 73 51 84T97 84T143 84" stroke={BLUE} strokeWidth="4" fill="none"/></svg>
          <div style={{ lineHeight: 1 }}><div style={{ fontFamily: F.bebas, fontSize: u(44), letterSpacing: u(2) }}>1 ENTRÉE</div><div style={{ fontFamily: F.type, fontSize: u(11), marginTop: u(8) }}>CABINE N° 18<br/>VALABLE CE JOUR</div></div>
        </div>
      </div>
    </div>
  );
}

export function SkatingTicket() {
  const plum = "#723c6d";
  return (
    <div className="paper edge-perf h-full w-full" style={{ ...stock.pink, "--perf": u(9), color: plum } as CSSProperties}>
      <CornerStars color={plum}/>
      <div className="absolute inset-0 flex items-center ink-worn" style={{ padding: `${u(18)} ${u(28)}` }}>
        <svg viewBox="0 0 140 110" aria-hidden="true" style={{ width: u(140), height: u(110) }}><path d="M18 62L36 27H87L111 61L91 78H32Z" fill="none" stroke={plum} strokeWidth="6"/><path d="M17 86H119" stroke={plum} strokeWidth="5"/><circle cx="34" cy="91" r="9" fill={plum}/><circle cx="65" cy="91" r="9" fill={plum}/><circle cx="96" cy="91" r="9" fill={plum}/><path d="M45 28L58 60M62 28L75 60" stroke={plum} strokeWidth="4"/></svg>
        <div className="text-center" style={{ lineHeight: 1, flex: 1 }}><SmallLabel>Palais de la Glisse</SmallLabel><div style={{ fontFamily: F.script, fontSize: u(50), margin: `${u(4)} 0` }}>Roller</div><div style={{ fontFamily: F.bebas, fontSize: u(28), letterSpacing: u(3) }}>APRÈS-MIDI</div><Serial style={{ display: "block", marginTop: u(8) }}>PATINS INCLUS · 0738</Serial></div>
      </div>
    </div>
  );
}

export function BoxingTicket() {
  return (
    <div className="paper paper-heavy-age h-full w-full" style={{ ...stock.kraft, ...perfMask(["78%"], u(13)), color: INK } as CSSProperties}>
      <div className="grid h-full ink-worn" style={{ gridTemplateColumns: "78fr 22fr" }}>
        <div style={{ padding: `${u(16)} ${u(22)}` }}><div className="flex justify-between"><SmallLabel>Palais des Sports</SmallLabel><SmallLabel>Samedi · 22 h</SmallLabel></div><div style={{ fontFamily: F.heavy, fontSize: u(45), lineHeight: 1, marginTop: u(8) }}>GRAND COMBAT</div><div className="mt-[calc(5*var(--u))] flex items-center" style={{ fontFamily: F.bebas, fontSize: u(27), letterSpacing: u(2) }}><span>MARTIN</span><span style={{ color: RED, margin: `0 ${u(14)}` }}>VS</span><span>RODRIGUEZ</span></div><Rule color={INK} style={{ margin: `${u(8)} 0` }}/><div className="flex justify-between"><SmallLabel>Tribune B</SmallLabel><SmallLabel>Rang 8 · Place 14</SmallLabel></div></div>
        <div className="flex flex-col items-center justify-center" style={{ borderLeft: `${u(2)} dashed ${INK}` }}><span className="vtext-up" style={{ fontFamily: F.stat, fontSize: u(20), letterSpacing: u(4) }}>ENTRÉE · 35 F</span></div>
      </div>
    </div>
  );
}

export function RaceBetSlip() {
  const rows = ["1  ÉTOILE BLEUE", "2  ROI DU VENT", "3  BELLE NUIT", "4  GRAND LARGE", "5  FAVORI"];
  return (
    <div className="paper edge-zigzag-b h-full w-full" style={{ ...stock.green, "--z": u(7), color: GREEN } as CSSProperties}>
      <div className="absolute inset-0 ink-worn" style={{ padding: `${u(18)} ${u(20)} ${u(22)}` }}>
        <div className="text-center"><SmallLabel>Hippodrome de Longchamp</SmallLabel><div style={{ fontFamily: F.bebas, fontSize: u(34), letterSpacing: u(3), marginTop: u(5) }}>PARI SIMPLE</div></div>
        <Rule style={{ margin: `${u(9)} 0` }}/>
        {rows.map((r, i) => <div key={r} className="flex items-center" style={{ fontFamily: F.mono, fontSize: u(10), lineHeight: 1.7, fontWeight: i === 2 ? 700 : 400 }}><span>{r}</span><Dots color={GREEN}/><span>{i === 2 ? "X" : "○"}</span></div>)}
        <Rule style={{ margin: `${u(9)} 0` }}/>
        <div className="flex justify-between"><Serial>COURSE 6</Serial><Serial>MISE 10 F</Serial><Serial>118027</Serial></div>
      </div>
    </div>
  );
}

export function StadiumTicket() {
  const orange = "#cb6233";
  return (
    <div className="paper edge-notch h-full w-full" style={{ ...stock.cream, "--notch": u(14), color: BLUE } as CSSProperties}>
      <div className="absolute ink-worn" style={{ inset: u(10), border: `${u(3)} solid ${BLUE}`, padding: `${u(13)} ${u(18)}` }}>
        <div className="flex justify-between"><SmallLabel>Stade Municipal</SmallLabel><Serial>08432</Serial></div>
        <div style={{ fontFamily: F.bebas, fontSize: u(43), letterSpacing: u(2), lineHeight: 1, margin: `${u(7)} 0`, color: orange }}>FINALE</div>
        <div style={{ fontFamily: F.cond, fontWeight: 700, fontSize: u(24), letterSpacing: u(1.5) }}>PARIS A.C. - OLYMPIQUE</div>
        <Rule color={BLUE} style={{ margin: `${u(9)} 0` }}/>
        <div className="grid grid-cols-3"><div><SmallLabel>Porte</SmallLabel><div style={{ fontFamily: F.bebas, fontSize: u(28) }}>D</div></div><div><SmallLabel>Rang</SmallLabel><div style={{ fontFamily: F.bebas, fontSize: u(28) }}>12</div></div><div><SmallLabel>Place</SmallLabel><div style={{ fontFamily: F.bebas, fontSize: u(28) }}>48</div></div></div>
      </div>
    </div>
  );
}