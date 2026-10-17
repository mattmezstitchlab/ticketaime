import { test } from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
import { mkdir, writeFile } from "node:fs/promises";
const cache = new URL("../node_modules/.cache/", import.meta.url);
await mkdir(cache, { recursive: true });
const result = await build({
  stdin: {
    contents: `export * from './src/data/functionWallet'; export { ITEMS, CATEGORIES } from './src/data/catalogue'; export { default as FunctionWallet } from './src/components/FunctionWallet';`,
    resolveDir: new URL("../", import.meta.url).pathname,
    loader: "tsx",
  },
  bundle: true,
  platform: "node",
  format: "esm",
  packages: "external",
  loader: { ".css": "empty" },
  write: false,
});
const output = new URL("function-wallet-test.mjs", cache);
await writeFile(output, result.outputFiles[0].text);
const {
  TOOLS,
  ITEMS,
  CATEGORIES,
  STORAGE_KEY,
  templatesFor,
  createTicket,
  parseTicket,
  shareLink,
  ticketFromLink,
  suggestTool,
  loadWallet,
  FunctionWallet,
} = await import(output.href);
const { createElement } = await import("react");
const { renderToStaticMarkup } = await import("react-dom/server");
test("tous les modèles et catégories ont un usage et une collection accessible", () => {
  for (const category of CATEGORIES)
    assert.ok(
      TOOLS.some((t) => t.categories.includes(category.id)),
      category.id,
    );
  for (const item of ITEMS)
    assert.ok(
      TOOLS.some((t) => templatesFor(t).some((i) => i.id === item.id)),
      item.id,
    );
  for (const tool of TOOLS) {
    const ticket = createTicket(tool);
    assert.ok(parseTicket(ticket), tool.id);
    assert.ok(tool.description.length > 30);
    if (tool.template)
      assert.ok(
        templatesFor(tool).some((i) => i.id === tool.template),
        tool.template,
      );
  }
});
test("les intentions et questions proposent un outil sans inventer une réponse", () => {
  assert.equal(
    suggestTool("Comment réserver pour un mariage ?"),
    "reservation",
  );
  assert.equal(suggestTool("Je veux écrire une carte postale"), "postcard");
  assert.equal(suggestTool("envoyer une facture"), "invoice");
  assert.equal(suggestTool("préparer un devis"), "quote");
  assert.equal(suggestTool("quelle est la météo ?"), null);
});
test("le lien contient une copie lisible depuis un autre navigateur, y compris les accents", () => {
  const ticket = createTicket(TOOLS[1]);
  ticket.details = {
    message: "Bonjour Élodie ✉️\nÀ bientôt !",
    destinataire: "Élodie",
  };
  ticket.stamped = true;
  const link = shareLink(ticket, "https://example.com/?page=old#previous");
  assert.equal(new URL(link).search, "");
  assert.deepEqual(ticketFromLink(link), ticket);
  assert.equal(ticketFromLink(ticket.code), null);
  assert.equal(
    ticketFromLink("https://example.com/#ticket=invalid-json"),
    null,
  );
  assert.equal(
    ticketFromLink("https://example.com/#ticket=" + "x".repeat(30001)),
    null,
  );
});
test("validation des tickets importés : modèle, limites, types et clés dangereuses", () => {
  const ticket = createTicket(TOOLS[0]);
  for (const patch of [
    { version: 2 },
    { code: "FAUX" },
    { itemId: "inconnu" },
    { itemId: "carte-mer" },
    { details: [] },
    { fields: { title: "x".repeat(2001) } },
    { fields: { _href: "javascript:alert(1)" } },
    { stamped: "true" },
  ])
    assert.equal(parseTicket({ ...ticket, ...patch }), null);
  assert.equal(parseTicket(null), null);
});
test("stockage local absent ou corrompu : wallet vide, sans crash", () => {
  globalThis.localStorage = { getItem: () => "{invalid" };
  assert.deepEqual(loadWallet(), []);
  const ticket = createTicket(TOOLS[0]);
  globalThis.localStorage = {
    getItem: (key) =>
      key === STORAGE_KEY ? JSON.stringify([ticket, {}, null]) : null,
  };
  assert.deepEqual(loadWallet(), [ticket]);
});
test("accueil rendu avec les deux entrées, wallet et fente, sans canevas", () => {
  globalThis.window = { location: { href: "https://example.com/" } };
  const html = renderToStaticMarkup(createElement(FunctionWallet));
  assert.ok(html.includes("Une envie ou une question"));
  assert.ok(html.includes("J’ai reçu un code / lien"));
  assert.ok(html.includes("Mon wallet"));
  assert.ok(html.includes("fw-slot"));
  assert.ok(!html.includes("canvas-dots"));
});
