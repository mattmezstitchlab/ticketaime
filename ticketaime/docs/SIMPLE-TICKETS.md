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

## Direction finale — un timbre signature

Le parcours public n’utilise plus les différents modèles. Un seul composant
SignatureStamp porte toujours LE MONDE AIME, sur papier crème/olive et bord dentelé.
Le grand titre et la fente sont centrés dans le hero ; un seul timbre permet de
commencer. Plus de catalogue, déplacement ou sélection de modèle dans ce parcours.
L’éditeur plein écran permet destinataire, message et signature ; le dessin ne
change pas. Valider sauvegarde localement puis anime la sortie de ce même timbre.
Les créations sauvegardées reprennent toutes le même dessin. Nouveau stockage
`ticketaime-signature-stamps-v1` ; les anciens brouillons ne sont pas effacés.
Aucun envoi, affranchissement ou partage serveur. Tests du dialogue, sauvegarde,
annulation, sortie, réouverture, doublons, stockage plein et reprise. Le rendu réel
et les dimensions mobiles restent à valider visuellement dans la preview.
