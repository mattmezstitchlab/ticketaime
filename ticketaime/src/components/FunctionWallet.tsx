import { useEffect, useRef, useState, type FormEvent } from "react";
import { CATEGORIES, ITEMS } from "../data/catalogue";
import {
  TOOLS,
  STORAGE_KEY,
  createTicket,
  loadWallet,
  shareLink,
  suggestTool,
  templatesFor,
  ticketFromLink,
  type WalletTicket,
} from "../data/functionWallet";
import Landing from "./Landing";
import { Arrow } from "./landing/IdeaPrinter";
import PiecePreview from "./landing/PiecePreview";
import "../function-wallet.css";

type View = "home" | "wallet" | "editor";
const DETAIL_FIELDS: Record<string, [string, string, string?][]> = {
  reservation: [
    ["title", "Événement ou prestation"],
    ["date", "Date souhaitée", "date"],
    ["place", "Lieu"],
    ["name", "Votre nom"],
    ["message", "Votre demande"],
  ],
  postcard: [
    ["destinataire", "Pour qui ?"],
    ["message", "Votre mot"],
    ["name", "Votre signature"],
  ],
  invitation: [
    ["title", "Événement"],
    ["date", "Date", "date"],
    ["place", "Lieu"],
    ["message", "Informations et réponse souhaitée"],
  ],
  quote: [
    ["title", "Prestation"],
    ["name", "Émetteur"],
    ["client", "Client"],
    ["reference", "Référence"],
    ["amount", "Montant et devise"],
    ["message", "Détail, TVA et conditions à compléter"],
  ],
  invoice: [
    ["title", "Objet de la facture"],
    ["name", "Émetteur et adresse"],
    ["client", "Client et adresse"],
    ["reference", "Numéro à vérifier en comptabilité"],
    ["date", "Date", "date"],
    ["amount", "Montant et devise"],
    ["message", "Détail, TVA, échéance et mentions à compléter"],
  ],
  journey: [
    ["title", "Votre trajet"],
    ["date", "Date", "date"],
    ["place", "Départ et destination"],
    ["message", "Étapes et horaires"],
  ],
  gift: [
    ["title", "Votre attention"],
    ["client", "Pour qui ?"],
    ["message", "Ce que vous offrez et ses conditions"],
  ],
  contact: [
    ["title", "Activité"],
    ["name", "Nom"],
    ["message", "Présentation et coordonnées publiques"],
  ],
  memory: [
    ["title", "Titre du souvenir"],
    ["date", "Date", "date"],
    ["message", "Votre histoire"],
  ],
  collection: [
    ["title", "Nom de la pièce"],
    ["message", "Note de collection — création décorative"],
  ],
};
function TicketFace({
  ticket,
  small = false,
}: {
  ticket: WalletTicket;
  small?: boolean;
}) {
  const tool = TOOLS.find((t) => t.id === ticket.toolId)!;
  const business = ["reservation", "quote", "invoice"].includes(tool.id);
  return (
    <div className={`fw-ticket ${small ? "fw-ticket-small" : ""}`}>
      <div className="fw-ticket-head">
        <span>LE MONDE AIME</span>
        <span>{tool.name}</span>
      </div>
      {small && tool.id === "postcard" ? (
        <div className="fw-hero-stamp">
          ✦<strong>UN TIMBRE POUR UN MOT</strong>
          <span>Choisir une carte, écrire et partager →</span>
        </div>
      ) : business ? (
        <div className="fw-business">
          <span>
            {tool.id === "reservation"
              ? "DEMANDE · NON CONFIRMÉE"
              : "BROUILLON · À VÉRIFIER"}
          </span>
          <h2>{ticket.details.title || tool.verb}</h2>
        </div>
      ) : (
        <div className="fw-art" inert>
          <PiecePreview
            itemId={ticket.itemId}
            fields={{ ...ticket.fields, ...ticket.details }}
            decorative
          />
        </div>
      )}
      {!small && (
        <dl>
          {(DETAIL_FIELDS[tool.id] ?? []).map(([key, label]) =>
            ticket.details[key] ? (
              <div key={key}>
                <dt>{label}</dt>
                <dd>{ticket.details[key]}</dd>
              </div>
            ) : null,
          )}
        </dl>
      )}
      {tool.id === "postcard" && (
        <div className={`fw-stamp ${ticket.stamped ? "is-stamped" : ""}`}>
          {ticket.stamped ? (
            <>
              {ticket.details.stampModel && (
                <div inert>
                  <PiecePreview itemId={ticket.details.stampModel} decorative />
                </div>
              )}
              ✦ LMA · TIMBRE COLLÉ
            </>
          ) : (
            "Emplacement du timbre"
          )}
        </div>
      )}
      <span className="fw-ticket-code">
        {ticket.code} ·{" "}
        {tool.id === "postcard"
          ? "Timbre décoratif, sans affranchissement"
          : "Création personnelle"}
      </span>
    </div>
  );
}
export default function FunctionWallet() {
  const [wallet, setWallet] = useState(loadWallet);
  const [ticket, setTicket] = useState<WalletTicket | null>(() =>
    ticketFromLink(window.location.href),
  );
  const [view, setView] = useState<View>(() =>
    ticketFromLink(window.location.href) ? "editor" : "home",
  );
  const [received, setReceived] = useState(() =>
    Boolean(ticketFromLink(window.location.href)),
  );
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"idea" | "code">("idea");
  const [printed, setPrinted] = useState<WalletTicket | null>(null);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"tools" | "saved">("tools");
  const [status, setStatus] = useState("");
  const [consent, setConsent] = useState(false);
  const [link, setLink] = useState("");
  const [email, setEmail] = useState("");
  const title = useRef<HTMLHeadingElement>(null);
  const printedButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    title.current?.focus();
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [view]);
  useEffect(() => {
    if (printed) printedButton.current?.focus({ preventScroll: true });
  }, [printed]);
  const go = (next: View) => {
    if (next !== "editor" && window.location.hash)
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    setView(next);
    setStatus("");
    setLink("");
    setConsent(false);
  };
  const open = (next: WalletTicket, isReceived = false) => {
    setTicket(next);
    setReceived(isReceived);
    go("editor");
  };
  const update = (next: WalletTicket) => {
    setTicket(next);
    setLink("");
    setStatus("");
    setConsent(false);
  };
  const tool = TOOLS.find((t) => t.id === ticket?.toolId);
  const item = ITEMS.find((i) => i.id === ticket?.itemId);
  const save = () => {
    if (!ticket) return;
    const next = [ticket, ...wallet.filter((t) => t.id !== ticket.id)];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setWallet(next);
      setStatus(
        "Ticket gardé dans ce navigateur. Pensez à conserver aussi son lien.",
      );
    } catch {
      setStatus(
        "Stockage indisponible ou plein. Le ticket n’a pas été enregistré ; vous pouvez copier un lien.",
      );
    }
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setStatus("");
    if (mode === "code") {
      const found =
        wallet.find((t) => t.code === query.trim().toUpperCase()) ??
        ticketFromLink(query.trim());
      if (!found) {
        setPrinted(null);
        setStatus(
          "Code introuvable ici. Un code court retrouve seulement un ticket enregistré dans ce navigateur. Depuis un autre appareil, collez le lien complet reçu.",
        );
        return;
      }
      setPrinted(found);
      return;
    }
    const id = suggestTool(query);
    if (!id) {
      setPrinted(null);
      setStatus(
        "Je n’ai pas reconnu un usage. Essayez « réserver pour un mariage » ou choisissez un outil dans le wallet.",
      );
      return;
    }
    const next = createTicket(TOOLS.find((t) => t.id === id)!);
    next.details.title = query.trim().slice(0, 360);
    setPrinted(next);
  };
  const printedItem = ITEMS.find(
    (i) =>
      i.id ===
      (printed?.toolId === "postcard"
        ? printed.details.stampModel || "blue-stamp"
        : printed?.itemId),
  );
  const shownTools = TOOLS.filter(
    (t) =>
      (category === "all" ||
        t.categories.includes(category as (typeof t.categories)[number])) &&
      `${t.name} ${t.description}`
        .toLocaleLowerCase("fr")
        .includes(search.toLocaleLowerCase("fr")),
  );
  return (
    <div className={view === "home" ? "lma-page" : "fw-app lma-page"}>
      {view !== "home" && (
        <header className="lma-nav">
          <button className="lma-wordmark fw-brand" onClick={() => go("home")}>
            LE MONDE AIME<span className="wordmark-period">.</span>
          </button>
          <nav className="lma-nav-links">
            <button onClick={() => go("home")}>L’expérience</button>
          </nav>
          <button className="lma-nav-cta" onClick={() => go("wallet")}>
            Mon wallet <span>{wallet.length}</span>
            <Arrow diagonal />
          </button>
        </header>
      )}
      {view === "home" && (
        <Landing
          onCatalogue={() => go("wallet")}
          onCommencer={(draft) => {
            if (!draft) {
              go("wallet");
              return;
            }
            const usageTools: Record<string, string> = {
              mariage: "reservation",
              postale: "postcard",
              voyage: "journey",
              spectacle: "invitation",
              cinema: "invitation",
              administratif: "invoice",
              bar: "gift",
              loisirs: "invitation",
            };
            const id =
              usageTools[draft.usageId] ??
              suggestTool(draft.brief) ??
              "invitation";
            const next = createTicket(TOOLS.find((t) => t.id === id)!);
            next.details.title = draft.brief.slice(0, 360);
            if (
              templatesFor(TOOLS.find((t) => t.id === id)!).some(
                (i) => i.id === draft.itemId,
              ) &&
              !["reservation", "invoice", "quote"].includes(id)
            ) {
              next.itemId = draft.itemId;
              next.fields = draft.fields;
            }
            open(next);
          }}
          printer={
            <div className="idea-printer idea-printer--ready">
              <div className="fw-mode" aria-label="Mode de saisie">
                <button
                  aria-pressed={mode === "idea"}
                  onClick={() => {
                    setMode("idea");
                    setQuery("");
                    setStatus("");
                    setPrinted(null);
                  }}
                >
                  Une envie ou une question
                </button>
                <button
                  aria-pressed={mode === "code"}
                  onClick={() => {
                    setMode("code");
                    setQuery("");
                    setStatus("");
                    setPrinted(null);
                  }}
                >
                  J’ai reçu un code / lien
                </button>
              </div>
              <form className="idea-form" onSubmit={submit}>
                <label className="sr-only" htmlFor="fw-query">
                  {mode === "idea"
                    ? "Votre envie ou votre question"
                    : "Code local ou lien reçu"}
                </label>
                <input
                  id="fw-query"
                  required
                  maxLength={40000}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={
                    mode === "idea"
                      ? "Je voudrais réserver pour un mariage…"
                      : "LMA-… ou collez le lien complet reçu"
                  }
                />
                <button className="idea-submit" type="submit">
                  Sortir mon ticket <Arrow />
                </button>
              </form>
              <p className="fw-note">
                {mode === "idea"
                  ? "Suggestions par mots-clés, pas une conversation IA. Vous pouvez aussi choisir directement un outil."
                  : "Code court : sur ce navigateur seulement. Lien complet : ouvre aussi le ticket sur un autre appareil."}
              </p>
              <div className="printer">
                <div className="printer-case" aria-hidden="true">
                  <span className="printer-brand">
                    LMA <span>ATELIER INSTANTANÉ</span>
                  </span>
                  <span className="printer-led" />
                </div>
                <div className="printer-slot" />
                <div className="printer-window">
                  {printed ? (
                    <button
                      ref={printedButton}
                      key={printed.id}
                      className="fw-printed printed-piece"
                      style={
                        printedItem
                          ? {
                              width: Math.min(
                                340,
                                (158 * printedItem.w) / printedItem.h,
                              ),
                              maxWidth: "100%",
                              marginInline: "auto",
                            }
                          : undefined
                      }
                      onClick={() => open(printed, mode === "code")}
                      aria-label="Ouvrir ce ticket dans l’atelier"
                    >
                      {printed.toolId === "postcard" ? (
                        <PiecePreview
                          itemId={printed.details.stampModel || "blue-stamp"}
                          decorative
                        />
                      ) : (
                        <PiecePreview
                          itemId={printed.itemId}
                          fields={printed.fields}
                          decorative
                        />
                      )}
                      <span>Ouvrir mon ticket →</span>
                    </button>
                  ) : (
                    <div className="printer-idle-paper" aria-hidden="true">
                      <span>LES BELLES IDÉES COMMENCENT ICI.</span>
                      <i />
                      <i />
                    </div>
                  )}
                </div>
              </div>
              {status && (
                <p role="status" className="fw-status">
                  {status}
                </p>
              )}
              <button className="fw-primary" onClick={() => go("wallet")}>
                Explorer tous les outils du wallet →
              </button>
            </div>
          }
        />
      )}
      {view === "wallet" && (
        <main className="fw-wallet">
          <p className="fw-eyebrow">LE WALLET TICKETAIME</p>
          <h1 ref={title} tabIndex={-1}>
            Tous vos petits outils.
          </h1>
          <p>
            Explorez les fonctions et leurs modèles. Vos créations restent dans
            ce navigateur, sans compte ni synchronisation.
          </p>
          <div className="fw-mode">
            <button
              aria-pressed={tab === "tools"}
              onClick={() => setTab("tools")}
            >
              Les outils
            </button>
            <button
              aria-pressed={tab === "saved"}
              onClick={() => setTab("saved")}
            >
              Mes tickets gardés ({wallet.length})
            </button>
          </div>
          {tab === "tools" ? (
            <>
              <div className="fw-filters">
                <label>
                  Rechercher un usage
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Écrire, réserver, souvenir…"
                  />
                </label>
                <label>
                  Catégorie
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="all">Toutes les catégories</option>
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="fw-tool-grid">
                {shownTools.map((t) => (
                  <button
                    key={t.id}
                    className="fw-tool"
                    onClick={() => open(createTicket(t))}
                  >
                    <span>{t.name} ↗</span>
                    <p>{t.description}</p>
                    <small>
                      {["reservation", "quote", "invoice"].includes(t.id)
                        ? "Fiche dédiée"
                        : `${templatesFor(t).length} modèles`}{" "}
                      · {t.verb}
                    </small>
                  </button>
                ))}
              </div>
              {category !== "all" && (
                <section className="fw-models">
                  <h2>Les tickets de cette catégorie</h2>
                  <p>
                    Choisissez une pièce pour découvrir son usage et la
                    personnaliser.
                  </p>
                  <div className="fw-tool-grid">
                    {ITEMS.filter(
                      (model) =>
                        model.category === category &&
                        model.name
                          .toLocaleLowerCase("fr")
                          .includes(search.toLocaleLowerCase("fr")),
                    ).map((model) => {
                      const modelTool = TOOLS.find(
                        (t) =>
                          t.categories.includes(model.category) &&
                          !["quote", "invoice"].includes(t.id),
                      )!;
                      return (
                        <button
                          className="fw-model"
                          key={model.id}
                          onClick={() => {
                            const next = createTicket(modelTool);
                            if (model.category === "timbre")
                              next.details.stampModel = model.id;
                            else {
                              next.itemId = model.id;
                              next.fields = Object.fromEntries(
                                (model.editable ?? []).map((f) => [
                                  f.cle,
                                  f.valeur,
                                ]),
                              );
                            }
                            open(next);
                          }}
                        >
                          <div className="fw-model-art" inert>
                            <PiecePreview itemId={model.id} decorative />
                          </div>
                          <strong>{model.name}</strong>
                          <span>{modelTool.verb} →</span>
                        </button>
                      );
                    })}
                  </div>
                </section>
              )}
              {!shownTools.length && (
                <p>
                  Aucun outil pour cette recherche. Changez de catégorie ou de
                  mot.
                </p>
              )}
            </>
          ) : (
            <div className="fw-tool-grid">
              {wallet.length ? (
                wallet.map((t) => (
                  <button
                    key={t.id}
                    className="fw-saved"
                    onClick={() => open(t)}
                  >
                    <TicketFace ticket={t} small />
                    <span>
                      {t.details.title ||
                        TOOLS.find((tool) => tool.id === t.toolId)?.name}{" "}
                      →
                    </span>
                  </button>
                ))
              ) : (
                <p>
                  Votre wallet est vide. Choisissez un outil, personnalisez
                  votre ticket et gardez-le ici.
                </p>
              )}
            </div>
          )}
        </main>
      )}
      {view === "editor" && ticket && tool && item && (
        <main className="fw-editor">
          <div className="fw-editor-heading">
            <button onClick={() => go("wallet")}>← Le wallet</button>
            <p className="fw-eyebrow">UN TICKET · UNE ACTION</p>
            <h1 ref={title} tabIndex={-1}>
              {received ? "Un ticket pour vous." : tool.verb}
            </h1>
            <p>{tool.description}</p>
          </div>
          <div className="fw-editor-grid">
            <section className="fw-stage" aria-label="Votre ticket en grand">
              <TicketFace ticket={ticket} />
              {tool.id === "postcard" && !received && (
                <button
                  className="fw-stamp-action"
                  draggable={!ticket.stamped}
                  onDragStart={(e) =>
                    e.dataTransfer.setData("text/plain", "lma-stamp")
                  }
                  onClick={() =>
                    update({ ...ticket, stamped: !ticket.stamped })
                  }
                >
                  {ticket.stamped
                    ? "Décoller le timbre"
                    : "✦ Prendre le timbre et le coller"}
                </button>
              )}
              {tool.id === "postcard" && !received && !ticket.stamped && (
                <button
                  className="fw-stamp-target"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.getData("text/plain") === "lma-stamp")
                      update({ ...ticket, stamped: true });
                  }}
                  onClick={() => update({ ...ticket, stamped: true })}
                >
                  Déposer ici ou cliquer pour coller le timbre
                </button>
              )}
            </section>
            <section
              className="fw-controls"
              aria-label="Personnalisation et actions"
            >
              {received ? (
                <>
                  <h2>Lire, garder ou réutiliser</h2>
                  <p>
                    Ce lien contient une copie du ticket, sans preuve
                    d’identité, confidentialité ni mise à jour automatique.
                  </p>
                  <button
                    onClick={() => {
                      const copy = createTicket(tool);
                      update({ ...ticket, id: copy.id, code: copy.code });
                      setReceived(false);
                    }}
                  >
                    Personnaliser une copie
                  </button>
                </>
              ) : (
                <>
                  {!["reservation", "quote", "invoice"].includes(tool.id) && (
                    <label>
                      Choisir{" "}
                      {tool.id === "postcard"
                        ? "une carte postale"
                        : "un modèle"}
                      <select
                        value={ticket.itemId}
                        onChange={(e) => {
                          const next = ITEMS.find(
                            (i) => i.id === e.target.value,
                          )!;
                          update({
                            ...ticket,
                            itemId: next.id,
                            fields: Object.fromEntries(
                              (next.editable ?? []).map((f) => [
                                f.cle,
                                f.valeur,
                              ]),
                            ),
                          });
                        }}
                      >
                        {templatesFor(tool)
                          .filter(
                            (i) =>
                              tool.id !== "postcard" || i.category !== "timbre",
                          )
                          .map((i) => (
                            <option key={i.id} value={i.id}>
                              {i.name}
                            </option>
                          ))}
                      </select>
                    </label>
                  )}
                  {(DETAIL_FIELDS[tool.id] ?? []).map(([key, label, type]) => (
                    <label key={key}>
                      {label}
                      {key === "message" ? (
                        <textarea
                          rows={4}
                          maxLength={2000}
                          value={ticket.details[key] ?? ""}
                          onChange={(e) =>
                            update({
                              ...ticket,
                              details: {
                                ...ticket.details,
                                [key]: e.target.value,
                              },
                            })
                          }
                        />
                      ) : (
                        <input
                          type={type ?? "text"}
                          maxLength={360}
                          value={ticket.details[key] ?? ""}
                          onChange={(e) =>
                            update({
                              ...ticket,
                              details: {
                                ...ticket.details,
                                [key]: e.target.value,
                              },
                            })
                          }
                        />
                      )}
                    </label>
                  ))}
                  {!["reservation", "quote", "invoice"].includes(tool.id) &&
                    Boolean(item.editable?.length) && (
                      <details>
                        <summary>Personnaliser le graphisme</summary>
                        {item.editable
                          ?.filter(
                            (f) =>
                              !(DETAIL_FIELDS[tool.id] ?? []).some(
                                ([key]) => key === f.cle,
                              ),
                          )
                          .map((f) => (
                            <label key={f.cle}>
                              {f.label}
                              <input
                                maxLength={360}
                                value={ticket.fields[f.cle] ?? f.valeur}
                                onChange={(e) =>
                                  update({
                                    ...ticket,
                                    fields: {
                                      ...ticket.fields,
                                      [f.cle]: e.target.value,
                                    },
                                  })
                                }
                              />
                            </label>
                          ))}
                      </details>
                    )}
                </>
              )}
              <div className="fw-actions">
                <button className="fw-primary" onClick={save}>
                  Garder dans mon wallet
                </button>
                <p className="fw-note">
                  Code : {ticket.code} · local à ce navigateur. Pas Apple Wallet
                  / Google Wallet.
                </p>
                <label className="fw-check">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      setLink("");
                    }}
                  />
                  Je comprends que toute personne ayant le lien peut lire les
                  informations du ticket. Je n’y mets pas de données sensibles.
                </label>
                <button
                  disabled={!consent}
                  onClick={() => {
                    setLink(shareLink(ticket, window.location.href));
                    setStatus(
                      "Lien préparé, rien n’a été envoyé. C’est une copie figée, non révocable : partagez-la seulement avec les personnes souhaitées.",
                    );
                  }}
                >
                  Préparer le lien à partager
                </button>
                {link && (
                  <>
                    <label>
                      Lien du ticket (copiez-le pour le transmettre)
                      <textarea
                        readOnly
                        rows={3}
                        value={link}
                        onFocus={(e) => e.target.select()}
                      />
                    </label>
                    <button
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(link);
                          setStatus(
                            "Lien copié. Vous pouvez maintenant le transmettre.",
                          );
                        } catch {
                          setStatus(
                            "Copie automatique indisponible : sélectionnez et copiez le lien ci-dessus.",
                          );
                        }
                      }}
                    >
                      Copier le lien
                    </button>
                    <label>
                      Email du destinataire (facultatif)
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </label>
                    <button
                      disabled={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
                      onClick={() => {
                        window.location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(tool.name)}&body=${encodeURIComponent(`Voici mon ticket : ${link}`)}`;
                        setStatus(
                          "Messagerie demandée. Vérifiez puis envoyez le message dans votre application email ; aucun envoi automatique.",
                        );
                      }}
                    >
                      Ouvrir ma messagerie
                    </button>
                  </>
                )}
                {status && (
                  <p className="fw-status" role="status">
                    {status}
                  </p>
                )}
              </div>
            </section>
          </div>
        </main>
      )}
      {view !== "home" && (
        <footer className="fw-footer">
          Le Monde Aime · Wallet d’outils et créations personnelles.
          <br />
          Pas de réservation confirmée, paiement, envoi postal, signature ou
          contrôle d’accès automatique.
        </footer>
      )}
    </div>
  );
}
