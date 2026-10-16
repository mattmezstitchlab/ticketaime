export type LayoutId =
  | "grille"
  | "cascade"
  | "eventail"
  | "pile"
  | "mur"
  | "cercle"
  | "ligne"
  | "nuage";

export interface LayoutDef {
  id: LayoutId;
  name: string;
  desc: string;
  icon: string;
}

export const LAYOUTS: LayoutDef[] = [
  { id: "grille", name: "Grille", desc: "Alignement régulier, 4 colonnes", icon: "▦" },
  { id: "cascade", name: "Cascade", desc: "Empilement diagonal de bureau", icon: "⧉" },
  { id: "eventail", name: "Éventail", desc: "Arc ouvert, pièces ventilées", icon: "◠" },
  { id: "pile", name: "Pile", desc: "Tas centré, légers décalages", icon: "▤" },
  { id: "mur", name: "Mur galerie", desc: "Deux rangées bien cadrées", icon: "▥" },
  { id: "cercle", name: "Cercle", desc: "Composition orbitale centrée", icon: "◯" },
  { id: "ligne", name: "Frise", desc: "Une seule ligne chronologique", icon: "━" },
  { id: "nuage", name: "Nuage", desc: "Dispersion créative maîtrisée", icon: "✦" },
];

export interface LayoutInput {
  instanceId: string;
  w: number;
  rotate: number;
}

export interface LayoutOutput {
  instanceId: string;
  x: number;
  y: number;
  rotate: number;
  zIndex: number;
}

/** Deterministic pseudo-random from index (stable across renders). */
const jitter = (i: number, salt: number, amp: number): number => {
  const v = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return (v - Math.floor(v) - 0.5) * 2 * amp;
};

export function applyLayout(
  kind: LayoutId,
  items: LayoutInput[],
  canvasWidth = 1200,
): LayoutOutput[] {
  const n = items.length;
  if (n === 0) return [];

  switch (kind) {
    case "grille": {
      const cols = n <= 4 ? n : 4;
      const colW = 280;
      const rowH = 250;
      const totalW = cols * colW;
      const ox = Math.max(20, (canvasWidth - totalW) / 2);
      return items.map((it, i) => ({
        instanceId: it.instanceId,
        x: Math.round(ox + (i % cols) * colW),
        y: Math.round(40 + Math.floor(i / cols) * rowH),
        rotate: Math.round(jitter(i, 1, 1.5) * 10) / 10,
        zIndex: i + 1,
      }));
    }
    case "mur": {
      const cols = Math.ceil(n / 2);
      const colW = Math.min(300, Math.max(220, (canvasWidth - 120) / Math.max(cols, 1)));
      const ox = Math.max(20, (canvasWidth - cols * colW) / 2);
      return items.map((it, i) => {
        const row = i % 2;
        const col = Math.floor(i / 2);
        return {
          instanceId: it.instanceId,
          x: Math.round(ox + col * colW),
          y: Math.round(50 + row * 300),
          rotate: 0,
          zIndex: i + 1,
        };
      });
    }
    case "cascade": {
      const ox = Math.max(40, canvasWidth / 2 - 260);
      return items.map((it, i) => ({
        instanceId: it.instanceId,
        x: Math.round(ox + i * 44),
        y: Math.round(60 + i * 36),
        rotate: Math.round((i % 5 - 2) * 1.2 * 10) / 10,
        zIndex: i + 1,
      }));
    }
    case "pile": {
      const cx = canvasWidth / 2 - 130;
      return items.map((it, i) => ({
        instanceId: it.instanceId,
        x: Math.round(cx + jitter(i, 7, 46)),
        y: Math.round(140 + jitter(i, 13, 40)),
        rotate: Math.round(jitter(i, 29, 7) * 10) / 10,
        zIndex: i + 1,
      }));
    }
    case "eventail": {
      const cx = canvasWidth / 2;
      const cy = 640;
      const radius = 480;
      const spread = Math.min(120, 24 + n * 9);
      return items.map((it, i) => {
        const t = n === 1 ? 0.5 : i / (n - 1);
        const ang = (-90 - spread / 2 + t * spread) * (Math.PI / 180);
        return {
          instanceId: it.instanceId,
          x: Math.round(cx + Math.cos(ang) * radius - 130),
          y: Math.round(cy + Math.sin(ang) * radius - 90),
          rotate: Math.round((t - 0.5) * 26 * 10) / 10,
          zIndex: i + 1,
        };
      });
    }
    case "cercle": {
      const cx = canvasWidth / 2 - 130;
      const cy = 300;
      const r = Math.min(360, 150 + n * 16);
      return items.map((it, i) => {
        const ang = (i / n) * Math.PI * 2 - Math.PI / 2;
        return {
          instanceId: it.instanceId,
          x: Math.round(cx + Math.cos(ang) * r),
          y: Math.round(cy + Math.sin(ang) * r * 0.72),
          rotate: Math.round(Math.sin(ang) * 8 * 10) / 10,
          zIndex: i + 1,
        };
      });
    }
    case "ligne": {
      const gap = 270;
      const totalW = n * gap;
      const ox = Math.max(20, (canvasWidth - Math.min(totalW, canvasWidth - 40)) / 2);
      return items.map((it, i) => ({
        instanceId: it.instanceId,
        x: Math.round(ox + i * gap),
        y: Math.round(170 + Math.sin(i * 0.9) * 16),
        rotate: Math.round(Math.cos(i * 1.1) * 2 * 10) / 10,
        zIndex: i + 1,
      }));
    }
    case "nuage":
    default: {
      const areaW = canvasWidth - 320;
      return items.map((it, i) => ({
        instanceId: it.instanceId,
        x: Math.round(60 + ((i * 397) % Math.max(areaW, 200))),
        y: Math.round(50 + ((i * 269) % 620) + jitter(i, 3, 24)),
        rotate: Math.round(jitter(i, 11, 6) * 10) / 10,
        zIndex: i + 1,
      }));
    }
  }
}
