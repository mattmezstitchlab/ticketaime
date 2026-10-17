# Scénario vertical personnalisable

Après la première impression depuis le hero, les recommandations du rôle choisi
se déplient sous le hero. Les scènes génériques d'usages sont alors remplacées
par cette page-parcours ; un changement de rôle rétablit l'accueil initial.
Chaque étape possède un visuel pleine largeur, sa pièce, son destinataire,
une explication, ses précautions et un lien d'ouverture dans le canevas.

Personnalisation locale par section : titre, texte, fond, image JPG/PNG/WebP ou
vidéo MP4/WebM, 30 Mo maximum par fichier. Aucun upload serveur ; les médias sont
des URL objet libérées au remplacement et au démontage. Les vidéos disposent des
commandes natives et ne démarrent pas automatiquement. Les médias doivent être
licenciés/consentis ; les visuels initiaux sont identifiés comme illustrations.
Un fond neutre derrière le texte conserve sa lisibilité lorsque le fond est modifié.

Les modifications ne sont pas persistées ni publiées. Rechargement, nouveau brief,
changement de rôle ou ouverture du canevas réinitialisent la page. Le titre/texte
personnalisés sont transmis dans le brief lors de l'ouverture de la pièce ; le
média et la couleur ne sont pas transférés au canevas. Ce n'est pas un mini-site
publié ni un éditeur multi-utilisateur autorisé.

Aucun RSVP, donnée de santé, devis, relance, validation ou envoi connecté. Les
suggestions de services futurs sont présentées comme telles. Le rôle déclaré
ne prouve aucune permission. L'authentification et les permissions serveur sont
nécessaires avant tout partage et édition à plusieurs.

Contrôles : TypeScript, rendu des sections et contrôles de personnalisation,
absence de formulaire de collecte métier, avertissements, build production.
Recette navigateur à réaliser : générer un scénario, changer titre/texte/fond,
charger image puis vidéo, revenir au visuel initial, tester fichier invalide,
changer de rôle et ouvrir une pièce dans le canevas. Vérifier mobile et commandes
vidéo. Les contrôles automatisés ne remplacent pas cette validation visuelle.

## Parcours simplifié
La pièce imprimée mène maintenant à la carte postale vidéo, placée avant les sections. Le bloc explicatif sous la fente et les boutons canevas des sections sont retirés. Les précautions restent dans des détails dépliables. La vidéo ne parle pas automatiquement, ne suit pas le scroll et aucun assistant vocal, traduction ou personnage alternatif n’est connecté.
