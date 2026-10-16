import { useState } from "react";
import StudioCanvas from "./components/StudioCanvas";
import Catalogue from "./components/Catalogue";
import PieceGuide from "./components/PieceGuide";
import Landing from "./components/Landing";
import ModuleView from "./components/ModuleView";
import { CATEGORIES, ITEMS } from "./data/catalogue";
import { moduleIdFromLocation } from "./lib/atlas";
import type { CreationDraft } from "./data/landing";

const TOTAL = ITEMS.length;

export default function App() {
  const [vue, setVue] = useState<"landing" | "studio" | "catalogue">("landing");
  const [creation, setCreation] = useState<CreationDraft | null>(null);

  const ouvrirStudio = (draft?: CreationDraft) => {
    setCreation(draft ?? null);
    setVue("studio");
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  if (new URLSearchParams(window.location.search).get("page") === "guide") return <PieceGuide />;

  // ── Vue module isolée pour Atlas : `?module=<id>` ──
  const soloModule = moduleIdFromLocation();
  if (soloModule) return <ModuleView moduleId={soloModule} />;

  // ── Vue catalogue autonome (fond gris foncé restauré) ──
  if (vue === "catalogue") {
    return (
      <div className="canvas-dots canvas-vignette relative min-h-screen">
        <div className="relative z-10">
          <header className="sticky top-0 z-50 border-b border-white/10 bg-[#1c1c1f]/85 backdrop-blur-xl">
            <div className="mx-auto max-w-[1700px] flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-2.5 sm:px-6 lg:px-8">
              <div className="flex items-baseline gap-2.5">
                <span className="font-bebas text-2xl leading-none tracking-[0.22em] text-[#f4efe2]">
                  ÉPHÉMÈRES
                </span>
                <span className="hidden font-type text-[10px] uppercase tracking-[0.2em] text-white/40 sm:inline">
                  catalogue · {TOTAL} pièces
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setVue("landing")}
                  className="h-8 px-3 rounded-[10px] bg-white/5 hover:bg-white/10 text-white/70 text-[12px] font-medium transition-colors"
                >
                  Le Monde Aime
                </button>
                <button
                  type="button"
                  onClick={() => setVue("studio")}
                  className="h-8 px-4 rounded-[10px] bg-blue-600 hover:bg-blue-500 text-white text-[12px] font-semibold transition-colors"
                >
                  Ouvrir l'atelier →
                </button>
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-[1600px] px-4 pt-8 pb-16 sm:px-6 lg:px-10">
            <div className="mb-8 border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="font-type text-xs uppercase tracking-[0.25em] text-amber-300/80 m-0">
                  Inventaire typologique
                </p>
                <h1 className="font-bebas text-5xl md:text-6xl text-white tracking-wider m-0 mt-1">
                  Les {TOTAL} Pièces de la Collection
                </h1>
              </div>
              <button
                type="button"
                onClick={() => setVue("studio")}
                className="h-9 px-4 rounded-[10px] bg-blue-600 hover:bg-blue-500 text-white text-[13px] font-semibold transition-colors"
              >
                Composer dans l'atelier →
              </button>
            </div>
            <Catalogue />
          </main>

          <footer className="border-t border-white/10 px-4 py-8 sm:px-6 lg:px-8 bg-[#101114]">
            <div className="mx-auto max-w-[1600px] flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="m-0 font-script text-3xl text-[#f4efe2]/90 sm:text-4xl">Le Monde Aime</p>
                <p className="m-0 mt-0.5 font-type text-[10.5px] uppercase tracking-[0.24em] text-white/40">
                  atelier d'éphémères certifiés
                </p>
              </div>
              <p className="m-0 max-w-md font-type text-[10.5px] uppercase leading-relaxed tracking-[0.18em] text-white/35 sm:text-right">
                {TOTAL} pièces composées en CSS/SVG pur · certificats, QR de vérification & Wallet iPhone
              </p>
            </div>
          </footer>
        </div>
      </div>
    );
  }

  // ── Vue landing (accueil) ou studio ──
  if (vue === "landing") {
    return <Landing onCommencer={ouvrirStudio} onCatalogue={() => {
      setVue("catalogue");
      window.scrollTo({ top: 0, behavior: "instant" });
    }} />;
  }

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 antialiased">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/10">
        <div className="mx-auto max-w-[1700px] flex items-center gap-2.5 px-3 h-12">
          <button
            type="button"
            onClick={() => setVue("landing")}
            className="flex items-baseline gap-2 bg-transparent border-0 cursor-pointer p-0"
          >
            <span className="text-[15px] font-bold tracking-tight text-neutral-900">Le Monde Aime</span>
            <span className="hidden sm:inline text-[11px] text-neutral-500">
              atelier · {TOTAL} pièces · {CATEGORIES.length} catégories
            </span>
          </button>

          <div className="ml-auto flex items-center p-0.5 rounded-[10px] bg-neutral-200/80 gap-0.5">
            <button
              type="button"
              onClick={() => setVue("studio")}
              className="px-3 h-7 rounded-[8px] text-[12px] font-medium bg-white shadow-sm text-neutral-900"
            >
              Studio
            </button>
            <button
              type="button"
              onClick={() => setVue("catalogue")}
              className="px-3 h-7 rounded-[8px] text-[12px] font-medium text-neutral-500 hover:text-neutral-800"
            >
              Catalogue
            </button>
          </div>
        </div>
      </header>

      <StudioCanvas key={creation?.id ?? "studio"} initialCreation={creation} />
    </div>
  );
}
