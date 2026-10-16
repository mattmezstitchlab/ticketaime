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
