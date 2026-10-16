import { ROLES, recommendPieces, type PieceRole, type PieceStep } from '../../data/pieceRoles';
import { useEffect, useRef, useState, type FormEvent } from "react";
import { USAGE_STORIES, type CreationDraft } from "../../data/landing";
import PiecePreview from "./PiecePreview";
import { ITEMS } from "../../data/catalogue";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} /></svg>;
}

interface IdeaPrinterProps {
  onOpen: (draft: CreationDraft) => void;
}

export default function IdeaPrinter({ onOpen }: IdeaPrinterProps) {
  const [role, setRole] = useState<PieceRole>('organizer');
  const [steps, setSteps] = useState<PieceStep[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [brief, setBrief] = useState("");
  const [draft, setDraft] = useState<CreationDraft | null>(null);
  const [phase, setPhase] = useState<"idle" | "printing" | "ready">("idle");
  const [error, setError] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const result = useRef<HTMLButtonElement>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const print = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (phase === "printing") return;
    if (brief.trim().length < 5) {
      setError("Racontez votre idée en quelques mots pour commencer.");
      input.current?.focus();
      return;
    }
    setError("");
    const next = recommendPieces(brief, role);
    setSteps(next); setStepIndex(0); setDraft(next[0].draft);
    setPhase("printing");
    if (timer.current) clearTimeout(timer.current);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timer.current = setTimeout(() => {
      setPhase("ready");
      requestAnimationFrame(() => result.current?.focus({ preventScroll: true }));
    }, reduced ? 100 : 2100);
  };

  const usage = USAGE_STORIES.find((u) => u.id === draft?.usageId);
  const printedItem = ITEMS.find((item) => item.id === draft?.itemId);

  return (
    <div className={`idea-printer idea-printer--${phase}`}>
      <label className="role-picker">Je prépare en tant que <select value={role} disabled={phase === 'printing'} onChange={(e) => { setRole(e.target.value as PieceRole); setDraft(null); setSteps([]); setPhase('idle'); }}>{Object.entries(ROLES).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      <p className="role-notice">Rôle déclaré : recommandations de brouillons, pas autorisation vérifiée. Ne saisissez aucune donnée d’invité ni information de santé dans ce champ.</p>
      <form className="idea-form" onSubmit={print} noValidate>
        <label htmlFor="creation-brief" className="sr-only">Décrivez la pièce que vous souhaitez créer</label>
        <input
          ref={input}
          id="creation-brief"
          name="idee"
          autoComplete="off"
          type="text"
          maxLength={360}
          value={brief}
          onChange={(e) => { setBrief(e.target.value); if (error) setError(""); }}
          placeholder="Un mariage, une soirée, un mot doux…"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "brief-error" : "brief-help"}
        />
        <button className="idea-submit" type="submit" disabled={phase === "printing"}>
          <span>{phase === "printing" ? "Impression…" : "Créer ma pièce"}</span>
          {phase === "printing" ? <span className="print-spinner" aria-hidden="true" /> : <Arrow />}
        </button>
      </form>
      <div className="idea-helper">
        {error ? <p id="brief-error" role="alert" className="brief-error">{error}</p> : <p id="brief-help">Décrivez votre idée. Une première pièce, à personnaliser, en sortira.</p>}
      </div>

      <div className="printer" aria-busy={phase === "printing"}>
        <div className="printer-case" aria-hidden="true">
          <span className="printer-brand">LMA <span>ATELIER INSTANTANÉ</span></span>
          <span className="printer-led" />
        </div>
        <div className="printer-slot" aria-hidden="true" />
        <div className="printer-window">
          {draft ? (
            <button
              ref={result}
              type="button"
              key={draft.id}
              className="printed-piece"
              disabled={phase !== "ready"}
              onClick={() => onOpen(draft)}
              aria-label={`Ouvrir ma pièce ${usage?.title ?? "personnalisée"} dans le canevas`}
              data-printed-module={draft.itemId}
              style={printedItem ? { width: Math.min(340, 158 * printedItem.w / printedItem.h), maxWidth: "100%", marginInline: "auto" } : undefined}
            >
              <PiecePreview itemId={draft.itemId} fields={draft.fields} decorative />
            </button>
          ) : (
            <div className="printer-idle-paper" aria-hidden="true">
              <span>LES BELLES IDÉES COMMENCENT ICI.</span>
              <i /><i />
            </div>
          )}
        </div>
        <div className="printer-status" role="status" aria-live="polite" aria-atomic="true">
          {phase === "idle" && <span>Une idée suffit.</span>}
          {phase === "printing" && <span>Un peu d'encre. Beaucoup de possibilités.</span>}
          {phase === "ready" && <>
            <strong>Votre pièce est prête.</strong>
            <button type="button" onClick={() => draft && onOpen(draft)} className="printer-open">Cliquez pour ouvrir le canevas <Arrow /></button>
          </>}
        </div>
      </div>
      {phase === 'ready' && steps[stepIndex] && <section className="piece-next" aria-label="Parcours de pièces complémentaires">
        <p>Pièce {stepIndex + 1} / {steps.length} · {steps[stepIndex].title}</p>
        <p><strong>Pour :</strong> {steps[stepIndex].recipient}</p><p><strong>Pourquoi :</strong> {steps[stepIndex].reason}</p><p>{steps[stepIndex].privacy}</p>
        <p>Aucun envoi, collecte RSVP, paiement ou accès réel. Personnalisez le brouillon dans le canevas ; le partage sécurisé reste à connecter.</p>
        {stepIndex + 1 < steps.length && <button type="button" className="printer-open" onClick={() => {
          const next = stepIndex + 1; setStepIndex(next); setDraft(steps[next].draft); setPhase('printing');
          const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          timer.current = setTimeout(() => { setPhase('ready'); requestAnimationFrame(() => result.current?.focus({ preventScroll: true })); }, reduced ? 100 : 2100);
        }}>Imprimer le brouillon suivant : {steps[stepIndex + 1].title} <Arrow /></button>}
        {stepIndex > 0 && <button type="button" className="printer-open" onClick={() => { setStepIndex(stepIndex - 1); setDraft(steps[stepIndex - 1].draft); }}>Revoir la pièce précédente</button>}
      </section>}
    </div>
  );
}