# Parcours minimal — LE MONDE AIME

Direction validée : sans code, vidéo ni wallet séparé. L’App monte SimpleTickets.
Les anciens parcours restent dans les sources et leurs clés de stockage ne sont
ni supprimées ni migrées. Les URL guide/professionnels/Atlas restent disponibles.

- Hero blanc, titre central « LE MONDE AIME », huit modèles d’origine superposés.
- Déplacement souris, stylet ou tactile par Pointer Events, sans contour de sélection.
  Seuil de 6 px avant déplacement : le clic après glissement n’ouvre pas l’éditeur.
  Positions bornées au hero et non persistées. Le scroll tactile reste possible
  en touchant le fond ; les tickets utilisent touch-action:none.
- Clic ou Entrée/Espace : éditeur plein écran, aperçu inerte, champs existants du
  modèle et mot libre. Les modèles sans champs éditables conservent leur dessin.
- Dialog modal avec fond inerte, blocage du scroll, focus contenu, fermeture Échap
  et retour du focus à l’objet déclencheur. Fermer annule les modifications.
- Valider = enregistrement explicite dans ce navigateur. Une erreur de stockage
  garde l’éditeur ouvert et ne produit ni succès ni timbre. Mise à jour par ID.
- Après validation, un timbre décoratif sort de la fente supérieure : il rouvre
  la création. Aucun affranchissement, envoi, réservation ni certificat réel.
- Créations enregistrées accessibles sous le hero après rechargement ; stockage
  distinct `ticketaime-simple-creations-v1`, aucune synchronisation serveur.
- Tous les tickets : 168 modèles, recherche et catégories sur blanc, dessins
  et éventuels contrôles web rendus inertes avant l’ouverture de l’éditeur.

Contrôles : TypeScript, suite Node/DOM et build. Recette visuelle/mobile et drag
natif à effectuer sur la preview ; tests DOM ne valident pas les pixels, la
lisibilité du collage ou les dimensions réelles du navigateur.
