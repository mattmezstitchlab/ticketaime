import type { CSSProperties } from "react";
import { u } from "../../lib/units";
import { F } from "../../lib/fonts";
import { useUid } from "../../lib/useUid";
import { BLUE, CornerStars, Guilloche, INK, RED, Rule, Serial, SmallLabel, stock } from "./ArchiveCommon";

export function TradeCard() {
  const uid = useUid("trade");
  return (
    <div className="paper edge-soft h-full w-full" style={{ ...stock.cream, color: "#573b24" }}>
      <div className="absolute ink-worn" style={{ inset: u(9), border: `${u(3)} double #573b24`, padding: `${u(12)} ${u(16)}` }}><div className="grid h-full items-center" style={{ gridTemplateColumns: "0.8fr 1.2fr" }}><svg viewBox="0 0 150 150" aria-hidden="true" style={{ width: "100%", height: "100%" }}><defs><radialGradient id={uid}><stop offset="0" stopColor="#efd260"/><stop offset="1" stopColor="#c84e3f"/></radialGradient></defs>{Array.from({ length: 10 }).map((_, i) => { const a=i*Math.PI*2/10; return <ellipse key={i} cx={75+Math.cos(a)*32} cy={75+Math.sin(a)*32} rx="17" ry="36" transform={`rotate(${i*36+90} ${75+Math.cos(a)*32} ${75+Math.sin(a)*32})`} fill={`url(#${uid})`} opacity=".9"/>})}<circle cx="75" cy="75" r="23" fill="#774a24"/></svg><div className="text-center" style={{ lineHeight: 1 }}><SmallLabel>Maison fondée en 1864</SmallLabel><div style={{ fontFamily: F.display, fontSize: u(34), margin: `${u(5)} 0` }}>Aux Fleurs</div><div style={{ fontFamily: F.cond, fontWeight: 700, fontSize: u(20), letterSpacing: u(2) }}>SOIERIES · RUBANS</div><Rule style={{ margin: `${u(8)} 0` }}/><div style={{ fontFamily: F.type, fontSize: u(9.5), lineHeight: 1.5 }}>28 RUE DU SENTIER<br/>PARIS</div></div></div></div>
    </div>
  );
}

export function SeedPacket() {
  const green = "#35613d";
  return (
    <div className="paper h-full w-full" style={{ ...stock.kraft, color: green, clipPath: "polygon(4% 0,96% 0,100% 4%,100% 96%,96% 100%,4% 100%,0 96%,0 4%)" }}>
      <div className="absolute ink-worn" style={{ inset: u(10), border: `${u(3)} solid ${green}`, textAlign: "center", padding: `${u(15)} ${u(14)}` }}><SmallLabel>Graines sélectionnées</SmallLabel><div style={{ fontFamily: F.western, fontSize: u(27), margin: `${u(6)} 0` }}>Maison Vilmorin</div><svg viewBox="0 0 150 140" aria-hidden="true" style={{ width: u(140), height: u(130) }}><path d="M75 132V60M74 90Q47 61 27 78Q43 105 74 101M76 81Q102 55 127 73Q111 101 76 94" stroke={green} strokeWidth="5" fill="none"/><circle cx="75" cy="39" r="23" fill="#d44a3d"/>{Array.from({length:8}).map((_,i)=><ellipse key={i} cx="75" cy="39" rx="12" ry="31" fill="#e36750" transform={`rotate(${i*45} 75 39)`}/>) }<circle cx="75" cy="39" r="12" fill="#e6b541"/></svg><div style={{ fontFamily: F.bebas, fontSize: u(31), letterSpacing: u(3), color: RED }}>ZINNIA GÉANT</div><div style={{ fontFamily: F.type, fontSize: u(9), marginTop: u(6) }}>SEMIS MARS–MAI · 5 GRAMMES</div></div>
    </div>
  );
}

export function ApothecaryLabel() {
  const green = "#315a47";
  return (
    <div className="paper edge-notch h-full w-full" style={{ ...stock.cream, "--notch": u(17), color: green } as CSSProperties}>
      <Guilloche color={green} opacity={0.1}/><CornerStars color={green}/><div className="absolute ink-worn" style={{ inset: u(10), border: `${u(4)} double ${green}`, padding: `${u(18)} ${u(24)}`, textAlign: "center" }}><SmallLabel>Pharmacie du Progrès</SmallLabel><div style={{ fontFamily: F.display, fontSize: u(42), margin: `${u(5)} 0`, lineHeight: 1 }}>Élixir Tonique</div><div style={{ fontFamily: F.cinzel, fontWeight: 700, fontSize: u(12), letterSpacing: u(4) }}>AU QUINQUINA</div><Rule color={green} style={{ margin: `${u(9)} 0` }}/><div style={{ fontFamily: F.type, fontSize: u(10), lineHeight: 1.5 }}>UNE CUILLERÉE AVANT CHAQUE REPAS<br/>FLACON 125 ML · PARIS</div></div>
    </div>
  );
}

export function CigarBand() {
  const gold = "#c79b3d";
  const burgundy = "#711f2b";
  return (
    <div className="paper h-full w-full" style={{ ...stock.cream, color: burgundy, clipPath: "polygon(0 25%,34% 25%,39% 0,61% 0,66% 25%,100% 25%,96% 75%,66% 75%,61% 100%,39% 100%,34% 75%,4% 75%)" }}>
      <div className="absolute left-0 right-0 top-1/4 bottom-1/4" style={{ background: burgundy }}/><div className="absolute ink-worn rounded-full" style={{ left: "50%", top: "50%", width: u(150), height: u(150), transform: "translate(-50%,-50%)", background: gold, border: `${u(5)} double ${burgundy}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}><span style={{ fontFamily: F.script, fontSize: u(34), lineHeight: 1 }}>Don Carlos</span><SmallLabel style={{ color: burgundy }}>Habana · Especiales</SmallLabel><span style={{ fontSize: u(21), marginTop: u(3) }}>★</span></div><div className="absolute left-[calc(12*var(--u))] top-1/2 -translate-y-1/2" style={{ fontFamily: F.cinzel, fontSize: u(13), letterSpacing: u(5), color: gold }}>PURO</div><div className="absolute right-[calc(12*var(--u))] top-1/2 -translate-y-1/2" style={{ fontFamily: F.cinzel, fontSize: u(13), letterSpacing: u(5), color: gold }}>FINO</div>
    </div>
  );
}

export function SoapWrapper() {
  const navy = "#244263";
  return (
    <div className="paper h-full w-full" style={{ ...stock.blue, color: navy }}>
      <div className="absolute ink-worn" style={{ inset: u(9), border: `${u(5)} double ${navy}`, textAlign: "center", padding: `${u(14)} ${u(18)}` }}><div style={{ fontFamily: F.script, fontSize: u(28), lineHeight: 1 }}>Savonnerie de Marseille</div><div style={{ fontFamily: F.display, fontSize: u(58), lineHeight: 1, margin: `${u(4)} 0` }}>LE CYGNE</div><svg viewBox="0 0 120 80" aria-hidden="true" style={{ width: u(105), height: u(70) }}><path d="M22 58Q28 33 55 39Q50 15 68 10Q63 34 81 40Q101 47 99 62Q76 55 59 66Q42 75 22 58Z" fill={navy}/><path d="M6 72Q31 65 56 72T106 72" stroke={navy} strokeWidth="3" fill="none"/></svg><div style={{ fontFamily: F.cinzel, fontSize: u(11), letterSpacing: u(4) }}>PUR VÉGÉTAL · 200 G</div></div>
    </div>
  );
}

export function PerfumeLabel() {
  const gold = "#a98137";
  return (
    <div className="paper edge-notch h-full w-full" style={{ ...stock.pink, "--notch": u(20), color: gold } as CSSProperties}>
      <Guilloche color={gold} opacity={0.13}/><div className="absolute ink-worn" style={{ inset: u(11), border: `${u(4)} double ${gold}`, padding: `${u(22)} ${u(20)}`, textAlign: "center" }}><div style={{ fontFamily: F.script, fontSize: u(61), lineHeight: 1 }}>Étoile</div><div style={{ fontFamily: F.cinzel, fontSize: u(15), letterSpacing: u(7), marginTop: u(5) }}>DE PARIS</div><div style={{ fontSize: u(28), margin: `${u(10)} 0` }}>✦</div><Rule color={gold} style={{ margin: `${u(8)} 0` }}/><SmallLabel>Extrait de parfum<br/>Maison Léonie · Paris</SmallLabel></div>
    </div>
  );
}

export function MilkBottleCap() {
  return (
    <div className="paper h-full w-full" style={{ ...stock.cream, borderRadius: "50%", color: BLUE }}>
      <div className="absolute ink-worn rounded-full" style={{ inset: u(8), border: `${u(5)} double ${BLUE}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}><SmallLabel>Laiterie de la Vallée</SmallLabel><svg viewBox="0 0 90 90" aria-hidden="true" style={{ width: u(82), height: u(82), margin: `${u(4)} 0` }}><path d="M28 16H62L66 30V76H24V30Z" fill="none" stroke={BLUE} strokeWidth="5"/><path d="M28 31H66M34 16V7H56V16" stroke={BLUE} strokeWidth="4"/><path d="M34 55Q45 43 56 55Q45 67 34 55Z" fill={BLUE}/></svg><div style={{ fontFamily: F.bebas, fontSize: u(26), letterSpacing: u(3) }}>LAIT ENTIER</div><Serial style={{ marginTop: u(4) }}>1 LITRE · PASTEURISÉ</Serial></div>
    </div>
  );
}

export function BusinessCard() {
  return (
    <div className="paper edge-soft h-full w-full" style={{ ...stock.white, color: INK }}>
      <div className="absolute ink-worn" style={{ inset: u(9), border: `${u(2)} solid ${INK}`, padding: `${u(15)} ${u(20)}`, textAlign: "center" }}><div style={{ fontFamily: F.cinzel, fontWeight: 700, fontSize: u(18), letterSpacing: u(3) }}>AUGUSTE MOREAU</div><Rule style={{ margin: `${u(8)} auto`, width: "60%" }}/><div style={{ fontFamily: F.playfair, fontStyle: "italic", fontSize: u(16) }}>Imprimeur · Lithographe</div><div style={{ fontFamily: F.type, fontSize: u(10), letterSpacing: u(1.7), lineHeight: 1.5, marginTop: u(9) }}>TRAVAUX DE LUXE · AFFICHES · ÉTIQUETTES<br/>14 RUE DU CROISSANT, PARIS · TÉL. 208-17</div><div className="mt-[calc(8*var(--u))] flex justify-center gap-[calc(22*var(--u))]"><Serial>DEPUIS 1894</Serial><Serial>DEVIS GRATUIT</Serial></div></div>
    </div>
  );
}