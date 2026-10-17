import { useRef, useState } from 'react';
import PiecePreview from './landing/PiecePreview';
import '../wallet-calendar.css';
export interface CalendarPiece {
  id: string; model: string; title: string; date: string; deadline: string; state: string; description: string;
}
export default function WalletCalendar({ month, year, pieces }: { month: number; year: number; pieces: CalendarPiece[] }) {
  const days = new Date(year, month, 0).getDate();
  const offset = (new Date(year, month - 1, 1).getDay() + 6) % 7;
  const monthName = new Date(year, month - 1, 1).toLocaleDateString('fr-FR', { month: 'long' });
  return <div className="wallet-calendar-scroll" tabIndex={0} role="region" aria-label={`Calendrier ${monthName} ${year}. Sur petit écran, faites défiler horizontalement.`}>
    <div className="wallet-calendar-grid">
      {['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'].map(day => <span key={day} className="wallet-calendar-weekday">{day}</span>)}
      {Array.from({length: offset}, (_, index) => <div key={`empty-${index}`} className="wallet-calendar-empty" aria-hidden="true" />)}
      {Array.from({length: days}, (_, index) => {
        const date = `${year}-${String(month).padStart(2,'0')}-${String(index + 1).padStart(2,'0')}`;
        return <WalletDay key={date} date={date} label={`${index + 1} ${monthName} ${year}`} pieces={pieces.filter(piece => piece.date === date)} />;
      })}
    </div>
  </div>;
}
export function WalletDay({ date, label, pieces }: { date: string; label: string; pieces: CalendarPiece[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const front = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const startX = useRef<number | null>(null);
  const piece = pieces[index];
  const move = (delta: number) => setIndex(current => (current + delta + pieces.length) % pieces.length);
  const returnToDate = () => { setOpen(false); requestAnimationFrame(() => front.current?.focus()); };
  return <div className={`wallet-day ${open ? 'wallet-day--open' : ''}`} data-calendar-date={date}>
    <div className="wallet-day-inner" onKeyDown={event => {
      if (!open) return;
      if (event.key === 'Escape') { event.preventDefault(); returnToDate(); }
      if (pieces.length > 1 && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); }
    }}>
      <div className="wallet-day-front" inert={open || undefined} aria-hidden={open || undefined}>
        <button ref={front} type="button" className="wallet-date-button" aria-label={`${label}, ${pieces.length} pièce(s), ouvrir`} aria-expanded={open} onClick={() => { setOpen(true); requestAnimationFrame(() => close.current?.focus()); }}>
          <span className="wallet-date-number">{Number(date.slice(-2))}</span>
          {pieces.length > 0 && <span className="wallet-date-art" inert aria-hidden="true"><PiecePreview itemId={pieces[0].model} decorative /></span>}
          <span className="wallet-date-count">{pieces.length ? `${pieces.length} pièce${pieces.length > 1 ? 's' : ''}` : 'Aucune pièce'}</span>
        </button>
      </div>
      <div className="wallet-day-back" inert={!open || undefined} aria-hidden={!open || undefined} onTouchStart={event => { startX.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={event => {
        if (startX.current !== null && pieces.length > 1) { const delta = (event.changedTouches[0]?.clientX ?? startX.current) - startX.current; if (Math.abs(delta) > 45) move(delta < 0 ? 1 : -1); }
        startX.current = null;
      }}>
        <div className="wallet-card-brand"><span>LE MONDE AIME.</span><button ref={close} type="button" aria-label={`Retour à la date ${label}`} onClick={returnToDate}>↶</button></div>
        {piece ? <>
          <div className="wallet-card-body" key={piece.id}><span className="wallet-card-label">SPÉCIMEN · {Number(date.slice(-2))}/{date.slice(5,7)}</span><h3>{piece.title}</h3><p>{piece.state}</p><div className="wallet-card-art" inert aria-hidden="true"><PiecePreview itemId={piece.model} decorative /></div>{piece.deadline && <p className="wallet-card-deadline">Réponse avant le {piece.deadline.split('-').reverse().join('/')}</p>}<a href={`/?module=${encodeURIComponent(piece.model)}`} target="_blank" rel="noreferrer">Voir le modèle ↗</a></div>
          <div className="wallet-card-controls" aria-label="Pièces de cette journée"><button type="button" disabled={pieces.length < 2} aria-label={`Pièce précédente du ${label}`} onClick={() => move(-1)}>←</button><span role="status" aria-live={open ? 'polite' : 'off'}>{index + 1} / {pieces.length}</span><button type="button" disabled={pieces.length < 2} aria-label={`Pièce suivante du ${label}`} onClick={() => move(1)}>→</button></div>
        </> : <p className="wallet-card-empty">Aucune pièce pour le {label} dans cette démonstration.</p>}
      </div>
    </div>
  </div>;
}
