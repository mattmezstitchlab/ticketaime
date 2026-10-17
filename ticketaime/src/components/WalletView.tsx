import { useState, type ReactNode, type ComponentType } from "react";
import Ticket from "./Ticket";
import {
  CATEGORIES,
  ITEMS,
  ITEM_INDEX,
  type CategoryId,
  type Item,
} from "../data/catalogue";

export interface PocketEntry {
  id: string;
  item: Item;
  fields?: Record<string, string>;
  label?: string;
}

interface WalletViewProps {
  functional?: boolean;
  renderEntry?: (entry: PocketEntry) => ReactNode;
  entries?: PocketEntry[];
  onOpenEntry?: (entry: PocketEntry) => void;
  onSelectFunction?: (item: Item) => string;
  searchQuery?: string;
  onSearchQuery?: (query: string) => void;
  selectedCategory?: CategoryId | "tout";
  onSelectCategory?: (cat: CategoryId | "tout") => void;
  selectedItemId?: string | null;
  onSelectItem: (item: Item) => void;
  onDropOnCanvas?: (item: Item) => void;
}

export default function WalletView({
  functional = false,
  renderEntry,
  entries,
  onOpenEntry,
  onSelectFunction,
  searchQuery = "",
  onSearchQuery,
  selectedCategory = "tout",
  onSelectCategory,
  selectedItemId,
  onSelectItem,
  onDropOnCanvas,
}: WalletViewProps) {
  const [activeCat, setActiveCat] = useState<CategoryId>(
    selectedCategory === "tout" ||
      (!functional &&
        ["monnaies", "billets", "sceaux"].includes(selectedCategory))
      ? "voyage"
      : selectedCategory,
  );

  const category =
    selectedCategory !== "tout" && functional ? selectedCategory : activeCat;
  const visibleCategories = CATEGORIES.filter(
    (category) =>
      functional || !["monnaies", "billets", "sceaux"].includes(category.id),
  );
  const currentCat = CATEGORIES.find((c) => c.id === category) ?? CATEGORIES[0];
  const normalize = (value: string) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const catItems = ITEMS.filter(
    (it) =>
      (functional ||
        !["web-login", "web-newsletter", "web-buttons"].includes(it.id)) &&
      it.category === category &&
      normalize(it.name).includes(normalize(searchQuery.trim())),
  );

  const pocketEntries: PocketEntry[] = entries
    ? entries.filter(
        (entry) =>
          entry.item.category === category &&
          normalize(entry.label || entry.item.name).includes(
            normalize(searchQuery.trim()),
          ),
      )
    : catItems.map((item) => ({ id: item.id, item }));
  const handleTabChange = (catId: CategoryId) => {
    setActiveCat(catId);
    onSelectCategory?.(catId);
  };

  return (
    <div
      className={`original-pocket-book w-full max-w-[1400px] mx-auto select-none my-6 ${functional ? "functional-pocket-book" : ""}`}
    >
      <label className="workshop-pocket-search">
        Rechercher un ticket
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchQuery?.(event.target.value)}
          placeholder="Nom d’un ticket…"
        />
      </label>
      {/* ---------------- Category Binder Tabs ---------------- */}
      <div
        aria-label="Catégories de tickets"
        className="flex items-center gap-1.5 overflow-x-auto pb-2 [scrollbar-width:none] px-4"
      >
        {visibleCategories.map((c) => {
          const isActive = c.id === category;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => handleTabChange(c.id)}
              aria-pressed={isActive}
              className={`pocket-tab flex-none flex items-center gap-2 px-3.5 py-2 rounded-t-md border-t border-x font-type text-xs uppercase tracking-wider transition-all ${
                isActive
                  ? "bg-[#1f2026] text-white border-white/25 shadow-lg font-bold -mb-px z-10"
                  : "bg-[#15161a]/80 text-white/50 border-white/10 hover:text-white/80 hover:bg-[#191a20]"
              }`}
              style={{
                borderTopColor: isActive ? c.accent : undefined,
                borderTopWidth: isActive ? "3px" : "1px",
              }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: c.accent }}
              />
              <span>
                {c.numeral}. {c.name}
              </span>
              <span className="text-[10px] font-mono opacity-50">
                (
                {entries
                  ? entries.filter((entry) => entry.item.category === c.id)
                      .length
                  : ITEMS.filter((it) => it.category === c.id).length}
                )
              </span>
            </button>
          );
        })}
      </div>

      {/* ---------------- The Archival Transparent Binder Wallet Page ---------------- */}
      <div
        className="relative rounded-b-xl rounded-tr-xl border border-white/20 bg-gradient-to-b from-[#1b1c22]/90 to-[#14151a]/95 p-6 lg:p-8 shadow-[0_24px_50px_rgba(0,0,0,0.7)] backdrop-blur-md overflow-hidden"
        style={{
          boxShadow: `
            inset 0 1px 1px rgba(255,255,255,0.2),
            inset 0 -1px 1px rgba(0,0,0,0.5),
            0 24px 60px rgba(0,0,0,0.8)
          `,
        }}
      >
        {/* Left margin with 4 ring-binder holes (Classeur philatélique/numismatique) */}
        <div
          className="absolute left-0 top-0 bottom-0 w-12 border-r border-white/15 bg-gradient-to-r from-black/40 to-transparent flex flex-col justify-around items-center py-16 pointer-events-none z-20"
          aria-hidden="true"
        >
          {[0, 1, 2, 3].map((ring) => (
            <div
              key={ring}
              className="w-5 h-5 rounded-full border-2 border-white/40 bg-[#121317] shadow-inner relative flex items-center justify-center"
            >
              <div className="w-4 h-4 rounded-full border border-black/80 bg-white/5" />
            </div>
          ))}
          {/* Vertical reinforcing tape line */}
          <div className="absolute right-1 top-0 bottom-0 w-px bg-white/20" />
        </div>

        {pocketEntries.length === 0 && (
          <p className="text-white/70 pl-12 text-sm" role="status">
            Aucun ticket dans cette catégorie pour cette recherche.
          </p>
        )}
        {/* Plastic Gloss & Diagonal Highlight Sheen (Reflet de film plastique transparent) */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(125deg, rgba(255,255,255,0.18) 0%, transparent 22%, transparent 48%, rgba(255,255,255,0.08) 50%, transparent 56%),
              repeating-linear-gradient(0deg, transparent 0 24px, rgba(255,255,255,0.015) 24px 25px)
            `,
          }}
        />

        {/* Header Tab / Category Stamp */}
        <div className="pl-12 flex flex-wrap items-baseline justify-between gap-4 border-b border-white/15 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span
              className="font-bebas text-3xl tracking-widest px-2.5 py-0.5 rounded border border-white/20 bg-white/5"
              style={{ color: currentCat.accent }}
            >
              {currentCat.numeral}
            </span>
            <div>
              <h3 className="font-bebas text-2xl tracking-wider text-white m-0">
                {currentCat.name}
              </h3>
              <p className="font-type text-xs text-white/50 tracking-wider m-0">
                {currentCat.tagline} · {pocketEntries.length}{" "}
                {entries ? "tickets gardés" : "pièces archivées"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-type text-[10px] uppercase tracking-[0.2em] text-white/40 border border-white/15 px-3 py-1 rounded bg-black/20">
              Pochette transparente N° {currentCat.numeral}
            </span>
            <span className="text-white/40 text-xs font-mono">
              Format Standard · Polypropylène 120µ
            </span>
          </div>
        </div>

        {/* ---------------- The Transparent Compartments Grid ---------------- */}
        <div className="pl-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative">
          {pocketEntries.map((entry, index) => {
            const item = entry.item;
            const Component = item.Component as ComponentType<{
              personnalisation?: Record<string, string>;
            }>;
            const open = () =>
              entries ? onOpenEntry?.(entry) : onSelectItem(item);
            const isSelected = selectedItemId === item.id;
            const n = ITEM_INDEX[item.id] ?? index + 1;
            return (
              <div
                key={entry.id}
                data-pocket-entry={entry.id}
                data-atlas-module={item.id}
                data-atlas-category={item.category}
                data-atlas-version="1.0.0"
                onClick={open}
                role="button"
                tabIndex={0}
                aria-label={`${entries ? "Ouvrir" : "Personnaliser"} ${entry.label || item.name}`}
                onKeyDown={(event) => {
                  if (
                    event.target === event.currentTarget &&
                    ["Enter", " "].includes(event.key)
                  ) {
                    event.preventDefault();
                    open();
                  }
                }}
                className={`group/slot relative rounded-lg border transition-all cursor-pointer flex flex-col justify-between overflow-hidden ${
                  isSelected
                    ? "border-amber-400 bg-amber-400/10 shadow-[0_0_24px_rgba(245,158,11,0.25)] ring-2 ring-amber-400/40"
                    : "border-white/15 bg-white/[0.03] hover:border-white/35 hover:bg-white/[0.06]"
                }`}
                style={{
                  minHeight: "220px",
                  boxShadow: `
                    inset 0 2px 4px rgba(0,0,0,0.4),
                    inset 0 -1px 2px rgba(255,255,255,0.08)
                  `,
                }}
              >
                {/* Welded Seam (Soudure plastique du compartiment) */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-white/20 to-transparent border-b border-white/15"
                  aria-hidden="true"
                />

                {/* Pocket Top-Loading Opening Lip (Entrée de pochette avec ombre) */}
                <div
                  className="absolute top-1.5 left-4 right-4 h-3 rounded-b-md border-b border-x border-white/20 bg-white/5 opacity-60 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Specimen Number Index */}
                <div className="flex items-center justify-between p-3 pb-1 z-10 text-[10px] font-mono">
                  <span
                    className="font-bold tracking-wider px-1.5 py-0.5 rounded bg-black/40 border border-white/10"
                    style={{ color: currentCat.accent }}
                  >
                    #{String(n).padStart(2, "0")}
                  </span>
                  {onDropOnCanvas && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDropOnCanvas?.(item);
                      }}
                      title="Déposer cette pièce sur le canevas libre"
                      className="opacity-0 group-hover/slot:opacity-100 transition-opacity bg-amber-500 hover:bg-amber-400 text-stone-900 font-type px-2 py-0.5 rounded text-[10px] font-bold"
                    >
                      + Table
                    </button>
                  )}
                </div>

                {/* Scaled Ticket Inside Transparent Pocket */}
                <div
                  className="flex-1 flex items-center justify-center p-4 py-2"
                  inert={functional || undefined}
                >
                  <div
                    className="w-full transition-transform duration-300 group-hover/slot:scale-105"
                    style={{
                      width: functional
                        ? Math.min(240, (150 * item.w) / item.h)
                        : undefined,
                      maxHeight: "160px",
                      filter: `drop-shadow(0 8px 16px rgba(0,0,0,0.6))`,
                    }}
                  >
                    {renderEntry ? (
                      renderEntry(entry)
                    ) : (
                      <Ticket
                        w={item.w}
                        h={item.h}
                        rotate={item.rotate * 0.4}
                        label={item.name}
                        caption={false}
                        disableReveal={functional}
                        className="w-full"
                      >
                        <Component personnalisation={entry.fields} />
                      </Ticket>
                    )}
                  </div>
                </div>

                {/* Bottom compartment label */}
                <div className="p-3 pt-1 border-t border-white/10 bg-black/30 z-10">
                  <p className="font-cond font-semibold text-xs text-white/90 truncate m-0">
                    {entry.label || item.name}
                  </p>
                  <p className="font-type text-[9.5px] text-white/40 truncate m-0 uppercase tracking-wider">
                    {onSelectFunction?.(item) || currentCat.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
