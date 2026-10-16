import type { EditionId } from "./editions";

export interface UsageStory {
  id: string;
  title: string;
  headline: string;
  description: string;
  cta: string;
  image: string;
  alt: string;
  position: string;
  itemId: string;
  edition: EditionId;
  sample: string;
  keywords: string[];
  fields: Record<string, string>;
}

export interface CreationDraft {
  id: string;
  itemId: string;
  usageId: string;
  edition: EditionId;
  brief: string;
  fields: Record<string, string>;
}

export const USAGE_STORIES: UsageStory[] = [
  {
    id: "spectacle", title: "Spectacle & théâtre", headline: "Le spectacle commence\navant le lever de rideau.",
    description: "Un beau billet, un nom, une place. Donnez à vos invités une première raison de se souvenir de la soirée.",
    cta: "Imaginer mon billet", image: "/images/usages/theatre.webp",
    alt: "Mise en situation : une spectatrice présente sur son iPhone un billet crème et bordeaux dans le foyer d'un théâtre.",
    position: "70% 48%", itemId: "opera", edition: "classique",
    sample: "Un billet pour notre soirée de théâtre à Paris, le 12 juin à 20h30.",
    keywords: ["theatre", "spectacle", "concert", "opera", "festival", "danse", "musique", "billetterie"],
    fields: { venue: "LE THÉÂTRE DES RENCONTRES", title: "Une belle soirée", composer: "Une invitation à partager", date: "12 JUIN", heure: "20H30", place: "RANG A · PLACE 12", prix: "INVITÉ", holder: "À votre nom" },
  },
  {
    id: "cinema", title: "Cinéma & projections", headline: "La meilleure place,\nc'est celle qu'on partage.",
    description: "Une séance entre amis ou une projection privée. Retrouvez le charme du ticket de cinéma, jusque dans la poche.",
    cta: "Créer mon ticket de cinéma", image: "/images/usages/cinema.webp",
    alt: "Mise en situation : un homme souriant montre un ticket de cinéma sur son iPhone devant des fauteuils de velours rouge.",
    position: "72% 46%", itemId: "stub", edition: "classique",
    sample: "Une invitation pour une soirée cinéma entre amis, samedi à 20h30.",
    keywords: ["cinema", "film", "projection", "seance", "court metrage"],
    fields: { cinema: "LE CINÉMA DES AMIS", film: "Notre séance privée", date: "SAMEDI", heure: "20H30", salle: "1", place: "A 12", prix: "INVITÉ", holder: "Une place pour vous" },
  },
  {
    id: "mariage", title: "Mariage & réceptions", headline: "Le grand oui.\nLes petits détails.",
    description: "Du faire-part au nom sur la table, composez une collection à votre image. De petites attentions pour votre grand jour.",
    cta: "Composer notre mariage", image: "/images/usages/wedding.webp",
    alt: "Mise en situation : une invitée dans un jardin de mariage montre une invitation Camille et Antoine sur son iPhone.",
    position: "72% 46%", itemId: "opera", edition: "mariage",
    sample: "Un faire-part pour le mariage de Camille et Antoine, le 12 juin à 15h30, table 7.",
    keywords: ["mariage", "maries", "mariee", "noces", "rsvp", "fianc", "reception", "wedding"],
    fields: { tone: "rose", venue: "UNE INVITATION AU BONHEUR", title: "Camille & Antoine", composer: "Le grand jour se partage avec vous", date: "12 JUIN", heure: "15H30", place: "TABLE 7 · LES MARRONNIERS", prix: "OUI", holder: "Vous êtes invités" },
  },
  {
    id: "voyage", title: "Voyage & séminaires", headline: "La première étape\nd'un beau voyage.",
    description: "Un départ surprise, un séminaire, une escapade. Faites de votre carte d'embarquement le début de l'aventure.",
    cta: "Préparer mon embarquement", image: "/images/usages/travel.webp",
    alt: "Mise en situation : une voyageuse en trench présente une carte d'embarquement Paris-Lyon sur son iPhone dans une gare.",
    position: "71% 48%", itemId: "kraft-pass", edition: "classique",
    sample: "Une carte d'embarquement pour notre voyage de Paris à Lyon le 12 juin à 8h42.",
    keywords: ["voyage", "seminaire", "embarquement", "avion", "train", "depart", "escapade", "transport", "vacances"],
    fields: { depart: "PARIS", destination: "LYON", date: "12 JUIN", heure: "08H42", porte: "B7", vol: "LMA01", siege: "A12" },
  },
  {
    id: "administratif", title: "Administratif & associations", headline: "Les petites formalités.\nLa grande attention.",
    description: "Une carte de membre, un justificatif ou une attestation de participation. Des modèles soignés pour les liens du quotidien.",
    cta: "Personnaliser mon document", image: "/images/usages/administrative.webp",
    alt: "Mise en situation : un professionnel dans un atelier d'architecture présente une attestation sur l'écran de son iPhone.",
    position: "73% 46%", itemId: "certificat-scolarite", edition: "classique",
    sample: "Une attestation de participation pour les membres de notre association.",
    keywords: ["administratif", "association", "attestation", "document", "certificat", "membre", "justificatif", "dossier"],
    fields: { titre: "ATTESTATION DE PARTICIPATION", emetteur: "LA MAISON DES ASSOCIATIONS", etablissement: "ÉDITION PERSONNALISÉE", labelEleve: "BÉNÉFICIAIRE", eleve: "Votre nom", classe: "MEMBRE", annee: "2027", note: "SPÉCIMEN CRÉATIF · SANS VALEUR OFFICIELLE" },
  },
  {
    id: "loisirs", title: "Tombola & belles surprises", headline: "Un petit ticket.\nEt si c'était le vôtre ?",
    description: "Un numéro à garder, un lot à imaginer, un moment à partager. Donnez une belle forme à vos rendez-vous associatifs.",
    cta: "Dessiner mon ticket de tombola", image: "/images/usages/raffle.webp",
    alt: "Mise en situation : une participante à une fête de quartier montre un ticket de tombola jaune sur son iPhone.",
    position: "71% 47%", itemId: "roll", edition: "classique",
    sample: "Des tickets de tombola pour la fête de notre association, avec un numéro et un petit mot.",
    keywords: ["tombola", "loterie", "tirage", "loto", "kermesse", "bingo", "lot", "gagner"],
    fields: { titre: "TOMBOLA", organisation: "LA FÊTE DU QUARTIER", sousTitre: "À VOUS DE JOUER", numero: "000482", mention: "UN PETIT TICKET, UNE BELLE SURPRISE" },
  },
  {
    id: "bar", title: "Restaurants & bars", headline: "Les bonnes adresses\nse gardent précieusement.",
    description: "Une carte de cocktails, une invitation à dîner ou un laissez-passer secret. Le goût des belles choses, jusque dans les détails.",
    cta: "Créer la pièce de ma maison", image: "/images/usages/dining.webp",
    alt: "Mise en situation : une cliente montre une carte de restaurant sur son iPhone à la table d'un bistrot parisien.",
    position: "72% 47%", itemId: "speakeasy", edition: "classique",
    sample: "Une carte d'accès au bar secret de notre restaurant, au nom de nos invités.",
    keywords: ["restaurant", "bar", "cocktail", "diner", "repas", "menu", "bistrot", "cafe", "speakeasy"],
    fields: { venue: "LA MAISON DES AMIS", motto: "La soirée est à vous", holder: "Notre invité", number: "0007", until: "31 DÉC." },
  },
  {
    id: "postale", title: "Cartes & mots doux", headline: "Tout près du cœur.\nMême de très loin.",
    description: "Une pensée de vacances, un merci, un mot pour quelqu'un. Retrouvez le plaisir d'une carte qu'on a envie de garder.",
    cta: "Écrire ma carte", image: "/images/usages/postcard.webp",
    alt: "Mise en situation : une femme à une terrasse en bord de mer présente une carte postale sur son iPhone.",
    position: "71% 47%", itemId: "carte-mer", edition: "classique",
    sample: "Une carte postale pour maman avec un petit mot doux depuis la Côte d'Azur.",
    keywords: ["carte postale", "carte", "message", "merci", "courrier", "lettre", "maman", "anniversaire", "souvenir", "mot doux"],
    fields: { message: "Quelques mots pour te dire\nque je pense à toi.\nBons baisers de Nice.", destinataire: "Pour quelqu'un de cher" },
  },
  {
    id: "monnaies", title: "Monnaies & jetons", headline: "La valeur\nd'un moment partagé.",
    description: "Un jeton de collection, un souvenir d'événement, une attention à offrir. Une petite pièce qui porte une grande histoire.",
    cta: "Imaginer mon jeton", image: "/images/usages/tokens.webp",
    alt: "Mise en situation : un visiteur d'un marché de design montre un jeton de transport new-yorkais sur son iPhone.",
    position: "72% 47%", itemId: "token-nyc-1953", edition: "classique",
    sample: "Un jeton souvenir de New York pour notre collection, édition 2027.",
    keywords: ["jeton", "monnaie", "token", "piece de monnaie", "numismatique", "new york", "nyc"],
    fields: { annee: "2027" },
  },
];

const normalize = (text: string) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const intentWeights: Record<string, number> = {
  mariage: 12, wedding: 12, rsvp: 8, theatre: 10, concert: 10, opera: 10,
  cinema: 12, projection: 8, voyage: 8, embarquement: 10, attestation: 10,
  certificat: 9, administratif: 10, tombola: 12, loterie: 10, kermesse: 8,
  restaurant: 10, bar: 10, cocktail: 8, speakeasy: 10, "carte postale": 12,
  "mot doux": 9, jeton: 12, token: 10, numismatique: 10, monnaie: 10,
};

/** Local intent matching: no AI service, email delivery or external request is implied. */
export function composeFromBrief(brief: string, forcedUsage?: string): CreationDraft {
  const clean = brief.trim().slice(0, 360);
  const input = normalize(clean);
  const matched = USAGE_STORIES.map((usage) => ({
    usage,
    score: usage.keywords.reduce((score, keyword) => score + (input.includes(keyword) ? (intentWeights[keyword] ?? (keyword.includes(" ") ? 3 : 1)) : 0), 0),
  })).sort((a, b) => b.score - a.score)[0];
  const usage = USAGE_STORIES.find((u) => u.id === forcedUsage) ?? (matched.score > 0 ? matched.usage : USAGE_STORIES[0]);
  const fields = { ...usage.fields };
  const date = clean.match(/\b(\d{1,2})\s+(janvier|février|fevrier|mars|avril|mai|juin|juillet|août|aout|septembre|octobre|novembre|décembre|decembre)(?:\s+(20\d{2}))?/i);
  const time = clean.match(/\b([01]?\d|2[0-3])\s*[h:]\s*([0-5]\d)?\b/i);
  if (date) fields.date = `${date[1]} ${date[2].toLocaleUpperCase("fr-FR")}`;
  if (time) fields.heure = `${time[1].padStart(2, "0")}H${time[2] ?? "00"}`;
  if (usage.id === "mariage") {
    const names = clean.match(/mariage\s+(?:de|d['’])\s*(.+?)(?=,|\s+le\s+\d|\s+à\s+|$)/i);
    const table = clean.match(/table\s+(\d{1,2})/i);
    if (names) fields.title = names[1].replace(/\s+et\s+/i, " & ").trim().slice(0, 34);
    if (table) fields.place = `TABLE ${table[1]}`;
  }
  if (usage.id === "postale") fields.message = clean;
  return {
    id: globalThis.crypto?.randomUUID?.() ?? `creation-${Date.now()}`,
    itemId: usage.itemId, usageId: usage.id, edition: usage.edition, brief: clean, fields,
  };
}