import type { CSSProperties } from "react";

/* ------------------------------------------------------------------ */
/*  ÉDITIONS — une édition transforme chaque pièce en pièce d'événement */
/* ------------------------------------------------------------------ */

export type EditionId = "classique" | "mariage";

export interface ChampRsvp {
  cle: string;
  label: string;
  valeur: string;
}

export interface EditionDef {
  id: EditionId;
  nom: string;
  accroche: string;
  description: string;
  /** Palette appliquée aux surimpressions */
  palette: {
    encre: string;
    accent: string;
    voile: string;
    ruban: string;
    fond: string;
  };
  /** Champs RSVP (activation du compte à rebours) */
  rsvp: ChampRsvp[];
  /** Compte à rebours activé ? */
  compteARebours: boolean;
}

export const EDITIONS: Record<EditionId, EditionDef> = {
  classique: {
    id: "classique",
    nom: "Classique",
    accroche: "Collection patrimoniale",
    description: "Les pièces telles qu'archivées, sans contexte événementiel.",
    palette: {
      encre: "#2f281f",
      accent: "#b88938",
      voile: "rgba(0,0,0,0)",
      ruban: "#8a745d",
      fond: "#242427",
    },
    rsvp: [],
    compteARebours: false,
  },
  mariage: {
    id: "mariage",
    nom: "Édition Mariage",
    accroche: "Le plus beau jour de votre vie",
    description:
      "Chaque pièce de la collection devient un faire-part fonctionnel : placement de table, horaire, noms des mariés et compte à rebours activé par le RSVP.",
    palette: {
      encre: "#5c2a3e",
      accent: "#c9a227",
      voile: "rgba(92,42,62,0.05)",
      ruban: "#5c2a3e",
      fond: "#2b2028",
    },
    rsvp: [
      { cle: "maries", label: "Noms des mariés", valeur: "Camille & Antoine" },
      { cle: "date", label: "Date du mariage", valeur: "2027-06-12" },
      { cle: "heure", label: "Heure de la cérémonie", valeur: "15:30" },
      { cle: "lieu", label: "Lieu", valeur: "Château de Vaux-le-Vicomte" },
      { cle: "table", label: "Placement de table", valeur: "Table 7 · Les Marronniers" },
      { cle: "hote", label: "Hôte / contact", valeur: "Famille Lambert" },
    ],
    compteARebours: true,
  },
};

/* ------------------------------------------------------------------ */
/*  Compte à rebours réel                                              */
/* ------------------------------------------------------------------ */

export interface Restant {
  jours: number;
  heures: number;
  minutes: number;
  secondes: number;
  passe: boolean;
  totalMs: number;
}

export function compteARebours(cibleISO: string): Restant {
  const cible = new Date(cibleISO).getTime();
  const diff = cible - Date.now();
  const abs = Math.abs(diff);
  return {
    jours: Math.floor(abs / 86400000),
    heures: Math.floor((abs % 86400000) / 3600000),
    minutes: Math.floor((abs % 3600000) / 60000),
    secondes: Math.floor((abs % 60000) / 1000),
    passe: diff < 0,
    totalMs: diff,
  };
}

export function formaterRestant(r: Restant): string {
  return `${r.jours}j ${String(r.heures).padStart(2, "0")}h ${String(r.minutes).padStart(2, "0")}m ${String(r.secondes).padStart(2, "0")}s`;
}

/* ------------------------------------------------------------------ */
/*  Idée ingénieuse par catégorie — ce que chaque pièce devient        */
/* ------------------------------------------------------------------ */

export interface IdeePiece {
  /** Titre court de l'innovation */
  titre: string;
  /** Explication de l'usage réel */
  usage: string;
  /** Étiquette affichée sur la surimpression */
  etiquette: string;
}

export const IDEES: Record<string, IdeePiece> = {
  voyage: {
    titre: "Carte d'embarquement du mariage",
    usage:
      "Date, heure, noms des mariés et placement de table. Le QR ouvre le plan de salle ; le compte à rebours se déclenche à la validation du RSVP.",
    etiquette: "Embarquement cérémonie",
  },
  transport: {
    titre: "Navette officielle des invités",
    usage: "Horaire de départ, quai d'embarquement et siège attribué dans le car des mariés.",
    etiquette: "Navette invités",
  },
  poste: {
    titre: "Faire-part certifié",
    usage: "Envoi du faire-part par e-mail avec preuve de réception : code de dépôt type poste et QR de vérification.",
    etiquette: "Faire-part certifié",
  },
  cinema: {
    titre: "Séance « leur histoire »",
    usage: "Projection privée du film des mariés : date, salle, siège réservé et placement de table.",
    etiquette: "Séance privée",
  },
  spectacle: {
    titre: "Place de concert de la soirée",
    usage: "Programme de la soirée dansante, numéro de loge et placement de table à l'entracte.",
    etiquette: "Soirée dansante",
  },
  loisirs: {
    titre: "Animation & photobooth",
    usage: "Créneau horaire réservé au photobooth ou à l'animation, avec placement de table.",
    etiquette: "Animation réservée",
  },
  bar: {
    titre: "Menu & cocktail signature",
    usage: "Carte des vins, cocktail des mariés et ticket de dégustation avec placement de table.",
    etiquette: "Cocktail signature",
  },
  services: {
    titre: "Prestataire & coordination",
    usage: "Bon de commande du traiteur, du fleuriste ou du photographe, avec montant et acompte certifiés.",
    etiquette: "Bon de prestation",
  },
  social: {
    titre: "Liste d'invités & RSVP",
    usage: "Nom de l'invité, table attribuée, statut de réponse et compte à rebours du grand jour.",
    etiquette: "RSVP invité",
  },
  publicite: {
    titre: "Cadeau d'invité personnalisé",
    usage: "Étiquette du cadeau de bienvenue : prénom de l'invité, table et message des mariés.",
    etiquette: "Cadeau d'invité",
  },
  administratif: {
    titre: "Dossier administratif du mariage",
    usage: "Livret de famille, actes et pièces d'identité requis, centralisés et certifiés.",
    etiquette: "Dossier du mariage",
  },
  timbre: {
    titre: "Timbres des faire-part",
    usage: "Affranchissement des enveloppes de faire-part, avec code de dépôt et preuve d'envoi.",
    etiquette: "Affranchissement",
  },
  postale: {
    titre: "Carte postale des mariés",
    usage: "Photo des mariés, message manuscrit et envoi certifié à chaque invité avec preuve.",
    etiquette: "Carte des mariés",
  },
  photo: {
    titre: "Photo de couple & Polaroid",
    usage: "Polaroid signé des mariés daté du jour J, avec certificat d'authenticité.",
    etiquette: "Souvenir daté",
  },
  travail: {
    titre: "Badge prestataire de la noce",
    usage: "Badge d'accès du traiteur, du DJ ou du photographe, avec créneau horaire et zone autorisée.",
    etiquette: "Badge prestataire",
  },
  web: {
    titre: "Site web du mariage",
    usage: "Module de confirmation de présence, carte du lieu, programme et liste de mariage.",
    etiquette: "Site du mariage",
  },
  monnaies: {
    titre: "Jeton de lavande & dragées",
    usage: "Jeton-souvenir gravé de la date, remis à chaque invité avec les dragées.",
    etiquette: "Jeton souvenir",
  },
  billets: {
    titre: "Billet de voyage de noces",
    usage: "Billet offert pour le voyage de noces : destination, date et noms des mariés.",
    etiquette: "Voyage de noces",
  },
  sceaux: {
    titre: "Sceau de cire du mariage",
    usage: "Sceau authentifiant chaque enveloppe de faire-part, avec monogramme des mariés.",
    etiquette: "Sceau des mariés",
  },
};

/* ------------------------------------------------------------------ */
/*  Styles de la surimpression mariage                                 */
/* ------------------------------------------------------------------ */

export const voileMariage: CSSProperties = {
  position: "absolute",
  inset: 0,
  zIndex: 35,
  pointerEvents: "none",
  background: EDITIONS.mariage.palette.voile,
};

export const rubanMariage = (compact = false): CSSProperties => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  zIndex: 45,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: compact ? "3px 8px" : "6px 14px",
  background: `linear-gradient(90deg, ${EDITIONS.mariage.palette.ruban}, #7a3a50)`,
  color: "#f7ecd9",
  fontFamily: "var(--font-cond)",
  fontWeight: 700,
  fontSize: compact ? 8 : 11,
  letterSpacing: compact ? 1.6 : 2.6,
  textTransform: "uppercase",
});

/** Bandeau placement + compte à rebours, posé en bas de la pièce. */
export const bandeauMariage = (compact = false): CSSProperties => ({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 45,
  padding: compact ? "3px 8px" : "7px 12px",
  background: "rgba(44,26,34,0.92)",
  color: "#f7ecd9",
  textAlign: "center",
  pointerEvents: "none",
});
