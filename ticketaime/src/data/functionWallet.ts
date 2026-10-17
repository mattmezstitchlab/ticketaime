import { ITEMS, type CategoryId } from "./catalogue";

export interface Tool {
  id: string;
  name: string;
  verb: string;
  description: string;
  categories: CategoryId[];
  template?: string;
}
export const TOOLS: Tool[] = [
  {
    id: "reservation",
    name: "Réserver",
    verb: "Préparer une demande",
    description:
      "Mariage, rendez-vous, prestation : préciser son besoin et contacter la bonne personne.",
    categories: ["services"],
    template: "barber",
  },
  {
    id: "postcard",
    name: "Écrire une carte",
    verb: "Composer un message",
    description:
      "Un timbre, une carte, quelques mots. Une attention à partager.",
    categories: ["timbre", "postale", "poste"],
    template: "carte-mer",
  },
  {
    id: "invitation",
    name: "Inviter",
    verb: "Préparer une invitation",
    description:
      "Partager une date, un lieu et les informations pratiques. Ce n’est pas un billet d’accès validé.",
    categories: ["social", "cinema", "spectacle", "loisirs"],
  },
  {
    id: "quote",
    name: "Devis",
    verb: "Préparer un brouillon de devis",
    description:
      "Décrire une prestation et son prix. Document préparatoire, sans signature ni acceptation en ligne.",
    categories: ["travail", "services"],
  },
  {
    id: "invoice",
    name: "Facture",
    verb: "Préparer un brouillon de facture",
    description:
      "Rassembler les informations de facturation. À compléter et vérifier dans votre outil comptable.",
    categories: ["services", "administratif"],
  },
  {
    id: "journey",
    name: "Organiser un trajet",
    verb: "Préparer un itinéraire",
    description:
      "Garder les étapes et horaires ensemble. Aucun titre de transport réel émis.",
    categories: ["voyage", "transport"],
  },
  {
    id: "gift",
    name: "Offrir une attention",
    verb: "Composer un bon",
    description:
      "Inviter à un verre ou offrir un service. Pas de paiement ni de solde garanti.",
    categories: ["bar", "monnaies"],
  },
  {
    id: "contact",
    name: "Se présenter",
    verb: "Créer une fiche de contact",
    description:
      "Personnaliser une carte professionnelle ou une présentation, sans formulaire de connexion actif.",
    categories: ["travail", "publicite", "web"],
  },
  {
    id: "memory",
    name: "Garder un souvenir",
    verb: "Créer un souvenir",
    description: "Raconter un moment sur une carte ou une photo illustrée.",
    categories: ["photo", "postale"],
  },
  {
    id: "collection",
    name: "Collectionner",
    verb: "Personnaliser une pièce graphique",
    description:
      "Conserver une création décorative. Ni monnaie, ni document officiel, ni certification.",
    categories: ["billets", "sceaux", "administratif", "monnaies"],
  },
];
export const STORAGE_KEY = "ticketaime-function-wallet-v1";
export interface WalletTicket {
  version: 1;
  id: string;
  code: string;
  toolId: string;
  itemId: string;
  fields: Record<string, string>;
  details: Record<string, string>;
  stamped: boolean;
}
export function templatesFor(tool: Tool) {
  return ITEMS.filter((item) => tool.categories.includes(item.category));
}
export function createTicket(tool: Tool): WalletTicket {
  const item =
    ITEMS.find((item) => item.id === tool.template) ?? templatesFor(tool)[0];
  const id = crypto.randomUUID();
  return {
    version: 1,
    id,
    code: `LMA-${id.replace(/-/g, "").slice(0, 12).toUpperCase()}`,
    toolId: tool.id,
    itemId: item.id,
    fields: Object.fromEntries(
      (item.editable ?? []).map((f) => [f.cle, f.valeur]),
    ),
    details: {},
    stamped: false,
  };
}
export function parseTicket(value: unknown): WalletTicket | null {
  if (!value || typeof value !== "object") return null;
  const t = value as WalletTicket;
  const strings = (v: unknown): v is Record<string, string> =>
    Boolean(
      v &&
      typeof v === "object" &&
      !Array.isArray(v) &&
      Object.keys(v).length <= 50 &&
      Object.entries(v).every(
        ([k, s]) =>
          k.length <= 80 &&
          typeof s === "string" &&
          s.length <= 2000 &&
          ![
            "_href",
            "_cible",
            "__proto__",
            "constructor",
            "prototype",
          ].includes(k),
      ),
    );
  const tool = TOOLS.find((tool) => tool.id === t.toolId);
  if (
    t.version !== 1 ||
    typeof t.id !== "string" ||
    t.id.length > 80 ||
    typeof t.code !== "string" ||
    !/^LMA-[A-F0-9]{12}$/.test(t.code) ||
    !tool ||
    !templatesFor(tool).some((i) => i.id === t.itemId) ||
    !strings(t.fields) ||
    !strings(t.details) ||
    typeof t.stamped !== "boolean"
  )
    return null;
  return {
    version: 1,
    id: t.id,
    code: t.code,
    toolId: t.toolId,
    itemId: t.itemId,
    fields: t.fields,
    details: t.details,
    stamped: t.stamped,
  };
}
export function loadWallet(): WalletTicket[] {
  try {
    const value: unknown = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? "[]",
    );
    return Array.isArray(value)
      ? value.map(parseTicket).filter((t): t is WalletTicket => t !== null)
      : [];
  } catch {
    return [];
  }
}
export function ticketFromLink(input: string): WalletTicket | null {
  try {
    const url = new URL(input);
    const payload = new URLSearchParams(url.hash.slice(1)).get("ticket");
    return payload && payload.length <= 30000
      ? parseTicket(JSON.parse(payload))
      : null;
  } catch {
    return null;
  }
}
export function shareLink(ticket: WalletTicket, base: string): string {
  const url = new URL(base);
  url.search = "";
  url.hash = new URLSearchParams({ ticket: JSON.stringify(ticket) }).toString();
  return url.href;
}
export function suggestTool(text: string): string | null {
  const s = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  const rules: [string, RegExp][] = [
    ["invoice", /factur/],
    ["quote", /devis|tarif/],
    ["postcard", /carte postale|timbre|message|ecrire|courrier/],
    ["reservation", /reserv|mariage|rendez.vous|prestation/],
    ["invitation", /invit|concert|cinema|spectacle|billet/],
    ["journey", /voyag|trajet|transport|train/],
    ["gift", /offrir|cadeau|boire|verre/],
    ["contact", /contact|present|profession|portfolio/],
    ["memory", /souvenir|photo/],
    ["collection", /collection|sceau|monnaie/],
  ];
  return rules.find(([, pattern]) => pattern.test(s))?.[0] ?? null;
}
