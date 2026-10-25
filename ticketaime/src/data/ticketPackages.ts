import { ITEMS } from './catalogue';
import { composeFromBrief } from './landing';
import type { CreationDraft } from './landing';
const COMPLEMENTS: Record<string, string[]> = {
  mariage: ['carte-mer','kraft-pass','photo-carte'],
  spectacle: ['carte-mer','photo-carte'], cinema: ['carte-mer','photo-carte'],
  voyage: ['carte-mer','photo-carte'], administratif: ['carte-mer'],
  loisirs: ['carte-mer','photo-carte'], bar: ['carte-mer','photo-carte'],
  postale: ['photo-carte'], monnaies: ['carte-mer'],
};
export function packageFromBrief(brief: string, usageId?: string): CreationDraft {
  const primary = composeFromBrief(brief, usageId);
  const ids = [...new Set([primary.itemId, ...(COMPLEMENTS[primary.usageId] ?? ['carte-mer'])])];
  const tickets = ids.flatMap(itemId => {
    const item = ITEMS.find(i => i.id === itemId);
    if (!item) return [];
    return [{ itemId, fields: itemId === primary.itemId ? primary.fields : Object.fromEntries((item.editable ?? []).map(field => [field.cle, field.valeur])) }];
  });
  return { ...primary, tickets };
}
