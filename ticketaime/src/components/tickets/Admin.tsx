import type { CSSProperties } from "react";
import { u } from "../../lib/units";
import { F } from "../../lib/fonts";
import { paperBg } from "../../lib/paper";

/* ------------------------------------------------------------------ */
/*  Helpers communs aux documents administratifs                      */
/* ------------------------------------------------------------------ */


const labelAdmin: CSSProperties = {
  fontFamily: F.cond,
  fontWeight: 600,
  fontSize: u(9.5),
  letterSpacing: u(2),
  textTransform: "uppercase",
  color: "#4a3a22",
  marginBottom: u(4),
};

const fieldAdmin: CSSProperties = {
  fontFamily: F.type,
  fontSize: u(13),
  lineHeight: 1.15,
  marginBottom: u(6),
  color: "#2b2622",
};

const tableauLigne = (cols: { label?: string; valeur?: string; grow?: number }[]) => (
  <div className="grid" style={{ gridTemplateColumns: cols.map((c) => `${c.grow ?? 1}fr`).join(" ") }}>
    {cols.map((c) => (
      <div key={c.label ?? c.valeur}>
        {c.label && <div style={labelAdmin}>{c.label}</div>}
        {c.valeur && <div style={fieldAdmin}>{c.valeur}</div>}
      </div>
    ))}
  </div>
);

/* ------------------------------------------------------------------ */
/*  1. Acte de naissance                                              */
/* ------------------------------------------------------------------ */

export function ActeNaissance({ personnalisation }: { personnalisation?: Record<string, string> }) {
  const nom = personnalisation?.nom ?? "DURAND";
  const prenoms = personnalisation?.prenoms ?? "JEAN-PIERRE MARIE";
  const date = personnalisation?.date ?? "15 MARS 1948";
  const lieu = personnalisation?.lieu ?? "PARIS 12E";
  return (
    <div className="paper edge-soft h-full w-full" style={{ ...paperBg("#f9f5eb", "#efe4d0", "#ddd7c1"), color: "#2b2622" }}>
      <div className="absolute ink-worn" style={{ inset: u(12), border: `${u(3)} double #4a3a22`, padding: `${u(20)} ${u(24)}` }}>
        <div className="flex justify-between">
          <div style={labelAdmin}>ÉTAT CIVIL</div>
          <div style={labelAdmin}>MAIRIE DE PARIS 4E</div>
        </div>
        <div style={{ fontFamily: F.bebas, fontSize: u(44), letterSpacing: u(3), lineHeight: 1, margin: `${u(10)} 0` }}>ACTE DE NAISSANCE</div>
        <div style={{ height: u(2), background: "#4a3a22", margin: `${u(10)} 0` }} />
        {tableauLigne([
          { label: "NOM", valeur: nom, grow: 1 },
          { label: "PRÉNOMS", valeur: prenoms, grow: 2 },
          { label: "DATE", valeur: date, grow: 1 },
          { label: "LIEU", valeur: lieu, grow: 1 },
        ])}
        {tableauLigne([
          { label: "PÈRE", valeur: "DURAND, HENRI", grow: 1 },
          { label: "MÈRE", valeur: "MARTIN, LUCIE", grow: 1 },
          { label: "DÉCLARANT", valeur: "H. DURAND", grow: 1 },
        ])}
        <div className="mt-[calc(10*var(--u))] flex justify-between" style={{ fontSize: u(10) }}>
          <span style={{ fontFamily: F.type }}>LE MAIRE</span>
          <span style={{ fontFamily: F.type }}>LE 17 MARS 1948</span>
        </div>
        <div className="text-center" style={{ marginTop: u(14), fontSize: u(9), opacity: 0.7, letterSpacing: u(1) }}>
          EXTRAIT ACTE N° 48-1742 - COPIE CONFORME
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  2. Certificat de mariage                                          */
/* ------------------------------------------------------------------ */

export function CertificatMariage({ personnalisation }: { personnalisation?: Record<string, string> }) {
  const epoux = personnalisation?.epoux ?? "JEAN-PAUL BERNARD";
  const epouse = personnalisation?.epouse ?? "ISABELLE DUPONT";
  const date = personnalisation?.date ?? "24 JUIN 1972";
  const lieu = personnalisation?.lieu ?? "LYON 3E";
  return (
    <div className="paper edge-soft h-full w-full" style={{ ...paperBg("#faf7ee", "#f1e8d6", "#dfd2be"), color: "#2b2622" }}>
      <div className="absolute ink-worn" style={{ inset: u(12), border: `${u(3)} double #3a2d1b`, padding: `${u(20)} ${u(24)}` }}>
        <div className="flex justify-between"><div style={labelAdmin}>MARIAGE</div><div style={labelAdmin}>N° 2841</div></div>
        <div style={{ fontFamily: F.bebas, fontSize: u(38), letterSpacing: u(2), lineHeight: 1, margin: `${u(8)} 0` }}>CERTIFICAT DE MARIAGE</div>
        {tableauLigne([
          { label: "ÉPOUX", valeur: epoux, grow: 1 },
          { label: "ÉPOUSE", valeur: epouse, grow: 1 },
          { label: "DATE", valeur: date, grow: 1 },
          { label: "LIEU", valeur: lieu, grow: 1 },
        ])}
        {tableauLigne([
          { label: "TEMOIN 1", valeur: "MARC DURAND", grow: 1 },
          { label: "TEMOIN 2", valeur: "SOPHIE LEROUX", grow: 1 },
        ])}
        <div className="mt-[calc(10*var(--u))] flex justify-between" style={{ fontSize: u(10) }}>
          <span style={{ fontFamily: F.type }}>OFFICIER D'ÉTAT CIVIL</span>
          <span style={{ fontFamily: F.type }}>LE 24 JUIN 1972</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  3. Déclaration d'impôt                                            */
/* ------------------------------------------------------------------ */

export function DeclarationImpots({ personnalisation }: { personnalisation?: Record<string, string> }) {
  const nom = personnalisation?.nom ?? "MOREAU";
  const prenoms = personnalisation?.prenoms ?? "CATHERINE";
  const adresse = personnalisation?.adresse ?? "12 RUE DE RIVOLI, PARIS";
  const annee = personnalisation?.annee ?? "1983";
  const revenus = personnalisation?.revenus ?? "98 400 F";
  const fonciers = personnalisation?.fonciers ?? "12 000 F";
  const total = personnalisation?.total ?? "110 400 F";
  return (
    <div className="paper edge-zigzag-tb h-full w-full" style={{ ...paperBg("#f8f4ea", "#efead0", "#ddd7c0"), "--z": u(7), color: "#2b2622" } as CSSProperties}>
      <div className="absolute inset-0 ink-worn" style={{ padding: `${u(18)} ${u(20)}` }}>
        <div className="flex justify-between">
          <div style={labelAdmin}>DIRECTION DES IMPÔTS</div>
          <div style={labelAdmin}>N° 1042</div>
        </div>
        <div style={{ fontFamily: F.bebas, fontSize: u(28), letterSpacing: u(2), margin: `${u(8)} 0` }}>DÉCLARATION ANNUELLE DES REVENUS</div>
        {tableauLigne([
          { label: "NOM", valeur: nom, grow: 1 },
          { label: "PRÉNOMS", valeur: prenoms, grow: 1 },
          { label: "ADRESSE", valeur: adresse, grow: 2 },
          { label: "ANNÉE", valeur: annee, grow: 1 },
        ])}
        <div className="mt-[calc(10*var(--u))] grid" style={{ gridTemplateColumns: "1fr 1fr", gap: u(8) }}>
          <div>
            <div style={labelAdmin}>REVENUS SALARIAUX</div>
            <div style={fieldAdmin}>{revenus}</div>
          </div>
          <div>
            <div style={labelAdmin}>REVENUS FONCIERS</div>
            <div style={fieldAdmin}>{fonciers}</div>
          </div>
        </div>
        <div className="mt-[calc(8*var(--u))] flex justify-between" style={{ fontSize: u(11) }}>
          <span style={{ fontFamily: F.type }}>TOTAL NET IMPOSABLE</span>
          <span style={{ fontFamily: F.type, fontWeight: 700 }}>{total}</span>
        </div>
        <div style={{ height: u(1), background: "#2b2622", margin: `${u(8)} 0` }} />
        <div style={{ fontSize: u(9), lineHeight: 1.4, opacity: 0.8 }}>
          IMPÔT SUR LE REVENU - ART. 193 DU CODE GÉNÉRAL DES IMPÔTS<br />
          DÉCLARATION À RENDRE AVANT LE 15 MARS 1984
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  4. Bulletin de paie                                               */
/* ------------------------------------------------------------------ */

export function BulletinPaie({ personnalisation }: { personnalisation?: Record<string, string> }) {
  const salarie = personnalisation?.salarie ?? "PIERRE LAVOISIER";
  const matricule = personnalisation?.matricule ?? "PA-8142";
  const periode = personnalisation?.periode ?? "MAI 1975";
  const brut = personnalisation?.brut ?? "2 450 F";
  const cotisations = personnalisation?.cotisations ?? "735 F";
  const netImposable = personnalisation?.netImposable ?? "1 715 F";
  const netApayer = personnalisation?.netApayer ?? "1 715 F";
  return (
    <div className="paper edge-zigzag-tb h-full w-full" style={{ ...paperBg("#f6f2e6", "#ebe1cc", "#ddd1b4"), "--z": u(7), color: "#2b2622" } as CSSProperties}>
      <div className="absolute inset-0 ink-worn" style={{ padding: `${u(16)} ${u(20)}` }}>
        <div className="flex justify-between">
          <div style={labelAdmin}>ENTREPRISE DUPONT &amp; CIE</div>
          <div style={labelAdmin}>BULLETIN DE PAIE</div>
        </div>
        <div style={{ fontFamily: F.bebas, fontSize: u(26), letterSpacing: u(2), margin: `${u(6)} 0` }}>FICHE DE RÉMUNÉRATION</div>
        {tableauLigne([
          { label: "SALARIÉ", valeur: salarie, grow: 2 },
          { label: "MATRICULE", valeur: matricule, grow: 1 },
          { label: "PÉRIODE", valeur: periode, grow: 1 },
        ])}
        <div className="mt-[calc(10*var(--u))] grid" style={{ gridTemplateColumns: "1fr 1fr", gap: u(8) }}>
          <div>
            <div style={labelAdmin}>SALAIRE BRUT</div>
            <div style={fieldAdmin}>{brut}</div>
          </div>
          <div>
            <div style={labelAdmin}>COTISATIONS</div>
            <div style={fieldAdmin}>{cotisations}</div>
          </div>
          <div>
            <div style={labelAdmin}>NET IMPOSABLE</div>
            <div style={fieldAdmin}>{netImposable}</div>
          </div>
          <div>
            <div style={labelAdmin}>NET À PAYER</div>
            <div style={fieldAdmin}>{netApayer}</div>
          </div>
        </div>
        <div className="mt-[calc(10*var(--u))] flex justify-between" style={{ fontSize: u(10) }}>
          <span style={{ fontFamily: F.type }}>L'EMPLOYEUR</span>
          <span style={{ fontFamily: F.type }}>LE SALARIÉ</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  5. Carte d'identité                                               */
/* ------------------------------------------------------------------ */

export function CarteIdentite({ personnalisation }: { personnalisation?: Record<string, string> }) {
  const nom = personnalisation?.nom ?? "MOREAU";
  const prenoms = personnalisation?.prenoms ?? "CATHERINE LUCIE";
  const naissance = personnalisation?.naissance ?? "12 MAI 1954";
  const lieuNaissance = personnalisation?.lieuNaissance ?? "MARSEILLE";
  const adresse = personnalisation?.adresse ?? "8 RUE DE LA PAIX, PARIS";
  return (
    <div className="paper edge-notch h-full w-full" style={{ ...paperBg("#f4efe4", "#eadfc4", "#dbcfae"), "--notch": u(16), color: "#2b2622" } as CSSProperties}>
      <div className="absolute ink-worn" style={{ inset: u(12), border: `${u(4)} double #4a3a22`, padding: `${u(16)} ${u(22)}` }}>
        <div className="flex items-center justify-between">
          <div style={{ fontFamily: F.bebas, fontSize: u(18), letterSpacing: u(2) }}>RÉPUBLIQUE FRANÇAISE</div>
          <div style={labelAdmin}>CARTE NATIONALE D'IDENTITÉ</div>
        </div>
        <div className="mt-[calc(8*var(--u))] flex">
          <div style={{ width: "38%", height: u(74), background: "#dccfa4", border: `${u(1)} solid #2b2622`, marginRight: u(14), display: "flex", alignItems: "center", justifyContent: "center", fontSize: u(8), color: "#6b5a46" }}>
            PHOTO
          </div>
          <div className="flex-1" style={{ lineHeight: 1 }}>
            <div style={fieldAdmin}>NOM : {nom}</div>
            <div style={fieldAdmin}>PRÉNOMS : {prenoms}</div>
            <div style={fieldAdmin}>DATE DE NAISSANCE : {naissance}</div>
            <div style={fieldAdmin}>LIEU DE NAISSANCE : {lieuNaissance}</div>
            <div style={fieldAdmin}>ADRESSE : {adresse}</div>
          </div>
        </div>
        <div className="mt-[calc(10*var(--u))] flex justify-between" style={{ fontSize: u(9.5) }}>
          <span style={{ fontFamily: F.type }}>DÉLIVRÉE LE 20 AVRIL 1982</span>
          <span style={{ fontFamily: F.type }}>VALABLE JUSQU'AU 20 AVRIL 1992</span>
        </div>
        <div className="absolute bottom-0 right-0" style={{ bottom: u(4), right: u(4), fontSize: u(8), opacity: 0.6 }}>MINISTÈRE DE L'INTÉRIEUR</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  6. Passeport                                                      */
/* ------------------------------------------------------------------ */

export function Passeport({ personnalisation }: { personnalisation?: Record<string, string> }) {
  const nom = personnalisation?.nom ?? "LEFEBVRE";
  const prenoms = personnalisation?.prenoms ?? "ANTOINE PAUL";
  const naissance = personnalisation?.naissance ?? "03 NOVEMBRE 1961 - NANTES";
  const numero = personnalisation?.numero ?? "FR 84729103";
  return (
    <div className="paper edge-notch h-full w-full" style={{ ...paperBg("#f5ece1", "#e7dcc6", "#d8ccb0"), "--notch": u(18), color: "#2b2622" } as CSSProperties}>
      <div className="absolute ink-worn" style={{ inset: u(14), border: `${u(5)} double #4a3a22`, padding: `${u(22)} ${u(26)}` }}>
        <div className="flex items-center justify-between">
          <div style={{ fontFamily: F.bebas, fontSize: u(24), letterSpacing: u(4) }}>RÉPUBLIQUE FRANÇAISE</div>
          <div style={labelAdmin}>PASSEPORT</div>
        </div>
        <div className="mt-[calc(12*var(--u))] grid" style={{ gridTemplateColumns: "38% 62%", gap: u(14) }}>
          <div style={{ height: u(96), background: "#dccfa4", border: `${u(2)} solid #2b2622`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: u(8), color: "#6b5a46" }}>
            PHOTO
          </div>
          <div style={{ lineHeight: 1 }}>
            <div style={fieldAdmin}>NOM : {nom}</div>
            <div style={fieldAdmin}>PRÉNOMS : {prenoms}</div>
            <div style={fieldAdmin}>NAISSANCE : {naissance}</div>
            <div style={fieldAdmin}>SEXE : M</div>
            <div style={fieldAdmin}>N° : {numero}</div>
            <div style={fieldAdmin}>DÉLIVRÉ LE 14 OCTOBRE 1987</div>
            <div style={fieldAdmin}>VALABLE JUSQU'AU 13 OCTOBRE 1997</div>
          </div>
        </div>
        <div className="mt-[calc(12*var(--u))] flex justify-between" style={{ fontSize: u(9) }}>
          <span style={{ fontFamily: F.type }}>MINISTÈRE DES AFFAIRES ÉTRANGÈRES</span>
          <span style={{ fontFamily: F.type }}>PREFECTURE DE POLICE</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  7. Certificat de scolarité                                        */
/* ------------------------------------------------------------------ */

export function CertificatScolarite({ personnalisation }: { personnalisation?: Record<string, string> }) {
  const eleve = personnalisation?.eleve ?? "SOPHIE DUPONT";
  const classe = personnalisation?.classe ?? "SECONDE C";
  const annee = personnalisation?.annee ?? "1985-1986";
  return (
    <div className="paper edge-soft h-full w-full" style={{ ...paperBg("#faf7ef", "#efe6d9", "#e1d2c3"), color: "#2b2622" }}>
      <div className="absolute ink-worn" style={{ inset: u(12), border: `${u(3)} double #3a2d1b`, padding: `${u(20)} ${u(24)}` }}>
        <div className="flex justify-between"><div style={labelAdmin}>{personnalisation?.emetteur ?? "MINISTÈRE DE L'ÉDUCATION NATIONALE"}</div><div style={labelAdmin}>{personnalisation?.etablissement ?? "LYCÉE HENRI IV"}</div></div>
        <div style={{ fontFamily: F.bebas, fontSize: u(34), letterSpacing: u(2), lineHeight: 1, margin: `${u(8)} 0` }}>{personnalisation?.titre ?? "CERTIFICAT DE SCOLARITÉ"}</div>
        {tableauLigne([
          { label: personnalisation?.labelEleve ?? "ÉLÈVE", valeur: eleve, grow: 2 },
          { label: "CLASSE", valeur: classe, grow: 1 },
          { label: "ANNÉE", valeur: annee, grow: 1 },
        ])}
        <div className="mt-[calc(10*var(--u))] flex justify-between" style={{ fontSize: u(10) }}>
          <span style={{ fontFamily: F.type }}>{personnalisation?.note ?? "LE CHEF D'ÉTABLISSEMENT"}</span>
          <span style={{ fontFamily: F.type }}>LE 10 SEPTEMBRE 1985</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  8. Livret de famille (couverture)                                 */
/* ------------------------------------------------------------------ */

export function LivretFamille({ personnalisation }: { personnalisation?: Record<string, string> }) {
  const nom1 = personnalisation?.nom1 ?? "DURAND";
  const nom2 = personnalisation?.nom2 ?? "MARTIN";
  return (
    <div className="paper paper-heavy-age edge-soft h-full w-full" style={{ ...paperBg("#dccfa4", "#cbb58c", "#bca074"), color: "#4a2f1a" }}>
      <div className="absolute ink-worn" style={{ inset: u(14), border: `${u(5)} double #4a2f1a`, textAlign: "center", padding: `${u(30)} ${u(26)}` }}>
        <div style={{ fontFamily: F.cinzel, fontWeight: 700, fontSize: u(15), letterSpacing: u(5) }}>RÉPUBLIQUE FRANÇAISE</div>
        <div style={{ fontFamily: F.script, fontSize: u(62), lineHeight: 1, margin: `${u(14)} 0` }}>LIVRET DE FAMILLE</div>
        <div style={{ height: u(2), background: "#4a2f1a", margin: `${u(12)} auto`, width: "60%" }} />
        <div style={{ fontFamily: F.type, fontSize: u(12), letterSpacing: u(2) }}>{nom1}<br />{nom2}</div>
        <div style={{ fontSize: u(24), marginTop: u(4) }}>❦</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  9. Déclaration de revenus (formulaire admin)                      */
/* ------------------------------------------------------------------ */

export function DeclarationRevenus({ personnalisation }: { personnalisation?: Record<string, string> }) {
  const salaries = personnalisation?.salaries ?? "0,00 F";
  const commerciaux = personnalisation?.commerciaux ?? "0,00 F";
  const liberales = personnalisation?.liberales ?? "0,00 F";
  const agricoles = personnalisation?.agricoles ?? "0,00 F";
  const total = personnalisation?.total ?? "0,00 F";
  return (
    <div className="paper edge-zigzag-b h-full w-full" style={{ ...paperBg("#f4f0e4", "#eae2cf", "#ddd7bd"), "--z": u(7), color: "#2b2622" } as CSSProperties}>
      <div className="absolute inset-0 ink-worn" style={{ padding: `${u(16)} ${u(20)}` }}>
        <div className="flex justify-between">
          <div style={labelAdmin}>ADMINISTRATION DES FINANCES</div>
          <div style={labelAdmin}>2047</div>
        </div>
        <div style={{ fontFamily: F.bebas, fontSize: u(30), letterSpacing: u(2), lineHeight: 1, margin: `${u(8)} 0` }}>DÉCLARATION DE REVENUS</div>
        {[
          { label: "SALARIÉS", valeur: salaries },
          { label: "INDUSTRIELS ET COMMERCIAUX", valeur: commerciaux },
          { label: "PROFESSIONS LIBÉRALES", valeur: liberales },
          { label: "AGRICOLES", valeur: agricoles },
        ].map((t) => (
          <div key={t.label} className="flex items-center" style={{ borderTop: `${u(1)} solid rgba(43,38,34,.4)`, padding: `${u(6)} 0`, fontFamily: F.type, fontSize: u(10.5), lineHeight: 1.4 }}>
            <span style={{ flex: 1 }}>{t.label}</span>
            <span style={{ fontFamily: F.mono, fontSize: u(10), opacity: 0.7 }}>{t.valeur}</span>
          </div>
        ))}
        <div className="mt-[calc(8*var(--u))] flex justify-between" style={{ fontSize: u(11), fontWeight: 700 }}>
          <span style={{ fontFamily: F.type }}>TOTAL GÉNÉRAL</span>
          <span style={{ fontFamily: F.type }}>{total}</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  10. Permis de conduire                                            */
/* ------------------------------------------------------------------ */

export function PermisConduire({ personnalisation }: { personnalisation?: Record<string, string> }) {
  const nom = personnalisation?.nom ?? "ROUSSEAU";
  const prenoms = personnalisation?.prenoms ?? "MARIE-HELENE";
  const naissance = personnalisation?.naissance ?? "22 AOÛT 1949 - LILLE";
  const numero = personnalisation?.numero ?? "54-12387";
  return (
    <div className="paper edge-notch h-full w-full" style={{ ...paperBg("#f3ece2", "#e7dcc6", "#dbcfae"), "--notch": u(16), color: "#2b2622" } as CSSProperties}>
      <div className="absolute ink-worn" style={{ inset: u(12), border: `${u(4)} double #4a3a22`, padding: `${u(16)} ${u(22)}` }}>
        <div className="flex items-center justify-between">
          <div style={{ fontFamily: F.bebas, fontSize: u(16), letterSpacing: u(2) }}>PREFECTURE DE POLICE</div>
          <div style={labelAdmin}>PERMIS DE CONDUIRE</div>
        </div>
        <div className="mt-[calc(8*var(--u))] flex">
          <div style={{ width: "38%", height: u(74), background: "#dccfa4", border: `${u(1)} solid #2b2622`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: u(8), color: "#6b5a46" }}>
            PHOTO
          </div>
          <div className="flex-1" style={{ lineHeight: 1 }}>
            <div style={fieldAdmin}>NOM : {nom}</div>
            <div style={fieldAdmin}>PRÉNOMS : {prenoms}</div>
            <div style={fieldAdmin}>NAISSANCE : {naissance}</div>
            <div style={fieldAdmin}>CATÉGORIE : B</div>
            <div style={fieldAdmin}>N° : {numero}</div>
          </div>
        </div>
        <div className="mt-[calc(10*var(--u))] flex justify-between" style={{ fontSize: u(9.5) }}>
          <span style={{ fontFamily: F.type }}>DÉLIVRÉ LE 5 MARS 1974</span>
          <span style={{ fontFamily: F.type }}>EXPIRE LE 4 MARS 1984</span>
        </div>
      </div>
    </div>
  );
}
