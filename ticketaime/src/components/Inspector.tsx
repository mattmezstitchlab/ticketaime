import { useState } from "react";
import Ticket from "./Ticket";
import { CATEGORIES, ITEM_INDEX, type Item } from "../data/catalogue";
import { actionsPourPiece, LIEN_PIECE, CIBLE_LIEN } from "../lib/moduleActions";
import SecurityBadge from "./SecurityBadge";
import WalletSheet from "./WalletSheet";
import { EDITIONS, type EditionId } from "../data/editions";

export interface PieceCustomization {
  fields: Record<string, string>;
  brief?: string;
  /** Valeurs fonctionnelles (URLs / actions réelles), fusionnées dans personnalisation */
  actions: Record<string, string>;
  /** Lien sur toute la pièce (optionnel) */
  href?: string;
  hrefTarget?: string;
  rotate: number;
  scale: number;
  handwrittenNote?: {
    text: string;
    ink: "blue" | "sepia" | "black" | "red";
    rotation?: number;
  };
  stampOverlay?: string;
  sealOverlay?: string;
}

interface InspectorProps {
  item: Item | null;
  customization?: PieceCustomization;
  onUpdateCustomization: (updates: Partial<PieceCustomization>) => void;
  onClose: () => void;
  onBringToFront?: () => void;
  onSendToBack?: () => void;
  onDuplicate?: () => void;
  onRemoveFromCanvas?: () => void;
  onReset?: () => void;
  onPrint?: () => void;
  edition?: EditionId;
  porteur?: string;
  mobileOpen?: boolean;
}

type TabId = "contenu" | "fonction" | "securite" | "wallet" | "tampons";

const inputCls =
  "w-full rounded-lg border border-black/10 bg-white px-2.5 py-1.5 text-[12px] text-neutral-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-neutral-400";
const labelCls =
  "block text-[10px] font-medium uppercase tracking-[0.08em] text-neutral-500 mb-1";
const sectionTitleCls =
  "block text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400";

export default function Inspector({
  item,
  customization,
  onUpdateCustomization,
  onClose,
  onBringToFront,
  onSendToBack,
  onDuplicate,
  onRemoveFromCanvas,
  onReset,
  onPrint,
  edition = "classique",
  porteur,
  mobileOpen = false,
}: InspectorProps) {
  const [activeTab, setActiveTab] = useState<TabId>("contenu");

  if (!item) {
    return (
      <aside className="w-[300px] flex-none hidden lg:flex flex-col items-center justify-center p-6 text-center bg-white/70 backdrop-blur-xl border-l border-black/10">
        <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-xl mb-3">
          ◇
        </div>
        <p className="text-[12px] font-semibold text-neutral-800 m-0">Inspecteur</p>
        <p className="text-[11px] leading-relaxed text-neutral-500 max-w-[220px] mt-1">
          Sélectionnez une pièce pour régler son contenu, ses liens et ses actions réelles.
        </p>
      </aside>
    );
  }

  const category = CATEGORIES.find((c) => c.id === item.category);
  const n = ITEM_INDEX[item.id] ?? 1;
  const fields = item.editable ?? [];
  const currentValues = customization?.fields ?? {};
  const currentActions = customization?.actions ?? {};
  const currentRotate = customization?.rotate ?? item.rotate;
  const currentScale = customization?.scale ?? 1;
  const fonctionFields = actionsPourPiece(item.id, item.category);

  const handleFieldChange = (key: string, value: string) => {
    onUpdateCustomization({ fields: { ...currentValues, [key]: value } });
  };
  const handleActionChange = (key: string, value: string) => {
    onUpdateCustomization({ actions: { ...currentActions, [key]: value } });
  };

  const tabs: { id: TabId; label: string; count?: number }[] = [
    { id: "contenu", label: "Contenu", count: fields.length },
    { id: "fonction", label: "Fonction", count: fonctionFields.length + 1 },
    { id: "securite", label: "Certificat" },
    { id: "wallet", label: "Wallet" },
    { id: "tampons", label: "Cachets" },
  ];

  const renderActionInput = (
    cle: string,
    label: string,
    type: string,
    placeholder?: string,
    aide?: string,
    defaut?: string,
    options?: { value: string; label: string }[],
  ) => {
    const val = currentActions[cle] ?? defaut ?? "";
    if (type === "select" && options) {
      return (
        <div key={cle}>
          <label className={labelCls}>{label}</label>
          <select
            value={val}
            onChange={(e) => handleActionChange(cle, e.target.value)}
            className={`${inputCls} cursor-pointer`}
          >
            {options.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          {aide && <p className="text-[10px] text-neutral-400 mt-0.5 m-0">{aide}</p>}
        </div>
      );
    }
    const inputType = type === "email" ? "email" : type === "tel" ? "tel" : type === "url" ? "url" : "text";
    return (
      <div key={cle}>
        <label className={labelCls}>{label}</label>
        <input
          type={inputType}
          value={val}
          placeholder={placeholder}
          onChange={(e) => handleActionChange(cle, e.target.value)}
          className={`${inputCls} font-mono text-[11px]`}
        />
        {aide && <p className="text-[10px] text-neutral-400 mt-0.5 m-0">{aide}</p>}
      </div>
    );
  };

  return (
    <aside aria-label="Inspecteur de la pièce sélectionnée" className={`${mobileOpen ? "fixed left-3 right-3 top-28 bottom-3 flex w-auto rounded-xl border border-black/10 z-[70] lg:relative lg:inset-auto lg:rounded-none lg:z-30" : "w-[300px] hidden lg:flex"} lg:w-[300px] flex-none flex-col bg-white/95 backdrop-blur-xl border-l border-black/10 max-h-[calc(100dvh-100px)] select-none z-30 shadow-[-12px_0_32px_rgba(0,0,0,0.25)]`}>
      {/* Header condensé */}
      <div className="px-3.5 py-3 border-b border-black/10 flex items-center gap-2.5 bg-white/60">
        <span
          className="flex-none font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-neutral-900 text-white"
        >
          #{String(n).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-[12px] font-semibold text-neutral-900 truncate m-0 leading-tight">
            {item.name}
          </h3>
          <span className="text-[10px] text-neutral-500">
            {category?.name} · {item.w}×{item.h}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex-none w-6 h-6 rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-600 text-[11px] leading-none transition-colors"
          title="Fermer"
        >
          ✕
        </button>
      </div>

      {/* Aperçu compact */}
      <div className="px-3.5 py-3 border-b border-black/10 bg-neutral-100/80 flex items-center justify-center relative overflow-hidden min-h-[120px] max-h-[168px]">
        <div
          className="w-full flex items-center justify-center transition-transform duration-200 pointer-events-none"
          style={{
            maxWidth: `${Math.min(item.w * 0.55, 220)}px`,
            transform: `rotate(${currentRotate}deg) scale(${currentScale * 0.92})`,
          }}
        >
          <Ticket w={item.w} h={item.h} rotate={0} label={item.name} caption={false} className="w-full">
            {/* @ts-ignore */}
            <item.Component personnalisation={{ ...currentValues, ...currentActions }} />
          </Ticket>
        </div>
        {customization?.stampOverlay && (
          <span className="absolute top-1.5 right-1.5 text-[9px] font-medium px-1.5 py-0.5 rounded-md bg-red-600 text-white">
            {customization.stampOverlay}
          </span>
        )}
        {customization?.sealOverlay && (
          <span className="absolute bottom-1.5 left-1.5 text-[9px] font-medium px-1.5 py-0.5 rounded-md bg-amber-600 text-white">
            Cire
          </span>
        )}
      </div>

      {/* Segmented control Apple-like */}
      <div className="px-3.5 pt-2.5">
        <div className="flex p-0.5 rounded-[10px] bg-neutral-200/80 gap-0.5">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 py-1.5 text-center rounded-[8px] text-[11px] font-medium transition-all ${
                activeTab === t.id
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              {t.label}
              {typeof t.count === "number" && t.count > 0 && (
                <span className="ml-1 text-[9px] opacity-60">{t.count}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Contenu scrollable */}
      <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-4 [scrollbar-width:thin]">
        {activeTab === "contenu" && (
          <div className="space-y-3.5">
            {customization?.brief && <div className="rounded-xl border border-black/10 bg-[#f6f5f0] p-3">
              <label htmlFor="inspector-brief" className={labelCls}>Votre idée de départ</label>
              <textarea id="inspector-brief" rows={3} maxLength={360} className={`${inputCls} resize-y`} value={customization.brief} onChange={(e) => onUpdateCustomization({ brief: e.target.value })} />
              <p className="mt-1 text-[10px] text-neutral-500">Un point de départ. Affinez votre pièce ci-dessous.</p>
            </div>}
            {/* Géométrie */}
            <div className="rounded-xl border border-black/10 bg-white p-3 space-y-3">
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <span className={sectionTitleCls}>Rotation</span>
                  <span className="font-mono text-[11px] text-blue-600">{Math.round(currentRotate)}°</span>
                </div>
                <input
                  type="range" min="-45" max="45" step="0.5" value={currentRotate}
                  onChange={(e) => onUpdateCustomization({ rotate: parseFloat(e.target.value) })}
                  className="w-full accent-blue-600 h-1 cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <span className={sectionTitleCls}>Échelle</span>
                  <span className="font-mono text-[11px] text-blue-600">{Math.round(currentScale * 100)}%</span>
                </div>
                <input
                  type="range" min="0.5" max="1.6" step="0.05" value={currentScale}
                  onChange={(e) => onUpdateCustomization({ scale: parseFloat(e.target.value) })}
                  className="w-full accent-blue-600 h-1 cursor-pointer"
                />
              </div>
            </div>

            {fields.length > 0 ? (
              <div className="rounded-xl border border-black/10 bg-white p-3 space-y-2.5">
                <span className={sectionTitleCls}>Textes de la pièce</span>
                {fields.map((field) => (
                  <div key={field.cle}>
                    <label className={labelCls}>{field.label}</label>
                    <input
                      type="text"
                      value={currentValues[field.cle] ?? field.valeur}
                      onChange={(e) => handleFieldChange(field.cle, e.target.value)}
                      className={inputCls}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-black/10 bg-neutral-50 p-3 text-center text-[11px] text-neutral-500 leading-relaxed">
                Pièce d'archive non textuelle. Utilisez l'onglet Fonction pour ses liens.
              </div>
            )}
          </div>
        )}

        {activeTab === "fonction" && (
          <div className="space-y-3.5">
            <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-3 space-y-2.5">
              <span className={sectionTitleCls}>Lien sur la pièce entière</span>
              {renderActionInput(LIEN_PIECE.cle, LIEN_PIECE.label, LIEN_PIECE.type, LIEN_PIECE.placeholder, LIEN_PIECE.aide)}
              {renderActionInput(CIBLE_LIEN.cle, CIBLE_LIEN.label, CIBLE_LIEN.type, undefined, undefined, CIBLE_LIEN.defaut, CIBLE_LIEN.options)}
            </div>

            {fonctionFields.length > 0 ? (
              <div className="rounded-xl border border-black/10 bg-white p-3 space-y-2.5">
                <span className={sectionTitleCls}>
                  {item.category === "web" ? "Actions réelles du module" : `Fonction · ${category?.name}`}
                </span>
                {fonctionFields.map((f) =>
                  renderActionInput(f.cle, f.label, f.type, f.placeholder, f.aide, f.defaut, f.options)
                )}
                {item.category === "web" && (
                  <p className="text-[10px] text-neutral-400 m-0 leading-relaxed">
                    Ces URL rendent boutons, liens, formulaires et FAQ réellement cliquables sur le canevas et dans Atlas.
                  </p>
                )}
              </div>
            ) : (
              <div className="rounded-xl border border-black/10 bg-neutral-50 p-3 text-center text-[11px] text-neutral-500">
                Aucune action spécifique — seul le lien global s'applique.
              </div>
            )}
          </div>
        )}

        {activeTab === "securite" && (
          <div className="space-y-3.5">
            <SecurityBadge
              categorie={item.category}
              pieceId={item.id}
              nom={item.name}
              porteur={porteur}
            />
            {edition === "mariage" && (
              <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-3 space-y-2">
                <span className={sectionTitleCls}>Édition Mariage</span>
                <p className="text-[11px] text-neutral-600 m-0 leading-relaxed">
                  Cette pièce est transformée en faire-part : ruban, placement de table et compte à
                  rebours sont appliqués sur le canevas.
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {EDITIONS.mariage.rsvp.map((c) => (
                    <div key={c.cle} className="rounded-lg bg-white px-2 py-1">
                      <span className="block text-[9px] text-neutral-500">{c.label}</span>
                      <span className="text-[11px] font-medium text-neutral-800">{c.valeur}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "wallet" && (
          <div className="space-y-3.5">
            <WalletSheet
              item={item}
              edition={edition}
              personnalisation={{ ...currentValues, ...currentActions }}
            />
          </div>
        )}

        {activeTab === "tampons" && (
          <div className="space-y-3.5">
            <div className="rounded-xl border border-black/10 bg-white p-3">
              <span className={sectionTitleCls}>Tampon d'atelier</span>
              <div className="grid grid-cols-2 gap-1.5 mt-2">
                {[
                  { id: "paye", label: "Payé" },
                  { id: "confidentiel", label: "Confidentiel" },
                  { id: "vu", label: "Vu & approuvé" },
                  { id: "prioritaire", label: "Prioritaire" },
                  { id: "archives", label: "Archives" },
                ].map((s) => {
                  const on = customization?.stampOverlay === s.id;
                  return (
                    <button
                      key={s.id} type="button"
                      onClick={() => onUpdateCustomization({ stampOverlay: on ? undefined : s.id })}
                      className={`px-2 py-1.5 rounded-lg text-[11px] font-medium border transition-all ${
                        on ? "border-red-500 bg-red-50 text-red-700" : "border-black/10 bg-white hover:border-black/25 text-neutral-700"
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="rounded-xl border border-black/10 bg-white p-3">
              <span className={sectionTitleCls}>Sceau de cire</span>
              <div className="grid grid-cols-2 gap-1.5 mt-2">
                {[
                  { id: "fleur-de-lys", label: "Fleur de Lys" },
                  { id: "rf", label: "Monogramme R.F." },
                ].map((s) => {
                  const on = customization?.sealOverlay === s.id;
                  return (
                    <button
                      key={s.id} type="button"
                      onClick={() => onUpdateCustomization({ sealOverlay: on ? undefined : s.id })}
                      className={`px-2 py-1.5 rounded-lg text-[11px] font-medium border transition-all ${
                        on ? "border-amber-500 bg-amber-50 text-amber-700" : "border-black/10 bg-white hover:border-black/25 text-neutral-700"
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Barre d'actions condensée */}
      <div className="p-2.5 border-t border-black/10 bg-white/70 space-y-1.5">
        <div className="grid grid-cols-4 gap-1.5">
          <button type="button" onClick={onBringToFront} title="Premier plan"
            className="py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-[11px] text-neutral-700 transition-colors">⤴ Avant</button>
          <button type="button" onClick={onSendToBack} title="Arrière-plan"
            className="py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-[11px] text-neutral-700 transition-colors">⤵ Arrière</button>
          <button type="button" onClick={onDuplicate} title="Dupliquer"
            className="py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-[11px] text-neutral-700 transition-colors">⧉ Copie</button>
          <button type="button" onClick={onReset} title="Réinitialiser"
            className="py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-[11px] text-neutral-700 transition-colors">↺ Reset</button>
        </div>
        <div className="flex gap-1.5">
          <button type="button" onClick={onPrint}
            className="flex-1 py-2 rounded-[10px] bg-blue-600 hover:bg-blue-500 text-white text-[12px] font-semibold transition-colors">
            Imprimer cette pièce
          </button>
          <button type="button" onClick={onRemoveFromCanvas} title="Retirer"
            className="px-3 rounded-[10px] bg-red-50 hover:bg-red-100 text-red-600 text-[12px] transition-colors">✕</button>
        </div>
        <p className="text-[9px] font-mono text-neutral-400 m-0 text-center">
          atlas:{item.category}/{item.id} · v1.0.0
        </p>
      </div>
    </aside>
  );
}
