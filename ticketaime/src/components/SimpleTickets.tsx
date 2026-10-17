import { useEffect, useRef, useState } from "react";
import "../simple-tickets.css";
const KEY = "ticketaime-signature-stamps-v1";
interface Creation {
  id: string;
  recipient: string;
  message: string;
  sender: string;
}
function load(): Creation[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(value)
      ? value.filter((c): c is Creation =>
          Boolean(
            c &&
            typeof c === "object" &&
            typeof c.id === "string" &&
            c.id.length <= 80 &&
            ["recipient", "message", "sender"].every(
              (k) => typeof c[k] === "string" && c[k].length <= 2000,
            ),
          ),
        )
      : [];
  } catch {
    return [];
  }
}
export function SignatureStamp({ creation }: { creation?: Creation }) {
  return (
    <div className="signature-stamp">
      <div className="signature-stamp-border">
        <span className="signature-edition">
          CORRESPONDANCE · ÉDITION UNIQUE
        </span>
        <strong>
          LE MONDE
          <br />
          AIME<span>.</span>
        </strong>
        <span className="signature-symbol" aria-hidden="true">
          ✳
        </span>
        <p>
          {creation?.message || "Les petits papiers.\nLes grandes histoires."}
        </p>
        <div className="signature-address">
          <span>
            {creation?.recipient
              ? `Pour ${creation.recipient}`
              : "UNE ATTENTION À GARDER"}
          </span>
          <span>
            {creation?.sender ? `De ${creation.sender}` : "FAIT AVEC LE CŒUR"}
          </span>
        </div>
        <span className="signature-foot">
          LE MONDE AIME · TIMBRE DE CRÉATION
        </span>
      </div>
    </div>
  );
}
export default function SimpleTickets() {
  const [saved, setSaved] = useState(load);
  const [current, setCurrent] = useState<Creation | null>(null);
  const [latest, setLatest] = useState<Creation | undefined>();
  const [edition, setEdition] = useState(0);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const dialog = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const stamp = useRef<HTMLButtonElement>(null);
  const open = (creation?: Creation) => {
    trigger.current = document.activeElement as HTMLElement;
    setCurrent(
      creation
        ? { ...creation }
        : { id: crypto.randomUUID(), recipient: "", message: "", sender: "" },
    );
    setError("");
  };
  const close = () => {
    setCurrent(null);
    requestAnimationFrame(() => trigger.current?.focus());
  };
  useEffect(() => {
    if (!current) return;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    heading.current?.focus();
    return () => {
      document.body.style.overflow = before;
    };
  }, [current?.id]);
  useEffect(() => {
    if (edition) stamp.current?.focus();
  }, [edition]);
  const validate = () => {
    if (!current) return;
    const next = [current, ...saved.filter((c) => c.id !== current.id)];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
      setSaved(next);
      setLatest(current);
      setEdition((n) => n + 1);
      setCurrent(null);
      setNotice(
        "Votre timbre est enregistré dans ce navigateur. Cliquez dessus pour le rouvrir.",
      );
    } catch {
      setError(
        "Enregistrement impossible : stockage indisponible ou plein. Votre timbre reste ouvert.",
      );
    }
  };
  return (
    <div className="signature-app">
      <div inert={current ? true : undefined}>
        <main>
          <section
            className="signature-hero"
            aria-label="Le timbre Le Monde Aime"
          >
            <p className="signature-intro">UN TIMBRE. UNE ATTENTION.</p>
            <h1>
              LE MONDE
              <br />
              AIME<span>.</span>
            </h1>
            <div className="signature-dispenser">
              <div className="signature-slot" aria-label="Fente des timbres" />
              <div className="signature-output">
                <button
                  key={edition}
                  ref={stamp}
                  className={`signature-trigger ${edition ? "is-issued" : ""}`}
                  onClick={() => open(latest)}
                  aria-label={
                    latest ? "Rouvrir mon timbre" : "Créer mon timbre"
                  }
                >
                  <SignatureStamp creation={latest} />
                </button>
              </div>
            </div>
            <p className="signature-instruction">
              {latest
                ? "Votre attention est prête. Cliquez pour la retrouver."
                : "Cliquez sur le timbre. Écrivez un mot. Faites plaisir."}
            </p>
            {latest && (
              <button className="signature-new" onClick={() => open()}>
                Créer une autre attention ↗
              </button>
            )}
          </section>
          {notice && (
            <p className="signature-notice" role="status">
              {notice}
            </p>
          )}
          {saved.length > 0 && (
            <section className="signature-saved">
              <h2>Les attentions qu’on garde.</h2>
              <p>Enregistrées sur ce navigateur uniquement.</p>
              <div className="signature-collection">
                {saved.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => open(c)}
                    aria-label={`Ouvrir le timbre ${c.recipient || "sans destinataire"}`}
                  >
                    <SignatureStamp creation={c} />
                  </button>
                ))}
              </div>
            </section>
          )}
        </main>
        <footer>
          Un timbre de création, pas un affranchissement postal.
          <br />
          Valider enregistre ici, sans envoi automatique.
        </footer>
      </div>
      {current && (
        <div
          className="signature-editor"
          role="dialog"
          aria-modal="true"
          aria-labelledby="signature-title"
          ref={dialog}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.preventDefault();
              close();
            }
            if (e.key === "Tab") {
              const controls = [
                ...dialog.current!.querySelectorAll<HTMLElement>(
                  "button,input,textarea",
                ),
              ];
              const first = controls[0],
                last = controls[controls.length - 1];
              if (
                e.shiftKey &&
                (document.activeElement === first ||
                  document.activeElement === heading.current)
              ) {
                e.preventDefault();
                last.focus();
              } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
              }
            }
          }}
        >
          <header>
            <button onClick={close}>← Fermer sans enregistrer</button>
            <button className="signature-validate" onClick={validate}>
              Valider ✓
            </button>
          </header>
          <div className="signature-editor-body">
            <div className="signature-preview">
              <SignatureStamp creation={current} />
            </div>
            <section className="signature-fields">
              <h2 id="signature-title" tabIndex={-1} ref={heading}>
                Votre timbre.
                <br />
                Votre attention.
              </h2>
              <p>Un seul dessin. Les mots sont les vôtres.</p>
              <label>
                Pour qui ?
                <input
                  maxLength={120}
                  value={current.recipient}
                  onChange={(e) =>
                    setCurrent({ ...current, recipient: e.target.value })
                  }
                />
              </label>
              <label>
                Votre mot
                <textarea
                  maxLength={2000}
                  rows={6}
                  value={current.message}
                  onChange={(e) =>
                    setCurrent({ ...current, message: e.target.value })
                  }
                />
              </label>
              <label>
                Votre signature
                <input
                  maxLength={120}
                  value={current.sender}
                  onChange={(e) =>
                    setCurrent({ ...current, sender: e.target.value })
                  }
                />
              </label>
              <p>
                Valider garde votre timbre dans ce navigateur et le fait sortir
                de la fente. Rien n’est envoyé.
              </p>
              {error && <p role="alert">{error}</p>}
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
