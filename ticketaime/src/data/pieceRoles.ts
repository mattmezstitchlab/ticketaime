import type { CategoryId } from './catalogue';
import { ITEMS } from './catalogue';
import { composeFromBrief } from './landing';
import type { CreationDraft } from './landing';
export const ROLES = { organizer: 'Organisateur / mariés', guest: 'Invité / participant', close: 'Témoin / proche', provider: 'Prestataire', welcome: 'Équipe d’accueil', association: 'Responsable associatif' } as const;
export type PieceRole = keyof typeof ROLES;
export function rolesForCategory(category: CategoryId): { creators: PieceRole[]; recipients: PieceRole[]; note: string } {
  if (category === 'administratif' || category === 'sceaux') return { creators: ['organizer', 'association', 'provider'], recipients: ['guest', 'provider', 'organizer', 'association'], note: 'Modèle interne ou décoratif uniquement ; aucune qualité officielle conférée.' };
  if (category === 'travail') return { creators: ['provider', 'organizer', 'association'], recipients: ['provider', 'welcome', 'organizer'], note: 'Un badge visuel ne donne pas de droit d’accès.' };
  if (category === 'photo' || category === 'postale' || category === 'timbre' || category === 'monnaies' || category === 'billets') return { creators: ['organizer', 'guest', 'close', 'provider', 'welcome', 'association'], recipients: ['organizer', 'guest', 'close', 'provider', 'welcome', 'association'], note: 'Création et collection suggérées ; respecter droits, consentements et caractère fictif.' };
  return { creators: ['organizer', 'provider', 'association', 'close'], recipients: ['guest', 'organizer', 'close', 'provider', 'welcome', 'association'], note: 'L’émetteur doit être habilité pour l’événement ; la réception n’autorise pas le transfert.' };
}
export interface PieceStep { id: string; title: string; recipient: string; reason: string; privacy: string; draft: CreationDraft }
export function recommendPieces(brief: string, role: PieceRole): PieceStep[] {
  const primary = composeFromBrief(brief);
  const wedding = primary.usageId === 'mariage';
  const make = (id: string, title: string, recipient: string, reason: string, privacy: string, itemId = primary.itemId): PieceStep => {
    const item = ITEMS.find((i) => i.id === itemId)!;
    const fields = Object.fromEntries((item.editable ?? []).map((f) => [f.cle, f.valeur]));
    const titleKey = (item.editable ?? []).find((f) => ['titre', 'title', 'film'].includes(f.cle))?.cle;
    if (titleKey) fields[titleKey] = title;
    return { id, title, recipient, reason, privacy, draft: { ...primary, id: `${primary.id}-${id}`, itemId, fields: itemId === primary.itemId ? { ...primary.fields, ...(titleKey ? { [titleKey]: title } : {}) } : fields, brief: `${primary.brief}\nPièce complémentaire : ${title}. Destinataire prévu : ${recipient}. ${reason} ${privacy}` } };
  };
  if (role === 'guest') return [make('reply', 'Préparer ma réponse', 'Organisateur de mon événement', 'Préparer un message de présence ; aucun RSVP n’est transmis.', 'Ne saisissez pas d’allergie ici. Un canal privé vérifié reste nécessaire.', 'carte-mer'), make('thanks', 'Un souvenir, un merci', 'Les hôtes', 'Créer une attention personnelle après l’événement.', 'Vérifier les destinataires avant tout partage.', 'carte-mer')];
  if (role === 'provider') return [make('brief', 'Ma proposition de prestation', 'Organisateur qui me sollicite', 'Préparer une carte de présentation, pas un devis accepté.', 'Aucun accès aux invités ou à leurs données.', 'web-features'), make('contact', 'Coordonner mon intervention', 'Mon interlocuteur désigné', 'Préparer mes coordonnées et points de coordination.', 'Horaires et accès à confirmer avec l’organisateur.', 'carte-mer')];
  if (role === 'welcome') return [make('welcome', 'Repères pour accueillir', 'Équipe affectée à cet événement', 'Préparer un mémo d’accueil sans liste nominative.', 'Aucun contrôle d’entrée ni accès aux réponses des invités.', 'carte-mer')];
  if (role === 'close') return [make('mission', 'Une attention à préparer', 'Organisateur / mariés', 'Préparer une proposition de contribution ou une mission à confirmer.', 'Le rôle de proche ne permet pas d’émettre des accès.', 'carte-mer'), make('memory', 'Souvenir partagé', 'Participants choisis', 'Préparer une carte à offrir.', 'Demander l’accord avant de diffuser des images.', 'carte-mer')];
  const steps = [make('invitation', wedding ? 'Invitation au grand jour' : 'Invitation à notre rendez-vous', 'Invités sélectionnés', 'Donner le contexte et préparer l’invitation.', 'Brouillon uniquement : aucun accès émis et aucun destinataire enregistré.'), make('rsvp', 'Préparer la demande de RSVP', 'Invités sélectionnés', 'Prévoir une demande de présence et une échéance ; collecte non connectée.', 'Les réponses et allergies ne doivent pas être inscrites dans un QR public.', 'carte-mer'), make('transport', 'Les repères du trajet', 'Participants concernés', 'Préparer les indications de transport sans promettre de réservation.', 'Ne pas publier d’adresse privée sans accord.', 'kraft-pass'), make('provider', 'Coordination des prestataires', 'Interlocuteur professionnel choisi', 'Préparer les points de coordination et le contact responsable.', 'Les informations alimentaires sensibles exigent un canal privé et des accès limités.', 'carte-mer'), make('souvenir', 'Merci pour ce moment', 'Participants choisis', 'Prolonger le parcours par une carte souvenir.', 'Respecter les droits sur les images et les messages.', 'carte-mer')];
  if (role === 'association') steps.push(make('solidarity', 'Une place solidaire à préparer', 'Bénéficiaire à attribuer confidentiellement', 'Décrire l’action et ses conditions avant toute attribution.', 'Ni paiement, ni droit réel, ni reçu fiscal émis par ce brouillon.', 'roll'));
  return steps;
}
