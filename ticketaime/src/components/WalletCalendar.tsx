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
  return <div className="calendar-nav-day" data-calendar-date={date} aria-label={label}>
    <span className="calendar-nav-number">{Number(date.slice(-2))}</span>
    {pieces.map(piece => <a key={piece.id} href={`#event-section-${piece.id}`} aria-label={`${piece.title}, ${label}, rejoindre la section`}>{piece.title}</a>)}
  </div>;
}
