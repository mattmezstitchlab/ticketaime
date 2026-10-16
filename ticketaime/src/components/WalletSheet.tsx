import { useMemo, useState } from "react";
import QRCode from "qrcode";
import { idPiece, niveauSecurite, payloadCertificat } from "../lib/security";
import type { Item } from "../data/catalogue";
import { EDITIONS, type EditionId } from "../data/editions";

/* ------------------------------------------------------------------ */
/*  Wallet iPhone — pièces rangées dans l'application « Wallet »      */
/* ------------------------------------------------------------------ */

export interface WalletEntry {
  instanceId: string;
  itemId: string;
  nom: string;
  categorie: string;
  ajouteLe: number;
  edition: EditionId;
  identifiant: string;
}

const CLE_STOCKAGE = "lemondeaime.wallet.v1";

export function chargerWallet(): WalletEntry[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(CLE_STOCKAGE);
    return raw ? (JSON.parse(raw) as WalletEntry[]) : [];
  } catch {
    return [];
  }
}

export function sauvegarderWallet(entries: WalletEntry[]): void {
  try {
    localStorage.setItem(CLE_STOCKAGE, JSON.stringify(entries));
  } catch {
    /* stockage indisponible */
  }
}

interface WalletSheetProps {
  item: Item;
  edition: EditionId;
  personnalisation?: Record<string, string>;
  onAjoute?: (entry: WalletEntry) => void;
}

/** Bouton « Ajouter au Wallet » + pass style Apple Wallet. */
export default function WalletSheet({ item, edition, personnalisation, onAjoute }: WalletSheetProps) {
  const [dansWallet, setDansWallet] = useState(false);
  const identite = useMemo(
    () => idPiece(item.category, item.id, edition === "mariage" ? "mariage" : undefined),
    [item.id, item.category, edition],
  );
  const niveau = niveauSecurite(item.category);
  const couleurNiveau = { standard: "#34c759", renforce: "#ff9500", critique: "#ff3b30" }[niveau];

  const qrSvg = useMemo(() => {
    try {
      const qr = QRCode.create(payloadCertificat(identite, item.category, item.name), {
        errorCorrectionLevel: "M",
      });
      const cell = 4;
      let path = "";
      const n = qr.modules.size;
      for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
          if (qr.modules.get(r, c)) path += `M${c * cell},${r * cell}h${cell}v${cell}h${-cell}z`;
        }
      }
      return { path, size: n * cell };
    } catch {
      return { path: "", size: 0 };
    }
  }, [identite, item.category, item.name]);

  const ajouter = () => {
    const entry: WalletEntry = {
      instanceId: `w-${item.id}-${Date.now()}`,
      itemId: item.id,
      nom: item.name,
      categorie: item.category,
      ajouteLe: Date.now(),
      edition,
      identifiant: identite.id,
    };
    const actuel = chargerWallet();
    sauvegarderWallet([entry, ...actuel.filter((e) => e.itemId !== item.id)]);
    setDansWallet(true);
    onAjoute?.(entry);
  };

  const editionDef = EDITIONS[edition];
  const champRsvp = (cle: string) => editionDef.rsvp.find((c) => c.cle === cle)?.valeur ?? "";

  return (
    <div className="space-y-3">
      {/* Bouton d'ajout */}
      <button
        type="button"
        onClick={ajouter}
        className={`w-full py-2.5 rounded-[10px] text-[12px] font-semibold transition-all flex items-center justify-center gap-2 ${
          dansWallet
            ? "bg-green-600 text-white"
            : "bg-black text-white hover:bg-neutral-800"
        }`}
      >
        {dansWallet ? "✓ Dans le Wallet de l'iPhone" : " Ajouter au Wallet"}
      </button>

      {/* Pass style Apple Wallet */}
      <div
        className="rounded-[14px] overflow-hidden text-white"
        style={{
          background: `linear-gradient(150deg, ${edition === "mariage" ? "#6b3550" : "#3a2f26"}, #171318)`,
          boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
        }}
      >
        {/* En-tête du pass */}
        <div className="flex items-center justify-between px-3.5 pt-3 pb-2">
          <div className="flex items-center gap-2">
            <span
              className="w-6 h-6 rounded-md flex items-center justify-center text-[11px]"
              style={{ background: edition === "mariage" ? "#c9a227" : "#b88938" }}
            >
              ✦
            </span>
            <div>
              <p className="text-[11px] font-semibold m-0 leading-tight">Le Monde Aime</p>
              <p className="text-[9px] opacity-60 m-0 leading-tight">
                {edition === "mariage" ? "Édition Mariage" : "Collection"}
              </p>
            </div>
          </div>
          <span className="text-[9px] font-mono opacity-60">{identite.id.slice(-8)}</span>
        </div>

        {/* Corps */}
        <div className="px-3.5 pb-3 space-y-2.5">
          <div>
            <p className="text-[9px] uppercase tracking-[0.14em] opacity-55 m-0">Pièce</p>
            <p className="text-[14px] font-bold m-0 leading-tight">{item.name}</p>
          </div>

          {edition === "mariage" && (
            <div className="grid grid-cols-2 gap-2">
              {[
                ["Mariés", champRsvp("maries")],
                ["Date", champRsvp("date")],
                ["Heure", champRsvp("heure")],
                ["Table", champRsvp("table")],
              ].map(([l, v]) => (
                <div key={l}>
                  <p className="text-[9px] uppercase tracking-[0.12em] opacity-55 m-0">{l}</p>
                  <p className="text-[11px] font-semibold m-0 truncate">{v || "—"}</p>
                </div>
              ))}
            </div>
          )}

          {personnalisation && Object.keys(personnalisation).length > 0 && (
            <div className="space-y-1">
              {Object.entries(personnalisation)
                .filter(([, v]) => v && !v.startsWith("http"))
                .slice(0, 3)
                .map(([cle, v]) => (
                  <div key={cle} className="flex justify-between text-[10px]">
                    <span className="opacity-55 truncate max-w-[45%]">{cle}</span>
                    <span className="font-semibold truncate max-w-[50%]">{v}</span>
                  </div>
                ))}
            </div>
          )}

          {/* QR + sceau */}
          <div className="flex items-center gap-2.5 pt-1">
            <div className="flex-none bg-white rounded-lg p-1.5">
              {qrSvg.path ? (
                <svg viewBox={`0 0 ${qrSvg.size} ${qrSvg.size}`} style={{ width: 56, height: 56, display: "block" }}>
                  <path d={qrSvg.path} fill="#171318" />
                </svg>
              ) : (
                <div style={{ width: 56, height: 56 }} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: couleurNiveau }}
                />
                <span className="text-[9px] uppercase tracking-[0.12em] opacity-70">
                  Sécurité {niveau}
                </span>
              </div>
              <p className="font-mono text-[10px] opacity-70 m-0 truncate">{identite.hash}</p>
              <p className="text-[9px] opacity-50 m-0 mt-0.5">
                Ajouté le {new Date().toLocaleDateString("fr-FR")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-[9px] font-mono text-neutral-400 m-0 leading-relaxed">
        Pass généré côté client (pass.json + QR). La signature Apple requiert un certificat
        développeur pour un déploiement PassKit en production.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Liste du Wallet (vue dédiée)                                       */
/* ------------------------------------------------------------------ */

export function WalletList() {
  const [entries, setEntries] = useState<WalletEntry[]>(() => chargerWallet());
  const retirer = (instanceId: string) => {
    const next = entries.filter((e) => e.instanceId !== instanceId);
    setEntries(next);
    sauvegarderWallet(next);
  };

  if (entries.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-neutral-100 flex items-center justify-center text-2xl mb-3">
          ▢
        </div>
        <p className="text-[13px] font-semibold text-neutral-800 m-0">Wallet vide</p>
        <p className="text-[12px] text-neutral-500 m-0 mt-1">
          Ajoutez des pièces depuis l'inspecteur pour les retrouver ici.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {entries.map((e) => (
        <div
          key={e.instanceId}
          className="rounded-[14px] p-3 text-white"
          style={{ background: "linear-gradient(150deg, #6b3550, #171318)" }}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold m-0 leading-tight truncate">{e.nom}</p>
              <p className="text-[9px] opacity-60 m-0 font-mono">{e.identifiant}</p>
            </div>
            <button
              type="button"
              onClick={() => retirer(e.instanceId)}
              className="flex-none text-[10px] opacity-60 hover:opacity-100"
              title="Retirer"
            >
              ✕
            </button>
          </div>
          <p className="text-[9px] opacity-50 m-0 mt-2">
            {e.edition === "mariage" ? "Édition Mariage" : "Collection"} ·{" "}
            {new Date(e.ajouteLe).toLocaleDateString("fr-FR")}
          </p>
        </div>
      ))}
    </div>
  );
}
