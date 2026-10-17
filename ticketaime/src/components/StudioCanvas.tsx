import "../workshop.css";
import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import Ticket from "./Ticket";
import Inspector, { type PieceCustomization } from "./Inspector";
import WalletView from "./WalletView";
import CreateMenu, { type ChoixCreation } from "./CreateMenu";
import SecurityBadge from "./SecurityBadge";
import EditionOverlay from "./EditionOverlay";
import { CATEGORIES, ITEMS, type CategoryId, type Item } from "../data/catalogue";
import { LAYOUTS, applyLayout, type LayoutId } from "../lib/layouts";
import { EDITIONS, type EditionId } from "../data/editions";
import type { CreationDraft } from "../data/landing";

export interface CanvasItemInstance {
  instanceId: string;
  itemId: string;
  x: number;
  y: number;
  zIndex: number;
  customization: PieceCustomization;
}

const INITIAL_PRESET_IDS = [
  "rose-stamp",
  "kraft-pass",
  "carte-mer",
  "polaroid-plage",
];

const blankCustom = (it?: Item): PieceCustomization => {
  const fields: Record<string, string> = {};
  (it?.editable ?? []).forEach((c) => { fields[c.cle] = c.valeur; });
  return { fields, actions: {}, rotate: it?.rotate ?? 0, scale: 0.65 };
};

export default function StudioCanvas({ initialCreation }: { initialCreation?: CreationDraft | null }) {
  const [viewMode, setViewMode] = useState<"canvas" | "wallet">("canvas");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | "tout">(
    () => ITEMS.find((item) => item.id === initialCreation?.itemId)?.category ?? "tout",
  );
  const [selectedInstanceId, setSelectedInstanceId] = useState<string | null>(initialCreation ? `idea-${initialCreation.id}` : null);
  const [layoutMenuOpen, setLayoutMenuOpen] = useState(false);
  const [edition, setEdition] = useState<EditionId>(initialCreation?.edition ?? "classique");
  const [securiteVisible, setSecuriteVisible] = useState(false);
  const [mobileInspectorOpen, setMobileInspectorOpen] = useState(false);

  const zCounter = useRef(10);
  const layoutMenuRef = useRef<HTMLDivElement>(null);

  const [canvasItems, setCanvasItems] = useState<CanvasItemInstance[]>(() => {
    if (initialCreation) {
      const item = ITEMS.find((piece) => piece.id === initialCreation.itemId);
      if (item) return [{
        instanceId: `idea-${initialCreation.id}`,
        itemId: item.id,
        x: typeof window !== "undefined" && window.innerWidth < 700 ? 4 : 60,
        y: 100,
        zIndex: 1,
        customization: {
          ...blankCustom(item),
          fields: { ...blankCustom(item).fields, ...initialCreation.fields },
          brief: initialCreation.brief,
        },
      }];
    }
    return [];
  });

  const selectedInstance = useMemo(
    () => canvasItems.find((ci) => ci.instanceId === selectedInstanceId) ?? null,
    [canvasItems, selectedInstanceId],
  );
  const selectedCatalogueItem = useMemo(() => {
    if (!selectedInstance) return null;
    return ITEMS.find((it) => it.id === selectedInstance.itemId) ?? null;
  }, [selectedInstance]);

  const bringToFront = useCallback((instanceId: string) => {
    zCounter.current += 1;
    const nextZ = zCounter.current;
    setCanvasItems((prev) =>
      prev.map((ci) => (ci.instanceId === instanceId ? { ...ci, zIndex: nextZ } : ci)),
    );
  }, []);

  const sendToBack = useCallback((instanceId: string) => {
    setCanvasItems((prev) =>
      prev.map((ci) => (ci.instanceId === instanceId ? { ...ci, zIndex: 1 } : ci)),
    );
  }, []);

  const addItemToCanvas = useCallback(
    (item: Item, customX?: number, customY?: number) => {
      zCounter.current += 1;
      const newInstance: CanvasItemInstance = {
        instanceId: `inst-${item.id}-${Date.now()}`,
        itemId: item.id,
        x: customX ?? Math.floor(Math.random() * 320 + 80),
        y: customY ?? Math.floor(Math.random() * 260 + 60),
        zIndex: zCounter.current,
        customization: blankCustom(item),
      };
      setCanvasItems((prev) => [...prev, newInstance]);
      setSelectedInstanceId(newInstance.instanceId);
      if (viewMode !== "canvas") setViewMode("canvas");
    },
    [viewMode],
  );

  const updateInstanceCustomization = useCallback(
    (instanceId: string, updates: Partial<PieceCustomization>) => {
      setCanvasItems((prev) =>
        prev.map((ci) =>
          ci.instanceId === instanceId
            ? { ...ci, customization: { ...ci.customization, ...updates } }
            : ci,
        ),
      );
    },
    [],
  );

  const removeInstance = useCallback((instanceId: string) => {
    setCanvasItems((prev) => prev.filter((ci) => ci.instanceId !== instanceId));
    setSelectedInstanceId(null);
  }, []);

  const duplicateInstance = useCallback(
    (instanceId: string) => {
      const orig = canvasItems.find((ci) => ci.instanceId === instanceId);
      if (!orig) return;
      zCounter.current += 1;
      const dup: CanvasItemInstance = {
        ...orig,
        customization: { ...orig.customization, fields: { ...orig.customization.fields }, actions: { ...orig.customization.actions } },
        instanceId: `inst-${orig.itemId}-${Date.now()}`,
        x: orig.x + 28,
        y: orig.y + 28,
        zIndex: zCounter.current,
      };
      setCanvasItems((prev) => [...prev, dup]);
      setSelectedInstanceId(dup.instanceId);
    },
    [canvasItems],
  );

  const clearCanvas = () => {
    setCanvasItems([]);
    setSelectedInstanceId(null);
  };

  /** Applique une mise en page aux pièces présentes (ou recharge le jeu de démo si vide). */
  const arrange = useCallback(
    (kind: LayoutId) => {
      setLayoutMenuOpen(false);
      let base = canvasItems;
      if (base.length === 0) {
        base = INITIAL_PRESET_IDS.map((id, index) => {
          const it = ITEMS.find((i) => i.id === id);
          return {
            instanceId: `inst-${id}-${Date.now()}-${index}`,
            itemId: id,
            x: 0,
            y: 0,
            zIndex: index + 1,
            customization: blankCustom(it),
          };
        });
      }
      const inputs = base.map((ci) => {
        const it = ITEMS.find((i) => i.id === ci.itemId);
        return { instanceId: ci.instanceId, w: it?.w ?? 300, rotate: ci.customization.rotate };
      });
      const placed = applyLayout(kind, inputs, 1180);
      const byId = new Map(placed.map((p) => [p.instanceId, p]));
      setCanvasItems(
        base.map((ci) => {
          const p = byId.get(ci.instanceId);
          return p
            ? { ...ci, x: p.x, y: p.y, zIndex: p.zIndex, customization: { ...ci.customization, rotate: p.rotate } }
            : ci;
        }),
      );
    },
    [canvasItems],
  );

  /** Applique le choix du menu « Que voulez-vous créer ? » */
  const appliquerChoix = useCallback(
    (choix: ChoixCreation) => {
      setEdition(choix.edition);
      setSelectedCategory(choix.categorie === "tout" ? "tout" : (choix.categorie as CategoryId));
      setViewMode("canvas");

      // Sélection de pièces : catégorie demandée, ou la sélection démo si « tout »
      let ids: string[];
      if (choix.categorie === "tout") {
        ids = INITIAL_PRESET_IDS;
      } else {
        const deCat = ITEMS.filter((i) => i.category === choix.categorie).map((i) => i.id);
        ids = deCat.length > 0 ? deCat : INITIAL_PRESET_IDS;
      }
      const instances: CanvasItemInstance[] = ids.map((id, index) => {
        const it = ITEMS.find((i) => i.id === id);
        return {
          instanceId: `inst-${id}-${Date.now()}-${index}`,
          itemId: id,
          x: 0,
          y: 0,
          zIndex: index + 1,
          customization: blankCustom(it),
        };
      });
      const inputs = instances.map((ci) => {
        const it = ITEMS.find((i) => i.id === ci.itemId);
        return { instanceId: ci.instanceId, w: it?.w ?? 300, rotate: ci.customization.rotate };
      });
      const places = applyLayout(choix.miseEnPage, inputs, 1180);
      const parId = new Map(places.map((p) => [p.instanceId, p]));
      setCanvasItems(
        instances.map((ci) => {
          const p = parId.get(ci.instanceId);
          return p ? { ...ci, x: p.x, y: p.y, zIndex: p.zIndex, customization: { ...ci.customization, rotate: p.rotate } } : ci;
        }),
      );
      setSelectedInstanceId(null);
    },
    [],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedInstanceId(null);
        setLayoutMenuOpen(false);
      }
    };
    const onClickOut = (e: MouseEvent) => {
      if (layoutMenuRef.current && !layoutMenuRef.current.contains(e.target as Node)) {
        setLayoutMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onClickOut);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onClickOut);
    };
  }, []);

  return (
    <div className="workshop-shell flex flex-col min-h-screen bg-neutral-100 text-neutral-900">
      {/* ── Barre d'atelier condensée ── */}
      <header className="sticky top-0 z-50 border-b border-black/10 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto max-w-[1700px] flex flex-wrap items-center gap-2 px-3 py-2 min-h-12">
          {/* Menu « Que voulez-vous créer ? » */}
          <CreateMenu onChoix={appliquerChoix} editionActive={edition} />

          {/* Édition active + bascule sécurité */}
          <div className="flex items-center gap-1.5">
            <span
              className="hidden md:inline text-[11px] font-medium px-2 py-1 rounded-full"
              style={{
                background: edition === "mariage" ? "#fff1f2" : "#f5f5f5",
                color: edition === "mariage" ? "#9f1239" : "#525252",
              }}
            >
              {EDITIONS[edition].nom}
            </span>
            <button
              type="button"
              onClick={() => setSecuriteVisible(!securiteVisible)}
              title="Afficher / masquer les sceaux de sécurité"
              className={`h-8 px-2.5 rounded-lg text-[12px] font-medium transition-all ${
                securiteVisible ? "bg-green-600 text-white" : "bg-neutral-100 text-neutral-600"
              }`}
            >
              ✓ Certificat
            </button>
          </div>

          {/* Segmented Table / Wallets */}
          <div className="flex items-center p-0.5 rounded-[10px] bg-neutral-200/80 gap-0.5">
            <button
              type="button"
              onClick={() => setViewMode("canvas")}
              aria-pressed={viewMode === "canvas"}
              className={`flex items-center gap-1.5 px-3 h-7 rounded-[8px] text-[12px] font-medium transition-all ${
                viewMode === "canvas" ? "bg-white shadow-sm text-neutral-900" : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              Composer
              <span className="font-mono text-[10px] px-1 rounded bg-neutral-900/10">{canvasItems.length}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("wallet")}
              aria-pressed={viewMode === "wallet"}
              className={`flex items-center gap-1.5 px-3 h-7 rounded-[8px] text-[12px] font-medium transition-all ${
                viewMode === "wallet" ? "bg-white shadow-sm text-neutral-900" : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              Les tickets
              <span className="font-mono text-[10px] px-1 rounded bg-neutral-900/10">{CATEGORIES.length}</span>
            </button>
          </div>

          <div className="ml-auto flex items-center gap-1.5">
            {selectedInstance && <button type="button" onClick={() => setMobileInspectorOpen(!mobileInspectorOpen)} className="lg:hidden h-8 px-3 rounded-lg bg-neutral-900 text-white text-xs">Personnaliser</button>}
            {viewMode === "canvas" && (
              <>
                {/* Menu mises en page */}
                <div className="relative" ref={layoutMenuRef}>
                  <button
                    type="button"
                    onClick={() => setLayoutMenuOpen(!layoutMenuOpen)}
                    className={`h-8 px-3 rounded-[10px] text-[12px] font-medium transition-all flex items-center gap-1.5 ${
                      layoutMenuOpen ? "bg-neutral-900 text-white" : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                    }`}
                  >
                    Arranger la table
                    <span className={`text-[9px] transition-transform ${layoutMenuOpen ? "rotate-180" : ""}`}>▾</span>
                  </button>
                  {layoutMenuOpen && (
                    <div className="absolute right-0 top-10 w-[280px] rounded-2xl border border-black/10 bg-white shadow-[0_16px_48px_rgba(0,0,0,0.18)] p-1.5 z-50">
                      <p className="px-2.5 pt-1.5 pb-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-neutral-400 m-0">
                        Mise en page
                      </p>
                      {LAYOUTS.map((l) => (
                        <button
                          key={l.id}
                          type="button"
                          onClick={() => arrange(l.id)}
                          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-neutral-100 text-left transition-colors group"
                        >
                          <span className="w-7 h-7 flex-none rounded-lg bg-neutral-100 group-hover:bg-white border border-black/10 flex items-center justify-center text-[13px]">
                            {l.icon}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[12px] font-medium text-neutral-900 leading-tight">{l.name}</span>
                            <span className="block text-[10px] text-neutral-500 truncate">{l.desc}</span>
                          </span>
                        </button>
                      ))}
                      <p className="px-2.5 py-1.5 text-[10px] text-neutral-400 m-0 border-t border-black/5 mt-1">
                        S'applique aux pièces posées{canvasItems.length === 0 ? " (recharge la sélection démo)" : ""}.
                      </p>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={clearCanvas}
                  className="h-8 px-3 rounded-[10px] bg-neutral-100 hover:bg-red-50 text-neutral-600 hover:text-red-600 text-[12px] font-medium transition-colors"
                >
                  Vider
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => window.print()}
              className="h-8 px-3.5 rounded-[10px] bg-blue-600 hover:bg-blue-500 text-white text-[12px] font-semibold transition-colors"
            >
              Imprimer
            </button>
          </div>
        </div>
      </header>

      {/* ── Table ou tickets, avec inspecteur ── */}
      <div className="flex-1 flex min-w-0 overflow-hidden relative">
        {/* 2. Centre */}
        <main
          className="min-w-0 flex-1 overflow-auto relative canvas-dots flex flex-col items-center justify-start p-4 sm:p-6"
          style={{ minHeight: "calc(100vh - 48px)" }}
          onClick={() => setSelectedInstanceId(null)}
        >
          {viewMode === "canvas" ? (
            <div id="atelier-preview" className="relative w-full min-h-[700px] max-w-[1400px] mx-auto select-none">
              {canvasItems.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center text-2xl mb-3">
                    ⊞
                  </div>
                  <h3 className="font-semibold text-[15px] text-white/80 m-0">Table vide</h3>
                  <p className="text-[12px] text-white/40 max-w-[280px] mt-1">
                    Choisissez votre premier ticket dans « Les tickets », puis personnalisez-le.
                  </p>
                  <button type="button" className="pointer-events-auto mt-4 rounded px-4 py-2 bg-[#f5f3ee] text-[#262723] text-xs" onClick={event => { event.stopPropagation(); setViewMode('wallet'); }}>Choisir un ticket</button>
                </div>
              )}

              {canvasItems.map((instance) => {
                const catalogueItem = ITEMS.find((it) => it.id === instance.itemId);
                if (!catalogueItem) return null;
                const isSelected = selectedInstanceId === instance.instanceId;
                const cust = instance.customization;
                const perso = { ...cust.fields, ...cust.actions };
                const href = cust.actions?._href || cust.href;
                const cible = cust.actions?._cible || cust.hrefTarget || "_blank";
                return (
                  <div
                    key={instance.instanceId}
                    data-atlas-module={catalogueItem.id}
                    data-atlas-category={catalogueItem.category}
                    data-atlas-version="1.0.0"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedInstanceId(instance.instanceId);
                      bringToFront(instance.instanceId);
                    }}
                    style={{
                      position: "absolute",
                      left: `${instance.x}px`,
                      top: `${instance.y}px`,
                      width: `min(85vw, ${Math.round(catalogueItem.w * 0.95 * (cust.scale ?? 1))}px)`,
                      zIndex: instance.zIndex,
                    }}
                  >
                    <Ticket
                      w={catalogueItem.w}
                      h={catalogueItem.h}
                      rotate={cust.rotate}
                      label={catalogueItem.name}
                      caption={false}
                      draggable
                      isSelected={isSelected}
                      disableReveal
                      onPick={() => {
                        setSelectedInstanceId(instance.instanceId);
                        bringToFront(instance.instanceId);
                      }}
                      handwrittenNote={cust.handwrittenNote}
                      stampOverlay={cust.stampOverlay}
                      sealOverlay={cust.sealOverlay}
                      className="w-full"
                    >
                      {/* @ts-ignore */}
                      <catalogueItem.Component personnalisation={perso} />
                      {securiteVisible && (
                        <SecurityBadge
                          categorie={catalogueItem.category}
                          pieceId={catalogueItem.id}
                          nom={catalogueItem.name}
                          compact
                        />
                      )}
                      {!cust.brief && <EditionOverlay edition={EDITIONS[edition]} categorie={catalogueItem.category} compact />}
                    </Ticket>
                    {href && (
                      <a
                        href={href}
                        target={cible}
                        rel={cible === "_blank" ? "noreferrer" : undefined}
                        onClick={(e) => e.stopPropagation()}
                        onPointerDown={(e) => e.stopPropagation()}
                        className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-medium shadow-lg transition-all opacity-0 hover:opacity-100 focus:opacity-100"
                        style={{ opacity: isSelected ? 1 : undefined }}
                        title={href}
                      >
                        Ouvrir le lien ↗
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full">
              <WalletView
                searchQuery={searchQuery}
                onSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                selectedItemId={selectedCatalogueItem?.id}
                onSelectItem={(it) => {
                  const existing = canvasItems.find((ci) => ci.itemId === it.id);
                  if (existing) setSelectedInstanceId(existing.instanceId);
                  else addItemToCanvas(it);
                }}
                onDropOnCanvas={(it) => addItemToCanvas(it)}
              />
            </div>
          )}
        </main>

        {/* 3. Inspecteur */}
        <Inspector
          item={selectedCatalogueItem}
          customization={selectedInstance?.customization}
          mobileOpen={mobileInspectorOpen}
          onUpdateCustomization={(updates) => {
            if (selectedInstance) updateInstanceCustomization(selectedInstance.instanceId, updates);
          }}
          onClose={() => { setSelectedInstanceId(null); setMobileInspectorOpen(false); }}
          onBringToFront={() => selectedInstance && bringToFront(selectedInstance.instanceId)}
          onSendToBack={() => selectedInstance && sendToBack(selectedInstance.instanceId)}
          onDuplicate={() => selectedInstance && duplicateInstance(selectedInstance.instanceId)}
          onRemoveFromCanvas={() => selectedInstance && removeInstance(selectedInstance.instanceId)}
          onReset={() => {
            if (!selectedInstance || !selectedCatalogueItem) return;
            updateInstanceCustomization(selectedInstance.instanceId, {
              ...blankCustom(selectedCatalogueItem),
              handwrittenNote: undefined,
              stampOverlay: undefined,
              sealOverlay: undefined,
            });
          }}
          onPrint={() => window.print()}
          edition={edition}
        />
      </div>
    </div>
  );
}
