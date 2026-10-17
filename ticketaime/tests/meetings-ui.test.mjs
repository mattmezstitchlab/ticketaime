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
const output = new URL("meetings-ui.mjs", directory);
const result = await build({
  stdin: {
    contents: `export {default as Meetings} from './src/components/Meetings'; export {createElement,act} from 'react'; export {createRoot} from 'react-dom/client';`,
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
const { Meetings, createElement, createRoot, act } = await import(output.href);
let root;
const mount = async () => {
  root = createRoot(document.getElementById("root"));
  await act(async () => root.render(createElement(Meetings)));
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

const discover = async () => {
  await click(field("J’ai 18 ans ou plus."));
  await click(button("Faire une rencontre"));
};
const openProfile = async () => {
  await click(document.querySelector(".meeting-profile-stamp"));
};
const submit = async () =>
  act(async () =>
    document
      .querySelector('[role="dialog"] form')
      .dispatchEvent(
        new window.Event("submit", { bubbles: true, cancelable: true }),
      ),
  );
test("démo : fente vide, intentions amicale et amoureuse, accès majeur requis", async () => {
  await mount();
  assert.equal(document.querySelector(".meeting-profile-stamp"), null);
  assert.equal(button("Faire une rencontre").disabled, true);
  assert.equal(field("Amicale").checked, true);
  assert.equal(field("Amoureuse").checked, true);
  assert.ok(
    document
      .querySelector(".meeting-banner")
      .textContent.includes("Personnages inventés"),
  );
  await discover();
  assert.ok(document.querySelector(".meeting-profile-stamp"));
  assert.ok(
    document
      .querySelector(".meeting-profile-stamp")
      .textContent.includes("PROFIL FICTIF"),
  );
  await click(field("J’ai 18 ans ou plus."));
  assert.equal(document.querySelector(".meeting-profile-stamp"), null);
  await act(async () => root.unmount());
});
test("invitation précise, chat impossible avant acceptation explicitement simulée", async () => {
  await mount();
  await discover();
  await openProfile();
  await click(button("Écrire une attention"));
  assert.ok(
    document
      .querySelector('[role="dialog"] fieldset')
      .textContent.includes("Amicale"),
  );
  assert.equal(button("Simuler l’invitation").disabled, true);
  await fill(field("Votre première attention"), "Un café et une promenade ?");
  await submit();
  assert.equal(document.querySelector(".meeting-chat"), null);
  assert.ok(
    document.querySelector("blockquote").textContent.includes("Un café"),
  );
  assert.ok(
    document
      .querySelector('[role="dialog"]')
      .textContent.includes("non envoyée"),
  );
  await click(button("Simuler son acceptation"));
  assert.ok(document.querySelector(".meeting-chat"));
  assert.ok(
    document
      .querySelector(".meeting-system")
      .textContent.includes("Aucun message"),
  );
  await fill(field("Message de démonstration"), "Bonjour !");
  await submit();
  assert.ok(
    document
      .querySelector(".meeting-chat")
      .textContent.includes("Vous · non envoyé"),
  );
  assert.equal(field("Message de démonstration").value, "");
  await act(async () => root.unmount());
  await mount();
  assert.equal(document.querySelector(".meeting-profile-stamp"), null);
  assert.equal(document.querySelector(".meeting-chat"), null);
  await act(async () => root.unmount());
});
test("filtre amical, refus simulé, masquage local et signalement non transmis", async () => {
  await mount();
  await click(field("Amoureuse"));
  await discover();
  await openProfile();
  await click(button("Écrire une attention"));
  assert.equal(document.querySelectorAll('input[type="radio"]').length, 1);
  await fill(field("Votre première attention"), "Une expo ?");
  await submit();
  await click(button("Simuler son refus"));
  assert.equal(document.querySelector(".meeting-chat"), null);
  assert.equal(document.querySelector('[role="dialog"]'), null);
  await click(button("Faire une rencontre"));
  await openProfile();
  await click(button("Simuler un signalement"));
  await fill(field("Motif"), "Profil suspect");
  await submit();
  assert.ok(
    document
      .querySelector('[role="dialog"] [role="status"]')
      .textContent.includes("rien n’a été transmis"),
  );
  const name = document.querySelector(
    ".meeting-dialog-body aside>p",
  ).textContent;
  await click(button("Masquer ce profil"));
  assert.equal(document.querySelector(".meeting-profile-stamp"), null);
  assert.ok(
    document
      .querySelector('[role="status"]')
      .textContent.includes("Aucun blocage serveur"),
  );
  await click(button("Faire une rencontre"));
  await openProfile();
  assert.notEqual(
    document.querySelector(".meeting-dialog-body aside>p").textContent,
    name,
  );
  await act(async () => root.unmount());
});
test("intentions vides et réinitialisation ; aucun stockage navigateur", async () => {
  localStorage.clear();
  await mount();
  await click(field("Amicale"));
  await click(field("Amoureuse"));
  await click(field("J’ai 18 ans ou plus."));
  assert.equal(button("Faire une rencontre").disabled, true);
  await click(button("Réinitialiser la démo"));
  assert.equal(field("J’ai 18 ans ou plus.").checked, false);
  assert.equal(field("Amicale").checked, true);
  assert.equal(localStorage.length, 0);
  await act(async () => root.unmount());
});
test("dialogue : focus contenu, boucle clavier et Échap", async () => {
  await mount();
  await discover();
  const trigger = document.querySelector(".meeting-profile-stamp");
  trigger.focus();
  await click(trigger);
  const dialog = document.querySelector('[role="dialog"]');
  const controls = [
    ...dialog.querySelectorAll("button:not(:disabled),input,textarea,select"),
  ];
  assert.equal(document.activeElement.id, "meeting-title");
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
      new window.KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
    ),
  );
  assert.equal(document.querySelector('[role="dialog"]'), null);
  assert.equal(document.activeElement, trigger);
  await act(async () => root.unmount());
});

test("intention amoureuse : invitation étiquetée, aucun profil purement amical, épuisement géré", async () => {
  await mount();
  await click(field("Amicale"));
  await discover();
  await openProfile();
  await click(button("Écrire une attention"));
  const radio = document.querySelector('input[type="radio"]');
  assert.equal(radio.value, "romance");
  assert.equal(radio.checked, true);
  await fill(field("Votre première attention"), "Ravie de faire connaissance.");
  await submit();
  assert.ok(
    document
      .querySelector(".meeting-intent-label")
      .textContent.includes("amoureuse"),
  );
  await click(button("Masquer ce profil"));
  await click(button("Faire une rencontre"));
  await openProfile();
  assert.ok(
    !document
      .querySelector(".meeting-dialog-body aside>p")
      .textContent.includes("Lou"),
  );
  await click(button("Masquer ce profil"));
  assert.equal(button("Faire une rencontre").disabled, true);
  assert.ok(
    document
      .querySelector("main")
      .textContent.includes("Tous les profils compatibles ont été masqués"),
  );
  await act(async () => root.unmount());
});
