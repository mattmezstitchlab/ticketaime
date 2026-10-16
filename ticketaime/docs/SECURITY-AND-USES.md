# Audit ciblé — 16 octobre 2026

Analyse statique et reproduction locale, pas un pentest ni une certification.
La modification de cette PR ajoute la vidéo uniquement ; les défauts ci-dessous
ne sont pas corrigés par ce changement et interdisent de présenter le système
comme une billetterie sécurisée.

## Constats

1. **Critique pour un usage de contrôle d'accès : vérification contournable.**
   `src/lib/security.ts`, `verifierPiece` : `hashAttendu === identite.hash ||
   identite.hash.length === 14`. Tout texte de 14 caractères passe ce contrôle.
   Reproduction locale : `{id:'FAUX', hash:'XXXXXXXXXXXXXX', controle:'0000',
   emis:1, valide:null, transferts:0, porteur:'Inconnu'}` avec catégorie `billets`
   retourne `authentique: true`, malgré un contrôle de format d'identifiant faux.
   Le résultat global n'agrège pas tous les contrôles. Le calcul attendu ne reprend
   pas non plus les mêmes entrées que celui de l'émission.
2. **Élevé : aucune signature.** `empreinte` utilise FNV-1a tronqué et public, sans
   clé secrète. Le « sel » est une entrée de personnalisation, pas une clé privée.
   L'empreinte ne lie pas les champs personnalisés, le porteur, les droits,
   une expiration ou un usage. FNV n'est pas un algorithme cryptographique.
3. **Élevé : identifiants reproductibles.** `idPiece` est déterministe par modèle,
   catégorie et sel ; plusieurs émissions sans sel unique ont le même identifiant
   dans la même année. L'heure est celle du navigateur et modifiable.
4. **Élevé : anti-rejeu, révocation et transfert non implémentés.** Pas de registre
   serveur ni transaction atomique de consommation. `transferts >= 0` ne prouve
   aucune chaîne de traçabilité. Un QR peut être copié et resoumis.
5. **NFC non implémenté dans le dépôt inspecté.** Aucun `NDEFReader`, protocole
   matériel, provisionnement de puce, compteur authentifié ou validation CMAC.
   Un QR et un pictogramme ne prouvent ni la présence d'une puce ni son authenticité.
6. **Libellés trompeurs.** Les niveaux `standard/renforce/critique` sont attribués
   par catégorie, pas par protections déployées. `creerPreuve` fabrique un journal
   local mentionnant un envoi mais n'effectue pas d'envoi. Les callbacks de
   `SecurityBadge` ne constituent pas une preuve de réception.
7. **QR de certificat non signé et non-URL.** `payloadCertificat` joint une URL et
   des champs avec des sauts de ligne : c'est du texte lisible, pas une URL de
   vérification avec paramètres. Aucun endpoint de vérification n'est implémenté
   dans ce dépôt ; le domaine externe n'a pas été testé.
8. **Wallet de démonstration.** `WalletSheet` ajoute une entrée dans localStorage,
   pas dans Apple Wallet, malgré le libellé « Dans le Wallet de l'iPhone ».
   La note finale reconnaît l'absence de signature Apple. Rien ici ne prouve
   l'émission d'un pass Apple signé ou d'un titre reconnu par un opérateur.

## Avant tout usage réel de valeur ou d'accès

- Corriger d'abord les libellés : « démonstration », jamais « authentique » sur la
  seule base de ces contrôles. Supprimer le raccourci de longueur ne suffit pas.
- API d'émission authentifiée, rôles organisateur/contrôleur, identifiants aléatoires,
  registre serveur, expiration, révocation et consommation atomique (tester deux
  scanners simultanés). Autoriser explicitement chaque transfert.
- Tickets signés par une bibliothèque éprouvée avec clé privée côté serveur,
  signature couvrant identifiant, émetteur, droits, audience et dates ; rotation
  de clés et validation stricte. Ne pas remplacer FNV simplement par SHA-256
  en prétendant avoir obtenu une signature. Une signature n'empêche pas le rejeu.
- URL HTTPS de vérification, limitation de débit, journal d'audit, données minimales,
  et contrôle des liens/formulaires externes. Pas de clés privées dans Vite.
- NFC d'information : une URL NDEF statique convient mais reste copiable.
  NFC d'authenticité : puce sécurisée provisionnée (ex. NTAG 424 DNA), clés par
  tag et vérification serveur du message dynamique/CMAC et du compteur ; tester
  rejeu et concurrence. Cela authentifie la puce, pas automatiquement son porteur
  ni l'objet auquel elle est attachée. Ni blockchain ni NFC obligatoires pour
  une billetterie QR convenablement conçue.
- Pass Apple : chaîne de génération et signature serveur réelle. Paiement,
  identité officielle, titre de transport et certification restent des intégrations
  distinctes, pas des propriétés conférées par un graphisme de ticket.

## Les 168 pièces : usages et limites

Le manifeste `public/atlas-modules.json` compte 168 modèles dans 19 catégories.
Il décrit des composants et leurs champs/actions, pas 168 services backend.

| Famille | Modèles | Usages envisageables avec connexion métier si nécessaire |
| --- | ---: | --- |
| Voyage | 18 | carnet de voyage, invitation destination, itinéraire ; pas une carte d'embarquement reconnue |
| Transport | 8 | navette d'événement, horaires, parcours ; contrôle d'accès à connecter |
| Poste | 8 | correspondance, accusé ludique, suivi via opérateur ; pas une preuve légale d'envoi |
| Cinéma | 10 | projection privée, programme, bande-annonce, billetterie connectée |
| Spectacle | 10 | concerts, invitations, programme, pass artiste et accès par zone |
| Loisirs & sport | 8 | séances, ateliers, abonnements et réservations |
| Bar | 10 | menus, cocktails, réservation, bons à consommer avec registre de consommation |
| Commerce & services | 8 | bons cadeaux, retraits, devis, fidélité et rendez-vous |
| Vie sociale | 8 | adhésions, invitations, clubs, dons et événements associatifs |
| Publicité & emballages | 8 | campagnes, étiquettes produit, QR d'origine et promotions |
| Administratif | 10 | maquettes et documents internes ; pas des titres officiels |
| Timbres | 8 | éditions graphiques, collection, affranchissement décoratif non postal |
| Cartes postales | 8 | souvenirs, récits, messages et cartes vidéo |
| Photo | 6 | galerie, tirages, photobooth, souvenirs de mariage |
| Cartes de travail | 10 | cartes pro, portfolio, équipes, badges avec service d'accès distinct |
| Modules web | 14 | mini-site : hero, navigation, tarifs, FAQ, CTA, contact, newsletter, connexion, logos |
| Monnaies & Tokens | 6 | jetons ludiques, fidélité et crédits internes à cadrer ; pas un actif financier sécurisé |
| Billets de banque | 3 | créations graphiques et monnaie fictive clairement signalée ; pas de monnaie légale |
| Tampons & Cire | 7 | identité visuelle, sceaux décoratifs ; pas une signature électronique probante |

Déjà présents : personnalisation, canevas et arrangements, aperçu isolé
`?module=…`, manifeste Atlas, liens externes, FAQ et formulaires HTML.
Les contacts utilisent notamment `mailto:` ; newsletter/connexion par défaut
sont des démonstrations. Une action POST configurable exige une destination
fiable et un backend réel. Ne jamais collecter des mots de passe réels dans une
maquette reliée à une destination arbitraire.

Parcours à forte cohérence : mariage (invitation → RSVP → navette → menu →
photo → carte souvenir), concert (achat → billet → accès → boisson → souvenir),
commerce (cadeau → réservation → retrait → fidélité), tourisme (itinéraire →
activités → collection de cartes), musée (entrée → médiation → collection).
Les mêmes composants peuvent devenir des modules Atlas : conserver provenance,
licences, contrats de données et limites au lieu d'assimiler un iframe à une fusion.

## Sources de référence

- RFC 9923, FNV non cryptographique : https://www.rfc-editor.org/rfc/rfc9923.html
- NXP NTAG 424 DNA, AES/SUN et compteur : https://www.nxp.com/docs/en/data-sheet/NT4H2421Gx.pdf
- NXP AN12196, provisionnement et validation SDM : https://www.nxp.com/docs/en/application-note/AN12196.pdf

## Vérifications de cette PR

TypeScript et build de production ; intégrité binaire de la vidéo copiée ;
position du composant entre hero et usages ; contrôles vidéo natifs, lecture muette,
boucle et désactivation de la lecture automatique si réduction des animations.
La lecture effective et l'aspect visuel restent à vérifier dans un vrai navigateur.
