import WalletCalendar from './WalletCalendar';
import { useState } from 'react';
import '../professional.css';
import '../editorial.css';
const pieces = [
  { id: 'invitation', model: 'opera', title: 'Invitation', date: '2027-06-12', deadline: '2027-05-12', state: 'À préparer', description: 'Présenter le grand jour et les séquences auxquelles la personne est invitée.' },
  { id: 'reply', model: 'carte-mer', title: 'Réponse RSVP', date: '2027-05-12', deadline: '', state: 'À répondre', description: 'Échéance distincte du mariage. Aucune réponse personnelle n’est collectée dans ce prototype.' },
  { id: 'transport', model: 'kraft-pass', title: 'Navette', date: '2027-06-12', deadline: '', state: 'À confirmer', description: 'Retrouver son trajet. Réservation, horaires et droits à confirmer par l’organisateur.' },
  { id: 'memory', model: 'photo-carte', title: 'Souvenir', date: '2027-06-13', deadline: '', state: 'À conserver', description: 'Garder une carte du lendemain ; vérifier les droits sur les images avant partage.' },
];
export default function ProfessionalJourney() {
  const [month, setMonth] = useState(6);
  const [view, setView] = useState<'calendar' | 'undated' | 'permanent'>('calendar');
  return <div className="pro-page"><header><a href="/">LE MONDE AIME.</a><a href="/?page=guide">Les 168 pièces</a></header><main>
    <p className="pro-kicker">Ticketaime · aperçu du concept professionnel</p><h1>Un événement.<br />Des pièces qui vous guident.</h1>
    <p>De l’invitation au souvenir, composez un parcours à votre image. Le portefeuille rassemble les prochaines actions et les moments à conserver.</p>
    <aside><strong>Prototype de démonstration.</strong> Les pièces, dates et états ci-dessous sont fictifs. Aucun compte, droit d’accès, envoi, paiement ou abonnement n’est activé. Le wallet actuel reste local ; ce calendrier n’est pas synchronisé.</aside>
    <section><h2>Pour les prestataires : un fil conducteur, pas des échanges dispersés.</h2><div className="pro-columns"><article><h3>1. Préparer</h3><p>Choisir les pièces et personnaliser les textes dans le canevas.</p><a href="/">Essayer l’atelier</a></article><article><h3>2. Coordonner</h3><p>Proposer invitations, réponses et trajets selon les rôles. Les envois privés et rappels restent à connecter.</p></article><article><h3>3. Retrouver</h3><p>Organiser les pièces par événement, date et prochaine action. Le calendrier ci-dessous illustre cette organisation.</p></article></div></section>
    <section aria-labelledby="wallet-title"><h2 id="wallet-title">Le wallet devient un calendrier</h2><p>Exemple : mariage le 12 juin 2027. La réponse est attendue le 12 mai ; les souvenirs viennent ensuite. Une date d’événement n’est pas une expiration.</p>
      <div className="pro-tabs" role="group" aria-label="Compartiments du portefeuille">{([['calendar','Calendrier'],['undated','À classer'],['permanent','Cartes permanentes']] as const).map(([id,label])=><button type="button" key={id} aria-pressed={view===id} onClick={()=>setView(id)}>{label}</button>)}</div>
      {view==='calendar' ? <><div className="pro-tabs" role="group" aria-label="Mois de démonstration">{[5,6].map((m)=><button type="button" key={m} aria-pressed={month===m} onClick={()=>{setMonth(m);}}>{m===5?'Mai':'Juin'} 2027</button>)}</div>
      <p>Ouvrez une case pour découvrir ses cartes Wallet. Flèches ou balayage pour les faire défiler ; ↶ ou Échap pour revenir à la date. Sur mobile, le calendrier se parcourt horizontalement pour conserver des cases lisibles.</p>
      <WalletCalendar key={month} month={month} year={2027} pieces={pieces} /></> : <div className="pro-selection"><h3>{view==='undated'?'À classer':'Cartes permanentes'}</h3><p>{view==='undated'?'Les pièces sans date iraient ici, avant d’être rattachées à un événement.':'Les cartes d’adhésion et autres pièces durables auraient leur compartiment, avec leur propre validité.'} Aucun exemplaire enregistré dans cette démonstration.</p></div>}
    </section>
    <section><h2>Des offres simples à tester, pas encore commercialisées</h2><div className="pro-columns"><article><h3>Découverte</h3><p>Explorer les modèles et préparer ses brouillons. Atelier actuel accessible sans paiement.</p></article><article><h3>Par événement · envisagé</h3><p>Pour un besoin ponctuel. Périmètre, limites et tarif à définir après les premiers essais.</p></article><article><h3>Professionnel · envisagé</h3><p>Plusieurs événements, identité de marque, collaboration et automatisations. Aucun abonnement disponible aujourd’hui.</p></article></div><p>Les futurs frais de messages, stockage et paiement devront être annoncés clairement. Un abonnement commercial n’est pas un don fiscal ; tout reversement solidaire devra être défini et justifié séparément.</p></section>
    <section><h2>La confiance fait partie du parcours</h2><p>Chaque utilisateur devrait voir uniquement ses pièces autorisées. Identité, invitations liées à un événement, permissions serveur et collecte privée restent nécessaires avant une mise en service réelle. Les allergies et données de santé ne doivent pas être saisies dans les brouillons ou QR publics.</p><a href="/?page=guide">Consulter les usages et limites des pièces →</a></section>
  </main></div>;
}
