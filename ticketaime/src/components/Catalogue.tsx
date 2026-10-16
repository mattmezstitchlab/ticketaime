import { useCallback, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import SpecimenCard from "./SpecimenCard";
import { CATEGORIES, ITEMS, type CategoryId } from "../data/catalogue";

type Filter = CategoryId | "tout";

/** Accent-insensitive, case-insensitive normalisation for the search box. */
const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export default function Catalogue() {
  const [filter, setFilter] = useState<Filter>("tout");
  const [query, setQuery] = useState("");
  /** Depth map: a picked-up piece gets the highest z and floats above the others. */
  const [zmap, setZmap] = useState<Record<string, number>>({});
  const zTop = useRef(1);
  const bringToFront = useCallback((id: string) => {
    zTop.current += 1;
    const z = zTop.current;
    setZmap((prev) => ({ ...prev, [id]: z }));
  }, []);

  const counts = useMemo(() => {
    const map: Record<string, number> = { tout: ITEMS.length };
    CATEGORIES.forEach((c) => {
      map[c.id] = ITEMS.filter((i) => i.category === c.id).length;
    });
    return map;
  }, []);

  const visible = useMemo(() => {
    const q = norm(query.trim());
    return ITEMS.filter(
      (i) => {
        const category = CATEGORIES.find((c) => c.id === i.category);
        const haystack = norm(`${i.name} ${category?.name ?? ""} ${category?.tagline ?? ""}`);
        return (filter === "tout" || i.category === filter) && (q === "" || haystack.includes(q));
      },
    );
  }, [filter, query]);

  const categories = CATEGORIES.filter((c) => filter === "tout" || c.id === filter);
  const shown = new Set(visible.map((i) => i.id));

  return (
    <div className="mx-auto max-w-[1600px] px-4 pb-24 sm:px-6 lg:px-10">
      {/* ---------------- filter bar ---------------- */}
      <div
        id="filterbar"
        className="sticky z-40 -mx-4 mb-10 border-y border-white/10 bg-[#1c1c1f]/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10"
        style={{ top: "var(--bar-h, 57px)" }}
      >
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none]">
            <span className="mr-1 hidden shrink-0 font-type text-[10px] uppercase tracking-[0.24em] text-white/40 sm:inline">
              Classer par
            </span>

            <button
              type="button"
              aria-pressed={filter === "tout"}
              onClick={() => setFilter("tout")}
              className={clsx("chip shrink-0", filter === "tout" && "chip-on")}
            >
              Tout <span className="chip-n">{counts.tout}</span>
            </button>

            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={filter === c.id}
                onClick={() => setFilter(filter === c.id ? "tout" : c.id)}
                className={clsx("chip shrink-0", filter === c.id && "chip-on")}
                style={{ "--accent": c.accent } as React.CSSProperties}
              >
                <span className="chip-dot" aria-hidden="true" />
                {c.name} <span className="chip-n">{counts[c.id]}</span>
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 lg:ml-auto">
            <span className="sr-only">Rechercher une pièce</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher…"
              className="search"
            />
          </label>
        </div>
      </div>

      {/* ---------------- sections ---------------- */}
      {categories.map((c) => {
        const items = ITEMS.filter((i) => i.category === c.id && shown.has(i.id));
        return (
          <section
            key={c.id}
            id={`cat-${c.id}`}
            className="mb-16 scroll-mt-[calc(var(--bar-h,47px)+6.5rem)] lg:mb-24"
            style={{ "--accent": c.accent } as React.CSSProperties}
          >
            <header className="section-head">
              <div className="section-numeral" aria-hidden="true">
                {c.numeral}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h2 className="m-0 font-bebas text-[clamp(34px,5vw,64px)] font-normal leading-none tracking-[0.04em] text-[#f4efe2]">
                    {c.name}
                  </h2>
                  <span className="count-badge">{items.length} pièces</span>
                </div>
                <p className="m-0 mt-1 font-type text-[11px] uppercase tracking-[0.22em] text-white/45 sm:text-xs">
                  {c.tagline}
                </p>
              </div>
              <p className="section-desc">{c.description}</p>
            </header>

            {items.length > 0 ? (
              <div className="sheet">
                {items.map((item, i) => (
                  <SpecimenCard
                    key={item.id}
                    item={item}
                    category={c}
                    index={i}
                    z={zmap[item.id] ?? 0}
                    onPick={() => bringToFront(item.id)}
                  />
                ))}
              </div>
            ) : (
              <p className="empty">
                Aucune pièce ne correspond à « {query} » dans cette catégorie.
              </p>
            )}
          </section>
        );
      })}

      {visible.length === 0 && (
        <p className="empty mt-10 text-center">
          Aucune pièce ne correspond à « {query} ».
        </p>
      )}
    </div>
  );
}
