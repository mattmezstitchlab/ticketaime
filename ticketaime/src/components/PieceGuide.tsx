import { useState } from 'react';
import { CATEGORIES, ITEMS } from '../data/catalogue';
import { FISCAL_NOTICE, PIECE_USES } from '../data/pieceUses';
import { actionsPourPiece } from '../lib/moduleActions';
import PiecePreview from './landing/PiecePreview';
import '../piece-guide.css';
export default function PieceGuide() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const shown = ITEMS.filter((item) => (!category || item.category === category) && normalize(`${item.name} ${CATEGORIES.find((c) => c.id === item.category)?.name} ${PIECE_USES[item.category].usage}`).includes(normalize(search)));
  return <div className="piece-guide">
    <header><a href="/">← Le Monde Aime</a><a href="/?page=guide">Guide des pièces</a><button type="button" onClick={() => window.print()}>Imprimer / enregistrer en PDF</button></header>
    <main>
      <p className="guide-eyebrow">Inventaire d’usages · documentation, pas certification</p>
      <h1>{ITEMS.length} pièces.<br />Des usages à construire, des règles à respecter.</h1>
      <p>Chaque pièce peut devenir un souvenir, une porte d’entrée ou le support d’un droit. Ce guide décrit les usages envisageables : il ne prouve pas que les services nécessaires sont déjà connectés.</p>
      <aside aria-label="Limites de sécurité et de fiscalité"><h2>Un ticket ne garantit ni sécurité ni avantage fiscal</h2><p>Réduire les formulaires visibles peut simplifier un parcours ; les données saisies, liens, paiements et droits nécessitent toujours des contrôles. Les QR, NFC et portefeuilles du prototype ne constituent pas une garantie d’authenticité.</p><p>{FISCAL_NOTICE}</p><p>En cas de contrôle, cette page aide à expliquer le système mais ne remplace ni comptabilité, ni conventions, ni preuves de versement, ni justificatifs réglementaires. Les exemples ci-dessous ne sont pas des reçus fiscaux.</p></aside>
      <section className="guide-rules"><h2>Don, achat, solidarité : trois parcours distincts</h2><ul><li><strong>Don direct :</strong> confirmation du versement ; reçu fiscal seulement si organisme et versement éligibles, après validation compétente.</li><li><strong>Achat avec reversement :</strong> justificatif d’achat et preuve du reversement. Préciser vendeur, bénéficiaire, pourcentage, base de calcul, frais et remboursements. Le client n’est pas automatiquement le donateur.</li><li><strong>Place suspendue :</strong> contribution, attribution confidentielle puis utilisation. Ce mécanisme n’ouvre pas automatiquement droit à un reçu fiscal.</li></ul><p>Les documents nominatifs restent privés ; les droits réels doivent être émis, contrôlés et révoqués côté serveur.</p></section>
      <div className="guide-filters"><label>Rechercher une pièce<input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Invitation, photo, atelier…" /></label><label>Catégorie<select value={category} onChange={(e) => setCategory(e.target.value)}><option value="">Toutes les catégories</option>{CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label></div>
      <p role="status">{shown.length} / {ITEMS.length} pièces · Usages proposés par famille, champs et actions propres à chaque modèle.</p>
      <div className="guide-mosaic">{shown.map((item) => {
        const use = PIECE_USES[item.category]; const actions = actionsPourPiece(item.id, item.category);
        return <article key={item.id} id={`piece-${item.id}`}>
          <div className="guide-preview" inert><PiecePreview itemId={item.id} decorative /></div>
          <div className="guide-card-body"><p className="guide-eyebrow">{CATEGORIES.find((c) => c.id === item.category)?.name}</p><h2>{item.name}</h2><p><strong>Utilisation envisagée :</strong> {use.usage}</p><p><strong>Avantage :</strong> {use.advantage}</p><p><strong>À connecter / vérifier :</strong> {use.requires}</p><p className="guide-fiscal"><strong>Reçu fiscal : pas automatique.</strong> Le modèle n’est pas un reçu fiscal. L’éligibilité dépend du versement et de l’organisme, jamais de cette apparence.</p>
          <details><summary>Personnalisation et actions de ce modèle</summary><p>Champs : {item.editable?.map((f) => f.label).join(', ') || 'aucun champ déclaré'}.</p><p>Actions configurables : {actions.map((a) => a.label).join(', ') || 'aucune action spécifique déclarée'}. Un lien global peut aussi être configuré dans l’atelier. Déclarer une action ne connecte pas son service.</p><code>{item.id}</code></details><a href={`/?module=${encodeURIComponent(item.id)}`} target="_blank" rel="noreferrer">Ouvrir le modèle isolé ↗</a></div>
        </article>;
      })}</div>
      {!shown.length && <p>Aucune pièce ne correspond. Modifiez la recherche ou la catégorie.</p>}
      <section className="guide-sources"><h2>Références et justificatifs</h2><p>Guide fonctionnel daté du 16 octobre 2026, sans validation fiscale individuelle. Les règles et opérations effectives doivent être examinées par les responsables de l’organisme et leurs conseils.</p><ul><li><a href="https://www.service-public.gouv.fr/particuliers/vosdroits/F426" target="_blank" rel="noreferrer">Service Public — dons et conditions de réduction d’impôt</a></li><li><a href="https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/230_association/fiche_rescrit_mecenat---21-08-2026.pdf" target="_blank" rel="noreferrer">Administration fiscale — rescrit mécénat</a></li><li><a href="https://www.cnil.fr/fr/minimiser-les-donnees-collectees" target="_blank" rel="noreferrer">CNIL — minimiser les données collectées</a></li></ul><p>Un dossier de contrôle doit notamment relier chaque opération à son émetteur, sa nature, son montant, ses conditions, ses remboursements et ses pièces comptables. Cette page ne génère aucun justificatif ni reçu.</p></section>
    </main>
  </div>;
}
