import type { CategoryId } from './catalogue';
export interface PieceUse { usage: string; advantage: string; requires: string }
export const PIECE_USES: Record<CategoryId, PieceUse> = {
  voyage: { usage: 'Carnet de voyage, invitation destination, itinéraire.', advantage: 'Rassembler les étapes et les liens dans un objet mémorable.', requires: 'Réservation et validation par l’opérateur si titre de voyage réel.' },
  transport: { usage: 'Navette événementielle, horaires, parcours.', advantage: 'Retrouver rapidement son trajet et ses informations.', requires: 'Service de réservation et contrôle des droits pour un accès réel.' },
  poste: { usage: 'Correspondance, suivi d’envoi, notification.', advantage: 'Donner une forme lisible à un échange et son suivi.', requires: 'Preuve opérateur ou service d’envoi ; le graphisme ne prouve pas la livraison.' },
  cinema: { usage: 'Projection privée, programme et invitation.', advantage: 'Relier séance, lieu et billetterie.', requires: 'Billetterie et consommation serveur pour contrôler une entrée.' },
  spectacle: { usage: 'Concert, festival, programme et pass artiste.', advantage: 'Différencier les parcours et zones d’accueil.', requires: 'Émission autorisée, révocation et contrôle des accès.' },
  loisirs: { usage: 'Atelier, sport, séance ou place solidaire.', advantage: 'Conserver une réservation ou financer une participation.', requires: 'Gestion des capacités, attribution et réservation côté serveur.' },
  bar: { usage: 'Menu, cocktail, réservation ou bon à consommer.', advantage: 'Associer une offre à son contexte et faciliter son utilisation.', requires: 'Registre de consommation pour empêcher un bon utilisé plusieurs fois.' },
  services: { usage: 'Bon cadeau, devis, retrait et rendez-vous.', advantage: 'Retrouver la prestation et sa prochaine étape.', requires: 'Commande, paiement, conditions de validité et facturation si nécessaires.' },
  social: { usage: 'Adhésion, invitation associative et contribution.', advantage: 'Rendre visibles participation et appartenance.', requires: 'Registre des membres ; distinguer cotisation, achat et don.' },
  publicite: { usage: 'Campagne, étiquette, promotion et lien produit.', advantage: 'Donner un point d’entrée identifiable à une offre.', requires: 'Conditions commerciales et preuve des engagements de reversement.' },
  administratif: { usage: 'Fiche de dossier, échéance et récépissé interne.', advantage: 'Guider les étapes sans exposer le dossier complet.', requires: 'Espace privé, habilitations, conservation et preuves documentaires ; pas un titre officiel.' },
  timbre: { usage: 'Collection graphique, édition et récompense de parcours.', advantage: 'Créer un repère visuel collectionnable.', requires: 'Mention décorative : ne vaut ni affranchissement ni certification.' },
  postale: { usage: 'Message, récit, souvenir et carte vidéo.', advantage: 'Conserver et partager un moment sous une forme personnelle.', requires: 'Droits sur les médias et confidentialité des messages.' },
  photo: { usage: 'Galerie, tirage, photobooth et souvenir.', advantage: 'Relier une image à sa provenance et à son tirage.', requires: 'Droits à l’image et accès privé si nécessaire.' },
  travail: { usage: 'Carte professionnelle, équipe et portfolio.', advantage: 'Retrouver une personne, un rôle et ses coordonnées.', requires: 'Annuaire et droits d’accès séparés du visuel du badge.' },
  web: { usage: 'Composer un mini-site et ses points d’action.', advantage: 'Réutiliser des sections et garder une présentation cohérente.', requires: 'Backend fiable pour connexion, newsletter et formulaires ; certaines actions sont des démonstrations.' },
  monnaies: { usage: 'Jeton ludique, fidélité et récompense.', advantage: 'Matérialiser une étape ou une unité de participation.', requires: 'Registre si valeur réelle ; aucun actif financier garanti par le modèle.' },
  billets: { usage: 'Création graphique, jeu et monnaie fictive.', advantage: 'Créer un objet narratif reconnaissable.', requires: 'Signalement fictif ; ne vaut ni monnaie légale ni droit financier.' },
  sceaux: { usage: 'Cachet décoratif, identité d’atelier et étape visuelle.', advantage: 'Distinguer les états et la provenance affichée.', requires: 'Preuve serveur séparée ; ce graphisme n’est pas une signature électronique.' },
};
export const FISCAL_NOTICE = 'Aucun droit fiscal attaché au modèle. Un achat, un accès, un souvenir ou un pourcentage reversé ne donne pas automatiquement droit à un reçu fiscal au client. Un reçu fiscal éventuel concerne un versement éligible à un organisme habilité, selon ses conditions et les contreparties, pas le dessin du ticket.';
