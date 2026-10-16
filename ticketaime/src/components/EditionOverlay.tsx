import { useEffect, useState } from "react";
import {
  EDITIONS,
  IDEES,
  bandeauMariage,
  compteARebours,
  formaterRestant,
  rubanMariage,
  voileMariage,
  type EditionDef,
} from "../data/editions";

interface EditionOverlayProps {
  edition: EditionDef;
  categorie: string;
  /** Rendu compact (incrusté sur la pièce) vs panneau */
  compact?: boolean;
}

/**
 * Surimpression d'édition : transforme n'importe quelle pièce en pièce
 * d'événement (mariage). Le compte à rebours est réel et se met à jour
 * chaque seconde lorsque le RSVP est validé.
 */
export default function EditionOverlay({ edition, categorie, compact = false }: EditionOverlayProps) {
  const [restant, setRestant] = useState(() => compteARebours(edition.rsvp[1]?.valeur ?? new Date().toISOString()));

  useEffect(() => {
    if (!edition.compteARebours) return;
    const id = window.setInterval(() => {
      setRestant(compteARebours(edition.rsvp[1]?.valeur ?? new Date().toISOString()));
    }, 1000);
    return () => window.clearInterval(id);
  }, [edition]);

  if (edition.id !== "mariage") return null;

  const idee = IDEES[categorie];
  const champ = (cle: string) => edition.rsvp.find((c) => c.cle === cle)?.valeur ?? "";

  if (compact) {
    return (
      <>
        <div style={voileMariage} />
        <div style={rubanMariage(true)}>
          <span>Mariage</span>
          <span>{champ("maries")}</span>
        </div>
        <div style={bandeauMariage(true)}>
          <span style={{ fontFamily: "var(--font-mono-vintage)", fontWeight: 700, fontSize: 10 }}>
            {champ("table")}
          </span>
          {edition.compteARebours && (
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-mono-vintage)",
                fontSize: 8,
                opacity: 0.85,
                animation: "pulse-soft 2s ease-in-out infinite",
              }}
            >
              {restant.passe ? "C'est aujourd'hui !" : `J-${restant.jours} · ${formaterRestant(restant)}`}
            </span>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div style={voileMariage} />
      <div style={rubanMariage(false)}>
        <span>Édition Mariage</span>
        <span>{champ("maries")}</span>
      </div>

      {/* Panneau explicatif de l'innovation */}
      <div
        style={{
          position: "absolute",
          left: 14,
          right: 14,
          top: 34,
          zIndex: 46,
          padding: `${10} ${14}`,
          background: "rgba(255,255,255,0.95)",
          border: `${1} solid ${EDITIONS.mariage.palette.accent}`,
          borderRadius: 6,
          color: "#3a2530",
          pointerEvents: "none",
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-cond)",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: EDITIONS.mariage.palette.encre,
          }}
        >
          {idee?.titre ?? "Pièce du mariage"}
        </p>
        <p style={{ margin: `${3} 0 0`, fontFamily: "var(--font-type)", fontSize: 10.5, lineHeight: 1.45 }}>
          {idee?.usage ?? ""}
        </p>
      </div>

      {/* Placement de table + compte à rebours */}
      <div style={bandeauMariage(false)}>
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-cond)",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          {champ("table")}
        </span>
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-type)",
            fontSize: 10,
            opacity: 0.85,
            marginTop: 2,
          }}
        >
          {champ("date")} · {champ("heure")} · {champ("lieu")}
        </span>
        {edition.compteARebours && (
          <span
            style={{
              display: "inline-block",
              marginTop: 4,
              padding: `${2} ${10}`,
              background: EDITIONS.mariage.palette.accent,
              color: "#2b2028",
              fontFamily: "var(--font-mono-vintage)",
              fontWeight: 700,
              fontSize: 11,
              borderRadius: 999,
              animation: "pulse-soft 2s ease-in-out infinite",
            }}
          >
            {restant.passe ? "Le grand jour est arrivé" : `${formaterRestant(restant)} avant la cérémonie`}
          </span>
        )}
      </div>
    </>
  );
}
