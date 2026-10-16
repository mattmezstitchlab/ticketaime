import type { CSSProperties } from "react";
import { u } from "../../lib/units";
import { F } from "../../lib/fonts";
import { perfMask } from "../../lib/masks";
import { Barcode } from "../primitives";
import { BLUE, Dots, GREEN, Guilloche, INK, RED, Rule, Serial, SmallLabel, stock } from "./ArchiveCommon";

export function PawnTicket() {
  return (
    <div className="paper paper-heavy-age edge-notch h-full w-full" style={{ ...stock.yellow, "--notch": u(14), color: INK } as CSSProperties}>
      <Guilloche color={RED} opacity={0.11}/>
      <div className="absolute ink-worn" style={{ inset: u(9), border: `${u(3)} double ${INK}`, padding: `${u(14)} ${u(18)}` }}>
        <div className="flex justify-between"><SmallLabel>Mont-de-Piété Municipal</SmallLabel><Serial>N° 17042</Serial></div>
        <div style={{ fontFamily: F.bebas, fontSize: u(43), letterSpacing: u(3), textAlign: "center", margin: `${u(8)} 0` }}>RECONNAISSANCE</div>
        <Rule/>
        <div className="mt-[calc(9*var(--u))] grid grid-cols-2 gap-y-[calc(8*var(--u))]" style={{ fontFamily: F.type, fontSize: u(11) }}><span>OBJET<br/><b>MONTRE OR</b></span><span>PRÊT<br/><b>250 F</b></span><span>DATE<br/><b>14 MARS 1936</b></span><span>INTÉRÊT<br/><b>4 %</b></span></div>
        <div className="mt-[calc(12*var(--u))] text-center" style={{ fontFamily: F.type, fontSize: u(9), letterSpacing: u(1) }}>À PRÉSENTER POUR RETRAIT DE L'OBJET</div>
      </div>
    </div>
  );
}

export function LaundryClaim() {
  return (
    <div className="paper h-full w-full" style={{ ...stock.blue, ...perfMask(["33.33%", "66.66%"], u(10)), color: BLUE } as CSSProperties}>
      <div className="grid h-full grid-cols-3 ink-worn">
        {["CLIENT", "ATELIER", "LIVRAISON"].map((name, i) => <div key={name} className="flex flex-col items-center justify-center text-center" style={{ borderLeft: i ? `${u(2)} dashed ${BLUE}` : "none", padding: u(10) }}><SmallLabel>Blanchisserie<br/>du Lys</SmallLabel><div style={{ fontFamily: F.bebas, fontSize: u(54), margin: `${u(6)} 0`, lineHeight: 1 }}>128</div><SmallLabel>{name}</SmallLabel><Serial style={{ marginTop: u(7), fontSize: u(8.5) }}>MARDI · 18H</Serial></div>)}
      </div>
    </div>
  );
}

export function ShoeRepairTag() {
  const brown = "#704526";
  return (
    <div className="paper h-full w-full" style={{ ...stock.kraft, color: brown, clipPath: "polygon(14% 0,86% 0,100% 10%,100% 100%,0 100%,0 10%)" }}>
      <div className="absolute ink-worn" style={{ inset: u(10), border: `${u(2)} solid ${brown}`, padding: `${u(22)} ${u(16)}`, textAlign: "center" }}>
        <div className="mx-auto rounded-full" style={{ width: u(18), height: u(18), border: `${u(3)} solid ${brown}`, marginTop: u(-17), marginBottom: u(10) }}/>
        <svg viewBox="0 0 150 85" aria-hidden="true" style={{ width: "100%", height: u(92) }}><path d="M14 42Q38 33 52 10H77Q80 43 124 52Q139 56 134 69Q129 79 113 79H25Q9 77 10 63Z" fill="none" stroke={brown} strokeWidth="7"/><path d="M29 61H125" stroke={brown} strokeWidth="4"/></svg>
        <div style={{ fontFamily: F.western, fontSize: u(24), lineHeight: 1 }}>CORDONNERIE</div>
        <div style={{ fontFamily: F.bebas, fontSize: u(60), lineHeight: 1, margin: `${u(7)} 0` }}>64</div>
        <SmallLabel>Ressemelage · vendredi</SmallLabel>
      </div>
    </div>
  );
}

export function PhotoBoothStrip() {
  const faces = [0, 1, 2, 3];
  return (
    <div className="paper paper-dark h-full w-full" style={{ ...stock.dark, padding: u(8), color: "#e7e4dd" }}>
      <div className="grid h-full grid-rows-4 gap-[calc(6*var(--u))]">
        {faces.map((i) => <div key={i} className="relative overflow-hidden" style={{ background: `linear-gradient(140deg,#b9b8b4,#757671)`, border: `${u(1)} solid #ddd` }}><div className="absolute rounded-full" style={{ width: u(50), height: u(61), left: "50%", top: u(8 + (i % 2) * 2), transform: "translateX(-50%)", background: "#d5d2c9", boxShadow: `inset 0 ${u(12)} 0 #4a4947` }}/><div className="absolute" style={{ width: u(88), height: u(65), left: "50%", bottom: u(-30), transform: "translateX(-50%)", borderRadius: "50% 50% 0 0", background: i % 2 ? "#454646" : "#60615e" }}/><span className="absolute" style={{ right: u(5), bottom: u(4), fontFamily: F.mono, fontSize: u(7), opacity: 0.75 }}>0{i + 1}</span></div>)}
      </div>
    </div>
  );
}

export function ParcelReceipt() {
  return (
    <div className="paper edge-zigzag-b h-full w-full" style={{ ...stock.white, "--z": u(7), color: INK } as CSSProperties}>
      <div className="absolute inset-0 ink-worn" style={{ padding: `${u(18)} ${u(18)} ${u(24)}` }}>
        <div className="text-center"><SmallLabel>Messageries nationales</SmallLabel><div style={{ fontFamily: F.bebas, fontSize: u(35), letterSpacing: u(4), marginTop: u(5) }}>RÉCÉPISSÉ COLIS</div></div>
        <Rule style={{ margin: `${u(9)} 0` }}/>
        {["EXPÉDITEUR  ·  L. MOREL", "DESTINATAIRE  ·  J. RENAUD", "PARIS → LYON", "POIDS  ·  4,750 KG"].map((r) => <div key={r} style={{ fontFamily: F.type, fontSize: u(10.5), lineHeight: 1.75 }}>{r}</div>)}
        <Rule style={{ margin: `${u(9)} 0` }}/>
        <div className="flex justify-between"><Serial>PAYÉ 12,80 F</Serial><Serial>28·VII·57</Serial></div>
        <div style={{ height: u(43), color: INK, marginTop: u(10) }}><Barcode seed={8057} bars={42}/></div>
      </div>
    </div>
  );
}

export function BarberAppointment() {
  const stripe = `repeating-linear-gradient(-45deg, ${RED} 0 ${u(8)}, #f4ead4 ${u(8)} ${u(16)}, ${BLUE} ${u(16)} ${u(24)}, #f4ead4 ${u(24)} ${u(32)})`;
  return (
    <div className="paper edge-soft h-full w-full" style={{ ...stock.cream, color: INK }}>
      <div className="absolute left-0 top-0 bottom-0" style={{ width: u(17), background: stripe }}/><div className="absolute right-0 top-0 bottom-0" style={{ width: u(17), background: stripe }}/>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center ink-worn" style={{ padding: `${u(18)} ${u(30)}` }}>
        <SmallLabel>Salon Marcel</SmallLabel><div style={{ fontFamily: F.script, fontSize: u(46), lineHeight: 1, margin: `${u(5)} 0` }}>Coiffeur</div><div style={{ fontFamily: F.type, fontSize: u(11), lineHeight: 1.6 }}>RENDEZ-VOUS<br/><b>JEUDI 16 · 14 H 30</b><br/>COUPE &amp; BARBE</div><Rule style={{ width: "80%", margin: `${u(9)} 0` }}/><Serial>CARTE N° 039</Serial>
      </div>
    </div>
  );
}

export function RepairOrder() {
  const fields = ["APPAREIL : RADIO SUPER 6", "PANNE : AUCUN SON", "PIÈCES : LAMPE 6V6", "MAIN-D'ŒUVRE : 2 H", "TOTAL : 42,00 F"];
  return (
    <div className="paper edge-notch h-full w-full" style={{ ...stock.green, "--notch": u(13), color: GREEN } as CSSProperties}>
      <div className="absolute inset-0 ink-worn" style={{ padding: `${u(17)} ${u(19)}` }}>
        <div className="flex justify-between"><SmallLabel>Électricité Moderne</SmallLabel><Serial>O.R. 00814</Serial></div><div style={{ fontFamily: F.bebas, fontSize: u(34), letterSpacing: u(3), margin: `${u(7)} 0` }}>ORDRE DE RÉPARATION</div>
        {fields.map((f) => <div key={f} style={{ borderTop: `${u(1)} solid rgba(52,96,68,0.45)`, padding: `${u(7)} 0`, fontFamily: F.type, fontSize: u(10.5) }}>{f}</div>)}
        <div className="mt-[calc(8*var(--u))] flex items-center"><SmallLabel>Signature</SmallLabel><Dots color={GREEN}/></div>
      </div>
    </div>
  );
}

export function ValetParkingClaim() {
  return (
    <div className="paper h-full w-full" style={{ ...stock.pink, ...perfMask(["72%"], u(12)), color: "#652d3e" } as CSSProperties}>
      <div className="grid h-full ink-worn" style={{ gridTemplateColumns: "72fr 28fr" }}>
        <div className="flex items-center" style={{ padding: `${u(16)} ${u(20)}` }}><svg viewBox="0 0 150 80" aria-hidden="true" style={{ width: u(135), height: u(80), flex: "none" }}><path d="M8 55Q9 43 24 40L39 22Q45 16 56 16H96Q105 16 112 24L124 40Q141 42 142 55V67H8Z" fill="none" stroke="#652d3e" strokeWidth="6"/><circle cx="38" cy="66" r="11" fill="#652d3e"/><circle cx="112" cy="66" r="11" fill="#652d3e"/></svg><div style={{ marginLeft: u(10), lineHeight: 1 }}><SmallLabel>Garage Central</SmallLabel><div style={{ fontFamily: F.bebas, fontSize: u(39), margin: `${u(5)} 0` }}>VOITURIER</div><Serial>SIMCA · 5127 RX</Serial></div></div>
        <div className="flex flex-col items-center justify-center" style={{ borderLeft: `${u(2)} dashed #652d3e` }}><SmallLabel>N°</SmallLabel><div style={{ fontFamily: F.bebas, fontSize: u(64) }}>86</div><SmallLabel>À remettre</SmallLabel></div>
      </div>
    </div>
  );
}