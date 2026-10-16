import type { CSSProperties } from "react";
import { u } from "../../lib/units";
import { F } from "../../lib/fonts";
import { perfMask } from "../../lib/masks";
import { BLUE, Dots, Guilloche, INK, RED, Rule, Serial, SmallLabel, stock } from "./ArchiveCommon";

export function LibraryCard() {
  const lines = ["12 JAN.  Le Grand Meaulnes", "27 JAN.  L'Étranger", "08 FÉV.  La Peste", "22 FÉV.  Le Blé en herbe"];
  return (
    <div className="paper edge-soft h-full w-full" style={{ ...stock.cream, color: BLUE }}>
      <div className="absolute ink-worn" style={{ inset: u(10), border: `${u(2)} solid ${BLUE}`, padding: `${u(13)} ${u(17)}` }}><div className="flex justify-between"><SmallLabel>Bibliothèque municipale</SmallLabel><Serial>CARTE 0815</Serial></div><div style={{ fontFamily: F.bebas, fontSize: u(30), letterSpacing: u(3), margin: `${u(6)} 0` }}>FICHE DE PRÊT</div><div className="flex items-center"><SmallLabel>Lecteur · Jeanne Martin</SmallLabel><Dots color={BLUE}/></div><Rule color={BLUE} style={{ margin: `${u(7)} 0` }}/>{lines.map((l) => <div key={l} style={{ fontFamily: F.type, color: INK, fontSize: u(10), lineHeight: 1.65, borderBottom: `${u(1)} dotted rgba(36,77,120,.35)` }}>{l}</div>)}</div>
    </div>
  );
}

export function RationCoupons() {
  return (
    <div className="paper h-full w-full" style={{ ...stock.pink, ...perfMask(["33.33%", "66.66%"], u(9)), color: RED } as CSSProperties}>
      <div className="grid h-full grid-cols-3 ink-worn">
        {["PAIN", "SUCRE", "CAFÉ"].map((name, i) => <div key={name} className="relative flex flex-col items-center justify-center text-center" style={{ borderLeft: i ? `${u(2)} dashed ${RED}` : "none" }}><SmallLabel>Carte d'alimentation</SmallLabel><div style={{ fontFamily: F.heavy, fontSize: u(38), lineHeight: 1, margin: `${u(5)} 0` }}>{name}</div><div style={{ fontFamily: F.bebas, fontSize: u(54), lineHeight: 1 }}>{[250, 100, 50][i]}<span style={{ fontSize: u(20) }}>g</span></div><Serial style={{ marginTop: u(7), fontSize: u(8.5) }}>SÉRIE J · 1943</Serial></div>)}
      </div>
    </div>
  );
}

export function WeddingInvitation() {
  const plum = "#72435d";
  return (
    <div className="paper edge-soft h-full w-full" style={{ ...stock.cream, color: plum }}>
      <div className="absolute ink-worn" style={{ inset: u(11), border: `${u(3)} double ${plum}`, textAlign: "center", padding: `${u(18)} ${u(24)}` }}><div style={{ fontFamily: F.cinzel, fontSize: u(11), letterSpacing: u(4) }}>MONSIEUR &amp; MADAME MARTIN</div><div style={{ fontFamily: F.playfair, fontStyle: "italic", fontSize: u(15), marginTop: u(8) }}>ont la joie de vous faire part du mariage de</div><div style={{ fontFamily: F.script, fontSize: u(50), lineHeight: 1, margin: `${u(10)} 0` }}>Élise &amp; André</div><div style={{ fontFamily: F.cinzel, fontWeight: 700, fontSize: u(12), letterSpacing: u(2.5) }}>SAMEDI 14 JUIN 1958 · 15 HEURES</div><div style={{ fontFamily: F.playfair, fontSize: u(12), marginTop: u(8) }}>Église Saint-Roch · Paris</div><div style={{ fontSize: u(22), marginTop: u(7) }}>❦</div></div>
    </div>
  );
}

export function FuneralCard() {
  return (
    <div className="paper edge-soft h-full w-full" style={{ ...stock.white, color: "#252421" }}>
      <div className="absolute" style={{ inset: u(9), border: `${u(5)} double #252421` }}/><div className="absolute inset-0 flex flex-col items-center justify-center text-center ink-worn" style={{ padding: `${u(28)} ${u(22)}` }}><div style={{ fontSize: u(34), lineHeight: 1 }}>✝</div><div style={{ fontFamily: F.playfair, fontStyle: "italic", fontSize: u(13), marginTop: u(8) }}>Souvenez-vous dans vos prières de</div><div style={{ fontFamily: F.cinzel, fontWeight: 700, fontSize: u(22), letterSpacing: u(2), margin: `${u(12)} 0` }}>HENRI DUBOIS</div><div style={{ fontFamily: F.type, fontSize: u(10), lineHeight: 1.55 }}>RAPPELÉ À DIEU<br/>LE 8 NOVEMBRE 1949<br/>DANS SA 72e ANNÉE</div><Rule style={{ width: "55%", margin: `${u(12)} 0` }}/><div style={{ fontFamily: F.playfair, fontSize: u(11), fontStyle: "italic" }}>Requiescat in pace</div></div>
    </div>
  );
}

export function DanceCard() {
  const gold = "#a47a36";
  const dances = ["Valse", "Foxtrot", "Tango", "Charleston", "Valse finale"];
  return (
    <div className="paper edge-notch h-full w-full" style={{ ...stock.pink, "--notch": u(16), color: gold } as CSSProperties}>
      <Guilloche color={gold} opacity={0.12}/><div className="absolute ink-worn" style={{ inset: u(10), border: `${u(3)} double ${gold}`, padding: `${u(18)} ${u(20)}`, textAlign: "center" }}><SmallLabel>Bal de l'Amicale</SmallLabel><div style={{ fontFamily: F.script, fontSize: u(45), margin: `${u(5)} 0` }}>Carnet de bal</div><div style={{ fontFamily: F.cinzel, fontSize: u(10), letterSpacing: u(3) }}>14 FÉVRIER 1928</div><Rule color={gold} style={{ margin: `${u(10)} 0` }}/>{dances.map((d, i) => <div key={d} className="flex items-center text-left" style={{ fontFamily: F.type, fontSize: u(10), lineHeight: 1.75 }}><span>{i + 1}. {d}</span><Dots color={gold}/></div>)}<div className="mt-[calc(9*var(--u))]" style={{ fontFamily: F.script, fontSize: u(20), transform: "rotate(-5deg)" }}>Paul · Jean · - · Louis</div></div>
    </div>
  );
}

export function ClubMembership() {
  const green = "#2e6048";
  return (
    <div className="paper edge-soft h-full w-full" style={{ ...stock.green, color: green }}>
      <div className="absolute ink-worn" style={{ inset: u(10), border: `${u(5)} double ${green}`, padding: `${u(15)} ${u(20)}` }}><div className="flex items-center gap-[calc(14*var(--u))]"><svg viewBox="0 0 100 100" aria-hidden="true" style={{ width: u(72), height: u(72) }}><circle cx="50" cy="50" r="44" fill="none" stroke={green} strokeWidth="4"/><path d="M50 12L59 39L88 39L65 56L74 84L50 67L26 84L35 56L12 39L41 39Z" fill={green}/></svg><div><div style={{ fontFamily: F.cinzel, fontWeight: 700, fontSize: u(17), letterSpacing: u(3) }}>CERCLE ATHLÉTIQUE</div><SmallLabel>Carte de sociétaire · 1956</SmallLabel></div></div><Rule color={green} style={{ margin: `${u(12)} 0` }}/><div className="grid grid-cols-2 gap-y-[calc(10*var(--u))]" style={{ fontFamily: F.type, fontSize: u(11) }}><span>NOM<br/><b>ROBERT LENOIR</b></span><span>N°<br/><b>00481</b></span><span>SECTION<br/><b>CYCLISME</b></span><span>COTISATION<br/><b>PAYÉE</b></span></div></div>
    </div>
  );
}

export function BallotPaper() {
  return (
    <div className="paper edge-soft h-full w-full" style={{ ...stock.white, color: INK }}>
      <div className="absolute inset-0 ink-worn" style={{ padding: `${u(17)} ${u(20)}` }}><div className="text-center"><SmallLabel>République française</SmallLabel><div style={{ fontFamily: F.bebas, fontSize: u(31), letterSpacing: u(4), marginTop: u(5) }}>BULLETIN DE VOTE</div><div style={{ fontFamily: F.type, fontSize: u(9.5), marginTop: u(4) }}>ÉLECTION MUNICIPALE · 12 MAI 1946</div></div><Rule style={{ margin: `${u(10)} 0` }}/>{["Liste d'Union Républicaine", "Liste des Intérêts Locaux", "Liste du Progrès Social"].map((l, i) => <div key={l} className="flex items-center" style={{ borderBottom: `${u(1)} solid rgba(47,40,31,.25)`, padding: `${u(9)} 0`, fontFamily: F.playfair, fontSize: u(12) }}><span className="mr-[calc(10*var(--u))] inline-flex items-center justify-center" style={{ width: u(16), height: u(16), border: `${u(1.5)} solid ${INK}`, fontFamily: F.mono, fontSize: u(12) }}>{i === 1 ? "×" : ""}</span>{l}</div>)}<div className="mt-[calc(10*var(--u))] text-center" style={{ fontFamily: F.type, fontSize: u(8.5), letterSpacing: u(1) }}>UN SEUL CHOIX · NE PAS SIGNER</div></div>
    </div>
  );
}

export function UnionDuesCard() {
  const blue = "#31537c";
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  return (
    <div className="paper edge-soft h-full w-full" style={{ ...stock.blue, color: blue }}>
      <div className="absolute ink-worn" style={{ inset: u(10), border: `${u(2)} solid ${blue}`, padding: `${u(14)} ${u(17)}` }}><div className="flex justify-between"><SmallLabel>Union des ouvriers</SmallLabel><Serial>ADH. 0784</Serial></div><div style={{ fontFamily: F.bebas, fontSize: u(31), letterSpacing: u(3), margin: `${u(7)} 0` }}>CARTE DE COTISATIONS</div><div className="flex items-center"><SmallLabel>Nom · Marcel Petit</SmallLabel><Dots color={blue}/></div><div className="mt-[calc(10*var(--u))] grid grid-cols-6 gap-[calc(5*var(--u))]">{months.map((m, i) => <div key={i} className="relative flex items-center justify-center" style={{ height: u(31), border: `${u(1.3)} solid ${blue}`, fontFamily: F.mono, fontSize: u(10), background: i < 9 ? "rgba(49,83,124,.14)" : "transparent" }}>{m}{i < 9 && <span className="absolute" style={{ fontSize: u(17), color: RED, transform: "rotate(-18deg)" }}>✓</span>}</div>)}</div><div className="mt-[calc(9*var(--u))] flex justify-between"><SmallLabel>Section métaux</SmallLabel><SmallLabel>Année 1952</SmallLabel></div></div>
    </div>
  );
}