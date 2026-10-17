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

const key = "ticketaime-signature-stamps-v1";
const saved = () => JSON.parse(localStorage.getItem(key) || "[]");
test("un seul timbre de marque, fente centrale, ni catalogue ni vidéo ni code", async () => {
  localStorage.clear();
  await mount();
  assert.equal(document.querySelectorAll(".signature-trigger").length, 1);
  assert.ok(document.querySelector("h1").textContent.includes("LE MONDE"));
  assert.ok(
    document
      .querySelector(".signature-trigger strong")
      .textContent.includes("AIME"),
  );
  assert.ok(document.querySelector(".signature-slot"));
  assert.equal(document.querySelector("video,input,select,.st-grid"), null);
  assert.equal(button("Tous les tickets"), undefined);
  await act(async () => root.unmount());
});
test("édition plein écran, aperçu, validation, sortie du timbre et reprise sans doublon", async () => {
  localStorage.clear();
  await mount();
  await click(document.querySelector(".signature-trigger"));
  assert.ok(document.querySelector('[role="dialog"][aria-modal="true"]'));
  await fill(field("Pour qui ?"), "Élodie");
  await fill(field("Votre mot"), "Une belle attention.");
  await fill(field("Votre signature"), "Camille");
  assert.ok(
    document
      .querySelector(".signature-preview")
      .textContent.includes("Pour Élodie"),
  );
  await click(button("Valider"));
  assert.equal(saved().length, 1);
  assert.equal(saved()[0].message, "Une belle attention.");
  assert.equal(document.querySelector('[role="dialog"]'), null);
  assert.ok(document.querySelector(".signature-trigger.is-issued"));
  await click(document.querySelector(".signature-trigger"));
  assert.equal(field("Votre mot").value, "Une belle attention.");
  await fill(field("Votre mot"), "Une deuxième version");
  await click(button("Valider"));
  assert.equal(saved().length, 1);
  await act(async () => root.unmount());
  await mount();
  await click(document.querySelector(".signature-collection button"));
  assert.equal(field("Votre mot").value, "Une deuxième version");
  await act(async () => root.unmount());
});
test("annulation, stockage plein et nouvelle attention indépendante", async () => {
  localStorage.clear();
  await mount();
  await click(document.querySelector(".signature-trigger"));
  await fill(field("Votre mot"), "Annuler");
  await click(button("Fermer sans enregistrer"));
  assert.equal(saved().length, 0);
  assert.equal(document.querySelector(".is-issued"), null);
  await click(document.querySelector(".signature-trigger"));
  const original = window.Storage.prototype.setItem;
  window.Storage.prototype.setItem = () => {
    throw new Error("quota");
  };
  await click(button("Valider"));
  assert.ok(document.querySelector('[role="alert"]'));
  assert.ok(document.querySelector('[role="dialog"]'));
  assert.equal(document.querySelector(".is-issued"), null);
  window.Storage.prototype.setItem = original;
  await click(button("Valider"));
  await click(button("Créer une autre attention"));
  assert.equal(field("Votre mot").value, "");
  await click(button("Valider"));
  assert.equal(saved().length, 2);
  assert.notEqual(saved()[0].id, saved()[1].id);
  await act(async () => root.unmount());
});
test("dialogue accessible : focus, boucle clavier, Échap et retour", async () => {
  localStorage.clear();
  await mount();
  const trigger = document.querySelector(".signature-trigger");
  trigger.focus();
  await click(trigger);
  const dialog = document.querySelector('[role="dialog"]');
  const controls = [...dialog.querySelectorAll("button,input,textarea")];
  assert.equal(document.activeElement.id, "signature-title");
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
  assert.equal(document.activeElement, trigger);
  await act(async () => root.unmount());
});
test("stockage corrompu : accueil disponible et anciens brouillons non effacés", async () => {
  localStorage.setItem(key, "invalid");
  localStorage.setItem("ticketaime-simple-creations-v1", "legacy");
  await mount();
  assert.ok(document.querySelector(".signature-trigger"));
  assert.equal(document.querySelector(".signature-saved"), null);
  assert.equal(
    localStorage.getItem("ticketaime-simple-creations-v1"),
    "legacy",
  );
  await act(async () => root.unmount());
  localStorage.clear();
});
