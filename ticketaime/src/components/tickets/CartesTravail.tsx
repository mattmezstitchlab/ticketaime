import type { CSSProperties, ReactNode } from "react";
import { u } from "../../lib/units";
import { F } from "../../lib/fonts";
import { paperBg } from "../../lib/paper";

/* ------------------------------------------------------------------ */
/*  Petites icônes de métier (traits, 40×40)                           */
/* ------------------------------------------------------------------ */

const icone = (children: ReactNode) => (
  <svg
    viewBox="0 0 40 40"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: "100%", height: "100%" }}
  >
    {children}
  </svg>
);

const IcoPostier = icone(
  <>
    <path d="M10 25q10-9 20 0" />
    <rect x="8" y="25" width="24" height="5" rx="2" />
    <circle cx="20" cy="12" r="2" />
    <path d="M20 14v6" />
  </>,
);
const IcoConducteur = icone(
  <>
    <rect x="11" y="7" width="18" height="25" rx="4" />
    <rect x="16" y="12" width="8" height="7" />
    <path d="M16 28h3M21 28h3" />
  </>,
);
const IcoConciergerie = icone(
  <>
    <circle cx="20" cy="9" r="1.6" />
    <path d="M20 11v3" />
    <path d="M9 29q0-13 11-13t11 13z" />
    <path d="M6 29h28" />
    <path d="M15 33h10l2 3H13z" />
  </>,
);
const IcoPharmacien = icone(
  <>
    <circle cx="20" cy="20" r="13" />
    <path d="M20 13v14M13 20h14" />
  </>,
);
const IcoJournaliste = icone(
  <>
    <rect x="7" y="8" width="17" height="24" rx="2" />
    <path d="M11 14h9M11 19h9M11 24h5" />
    <path d="M27 33l9-9 2 2-9 9-3 1z" />
  </>,
);
const IcoPilote = icone(
  <>
    <path d="M6 20L34 8l-8 26-6-10z" />
    <path d="M20 24L34 8" />
  </>,
);
const IcoInfirmiere = icone(
  <>
    <rect x="10" y="9" width="20" height="14" rx="3" />
    <path d="M20 13v6M17 16h6" />
    <path d="M8 27q12 8 24 0" />
  </>,
);
const IcoBoulanger = icone(
  <>
    <path d="M13 32L27 12a4.5 4.5 0 017 5L20 37z" />
    <path d="M19 27l4 4M24 21l4 4M29 15l3 3" />
  </>,
);
const IcoInstituteur = icone(
  <>
    <path d="M20 12q-6-4-12-2v20q6-2 12 2z" />
    <path d="M20 12q6-4 12-2v20q-6-2-12 2z" />
    <path d="M20 12v22" />
  </>,
);
const IcoPompier = icone(
  <>
    <path d="M20 5q9 9 5 15 5-3 5 7a10 10 0 11-20 0q0-9 8-11-1 7 5 9z" />
  </>,
);

/* ------------------------------------------------------------------ */
/*  Définitions des métiers                                            */
/* ------------------------------------------------------------------ */

interface MetierDef {
  metier: string;
  org: string;
  accent: string;
  nomDef: string;
  numeroDef: string;
  valide: string;
  icon: ReactNode;
}

const DEFS: Record<string, MetierDef> = {
  postier: { metier: "Postier", org: "POSTES & TÉLÉGRAPHES", accent: "#27548d", nomDef: "DUPONT ANDRÉ", numeroDef: "04821", valide: "31.12.1962", icon: IcoPostier },
  conducteur: { metier: "Conducteur de train", org: "CHEMINS DE FER DE L'ÉTAT", accent: "#2e6b4f", nomDef: "LEFEVRE JEAN", numeroDef: "11207", valide: "28.02.1963", icon: IcoConducteur },
  concierge: { metier: "Concierge", org: "GRAND HÔTEL DE PARIS", accent: "#a07c2f", nomDef: "MOREAU HENRI", numeroDef: "00314", valide: "30.06.1962", icon: IcoConciergerie },
  pharmacien: { metier: "Pharmacien", org: "PHARMACIE DU PROGRÈS", accent: "#1f6b64", nomDef: "DURAND MARIE", numeroDef: "07789", valide: "31.08.1962", icon: IcoPharmacien },
  journaliste: { metier: "Journaliste", org: "LA PRESSE ILLUSTRÉE", accent: "#3a3632", nomDef: "LEROY CLAUDE", numeroDef: "02951", valide: "31.12.1963", icon: IcoJournaliste },
  pilote: { metier: "Pilote", org: "COMPAGNIE AÉRIENNE", accent: "#203a63", nomDef: "BERNARD PAUL", numeroDef: "00118", valide: "30.09.1962", icon: IcoPilote },
  infirmiere: { metier: "Infirmière", org: "HÔPITAL SAINT-LOUIS", accent: "#a3392e", nomDef: "MARTIN JEANNE", numeroDef: "06342", valide: "31.10.1962", icon: IcoInfirmiere },
  boulanger: { metier: "Boulanger", org: "BOULANGERIE ARTISANALE", accent: "#7a4a24", nomDef: "PETIT LOUIS", numeroDef: "03956", valide: "29.04.1962", icon: IcoBoulanger },
  instituteur: { metier: "Instituteur", org: "ÉCOLE PUBLIQUE N° 12", accent: "#5f3355", nomDef: "ROUSSEAU MARIE", numeroDef: "08417", valide: "30.07.1963", icon: IcoInstituteur },
  pompier: { metier: "Pompier", org: "CABINET DES POMPIERS", accent: "#c05621", nomDef: "GARCIA PIERRE", numeroDef: "01764", valide: "31.11.1962", icon: IcoPompier },
};

/* ------------------------------------------------------------------ */
/*  Badge générique                                                    */
/* ------------------------------------------------------------------ */

function CarteTravailBase({ def, personnalisation }: { def: MetierDef; personnalisation?: Record<string, string> }) {
  const nom = personnalisation?.nom ?? def.nomDef;
  const numero = personnalisation?.numero ?? def.numeroDef;
  const org = personnalisation?.org ?? def.org;
  const metier = personnalisation?.metier ?? def.metier;
  return (
    <div
      className="paper paper-heavy-age edge-notch h-full w-full"
      style={{ ...paperBg("#f3ead4", "#e9dcbc", "#d9c79e"), "--notch": u(14), color: "#2b2318" } as CSSProperties}
    >
      <div className="absolute ink-worn" style={{ inset: u(12), border: `${u(2)} solid #6b5a3e` }}>
        {/* fente du laniard */}
        <div
          className="absolute"
          style={{ left: "50%", top: u(6), transform: "translateX(-50%)", width: u(64), height: u(11), borderRadius: u(6), background: "#241c12" }}
        />
        <div style={{ padding: `${u(26)} ${u(18)} ${u(28)}` }}>
          <div className="flex items-center" style={{ gap: u(12) }}>
            <div
              className="flex-none"
              style={{ width: u(46), height: u(46), background: def.accent, display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <div style={{ width: u(30), height: u(30), color: "#f4efe0" }}>{def.icon}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: F.cond, fontWeight: 700, fontSize: u(11.5), letterSpacing: u(2), lineHeight: 1.1 }}>{org}</div>
              <div style={{ fontFamily: F.type, fontSize: u(9), letterSpacing: u(2), marginTop: u(4) }}>CARTE DE TRAVAIL</div>
            </div>
            <div style={{ fontFamily: F.bebas, fontSize: u(26), letterSpacing: u(1), color: def.accent }}>{numero}</div>
          </div>
          <div style={{ fontFamily: F.bebas, fontSize: u(31), letterSpacing: u(1.5), margin: `${u(10)} 0 ${u(6)}` }}>
            {metier.toUpperCase()}
          </div>
          <div
            className="flex justify-between"
            style={{ borderTop: `${u(1)} solid #6b5a3e`, paddingTop: u(7), fontFamily: F.type, fontSize: u(10.5) }}
          >
            <span>NOM : {nom.toUpperCase()}</span>
            <span>VALABLE : {def.valide}</span>
          </div>
        </div>
        <div
          className="absolute"
          style={{
            left: 0,
            right: 0,
            bottom: 0,
            height: u(18),
            background: def.accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: F.cond,
            fontWeight: 600,
            fontSize: u(9),
            letterSpacing: u(3),
            color: "#f4efe0",
          }}
        >
          SERVICE · {def.org.split(" ")[0].toUpperCase()}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Un composant par métier                                            */
/* ------------------------------------------------------------------ */

type P = { personnalisation?: Record<string, string> };

export function CartePostier(p: P) {
  return <CarteTravailBase def={DEFS.postier} {...p} />;
}
export function CarteConducteur(p: P) {
  return <CarteTravailBase def={DEFS.conducteur} {...p} />;
}
export function CarteConciergerie(p: P) {
  return <CarteTravailBase def={DEFS.concierge} {...p} />;
}
export function CartePharmacien(p: P) {
  return <CarteTravailBase def={DEFS.pharmacien} {...p} />;
}
export function CarteJournaliste(p: P) {
  return <CarteTravailBase def={DEFS.journaliste} {...p} />;
}
export function CartePilote(p: P) {
  return <CarteTravailBase def={DEFS.pilote} {...p} />;
}
export function CarteInfirmiere(p: P) {
  return <CarteTravailBase def={DEFS.infirmiere} {...p} />;
}
export function CarteBoulanger(p: P) {
  return <CarteTravailBase def={DEFS.boulanger} {...p} />;
}
export function CarteInstituteur(p: P) {
  return <CarteTravailBase def={DEFS.instituteur} {...p} />;
}
export function CartePompier(p: P) {
  return <CarteTravailBase def={DEFS.pompier} {...p} />;
}
