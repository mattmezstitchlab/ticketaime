import { useState } from 'react';
import PiecePreview from './landing/PiecePreview';
import { ITEMS } from '../data/catalogue';
import '../piece-object.css';
export interface PieceObjectProps {
  model: string;
  title: string;
  state: string;
  description: string;
  recipient?: string;
  deadline?: string;
  /** Optional authored render; it changes presentation, never permissions. */
  artworkUrl?: string;
}
export default function PieceObject({ model, title, state, description, recipient, deadline, artworkUrl }: PieceObjectProps) {
  const [failedArtwork, setFailedArtwork] = useState<string | null>(null);
  const item = ITEMS.find((entry) => entry.id === model);
  return <article className="piece-object" data-piece-model={model}>
    <div className="piece-object-meta"><span>SPÉCIMEN · DÉMONSTRATION</span><span>{state}</span></div>
    <div className="piece-object-surface">
      <span className="piece-pocket-opening" aria-hidden="true" />
      <div className="piece-object-art" inert>{artworkUrl && failedArtwork !== artworkUrl ? <img src={artworkUrl} alt="" loading="lazy" onError={() => setFailedArtwork(artworkUrl)} /> : <PiecePreview itemId={model} decorative />}</div>
    </div>
    <div className="piece-object-caption"><h3>{title}</h3>{deadline && <p>Réponse avant le {deadline.split('-').reverse().join('/')}</p>}<p>{recipient ? `Pour : ${recipient}` : item?.name}</p></div>
    <div className="piece-object-actions"><a href={`/?module=${encodeURIComponent(model)}`} target="_blank" rel="noreferrer">Ouvrir le modèle ↗</a></div>
    <details className="piece-object-details"><summary>Utilité et précautions</summary><p>{description}</p><p>Exemple fictif : aucun envoi ni droit réel. Ce visuel ne prouve pas une réservation, une identité ou un paiement.</p><a href={`/?page=guide#piece-${encodeURIComponent(model)}`}>Lire la fiche du guide</a></details>
  </article>;
}
