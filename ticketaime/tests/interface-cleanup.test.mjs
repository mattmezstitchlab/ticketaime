import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = path => readFileSync(new URL(`../src/${path}`, import.meta.url), 'utf8');
test('les contrôles de fausse certification et Wallet ne sont plus montés dans l’atelier', () => {
  const inspector = read('components/Inspector.tsx');
  const studio = read('components/StudioCanvas.tsx');
  assert.ok(!inspector.includes('<SecurityBadge'));
  assert.ok(!inspector.includes('<WalletSheet'));
  assert.ok(!studio.includes('<SecurityBadge'));
  assert.ok(!studio.includes('✓ Certificat'));
});
test('l’accueil ne demande plus de rôle ni ne renvoie au catalogue complet', () => {
  assert.ok(!read('components/landing/IdeaPrinter.tsx').includes('role-picker'));
  assert.ok(!read('components/Landing.tsx').includes('page=professionnels'));
  assert.ok(!read('components/Landing.tsx').includes('page=guide'));
});
