import { useEffect, useRef, useState } from 'react';
import type { PieceStep } from '../../data/pieceRoles';
import type { CreationDraft } from '../../data/landing';
import { USAGE_STORIES } from '../../data/landing';
import PiecePreview from './PiecePreview';
import '../../story-journey.css';
export default function StoryJourney({ steps, onOpen }: { steps: PieceStep[]; onOpen: (draft: CreationDraft) => void }) {
  return <section id="usages" className="story-journey" aria-labelledby="story-title">
    <div className="lma-container story-heading"><p className="lma-eyebrow">Votre fil d’histoire · brouillon local</p><h2 id="story-title">Un moment après l’autre.<br /><em>Votre parcours prend forme.</em></h2><p>Les scènes illustrent une intention, pas vos participants réels. Personnalisez chaque section, puis sa pièce dans le canevas. Aucun site public ni droit partagé n’est créé.</p><p role="note">Ne saisissez pas de données d’invités, de devis confidentiels ou d’allergies ici. Modifications et médias temporaires : ils ne sont pas conservés après rechargement. Ouvrir le canevas quitte cette page et réinitialise ce parcours.</p><nav aria-label="Étapes du scénario">{steps.map((step, index) => <a key={step.id} href={`#story-${step.id}`}>{String(index+1).padStart(2,'0')} · {step.title}</a>)}</nav></div>
    {steps.map((step, index) => <StorySection key={step.draft.id} step={step} index={index} onOpen={onOpen} />)}
  </section>;
}
function StorySection({ step, index, onOpen }: { step: PieceStep; index: number; onOpen: (draft: CreationDraft) => void }) {
  const [title, setTitle] = useState(step.title);
  const [text, setText] = useState(step.reason);
  const [background, setBackground] = useState('#f5f3ee');
  const [media, setMedia] = useState<{url: string; type: 'image' | 'video'} | null>(null);
  const [error, setError] = useState('');
  const objectUrl = useRef<string | null>(null);
  useEffect(() => () => { if (objectUrl.current) URL.revokeObjectURL(objectUrl.current); }, []);
  const resetMedia = () => { if (objectUrl.current) URL.revokeObjectURL(objectUrl.current); objectUrl.current = null; setMedia(null); setError(''); };
  const source = USAGE_STORIES.find(story => story.id === step.draft.usageId) ?? USAGE_STORIES[0];
  return <section id={`story-${step.id}`} className="story-section" style={{ backgroundColor: background }} aria-labelledby={`story-title-${step.id}`}>
    <div className="story-scene">
      {media?.type === 'video' ? <video src={media.url} controls playsInline preload="metadata" aria-label={`Scène illustrative : ${title}`} onError={() => setError('Cette vidéo ne peut pas être lue. Essayez un autre MP4/WebM ou revenez au visuel initial.')} /> : <img src={media?.url ?? source.image} alt={media ? `Visuel personnalisé pour ${title}` : source.alt} loading="lazy" onError={() => setError('Image illisible : choisissez un autre fichier ou revenez au visuel initial.')} />}
      <span className="story-scene-label">{media ? 'VOTRE MÉDIA · LOCAL' : 'SCÈNE ILLUSTRATIVE'} · {String(index+1).padStart(2,'0')}</span>
    </div>
    <div className="lma-container story-content"><div className="story-copy"><p className="lma-eyebrow">{step.recipient}</p><h2 id={`story-title-${step.id}`}>{title}</h2><p>{text}</p><p className="story-privacy">{step.privacy}</p><p className="story-state">Brouillon · réponses et actions serveur non connectées</p><button type="button" className="lma-nav-cta" onClick={() => onOpen({ ...step.draft, brief: `${step.draft.brief}\nSection personnalisée : ${title}\n${text}` })}>Personnaliser la pièce dans le canevas ↗</button><details><summary>Prochaines actions envisagées</summary><p>Une fois les services sécurisés connectés : partager au bon destinataire, recevoir sa réponse, proposer une relance et confirmer les validations. Aucune de ces actions n’est exécutée ici.</p></details></div>
    <div className="story-piece" inert aria-hidden="true"><PiecePreview itemId={step.draft.itemId} fields={step.draft.fields} decorative /></div></div>
    <details className="lma-container story-editor"><summary>Personnaliser cette section</summary><div className="story-editor-fields"><label>Titre<input value={title} maxLength={120} onChange={event => setTitle(event.target.value)} /></label><label>Texte de la section<textarea value={text} maxLength={1500} onChange={event => setText(event.target.value)} /></label><label>Fond de la section<input type="color" value={background} onChange={event => setBackground(event.target.value)} /></label><label>Image ou vidéo locale (30 Mo maximum)<input type="file" accept="image/jpeg,image/png,image/webp,video/mp4,video/webm" onChange={event => {
      const file = event.target.files?.[0]; event.target.value = ''; if (!file) return;
      if (!['image/jpeg','image/png','image/webp','video/mp4','video/webm'].includes(file.type) || file.size > 30*1024*1024) { setError('Choisissez un JPG, PNG, WebP, MP4 ou WebM de 30 Mo maximum.'); return; }
      if (objectUrl.current) URL.revokeObjectURL(objectUrl.current); const url = URL.createObjectURL(file); objectUrl.current = url; setMedia({url, type:file.type.startsWith('video/')?'video':'image'}); setError('');
    }} /></label><p>Utilisez des médias dont vous possédez les droits et l’accord des personnes représentées. Aucun fichier n’est envoyé à un serveur. Ajoutez dans le texte les informations nécessaires pour comprendre une vidéo sans le son.</p><button type="button" onClick={resetMedia}>Revenir au visuel initial</button></div></details>
    {error && <p className="lma-container story-error" role="alert">{error}</p>}
  </section>;
}
