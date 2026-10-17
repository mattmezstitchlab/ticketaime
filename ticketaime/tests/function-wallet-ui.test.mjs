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
window.matchMedia = () => ({
  matches: true,
  addEventListener() {},
  removeEventListener() {},
});
window.HTMLMediaElement.prototype.pause = () => {};
const directory = new URL("../node_modules/.cache/", import.meta.url);
await mkdir(directory, { recursive: true });
const output = new URL("function-wallet-ui.mjs", directory);
const result = await build({
  stdin: {
    contents: `export {default as FunctionWallet} from './src/components/FunctionWallet'; export {createElement,act} from 'react'; export {createRoot} from 'react-dom/client';`,
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
const { FunctionWallet, createElement, createRoot, act } = await import(
  output.href
);
let root;
const mount = async () => {
  root = createRoot(document.getElementById("root"));
  await act(async () => root.render(createElement(FunctionWallet)));
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
const submit = async () =>
  act(async () =>
    document
      .querySelector("form")
      .dispatchEvent(
        new window.Event("submit", { bubbles: true, cancelable: true }),
      ),
  );
const saved = () =>
  JSON.parse(localStorage.getItem("ticketaime-function-wallet-v1") ?? "[]");

test("parcours interactif : réserver, garder sans doublon, partager puis personnaliser une copie", async () => {
  await mount();
  await fill(
    document.querySelector("#fw-query"),
    "Je voudrais réserver pour un mariage",
  );
  await submit();
  assert.ok(document.querySelector(".fw-printed"));
  await click(document.querySelector(".fw-printed"));
  await fill(field("Événement ou prestation"), "Mariage de Camille et Antoine");
  await fill(field("Votre demande"), "Êtes-vous disponible le 12 juin ?");
  await click(button("Garder dans mon wallet"));
  await click(button("Garder dans mon wallet"));
  assert.equal(saved().length, 1);
  assert.equal(saved()[0].details.title, "Mariage de Camille et Antoine");
  assert.ok(
    document
      .querySelector(".fw-stage")
      .textContent.includes("Êtes-vous disponible le 12 juin ?"),
  );
  const original = saved()[0];
  assert.equal(button("Préparer le lien à partager").disabled, true);
  await click(document.querySelector('input[type="checkbox"]'));
  await click(button("Préparer le lien à partager"));
  const link = field("Lien du ticket").value;
  await act(async () => root.unmount());
  localStorage.clear();
  window.history.replaceState(null, "", link);
  await mount();
  assert.ok(
    document.querySelector("h1").textContent.includes("Un ticket pour vous"),
  );
  assert.ok(
    document
      .querySelector(".fw-stage")
      .textContent.includes("Mariage de Camille et Antoine"),
  );
  assert.equal(field("Événement ou prestation"), undefined);
  await click(button("Personnaliser une copie"));
  await click(button("Garder dans mon wallet"));
  assert.notEqual(saved()[0].id, original.id);
  assert.notEqual(saved()[0].code, original.code);
  assert.equal(saved()[0].details.title, original.details.title);
  await click(button("Le Monde Aime"));
  assert.equal(window.location.hash, "");
  await click(button("J’ai reçu un code / lien"));
  await fill(document.querySelector("#fw-query"), saved()[0].code);
  await submit();
  assert.ok(document.querySelector(".fw-printed"));
  await fill(document.querySelector("#fw-query"), "LMA-000000000000");
  await submit();
  assert.ok(
    document
      .querySelector('[role="status"]')
      .textContent.includes("Code introuvable"),
  );
  assert.equal(document.querySelector(".fw-printed"), null);
  await act(async () => root.unmount());
});

test("carte postale : timbre, modèle, message, collage, reprise et filtres du wallet", async () => {
  localStorage.clear();
  window.history.replaceState(null, "", "/");
  await mount();
  await fill(
    document.querySelector("#fw-query"),
    "Comment envoyer une carte postale ?",
  );
  await submit();
  assert.ok(document.querySelector(".printed-piece .lma-piece-preview"));
  await click(document.querySelector(".fw-printed"));
  await fill(field("Choisir une carte postale"), "carte-tour-eiffel");
  await fill(field("Votre mot"), "Bonjour Élodie !");
  await click(button("Prendre le timbre et le coller"));
  assert.ok(document.querySelector(".fw-stamp.is-stamped"));
  await click(button("Garder dans mon wallet"));
  assert.equal(saved()[0].itemId, "carte-tour-eiffel");
  assert.equal(saved()[0].stamped, true);
  assert.equal(saved()[0].details.message, "Bonjour Élodie !");
  await act(async () => root.unmount());
  await mount();
  await click(button("Les tickets"));
  await click(button("Mes tickets gardés"));
  assert.equal(document.querySelectorAll("[data-pocket-entry]").length, 1);
  await click(document.querySelector("[data-pocket-entry]"));
  assert.equal(field("Votre mot").value, "Bonjour Élodie !");
  await click(button("← Le wallet"));
  await click(button("Les outils"));
  await fill(field("Catégorie"), "spectacle");
  assert.equal(document.querySelectorAll(".fw-tool").length, 1);
  assert.equal(document.querySelectorAll("[data-pocket-entry]").length, 10);
  await fill(field("Catégorie"), "timbre");
  assert.equal(document.querySelectorAll("[data-pocket-entry]").length, 8);
  await click(document.querySelector("[data-pocket-entry]"));
  await click(button("Prendre le timbre et le coller"));
  assert.ok(document.querySelector(".fw-stamp .lma-piece-preview"));
  assert.equal(document.querySelector("canvas"), null);
  await click(button("← Le wallet"));
  await fill(field("Rechercher un usage"), "introuvablexyz");
  assert.equal(document.querySelectorAll(".fw-tool").length, 0);
  assert.ok(document.querySelector("main").textContent.includes("Aucun outil"));
  await act(async () => root.unmount());
});

test("collage au dépôt et stockage plein : pas de faux succès", async () => {
  localStorage.clear();
  window.history.replaceState(null, "", "/");
  await mount();
  await click(button("Explorer tous les outils"));
  await click(button("Écrire une carte"));
  const drop = new window.Event("drop", { bubbles: true, cancelable: true });
  Object.defineProperty(drop, "dataTransfer", {
    value: { getData: () => "lma-stamp" },
  });
  await act(async () =>
    document.querySelector(".fw-stamp-target").dispatchEvent(drop),
  );
  assert.ok(document.querySelector(".fw-stamp.is-stamped"));
  const setItem = window.Storage.prototype.setItem;
  window.Storage.prototype.setItem = () => {
    throw new Error("quota");
  };
  await click(button("Garder dans mon wallet"));
  assert.ok(
    document
      .querySelector('[role="status"]')
      .textContent.includes("n’a pas été enregistré"),
  );
  assert.equal(saved().length, 0);
  window.Storage.prototype.setItem = setItem;
  await act(async () => root.unmount());
});

test("les scènes photographiques d’origine ouvrent le nouvel atelier, pas le canevas", async () => {
  localStorage.clear();
  window.history.replaceState(null, "", "/");
  await mount();
  assert.ok(document.querySelector(".hero-float--mail"));
  assert.ok(document.querySelector("#video-postcard video"));
  assert.ok(document.querySelectorAll(".usage-photo").length > 0);
  await click(document.querySelector("#usage-spectacle .scene-cta"));
  assert.ok(document.querySelector(".fw-editor"));
  assert.equal(field("Choisir un modèle").value, "opera");
  assert.equal(document.querySelector("canvas"), null);
  assert.equal(document.querySelector(".fw-nav"), null);
  await act(async () => root.unmount());
});

test("collection blanche : 19 catégories, contrôles accessibles sans classeur ni Table et modèles inertes", async () => {
  localStorage.clear();
  window.history.replaceState(null, "", "/");
  await mount();
  await click(button("Explorer tous les outils"));
  const book = document.querySelector(
    ".original-pocket-book.functional-pocket-book",
  );
  assert.ok(book);
  assert.equal(book.querySelectorAll(".pocket-tab").length, 19);
  assert.ok(book.classList.contains("plain-ticket-collection"));
  assert.equal(book.textContent.includes("Pochette transparente"), false);
  assert.equal(
    [...book.querySelectorAll("button")].some((el) =>
      el.textContent.includes("+ Table"),
    ),
    false,
  );
  await fill(field("Catégorie"), "web");
  assert.equal(book.querySelectorAll("[data-pocket-entry]").length, 14);
  assert.ok(book.querySelector("[data-pocket-entry] [inert]"));
  await fill(field("Catégorie"), "postale");
  const pocket = book.querySelector("[data-pocket-entry]");
  assert.equal(pocket.getAttribute("role"), "button");
  assert.equal(pocket.tabIndex, 0);
  await act(async () =>
    pocket.dispatchEvent(
      new window.KeyboardEvent("keydown", { key: "Enter", bubbles: true }),
    ),
  );

  assert.ok(document.querySelector(".fw-editor"));
  assert.equal(document.querySelector("canvas"), null);
  await act(async () => root.unmount());
});

test("atelier : dupliquer conserve le contenu avec un nouveau code et imprimer appelle le navigateur", async () => {
  localStorage.clear();
  window.history.replaceState(null, "", "/");
  await mount();
  await fill(document.querySelector("#fw-query"), "réserver pour un mariage");
  await submit();
  await click(document.querySelector(".fw-printed"));
  await fill(field("Votre demande"), "Une réception pour 50 personnes.");
  await click(button("Garder dans mon wallet"));
  const original = saved()[0];
  await click(button("Dupliquer le ticket"));
  await click(button("Garder dans mon wallet"));
  assert.equal(saved().length, 2);
  assert.notEqual(saved()[0].code, original.code);
  assert.equal(saved()[0].details.message, original.details.message);
  let prints = 0;
  window.print = () => {
    prints++;
  };
  await click(button("Imprimer ce ticket"));
  assert.equal(prints, 1);
  await click(button("← Le wallet"));
  await click(button("Mes tickets gardés"));
  assert.equal(
    document.querySelectorAll(".original-pocket-book [data-pocket-entry]")
      .length,
    2,
  );
  assert.ok(
    document
      .querySelector(".original-pocket-book")
      .textContent.includes("2 tickets gardés"),
  );
  await act(async () => root.unmount());
});

test("hero : vidéo de fond derrière les tickets, pause et réduction des animations", async () => {
  localStorage.clear();
  window.history.replaceState(null, "", "/");
  await mount();
  const hero = document.querySelector(".lma-hero");
  const background = hero.querySelector(".hero-background-video");
  assert.equal(background.parentElement, hero);
  const video = background.querySelector("video");
  assert.equal(video.getAttribute("aria-hidden"), "true");
  assert.equal(video.controls, false);
  assert.equal(video.loop, true);
  assert.equal(video.muted, true);
  assert.equal(
    video.querySelector("source").getAttribute("src"),
    "/videos/le-monde-aime-postcard.mp4",
  );
  assert.ok(hero.querySelectorAll(".hero-float").length >= 4);
  assert.ok(button("Lire la vidéo"));
  let played = 0;
  video.play = async () => {
    played++;
  };
  await click(button("Lire la vidéo"));
  assert.equal(played, 1);
  await act(async () =>
    video.dispatchEvent(new window.Event("play", { bubbles: true })),
  );
  assert.ok(button("Mettre la vidéo en pause"));
  await act(async () => root.unmount());
});
