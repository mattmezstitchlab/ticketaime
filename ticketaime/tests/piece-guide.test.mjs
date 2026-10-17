import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { mkdir, writeFile, rm } from 'node:fs/promises';
const directory = new URL('../node_modules/.cache/', import.meta.url);
await mkdir(directory, { recursive: true });
const output = new URL('piece-guide-test.mjs', directory);
const result = await build({
  stdin: { contents: `export {parseScenario,loadSection,sectionKey} from './src/data/storyStorage'; export {default as StoryJourney} from './src/components/landing/StoryJourney'; export {default as PieceObject} from './src/components/PieceObject'; export {default as ProfessionalJourney} from './src/components/ProfessionalJourney'; export {ROLES,rolesForCategory,recommendPieces} from './src/data/pieceRoles'; export {ITEMS,CATEGORIES} from './src/data/catalogue'; export {PIECE_USES} from './src/data/pieceUses'; export {default as PieceGuide} from './src/components/PieceGuide';`, resolveDir: new URL('../', import.meta.url).pathname, loader: 'tsx' },
  bundle: true, platform: 'node', format: 'esm', packages: 'external', loader: { '.css': 'empty' }, write: false,
});
await writeFile(output, result.outputFiles[0].text);
const { parseScenario, loadSection, sectionKey, StoryJourney, PieceObject, ProfessionalJourney, ITEMS, CATEGORIES, PIECE_USES, PieceGuide, ROLES, rolesForCategory, recommendPieces } = await import(output.href);
const { createElement } = await import('react');
const { renderToStaticMarkup } = await import('react-dom/server');
test('chaque modèle du catalogue possède une fiche d’usage complète', () => {
  assert.equal(ITEMS.length, 168);
  assert.equal(CATEGORIES.length, 19);
  assert.equal(new Set(ITEMS.map(i => i.id)).size, 168);
  for (const item of ITEMS) {
    const use = PIECE_USES[item.category];
    assert.ok(use?.usage && use.advantage && use.requires, item.id);
  }
});
test('la page rend toutes les pièces et rappelle les limites fiscales et de sécurité', () => {
  const html = renderToStaticMarkup(createElement(PieceGuide));
  assert.equal((html.match(/<article id="piece-/g) || []).length, 168);
  assert.equal((html.match(/Reçu fiscal : pas automatique/g) || []).length, 168);
  assert.equal((html.match(/inert=""/g) || []).length, 168);
  assert.ok(html.includes('ne garantit ni sécurité ni avantage fiscal'));
  assert.ok(html.includes('ne remplace ni comptabilité'));
  for (const item of ITEMS) assert.ok(html.includes(`id="piece-${item.id}"`), item.id);
});
test('tous les rôles ont des parcours de modèles existants et des limites explicites', () => {
  for (const role of Object.keys(ROLES)) {
    const steps = recommendPieces('Le mariage de Camille et Antoine le 12 juin', role);
    assert.ok(steps.length > 0);
    assert.equal(new Set(steps.map(s => s.id)).size, steps.length);
    for (const step of steps) {
      const item = ITEMS.find(i => i.id === step.draft.itemId);
      assert.ok(item, step.id);
      assert.ok(rolesForCategory(item.category).creators.includes(role));
      assert.ok(step.reason && step.recipient && step.privacy);
      assert.ok(step.draft.brief.includes('Pièce complémentaire'));
    }
  }
  const guest = recommendPieces('mariage avec RSVP', 'guest');
  assert.ok(guest.every(s => s.id !== 'invitation'));
  assert.ok(guest[0].privacy.includes('allergie'));
  const organizer = recommendPieces('mariage', 'organizer');
  assert.ok(organizer.some(s => s.id === 'rsvp'));
  assert.ok(organizer.some(s => s.id === 'transport'));
  assert.ok(recommendPieces('association', 'association').some(s => s.id === 'solidarity'));
});
test('les 168 pièces disposent de rôles créateurs et destinataires documentés', () => {
  for (const item of ITEMS) { const policy = rolesForCategory(item.category); assert.ok(policy.creators.length && policy.recipients.length && policy.note); }
});
test('le parcours professionnel rend un calendrier daté et annonce ses limites', () => {
  const html = renderToStaticMarkup(createElement(ProfessionalJourney));
  assert.equal((html.match(/data-calendar-date=/g) || []).length, 30);
  assert.ok(html.includes('Prototype de démonstration'));
  assert.ok(html.includes('Aucun abonnement disponible'));
  assert.ok(html.includes('12/05/2027'));
  assert.ok(html.includes('href="#event-section-invitation"'));
  assert.ok(html.includes('id="event-section-invitation"'));
  assert.ok(!html.includes('wallet-day-back'));
  assert.ok(!html.includes('wallet-card-art'));
  assert.ok(html.includes('Invitation'));
  assert.ok(html.includes('Navette, 12 juin 2027, rejoindre la section'));
  assert.ok(html.includes('Cartes permanentes'));
});
test('objet-pièce : pochette, aperçu interchangeable et détails facultatifs', () => {
  const html = renderToStaticMarkup(createElement(PieceObject, {model:'opera',title:'Invitation',state:'Exemple',description:'Brouillon',deadline:'2027-05-12'}));
  assert.ok(html.includes('data-piece-model="opera"'));
  assert.ok(html.includes('piece-pocket-opening'));
  assert.ok(html.includes('<summary>Utilité et précautions</summary>'));
  assert.ok(!html.includes('Lire le verso'));
  assert.ok(html.includes('/?page=guide#piece-opera'));
  assert.ok(html.includes('12/05/2027'));
  assert.ok(html.includes('inert=""'));
  const artwork = renderToStaticMarkup(createElement(PieceObject, {model:'opera',title:'Invitation',state:'Exemple',description:'Brouillon',artworkUrl:'/images/render.webp'}));
  assert.ok(artwork.includes('src="/images/render.webp"'));
  assert.ok(artwork.includes('/?module=opera'));
});
test('le scénario déploie une section personnalisable par pièce sans collecte active', () => {
  const steps = recommendPieces('Notre mariage le 12 juin', 'organizer');
  const html = renderToStaticMarkup(createElement(StoryJourney, {steps, onOpen: () => {}}));
  assert.equal((html.match(/class="story-section"/g) || []).length, steps.length);
  assert.equal((html.match(/type="file"/g) || []).length, steps.length);
  assert.equal((html.match(/type="color"/g) || []).length, steps.length);
  assert.ok(html.includes('réponses et actions serveur non connectées'));
  assert.ok(html.includes('sans synchronisation'));
  assert.ok(!html.includes('<form'));
  assert.ok(html.includes('Raconter l’histoire'));
  assert.ok(html.includes('aria-controls="story-recap"'));
  assert.ok(html.includes('id="story-recap" hidden=""'));
  assert.ok(html.includes('sans lecture audio automatique'));
});
test('sauvegarde : validation du scénario et restauration des textes/couleurs', () => {
  const steps = recommendPieces('mariage', 'organizer');
  assert.equal(parseScenario(JSON.parse(JSON.stringify(steps))).length, steps.length);
  assert.deepEqual(parseScenario([{id:'fake'}]), []);
  assert.deepEqual(parseScenario([...steps, steps[0]]), []);
  const original = globalThis.localStorage;
  const data = new Map();
  globalThis.localStorage = { getItem: key => data.get(key) ?? null };
  const fallback = {title:'Invitation',text:'Texte',background:'#f5f3ee'};
  assert.deepEqual(loadSection('test', fallback), fallback);
  const edited = {title:'Notre mariage',text:'Bienvenue',background:'#aabbcc'};
  data.set(sectionKey('test'), JSON.stringify(edited));
  assert.deepEqual(loadSection('test', fallback), edited);
  data.set(sectionKey('test'), '{broken');
  assert.deepEqual(loadSection('test', fallback), fallback);
  if (original === undefined) delete globalThis.localStorage; else globalThis.localStorage = original;
});
await rm(output);
