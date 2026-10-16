import type { CSSProperties } from "react";
import { u } from "../../lib/units";
import { F } from "../../lib/fonts";
import { perfMask } from "../../lib/masks";
import { BLUE, Dots, INK, RED, Rule, Serial, SmallLabel, stock } from "./ArchiveCommon";

export function RailwayTicket() {
  return (
    <div className="paper paper-heavy-age edge-soft h-full w-full" style={{ ...stock.kraft, color: "#4c271b" }}>
      <div className="absolute ink-worn" style={{ inset: u(9), border: `${u(2)} solid #4c271b`, padding: `${u(10)} ${u(14)}` }}>
        <div className="flex items-center justify-between">
          <SmallLabel>Chemins de fer de l'État</SmallLabel>
          <Serial>07421</Serial>
        </div>
        <Rule style={{ margin: `${u(8)} 0` }} />
        <div className="text-center" style={{ fontFamily: F.bebas, fontSize: u(31), letterSpacing: u(2), lineHeight: 1 }}>
          PARIS - ROUEN
        </div>
        <div className="mt-[calc(6*var(--u))] flex items-end justify-between">
          <span style={{ fontFamily: F.cond, fontWeight: 600, fontSize: u(14), letterSpacing: u(2) }}>2e CLASSE</span>
          <span style={{ fontFamily: F.type, fontSize: u(11), letterSpacing: u(1) }}>17 OCT. 1938</span>
          <span style={{ fontFamily: F.bebas, fontSize: u(26) }}>28 F</span>
        </div>
      </div>
    </div>
  );
}

export function TramTransfer() {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <div className="paper edge-perf h-full w-full" style={{ ...stock.pink, "--perf": u(7), color: "#6f2636" } as CSSProperties}>
      <div className="absolute inset-0 ink-worn" style={{ padding: `${u(16)} ${u(13)}` }}>
        <div className="text-center" style={{ fontFamily: F.stat, fontSize: u(20), letterSpacing: u(3), lineHeight: 1 }}>TRAMWAYS</div>
        <div className="mt-[calc(5*var(--u))] text-center" style={{ fontFamily: F.type, fontSize: u(9), letterSpacing: u(1) }}>CORRESPONDANCE · 45 MIN.</div>
        <Rule style={{ margin: `${u(8)} 0` }} />
        <div className="grid grid-cols-3 gap-[calc(5*var(--u))]">
          {nums.map((n) => (
            <span key={n} className="flex items-center justify-center rounded-full" style={{ height: u(25), border: `${u(1)} solid #6f2636`, fontFamily: F.mono, fontSize: u(10), background: n === 7 ? "#6f2636" : "transparent", color: n === 7 ? "#f0d5d0" : "inherit" }}>{n}</span>
          ))}
        </div>
        <div className="mt-[calc(9*var(--u))] flex justify-between"><Serial>LIGNE 12</Serial><Serial>09057</Serial></div>
      </div>
    </div>
  );
}

export function BusConductorTicket() {
  const fares = ["0,40", "0,60", "0,80", "1,00", "1,20", "1,50"];
  return (
    <div className="paper edge-zigzag-tb h-full w-full" style={{ ...stock.yellow, "--z": u(6), color: INK } as CSSProperties}>
      <div className="absolute inset-0 ink-worn" style={{ padding: `${u(18)} ${u(15)}` }}>
        <div className="flex items-center justify-between"><SmallLabel>Autobus urbains</SmallLabel><Serial>59108</Serial></div>
        <div className="mt-[calc(7*var(--u))] text-center" style={{ fontFamily: F.bebas, fontSize: u(28), letterSpacing: u(3) }}>TICKET SIMPLE</div>
        <div className="mt-[calc(7*var(--u))] grid grid-cols-3 gap-[calc(3*var(--u))]">
          {fares.map((f, i) => <span key={f} className="text-center" style={{ border: `${u(1)} solid ${INK}`, padding: u(5), fontFamily: F.mono, fontSize: u(9), background: i === 3 ? INK : "transparent", color: i === 3 ? "#edc65c" : INK }}>{f}</span>)}
        </div>
        <div className="mt-[calc(8*var(--u))] flex justify-between"><SmallLabel>Section 4</SmallLabel><SmallLabel>Voiture 27</SmallLabel></div>
      </div>
    </div>
  );
}

export function MetroCarnet() {
  return (
    <div className="paper h-full w-full" style={{ ...stock.cream, ...perfMask(["20%", "40%", "60%", "80%"], u(8)), color: BLUE } as CSSProperties}>
      <div className="grid h-full grid-cols-5 ink-worn">
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className="flex flex-col items-center justify-center text-center" style={{ borderLeft: n === 1 ? "none" : `${u(1.5)} dashed ${BLUE}`, padding: u(5) }}>
            <span className="vtext-up" style={{ fontFamily: F.bebas, fontSize: u(17), letterSpacing: u(3) }}>MÉTRO</span>
            <span style={{ fontFamily: F.display, fontSize: u(34), margin: `${u(7)} 0` }}>{n}</span>
            <Serial style={{ fontSize: u(8), writingMode: "vertical-rl" }}>A·08152</Serial>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FerryTicket() {
  return (
    <div className="paper edge-notch h-full w-full" style={{ ...stock.blue, "--notch": u(14), color: BLUE } as CSSProperties}>
      <div className="absolute inset-0 grid ink-worn" style={{ gridTemplateColumns: "1fr 1.4fr", padding: `${u(18)} ${u(22)}` }}>
        <svg viewBox="0 0 150 100" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
          <path d="M20 66H132L112 88H40Z" fill={BLUE}/><path d="M46 55H114V67H46Z" fill={BLUE}/><path d="M62 35H99V55H62Z" fill={BLUE}/><path d="M79 17H84V35H79Z" fill={BLUE}/><path d="M8 91Q30 82 52 91T96 91T140 91" fill="none" stroke={BLUE} strokeWidth="4"/>
        </svg>
        <div className="flex flex-col justify-center" style={{ lineHeight: 1 }}>
          <SmallLabel>Compagnie maritime</SmallLabel>
          <div style={{ fontFamily: F.bebas, fontSize: u(36), letterSpacing: u(2), margin: `${u(5)} 0` }}>LE HAVRE - DOUVRES</div>
          <div className="flex items-center gap-[calc(7*var(--u))]"><SmallLabel>Passager</SmallLabel><Dots color={BLUE}/><Serial>03174</Serial></div>
          <div className="mt-[calc(8*var(--u))] flex justify-between"><SmallLabel>Pont B</SmallLabel><SmallLabel>10 h 30</SmallLabel><SmallLabel>Aller simple</SmallLabel></div>
        </div>
      </div>
    </div>
  );
}

export function PlatformTicket() {
  return (
    <div className="paper paper-heavy-age edge-notch h-full w-full" style={{ ...stock.cream, "--notch": u(13), color: RED } as CSSProperties}>
      <div className="absolute ink-worn" style={{ inset: u(9), border: `${u(3)} double ${RED}`, padding: `${u(10)} ${u(15)}`, textAlign: "center" }}>
        <SmallLabel>Gare de Lyon</SmallLabel>
        <div style={{ fontFamily: F.bebas, fontSize: u(45), letterSpacing: u(3), lineHeight: 1, margin: `${u(6)} 0` }}>QUAI</div>
        <div style={{ fontFamily: F.type, fontSize: u(10), letterSpacing: u(2) }}>ACCÈS SANS VOYAGE</div>
        <div className="mt-[calc(8*var(--u))] flex justify-between"><Serial>0,50 F</Serial><Serial>N° 2816</Serial></div>
      </div>
    </div>
  );
}

export function TollTicket() {
  return (
    <div className="paper edge-zigzag-b h-full w-full" style={{ ...stock.white, "--z": u(7), color: INK } as CSSProperties}>
      <div className="absolute inset-0 ink-worn" style={{ padding: `${u(20)} ${u(18)} ${u(24)}` }}>
        <div className="text-center"><SmallLabel>Autoroute de l'Ouest</SmallLabel><div style={{ fontFamily: F.bebas, fontSize: u(35), letterSpacing: u(4), marginTop: u(5) }}>PÉAGE</div></div>
        <Rule style={{ margin: `${u(10)} 0` }} />
        <div className="grid grid-cols-2 gap-y-[calc(8*var(--u))]" style={{ fontFamily: F.type, fontSize: u(11), lineHeight: 1.2 }}><span>ENTRÉE<br/><b>SAINT-CLOUD</b></span><span>SORTIE<br/><b>MANTES</b></span><span>CLASSE<br/><b>1</b></span><span>MONTANT<br/><b>3,20 F</b></span></div>
        <Rule style={{ margin: `${u(10)} 0` }} />
        <div className="flex justify-between"><Serial>18:42</Serial><Serial>004917</Serial></div>
      </div>
    </div>
  );
}

export function SleeperCoupon() {
  const cream = "#f2dfb4";
  return (
    <div className="paper paper-dark edge-notch h-full w-full" style={{ ...stock.dark, "--notch": u(14), color: cream } as CSSProperties}>
      <div className="absolute ink-worn" style={{ inset: u(10), border: `${u(2)} solid ${cream}`, padding: `${u(15)} ${u(20)}` }}>
        <div className="flex justify-between"><SmallLabel>Compagnie des Wagons-Lits</SmallLabel><Serial>WL 18403</Serial></div>
        <div style={{ fontFamily: F.deco, fontSize: u(32), letterSpacing: u(3), margin: `${u(9)} 0`, textAlign: "center" }}>PARIS · VENISE</div>
        <Rule color={cream}/>
        <div className="mt-[calc(10*var(--u))] grid grid-cols-3 text-center"><div><SmallLabel>Voiture</SmallLabel><div style={{ fontFamily: F.bebas, fontSize: u(35) }}>7</div></div><div style={{ borderLeft: `${u(1)} solid ${cream}`, borderRight: `${u(1)} solid ${cream}` }}><SmallLabel>Cabine</SmallLabel><div style={{ fontFamily: F.bebas, fontSize: u(35) }}>12</div></div><div><SmallLabel>Couchette</SmallLabel><div style={{ fontFamily: F.bebas, fontSize: u(35) }}>B</div></div></div>
      </div>
    </div>
  );
}