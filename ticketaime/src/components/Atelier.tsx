import { useState, useMemo } from "react";
import clsx from "clsx";
import Ticket from "./Ticket";
import { ITEMS, CATEGORIES, ITEM_INDEX, type CategoryId } from "../data/catalogue";
import type { ComponentType } from "react";

interface DonneesPersonnalisees {
  [cle: string]: string;
}

/**
 * Atelier générique : chaque pièce du catalogue peut être personnalisée.
 * Sélectionnez un modèle dans la liste, modifiez ses champs texte, et l'aperçu
 * se met à jour en direct. Imprimez pour obtenir uniquement le billet composé.
 */
export default function Atelier() {
  const [selection, setSelection] = useState<string>(ITEMS[0].id);
  const [donnees, setDonnees] = useState<DonneesPersonnalisees>({});
  const [categorieFiltre, setCategorieFiltre] = useState<CategoryId | "tout">("tout");

  const item = useMemo(() => ITEMS.find((i) => i.id === selection)!, [selection]);
  const Comp = useMemo(
    () => item?.Component as ComponentType<{ personnalisation?: Record<string, string> }> | null,
    [item],
  );
  const champs = useMemo(
    () => item?.editable ?? [],
    [item],
  );

  const piecesFiltrees = useMemo(() => {
    if (categorieFiltre === "tout") return ITEMS;
    return ITEMS.filter((i) => i.category === categorieFiltre);
  }, [categorieFiltre]);

  const champsChanged = (cle: string, valeur: string) => {
    setDonnees((d) => ({ ...d, [cle]: valeur }));
  };

  /** Réinitialise les champs aux valeurs par défaut du modèle donné. */
  const initialiserDonnees = (it: (typeof ITEMS)[number]) => {
    const init: DonneesPersonnalisees = {};
    (it.editable ?? []).forEach((c) => {
      init[c.cle] = c.valeur;
    });
    setDonnees(init);
  };

  return (
    <section id="atelier" className="mx-auto max-w-[1600px] px-4 pb-24 sm:px-6 lg:px-10 scroll-mt-32">
      <header className="mb-10">
        <h2 className="m-0 font-bebas text-[clamp(40px,8vw,80px)] font-normal leading-none tracking-[0.04em] text-[#f4efe2]">
          Atelier de composition
        </h2>
        <p className="m-0 mt-2 font-type text-[11px] uppercase tracking-[0.2em] text-white/50">
          Choisissez un modèle, personnalisez les champs, puis imprimez votre billet.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] lg:gap-12">
        {/* ---------------- colonne de sélection ---------------- */}
        <div className="lg:sticky lg:top-24">
          <div className="rounded-sm border border-white/12 bg-white/[0.04] p-5 backdrop-blur-sm">
            <legend className="mb-3 p-0 font-type text-[11px] uppercase tracking-[0.25em] text-[#e09a4a]">Catégorie</legend>
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                type="button"
                aria-pressed={categorieFiltre === "tout"}
                onClick={() => setCategorieFiltre("tout")}
                className={clsx(
                  "cursor-pointer rounded-sm border px-3 py-2 font-type text-[11px] uppercase tracking-[0.14em] transition-colors",
                  categorieFiltre === "tout"
                    ? "border-[#e09a4a] bg-[#e09a4a] text-[#1c1a18]"
                    : "border-white/20 text-white/70 hover:border-white/50",
                )}
              >
                Tout
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={categorieFiltre === c.id}
                  onClick={() => setCategorieFiltre(c.id === categorieFiltre ? "tout" : c.id)}
                  className={clsx(
                    "cursor-pointer rounded-sm border px-3 py-2 font-type text-[11px] uppercase tracking-[0.14em] transition-colors",
                    categorieFiltre === c.id
                      ? "border-[#e09a4a] bg-[#e09a4a] text-[#1c1a18]"
                      : "border-white/20 text-white/70 hover:border-white/50",
                  )}
                >
                  {c.name}
                </button>
              ))}
            </div>

            <ul className="m-0 p-0 list-none max-h-[60vh] overflow-y-auto pr-2">
              {piecesFiltrees.map((it) => {
                const actif = selection === it.id;
                const editableCount = (it.editable?.length ?? 0);
                return (
                  <li key={it.id}>
                    <button
                      type="button"
                      aria-pressed={actif}
                      onClick={() => { setSelection(it.id); initialiserDonnees(it); }}
                      className={clsx(
                        "flex cursor-pointer items-center gap-3 rounded-sm border px-3 py-2.5 text-left font-type text-[13px] uppercase tracking-[0.14em] transition-all duration-200",
                        actif
                          ? "border-[#e09a4a] bg-[#e09a4a] text-[#1c1a18]"
                          : "border-white/10 bg-transparent text-white/60 hover:border-white/40 hover:bg-white/5",
                      )}
                    >
                      <span className="flex-none font-mono-vintage text-[10px] opacity-50">
                        {String(ITEM_INDEX[it.id] ?? 0).padStart(2, "0")}
                      </span>
                      <span className="flex-1 min-w-0 truncate">{it.name}</span>
                      {editableCount > 0 && (
                        <span className="flex-none text-[10px] text-white/30">({editableCount} champ{editableCount > 1 ? "s" : ""})</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* ---------------- édition + aperçu ---------------- */}
        <div className="flex min-w-0 flex-col items-center justify-center">
          {item ? (
            <>
              <div className="w-full max-w-md space-y-4">
                <legend className="mb-2 p-0 font-type text-[11px] uppercase tracking-[0.25em] text-[#e09a4a]">
                  Personnalisation - {item.name}
                </legend>
                {champs.length > 0 ? (
                  champs.map((c) => (
                    <div key={c.cle}>
                      <label className="mb-1 block font-type text-[10px] uppercase tracking-[0.16em] text-white/60">{c.label}</label>
                      <input
                        className="w-full rounded-none border-0 border-b-2 border-white/20 bg-white/[0.06] px-2 py-2 font-type text-[14px] text-[#f4efe2] outline-none focus:border-[#e09a4a]"
                        value={donnees[c.cle] ?? c.valeur}
                        onChange={(e) => champsChanged(c.cle, e.target.value)}
                      />
                    </div>
                  ))
                ) : (
                  <p className="p-3 rounded border border-white/10 bg-white/[0.02] font-type text-[11px] text-white/40 italic">
                    Aucun champ éditable pour ce modèle.
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="mt-2 cursor-pointer rounded-sm border-0 bg-[#e09a4a] px-5 py-3 font-type text-[13px] uppercase tracking-[0.18em] text-[#1c1a18] hover:bg-[#f2b266]"
                >
                  Imprimer ce billet
                </button>
              </div>

              <div id="atelier-preview" className="mt-12 relative w-full" style={{ maxWidth: Math.round(item.w * 1.25) }}>
                <Ticket
                  key={selection}
                  w={item.w}
                  h={item.h}
                  rotate={item.rotate}
                  label={`Votre billet - ${item.name}`}
                  caption={false}
                  className="w-full"
                >
                  {Comp && <Comp personnalisation={donnees} />}
                </Ticket>
              </div>
            </>
          ) : (
            <p className="text-center text-white/40 font-type text-[13px]">Sélectionnez un modèle.</p>
          )}
        </div>
      </div>
    </section>
  );
}
