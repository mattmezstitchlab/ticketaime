import { ITEMS } from './catalogue';
import type { PieceStep } from './pieceRoles';
export const STORY_KEY = 'ticketaime.story.v1';
export interface SectionSettings { title: string; text: string; background: string }
export function parseScenario(value: unknown): PieceStep[] {
  if (!Array.isArray(value) || value.length > 30) return [];
  return value.every(step => step && typeof step === 'object' && ['id','title','recipient','reason','privacy'].every(key => typeof step[key] === 'string') && step.draft && typeof step.draft.id === 'string' && typeof step.draft.brief === 'string' && typeof step.draft.usageId === 'string' && ['classique','mariage'].includes(step.draft.edition) && ITEMS.some(item => item.id === step.draft.itemId) && step.draft.fields && typeof step.draft.fields === 'object' && Object.values(step.draft.fields).every(field => typeof field === 'string')) && new Set(value.map(step => step.id)).size === value.length ? value : [];
}
export function loadScenario(): PieceStep[] {
  try { return parseScenario(JSON.parse(localStorage.getItem(STORY_KEY) || '[]')); } catch { return []; }
}
export function sectionKey(id: string) { return `ticketaime.section.v1:${id}`; }
export function loadSection(id: string, fallback: SectionSettings): SectionSettings {
  try {
    const value = JSON.parse(localStorage.getItem(sectionKey(id)) || 'null');
    if (value && typeof value.title === 'string' && value.title.length <= 120 && typeof value.text === 'string' && value.text.length <= 1500 && /^#[0-9a-f]{6}$/i.test(value.background)) return value;
  } catch { /* unavailable or corrupted local storage */ }
  return fallback;
}
