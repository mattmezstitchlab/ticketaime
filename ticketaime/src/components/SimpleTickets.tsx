import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { ITEMS, CATEGORIES, type Item } from "../data/catalogue";
import PiecePreview from "./landing/PiecePreview";
import "../simple-tickets.css";

const KEY = "ticketaime-simple-creations-v1";
interface Creation {
  id: string;
  itemId: string;
  fields: Record<string, string>;
  note: string;
}
const HERO_IDS = [
  "opera",
  "airmail-large",
  "carte-mer",
  "roll",
  "kraft-pass",
  "blue-stamp",
  "photo-carte",
  "wedding",
];
function load(): Creation[] {
  try {
    const data: unknown = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(data)
      ? data.filter((c): c is Creation =>
          Boolean(
            c &&
            typeof c === "object" &&
            typeof c.id === "string" &&
            ITEMS.some((i) => i.id === c.itemId) &&
            typeof c.note === "string" &&
            c.note.length <= 2000 &&
            c.fields &&
            typeof c.fields === "object" &&
            !Array.isArray(c.fields) &&
            Object.entries(c.fields).every(
              ([k, v]) =>
                ![
                  "_href",
                  "_cible",
                  "__proto__",
                  "constructor",
                  "prototype",
                ].includes(k) &&
                typeof v === "string" &&
                v.length <= 2000,
            ),
          ),
        )
      : [];
  } catch {
    return [];
  }
}
function MovableTicket({
  item,
  index,
  onOpen,
}: {
  item: Item;
  index: number;
  onOpen: () => void;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const drag = useRef<{
    x: number;
    y: number;
    ox: number;
    oy: number;
    moved: boolean;
  } | null>(null);
  const suppress = useRef(false);
  const down = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    suppress.current = false;
    drag.current = {
      x: e.clientX,
      y: e.clientY,
      ox: position.x,
      oy: position.y,
      moved: false,
    };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x,
      dy = e.clientY - d.y;
    if (Math.hypot(dx, dy) > 6) d.moved = true;
    if (d.moved) {
      const parent = e.currentTarget.parentElement!.getBoundingClientRect();
      const width = e.currentTarget.offsetWidth,
        height = e.currentTarget.offsetHeight;
      const left = e.currentTarget.offsetLeft,
        top = e.currentTarget.offsetTop;
      setPosition({
        x: Math.max(-left, Math.min(parent.width - left - width, d.ox + dx)),
        y: Math.max(-top, Math.min(parent.height - top - height, d.oy + dy)),
      });
    }
  };
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Ouvrir ${item.name}`}
      className={`st-floating st-floating-${index}`}
      style={
        {
          transform: `translate(${position.x}px, ${position.y}px) rotate(${item.rotate * 3}deg)`,
        } as CSSProperties
      }
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={(e) => {
        suppress.current = Boolean(drag.current?.moved);
        drag.current = null;
        e.currentTarget.releasePointerCapture?.(e.pointerId);
      }}
      onPointerCancel={() => {
        suppress.current = true;
        drag.current = null;
      }}
      onClick={() => {
        if (!suppress.current) onOpen();
        suppress.current = false;
      }}
      onKeyDown={(e) => {
        if (["Enter", " "].includes(e.key)) {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      <div inert>
        <PiecePreview itemId={item.id} decorative />
      </div>
    </div>
  );
}
export default function SimpleTickets() {
  const [saved, setSaved] = useState(load);
  const [current, setCurrent] = useState<Creation | null>(null);
  const [latest, setLatest] = useState<Creation | null>(null);
  const [catalogue, setCatalogue] = useState(false);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const editor = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const focusBefore = useRef<HTMLElement | null>(null);
  const stamp = useRef<HTMLButtonElement>(null);
  const item = ITEMS.find((i) => i.id === current?.itemId);
  const open = (model: Item, creation?: Creation) => {
    focusBefore.current = document.activeElement as HTMLElement;
    setCurrent(
      creation
        ? { ...creation, fields: { ...creation.fields } }
        : {
            id: crypto.randomUUID(),
            itemId: model.id,
            fields: Object.fromEntries(
              (model.editable || []).map((f) => [f.cle, f.valeur]),
            ),
            note: "",
          },
    );
    setError("");
  };
  const close = () => {
    setCurrent(null);
    requestAnimationFrame(() => focusBefore.current?.focus());
  };
  useEffect(() => {
    if (!current) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    heading.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [current?.id]);
  const validate = () => {
    if (!current) return;
    const next = [current, ...saved.filter((c) => c.id !== current.id)];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
      setSaved(next);
      setLatest(current);
      setCurrent(null);
      setNotice(
        "Création enregistrée dans ce navigateur. Cliquez sur le timbre pour la rouvrir.",
      );
      requestAnimationFrame(() => stamp.current?.focus());
    } catch {
      setError(
        "Enregistrement impossible : stockage indisponible ou plein. Votre création reste ouverte.",
      );
    }
  };
  return (
    <div className="st-app">
      <div inert={current ? true : undefined}>
        <header className="st-top">
          <span>LES PETITS PAPIERS. LES GRANDES HISTOIRES.</span>
          <button onClick={() => setCatalogue(!catalogue)}>
            {catalogue ? "Retour aux tickets" : "Tous les tickets"}
          </button>
        </header>
        <div
          className="st-dispenser"
          aria-label="Fente des créations enregistrées"
        >
          <div className="st-slot" />
          {latest && (
            <button
              key={latest.id + JSON.stringify(latest.fields) + latest.note}
              ref={stamp}
              className="st-stamp"
              onClick={() =>
                open(
                  ITEMS.find((i) => i.id === latest.itemId)!,
                  latest,
                )
              }
              aria-label="Rouvrir la création enregistrée"
            >
              <div inert>
                <PiecePreview itemId="blue-stamp" decorative />
              </div>
              <span>Votre création ✓</span>
            </button>
          )}
        </div>
        <main>
          {!catalogue ? (
            <section
              className="st-hero"
              aria-label="Tickets à déplacer et personnaliser"
            >
              <h1>
                LE MONDE
                <br />
                AIME<span>.</span>
              </h1>
              <p>Déplacez les tickets. Cliquez sur celui qui vous plaît.</p>
              {HERO_IDS.map((id, index) => {
                const model = ITEMS.find((i) => i.id === id);
                return model ? (
                  <MovableTicket
                    key={id}
                    item={model}
                    index={index}
                    onOpen={() => open(model)}
                  />
                ) : null;
              })}
            </section>
          ) : (
            <section className="st-catalogue">
              <h1>Tous les tickets.</h1>
              <div className="st-filters">
                <label>
                  Rechercher
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Un ticket, une carte…"
                  />
                </label>
                <label>
                  Catégorie
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="all">Toutes</option>
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="st-grid">
                {ITEMS.filter(
                  (i) =>
                    (category === "all" || i.category === category) &&
                    i.name
                      .toLocaleLowerCase("fr")
                      .includes(search.toLocaleLowerCase("fr")),
                ).map((model) => (
                  <div
                    role="button"
                    tabIndex={0}
                    key={model.id}
                    className="st-model"
                    aria-label={`Ouvrir ${model.name}`}
                    onClick={() => open(model)}
                    onKeyDown={(e) => {
                      if (["Enter", " "].includes(e.key)) {
                        e.preventDefault();
                        open(model);
                      }
                    }}
                  >
                    <div className="st-model-art" inert>
                      <div
                        style={{
                          width: Math.min(280, (180 * model.w) / model.h),
                        }}
                      >
                        <PiecePreview itemId={model.id} decorative />
                      </div>
                    </div>
                    <span>{model.name}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
          {notice && (
            <p className="st-notice" role="status">
              {notice}
            </p>
          )}
          {saved.length > 0 && (
            <section className="st-saved">
              <h2>Vos créations</h2>
              <p>
                Gardées dans ce navigateur, sans envoi ni réservation confirmée.
              </p>
              <div className="st-saved-list">
                {saved.map((c) => (
                  <button
                    key={c.id}
                    onClick={() =>
                      open(
                        ITEMS.find((i) => i.id === c.itemId)!,
                        c,
                      )
                    }
                  >
                    {ITEMS.find((i) => i.id === c.itemId)!.name} ↗
                  </button>
                ))}
              </div>
            </section>
          )}
        </main>
        <footer className="st-footer">
          Choisir. Personnaliser. Garder. Tout simplement.
        </footer>
      </div>
      {current && item && (
        <div
          className="st-editor"
          role="dialog"
          aria-modal="true"
          aria-labelledby="st-editor-title"
          ref={editor}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.preventDefault();
              close();
            }
            if (e.key === "Tab") {
              const controls = [
                ...editor.current!.querySelectorAll<HTMLElement>(
                  'button,input,textarea,select,[tabindex="0"]',
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
            <button className="st-validate" onClick={validate}>
              Valider ✓
            </button>
          </header>
          <div className="st-editor-body">
            <section className="st-preview" aria-label="Votre ticket en grand">
              <div inert>
                <PiecePreview
                  itemId={item.id}
                  fields={current.fields}
                  decorative
                />
              </div>
              {current.note && <p className="st-handwritten">{current.note}</p>}
            </section>
            <section className="st-fields">
              <h2 id="st-editor-title" tabIndex={-1} ref={heading}>
                {item.name}
              </h2>
              <p>
                Faites-en le vôtre. Valider enregistre ici, sans rien envoyer.
              </p>
              {item.editable?.map((f) => (
                <label key={f.cle}>
                  {f.label}
                  <input
                    maxLength={2000}
                    value={current.fields[f.cle] ?? ""}
                    onChange={(e) =>
                      setCurrent({
                        ...current,
                        fields: { ...current.fields, [f.cle]: e.target.value },
                      })
                    }
                  />
                </label>
              ))}
              <label>
                Votre mot
                <textarea
                  rows={5}
                  maxLength={2000}
                  value={current.note}
                  onChange={(e) =>
                    setCurrent({ ...current, note: e.target.value })
                  }
                />
              </label>
              {!item.editable?.length && (
                <p className="st-hint">
                  Ce modèle conserve son dessin d’origine. Ajoutez votre mot
                  pour le personnaliser.
                </p>
              )}
              {error && <p role="alert">{error}</p>}
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
