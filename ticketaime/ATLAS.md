# Atlas — Intégration des modules Éphémères

Chaque pièce de la collection est un **module indépendant, paramétrable et fonctionnel**,
repérable par le site Atlas depuis ce dépôt GitHub.

## 1. Manifeste des modules

Fichier généré : [`public/atlas-modules.json`](public/atlas-modules.json) — 168 modules, 19 catégories.

```bash
# Régénérer après ajout / renommage d'une pièce
node scripts/gen-atlas.mjs
```

Structure d'un module :

```json
{
  "id": "web-hero",
  "nom": "Module web - section hero",
  "categorie": "web",
  "categorieNom": "Modules web",
  "fichier": "src/components/tickets/Web.tsx",
  "composant": "WebHero",
  "largeur": 560,
  "hauteur": 300,
  "champs": [{ "cle": "titre", "label": "Titre", "defaut": "…" }],
  "actions": [{ "cle": "ctaUrl", "label": "Lien du bouton principal", "type": "url" }],
  "previewUrl": "?module=web-hero",
  "version": "1.0.0"
}
```

## 2. Aperçu isolé et fonctionnel (iframe Atlas)

Chaque module se rend seul via query param :

```
/?module=<id>
/?module=web-hero&champ:titre=Bonjour&action:ctaUrl=https://example.com
```

- `champ:<cle>` — surcharge un texte (clés listées dans `champs[]`).
- `action:<cle>` — surcharge un lien / une action réelle (clés listées dans `actions[]`, plus `_href` / `_cible` pour le lien global).
- Formulaires web (contact, newsletter, connexion), FAQ accordéon et boutons sont **fonctionnels** dans cette vue.

Exemple d'intégration :

```html
<iframe
  src="https://ephemeres.example/?module=web-contact&action:destinataire=atelier@atlas.fr"
  width="560" height="360" style="border:0;border-radius:12px"
  title="Module Atlas : web-contact"
/>
```

## 3. Import ESM direct depuis le dépôt

```tsx
import { WebHero } from "ephemeres/src/components/tickets/Web";
import { ATLAS_MODULES } from "ephemeres/src/lib/atlas";

<WebHero personnalisation={{ titre: "Bonjour", ctaUrl: "https://example.com" }} />
```

## 4. Repérage DOM

Toute pièce rendue porte :

```html
<div data-atlas-module="web-hero" data-atlas-category="web" data-atlas-version="1.0.0">…</div>
```

Atlas peut ainsiLister / indexer les modules présents sur n'importe quelle page :

```js
document.querySelectorAll("[data-atlas-module]");
```

## 5. Schémas d'actions

- `src/lib/moduleActions.ts` — `ACTIONS_PAR_PIECE` (spécifiques, ex. modules web) +
  `ACTIONS_PAR_CATEGORIE` (lien billetterie, suivi, réservation…).
- Champs universels : `_href` (lien sur toute la pièce), `_cible` (`_blank` / `_self`).
- Côté Studio, l'onglet **Fonction** de l'inspecteur édite ces valeurs ; elles sont
  fusionnées dans `personnalisation` au rendu (`{...fields, ...actions}`).

## 6. Mises en page du canevas

`src/lib/layouts.ts` — `grille | cascade | éventail | pile | mur | cercle | frise | nuage`,
appliquées via le menu « Arranger la table ».
