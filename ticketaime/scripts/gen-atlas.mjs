import { readFileSync, writeFileSync, mkdirSync } from "fs";

// Parse ITEMS from catalogue.tsx (lignes `{ id: "...", name: "...", category: "...", Component: X, w: N, h: M ... }`)
const src = readFileSync("src/data/catalogue.tsx", "utf8");
const actionsSrc = readFileSync("src/lib/moduleActions.ts", "utf8");

const itemRe = /\{\s*id:\s*"([^"]+)",\s*name:\s*"((?:[^"\\]|\\.)*)",\s*category:\s*"([^"]+)",\s*Component:\s*([A-Za-z0-9_]+),\s*w:\s*(\d+),\s*h:\s*(\d+),?\s*rotate:\s*(-?[\d.]+)([\s\S]*?)(?=\n\s*\{ id:|\n\];)/g;

// Champs éditables `{ cle: "...", label: "...", valeur: "..." }`
const editRe = /\{\s*cle:\s*"([^"]+)",\s*label:\s*"((?:[^"\\]|\\.)*)",\s*valeur:\s*"((?:[^"\\]|\\.)*)"/g;

// Fichier source exact par composant (parsé depuis les imports du catalogue)
const FICHIER_PAR_COMPOSANT = {};
{
  const importRe = /import\s*\{([\s\S]*?)\}\s*from\s*"\.\.\/components\/tickets\/([A-Za-z]+)";/g;
  let im;
  while ((im = importRe.exec(src)) !== null) {
    const fichier = `src/components/tickets/${im[2]}.tsx`;
    im[1].split(",").forEach((raw) => {
      const name = raw.trim().split(/\s+/)[0];
      if (name) FICHIER_PAR_COMPOSANT[name] = fichier;
    });
  }
}
const FICHIER_DEFAUT = {
  voyage: "src/components/tickets/BoardingPasses.tsx",
  transport: "src/components/tickets/Transport.tsx",
  poste: "src/components/tickets/Postal.tsx",
  cinema: "src/components/tickets/Cinema.tsx",
  spectacle: "src/components/tickets/Show.tsx",
  loisirs: "src/components/tickets/Leisure.tsx",
  bar: "src/components/tickets/Bar.tsx",
  services: "src/components/tickets/Services.tsx",
  social: "src/components/tickets/Social.tsx",
  publicite: "src/components/tickets/Advertising.tsx",
  administratif: "src/components/tickets/Admin.tsx",
  timbre: "src/components/tickets/Timbres.tsx",
  postale: "src/components/tickets/Postales.tsx",
  photo: "src/components/tickets/Photo.tsx",
  travail: "src/components/tickets/CartesTravail.tsx",
  web: "src/components/tickets/Web.tsx",
  monnaies: "src/components/tickets/Numismatics.tsx",
  billets: "src/components/tickets/Numismatics.tsx",
  sceaux: "src/components/tickets/SealsAndStamps.tsx",
};
const fichierPour = (composant, categorie) =>
  FICHIER_PAR_COMPOSANT[composant] ?? FICHIER_DEFAUT[categorie] ?? "src/components/tickets/Web.tsx";

// Catégories : id / nom / numeral
const catRe = /id:\s*"([^"]+)",\s*numeral:\s*"([^"]+)",\s*name:\s*"((?:[^"\\]|\\.)*)"/g;
const cats = [];
let cm;
while ((cm = catRe.exec(src)) !== null) {
  if (["voyage","transport","poste","cinema","spectacle","loisirs","bar","services","social","publicite","administratif","timbre","postale","photo","travail","web","monnaies","billets","sceaux"].includes(cm[1])) {
    cats.push({ id: cm[1], numeral: cm[2], nom: cm[3].replace(/\\"/g, '"') });
  }
}
const catNom = Object.fromEntries(cats.map((c) => [c.id, c.nom]));

// Actions par pièce : parse ACTIONS_PAR_PIECE — blocs `"id": [ ... { cle, label, type ... } ]`
const actionsParPiece = {};
const pieceBlockRe = /"([a-z0-9-]+)":\s*\[([\s\S]*?)\n\s*\],/g;
let pb;
while ((pb = pieceBlockRe.exec(actionsSrc)) !== null) {
  const pid = pb[1];
  const body = pb[2];
  const list = [];
  const aRe = /\{\s*cle:\s*"([^"]+)",\s*label:\s*"((?:[^"\\]|\\.)*)",\s*type:\s*"([^"]+)"(?:,\s*placeholder:\s*"((?:[^"\\]|\\.)*)")?(?:,\s*defaut:\s*"((?:[^"\\]|\\.)*)")?/g;
  let am;
  while ((am = aRe.exec(body)) !== null) {
    list.push({
      cle: am[1],
      label: am[2].replace(/\\"/g, '"'),
      type: am[3],
      ...(am[4] ? { placeholder: am[4].replace(/\\"/g, '"') } : {}),
      ...(am[5] ? { defaut: am[5].replace(/\\"/g, '"') } : {}),
    });
  }
  if (list.length) actionsParPiece[pid] = list;
}

// Actions par catégorie : `categorie: [ ... ]` dans ACTIONS_PAR_CATEGORIE
const actionsParCat = {};
const catBlockRe = /^\s*([a-z]+):\s*\[$/gm;
// (parse simplifié : on associe les blocs suivants aux catégories connues dans l'ordre du fichier)
const catIds = ["voyage","transport","cinema","spectacle","loisirs","bar","poste","postale","services","photo","timbre","monnaies","billets","travail","social","publicite","administratif"];
{
  const sections = actionsSrc.split(/^\s*(?:voyage|transport|cinema|spectacle|loisirs|bar|poste|postale|services|photo|timbre|monnaies|billets|travail|social|publicite|administratif):\s*\[$/gm);
  // sections[0] = avant, sections[k] = corps du k-ième bloc catégorie
  const order = [...actionsSrc.matchAll(/^\s*(voyage|transport|cinema|spectacle|loisirs|bar|poste|postale|services|photo|timbre|monnaies|billets|travail|social|publicite|administratif):\s*\[$/gm)].map((m) => m[1]);
  order.forEach((cid, idx) => {
    const body = (sections[idx + 1] || "").split(/^\s*\],$/m)[0];
    const list = [];
    const aRe = /\{\s*cle:\s*"([^"]+)",\s*label:\s*"((?:[^"\\]|\\.)*)",\s*type:\s*"([^"]+)"(?:,\s*placeholder:\s*"((?:[^"\\]|\\.)*)")?/g;
    let am;
    while ((am = aRe.exec(body)) !== null) {
      list.push({
        cle: am[1],
        label: am[2].replace(/\\"/g, '"'),
        type: am[3],
        ...(am[4] ? { placeholder: am[4].replace(/\\"/g, '"') } : {}),
      });
    }
    if (list.length) actionsParCat[cid] = list;
  });
}

const modules = [];
let m;
while ((m = itemRe.exec(src)) !== null) {
  const [, id, name, category, composant, w, h, , rest] = m;
  const champs = [];
  let em;
  editRe.lastIndex = 0;
  const restCopy = rest || "";
  while ((em = editRe.exec(restCopy)) !== null) {
    champs.push({
      cle: em[1],
      label: em[2].replace(/\\"/g, '"'),
      defaut: em[3].replace(/\\"/g, '"'),
    });
  }
  const actions = [...(actionsParPiece[id] ?? []), ...(actionsParCat[category] ?? [])];
  modules.push({
    id,
    nom: name.replace(/\\"/g, '"'),
    categorie: category,
    categorieNom: catNom[category] ?? category,
    fichier: fichierPour(composant, category),
    composant,
    largeur: Number(w),
    hauteur: Number(h),
    champs,
    actions,
    previewUrl: `?module=${id}`,
    version: "1.0.0",
  });
}

const manifest = {
  depot: "ephemeres-vintage",
  version: "1.0.0",
  total: modules.length,
  categories: cats.map((c) => ({
    ...c,
    total: modules.filter((x) => x.categorie === c.id).length,
  })),
  integration: {
    iframe: "?module=<id>&champ:<cle>=<valeur>&action:<cle>=<url>",
    exemple: "?module=web-hero&champ:titre=Bonjour&action:ctaUrl=https://example.com",
    attributs: ["data-atlas-module", "data-atlas-category", "data-atlas-version"],
    registreTS: "src/lib/atlas.ts (ATLAS_MODULES)",
  },
  modules,
};

mkdirSync("public", { recursive: true });
writeFileSync("public/atlas-modules.json", JSON.stringify(manifest, null, 2) + "\n");
console.log(`Atlas manifest: ${modules.length} modules, ${cats.length} catégories -> public/atlas-modules.json`);
