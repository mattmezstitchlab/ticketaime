import { useMemo } from "react";
import Ticket from "./Ticket";
import { ITEMS, CATEGORIES, ITEM_INDEX } from "../data/catalogue";

/**
 * Vue isolée d'un module unique — point d'intégration Atlas.
 * URL : `?module=<id>` (ex. `?module=web-hero&champ:titre=Bonjour&action:ctaUrl=https://…`).
 * Chaque pièce y est rendue seule, fonctionnelle (liens / formulaires réels),
 * avec ses attributs `data-atlas-*` pour repérage programmatique.
 */
export function paramsFromSearch(search: string): {
  moduleId: string | null;
  champs: Record<string, string>;
  actions: Record<string, string>;
} {
  const sp = new URLSearchParams(search.startsWith("?") ? search : `?${search}`);
  const moduleId = sp.get("module");
  const champs: Record<string, string> = {};
  const actions: Record<string, string> = {};
  sp.forEach((v, k) => {
    if (k.startsWith("champ:")) champs[k.slice(6)] = v;
    else if (k.startsWith("action:")) actions[k.slice(7)] = v;
  });
  return { moduleId, champs, actions };
}

export default function ModuleView({ moduleId }: { moduleId: string }) {
  const { item, perso, href, cible } = useMemo(() => {
    const it = ITEMS.find((i) => i.id === moduleId) ?? null;
    const { champs, actions } = paramsFromSearch(window.location.search);
    const base: Record<string, string> = {};
    (it?.editable ?? []).forEach((c) => { base[c.cle] = c.valeur; });
    const merged = { ...base, ...champs, ...actions };
    const h = actions._href;
    const t = actions._cible || "_blank";
    return { item: it, perso: merged, href: h, cible: t };
  }, [moduleId]);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100 p-6">
        <div className="max-w-sm text-center bg-white rounded-2xl border border-black/10 shadow-xl p-6">
          <p className="text-[12px] font-semibold text-neutral-900 m-0">Module introuvable</p>
          <p className="text-[12px] text-neutral-500 font-mono mt-1">atlas: ?module={moduleId}</p>
          <a href="/" className="inline-block mt-3 text-[12px] font-medium text-blue-600">← Retour à l'atelier</a>
        </div>
      </div>
    );
  }

  const cat = CATEGORIES.find((c) => c.id === item.category);
  const n = ITEM_INDEX[item.id] ?? 1;

  return (
    <div className="min-h-screen canvas-dots flex flex-col bg-[#1c1d22]">
      <header className="flex-none h-11 flex items-center gap-2.5 px-4 bg-white/90 backdrop-blur-xl border-b border-black/10">
        <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-neutral-900 text-white">
          #{String(n).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-semibold text-neutral-900 truncate m-0 leading-tight">{item.name}</p>
          <p className="text-[10px] text-neutral-500 m-0 font-mono">atlas:{item.category}/{item.id} · v1.0.0</p>
        </div>
        <span className="text-[10px] px-2 py-1 rounded-full border border-black/10 text-neutral-600">
          {cat?.name}
        </span>
        <a
          href="/"
          className="text-[11px] font-medium px-2.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 no-underline"
        >
          Atelier →
        </a>
      </header>
      <main className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div
          data-atlas-module={item.id}
          data-atlas-category={item.category}
          data-atlas-version="1.0.0"
          style={{ width: `min(92vw, ${item.w}px)` }}
        >
          <Ticket w={item.w} h={item.h} rotate={item.rotate} label={item.name} caption={false} disableReveal className="w-full">
            {/* @ts-ignore */}
            <item.Component personnalisation={perso} />
          </Ticket>
          {href && (
            <div className="text-center mt-4">
              <a
                href={href}
                target={cible}
                rel={cible === "_blank" ? "noreferrer" : undefined}
                className="inline-block px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-[12px] font-semibold no-underline"
              >
                Ouvrir le lien ↗
              </a>
            </div>
          )}
        </div>
      </main>
      <footer className="flex-none px-4 py-2 text-center">
        <p className="text-[10px] font-mono text-white/35 m-0">
          Module Atlas fonctionnel — intégrable en iframe : <span className="text-white/55">?module={item.id}</span>
        </p>
      </footer>
    </div>
  );
}
