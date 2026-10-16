import { useEffect, useRef, useState } from "react";
import { CATEGORIES, ITEMS } from "../data/catalogue";
import { EDITIONS, IDEES, type EditionId } from "../data/editions";
import type { LayoutId } from "../lib/layouts";
import { LAYOUTS } from "../lib/layouts";

export interface ChoixCreation {
  categorie: string;
  edition: EditionId;
  miseEnPage: LayoutId;
}

interface CreateMenuProps {
  onChoix: (choix: ChoixCreation) => void;
  editionActive: EditionId;
}

/**
 * Menu déroulant « Que voulez-vous créer ? » — point d'entrée unique.
 * Chaque entrée = une catégorie (usage réel) + l'édition à appliquer.
 */
export default function CreateMenu({ onChoix, editionActive }: CreateMenuProps) {
  const [ouvert, setOuvert] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOuvert(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOuvert(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const totalCat = (id: string) => ITEMS.filter((i) => i.category === id).length;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOuvert(!ouvert)}
        aria-expanded={ouvert}
        className={`h-8 px-3.5 rounded-[10px] text-[13px] font-medium transition-all flex items-center gap-1.5 ${
          ouvert ? "bg-neutral-900 text-white" : "bg-blue-600 hover:bg-blue-500 text-white"
        }`}
      >
        Que voulez-vous créer ?
        <span className={`text-[9px] transition-transform ${ouvert ? "rotate-180" : ""}`}>▾</span>
      </button>

      {ouvert && (
        <div className="absolute left-0 top-10 w-[400px] max-h-[76vh] overflow-y-auto rounded-2xl border border-black/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.22)] p-2 z-50">
          <p className="px-2.5 pt-1.5 pb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400 m-0">
            Choisir une catégorie
          </p>

          {/* Édition spéciale mise en avant */}
          <button
            type="button"
            onClick={() => {
              onChoix({ categorie: "tout", edition: "mariage", miseEnPage: "cascade" });
              setOuvert(false);
            }}
            className="w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-colors hover:bg-rose-50 group"
            style={{ background: editionActive === "mariage" ? "#fff1f2" : undefined }}
          >
            <span className="flex-none w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-[17px]">
              💍
            </span>
            <span className="flex-1 min-w-0">
              <span className="flex items-center gap-1.5">
                <span className="text-[14px] font-semibold text-neutral-900">Édition Mariage</span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-rose-600 text-white uppercase tracking-wider">
                  Spécial
                </span>
              </span>
              <span className="block text-[12px] text-neutral-500 leading-snug mt-0.5">
                Les {ITEMS.length} pièces deviennent des faire-part : placement de table,
                compte à rebours et envoi certifié.
              </span>
            </span>
          </button>

          <div className="my-1.5 border-t border-black/[0.06]" />
          <p className="px-2.5 pb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400 m-0">
            Ou une catégorie
          </p>

          {CATEGORIES.map((c) => {
            const idee = IDEES[c.id];
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  onChoix({ categorie: c.id, edition: editionActive, miseEnPage: "grille" });
                  setOuvert(false);
                }}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-neutral-100 text-left transition-colors group"
              >
                <span
                  className="flex-none w-2 h-2 rounded-full"
                  style={{ background: c.accent }}
                />
                <span className="flex-1 min-w-0">
                  <span className="block text-[13px] font-medium text-neutral-900 leading-tight">
                    {c.name}
                  </span>
                  <span className="block text-[11px] text-neutral-500 truncate">
                    {idee?.titre ?? c.tagline}
                  </span>
                </span>
                <span className="flex-none font-mono text-[10px] text-neutral-400">
                  {totalCat(c.id)}
                </span>
              </button>
            );
          })}

          <div className="my-1.5 border-t border-black/[0.06]" />
          <p className="px-2.5 pb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400 m-0">
            Mise en page du canevas
          </p>
          <div className="grid grid-cols-2 gap-1 p-1">
            {LAYOUTS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => {
                  onChoix({ categorie: "tout", edition: editionActive, miseEnPage: l.id });
                  setOuvert(false);
                }}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-neutral-100 text-left"
                title={l.desc}
              >
                <span className="w-6 h-6 flex-none rounded-md bg-neutral-100 border border-black/[0.06] flex items-center justify-center text-[12px]">
                  {l.icon}
                </span>
                <span className="text-[12px] font-medium text-neutral-700">{l.name}</span>
              </button>
            ))}
          </div>

          <p className="px-2.5 py-2 text-[10px] text-neutral-400 m-0 border-t border-black/[0.06]">
            Édition active : {EDITIONS[editionActive].nom}
          </p>
        </div>
      )}
    </div>
  );
}
