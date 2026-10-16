import { CATEGORIES, ITEMS } from "../data/catalogue";
import { actionsPourPiece } from "./moduleActions";

/**
 * Registre Atlas — chaque pièce est exposée comme un module indépendant,
 * fonctionnel et adressable, pour consommation depuis un autre site / dépôt.
 *
 * Usage côté Atlas :
 *  - `GET /atlas-modules.json` (généré, voir `public/atlas-modules.json`)
 *  - ou `import { ATLAS_MODULES } from "ephemeres/src/lib/atlas"`
 *  - Intégration unitaire via iframe : `/ ?module=<id>` (voir `ModuleView`)
 *  - Import ESM direct : `import { WebHero } from "ephemeres/src/components/tickets/Web"`
 */

export interface AtlasField {
  cle: string;
  label: string;
  defaut: string;
}

export interface AtlasAction {
  cle: string;
  label: string;
  type: string;
  placeholder?: string;
  defaut?: string;
}

export interface AtlasModule {
  /** Identifiant stable, ex. `web-hero` */
  id: string;
  /** Nom lisible */
  nom: string;
  /** Catégorie parente */
  categorie: string;
  categorieNom: string;
  /** Chemin source du composant dans le dépôt GitHub */
  fichier: string;
  /** Nom d'export du composant React */
  composant: string;
  /** Dimensions de design (px source) */
  largeur: number;
  hauteur: number;
  /** Champs de personnalisation (textes) */
  champs: AtlasField[];
  /** Champs fonctionnels (liens / actions réelles) */
  actions: AtlasAction[];
  /** URL d'aperçu isolé et fonctionnel (iframe Atlas) */
  previewUrl: string;
  /** Tag de version du module */
  version: string;
}

/** La catégorie voyage est éclatée sur 3 fichiers — résolution exacte par composant. */
const FICHIER_PAR_COMPOSANT_VOYAGE: Record<string, string> = {
  CreamTypewriterPass: "BoardingPasses",
  KraftBoardingPass: "BoardingPasses",
  RoseTypewriterPass: "BoardingPasses",
  TallKraftPass: "BoardingPasses",
  TransAirPass: "BoardingPasses",
  ArrivalTicket: "Stamps",
  BaggageClaimTicket: "Stamps",
  BlankNumberedTicket: "Stamps",
  BlueStamp: "Stamps",
  ExploreTicket: "Stamps",
  RedPlaneTicket: "Stamps",
  RoseStamp: "Stamps",
  AirmailEaglePass: "Labels",
  AirmailLargeLabel: "Labels",
  AirmailSmallLabel: "Labels",
  MailLabelPink: "Labels",
  MailPassSmall: "Labels",
  OrangeFrameLabel: "Labels",
};

const FICHIER_PAR_CATEGORIE: Record<string, { fichier: string; prefix: string }> = {
  voyage: { fichier: "src/components/tickets/BoardingPasses.tsx", prefix: "" },
  transport: { fichier: "src/components/tickets/Transport.tsx", prefix: "" },
  poste: { fichier: "src/components/tickets/Postal.tsx", prefix: "" },
  cinema: { fichier: "src/components/tickets/Cinema.tsx", prefix: "" },
  spectacle: { fichier: "src/components/tickets/Show.tsx", prefix: "" },
  loisirs: { fichier: "src/components/tickets/Leisure.tsx", prefix: "" },
  bar: { fichier: "src/components/tickets/Bar.tsx", prefix: "" },
  services: { fichier: "src/components/tickets/Services.tsx", prefix: "" },
  social: { fichier: "src/components/tickets/Social.tsx", prefix: "" },
  publicite: { fichier: "src/components/tickets/Advertising.tsx", prefix: "" },
  administratif: { fichier: "src/components/tickets/Admin.tsx", prefix: "" },
  timbre: { fichier: "src/components/tickets/Timbres.tsx", prefix: "" },
  postale: { fichier: "src/components/tickets/Postales.tsx", prefix: "" },
  photo: { fichier: "src/components/tickets/Photo.tsx", prefix: "" },
  travail: { fichier: "src/components/tickets/CartesTravail.tsx", prefix: "" },
  web: { fichier: "src/components/tickets/Web.tsx", prefix: "" },
  monnaies: { fichier: "src/components/tickets/Numismatics.tsx", prefix: "" },
  billets: { fichier: "src/components/tickets/Numismatics.tsx", prefix: "" },
  sceaux: { fichier: "src/components/tickets/SealsAndStamps.tsx", prefix: "" },
};

function composantPour(id: string): string {
  const item = ITEMS.find((i) => i.id === id);
  // Le nom de fonction du composant (minifié en prod, indicatif ici)
  return (item?.Component as { name?: string } | undefined)?.name ?? "Component";
}

export function buildAtlasModules(baseUrl = ""): AtlasModule[] {
  return ITEMS.map((it) => {
    const cat = CATEGORIES.find((c) => c.id === it.category);
    const meta = FICHIER_PAR_CATEGORIE[it.category] ?? {
      fichier: "src/components/tickets/Web.tsx",
      prefix: "",
    };
    const nomComposant = composantPour(it.id);
    const fichierExact =
      it.category === "voyage" && FICHIER_PAR_COMPOSANT_VOYAGE[nomComposant]
        ? `src/components/tickets/${FICHIER_PAR_COMPOSANT_VOYAGE[nomComposant]}.tsx`
        : meta.fichier;
    return {
      id: it.id,
      nom: it.name,
      categorie: it.category,
      categorieNom: cat?.name ?? it.category,
      fichier: fichierExact,
      composant: nomComposant,
      largeur: it.w,
      hauteur: it.h,
      champs: (it.editable ?? []).map((e) => ({
        cle: e.cle,
        label: e.label,
        defaut: e.valeur,
      })),
      actions: actionsPourPiece(it.id, it.category).map((a) => ({
        cle: a.cle,
        label: a.label,
        type: a.type,
        placeholder: a.placeholder,
        defaut: a.defaut,
      })),
      previewUrl: `${baseUrl}?module=${it.id}`,
      version: "1.0.0",
    };
  });
}

/** Registre statique (sans base URL — les URLs sont relatives). */
export const ATLAS_MODULES: AtlasModule[] = buildAtlasModules("");

export const ATLAS_CATEGORIES = CATEGORIES.map((c) => ({
  id: c.id,
  nom: c.name,
  numerotation: c.numeral,
  total: ITEMS.filter((i) => i.category === c.id).length,
  accent: c.accent,
}));

/** Résout `?module=<id>` dans l'URL courante (vue isolée Atlas). */
export function moduleIdFromLocation(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const url = new URL(window.location.href);
    return url.searchParams.get("module");
  } catch {
    return null;
  }
}
