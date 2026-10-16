export type InkColor = "blue" | "sepia" | "black" | "red";

export const INK_COLORS: Record<InkColor, { name: string; hex: string; desc: string }> = {
  blue: { name: "Bleu nuit", hex: "#1f3a6b", desc: "Encre d'écolier & des écrivains" },
  sepia: { name: "Sépia noyer", hex: "#54371b", desc: "Brou de noix pour cartes anciennes" },
  black: { name: "Noir carbone", hex: "#1a1817", desc: "Encre de Chine pour actes officiels" },
  red: { name: "Rouge carmin", hex: "#b52026", desc: "Encre des annotations et vérifications" },
};

export const inkHex = (ink?: InkColor): string =>
  (ink && INK_COLORS[ink]?.hex) || INK_COLORS.blue.hex;
