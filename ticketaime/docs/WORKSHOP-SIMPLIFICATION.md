# Analyse de simplification de l'atelier

Sources : App, StudioCanvas, WalletView, Catalogue, Inspector.

- Bibliothèque latérale : recherche et catégories dans ITEMS, sélection/ajout de modèles.
- Pochettes : même ITEMS dans WalletView, présentation par catégorie, sélection et ajout à la table.
- Catalogue autonome : même ITEMS dans Catalogue, filtrage et présentation d'inventaire.
- Guide : même inventaire, mais documentation des usages et limites ; fonction distincte.

Bibliothèque et Pochettes sont deux représentations d'un même outil de recherche
et d'ajout, pas deux collections différentes. Les afficher simultanément augmente
la charge visuelle. Le Catalogue public peut rester une exploration, mais ne doit
pas être une troisième destination concurrente pendant l'édition.

Cible recommandée :
1. Deux zones principales : « Composer » et « Les pièces ».
2. « Les pièces » ouvre une bibliothèque unique, avec bascule liste/pochettes,
   recherche et filtre partagés. La liste compacte sert à ajouter vite ; les
   pochettes servent à explorer visuellement. Ne pas perdre les deux usages.
3. Table et inspecteur restent la surface d'édition. Inspecteur fermé sans sélection,
   options avancées regroupées. Guide accessible contextuellement par modèle.
4. Chrome papier clair de la landing, boutons sobres et accent olive ; conserver
   le contraste sombre de la table/pochettes comme support des objets colorés.
5. Un seul appel « Ajouter à la composition », un seul point d'impression ; actions
   secondaires dans un menu. Préserver les fonctionnalités clavier et mobile.
6. Ne pas confondre les pochettes de modèles et un portefeuille de pièces émises.

Les contrôles Certificat/Wallet existants présentent des garanties non réelles :
les renommer/désactiver pour un usage réel avant toute promesse de sécurité.
Ce document ne corrige pas ces mécanismes et ne prétend pas le faire.

Cette livraison déplace seulement la carte postale dans le hero. Aucune vue de
l'atelier n'est supprimée ni refondue sans une recette dédiée : ajout, sélection,
personnalisation, mise en page, impression, mobile et retour à la bibliothèque.
