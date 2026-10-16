# Guide public des pièces

Accès direct : `/?page=guide`, avec liens depuis la navigation et le pied de page
(disponible sur mobile). Les 168 fiches viennent de `ITEMS`, sans inventaire dupliqué.
Les usages et limites sont assignés aux 19 familles ; chaque fiche indique aussi
les champs et actions réellement déclarés pour son modèle. Les aperçus sont
inertes pour empêcher la soumission accidentelle des formulaires de démonstration.
Un lien distinct ouvre le modèle isolé.

Le guide ne délivre aucun reçu fiscal, ne certifie aucune éligibilité et ne prouve
aucune opération comptable. Il distingue don direct, achat avec reversement et
place suspendue. Il rappelle qu'un modèle n'est pas un droit fiscal et qu'éviter
un formulaire visible ne garantit pas la sécurité. Les usages sont proposés,
les backends nécessaires ne sont pas connectés par cette page.

Références officielles liées dans la page : Service Public (dons), administration
fiscale (rescrit mécénat), CNIL (minimisation des données).

Tests : `node --test tests/*.test.mjs`, `npx tsc --noEmit`, `npm run build`.
Le test de rendu serveur vérifie les 168 fiches, la couverture de toutes les
catégories, les aperçus inertes et les avertissements. Il ne teste pas le rendu
visuel ni les interactions dans un navigateur.

Recette navigateur à réaliser : ouvrir le guide depuis l'accueil sur bureau et
mobile ; filtrer les catégories ; chercher une pièce ; essayer une recherche sans
résultat ; déplier ses actions ; ouvrir son aperçu ; imprimer en PDF. Le PDF
conserve le filtre actif : effacer les filtres pour imprimer l'inventaire complet.
