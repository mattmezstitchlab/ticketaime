import { useEffect, useRef, useState } from "react";
import "../simple-tickets.css";
import "../meetings.css";

type Intent = "friendship" | "romance";
type Stage = "discover" | "profile" | "compose" | "pending" | "chat";
const INTENTS: Record<Intent, string> = {
  friendship: "Amicale",
  romance: "Amoureuse",
};
export const DEMO_PROFILES: {
  id: string;
  name: string;
  age: number;
  area: string;
  initials: string;
  text: string;
  question: string;
  intents: Intent[];
}[] = [
  {
    id: "camille",
    name: "Camille",
    age: 29,
    area: "Métropole lilloise",
    initials: "C",
    text: "Des balades sans itinéraire, des expos et des cafés qui durent. Toujours partante pour découvrir une nouvelle adresse.",
    question: "Quel petit endroit aimeriez-vous me faire découvrir ?",
    intents: ["friendship", "romance"],
  },
  {
    id: "alex",
    name: "Alex",
    age: 32,
    area: "Métropole lilloise",
    initials: "A",
    text: "Les marchés du dimanche, la cuisine à plusieurs et les concerts intimistes. Envie de nouvelles complicités, sans pression.",
    question: "Le morceau qui vous met toujours de bonne humeur ?",
    intents: ["friendship", "romance"],
  },
  {
    id: "lou",
    name: "Lou",
    age: 27,
    area: "Métropole lilloise",
    initials: "L",
    text: "Croquis en terrasse, randonnées tranquilles et jeux de société. Ici pour élargir mon cercle d’amis.",
    question: "Une activité à essayer ensemble pour la première fois ?",
    intents: ["friendship"],
  },
];
export default function Meetings() {
  const [adult, setAdult] = useState(false);
  const [intents, setIntents] = useState<Intent[]>(["friendship", "romance"]);
  const [active, setActive] = useState<Intent>("friendship");
  const [index, setIndex] = useState(0);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [hidden, setHidden] = useState<string[]>([]);
  const [stage, setStage] = useState<Stage>("discover");
  const [message, setMessage] = useState("");
  const [invitation, setInvitation] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [chatDraft, setChatDraft] = useState("");
  const [notice, setNotice] = useState("");
  const [report, setReport] = useState(false);
  const [reason, setReason] = useState("");
  const dialog = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const button = useRef<HTMLButtonElement>(null);
  const profile = DEMO_PROFILES.find((p) => p.id === profileId);
  const available = DEMO_PROFILES.filter(
    (p) => !hidden.includes(p.id) && p.intents.some((i) => intents.includes(i)),
  );
  const resetConversation = () => {
    setMessage("");
    setInvitation("");
    setMessages([]);
    setChatDraft("");
    setReport(false);
    setReason("");
  };
  const discover = () => {
    if (!adult || !intents.length || !available.length) return;
    const next = available[index % available.length];
    setProfileId(next.id);
    setIndex((n) => n + 1);
    setStage("discover");
    resetConversation();
    setNotice(
      "Profil fictif proposé pour tester le parcours. Aucun rapprochement réel ni géolocalisation.",
    );
  };
  const open = () => {
    trigger.current = document.activeElement as HTMLElement;
    setStage("profile");
    setNotice("");
  };
  const close = () => {
    setStage("discover");
    setReport(false);
    requestAnimationFrame(() => trigger.current?.focus());
  };
  const block = () => {
    if (!profile) return;
    setHidden((v) => [...v, profile.id]);
    setProfileId(null);
    setStage("discover");
    resetConversation();
    setNotice(
      "Profil masqué pour cette session de démonstration. Aucun blocage serveur n’a été effectué.",
    );
    requestAnimationFrame(() => button.current?.focus());
  };
  const reset = () => {
    setAdult(false);
    setIntents(["friendship", "romance"]);
    setProfileId(null);
    setHidden([]);
    setIndex(0);
    setStage("discover");
    resetConversation();
    setNotice("Démo réinitialisée. Aucun compte ni donnée conservée.");
  };
  useEffect(() => {
    if (stage === "discover") return;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    title.current?.focus();
    return () => {
      document.body.style.overflow = before;
    };
  }, [stage, report]);
  const toggle = (intent: Intent) => {
    setIntents((v) =>
      v.includes(intent) ? v.filter((i) => i !== intent) : [...v, intent],
    );
    setProfileId(null);
    setNotice("");
  };
  return (
    <div className="signature-app meeting-app">
      <div inert={stage !== "discover" ? true : undefined}>
        <header className="meeting-banner">
          <strong>MAQUETTE INTERACTIVE · 18+</strong>
          <span>
            Personnages inventés. Aucun compte, aucune rencontre réelle, aucun
            message envoyé.
          </span>
        </header>
        <main>
          <section className="meeting-hero">
            <p className="meeting-eyebrow">UNE ATTENTION PLUTÔT QU’UN SWIPE.</p>
            <h1>
              LE MONDE
              <br />
              AIME<span>.</span>
            </h1>
            <p className="meeting-tagline">
              Une amitié. Une étincelle.
              <br />
              D’abord, un petit mot.
            </p>
            <fieldset className="meeting-intents">
              <legend>J’aimerais une rencontre…</legend>
              {(["friendship", "romance"] as Intent[]).map((i) => (
                <label key={i}>
                  <input
                    type="checkbox"
                    checked={intents.includes(i)}
                    onChange={() => toggle(i)}
                  />
                  {INTENTS[i]}
                </label>
              ))}
            </fieldset>
            <label className="meeting-adult">
              <input
                type="checkbox"
                checked={adult}
                onChange={(e) => {
                  setAdult(e.target.checked);
                  if (!e.target.checked) setProfileId(null);
                }}
              />
              J’ai 18 ans ou plus. Je teste une démonstration.
            </label>
            <div className="meeting-dispenser">
              <div
                className="signature-slot"
                aria-label="Fente des rencontres"
              />
              <div className="meeting-output">
                {profile && (
                  <button
                    key={profile.id}
                    className="meeting-profile-stamp"
                    onClick={open}
                    aria-label={`Découvrir ${profile.name}, profil fictif`}
                  >
                    <div className="signature-stamp">
                      <div className="signature-stamp-border">
                        <span className="signature-edition">
                          LE MONDE AIME · PROFIL FICTIF
                        </span>
                        <span className="meeting-avatar" aria-hidden="true">
                          {profile.initials}
                        </span>
                        <strong>
                          {profile.name}
                          <span> {profile.age}</span>
                        </strong>
                        <p>{profile.area} · zone illustrative</p>
                        <span className="meeting-profile-intents">
                          {profile.intents
                            .filter((i) => intents.includes(i))
                            .map((i) => INTENTS[i])
                            .join(" · ")}
                        </span>
                        <span className="signature-foot">
                          CLIQUER POUR FAIRE CONNAISSANCE
                        </span>
                      </div>
                    </div>
                  </button>
                )}
              </div>
            </div>
            <button
              ref={button}
              className="meeting-primary"
              disabled={!adult || !intents.length || !available.length}
              onClick={discover}
            >
              {profile
                ? "Découvrir un autre profil fictif"
                : "Faire une rencontre"}
            </button>
            {!intents.length && (
              <p className="meeting-help">Choisissez au moins une intention.</p>
            )}
            {!available.length && (
              <p className="meeting-help">
                Tous les profils compatibles ont été masqués. Réinitialisez la
                démo pour recommencer.
              </p>
            )}
            <p className="meeting-help">
              Découverte locale de profils inventés, pas un algorithme de
              compatibilité.
            </p>
            {notice && (
              <p role="status" className="meeting-notice">
                {notice}
              </p>
            )}
          </section>
          <section className="meeting-principles">
            <h2>Faire connaissance, à son rythme.</h2>
            <div>
              <p>
                <strong>Une intention claire.</strong>Amicale ou amoureuse :
                chaque invitation précise ce que vous cherchez.
              </p>
              <p>
                <strong>Un accord mutuel.</strong>La conversation s’ouvre après
                acceptation. Ici, vous simulez cette réponse.
              </p>
              <p>
                <strong>Du respect, toujours.</strong>Masquer et signaler sont
                des interactions de démonstration, pas un service de modération
                actif.
              </p>
            </div>
          </section>
        </main>
        <footer>
          Cette maquette ne collecte ni position, ni coordonnées, ni données de
          profil.
          <br />
          Ne saisissez pas d’informations personnelles. Tout disparaît au
          rechargement.
          <br />
          <button onClick={reset}>Réinitialiser la démo</button>
        </footer>
      </div>
      {stage !== "discover" && profile && (
        <div
          ref={dialog}
          className="signature-editor meeting-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="meeting-title"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.preventDefault();
              close();
            }
            if (e.key === "Tab") {
              const controls = [
                ...dialog.current!.querySelectorAll<HTMLElement>(
                  "button:not(:disabled),input,textarea,select",
                ),
              ];
              const first = controls[0],
                last = controls[controls.length - 1];
              if (
                e.shiftKey &&
                (document.activeElement === first ||
                  document.activeElement === title.current)
              ) {
                e.preventDefault();
                last?.focus();
              } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first?.focus();
              }
            }
          }}
        >
          <header>
            <button onClick={close}>← Retour</button>
            <span>PROFIL FICTIF · SIMULATION</span>
            <button onClick={block}>Masquer ce profil</button>
          </header>
          <div className="meeting-dialog-body">
            <aside>
              <span className="meeting-avatar" aria-hidden="true">
                {profile.initials}
              </span>
              <p>
                {profile.name}, {profile.age} ans
              </p>
              <small>
                {profile.area} · lieu fictif, aucune distance calculée
              </small>
              <p>{profile.text}</p>
              <p>
                Intentions :{" "}
                {profile.intents.map((i) => INTENTS[i]).join(" · ")}
              </p>
              <button
                onClick={() => {
                  setReport(true);
                  setReason("");
                }}
              >
                Simuler un signalement
              </button>
            </aside>
            <section>
              <h2 ref={title} tabIndex={-1} id="meeting-title">
                {report
                  ? "Signaler, sans ambiguïté."
                  : stage === "profile"
                    ? `Et si vous écriviez à ${profile.name} ?`
                    : stage === "compose"
                      ? "Une première attention."
                      : stage === "pending"
                        ? "À l’autre de choisir."
                        : "La conversation peut commencer."}
              </h2>
              {report ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setNotice(
                      "Signalement simulé : rien n’a été transmis. Aucun service de modération n’est connecté.",
                    );
                    setReport(false);
                  }}
                >
                  <label>
                    Motif
                    <select
                      required
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    >
                      <option value="">Choisir un motif</option>
                      <option>Comportement irrespectueux</option>
                      <option>Profil suspect</option>
                      <option>Contenu inapproprié</option>
                      <option>Autre</option>
                    </select>
                  </label>
                  <p>
                    Exercice uniquement. En cas de danger réel, utilisez un
                    service d’aide adapté ; cette maquette ne traite aucune
                    alerte.
                  </p>
                  <button className="meeting-primary" disabled={!reason}>
                    Simuler le signalement
                  </button>
                  <button type="button" onClick={() => setReport(false)}>
                    Annuler
                  </button>
                </form>
              ) : (
                <>
                  {stage === "profile" && (
                    <>
                      <p>{profile.question}</p>
                      <p>
                        Pas de swipe ni de coordonnées à demander. Juste une
                        invitation à échanger, que l’autre peut accepter ou
                        refuser.
                      </p>
                      <button
                        className="meeting-primary"
                        onClick={() => {
                          setActive(
                            profile.intents.find((i) => intents.includes(i))!,
                          );
                          setStage("compose");
                        }}
                      >
                        Écrire une attention
                      </button>
                    </>
                  )}
                  {stage === "compose" && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!message.trim()) return;
                        setInvitation(message.trim());
                        setStage("pending");
                      }}
                    >
                      <fieldset>
                        <legend>Mon intention pour cette invitation</legend>
                        {profile.intents
                          .filter((i) => intents.includes(i))
                          .map((i) => (
                            <label className="meeting-radio" key={i}>
                              <input
                                type="radio"
                                name="intent"
                                value={i}
                                checked={active === i}
                                onChange={() => setActive(i)}
                              />
                              {INTENTS[i]}
                            </label>
                          ))}
                      </fieldset>
                      <label>
                        Votre première attention
                        <textarea
                          required
                          maxLength={1000}
                          rows={5}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Un petit mot en réponse à sa question…"
                        />
                      </label>
                      <p>
                        Ne mettez pas de coordonnées ni d’informations
                        sensibles. Cette attention reste dans la maquette.
                      </p>
                      <button
                        className="meeting-primary"
                        disabled={!message.trim()}
                      >
                        Simuler l’invitation
                      </button>
                    </form>
                  )}
                  {stage === "pending" && (
                    <>
                      <p className="meeting-intent-label">
                        Invitation {INTENTS[active].toLowerCase()} · non envoyée
                      </p>
                      <blockquote>{invitation}</blockquote>
                      <p>
                        Aucune réponse réelle : choisissez une issue pour tester
                        le consentement mutuel.
                      </p>
                      <button
                        className="meeting-primary"
                        onClick={() => {
                          setStage("chat");
                          setNotice(
                            "Acceptation simulée. Aucun destinataire réel.",
                          );
                        }}
                      >
                        Simuler son acceptation
                      </button>
                      <button
                        onClick={() => {
                          close();
                          setProfileId(null);
                          resetConversation();
                          setNotice(
                            "Refus simulé. La conversation n’a pas été ouverte.",
                          );
                        }}
                      >
                        Simuler son refus
                      </button>
                    </>
                  )}
                  {stage === "chat" && (
                    <>
                      <p className="meeting-intent-label">
                        Accord mutuel simulé · rencontre{" "}
                        {INTENTS[active].toLowerCase()}
                      </p>
                      <div
                        className="meeting-chat"
                        role="log"
                        aria-label="Conversation de démonstration"
                        aria-live="polite"
                      >
                        <p>
                          <strong>Votre invitation</strong>
                          {invitation}
                        </p>
                        <p className="meeting-system">
                          Acceptation simulée par vous. Aucun message de{" "}
                          {profile.name} n’a été reçu.
                        </p>
                        {messages.map((m, i) => (
                          <p key={i}>
                            <strong>Vous · non envoyé</strong>
                            {m}
                          </p>
                        ))}
                      </div>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!chatDraft.trim()) return;
                          setMessages((v) => [...v, chatDraft.trim()]);
                          setChatDraft("");
                        }}
                      >
                        <label>
                          Message de démonstration
                          <textarea
                            maxLength={1000}
                            rows={3}
                            value={chatDraft}
                            onChange={(e) => setChatDraft(e.target.value)}
                          />
                        </label>
                        <button
                          className="meeting-primary"
                          disabled={!chatDraft.trim()}
                        >
                          Ajouter à la simulation
                        </button>
                      </form>
                    </>
                  )}
                </>
              )}
              {notice && (
                <p className="meeting-notice" role="status">
                  {notice}
                </p>
              )}
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
