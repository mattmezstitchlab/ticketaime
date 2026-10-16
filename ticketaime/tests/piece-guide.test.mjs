import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { mkdir, writeFile, rm } from 'node:fs/promises';
const directory = new URL('../node_modules/.cache/', import.meta.url);
await mkdir(directory, { recursive: true });
const output = new URL('piece-guide-test.mjs', directory);
const result = await build({
  stdin: { contents: `export {ROLES,rolesForCategory,recommendPieces} from './src/data/pieceRoles'; export {ITEMS,CATEGORIES} from './src/data/catalogue'; export {PIECE_USES} from './src/data/pieceUses'; export {default as PieceGuide} from './src/components/PieceGuide';`, resolveDir: new URL('../', import.meta.url).pathname, loader: 'tsx' },
  bundle: true, platform: 'node', format: 'esm', packages: 'external', loader: { '.css': 'empty' }, write: false,
});
await writeFile(output, result.outputFiles[0].text);
const { ITEMS, CATEGORIES, PIECE_USES, PieceGuide, ROLES, rolesForCategory, recommendPieces } = await import(output.href);
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
await rm(output);
