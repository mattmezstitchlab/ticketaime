import type { CSSProperties } from "react";
import { u } from "../../lib/units";
import { F } from "../../lib/fonts";
import { perfMask } from "../../lib/masks";
import { Barcode, Postmark, Rules } from "../primitives";
import { BLUE, Dots, INK, RED, Rule, Serial, SmallLabel, stock } from "./ArchiveCommon";

export function TelegramForm() {
  return (
    <div className="paper paper-heavy-age edge-soft h-full w-full" style={{ ...stock.cream, color: BLUE }}>
      <div className="absolute inset-0 ink-worn" style={{ padding: `${u(18)} ${u(24)}` }}>
        <div className="flex items-center justify-between"><div style={{ fontFamily: F.bebas, fontSize: u(38), letterSpacing: u(5) }}>TÉLÉGRAMME</div><Serial>PTT · 04819</Serial></div>
        <Rule color={BLUE} style={{ margin: `${u(8)} 0` }}/>
        <div style={{ fontFamily: F.type, color: INK, fontSize: u(12), lineHeight: 1.65 }}>ARRIVERAI GARE DU NORD<br/>VENDREDI DIX NEUF HEURES STOP<br/>ATTENDS-MOI SOUS HORLOGE STOP<br/>AFFECTUEUSEMENT JEAN</div>
        <Rule color={BLUE} style={{ margin: `${u(8)} 0` }}/>
        <div className="flex justify-between"><SmallLabel>Paris 42</SmallLabel><SmallLabel>18 mots</SmallLabel><SmallLabel>Reçu 16 h 08</SmallLabel></div>
      </div>
    </div>
  );
}

export function PicturePostcard() {
  return (
    <div className="paper edge-soft h-full w-full" style={{ ...stock.white, color: INK }}>
      <div className="absolute inset-0 grid" style={{ gridTemplateColumns: "1fr 1fr", padding: `${u(18)} ${u(20)}` }}>
        <div className="ink-worn" style={{ borderRight: `${u(1.5)} solid ${INK}`, paddingRight: u(16) }}><div style={{ fontFamily: F.script, fontSize: u(25), lineHeight: 1.25, transform: "rotate(-4deg)" }}>Chère Louise,<br/>Le temps est magnifique. Nous avons vu la mer ce matin.<br/>Amitiés,<br/>Paul</div></div>
        <div className="relative" style={{ paddingLeft: u(18) }}><div className="absolute edge-perf" style={{ right: 0, top: 0, width: u(52), height: u(64), background: "#9e493f", "--perf": u(6) } as CSSProperties}><span className="absolute inset-0 flex items-center justify-center" style={{ color: "#f0e7d5", fontFamily: F.cinzel, fontSize: u(16) }}>15c</span></div><Postmark id="postcard" size={82} color="#34312c" top="DEAUVILLE" center={["12·VII", "1958"]} className="absolute" style={{ right: u(30), top: u(10), transform: "rotate(-9deg)", opacity: 0.65 }}/><div style={{ marginTop: u(80) }}><Rules count={4} gap={20} color="#77716a" thickness={1}/></div><div style={{ fontFamily: F.type, fontSize: u(10), letterSpacing: u(2), marginTop: u(12) }}>MLLE LOUISE MARTIN<br/>18 RUE DES LILAS<br/>PARIS</div></div>
      </div>
    </div>
  );
}

export function FirstDayCover() {
  return (
    <div className="paper edge-soft h-full w-full" style={{ ...stock.cream, color: BLUE }}>
      <div className="absolute inset-0 ink-worn" style={{ padding: `${u(18)} ${u(22)}` }}>
        <div className="flex h-full items-center gap-[calc(20*var(--u))]">
          <div className="text-center" style={{ width: "37%" }}><svg viewBox="0 0 120 120" aria-hidden="true" style={{ width: "100%", height: u(105) }}><circle cx="60" cy="60" r="48" fill="none" stroke={BLUE} strokeWidth="3"/><path d="M30 78Q60 20 90 78M42 64H78M50 48H70" fill="none" stroke={BLUE} strokeWidth="4"/><path d="M26 82H94" stroke={BLUE} strokeWidth="5"/></svg><SmallLabel>Premier jour<br/>Tour Eiffel · 1889–1989</SmallLabel></div>
          <div className="relative h-full flex-1"><div className="absolute edge-perf" style={{ right: 0, top: 0, width: u(70), height: u(84), background: "#356b9a", "--perf": u(7) } as CSSProperties}><div className="absolute inset-0 flex flex-col items-center justify-center" style={{ color: "#efe4c8" }}><span style={{ fontFamily: F.cinzel, fontSize: u(18) }}>FRANCE</span><span style={{ fontFamily: F.bebas, fontSize: u(28) }}>2,20</span></div></div><Postmark id="fdc" size={105} color="#2c2925" top="PARIS · PREMIER JOUR" bottom="22 JUIN 1989" center={["PARIS"]} className="absolute" style={{ right: u(20), top: u(22), opacity: 0.75 }}/><div className="absolute bottom-0 left-0" style={{ fontFamily: F.type, color: INK, fontSize: u(10), letterSpacing: u(1.5), lineHeight: 1.6 }}>ÉDITION OFFICIELLE<br/>ENVELOPPE N° 0317</div></div>
        </div>
      </div>
    </div>
  );
}

export function RegisteredReceipt() {
  return (
    <div className="paper edge-zigzag-b h-full w-full" style={{ ...stock.white, "--z": u(6), color: INK } as CSSProperties}>
      <div className="absolute inset-0 ink-worn" style={{ padding: `${u(17)} ${u(18)} ${u(23)}` }}>
        <div className="flex items-center justify-between"><SmallLabel>Postes et télégraphes</SmallLabel><span style={{ fontFamily: F.heavy, fontSize: u(24), border: `${u(2)} solid ${RED}`, color: RED, padding: `${u(2)} ${u(7)}` }}>R</span></div>
        <div style={{ fontFamily: F.bebas, fontSize: u(30), letterSpacing: u(3), margin: `${u(7)} 0` }}>RÉCÉPISSÉ D'ENVOI</div>
        {["BUREAU : PARIS 18", "DESTINATION : TOULOUSE", "POIDS : 42 G", "TAXE : 3,15 F"].map((r) => <div key={r} className="flex items-center" style={{ fontFamily: F.type, fontSize: u(10.5), lineHeight: 1.65 }}><span>{r}</span><Dots color={INK}/></div>)}
        <div className="mt-[calc(8*var(--u))] flex justify-between"><Serial>RR 047 281</Serial><Serial>14·02·64</Serial></div>
        <div style={{ height: u(38), marginTop: u(8), color: INK }}><Barcode seed={47281} bars={38}/></div>
      </div>
    </div>
  );
}

export function ParcelLabel() {
  return (
    <div className="paper h-full w-full" style={{ ...stock.kraft, ...perfMask(["82%"], u(13)), color: RED } as CSSProperties}>
      <div className="grid h-full ink-worn" style={{ gridTemplateColumns: "82fr 18fr" }}>
        <div style={{ padding: `${u(16)} ${u(20)}` }}><div className="flex justify-between"><SmallLabel>Colis postal</SmallLabel><SmallLabel>Urgent</SmallLabel></div><div style={{ fontFamily: F.bebas, fontSize: u(34), letterSpacing: u(3), color: INK, margin: `${u(7)} 0` }}>PARIS → MARSEILLE</div><div style={{ border: `${u(2)} solid ${RED}`, padding: `${u(7)} ${u(10)}`, fontFamily: F.type, fontSize: u(10.5), color: INK, lineHeight: 1.45 }}>À LIVRER<br/><b>MME A. BONNET<br/>8 QUAI DU PORT</b></div><div className="mt-[calc(8*var(--u))] flex justify-between"><Serial>6,240 KG</Serial><Serial>CP 081542</Serial></div></div>
        <div className="flex items-center justify-center" style={{ borderLeft: `${u(2)} dashed ${RED}` }}><span className="vtext-up" style={{ fontFamily: F.stat, fontSize: u(18), letterSpacing: u(4) }}>EXPRESS · FRAGILE</span></div>
      </div>
    </div>
  );
}

export function Aerogramme() {
  const stripe = `repeating-linear-gradient(-45deg, ${RED} 0 ${u(7)}, #f0eadb ${u(7)} ${u(14)}, ${BLUE} ${u(14)} ${u(21)}, #f0eadb ${u(21)} ${u(28)})`;
  return (
    <div className="paper edge-soft h-full w-full" style={{ ...stock.blue, color: BLUE }}>
      <div className="absolute left-0 right-0 top-0" style={{ height: u(10), background: stripe }}/><div className="absolute left-0 right-0 bottom-0" style={{ height: u(10), background: stripe }}/>
      <div className="absolute inset-0 ink-worn" style={{ padding: `${u(20)} ${u(24)}` }}><div className="flex justify-between"><div style={{ fontFamily: F.bebas, fontSize: u(32), letterSpacing: u(4) }}>AÉROGRAMME</div><SmallLabel>Par avion · Air mail</SmallLabel></div><Rule color={BLUE} style={{ margin: `${u(9)} 0` }}/><div className="grid grid-cols-2 gap-[calc(20*var(--u))]"><div style={{ fontFamily: F.script, fontSize: u(20), color: INK, lineHeight: 1.35 }}>Mon cher André,<br/>Quelques lignes de Dakar où la chaleur est immense…</div><div><Rules count={5} gap={18} color={BLUE} thickness={1}/></div></div><div className="absolute bottom-[calc(18*var(--u))] left-[calc(24*var(--u))] right-[calc(24*var(--u))] text-center" style={{ borderTop: `${u(1)} dashed ${BLUE}`, fontFamily: F.type, fontSize: u(8.5), paddingTop: u(5) }}>PLIER ICI · NE RIEN INSÉRER DANS CET AÉROGRAMME</div></div>
    </div>
  );
}

export function PostalSavingsBook() {
  const green = "#315a47";
  return (
    <div className="paper paper-heavy-age edge-soft h-full w-full" style={{ ...stock.green, color: green }}>
      <div className="absolute ink-worn" style={{ inset: u(11), border: `${u(4)} double ${green}`, padding: `${u(24)} ${u(20)}`, textAlign: "center" }}><div style={{ fontFamily: F.cinzel, fontWeight: 700, fontSize: u(17), letterSpacing: u(4) }}>CAISSE NATIONALE</div><div style={{ fontFamily: F.script, fontSize: u(46), margin: `${u(10)} 0` }}>d'Épargne</div><svg viewBox="0 0 100 100" aria-hidden="true" style={{ width: u(85), height: u(85) }}><circle cx="50" cy="50" r="43" fill="none" stroke={green} strokeWidth="4"/><path d="M22 58H78V78H22ZM28 55L50 26L72 55Z" fill={green}/><circle cx="50" cy="45" r="6" fill="#cadbb2"/></svg><div style={{ fontFamily: F.bebas, fontSize: u(27), letterSpacing: u(3), marginTop: u(10) }}>LIVRET N° 70418</div><SmallLabel>Agence de Montmartre</SmallLabel></div>
    </div>
  );
}

export function CallingCard() {
  const plum = "#5f334d";
  return (
    <div className="paper edge-soft h-full w-full" style={{ ...stock.cream, color: plum }}>
      <div className="absolute ink-worn" style={{ inset: u(9), border: `${u(3)} double ${plum}`, padding: `${u(13)} ${u(20)}`, textAlign: "center" }}><span className="absolute left-[calc(9*var(--u))] top-[calc(5*var(--u))]" style={{ fontSize: u(25) }}>❦</span><span className="absolute right-[calc(9*var(--u))] bottom-[calc(5*var(--u))]" style={{ fontSize: u(25), transform: "rotate(180deg)" }}>❦</span><div style={{ fontFamily: F.script, fontSize: u(45), lineHeight: 1 }}>Madame Émile Laurent</div><div style={{ fontFamily: F.cinzel, fontSize: u(11), letterSpacing: u(4), marginTop: u(8) }}>REÇOIT LE JEUDI</div><div style={{ fontFamily: F.type, fontSize: u(9.5), letterSpacing: u(2), marginTop: u(7) }}>24, AVENUE DE WAGRAM · PARIS</div></div>
    </div>
  );
}