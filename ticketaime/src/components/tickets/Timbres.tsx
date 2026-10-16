import type { CSSProperties } from "react";
import { u } from "../../lib/units";
import { F } from "../../lib/fonts";
import { paperBg } from "../../lib/paper";

/* ------------------------------------------------------------------ */
/*  1. Timbre-poste Marianne                                          */
/* ------------------------------------------------------------------ */

export function TimbreMarianne({ personnalisation }: { personnalisation?: Record<string, string> }) {
  const rouge = "#c7443f";
  const valeur = personnalisation?.valeur ?? "1,20 F";
  return (
    <div className="paper edge-perf h-full w-full" style={{ ...paperBg("#fdece3", "#f5d8cf", "#ecc4bc"), "--perf": u(10) } as CSSProperties}>
      <div className="absolute ink-worn" style={{ inset: u(14), border: `${u(2)} solid ${rouge}`, opacity: 0.9 }}>
        <div style={{ fontFamily: F.stat, fontSize: u(15), letterSpacing: u(4), color: rouge, lineHeight: 1, marginBottom: u(10) }}>FRANCE</div>
        <div className="relative" style={{ width: u(90), height: u(100), margin: "0 auto" }}>
          <svg viewBox="0 0 100 120" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
            <path d="M50 10 Q65 20 70 40 L50 60 L30 40 Q35 20 50 10 Z" fill="#f2e6d2" />
            <path d="M50 10 Q40 25 35 45 L50 65 L65 45 Q60 25 50 10 Z" fill="none" stroke={rouge} strokeWidth="2" />
            <circle cx="50" cy="50" r="14" fill="none" stroke={rouge} strokeWidth="3" />
            <path d="M50 36 Q55 42 50 48 Q45 42 50 36 Z" fill={rouge} />
          </svg>
          <div className="absolute bottom-0 left-0 w-full" style={{ bottom: u(6), textAlign: "center", fontFamily: F.type, fontSize: u(10), color: rouge }}>
            {valeur}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  2. Timbre fiscal                                                  */
/* ------------------------------------------------------------------ */

export function TimbreFiscal({ personnalisation }: { personnalisation?: Record<string, string> }) {
  const vert = "#2e6b4f";
  const valeur = personnalisation?.valeur ?? "10 F";
  return (
    <div className="paper edge-perf h-full w-full" style={{ ...paperBg("#e8eadf", "#d9ded2", "#c7ccbd"), "--perf": u(9), color: vert } as CSSProperties}>
      <div className="absolute ink-worn" style={{ inset: u(12), border: `${u(3)} solid ${vert}` }}>
        <div className="flex items-center justify-between" style={{ marginBottom: u(10) }}>
          <div style={{ fontFamily: F.stat, fontSize: u(16), letterSpacing: u(3), color: vert }}>REPUBLIQUE FRANCAISE</div>
          <div style={{ fontFamily: F.stat, fontSize: u(16), letterSpacing: u(3), color: vert }}>TIMBRE FISCAL</div>
        </div>
        <div style={{ fontFamily: F.bebas, fontSize: u(70), letterSpacing: u(4), color: vert, lineHeight: 1, textAlign: "center" }}>{valeur}</div>
        <div className="text-center" style={{ marginTop: u(10), fontFamily: F.type, fontSize: u(10), color: vert, opacity: 0.85 }}>
          TIMBRE À DATE - PERÇÉ
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  3. Timbre de collection - oiseau                                  */
/* ------------------------------------------------------------------ */

export function TimbreOiseau({ personnalisation }: { personnalisation?: Record<string, string> }) {
  const bleu = "#1f4e79";
  const jaune = "#e8b33b";
  const valeur = personnalisation?.valeur ?? "0,90 F";
  const annee = personnalisation?.annee ?? "1982";
  return (
    <div className="paper edge-perf h-full w-full" style={{ ...paperBg("#f3e8d6", "#eadbc2", "#dfcdab"), "--perf": u(11), color: bleu } as CSSProperties}>
      <div className="absolute ink-worn" style={{ inset: u(16), border: `${u(2)} solid ${bleu}` }}>
        <div style={{ fontFamily: F.stat, fontSize: u(11), letterSpacing: u(2), color: bleu, lineHeight: 1, textAlign: "center", marginBottom: u(8) }}>FAUNE Sauvage</div>
        <svg viewBox="0 0 140 100" aria-hidden="true" style={{ width: u(108), height: u(80), margin: "0 auto" }}>
          <path d="M20 40 Q50 30 80 40 T120 30 L110 50 Q90 55 70 45 Q50 55 30 50 Z" fill={jaune} />
          <path d="M80 40 Q100 35 110 45 T120 30 L110 50 Q100 55 80 45 Z" fill={bleu} opacity="0.85" />
          <circle cx="85" cy="38" r="2.5" fill="#2b2622" />
          <path d="M55 42 Q55 30 70 30 Q85 30 85 42" stroke={jaune} strokeWidth="3" fill="none" />
        </svg>
        <div className="flex justify-between" style={{ marginTop: u(10), fontFamily: F.type, fontSize: u(10), color: bleu }}>
          <span>{valeur}</span>
          <span>{annee}</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  4. Timbre de collection - monument                                */
/* ------------------------------------------------------------------ */

export function TimbreMonument({ personnalisation }: { personnalisation?: Record<string, string> }) {
  const rouge = "#b73e34";
  const valeur = personnalisation?.valeur ?? "1,50 F";
  const nom = personnalisation?.nom ?? "TOUR EIFFEL";
  return (
    <div className="paper edge-perf h-full w-full" style={{ ...paperBg("#efe6d8", "#e6d8c2", "#d7c8ad"), "--perf": u(10), color: rouge } as CSSProperties}>
      <div className="absolute ink-worn" style={{ inset: u(16), border: `${u(2)} solid ${rouge}` }}>
        <div className="flex items-center justify-between" style={{ marginBottom: u(8) }}>
          <div style={{ fontFamily: F.stat, fontSize: u(10), letterSpacing: u(2), color: rouge }}>MONUMENTS</div>
          <div style={{ fontFamily: F.stat, fontSize: u(10), letterSpacing: u(2), color: rouge }}>HISTORIQUES</div>
        </div>
        <svg viewBox="0 0 100 100" aria-hidden="true" style={{ width: u(88), height: u(88), margin: "0 auto" }}>
          <path d="M50 10 L90 60 L50 100 L10 60 Z" fill="#dccfa4" stroke={rouge} strokeWidth="2" />
          <path d="M50 100 L50 10 M30 50 L70 50 M25 65 L75 65" stroke={rouge} strokeWidth="1.5" />
          <rect x="30" y="40" width="10" height="20" fill={rouge} />
          <rect x="60" y="40" width="10" height="20" fill={rouge} />
          <rect x="45" y="60" width="10" height="20" fill={rouge} />
        </svg>
        <div className="flex justify-between" style={{ marginTop: u(10), fontFamily: F.type, fontSize: u(10), color: rouge }}>
          <span>{valeur}</span>
          <span>{nom}</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  5. Carnet de timbres                                              */
/* ------------------------------------------------------------------ */

export function CarnetTimbres({ personnalisation }: { personnalisation?: Record<string, string> }) {
  const rouge = "#c7443f";
  const total = personnalisation?.total ?? "6 F";
  return (
    <div className="paper edge-perf h-full w-full" style={{ ...paperBg("#f4eadd", "#e8d8c0", "#d9c8ac"), "--perf": u(8), color: rouge } as CSSProperties}>
      <div className="absolute ink-worn" style={{ inset: u(10), border: `${u(2)} solid ${rouge}` }}>
        <div style={{ fontFamily: F.stat, fontSize: u(13), letterSpacing: u(3), color: rouge, lineHeight: 1, textAlign: "center", marginBottom: u(8) }}>CARNET DE TIMBRES</div>
        <div className="flex flex-wrap justify-center gap-[calc(6*var(--u))]" style={{ fontFamily: F.type, fontSize: u(9), color: rouge }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} style={{ width: u(22), height: u(26), border: `${u(1)} solid ${rouge}`, background: i % 2 === 0 ? "#fdece3" : "transparent" }} />
          ))}
        </div>
        <div className="text-center" style={{ marginTop: u(10), fontFamily: F.type, fontSize: u(10), color: rouge, opacity: 0.8 }}>
          10 TIMBRES - TOTAL {total}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  6. Enveloppe pré-timbrée                                          */
/* ------------------------------------------------------------------ */

export function EnveloppePreTimbre({ personnalisation }: { personnalisation?: Record<string, string> }) {
  const bleu = "#2d5a8a";
  const valeur = personnalisation?.valeur ?? "0,80";
  return (
    <div className="paper edge-soft h-full w-full" style={{ ...paperBg("#f5efe4", "#e8dfc8", "#d7cbb2"), color: bleu }}>
      <div className="absolute ink-worn" style={{ inset: u(12), border: `${u(2)} solid ${bleu}`, padding: `${u(16)} ${u(20)}` }}>
        <div className="flex justify-between">
          <div style={{ fontFamily: F.stat, fontSize: u(10), letterSpacing: u(2), color: bleu }}>EXPÉDITEUR</div>
          <div style={{ fontFamily: F.stat, fontSize: u(10), letterSpacing: u(2), color: bleu }}>DESTINATAIRE</div>
        </div>
        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", marginTop: u(6) }}>
          <div>
            <div style={{ fontFamily: F.type, fontSize: u(9), lineHeight: 1.4 }}>M. JEAN MARTIN<br />15 RUE DE LYON<br />75012 PARIS</div>
          </div>
          <div>
            <div style={{ fontFamily: F.type, fontSize: u(9), lineHeight: 1.4 }}>MME SOPHIE DURAND<br />8 AVENUE DES CHAMPS<br />75008 PARIS</div>
          </div>
        </div>
        <div className="absolute right-[calc(10*var(--u))] top-[calc(10*var(--u))]" style={{ width: u(40), height: u(40), background: "#fdece3", border: `${u(2)} solid ${bleu}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.stat, fontSize: u(12), fontWeight: 700, color: bleu }}>
          {valeur}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  7. Taxe de timbre                                                 */
/* ------------------------------------------------------------------ */

export function TaxeTimbre({ personnalisation }: { personnalisation?: Record<string, string> }) {
  const brun = "#6b4423";
  const valeur = personnalisation?.valeur ?? "50 c";
  return (
    <div className="paper edge-perf h-full w-full" style={{ ...paperBg("#eaddbf", "#dccaa6", "#cdb98f"), "--perf": u(9), color: brun } as CSSProperties}>
      <div className="absolute ink-worn" style={{ inset: u(12), border: `${u(3)} solid ${brun}` }}>
        <div className="flex items-center justify-between" style={{ marginBottom: u(8) }}>
          <div style={{ fontFamily: F.stat, fontSize: u(12), letterSpacing: u(2), color: brun }}>TAXE</div>
          <div style={{ fontFamily: F.stat, fontSize: u(12), letterSpacing: u(2), color: brun }}>TIMBRE</div>
        </div>
        <div style={{ fontFamily: F.bebas, fontSize: u(55), letterSpacing: u(5), color: brun, lineHeight: 1, textAlign: "center" }}>{valeur}</div>
        <div className="text-center" style={{ marginTop: u(8), fontFamily: F.type, fontSize: u(9.5), color: brun }}>
          TIMBRE MOBILE - 1958
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  8. Timbre aérien                                                  */
/* ------------------------------------------------------------------ */

export function TimbreAerien({ personnalisation }: { personnalisation?: Record<string, string> }) {
  const bleu = "#1e4d8c";
  const rouge = "#c7443f";
  const valeur = personnalisation?.valeur ?? "2,40 F";
  return (
    <div className="paper edge-perf h-full w-full" style={{ ...paperBg("#f0e8d6", "#e6dbc2", "#d7cdad"), "--perf": u(10), color: bleu } as CSSProperties}>
      <div className="absolute ink-worn" style={{ inset: u(14), border: `${u(2)} solid ${bleu}` }}>
        <div style={{ fontFamily: F.stat, fontSize: u(10), letterSpacing: u(2), color: bleu, lineHeight: 1, textAlign: "center", marginBottom: u(8) }}>PAR AVION</div>
        <svg viewBox="0 0 100 80" aria-hidden="true" style={{ width: u(80), height: u(65), margin: "0 auto" }}>
          <path d="M15 35 Q40 25 65 35 Q90 45 85 55 L45 50 Q25 50 15 35 Z" fill="#dccfa4" />
          <path d="M45 35 Q55 25 65 35 M65 35 Q75 45 65 55 M45 35 Q35 45 45 55" stroke={rouge} strokeWidth="2" fill="none" />
          <circle cx="55" cy="45" r="2" fill={rouge} />
        </svg>
        <div className="flex justify-between" style={{ marginTop: u(10), fontFamily: F.type, fontSize: u(10), color: bleu }}>
          <span>{valeur}</span>
          <span>AÉRIEN</span>
        </div>
      </div>
    </div>
  );
}
