# Parcours professionnel et wallet-calendrier

Page `/?page=professionnels`, reliée à l'accueil (navigation et pied de page).
La présentation expose préparation, coordination et conservation, sans annoncer
comme opérationnels les comptes, envois, collectes, abonnements ou automatismes.
Les offres par événement et professionnelle sont des hypothèses non commercialisées,
sans prix ni bouton de paiement.

Le calendrier interactif affiche des exemples fictifs sur mai/juin 2027 :
RSVP le 12 mai, invitation et navette le 12 juin, souvenir le 13 juin.
Cliquer une date affiche ses pièces ; les modèles peuvent être ouverts isolément.
Les compartiments À classer et Cartes permanentes expliquent le classement futur.
Aucune pièce personnelle n'est créée, aucune donnée métier n'est persistée.
Le calendrier ne lit pas le Wallet local de démonstration existant ; il ne doit pas
être présenté comme un espace utilisateur opérationnel ou synchronisé.

Tests : TypeScript, tests Node de couverture/rendu, build Vite.
Recette visuelle à effectuer : liens accueil sur mobile et bureau, changement de
mois, jours vides, sélection du 12 mai, 12 et 13 juin, compartiments et aperçu des
modèles. La validation dans un vrai navigateur n'est pas effectuée.

Prochaine étape métier : identité et événement, stockage privé, rôles contrôlés,
émission et réception de pièces, puis services d'envoi et paiements. Le prototype
ne garantit ni authentification des tickets ni droits d'accès réels.

## Objets visuels

Les dates occupées affichent une miniature de la première pièce ; les noms restent
lisibles et ne reposent pas uniquement sur l'image. Le détail d'une journée utilise
`PieceObject` : recto avec le rendu existant, verso avec rôle destinataire,
explication et limites, échéance visible et lien vers le modèle isolé. Le bouton
« Lire le verso » change le contenu sans animation 3D obligatoire.

Le composant accepte `artworkUrl` pour remplacer ultérieurement le rendu par une
image d'objet réalisée sur mesure. En cas d'erreur de chargement, il revient au
composant de catalogue. Aucun rendu externe n'est ajouté par cette modification.
Changer l'image ne modifie ni l'identifiant fonctionnel du modèle ni ses droits.
Ces pièces sont toujours des exemples et ne sont pas enregistrées dans un compte.

Recette complémentaire : ouvrir le 12 juin, lire le verso de chaque objet, revenir
au recto, vérifier l'échéance et ouvrir le modèle. Tester mai et le 13 juin ainsi
que la mise en page mobile et la réduction des animations.

### Révision de la présentation calendrier

Le détail d'une journée reprend désormais les pochettes sombres/translucides du
studio (WalletView) : pièce droite, ouverture de pochette, légende et état courts.
La page générale conserve le papier clair de la landing. Le recto/verso est retiré :
les précisions restent disponibles dans « Utilité et précautions » et via un lien
vers la fiche existante du guide, sans dupliquer une lecture obligatoire.
Le calendrier, les dates et les limites fonctionnelles ne changent pas.

### Cases réversibles Wallet

Le calendrier utilise désormais WalletCalendar : les cases restent carrées et
régulières. Un clic révèle la carte Wallet dans la même case, sans liste de
pochettes séparée. Flèches, touches gauche/droite et balayage tactile permettent
le défilement cyclique des pièces du jour. Le compteur reste visible. Retour à
la date par ↶ ou Échap, avec restitution du focus. Les faces masquées sont inertes.
Les jours vides expliquent qu'aucune pièce n'est disponible. Le changement de mois
réinitialise les cases ouvertes. Les animations sont désactivées avec
prefers-reduced-motion. Sur mobile, défilement horizontal du calendrier pour
conserver la taille des cartes au lieu de rendre sept cartes illisibles.

Ces cartes réutilisent l'esprit du pass Wallet, sans QR prétendant certifier
l'authenticité. Les modèles et les dates restent fictifs. Aucun graphe de causalité,
compte ou stockage synchronisé ajouté. Le composant PieceObject reste disponible
mais n'est plus utilisé dans le calendrier.

### Calendrier simplifié
La présentation réversible et les miniatures sont retirées. Chaque journée contient seulement la date et les liens des pièces, vers les sections de démonstration en dessous. Les visuels restent grands dans cette verticalité. Aucun lien vers un parcours personnel sauvegardé : les données restent fictives.
