# Wallet de fonctions — première version

L’accueil public et l’atelier ouvrent désormais un wallet de fonctions, plutôt que
la composition libre sur canevas. Les anciennes vues restent dans le dépôt pour
les références existantes ; elles ne sont plus montées par le parcours principal.
Les vues isolées Atlas et les guides conservent leurs URL.

## Parcours

- Hero : intention ou question, suggestion déterministe par mots-clés, puis ticket
  animé sortant de la fente. Aucune réponse IA ni recherche de disponibilité.
- Code : retrouve un ticket enregistré dans ce navigateur. Un lien complet contient
  un instantané du ticket et fonctionne sur un autre appareil. Un code court seul
  ne constitue pas une adresse globale ni un contrôle d’accès.
- Wallet : recherche par fonction, filtre sur les 19 catégories, modèles des 168
  pièces reliés à un usage. Onglet séparé pour les créations gardées localement.
- Atelier : un seul ticket en grand, champs adaptés et aperçu, aucun déplacement
  libre ni contour de sélection. Réservation, devis et facture utilisent une fiche
  dédiée pour ne pas présenter les textes d’un vieux spécimen comme un vrai document.
- Carte postale : timbre sortant dans le hero, choix d’une carte, message, collage
  à emplacement fixe par glisser-déposer OU bouton clavier/tactile.
- Réception : lecture d’une copie, conservation locale ou personnalisation d’une
  nouvelle copie avec un identifiant distinct.

## Persistance et confidentialité

Clé distincte `ticketaime-function-wallet-v1`. Pas de migration/destruction des
anciens brouillons. Enregistrement explicite, mise à jour par identifiant, erreur
visible si localStorage est indisponible ou plein.

Le lien embarque les données dans son fragment, pas dans un registre serveur.
Il est figé, lisible par quiconque le possède et non révocable. Un consentement
explicite est demandé avant sa génération. Ne pas y mettre de données sensibles.
Les entrées importées sont validées (version, outil, modèle, types, tailles et
clés dangereuses). Les aperçus de modèles web sont inertes : leurs formulaires
et liens ne sont pas des actions métier dans cet atelier.

L’action email ouvre seulement la messagerie de l’utilisateur avec un lien. Le
message doit être vérifié et envoyé par l’utilisateur ; aucun succès d’envoi ou
de réception n’est annoncé par l’application.

## Non livré dans cette première version

- Registre serveur des codes, comptes, synchronisation et autorisations privées.
- Disponibilité et confirmation de réservation, réponse RSVP persistée.
- Transport postal, paiement, signature ou acceptation de devis.
- Facture conforme prête à émettre : les champs sont un brouillon à compléter et
  vérifier dans l’outil comptable de l’émetteur.
- Pass Apple Wallet / Google Wallet, émission et contrôle de titres réels.
- Fonction métier spécifique pour chacun des 168 graphismes : les fonctions
  sont regroupées en 10 outils avec des modèles, et les limites sont affichées.

## Vérifications

`npx tsc --noEmit`, `node --test tests/*.test.mjs`, `npm run build`.
Les tests du wallet couvrent la couverture des catégories et modèles, les
intentions, les identifiants, les liens avec accents, la validation des imports,
le stockage corrompu et le rendu de l’accueil sans canevas.

Recette DOM automatisée (jsdom, dépendance de développement uniquement) :
réservation et sauvegarde sans doublon ; partage puis ouverture sans stockage
existant ; copie avec nouvel identifiant ; code local et code inconnu ; carte,
message et timbre ; collage au clic et au dépôt ; reprise après remontage ;
filtres et modèles par catégorie ; erreur de stockage plein sans faux succès.

La recette Chromium a été tentée mais reste bloquée par les bibliothèques
système absentes et l’accès aux dépôts Ubuntu indisponible dans ce sandbox.
Le rendu visuel, la géométrie responsive et les interactions natives clavier /
glisser-déposer restent à valider dans un vrai navigateur sur la preview.

## Correction — conserver le design d’origine

Le hero alternatif de la première version est retiré : l’accueil monte de nouveau
le composant Landing existant et sa feuille de styles non modifiée. Carte postale
vidéo, papiers flottants, photographies, collages, navigation et capsule sont
conservés. Seul le contrôle de saisie/impression est injecté pour brancher les
intentions, codes et liens au wallet de fonctions. Les scènes d’usage ouvrent
maintenant un ticket individuel, en conservant leur modèle lorsque compatible.

Les règles générales du wallet ne s’appliquent pas à la landing, pour éviter une
nouvelle substitution des typographies, boutons ou espacements. Le wallet et
l’atelier reprennent le wordmark, la navigation, le papier et la typographie sans
serif du design existant. Les pièces dessinées restent leurs composants d’origine,
sans nouvelle carte extérieure ; le canevas n’est pas réintroduit.

Tests de non-régression : éléments du design d’origine réellement montés, vidéo,
fente et scènes présents, absence du hero alternatif, et ouverture d’un ticket
Opéra depuis sa scène vers l’atelier individuel. Recette visuelle en navigateur
réel toujours à effectuer ; les contrôles DOM ne valident pas les pixels.
