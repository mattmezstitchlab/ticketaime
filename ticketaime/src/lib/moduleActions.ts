import type { CategoryId } from "../data/catalogue";

export type ActionFieldType = "url" | "email" | "tel" | "text" | "select" | "boolean";

export interface ActionField {
  cle: string;
  label: string;
  type: ActionFieldType;
  placeholder?: string;
  defaut?: string;
  options?: { value: string; label: string }[];
  aide?: string;
}

/**
 * Schéma fonctionnel par pièce (surtout les modules web : vraies actions).
 * Les valeurs sont stockées dans `customization.actions` puis fusionnées
 * dans `personnalisation` sous la forme `action:<cle>`.
 */
export const ACTIONS_PAR_PIECE: Record<string, ActionField[]> = {
  "web-hero": [
    { cle: "ctaUrl", label: "Lien du bouton principal", type: "url", placeholder: "https://… ou #collection", defaut: "#collection" },
    { cle: "secondUrl", label: "Lien du bouton secondaire", type: "url", placeholder: "https://…", defaut: "#atelier" },
    { cle: "cible", label: "Ouverture des liens", type: "select", defaut: "_self", options: [{ value: "_self", label: "Même onglet" }, { value: "_blank", label: "Nouvel onglet" }] },
  ],
  "web-navbar": [
    { cle: "lien1Url", label: "Lien « Collection »", type: "url", placeholder: "#collection", defaut: "#collection" },
    { cle: "lien2Url", label: "Lien « Atelier »", type: "url", placeholder: "#atelier", defaut: "#atelier" },
    { cle: "lien3Url", label: "Lien « À propos »", type: "url", placeholder: "#apropos", defaut: "#apropos" },
    { cle: "ctaUrl", label: "Lien du bouton Commander", type: "url", placeholder: "https://…", defaut: "#commander" },
  ],
  "web-features": [
    { cle: "lien1Url", label: "Lien carte 1", type: "url", placeholder: "https://… (optionnel)" },
    { cle: "lien2Url", label: "Lien carte 2", type: "url", placeholder: "https://… (optionnel)" },
    { cle: "lien3Url", label: "Lien carte 3", type: "url", placeholder: "https://… (optionnel)" },
  ],
  "web-pricing": [
    { cle: "plan1Url", label: "Lien bouton plan 1", type: "url", placeholder: "https://…/offre-essentiel", defaut: "#offre-essentiel" },
    { cle: "plan2Url", label: "Lien bouton plan 2", type: "url", placeholder: "https://…/offre-atelier", defaut: "#offre-atelier" },
  ],
  "web-testimonial": [
    { cle: "avisUrl", label: "Lien « tous les avis »", type: "url", placeholder: "https://…/avis" },
  ],
  "web-contact": [
    { cle: "destinataire", label: "E-mail destinataire du formulaire", type: "email", placeholder: "bonjour@maison.fr", defaut: "bonjour@maison.fr" },
    { cle: "tel", label: "Téléphone cliquable (optionnel)", type: "tel", placeholder: "+33 1 23 45 67 89" },
    { cle: "adresseUrl", label: "Lien de l'adresse (plan)", type: "url", placeholder: "https://maps.google.com/?q=…" },
  ],
  "web-newsletter": [
    { cle: "actionUrl", label: "URL d'inscription", type: "url", placeholder: "https://…/newsletter", defaut: "#newsletter" },
  ],
  "web-cta": [
    { cle: "ctaUrl", label: "Lien du bouton", type: "url", placeholder: "https://…", defaut: "#commencer" },
  ],
  "web-faq": [
    { cle: "aideUrl", label: "Lien « Centre d'aide »", type: "url", placeholder: "https://…/aide" },
  ],
  "web-footer": [
    { cle: "mentionsUrl", label: "Lien Mentions légales", type: "url", placeholder: "/mentions", defaut: "#mentions" },
    { cle: "confUrl", label: "Lien Confidentialité", type: "url", placeholder: "/confidentialite", defaut: "#confidentialite" },
  ],
  "web-buttons": [
    { cle: "primaireUrl", label: "Lien bouton principal", type: "url", placeholder: "https://…" },
    { cle: "dangerUrl", label: "Lien bouton danger", type: "url", placeholder: "https://…" },
  ],
  "web-login": [
    { cle: "actionUrl", label: "URL de connexion (POST)", type: "url", placeholder: "https://…/login", defaut: "#login" },
    { cle: "oublieUrl", label: "Lien mot de passe oublié", type: "url", placeholder: "https://…/reset", defaut: "#reset" },
  ],
  "web-logos": [
    { cle: "lien1Url", label: "Lien logo 1", type: "url", placeholder: "https://…" },
    { cle: "lien2Url", label: "Lien logo 2", type: "url", placeholder: "https://…" },
  ],
};

/** Actions génériques par catégorie (lien externe sur toute la pièce + extras). */
export const ACTIONS_PAR_CATEGORIE: Partial<Record<CategoryId, ActionField[]>> = {
  voyage: [
    { cle: "resaUrl", label: "Lien réservation / compagnie", type: "url", placeholder: "https://…", aide: "Ajoute un lien cliquable « Réserver » sur la pièce." },
    { cle: "suiviUrl", label: "Lien suivi de vol", type: "url", placeholder: "https://…/suivi" },
  ],
  transport: [
    { cle: "horaireUrl", label: "Lien horaires / réseau", type: "url", placeholder: "https://…" },
    { cle: "billetUrl", label: "Lien achat du titre", type: "url", placeholder: "https://…" },
  ],
  cinema: [
    { cle: "bandeAnnonceUrl", label: "Lien bande-annonce", type: "url", placeholder: "https://youtube.com/…" },
    { cle: "billetsUrl", label: "Lien billetterie", type: "url", placeholder: "https://…" },
  ],
  spectacle: [
    { cle: "billetsUrl", label: "Lien billetterie", type: "url", placeholder: "https://…" },
    { cle: "programmeUrl", label: "Lien programme (PDF)", type: "url", placeholder: "https://…/programme.pdf" },
  ],
  loisirs: [
    { cle: "billetsUrl", label: "Lien billetterie / entrée", type: "url", placeholder: "https://…" },
  ],
  bar: [
    { cle: "carteUrl", label: "Lien carte / menu", type: "url", placeholder: "https://…/carte" },
    { cle: "resaUrl", label: "Lien réservation de table", type: "url", placeholder: "https://…" },
  ],
  poste: [
    { cle: "suiviUrl", label: "Lien suivi d'envoi", type: "url", placeholder: "https://…/suivi" },
  ],
  postale: [
    { cle: "boutiqueUrl", label: "Lien boutique / édition", type: "url", placeholder: "https://…" },
  ],
  services: [
    { cle: "contactUrl", label: "Lien contact / devis", type: "url", placeholder: "https://… ou tel:" },
  ],
  photo: [
    { cle: "tirageUrl", label: "Lien tirage / galerie", type: "url", placeholder: "https://…" },
  ],
  timbre: [
    { cle: "coteUrl", label: "Lien cote / catalogue", type: "url", placeholder: "https://…" },
  ],
  monnaies: [
    { cle: "coteUrl", label: "Lien cote numismatique", type: "url", placeholder: "https://…" },
  ],
  billets: [
    { cle: "coteUrl", label: "Lien cote / référence", type: "url", placeholder: "https://…" },
  ],
  travail: [
    { cle: "contactUrl", label: "Lien contact professionnel", type: "url", placeholder: "mailto:… ou https://…" },
  ],
  social: [
    { cle: "infoUrl", label: "Lien d'information", type: "url", placeholder: "https://…" },
  ],
  publicite: [
    { cle: "boutiqueUrl", label: "Lien boutique / marque", type: "url", placeholder: "https://…" },
  ],
  administratif: [
    { cle: "demarcheUrl", label: "Lien démarche en ligne", type: "url", placeholder: "https://service-public.fr/…" },
  ],
  sceaux: [],
  web: [],
};

export function actionsPourPiece(pieceId: string, category: CategoryId): ActionField[] {
  const spec = ACTIONS_PAR_PIECE[pieceId] ?? [];
  const cat = ACTIONS_PAR_CATEGORIE[category] ?? [];
  return [...spec, ...cat];
}

/** Champ universel : toute la pièce devient un lien. */
export const LIEN_PIECE: ActionField = {
  cle: "_href",
  label: "Lien sur toute la pièce",
  type: "url",
  placeholder: "https://… (optionnel)",
  aide: "La pièce entière devient cliquable.",
};

export const CIBLE_LIEN: ActionField = {
  cle: "_cible",
  label: "Ouverture du lien pièce",
  type: "select",
  defaut: "_blank",
  options: [
    { value: "_blank", label: "Nouvel onglet" },
    { value: "_self", label: "Même onglet" },
  ],
};
