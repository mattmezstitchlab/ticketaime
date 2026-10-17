import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
test('le masque du timbre garde un centre opaque et ne répète les perforations que le long des bords', () => {
  const css = readFileSync(new URL('../src/simple-tickets.css', import.meta.url), 'utf8');
  const mask = css.slice(css.indexOf('  mask:'), css.indexOf(';', css.indexOf('  mask:')));
  assert.ok(mask.includes('linear-gradient(#000 0 0)'));
  assert.ok(mask.includes('no-repeat'));
  assert.equal((mask.match(/repeat-x/g) || []).length, 2);
  assert.equal((mask.match(/repeat-y/g) || []).length, 2);
  assert.ok(!mask.includes('/12px 12px'));
});
