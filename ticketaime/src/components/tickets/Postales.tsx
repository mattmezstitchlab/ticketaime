import type { CSSProperties } from "react";
import { u } from "../../lib/units";
import { F } from "../../lib/fonts";
import { paperBg } from "../../lib/paper";

/* ------------------------------------------------------------------ */
/*  Helpers carte postale                                             */
/* ------------------------------------------------------------------ */


const versoLabel: CSSProperties = {
  fontFamily: F.cond,
  fontWeight: 600,
  fontSize: u(9),
  letterSpacing: u(2),
  textTransform: "uppercase",
  color: "#4a3a22",
  marginBottom: u(3),
};

/* ------------------------------------------------------------------ */
/*  1. Carte postale - bord de mer                                    */
/* ------------------------------------------------------------------ */

export function CarteMer({ personnalisation }: { personnalisation?: Record<string, string> }) {
  const message = personnalisation?.message ?? "Chère Maman, Le soleil brille sur la plage. À bientôt, Luc";
  const destinataire = personnalisation?.destinataire ?? "MLLE DURAND";
  return (
    <div className="paper edge-soft h-full w-full" style={{ ...paperBg("#f4ead6", "#e7d7c0", "#d7c7ad"), color: "#2b2622" }}>
      <div className="absolute ink-worn" style={{ inset: u(14), border: `${u(2)} solid #6b5a46`, padding: `${u(16)} ${u(20)}` }}>
        {/* recto */}
        <div className="relative" style={{ height: u(95) }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #a8d8ea 0%, #7fb3d5 60%, #1e4d8c 100%)", borderRadius: u(2) }} />
          <div style={{ position: "absolute", bottom: u(4), left: u(6), right: u(6), height: u(14), background: "#e8b85c", borderRadius: u(2) }} />
          <div style={{ position: "absolute", left: u(8), bottom: u(10), width: u(16), height: u(6), background: "#dccfa4", borderRadius: u(1) }} />
          <div style={{ position: "absolute", right: u(8), bottom: u(10), width: u(14), height: u(5), background: "#dccfa4", borderRadius: u(1) }} />
          <div style={{ position: "absolute", top: u(8), right: u(8), width: u(24), height: u(6), background: "#e8e2cd", borderRadius: u(1), opacity: 0.9 }} />
        </div>
        <div className="mt-[calc(8*var(--u))] grid grid-cols-2 gap-[calc(14*var(--u))]">
          <div style={{ fontFamily: F.script, fontSize: u(20), lineHeight: 1.25, whiteSpace: "pre-line", transform: "rotate(-3deg)" }}>{message}</div>
          <div>
            <div style={versoLabel}>CORRESPONDANCE</div>
            <div style={{ fontFamily: F.type, fontSize: u(9), lineHeight: 1.5 }}>{destinataire}<br />24 RUE DE RIVOLI<br />75004 PARIS</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  2. Carte postale - monument (Tour Eiffel)                         */
/* ------------------------------------------------------------------ */

export function CarteTourEiffel({ personnalisation }: { personnalisation?: Record<string, string> }) {
  const message = personnalisation?.message ?? "Bonjour de Paris, La tour est magnifique. Paul";
  const destinataire = personnalisation?.destinataire ?? "MME MARTIN";
  return (
    <div className="paper edge-soft h-full w-full" style={{ ...paperBg("#f7f1e2", "#eadcc4", "#dbcfae"), color: "#2b2622" }}>
      <div className="absolute ink-worn" style={{ inset: u(14), border: `${u(2)} solid #6b5a46`, padding: `${u(16)} ${u(20)}` }}>
        <div className="relative" style={{ height: u(95) }}>
          <div style={{ position: "absolute", inset: 0, background: "#f7f1e2", borderRadius: u(2) }} />
          <div style={{ position: "absolute", left: "50%", top: u(6), transform: "translateX(-50%)", width: u(6), height: u(46), background: "#dccfa4" }} />
          <div style={{ position: "absolute", left: "50%", top: u(46), transform: "translateX(-50%)", width: u(34), height: u(10), background: "#dccfa4" }} />
          <div style={{ position: "absolute", left: "50%", top: u(56), transform: "translateX(-50%)", width: u(14), height: u(8), background: "#dccfa4" }} />
          <div style={{ position: "absolute", top: u(8), right: u(10), width: u(20), height: u(5), background: "#dccfa4", opacity: 0.8 }} />
        </div>
        <div className="mt-[calc(8*var(--u))] grid grid-cols-2 gap-[calc(14*var(--u))]">
          <div style={{ fontFamily: F.script, fontSize: u(20), lineHeight: 1.25, whiteSpace: "pre-line", transform: "rotate(3deg)" }}>{message}</div>
          <div>
            <div style={versoLabel}>CARTE POSTALE</div>
            <div style={{ fontFamily: F.type, fontSize: u(9), lineHeight: 1.5 }}>{destinataire}<br />12 PLACE DE L'OPÉRA<br />75009 PARIS</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  3. Carte postale - montagne                                       */
/* ------------------------------------------------------------------ */

export function CarteMontagne() {
  return (
    <div className="paper edge-soft h-full w-full" style={{ ...paperBg("#f4ead6", "#e7d7c0", "#d7c7ad"), color: "#2b2622" }}>
      <div className="absolute ink-worn" style={{ inset: u(14), border: `${u(2)} solid #6b5a46`, padding: `${u(16)} ${u(20)}` }}>
        <div className="relative" style={{ height: u(95) }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #d4e4bc 0%, #7fa05a 50%, #2d5a27 100%)", borderRadius: u(2) }} />
          <div style={{ position: "absolute", top: u(4), left: u(10), right: u(10), height: u(28), background: "#e8e2cd", borderRadius: `${u(10)} ${u(10)} 0 0` }} />
          <div style={{ position: "absolute", top: u(32), left: u(6), right: u(6), height: u(18), background: "#e8b85c", borderRadius: u(2) }} />
          <div style={{ position: "absolute", bottom: u(4), left: u(6), right: u(6), height: u(8), background: "#a8d8ea", opacity: 0.7 }} />
        </div>
        <div className="mt-[calc(8*var(--u))] grid grid-cols-2 gap-[calc(14*var(--u))]">
          <div style={{ fontFamily: F.script, fontSize: u(20), lineHeight: 1.25, whiteSpace: "pre-line", transform: "rotate(-2deg)" }}>
            Air pur,<br />
            paysages superbes.<br />
            Claire
          </div>
          <div>
            <div style={versoLabel}>SOUVENIR</div>
            <div style={{ fontFamily: F.type, fontSize: u(9), lineHeight: 1.5 }}>
              MLLE LEROUX<br />8 RUE DES LILAS<br />69003 LYON
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  4. Carte postale - humour                                         */
/* ------------------------------------------------------------------ */

export function CarteHumour({ personnalisation }: { personnalisation?: Record<string, string> }) {
  const rouge = "#b73e34";
  const titre = personnalisation?.titre ?? "CARTES POSTALES\nEN VACANCES";
  const destinataire = personnalisation?.destinataire ?? "M. PETIT";
  return (
    <div className="paper edge-perf h-full w-full" style={{ ...paperBg("#fdece3", "#f5d8cf", "#ecc4bc"), "--perf": u(9), color: rouge } as CSSProperties}>
      <div className="absolute ink-worn" style={{ inset: u(14), border: `${u(2)} solid ${rouge}`, opacity: 0.9 }}>
        <div className="relative" style={{ height: u(95) }}>
          <div style={{ position: "absolute", inset: 0, background: "#fdece3", borderRadius: u(2) }} />
          <div style={{ position: "absolute", left: u(8), top: u(8), width: u(14), height: u(14), background: rouge, borderRadius: "50%" }} />
          <div style={{ position: "absolute", right: u(8), top: u(8), width: u(14), height: u(14), background: rouge, borderRadius: "50%" }} />
          <div style={{ position: "absolute", bottom: u(8), left: u(8), width: u(14), height: u(14), background: rouge, borderRadius: "50%" }} />
          <div style={{ position: "absolute", bottom: u(8), right: u(8), width: u(14), height: u(14), background: rouge, borderRadius: "50%" }} />
          <div style={{ position: "absolute", top: u(4), left: u(4), right: u(4), height: u(2), background: rouge }} />
          <div style={{ position: "absolute", bottom: u(4), left: u(4), right: u(4), height: u(2), background: rouge }} />
        </div>
        <div className="mt-[calc(8*var(--u))] grid grid-cols-2 gap-[calc(14*var(--u))]">
          <div style={{ fontFamily: F.display, fontSize: u(22), lineHeight: 1.2, textAlign: "center", color: rouge }}>{titre}</div>
          <div>
            <div style={versoLabel}>AMITIÉS</div>
            <div style={{ fontFamily: F.type, fontSize: u(9), lineHeight: 1.5 }}>{destinataire}<br />3 AV. DE LA RÉPUBLIQUE<br />13001 MARSEILLE</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  5. Carte postale - ville ancienne                                 */
/* ------------------------------------------------------------------ */

export function CarteVille({ personnalisation }: { personnalisation?: Record<string, string> }) {
  const brun = "#6b4423";
  const message = personnalisation?.message ?? "Vieux quartiers, pavés et histoires. Marc";
  const destinataire = personnalisation?.destinataire ?? "MME LEFEBVRE";
  return (
    <div className="paper edge-soft h-full w-full" style={{ ...paperBg("#efe6d8", "#e6d8c2", "#d7c8ad"), color: brun }}>
      <div className="absolute ink-worn" style={{ inset: u(14), border: `${u(2)} solid ${brun}`, padding: `${u(16)} ${u(20)}` }}>
        <div className="relative" style={{ height: u(95) }}>
          <div style={{ position: "absolute", inset: 0, background: "#efe6d8", borderRadius: u(2) }} />
          <div style={{ position: "absolute", top: u(8), left: u(8), right: u(8), bottom: u(8), border: `${u(1)} solid rgba(107,68,35,.3)`, borderRadius: u(2) }} />
          <div style={{ position: "absolute", top: u(14), left: u(14), width: u(10), height: u(14), background: "#dccfa4" }} />
          <div style={{ position: "absolute", top: u(14), right: u(14), width: u(10), height: u(14), background: "#dccfa4" }} />
          <div style={{ position: "absolute", bottom: u(14), left: u(14), width: u(10), height: u(14), background: "#dccfa4" }} />
          <div style={{ position: "absolute", bottom: u(14), right: u(14), width: u(10), height: u(14), background: "#dccfa4" }} />
        </div>
        <div className="mt-[calc(8*var(--u))] grid grid-cols-2 gap-[calc(14*var(--u))]">
          <div style={{ fontFamily: F.script, fontSize: u(20), lineHeight: 1.25, whiteSpace: "pre-line", transform: "rotate(-3deg)" }}>{message}</div>
          <div>
            <div style={versoLabel}>CORRESPONDANCE</div>
            <div style={{ fontFamily: F.type, fontSize: u(9), lineHeight: 1.5 }}>{destinataire}<br />22 RUE DES HALLES<br />31000 TOULOUSE</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  6. Carte postale - campagne                                       */
/* ------------------------------------------------------------------ */

export function CarteCampagne({ personnalisation }: { personnalisation?: Record<string, string> }) {
  const vert = "#2d5a27";
  const message = personnalisation?.message ?? "Bonjour de la ferme, les champs sont verts. Sophie";
  const destinataire = personnalisation?.destinataire ?? "M. BERNARD";
  return (
    <div className="paper edge-soft h-full w-full" style={{ ...paperBg("#f4ead6", "#e7d7c0", "#d7c7ad"), color: vert }}>
      <div className="absolute ink-worn" style={{ inset: u(14), border: `${u(2)} solid ${vert}`, padding: `${u(16)} ${u(20)}` }}>
        <div className="relative" style={{ height: u(95) }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #d4e4bc 0%, #7fa05a 40%, #2d5a27 100%)", borderRadius: u(2) }} />
          <div style={{ position: "absolute", top: u(6), left: u(6), right: u(6), height: u(30), background: "#e8e2cd", borderRadius: `${u(10)} ${u(10)} 0 0` }} />
          <div style={{ position: "absolute", top: u(36), left: u(10), width: u(8), height: u(20), background: "#a8d8ea" }} />
          <div style={{ position: "absolute", bottom: u(4), left: u(10), right: u(10), height: u(8), background: "#e8b85c", opacity: 0.8 }} />
        </div>
        <div className="mt-[calc(8*var(--u))] grid grid-cols-2 gap-[calc(14*var(--u))]">
          <div style={{ fontFamily: F.script, fontSize: u(20), lineHeight: 1.25, whiteSpace: "pre-line", transform: "rotate(2deg)" }}>{message}</div>
          <div>
            <div style={versoLabel}>CAMPAGNE</div>
            <div style={{ fontFamily: F.type, fontSize: u(9), lineHeight: 1.5 }}>{destinataire}<br />5 RUE DU MOULIN<br />45000 ORLÉANS</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  7. Carte postale - anniversaire                                   */
/* ------------------------------------------------------------------ */

export function CarteAnniversaire({ personnalisation }: { personnalisation?: Record<string, string> }) {
  const rose = "#b76e79";
  const message = personnalisation?.message ?? "Joyeux anniversaire, plein de bisous. Tom";
  const destinataire = personnalisation?.destinataire ?? "MME DUVAL";
  return (
    <div className="paper edge-soft h-full w-full" style={{ ...paperBg("#fdece3", "#f5d8cf", "#ecc4bc"), color: rose }}>
      <div className="absolute ink-worn" style={{ inset: u(14), border: `${u(2)} solid ${rose}`, padding: `${u(16)} ${u(20)}` }}>
        <div className="relative" style={{ height: u(95) }}>
          <div style={{ position: "absolute", inset: 0, background: "#fdece3", borderRadius: u(2) }} />
          <div style={{ position: "absolute", top: u(6), left: u(6), right: u(6), height: u(22), background: "#dccfa4", borderRadius: u(4) }} />
          <div style={{ position: "absolute", top: u(32), left: u(6), right: u(6), height: u(2), background: rose }} />
          <div style={{ position: "absolute", bottom: u(8), left: u(8), width: u(10), height: u(10), background: "#dccfa4", borderRadius: "50%" }} />
          <div style={{ position: "absolute", bottom: u(8), right: u(8), width: u(10), height: u(10), background: "#dccfa4", borderRadius: "50%" }} />
        </div>
        <div className="mt-[calc(8*var(--u))] grid grid-cols-2 gap-[calc(14*var(--u))]">
          <div style={{ fontFamily: F.script, fontSize: u(20), lineHeight: 1.25, whiteSpace: "pre-line", transform: "rotate(-3deg)" }}>{message}</div>
          <div>
            <div style={versoLabel}>ANNIVERSAIRE</div>
            <div style={{ fontFamily: F.type, fontSize: u(9), lineHeight: 1.5 }}>{destinataire}<br />7 RUE DES FLEURS<br />44000 NANTES</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  8. Carte postale - exposition                                     */
/* ------------------------------------------------------------------ */

export function CarteExposition({ personnalisation }: { personnalisation?: Record<string, string> }) {
  const bleu = "#1e4d8c";
  const message = personnalisation?.message ?? "Magnifique musée, œuvres surprenantes. Clara";
  const destinataire = personnalisation?.destinataire ?? "MLLE MOREAU";
  return (
    <div className="paper edge-soft h-full w-full" style={{ ...paperBg("#f0e8d6", "#e6dbc2", "#d7cdad"), color: bleu }}>
      <div className="absolute ink-worn" style={{ inset: u(14), border: `${u(2)} solid ${bleu}`, padding: `${u(16)} ${u(20)}` }}>
        <div className="relative" style={{ height: u(95) }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #e8e2cd 0%, #d7c7ad 60%, #2d5a27 100%)", borderRadius: u(2) }} />
          <div style={{ position: "absolute", top: u(6), left: u(6), right: u(6), height: u(24), background: "#fdece3", borderRadius: u(2) }} />
          <div style={{ position: "absolute", bottom: u(6), left: u(6), right: u(6), height: u(10), background: "#dccfa4" }} />
        </div>
        <div className="mt-[calc(8*var(--u))] grid grid-cols-2 gap-[calc(14*var(--u))]">
          <div style={{ fontFamily: F.script, fontSize: u(20), lineHeight: 1.25, whiteSpace: "pre-line", transform: "rotate(3deg)" }}>{message}</div>
          <div>
            <div style={versoLabel}>MUSÉE</div>
            <div style={{ fontFamily: F.type, fontSize: u(9), lineHeight: 1.5 }}>{destinataire}<br />11 RUE DE LA VIEILLE TEMPLE<br />75003 PARIS</div>
          </div>
        </div>
      </div>
    </div>
  );
}
