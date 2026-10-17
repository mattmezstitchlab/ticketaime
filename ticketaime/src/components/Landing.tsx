import { LANDING_COLLAGES } from '../data/landingCollages';
import { packageFromBrief } from '../data/ticketPackages';
import { loadScenario, STORY_KEY } from '../data/storyStorage';
import StoryJourney from './landing/StoryJourney';
import type { PieceStep } from '../data/pieceRoles';
import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import IdeaPrinter, { Arrow } from "./landing/IdeaPrinter";
import VideoPostcard from "./landing/VideoPostcard";
import PiecePreview from "./landing/PiecePreview";
import { USAGE_STORIES, type CreationDraft } from "../data/landing";
import "../landing.css";

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add("is-visible");
        observer.disconnect();
      }
    }, { threshold: 0.14 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`lma-reveal ${className}`}>{children}</div>;
}

interface LandingProps {
  onCommencer: (creation?: CreationDraft) => void;
  onCatalogue?: () => void;
  printer?: ReactNode;
}

export default function Landing({ onCommencer, onCatalogue, printer }: LandingProps) {
  const [scenario, setScenario] = useState<PieceStep[]>(() => printer ? [] : loadScenario());
  const [saveError, setSaveError] = useState('');
  const saveScenario = (steps: PieceStep[]) => {
    setScenario(steps);
    try { localStorage.setItem(STORY_KEY, JSON.stringify(steps)); setSaveError(''); } catch { setSaveError('Parcours non sauvegardé : stockage local indisponible.'); }
  };
  return (
    <>
    <div className="lma-page">
      <header className="lma-nav">
        <a className="lma-wordmark" href="#accueil" aria-label="Le Monde Aime, accueil">LE MONDE AIME<span className="wordmark-period">.</span></a>
        <nav aria-label="Navigation principale" className="lma-nav-links">
          <a href={scenario.length ? "#story-title" : "#experience"}>L'expérience</a>
          <a href="#usages">Les usages</a>
        </nav>
        <button type="button" className="lma-nav-cta" onClick={() => onCatalogue ? onCatalogue() : onCommencer()}>{printer ? "Mon wallet" : "Ouvrir l’atelier"} <Arrow diagonal /></button>
      </header>

      <main>
        <section className="lma-hero" id="accueil" aria-labelledby="hero-brand">
          <div className="hero-ephemera" aria-hidden="true">
            <div className="hero-float hero-float--mail" style={{ "--tilt": "-14deg", "--delay": "-1s" } as CSSProperties}>
              <PiecePreview itemId="airmail-large" decorative />
            </div>
            <div className="hero-float hero-float--admit" style={{ "--tilt": "-9deg", "--delay": "-3s" } as CSSProperties}>
              <PiecePreview itemId="roll" decorative />
            </div>
            <div className="hero-float hero-float--photo" style={{ "--tilt": "12deg", "--delay": "-2s" } as CSSProperties}>
              <div className="hero-polaroid">
                <img src="/images/usages/wedding.webp" alt="" width="1920" height="1080" fetchPriority="high" />
                <span>les jours qu'on garde.</span>
              </div>
            </div>
            <div className="hero-float hero-float--stamp" style={{ "--tilt": "8deg", "--delay": "-4s" } as CSSProperties}>
              <PiecePreview itemId="blue-stamp" decorative />
            </div>
          </div>
          <div className="hero-center">
            <p className="lma-eyebrow hero-intro">Les petits papiers font les grandes histoires</p>
            <h1 id="hero-brand" className="sr-only">Le Monde Aime — votre parcours en pièces</h1>
            <VideoPostcard hero />
            <h2>Quel projet aimeriez-vous<br />faire vivre ?</h2>
            <p className="hero-description">Un projet, des tickets, une histoire à construire.<br className="mobile-break" /> Tout commence par quelques mots.</p>
            {printer ?? <IdeaPrinter onOpen={onCommencer} onScenario={saveScenario} />}
          </div>
          <a href="#usages" className="hero-scroll">Et dans la vraie vie ? <svg viewBox="0 0 16 22" width="12" height="18" aria-hidden="true" fill="none" stroke="currentColor"><path d="M8 1v18M2 13l6 6 6-6" /></svg></a>
        </section>

        {saveError && <p role="alert" className="lma-container">{saveError}</p>}
        {scenario.length > 0 && <StoryJourney key={scenario[0].draft.id} steps={scenario} onClear={() => saveScenario([])} onOpen={onCommencer} />}


        {scenario.length === 0 && <section id="usages" aria-labelledby="usages-title" className="lma-usages">
          <Reveal className="usage-intro lma-container">
            <div><p className="lma-eyebrow">Pensé pour vos moments</p><h2 id="usages-title">Des pièces à créer.<br /><span>Des histoires à vivre.</span></h2></div>
            <p>Du premier « oui » au dernier rappel.<br />Des petits objets qui vous accompagnent<br className="desktop-break" /> dans les grands moments.</p>
          </Reveal>
          <nav className="usage-directory" aria-label="Explorer les usages">
            {USAGE_STORIES.map((usage) => <a key={usage.id} href={`#usage-${usage.id}`}>{usage.title}</a>)}
          </nav>

          {USAGE_STORIES.map((usage, index) => (
            <section
              key={usage.id}
              id={`usage-${usage.id}`}
              className="usage-scene"
              aria-labelledby={`title-${usage.id}`}
              style={{ "--photo-position": usage.position } as CSSProperties}
            >
              <img className="usage-photo" src={usage.image} alt={usage.alt} width="1920" height="1080" loading="lazy" decoding="async" />
              <div className="usage-shade" aria-hidden="true" />
              <div className="usage-scene-inner lma-container">
                <Reveal className="usage-copy">
                  <p className="scene-category">{usage.title}</p>
                  <h3 id={`title-${usage.id}`}>{usage.headline.split("\n").map((line, i) => <span key={line}>{i > 0 && <br />}{line}</span>)}</h3>
                  <p className="scene-description">{usage.description}</p>
                  <button type="button" className="scene-cta" onClick={() => onCommencer(packageFromBrief(usage.sample, usage.id))}>{printer ? "Choisir mon ticket" : "Ouvrir ce pack dans l’atelier"} <Arrow diagonal /></button>
                </Reveal>
                <div className="usage-ticket-package" aria-label={`Pack de tickets : ${usage.title}`}>
                  {(LANDING_COLLAGES[usage.id] ?? [usage.itemId]).map((itemId, i) => <div key={itemId} className="usage-package-ticket" style={{ '--ticket-index': i } as CSSProperties} inert><PiecePreview itemId={itemId} fields={itemId === usage.itemId ? usage.fields : undefined} decorative /></div>)}
                  <span className="usage-package-label">Sélection illustrative · pack personnalisable via le bouton</span>
                </div>
                <span className="scene-index" aria-hidden="true">{String(index + 1).padStart(2, "0")} <i /> {String(USAGE_STORIES.length).padStart(2, "0")}</span>
              </div>
            </section>
          ))}
        </section>

        }
        {scenario.length === 0 && <>
        <section id="experience" className="lma-experience" aria-labelledby="experience-title">
          <Reveal className="lma-container experience-heading">
            <p className="lma-eyebrow">Simple comme une belle idée</p>
            <h2 id="experience-title">Quelques mots.<br /><span>Et votre histoire prend forme.</span></h2>
          </Reveal>
          <div className="lma-container experience-steps">
            {[
              ["01", "Racontez.", "Un moment, une personne, une occasion. Décrivez ce que vous voulez créer."],
              ["02", "Attrapez.", "Un modèle adapté sort de la fente. Cliquez sur votre pièce pour la personnaliser dans l’atelier."],
              ["03", "Faites-en la vôtre.", "Personnalisez votre ticket, gardez-le dans votre wallet et partagez son lien."],
            ].map(([number, title, text]) => <Reveal key={number} className="experience-step"><span>{number}</span><h3>{title}</h3><p>{text}</p></Reveal>)}
          </div>
        </section>

        <section className="lma-last-word" aria-labelledby="last-word-title">
          <Reveal>
            <p className="lma-eyebrow">Il ne manque que votre idée</p>
            <h2 id="last-word-title">À vous de laisser<br /><em>une belle trace.</em></h2>
            <a className="lma-dark-button" href={printer ? "#fw-query" : "#creation-brief"}>Créer ma première pièce <Arrow /></a>
          </Reveal>
        </section>
        </>}
      </main>

      <footer className="lma-footer">
        <div className="lma-container footer-top">
          <a href="#accueil" className="lma-wordmark">LE MONDE AIME.</a>
          <p>Les petits papiers. Les grandes histoires.</p>
          <button type="button" onClick={() => onCatalogue ? onCatalogue() : onCommencer()}>Entrer dans l'atelier <Arrow diagonal /></button>
        </div>
        <div className="lma-container footer-bottom">
          <span>Un atelier pour vos idées, fait avec attention.</span>
          <details><summary>À propos des aperçus</summary><p>Scènes photoréalistes générées à titre illustratif, et non témoignages de clients. Le brief est interprété localement pour choisir un modèle personnalisable. L'impression du hero est une animation ; elle ne déclenche pas votre imprimante. Les passes Apple Wallet signées et l'envoi certifié nécessitent des services de production distincts.</p></details>
        </div>
      </footer>
    </div>
    <nav className="story-dock" aria-label="Commandes du parcours">
      <a href={scenario.length ? '#usages' : (printer ? '#fw-query' : '#creation-brief')}>{scenario.length ? 'Mon parcours' : 'Créer'}</a>
      <a href="#video-postcard">Présentation</a>
      {scenario.length > 0 && <a href="#story-recap-control">Raconter</a>}
      <a href="#accueil">↑ Haut</a>
    </nav>
    </>
  );
}