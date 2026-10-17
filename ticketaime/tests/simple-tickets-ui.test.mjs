import { test } from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
import { mkdir, writeFile } from "node:fs/promises";
import { JSDOM } from "jsdom";
const dom = new JSDOM('<div id="root"></div>', { url: "https://example.com/" });
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.localStorage = dom.window.localStorage;
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
globalThis.IntersectionObserver = class {
  observe() {}
  disconnect() {}
};
window.scrollTo = () => {};
globalThis.requestAnimationFrame = (callback) => {
  callback();
  return 1;
};
window.matchMedia = () => ({
  matches: true,
  addEventListener() {},
  removeEventListener() {},
});
window.HTMLMediaElement.prototype.pause = () => {};
const directory = new URL("../node_modules/.cache/", import.meta.url);
await mkdir(directory, { recursive: true });
const output = new URL("simple-tickets-ui.mjs", directory);
const result = await build({
  stdin: {
    contents: `export {default as SimpleTickets} from './src/components/SimpleTickets'; export {createElement,act} from 'react'; export {createRoot} from 'react-dom/client';`,
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
await writeFile(output, result.outputFiles[0].text);
const { SimpleTickets, createElement, createRoot, act } = await import(
  output.href
);
let root;
const mount = async () => {
  root = createRoot(document.getElementById("root"));
  await act(async () => root.render(createElement(SimpleTickets)));
};
const click = async (element) => {
  assert.ok(element, "élément cliquable trouvé");
  await act(async () => element.click());
};
const button = (text) =>
  [...document.querySelectorAll("button")].find((b) =>
    b.textContent
      .toLocaleLowerCase("fr")
      .includes(text.toLocaleLowerCase("fr")),
  );
const field = (label) =>
  [...document.querySelectorAll("label")]
    .find((el) => el.textContent.startsWith(label))
    ?.querySelector("input,select,textarea");
const fill = async (element, value) => {
  assert.ok(element, "champ trouvé");
  const prototype =
    element.tagName === "SELECT"
      ? window.HTMLSelectElement.prototype
      : element.tagName === "TEXTAREA"
        ? window.HTMLTextAreaElement.prototype
        : window.HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(prototype, "value").set.call(element, value);
  await act(async () => {
    element.dispatchEvent(new window.Event("input", { bubbles: true }));
    element.dispatchEvent(new window.Event("change", { bubbles: true }));
  });
};

const key = "ticketaime-simple-creations-v1";
const saved = () => JSON.parse(localStorage.getItem(key) || "[]");
const pointer = async (el, type, x, y) => {
  const event = new window.MouseEvent(type, {
    bubbles: true,
    button: 0,
    clientX: x,
    clientY: y,
  });
  await act(async () => el.dispatchEvent(event));
};
test("accueil minimal : grand titre, huit tickets, ni vidéo ni code ni wallet", async () => {
  localStorage.clear();
  await mount();
  assert.equal(document.querySelector("h1").textContent, "LE MONDEAIME.");
  assert.equal(document.querySelectorAll(".st-floating").length, 8);
  assert.equal(document.querySelector("video"), null);
  assert.equal(document.querySelector("input"), null);
  assert.equal(document.querySelector(".fw-wallet"), null);
  assert.ok(document.querySelector(".st-slot"));
  await act(async () => root.unmount());
});
test("glisser déplace sans ouvrir ; clic et clavier ouvrent en plein écran", async () => {
  await mount();
  const ticket = document.querySelector(".st-floating");
  ticket.parentElement.getBoundingClientRect = () => ({
    width: 1000,
    height: 800,
  });
  await pointer(ticket, "pointerdown", 10, 20);
  await pointer(ticket, "pointermove", 80, 100);
  await pointer(ticket, "pointerup", 80, 100);
  await click(ticket);
  assert.equal(document.querySelector('[role="dialog"]'), null);
  assert.ok(ticket.style.transform.includes("70px, 80px"));
  await click(ticket);
  assert.ok(document.querySelector('[role="dialog"][aria-modal="true"]'));
  assert.equal(document.body.style.overflow, "hidden");
  await click(button("Fermer sans enregistrer"));
  assert.equal(document.querySelector('[role="dialog"]'), null);
  await act(async () =>
    ticket.dispatchEvent(
      new window.KeyboardEvent("keydown", { key: "Enter", bubbles: true }),
    ),
  );
  assert.ok(document.querySelector('[role="dialog"]'));
  await act(async () => root.unmount());
});
test("éditer, valider, timbre, rouvrir, mise à jour sans doublon et reprise", async () => {
  localStorage.clear();
  await mount();
  await click(document.querySelector(".st-floating"));
  const input = document.querySelector(".st-fields input");
  if (input) await fill(input, "MON ÉVÉNEMENT");
  await fill(field("Votre mot"), "Bonjour Élodie !");
  await click(button("Valider"));
  assert.equal(document.querySelector('[role="dialog"]'), null);
  assert.equal(saved().length, 1);
  assert.equal(saved()[0].note, "Bonjour Élodie !");
  assert.ok(document.querySelector(".st-stamp"));
  assert.ok(
    document
      .querySelector('[role="status"]')
      .textContent.includes("enregistrée"),
  );
  await click(document.querySelector(".st-stamp"));
  assert.equal(field("Votre mot").value, "Bonjour Élodie !");
  await fill(field("Votre mot"), "Une nouvelle version");
  await click(button("Valider"));
  assert.equal(saved().length, 1);
  await act(async () => root.unmount());
  await mount();
  await click(document.querySelector(".st-saved-list button"));
  assert.equal(field("Votre mot").value, "Une nouvelle version");
  await act(async () => root.unmount());
});
test("annulation et échec de sauvegarde ne font pas sortir de timbre", async () => {
  localStorage.clear();
  await mount();
  await click(document.querySelector(".st-floating"));
  await fill(field("Votre mot"), "Ne pas garder");
  await click(button("Fermer sans enregistrer"));
  assert.equal(saved().length, 0);
  assert.equal(document.querySelector(".st-stamp"), null);
  await click(document.querySelector(".st-floating"));
  const original = window.Storage.prototype.setItem;
  window.Storage.prototype.setItem = () => {
    throw new Error("quota");
  };
  await click(button("Valider"));
  assert.ok(
    document.querySelector('[role="alert"]').textContent.includes("impossible"),
  );
  assert.ok(document.querySelector('[role="dialog"]'));
  assert.equal(document.querySelector(".st-stamp"), null);
  window.Storage.prototype.setItem = original;
  await act(async () => root.unmount());
});
test("catalogue : tous les modèles, filtre et modèles web inertes", async () => {
  await mount();
  await click(button("Tous les tickets"));
  assert.equal(document.querySelectorAll(".st-model").length, 168);
  await fill(field("Catégorie"), "web");
  assert.equal(document.querySelectorAll(".st-model").length, 14);
  assert.ok(document.querySelector(".st-model [inert]"));
  await click(document.querySelector(".st-model"));
  assert.ok(document.querySelector('[role="dialog"]'));
  await act(async () => root.unmount());
});

test("éditeur : focus contenu, Échap annule et restitue le focus", async () => {
  localStorage.clear();
  await mount();
  const ticket = document.querySelector(".st-floating");
  ticket.focus();
  await click(ticket);
  const dialog = document.querySelector('[role="dialog"]');
  const controls = [...dialog.querySelectorAll("button,input,textarea")];
  assert.equal(document.activeElement.id, "st-editor-title");
  await act(async () =>
    dialog.dispatchEvent(
      new window.KeyboardEvent("keydown", {
        key: "Tab",
        shiftKey: true,
        bubbles: true,
        cancelable: true,
      }),
    ),
  );
  assert.equal(document.activeElement, controls.at(-1));
  await act(async () =>
    dialog.dispatchEvent(
      new window.KeyboardEvent("keydown", {
        key: "Tab",
        bubbles: true,
        cancelable: true,
      }),
    ),
  );
  assert.equal(document.activeElement, controls[0]);
  await act(async () =>
    dialog.dispatchEvent(
      new window.KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
    ),
  );
  assert.equal(document.querySelector('[role="dialog"]'), null);
  assert.equal(document.activeElement, ticket);
  assert.equal(document.body.style.overflow, "");
  await act(async () => root.unmount());
});
