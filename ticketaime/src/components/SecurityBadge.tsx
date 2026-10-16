import { useMemo, useState } from "react";
import QRCode from "qrcode";
import {
  NIVEAUX,
  creerPreuve,
  idPiece,
  niveauSecurite,
  payloadCertificat,
  verifierPiece,
  type IdentitePiece,
  type Preuve,
} from "../lib/security";
import { u } from "../lib/units";

/* ------------------------------------------------------------------ */
/*  Hologramme animé (ruban de sécurité)                              */
/* ------------------------------------------------------------------ */

function Hologramme({ niveau }: { niveau: string }) {
  const couleur = NIVEAUX[niveau as keyof typeof NIVEAUX]?.couleur ?? "#4fae62";
  return (
    <span
      aria-hidden="true"
      className="inline-block relative overflow-hidden rounded-[2px] align-middle"
      style={{
        width: u(26),
        height: u(14),
        background: `linear-gradient(115deg, ${couleur}22, ${couleur}88, #ffffff66, ${couleur}55)`,
        backgroundSize: "220% 100%",
        animation: "holo-sweep 2.6s linear infinite",
        boxShadow: `inset 0 0 0 ${u(0.8)} rgba(255,255,255,0.55)`,
      }}
    >
      <span
        className="absolute inset-0"
        style={{
          background: `repeating-linear-gradient(90deg, transparent 0 ${u(2)}, rgba(255,255,255,0.35) ${u(2)} ${u(3)})`,
        }}
      />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Sceau de sécurité complet (apposé sur la pièce)                   */
/* ------------------------------------------------------------------ */

export interface SecurityBadgeProps {
  categorie: string;
  pieceId: string;
  nom: string;
  /** Taille compacte = incrusté sur la pièce ; large = panneau d'inspection */
  compact?: boolean;
  porteur?: string;
  onTransfert?: (identite: IdentitePiece) => void;
  onEnvoyer?: (preuve: Preuve) => void;
}

export default function SecurityBadge({
  categorie,
  pieceId,
  nom,
  compact = false,
  porteur,
  onTransfert,
  onEnvoyer,
}: SecurityBadgeProps) {
  const [identite] = useState<IdentitePiece>(() =>
    idPiece(categorie, pieceId, porteur ? `${porteur}:${Date.now()}` : undefined),
  );
  const [preuve, setPreuve] = useState<Preuve | null>(null);
  const [verif, setVerif] = useState<ReturnType<typeof verifierPiece> | null>(null);
  const [destinataire, setDestinataire] = useState("");
  const [copie, setCopie] = useState(false);

  const niveau = niveauSecurite(categorie);
  const info = NIVEAUX[niveau];

  const qr = useMemo(() => {
    try {
      return QRCode.create(payloadCertificat(identite, categorie, nom), {
        errorCorrectionLevel: "M",
      });
    } catch {
      return null;
    }
  }, [identite, categorie, nom]);

  const qrSvg = useMemo(() => {
    if (!qr) return "";
    const taille = compact ? 21 : 33;
    const cell = taille;
    let path = "";
    for (let r = 0; r < qr.modules.size; r++) {
      for (let c = 0; c < qr.modules.size; c++) {
        if (qr.modules.get(r, c)) {
          path += `M${c * cell},${r * cell}h${cell}v${cell}h${-cell}z`;
        }
      }
    }
    return path;
  }, [qr, compact]);

  const copier = () => {
    navigator.clipboard?.writeText(identite.id).then(() => {
      setCopie(true);
      setTimeout(() => setCopie(false), 1600);
    });
  };

  /* ── Version compacte : sceau incrusté sur la pièce ── */
  if (compact) {
    return (
      <div
        className="absolute right-[4%] top-[6%] z-40 flex flex-col items-center select-none pointer-events-auto"
        style={{ width: u(52) }}
        title={`Certificat ${info.nom} — ${identite.id}`}
      >
        <div
          className="rounded-[3px] p-[2px]"
          style={{
            background: "rgba(255,255,255,0.92)",
            boxShadow: `0 ${u(1.5)} ${u(4)} rgba(0,0,0,0.4), inset 0 0 0 ${u(0.6)} ${info.couleur}`,
          }}
        >
          <svg viewBox={`0 0 ${qr?.modules.size ? qr.modules.size * 21 : 0} ${qr?.modules.size ? qr.modules.size * 21 : 0}`} style={{ width: u(44), height: u(44), display: "block" }}>
            {qrSvg && <path d={qrSvg} fill="#1b1b1f" />}
          </svg>
        </div>
        <span
          className="mt-[2px] rounded-full px-[3px] py-[1px] font-mono text-[6px] font-bold text-white"
          style={{ background: info.couleur }}
        >
          {identite.id.slice(-6)}
        </span>
        <span className="mt-[1px] flex items-center gap-[1px]">
          {Array.from({ length: info.puces }).map((_, i) => (
            <Hologramme key={i} niveau={niveau} />
          ))}
        </span>
      </div>
    );
  }

  /* ── Version panneau : inspection, preuve et vérification ── */
  return (
    <div className="rounded-xl border border-black/10 bg-white overflow-hidden">
      {/* En-tête certificat */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-black/10" style={{ background: `${info.couleur}14` }}>
        <span
          className="flex-none w-6 h-6 rounded-md flex items-center justify-center text-white text-[11px] font-bold"
          style={{ background: info.couleur }}
        >
          ✓
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold text-neutral-900 m-0 leading-tight">Certificat d'authenticité</p>
          <p className="text-[10px] text-neutral-500 m-0 leading-tight">
            Sécurité {info.nom} · {info.desc}
          </p>
        </div>
        <span className="flex-none flex items-center gap-1">
          {Array.from({ length: info.puces }).map((_, i) => (
            <Hologramme key={i} niveau={niveau} />
          ))}
        </span>
      </div>

      <div className="p-3 space-y-3">
        {/* QR + identité */}
        <div className="flex gap-3">
          <div
            className="flex-none rounded-lg border border-black/10 bg-white p-1.5"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.12)" }}
          >
            <svg
              viewBox={`0 0 ${qr?.modules.size ? qr.modules.size * 33 : 0} ${qr?.modules.size ? qr.modules.size * 33 : 0}`}
              style={{ width: 92, height: 92, display: "block" }}
            >
              {qrSvg && <path d={qrSvg} fill="#1b1b1f" />}
            </svg>
          </div>
          <div className="flex-1 min-w-0 space-y-2">
            <div>
              <span className="block text-[9px] font-semibold uppercase tracking-[0.08em] text-neutral-500">
                Identifiant pièce
              </span>
              <div className="flex items-center gap-1">
                <code className="font-mono text-[12px] font-bold text-neutral-900 truncate">{identite.id}</code>
                <button
                  type="button"
                  onClick={copier}
                  className="flex-none text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-600"
                >
                  {copie ? "✓" : "⧉"}
                </button>
              </div>
            </div>
            <div>
              <span className="block text-[9px] font-semibold uppercase tracking-[0.08em] text-neutral-500">
                Empreinte cryptographique
              </span>
              <code className="font-mono text-[11px] text-neutral-700">{identite.hash}</code>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <div className="rounded-lg bg-neutral-50 px-2 py-1">
                <span className="block text-[9px] text-neutral-500">Contrôle</span>
                <span className="font-mono text-[11px] font-bold text-neutral-900">{identite.controle}</span>
              </div>
              <div className="rounded-lg bg-neutral-50 px-2 py-1">
                <span className="block text-[9px] text-neutral-500">Transferts</span>
                <span className="font-mono text-[11px] font-bold text-neutral-900">{identite.transferts}</span>
              </div>
            </div>
            {porteur && (
              <p className="text-[10px] text-neutral-500 m-0">
                Porteur : <span className="font-medium text-neutral-700">{porteur}</span>
              </p>
            )}
          </div>
        </div>

        {/* Preuve d'envoi — la pièce "sert vraiment" à ce qu'elle représente */}
        <div className="rounded-lg border border-black/10 bg-neutral-50/80 p-2.5 space-y-2">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.08em] text-neutral-500">
            Preuve d'utilisation — envoi certifié
          </span>
          {preuve ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[13px] font-bold text-blue-700">{preuve.code}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold uppercase tracking-wider">
                  {preuve.statut}
                </span>
              </div>
              <ol className="m-0 p-0 list-none space-y-1">
                {preuve.journal.map((j, i) => (
                  <li key={i} className="flex gap-2 text-[10px] text-neutral-600">
                    <span className="font-mono text-neutral-400 flex-none">
                      {new Date(j.t).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <span>{j.evenement}</span>
                  </li>
                ))}
              </ol>
              <p className="text-[10px] text-neutral-500 m-0 leading-relaxed">
                Ce code fait office de preuve de dépôt. Scannez le QR de la pièce pour le vérifier à tout moment.
              </p>
            </div>
          ) : (
            <div className="flex gap-1.5">
              <input
                type="email"
                value={destinataire}
                onChange={(e) => setDestinataire(e.target.value)}
                placeholder="destinataire@email.fr"
                className="flex-1 min-w-0 rounded-lg border border-black/10 bg-white px-2 py-1.5 text-[11px] outline-none focus:border-blue-500"
              />
              <button
                type="button"
                disabled={!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(destinataire)}
                onClick={() => {
                  const p = creerPreuve({ piece: identite.hash, a: destinataire });
                  setPreuve(p);
                  onEnvoyer?.(p);
                }}
                className="flex-none px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-[11px] font-semibold"
              >
                Envoyer
              </button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => {
              const r = verifierPiece(identite, categorie);
              setVerif(r);
              onTransfert?.(identite);
            }}
            className="py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-[11px] font-semibold"
          >
            Vérifier l'authenticité
          </button>
          <button
            type="button"
            onClick={() => {
              const r = verifierPiece(identite, categorie);
              setVerif(r);
            }}
            className="py-2 rounded-lg border border-black/10 hover:bg-neutral-50 text-neutral-700 text-[11px] font-semibold"
          >
            Historique
          </button>
        </div>

        {verif && (
          <div
            className="rounded-lg border p-2.5 space-y-1.5"
            style={{
              borderColor: verif.authentique ? "#4fae6266" : "#e0525266",
              background: verif.authentique ? "#4fae6212" : "#e0525212",
            }}
          >
            <p
              className="text-[11px] font-semibold m-0"
              style={{ color: verif.authentique ? "#2f7a42" : "#a33030" }}
            >
              {verif.authentique ? "✓ Authentique" : "✕ Non certifiée"} — {verif.message}
            </p>
            <ul className="m-0 p-0 list-none grid grid-cols-2 gap-1">
              {verif.controles.map((c) => (
                <li key={c.nom} className="flex items-center gap-1 text-[10px] text-neutral-600">
                  <span style={{ color: c.ok ? "#4fae62" : "#e05252" }}>{c.ok ? "✓" : "✕"}</span>
                  {c.nom}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="font-mono text-[9px] text-neutral-400 m-0 leading-relaxed">
          Certificat généré le {new Date(identite.emis).toLocaleString("fr-FR")} · scannez le QR ou
          saisissez l'identifiant sur lemondeaime.fr/verifier
        </p>
      </div>
    </div>
  );
}
