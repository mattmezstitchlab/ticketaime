# LE MONDE AIME — maquette de rencontres

App monte Meetings : découverte amicale, amoureuse ou les deux. Le timbre et
la fente restent le vocabulaire visuel. Aucun compte réel, inscription, accès
serveur, collecte, géolocalisation ou envoi n’est implémenté.

- Fente vide au départ. Bouton Faire une rencontre activé après déclaration 18+
  et choix d’au moins une intention. Déclaration illustrative, pas vérification d’âge.
- Trois personnages explicitement fictifs, adultes, représentés par une initiale,
  une zone géographique illustrative, une présentation et une question.
- Découverte déterministe filtrée par intentions, pas un matching réel.
- Profil en dialogue : intention unique choisie pour chaque invitation, texte libre
  borné et pas de coordonnées demandées. Aucun message n’est transmis.
- Conversation inaccessible avant le bouton Simuler son acceptation. Refus ferme
  sans ouvrir le chat ; aucune fausse réponse attribuée au personnage.
- Chat en mémoire et libellés non envoyé/simulé. Aucun stockage navigateur ; tout
  disparaît au rechargement. Éviter toute information réelle ou sensible.
- Masquer retire le personnage de la découverte pendant la session seulement.
  Signalement avec motif simulé et avertissement explicite qu’il n’est pas transmis.
  Ce n’est pas un service de sécurité, de modération ou d’urgence.
- Dialogue modal : fond inerte, verrouillage scroll, focus contenu, boucle clavier,
  fermeture Échap et retour au timbre. Reset remet la démo à zéro.

Avant un service réel : identité/âge et consentements appropriés, autorisations
serveur, demandes/acceptations persistantes, protection des messages, anti-abus,
modération et signalements réellement traités, blocage serveur, suppression et
conservation des données. Le prototype ne remplit pas ces exigences.

Tests DOM : accès adulte, intentions, fente vide, invitation, acceptation/refus,
chat, signalement/masquage simulés, reset, absence de persistance et focus.
Rendu visuel/mobile non vérifié par les tests DOM ; recette sur preview requise.
Les anciens composants et données restent hors du parcours principal. Production
inchangée ; aucune infrastructure ou base provisionnée.
