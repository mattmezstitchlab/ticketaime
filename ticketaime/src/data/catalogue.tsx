import type { ComponentType } from "react";
import {
  CreamTypewriterPass,
  KraftBoardingPass,
  RoseTypewriterPass,
  TallKraftPass,
  TransAirPass,
} from "../components/tickets/BoardingPasses";
import {
  ArrivalTicket,
  BaggageClaimTicket,
  BlankNumberedTicket,
  BlueStamp,
  ExploreTicket,
  RedPlaneTicket,
  RoseStamp,
} from "../components/tickets/Stamps";
import {
  AirmailEaglePass,
  AirmailLargeLabel,
  AirmailSmallLabel,
  MailLabelPink,
  MailPassSmall,
  OrangeFrameLabel,
} from "../components/tickets/Labels";
import {
  CinemaStub,
  ClapperTicket,
  DriveInTicket,
  FilmStripTicket,
  MemberCard,
  MidnightTicket,
  PopcornVoucher,
  RollTicket,
  ThreeDTicket,
} from "../components/tickets/Cinema";
import {
  BarReceipt,
  CloakroomTag,
  Coaster,
  CocktailMenu,
  DrinkCoupons,
  HappyHourTicket,
  Matchbook,
  SpeakeasyCard,
} from "../components/tickets/Bar";
import {
  BackstagePass,
  CabaretTicket,
  CircusTicket,
  JazzFestivalTicket,
  MagicTicket,
  MasksTicket,
  OperaTicket,
  SeatPlanTicket,
} from "../components/tickets/Show";
import {
  ActeNaissance,
  BulletinPaie,
  CarteIdentite,
  CertificatMariage,
  CertificatScolarite,
  DeclarationImpots,
  DeclarationRevenus,
  LivretFamille,
  PermisConduire,
  Passeport,
} from "../components/tickets/Admin";
import {
  CarnetTimbres,
  EnveloppePreTimbre,
  TaxeTimbre,
  TimbreAerien,
  TimbreFiscal,
  TimbreMarianne,
  TimbreMonument,
  TimbreOiseau,
} from "../components/tickets/Timbres";
import {
  CarteAnniversaire,
  CarteCampagne,
  CarteExposition,
  CarteHumour,
  CarteMer,
  CarteMontagne,
  CarteTourEiffel,
  CarteVille,
} from "../components/tickets/Postales";
import {
  PhotoCarte,
  PhotoIdentite,
  PhotoVieille,
  PolaroidPlage,
  PolaroidPortrait,
  TicketCabine,
} from "../components/tickets/Photo";
import {
  CarteBoulanger,
  CarteConciergerie,
  CarteConducteur,
  CarteInfirmiere,
  CarteInstituteur,
  CarteJournaliste,
  CartePharmacien,
  CartePilote,
  CartePompier,
  CartePostier,
} from "../components/tickets/CartesTravail";
import {
  WebButtons,
  WebContact,
  WebCta,
  WebFaq,
  WebFeatures,
  WebFooter,
  WebHero,
  WebLogos,
  WebLogin,
  WebNavbar,
  WebNewsletter,
  WebPricing,
  WebStats,
  WebTestimonial,
} from "../components/tickets/Web";
import {
  Billet100FrancsDelacroix,
  Billet200FrancsEiffel,
  Billet50FrancsSaintExupery,
  Piece10CentimesLindauer,
  Piece10FrancsHercule,
  Piece1FrancSemeuse,
  Piece2FrancsChambreCommerce,
  TokenNYC1953,
  TokenNYC1970,
} from "../components/tickets/Numismatics";
import {
  SceauCireFleurDeLys,
  SceauCireMonogrammeRF,
  TamponArchives,
  TamponConfidentiel,
  TamponPaye,
  TamponPrioritaire,
  TamponVuApprouve,
} from "../components/tickets/SealsAndStamps";
import {
  BusConductorTicket,
  FerryTicket,
  MetroCarnet,
  PlatformTicket,
  RailwayTicket,
  SleeperCoupon,
  TollTicket,
  TramTransfer,
} from "../components/tickets/Transport";
import {
  BoxingTicket,
  MuseumAdmission,
  PoolTicket,
  RaceBetSlip,
  RideCoupons,
  SkatingTicket,
  StadiumTicket,
  WorldFairTicket,
} from "../components/tickets/Leisure";
import {
  BarberAppointment,
  LaundryClaim,
  ParcelReceipt,
  PawnTicket,
  PhotoBoothStrip,
  RepairOrder,
  ShoeRepairTag,
  ValetParkingClaim,
} from "../components/tickets/Services";
import {
  Aerogramme,
  CallingCard,
  FirstDayCover,
  ParcelLabel,
  PicturePostcard,
  PostalSavingsBook,
  RegisteredReceipt,
  TelegramForm,
} from "../components/tickets/Postal";
import {
  BallotPaper,
  ClubMembership,
  DanceCard,
  FuneralCard,
  LibraryCard,
  RationCoupons,
  UnionDuesCard,
  WeddingInvitation,
} from "../components/tickets/Social";
import {
  ApothecaryLabel,
  BusinessCard,
  CigarBand,
  MilkBottleCap,
  PerfumeLabel,
  SeedPacket,
  SoapWrapper,
  TradeCard,
} from "../components/tickets/Advertising";

export type CategoryId =
  | "voyage"
  | "transport"
  | "poste"
  | "cinema"
  | "spectacle"
  | "loisirs"
  | "bar"
  | "services"
  | "social"
  | "publicite"
  | "administratif"
  | "timbre"
  | "postale"
  | "photo"
  | "travail"
  | "web"
  | "monnaies"
  | "billets"
  | "sceaux";

export interface Category {
  id: CategoryId;
  numeral: string;
  name: string;
  tagline: string;
  description: string;
  accent: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "voyage",
    numeral: "I",
    name: "Voyage",
    tagline: "Cartes d'embarquement, timbres & étiquettes par avion",
    description:
      "Le carnet d'origine : cartes d'embarquement kraft, étiquettes par avion, timbres gravés et colis postaux. Tout ce qui reste dans la poche après un vol.",
    accent: "#d8b26a",
  },
  {
    id: "transport",
    numeral: "II",
    name: "Transport",
    tagline: "Rail, tramway, autobus, métro, ferry & péage",
    description:
      "La mobilité du quotidien : ticket cartonné de chemin de fer, correspondance de tramway, carnet de métro, traversée maritime, accès au quai et coupon de couchette.",
    accent: "#68a0b8",
  },
  {
    id: "poste",
    numeral: "III",
    name: "Poste",
    tagline: "Télégrammes, cartes, plis, colis & épargne postale",
    description:
      "Les traces matérielles de la correspondance : télégramme, carte postale, enveloppe premier jour, recommandé, étiquette de colis, aérogramme et carte de visite.",
    accent: "#7f9fc5",
  },
  {
    id: "cinema",
    numeral: "IV",
    name: "Cinéma",
    tagline: "Tickets de rouleau, talons, séances de minuit",
    description:
      "Du ticket de rouleau déchiré au billet de drive-in : la pellicule, la séance de minuit et le pop-corn, imprimés à l'ancienne.",
    accent: "#e2685c",
  },
  {
    id: "spectacle",
    numeral: "V",
    name: "Spectacle",
    tagline: "Opéra, cabaret, cirque, magie & coulisses",
    description:
      "Deux actes, quatre actes, ou un tour de magie : billets d'opéra et de ballet, revue de cabaret, chapiteau, festival et pass backstage.",
    accent: "#e3c06c",
  },
  {
    id: "loisirs",
    numeral: "VI",
    name: "Loisirs & sport",
    tagline: "Musées, expositions, fêtes, piscine, hippodrome & stade",
    description:
      "Les admissions hors scène : exposition universelle, fête foraine, piscine et patins, combat de boxe, pari hippique et grande finale au stade.",
    accent: "#d98257",
  },
  {
    id: "bar",
    numeral: "VII",
    name: "Bar",
    tagline: "Sous-bocks, consommations, additions & mots de passe",
    description:
      "Le zinc, le vestiaire et l'arrière-salle : sous-bocks tachés, carnets de consommations, cartes de cocktails et additions à la machine.",
    accent: "#e09a4a",
  },
  {
    id: "services",
    numeral: "VIII",
    name: "Commerce & services",
    tagline: "Reçus, dépôts, réparations, livraisons & retraits",
    description:
      "Le papier qui fait foi : reconnaissance du mont-de-piété, ticket de blanchisserie, cordonnerie, photomaton, récépissé de colis, rendez-vous et ordre de réparation.",
    accent: "#b8a15f",
  },
  {
    id: "social",
    numeral: "IX",
    name: "Vie sociale",
    tagline: "Bibliothèque, rationnement, invitations, associations & vote",
    description:
      "Les documents des liens civils et intimes : fiche de prêt, coupons de rationnement, mariage, souvenir funéraire, carnet de bal, cotisations et bulletin électoral.",
    accent: "#9a829f",
  },
  {
    id: "publicite",
    numeral: "X",
    name: "Publicité & emballages",
    tagline: "Cartes réclame, étiquettes, paquets & identité commerciale",
    description:
      "L'imprimé qui vend : chromolithographie publicitaire, sachet de graines, étiquette d'apothicaire, bague de cigare, savon, parfum, capsule de lait et carte de visite.",
    accent: "#79a477",
  },
  {
    id: "administratif",
    numeral: "XI",
    name: "Administratif",
    tagline: "Actes, certificats, formulaires & titres d'identité",
    description:
      "Les papiers qui officialisent la vie civile : acte de naissance, mariage, carte d'identité, passeport, bulletin de paie, déclaration d'impôt et permis de conduire.",
    accent: "#6d593f",
  },
  {
    id: "timbre",
    numeral: "XII",
    name: "Timbres",
    tagline: "Timbres-poste, fiscaux & carnets",
    description:
      "Les marques de l'affranchissement : Marianne, timbre fiscal, faune sauvage, monuments, carnet, enveloppe pré-timbrée, taxe mobile et aérien.",
    accent: "#b73e34",
  },
  {
    id: "postale",
    numeral: "XIII",
    name: "Cartes postales",
    tagline: "Souvenirs, voyages & correspondances",
    description:
      "Le recto illustré et le verso écrit : bord de mer, tour Eiffel, montagne, humour, ville, campagne, anniversaire et exposition.",
    accent: "#8a745d",
  },
  {
    id: "photo",
    numeral: "XIV",
    name: "Photo",
    tagline: "Polaroids, vieux tirages, identité & cabine",
    description:
      "L'image argentique : polaroids signés, vieux tirages sépia abîmés, carte photo timbrée, bande d'identité et ticket de cabine photographique.",
    accent: "#a58a6a",
  },
  {
    id: "travail",
    numeral: "XV",
    name: "Cartes de travail",
    tagline: "Badges professionnels, tous métiers",
    description:
      "La carte au laniard : postier, conducteur, concierge, pharmacien, journaliste, pilote, infirmière, boulanger, instituteur et pompier. Chacune se personnalise dans l'atelier.",
    accent: "#3e5c76",
  },
  {
    id: "web",
    numeral: "XVI",
    name: "Modules web",
    tagline: "Hero, navigation, tarifs, contact & composants UI",
    description:
      "Les mêmes principes, en numérique : sections hero, navigation, chiffres, tarifs, témoignage, contact, newsletter, appel à l'action, FAQ, pied de page, boutons, connexion et références. Chaque module est paramétrable.",
    accent: "#5b7fe0",
  },
  {
    id: "monnaies",
    numeral: "XVII",
    name: "Monnaies & Tokens",
    tagline: "Tokens de NYC percés au centre & pièces de monnaie de France",
    description:
      "Laiton et argent massif : tokens du métro de New York avec trou central découpé, 10 centimes Lindauer percée, Semeuse de Roty, 2 Francs Chambre de commerce et 10 Francs Hercule.",
    accent: "#cfa236",
  },
  {
    id: "billets",
    numeral: "XVIII",
    name: "Billets de banque",
    tagline: "Grands billets illustrés de la Banque de France",
    description:
      "Les grands billets historiques gravés : 100 Francs Delacroix avec La Liberté guidant le peuple, 50 Francs Saint-Exupéry et Le Petit Prince sur son astéroïde, 200 Francs Gustave Eiffel.",
    accent: "#b84235",
  },
  {
    id: "sceaux",
    numeral: "XIX",
    name: "Tampons & Cire",
    tagline: "Tampons d'atelier & sceaux de cire tamponnés avec ruban rouge",
    description:
      "Empreintes officielles et cachets d'époque : sceaux de cire rouge avec double ruban de soie en biseau (Fleur de Lys royale, Monogramme R.F.) et tampons d'atelier (Payé, Confidentiel, Vu & Approuvé, Archives, Prioritaire).",
    accent: "#bd2028",
  },
];

export interface Item {
  id: string;
  name: string;
  category: CategoryId;
  Component: ComponentType;
  /** Design size of the ticket (source pixels) */
  w: number;
  h: number;
  /** Resting tilt, in degrees */
  rotate: number;
  /** Champs éditables dans l'atelier (clé, libellé, valeur par défaut, taille suggérée) */
  editable?: {
    cle: string;
    label: string;
    valeur: string;
    taille?: number;
  }[];
}

/* ------------------------------------------------------------------ */
/*  Variants used only by the catalogue                                */
/* ------------------------------------------------------------------ */

const CinemaBlueStub = () => (
  <CinemaStub
    tone="blue"
    cinema="Le Palace"
    film="Roman d'été"
    date="Dim 3 août"
    heure="16h15"
    salle="2"
    place="C 7"
    prix="8,00 €"
  />
);

const CoasterGreen = () => (
  <Coaster
    tone="green"
    ring="Cave du Moulin ✦ cidre brut ✦ depuis 1921 ✦"
    drink="Cidre"
    sub="brut · doux · bouché"
  />
);

const CouponsGreen = () => <DrinkCoupons tone="green" word="Demi" start={512} />;

const OperaBlack = () => (
  <OperaTicket
    tone="black"
    venue="Palais Garnier"
    title="Carmen"
    composer="Opéra en quatre actes · Georges Bizet"
    date="Ven 6 déc."
    heure="19h30"
    place="Balcon · Rang 1 · 8"
    prix="62 €"
    number="0905"
  />
);

const BalletRose = () => (
  <OperaTicket
    tone="rose"
    venue="Théâtre des Ballets"
    title="Le Lac des Cygnes"
    composer="Ballet en quatre actes · P. I. Tchaïkovski"
    date="Dim 2 fév."
    heure="15h00"
    place="Loge 2 · Fauteuil 6"
    prix="38 €"
    number="2216"
  />
);

/* ------------------------------------------------------------------ */
/*  The 96 pieces                                                      */
/* ------------------------------------------------------------------ */

export const ITEMS: Item[] = [
  // ---- I · Voyage -------------------------------------------------
  { id: "rose-stamp", name: "Timbre rose « Billet 1 »", category: "voyage", Component: RoseStamp, w: 340, h: 190, rotate: 0.6 },
  { id: "orange-label", name: "Étiquette vierge à cadre orange", category: "voyage", Component: OrangeFrameLabel, w: 370, h: 230, rotate: 0 },
  { id: "red-plane", name: "Billet d'avion rouge CCS AIA", category: "voyage", Component: RedPlaneTicket, w: 300, h: 180, rotate: -1.2 },
  { id: "eagle-pass", name: "Étiquette par avion avec aigle", category: "voyage", Component: AirmailEaglePass, w: 285, h: 175, rotate: 0.8 },
  { id: "explore", name: "Billet « Explorer »", category: "voyage", Component: ExploreTicket, w: 405, h: 225, rotate: -0.8 },
  { id: "kraft-pass", name: "Carte d'embarquement kraft - New York → Paris", category: "voyage", Component: KraftBoardingPass, w: 555, h: 325, rotate: 0, editable: [
    { cle: "depart", label: "Départ", valeur: "NEW YORK" },
    { cle: "destination", label: "Destination", valeur: "PARIS" },
    { cle: "date", label: "Date", valeur: "18 SEPT" },
    { cle: "heure", label: "Heure", valeur: "10H30" },
    { cle: "porte", label: "Porte", valeur: "3" },
    { cle: "vol", label: "Vol", valeur: "AB815" },
    { cle: "siege", label: "Siège", valeur: "A22" },
  ]},
  { id: "rose-pass", name: "Carte d'embarquement rose - vol 304", category: "voyage", Component: RoseTypewriterPass, w: 565, h: 365, rotate: 0 },
  { id: "blank-ticket", name: "Ticket numéroté vierge", category: "voyage", Component: BlankNumberedTicket, w: 510, h: 175, rotate: -0.5 },
  { id: "blue-stamp", name: "Timbre bleu gravé avec avion", category: "voyage", Component: BlueStamp, w: 360, h: 216, rotate: 0.8 },
  { id: "mail-pink", name: "Étiquette « Courrier » rose", category: "voyage", Component: MailLabelPink, w: 325, h: 225, rotate: 0.6 },
  { id: "airmail-small", name: "Petite étiquette par avion", category: "voyage", Component: AirmailSmallLabel, w: 335, h: 205, rotate: -0.6 },
  { id: "cream-pass", name: "Carte d'embarquement crème - Edwards / Susan", category: "voyage", Component: CreamTypewriterPass, w: 425, h: 585, rotate: 0 },
  { id: "arrival", name: "Billet « Arrivée »", category: "voyage", Component: ArrivalTicket, w: 375, h: 215, rotate: 1 },
  { id: "tall-kraft", name: "Carte d'embarquement kraft - Los Angeles → New York", category: "voyage", Component: TallKraftPass, w: 430, h: 680, rotate: 0 },
  { id: "transair", name: "Carte d'embarquement Trans Air - Paris → New York", category: "voyage", Component: TransAirPass, w: 425, h: 620, rotate: 0 },
  { id: "baggage", name: "Ticket « Retrait bagages »", category: "voyage", Component: BaggageClaimTicket, w: 375, h: 245, rotate: 1.2 },
  { id: "airmail-large", name: "Grande étiquette par avion", category: "voyage", Component: AirmailLargeLabel, w: 535, h: 200, rotate: 0.5 },
  { id: "mail-small", name: "Petit laissez-passer « Courrier »", category: "voyage", Component: MailPassSmall, w: 275, h: 215, rotate: 1 },

  // ---- II · Cinéma ------------------------------------------------
  { id: "roll", name: "Ticket de rouleau « Entrée »", category: "cinema", Component: RollTicket, w: 380, h: 175, rotate: -1, editable: [
    { cle: "titre", label: "Titre du ticket", valeur: "ENTRÉE" },
    { cle: "organisation", label: "Organisation", valeur: "CINÉMA PARADIS" },
    { cle: "numero", label: "Numéro", valeur: "004217" },
    { cle: "sousTitre", label: "Sous-titre", valeur: "UNE PERSONNE" },
    { cle: "mention", label: "Mention", valeur: "NI REPRIS NI ÉCHANGÉ" },
  ]},
  { id: "stub", name: "Billet de salle à talon - Le Dernier Train", category: "cinema", Component: CinemaStub, w: 600, h: 235, rotate: 0, editable: [
    { cle: "cinema", label: "Cinéma", valeur: "LE GRAND ROYAL" },
    { cle: "film", label: "Film", valeur: "LE DERNIER TRAIN" },
    { cle: "date", label: "Date", valeur: "SAM 14 JUIN" },
    { cle: "heure", label: "Heure", valeur: "20H45" },
    { cle: "place", label: "Place", valeur: "F 12" },
    { cle: "salle", label: "Salle", valeur: "4" },
    { cle: "prix", label: "Tarif", valeur: "9,50 €" },
    { cle: "holder", label: "Invité", valeur: "" },
  ]},
  { id: "threed", name: "Séance en relief 3D", category: "cinema", Component: ThreeDTicket, w: 440, h: 220, rotate: 0.8 },
  { id: "member", name: "Carte de membre du ciné-club", category: "cinema", Component: MemberCard, w: 430, h: 270, rotate: -0.6 },
  { id: "film", name: "Bande de pellicule « Le Dernier Train »", category: "cinema", Component: FilmStripTicket, w: 780, h: 190, rotate: 0 },
  { id: "midnight", name: "Séance de minuit - art déco", category: "cinema", Component: MidnightTicket, w: 320, h: 460, rotate: 0.8 },
  { id: "clap", name: "Claquette - entrée plateau VIP", category: "cinema", Component: ClapperTicket, w: 430, h: 330, rotate: -0.8 },
  { id: "popcorn", name: "Bon pour un pop-corn", category: "cinema", Component: PopcornVoucher, w: 340, h: 280, rotate: 1 },
  { id: "drivein", name: "Billet de drive-in", category: "cinema", Component: DriveInTicket, w: 580, h: 285, rotate: 0.6 },
  { id: "stub-blue", name: "Billet de salle à talon - Roman d'été", category: "cinema", Component: CinemaBlueStub, w: 600, h: 235, rotate: -0.6 },

  // ---- III · Bar --------------------------------------------------
  { id: "coaster", name: "Sous-bock - Brasserie du Coin", category: "bar", Component: Coaster, w: 300, h: 300, rotate: -1 },
  { id: "coupons", name: "Carnet de tickets de consommation", category: "bar", Component: DrinkCoupons, w: 560, h: 170, rotate: 0.6 },
  { id: "menu", name: "Carte des cocktails", category: "bar", Component: CocktailMenu, w: 380, h: 570, rotate: -0.6 },
  { id: "receipt", name: "L'addition - Le Zinc", category: "bar", Component: BarReceipt, w: 310, h: 580, rotate: 0.8 },
  { id: "matchbook", name: "Pochette d'allumettes - Le Zinc", category: "bar", Component: Matchbook, w: 190, h: 270, rotate: 1.2 },
  { id: "speakeasy", name: "Carte d'accès du speakeasy", category: "bar", Component: SpeakeasyCard, w: 480, h: 300, rotate: -0.8, editable: [
    { cle: "venue", label: "Établissement", valeur: "LA CAVE N° 7" },
    { cle: "motto", label: "Mot de passe", valeur: "Frappez trois fois" },
    { cle: "holder", label: "Invité", valeur: "Mme Élise Marchand" },
    { cle: "number", label: "Numéro", valeur: "0007" },
    { cle: "until", label: "Validité", valeur: "31 DÉC." },
  ]},
  { id: "tag", name: "Jeton de vestiaire n° 47", category: "bar", Component: CloakroomTag, w: 230, h: 340, rotate: 0.8 },
  { id: "happy", name: "Ticket Happy Hour", category: "bar", Component: HappyHourTicket, w: 560, h: 260, rotate: 0.6 },
  { id: "coaster-green", name: "Sous-bock - Cave du Moulin", category: "bar", Component: CoasterGreen, w: 280, h: 280, rotate: 1 },
  { id: "coupons-green", name: "Tickets de dégustation", category: "bar", Component: CouponsGreen, w: 560, h: 170, rotate: -0.5 },

  // ---- IV · Spectacle ---------------------------------------------
  { id: "opera", name: "Billet d'opéra - La Traviata", category: "spectacle", Component: OperaTicket, w: 640, h: 250, rotate: -0.5, editable: [
    { cle: "title", label: "Titre ou noms des mariés", valeur: "La Traviata" },
    { cle: "venue", label: "Lieu / en-tête", valeur: "OPÉRA NATIONAL" },
    { cle: "composer", label: "Message d'invitation", valeur: "Opéra en trois actes · Giuseppe Verdi" },
    { cle: "date", label: "Date", valeur: "SAM 12 OCT." },
    { cle: "heure", label: "Heure", valeur: "20H00" },
    { cle: "place", label: "Place / table", valeur: "LOGE 3 · FAUTEUIL 14" },
    { cle: "prix", label: "Mention du talon", valeur: "45 €" },
    { cle: "holder", label: "Invité", valeur: "" },
  ]},
  { id: "cabaret", name: "Cabaret - Le Chat Noir", category: "spectacle", Component: CabaretTicket, w: 440, h: 300, rotate: 0.8 },
  { id: "circus", name: "Billet du Grand Cirque Lumière", category: "spectacle", Component: CircusTicket, w: 420, h: 300, rotate: -0.6 },
  { id: "magic", name: "Le Grand Illusionniste", category: "spectacle", Component: MagicTicket, w: 330, h: 480, rotate: 0.8 },
  { id: "jazz", name: "Festival - Nuit du Jazz", category: "spectacle", Component: JazzFestivalTicket, w: 660, h: 240, rotate: 0.6 },
  { id: "masks", name: "Théâtre des Deux Masques", category: "spectacle", Component: MasksTicket, w: 420, h: 280, rotate: -0.6 },
  { id: "seatplan", name: "Plan de salle - Orchestre, rang D", category: "spectacle", Component: SeatPlanTicket, w: 460, h: 300, rotate: 0.6 },
  { id: "backstage", name: "Pass backstage - Tous accès", category: "spectacle", Component: BackstagePass, w: 240, h: 350, rotate: 1 },
  { id: "opera-black", name: "Billet d'opéra - Carmen", category: "spectacle", Component: OperaBlack, w: 640, h: 250, rotate: -0.5 },
  { id: "ballet", name: "Billet de ballet - Le Lac des Cygnes", category: "spectacle", Component: BalletRose, w: 640, h: 250, rotate: 0.5 },

  // ---- V · Transport ----------------------------------------------
  { id: "rail-edmondson", name: "Chemin de fer - Paris à Rouen", category: "transport", Component: RailwayTicket, w: 360, h: 170, rotate: -0.6 },
  { id: "tram-transfer", name: "Correspondance de tramway", category: "transport", Component: TramTransfer, w: 190, h: 320, rotate: 0.8 },
  { id: "bus-conductor", name: "Ticket d'autobus à poinçonner", category: "transport", Component: BusConductorTicket, w: 280, h: 210, rotate: -0.5 },
  { id: "metro-carnet", name: "Carnet de cinq tickets de métro", category: "transport", Component: MetroCarnet, w: 560, h: 180, rotate: 0.4 },
  { id: "ferry", name: "Traversée maritime - Le Havre à Douvres", category: "transport", Component: FerryTicket, w: 520, h: 220, rotate: -0.5 },
  { id: "platform", name: "Billet d'accès au quai", category: "transport", Component: PlatformTicket, w: 290, h: 190, rotate: 0.7 },
  { id: "toll", name: "Reçu de péage autoroutier", category: "transport", Component: TollTicket, w: 270, h: 340, rotate: -0.8 },
  { id: "sleeper", name: "Coupon de couchette - Wagons-Lits", category: "transport", Component: SleeperCoupon, w: 520, h: 220, rotate: 0.5 },

  // ---- VI · Poste & correspondance --------------------------------
  { id: "telegram", name: "Formulaire de télégramme PTT", category: "poste", Component: TelegramForm, w: 520, h: 260, rotate: -0.5 },
  { id: "postcard", name: "Carte postale manuscrite", category: "poste", Component: PicturePostcard, w: 500, h: 300, rotate: 0.6 },
  { id: "first-day-cover", name: "Enveloppe premier jour - Tour Eiffel", category: "poste", Component: FirstDayCover, w: 520, h: 270, rotate: -0.5 },
  { id: "registered", name: "Récépissé d'envoi recommandé", category: "poste", Component: RegisteredReceipt, w: 300, h: 400, rotate: 0.6 },
  { id: "parcel-label", name: "Étiquette de colis postal express", category: "poste", Component: ParcelLabel, w: 520, h: 240, rotate: -0.7 },
  { id: "aerogramme", name: "Aérogramme par avion", category: "poste", Component: Aerogramme, w: 560, h: 300, rotate: 0.4 },
  { id: "savings-book", name: "Livret de Caisse d'épargne postale", category: "poste", Component: PostalSavingsBook, w: 300, h: 400, rotate: -0.5 },
  { id: "calling-card", name: "Carte de visite - Madame Laurent", category: "poste", Component: CallingCard, w: 440, h: 210, rotate: 0.5 },

  // ---- VII · Loisirs & sport --------------------------------------
  { id: "museum", name: "Entrée au Musée des Antiquités", category: "loisirs", Component: MuseumAdmission, w: 330, h: 270, rotate: -0.6 },
  { id: "world-fair", name: "Exposition universelle de Paris", category: "loisirs", Component: WorldFairTicket, w: 560, h: 220, rotate: 0.5 },
  { id: "ride-coupons", name: "Bons de manèges détachables", category: "loisirs", Component: RideCoupons, w: 600, h: 180, rotate: -0.4 },
  { id: "pool", name: "Entrée à la piscine municipale", category: "loisirs", Component: PoolTicket, w: 520, h: 220, rotate: 0.5 },
  { id: "skating", name: "Palais de la Glisse - patins inclus", category: "loisirs", Component: SkatingTicket, w: 500, h: 240, rotate: -0.7 },
  { id: "boxing", name: "Grand combat au Palais des Sports", category: "loisirs", Component: BoxingTicket, w: 580, h: 220, rotate: 0.5 },
  { id: "race-bet", name: "Bulletin de pari hippique", category: "loisirs", Component: RaceBetSlip, w: 310, h: 430, rotate: -0.5 },
  { id: "stadium", name: "Finale au Stade Municipal", category: "loisirs", Component: StadiumTicket, w: 480, h: 260, rotate: 0.7 },

  // ---- VIII · Commerce & services ---------------------------------
  { id: "pawn", name: "Reconnaissance du Mont-de-Piété", category: "services", Component: PawnTicket, w: 420, h: 310, rotate: -0.6 },
  { id: "laundry", name: "Triptyque de blanchisserie", category: "services", Component: LaundryClaim, w: 560, h: 180, rotate: 0.4 },
  { id: "shoe-repair", name: "Étiquette de cordonnerie", category: "services", Component: ShoeRepairTag, w: 230, h: 360, rotate: -0.6 },
  { id: "photobooth", name: "Bande de quatre photos d'identité", category: "services", Component: PhotoBoothStrip, w: 180, h: 520, rotate: 0.8 },
  { id: "parcel-receipt", name: "Récépissé des Messageries nationales", category: "services", Component: ParcelReceipt, w: 300, h: 420, rotate: -0.4 },
  { id: "barber", name: "Carte de rendez-vous du coiffeur", category: "services", Component: BarberAppointment, w: 330, h: 250, rotate: 0.6 },
  { id: "repair-order", name: "Ordre de réparation - poste de radio", category: "services", Component: RepairOrder, w: 420, h: 330, rotate: -0.5 },
  { id: "valet", name: "Ticket de voiturier - Garage Central", category: "services", Component: ValetParkingClaim, w: 520, h: 220, rotate: 0.5 },

  // ---- IX · Vie sociale & civique ---------------------------------
  { id: "library", name: "Fiche de prêt de bibliothèque", category: "social", Component: LibraryCard, w: 420, h: 290, rotate: -0.5 },
  { id: "ration", name: "Coupons de rationnement alimentaire", category: "social", Component: RationCoupons, w: 560, h: 190, rotate: 0.5 },
  { id: "wedding", name: "Faire-part de mariage", category: "social", Component: WeddingInvitation, w: 430, h: 310, rotate: -0.5 },
  { id: "funeral", name: "Image souvenir funéraire", category: "social", Component: FuneralCard, w: 280, h: 400, rotate: 0.5 },
  { id: "dance-card", name: "Carnet de bal annoté", category: "social", Component: DanceCard, w: 300, h: 430, rotate: -0.6 },
  { id: "membership", name: "Carte de sociétaire du Cercle Athlétique", category: "social", Component: ClubMembership, w: 430, h: 280, rotate: 0.5 },
  { id: "ballot", name: "Bulletin de vote municipal", category: "social", Component: BallotPaper, w: 350, h: 400, rotate: -0.5 },
  { id: "union-card", name: "Carte syndicale de cotisations", category: "social", Component: UnionDuesCard, w: 420, h: 300, rotate: 0.6 },

  // ---- X · Publicité & emballages ---------------------------------
  { id: "trade-card", name: "Carte réclame chromolithographiée", category: "publicite", Component: TradeCard, w: 480, h: 280, rotate: -0.5 },
  { id: "seed-packet", name: "Sachet de graines - Zinnia géant", category: "publicite", Component: SeedPacket, w: 280, h: 400, rotate: 0.6 },
  { id: "apothecary", name: "Étiquette d'apothicaire - Élixir tonique", category: "publicite", Component: ApothecaryLabel, w: 460, h: 260, rotate: -0.5 },
  { id: "cigar-band", name: "Bague de cigare - Don Carlos", category: "publicite", Component: CigarBand, w: 620, h: 180, rotate: 0.4 },
  { id: "soap-wrapper", name: "Papier de savon - Le Cygne", category: "publicite", Component: SoapWrapper, w: 380, h: 300, rotate: -0.5 },
  { id: "perfume", name: "Étiquette de parfum - Étoile de Paris", category: "publicite", Component: PerfumeLabel, w: 290, h: 390, rotate: 0.6 },
  { id: "milk-cap", name: "Capsule de bouteille de lait", category: "publicite", Component: MilkBottleCap, w: 300, h: 300, rotate: -0.5 },
  { id: "business-card", name: "Carte commerciale d'imprimeur", category: "publicite", Component: BusinessCard, w: 460, h: 230, rotate: 0.5 },

  // ---- XI · Administratif ----------------------------------------------
  { id: "acte-naissance", name: "Acte de naissance - Mairie de Paris", category: "administratif", Component: ActeNaissance, w: 520, h: 320, rotate: -0.5, editable: [
    { cle: "nom", label: "Nom", valeur: "DURAND", taille: 44 },
    { cle: "prenoms", label: "Prénoms", valeur: "JEAN-PIERRE MARIE", taille: 28 },
    { cle: "date", label: "Date de naissance", valeur: "15 MARS 1948", taille: 22 },
    { cle: "lieu", label: "Lieu de naissance", valeur: "PARIS 12E", taille: 22 },
  ]},
  { id: "certificat-mariage", name: "Certificat de mariage", category: "administratif", Component: CertificatMariage, w: 520, h: 300, rotate: 0.5 },
  { id: "declaration-impots", name: "Déclaration annuelle des revenus", category: "administratif", Component: DeclarationImpots, w: 480, h: 340, rotate: -0.6 },
  { id: "bulletin-paie", name: "Bulletin de paie", category: "administratif", Component: BulletinPaie, w: 480, h: 300, rotate: 0.5 },
  { id: "carte-identite", name: "Carte nationale d'identité", category: "administratif", Component: CarteIdentite, w: 420, h: 290, rotate: -0.5 },
  { id: "passeport", name: "Passeport français", category: "administratif", Component: Passeport, w: 520, h: 330, rotate: 0.6 },
  { id: "certificat-scolarite", name: "Certificat de scolarité", category: "administratif", Component: CertificatScolarite, w: 480, h: 280, rotate: -0.5, editable: [
    { cle: "titre", label: "Titre", valeur: "CERTIFICAT DE SCOLARITÉ" },
    { cle: "emetteur", label: "Émetteur", valeur: "ÉTABLISSEMENT SCOLAIRE" },
    { cle: "etablissement", label: "Établissement", valeur: "LYCÉE HENRI IV" },
    { cle: "eleve", label: "Bénéficiaire", valeur: "SOPHIE DUPONT" },
    { cle: "classe", label: "Classe / statut", valeur: "SECONDE C" },
    { cle: "annee", label: "Année", valeur: "1985-1986" },
  ]},
  { id: "livret-famille", name: "Livret de famille", category: "administratif", Component: LivretFamille, w: 420, h: 320, rotate: 0.5 },
  { id: "declaration-revenus", name: "Déclaration de revenus 2047", category: "administratif", Component: DeclarationRevenus, w: 480, h: 320, rotate: -0.4 },
  { id: "permis-conduire", name: "Permis de conduire", category: "administratif", Component: PermisConduire, w: 420, h: 290, rotate: 0.5 },

  // ---- XII · Timbres ----------------------------------------------
  { id: "timbre-marianne", name: "Timbres-poste Marianne", category: "timbre", Component: TimbreMarianne, w: 300, h: 200, rotate: -0.5, editable: [
    { cle: "valeur", label: "Valeur faciale", valeur: "1,20 F", taille: 70 },
  ]},
  { id: "timbre-fiscal", name: "Timbre fiscal", category: "timbre", Component: TimbreFiscal, w: 300, h: 200, rotate: 0.5, editable: [
    { cle: "valeur", label: "Valeur faciale", valeur: "10 F", taille: 70 },
  ]},
  { id: "timbre-oiseau", name: "Timbre faune sauvage", category: "timbre", Component: TimbreOiseau, w: 300, h: 200, rotate: -0.5, editable: [
    { cle: "valeur", label: "Valeur faciale", valeur: "0,90 F", taille: 50 },
    { cle: "annee", label: "Année", valeur: "1982", taille: 30 },
  ]},
  { id: "timbre-monument", name: "Timbre monument historique", category: "timbre", Component: TimbreMonument, w: 300, h: 200, rotate: 0.5, editable: [
    { cle: "valeur", label: "Valeur faciale", valeur: "1,50 F", taille: 50 },
    { cle: "nom", label: "Monument", valeur: "TOUR EIFFEL", taille: 24 },
  ]},
  { id: "carnet-timbres", name: "Carnet de timbres", category: "timbre", Component: CarnetTimbres, w: 400, h: 220, rotate: -0.6, editable: [
    { cle: "total", label: "Valeur totale", valeur: "6 F", taille: 40 },
  ]},
  { id: "enveloppe-pre-timbre", name: "Enveloppe pré-timbrée", category: "timbre", Component: EnveloppePreTimbre, w: 560, h: 260, rotate: 0.5, editable: [
    { cle: "valeur", label: "Valeur du timbre", valeur: "0,80", taille: 32 },
  ]},
  { id: "taxe-timbre", name: "Taxe de timbre mobile", category: "timbre", Component: TaxeTimbre, w: 300, h: 200, rotate: -0.5, editable: [
    { cle: "valeur", label: "Valeur de la taxe", valeur: "50 c", taille: 55 },
  ]},
  { id: "timbre-aerien", name: "Timbres-poste aérien", category: "timbre", Component: TimbreAerien, w: 300, h: 200, rotate: 0.5, editable: [
    { cle: "valeur", label: "Valeur faciale", valeur: "2,40 F", taille: 50 },
  ]},

  // ---- XIII · Cartes postales ----------------------------------------------
  { id: "carte-mer", name: "Carte postale - bord de mer", category: "postale", Component: CarteMer, w: 480, h: 300, rotate: -0.5, editable: [
    { cle: "message", label: "Message manuscrit", valeur: "Chère Maman, Le soleil brille sur la plage. À bientôt, Luc", taille: 20 },
    { cle: "destinataire", label: "Destinataire", valeur: "MLLE DURAND", taille: 22 },
  ]},
  { id: "carte-tour-eiffel", name: "Carte postale - Tour Eiffel", category: "postale", Component: CarteTourEiffel, w: 480, h: 300, rotate: 0.5, editable: [
    { cle: "message", label: "Message manuscrit", valeur: "Bonjour de Paris, La tour est magnifique. Paul", taille: 20 },
    { cle: "destinataire", label: "Destinataire", valeur: "MME MARTIN", taille: 22 },
  ]},
  { id: "carte-montagne", name: "Carte postale - montagne", category: "postale", Component: CarteMontagne, w: 480, h: 300, rotate: -0.5, editable: [
    { cle: "message", label: "Message manuscrit", valeur: "Air pur, paysages superbes. Claire", taille: 20 },
    { cle: "destinataire", label: "Destinataire", valeur: "MLLE LEROUX", taille: 22 },
  ]},
  { id: "carte-humour", name: "Carte postale - humour", category: "postale", Component: CarteHumour, w: 400, h: 300, rotate: 0.5, editable: [
    { cle: "titre", label: "Titre de la carte", valeur: "CARTES POSTALES EN VACANCES", taille: 22 },
    { cle: "destinataire", label: "Destinataire", valeur: "M. PETIT", taille: 22 },
  ]},
  { id: "carte-ville", name: "Carte postale - ville ancienne", category: "postale", Component: CarteVille, w: 480, h: 300, rotate: -0.6, editable: [
    { cle: "message", label: "Message manuscrit", valeur: "Vieux quartiers, pavés et histoires. Marc", taille: 20 },
    { cle: "destinataire", label: "Destinataire", valeur: "MME LEFEBVRE", taille: 22 },
  ]},
  { id: "carte-campagne", name: "Carte postale - campagne", category: "postale", Component: CarteCampagne, w: 480, h: 300, rotate: 0.5, editable: [
    { cle: "message", label: "Message manuscrit", valeur: "Bonjour de la ferme, les champs sont verts. Sophie", taille: 20 },
    { cle: "destinataire", label: "Destinataire", valeur: "M. BERNARD", taille: 22 },
  ]},
  { id: "carte-anniversaire", name: "Carte postale - anniversaire", category: "postale", Component: CarteAnniversaire, w: 480, h: 300, rotate: -0.5, editable: [
    { cle: "message", label: "Message manuscrit", valeur: "Joyeux anniversaire, plein de bisous. Tom", taille: 20 },
    { cle: "destinataire", label: "Destinataire", valeur: "MME DUVAL", taille: 22 },
  ]},
  { id: "carte-exposition", name: "Carte postale - exposition", category: "postale", Component: CarteExposition, w: 480, h: 300, rotate: 0.6, editable: [
    { cle: "message", label: "Message manuscrit", valeur: "Magnifique musée, œuvres surprenantes. Clara", taille: 20 },
    { cle: "destinataire", label: "Destinataire", valeur: "MLLE MOREAU", taille: 22 },
  ]},

  // ---- XIV · Photo -------------------------------------------------
  { id: "polaroid-plage", name: "Polaroid - la plage, 1957", category: "photo", Component: PolaroidPlage, w: 300, h: 380, rotate: -0.6, editable: [
    { cle: "legende", label: "Légende manuscrite", valeur: "La plage, juillet 1957", taille: 24 },
  ]},
  { id: "polaroid-portrait", name: "Polaroid - portrait, rue des Martyrs", category: "photo", Component: PolaroidPortrait, w: 300, h: 380, rotate: 0.7, editable: [
    { cle: "legende", label: "Légende manuscrite", valeur: "Paris, rue des Martyrs", taille: 24 },
  ]},
  { id: "photo-vieille", name: "Vieux tirage sépia abîmé", category: "photo", Component: PhotoVieille, w: 340, h: 300, rotate: -0.5, editable: [
    { cle: "legende", label: "Légende", valeur: "Les Dupont, au jardin", taille: 22 },
    { cle: "annee", label: "Année", valeur: "été 1949", taille: 18 },
  ]},
  { id: "photo-carte", name: "Carte photo timbrée et tamponnée", category: "photo", Component: PhotoCarte, w: 340, h: 300, rotate: 0.6, editable: [
    { cle: "legende", label: "Légende", valeur: "La promenade au bois", taille: 22 },
    { cle: "annee", label: "Année du tampon", valeur: "1936", taille: 18 },
  ]},
  { id: "photo-identite", name: "Photo d'identité - bande de quatre", category: "photo", Component: PhotoIdentite, w: 300, h: 400, rotate: -0.5, editable: [
    { cle: "nom", label: "Nom du titulaire", valeur: "MARTIN JEANNE", taille: 22 },
  ]},
  { id: "ticket-cabine", name: "Ticket de cabine photo", category: "photo", Component: TicketCabine, w: 280, h: 220, rotate: 0.5, editable: [
    { cle: "nom", label: "Nom (pré-rempli)", valeur: "", taille: 20 },
  ]},

  // ---- XV · Cartes de travail --------------------------------------
  { id: "carte-postier", name: "Carte de travail - Postier", category: "travail", Component: CartePostier, w: 440, h: 280, rotate: -0.5, editable: [
    { cle: "metier", label: "Métier", valeur: "Postier", taille: 22 },
    { cle: "nom", label: "Titulaire", valeur: "DUPONT ANDRÉ", taille: 20 },
    { cle: "numero", label: "Matricule", valeur: "04821", taille: 14 },
  ]},
  { id: "carte-conducteur", name: "Carte de travail - Conducteur de train", category: "travail", Component: CarteConducteur, w: 440, h: 280, rotate: 0.5, editable: [
    { cle: "metier", label: "Métier", valeur: "Conducteur de train", taille: 22 },
    { cle: "nom", label: "Titulaire", valeur: "LEFEVRE JEAN", taille: 20 },
    { cle: "numero", label: "Matricule", valeur: "11207", taille: 14 },
  ]},
  { id: "carte-conciergerie", name: "Carte de travail - Concierge", category: "travail", Component: CarteConciergerie, w: 440, h: 280, rotate: -0.6, editable: [
    { cle: "metier", label: "Métier", valeur: "Concierge", taille: 22 },
    { cle: "nom", label: "Titulaire", valeur: "MOREAU HENRI", taille: 20 },
    { cle: "numero", label: "Matricule", valeur: "00314", taille: 14 },
  ]},
  { id: "carte-pharmacien", name: "Carte de travail - Pharmacien", category: "travail", Component: CartePharmacien, w: 440, h: 280, rotate: 0.6, editable: [
    { cle: "metier", label: "Métier", valeur: "Pharmacien", taille: 22 },
    { cle: "nom", label: "Titulaire", valeur: "DURAND MARIE", taille: 20 },
    { cle: "numero", label: "Matricule", valeur: "07789", taille: 14 },
  ]},
  { id: "carte-journaliste", name: "Carte de travail - Journaliste", category: "travail", Component: CarteJournaliste, w: 440, h: 280, rotate: -0.5, editable: [
    { cle: "metier", label: "Rôle", valeur: "Journaliste", taille: 22 },
    { cle: "nom", label: "Titulaire", valeur: "LEROY CLAUDE", taille: 20 },
    { cle: "numero", label: "Numéro de carte", valeur: "02951", taille: 14 },
  ]},
  { id: "carte-pilote", name: "Carte de travail - Pilote", category: "travail", Component: CartePilote, w: 440, h: 280, rotate: 0.5, editable: [
    { cle: "metier", label: "Rôle", valeur: "Pilote", taille: 22 },
    { cle: "nom", label: "Titulaire", valeur: "BERNARD PAUL", taille: 20 },
    { cle: "numero", label: "Matricule", valeur: "00118", taille: 14 },
  ]},
  { id: "carte-infirmiere", name: "Carte de travail - Infirmière", category: "travail", Component: CarteInfirmiere, w: 440, h: 280, rotate: -0.6, editable: [
    { cle: "metier", label: "Rôle", valeur: "Infirmière", taille: 22 },
    { cle: "nom", label: "Titulaire", valeur: "MARTIN JEANNE", taille: 20 },
    { cle: "numero", label: "Matricule", valeur: "06342", taille: 14 },
  ]},
  { id: "carte-boulanger", name: "Carte de travail - Boulanger", category: "travail", Component: CarteBoulanger, w: 440, h: 280, rotate: 0.5, editable: [
    { cle: "metier", label: "Métier", valeur: "Boulanger", taille: 22 },
    { cle: "nom", label: "Titulaire", valeur: "PETIT LOUIS", taille: 20 },
    { cle: "numero", label: "Matricule", valeur: "03956", taille: 14 },
  ]},
  { id: "carte-instituteur", name: "Carte de travail - Instituteur", category: "travail", Component: CarteInstituteur, w: 440, h: 280, rotate: -0.5, editable: [
    { cle: "metier", label: "Rôle", valeur: "Instituteur", taille: 22 },
    { cle: "nom", label: "Titulaire", valeur: "ROUSSEAU MARIE", taille: 20 },
    { cle: "numero", label: "Matricule", valeur: "08417", taille: 14 },
  ]},
  { id: "carte-pompier", name: "Carte de travail - Pompier", category: "travail", Component: CartePompier, w: 440, h: 280, rotate: 0.6, editable: [
    { cle: "metier", label: "Rôle", valeur: "Pompier", taille: 22 },
    { cle: "nom", label: "Titulaire", valeur: "GARCIA PIERRE", taille: 20 },
    { cle: "numero", label: "Matricule", valeur: "01764", taille: 14 },
  ]},

  // ---- XVI · Modules web -------------------------------------------
  { id: "web-hero", name: "Module web - section hero", category: "web", Component: WebHero, w: 560, h: 300, rotate: -0.4, editable: [
    { cle: "titre", label: "Titre", valeur: "L'atelier du matin", taille: 24 },
    { cle: "sous", label: "Sous-titre", valeur: "Des pièces d'exception, composées à la main et prêtes à imprimer.", taille: 18 },
    { cle: "cta", label: "Bouton principal", valeur: "Découvrir la collection", taille: 16 },
  ]},
  { id: "web-navbar", name: "Module web - barre de navigation", category: "web", Component: WebNavbar, w: 560, h: 112, rotate: 0.4, editable: [
    { cle: "marque", label: "Nom de la marque", valeur: "MAISON", taille: 16 },
  ]},
  { id: "web-features", name: "Module web - caractéristiques", category: "web", Component: WebFeatures, w: 560, h: 300, rotate: -0.4, editable: [
    { cle: "titre", label: "Titre de section", valeur: "Trois raisons de rester", taille: 22 },
  ]},
  { id: "web-stats", name: "Module web - chiffres clés", category: "web", Component: WebStats, w: 560, h: 168, rotate: 0.4, editable: [
    { cle: "valeur", label: "Premier chiffre", valeur: "152", taille: 18 },
    { cle: "label", label: "Sa légende", valeur: "pièces", taille: 16 },
  ]},
  { id: "web-pricing", name: "Module web - tarifs", category: "web", Component: WebPricing, w: 560, h: 360, rotate: -0.5, editable: [
    { cle: "plan", label: "Nom du plan", valeur: "Essentiel", taille: 18 },
    { cle: "prix", label: "Prix mensuel", valeur: "29 €", taille: 20 },
  ]},
  { id: "web-testimonial", name: "Module web - témoignage", category: "web", Component: WebTestimonial, w: 560, h: 232, rotate: 0.5, editable: [
    { cle: "cite", label: "Citation", valeur: "J'ai retrouvé le ticket de mon premier cinéma, et je l'ai re-composé à mon nom.", taille: 18 },
    { cle: "auteur", label: "Auteur", valeur: "H. Moreau", taille: 18 },
  ]},
  { id: "web-contact", name: "Module web - bloc contact", category: "web", Component: WebContact, w: 560, h: 360, rotate: -0.4, editable: [
    { cle: "titre", label: "Titre", valeur: "Nous écrire", taille: 20 },
    { cle: "email", label: "Adresse e-mail", valeur: "bonjour@maison.fr", taille: 16 },
  ]},
  { id: "web-newsletter", name: "Module web - newsletter", category: "web", Component: WebNewsletter, w: 560, h: 168, rotate: 0.4, editable: [
    { cle: "titre", label: "Titre", valeur: "Le bulletin du dimanche", taille: 18 },
    { cle: "cta", label: "Bouton", valeur: "S'abonner", taille: 16 },
  ]},
  { id: "web-cta", name: "Module web - appel à l'action", category: "web", Component: WebCta, w: 560, h: 190, rotate: -0.4, editable: [
    { cle: "titre", label: "Titre", valeur: "Prêt à composer votre pièce ?", taille: 20 },
    { cle: "cta", label: "Bouton", valeur: "Commencer gratuitement", taille: 16 },
  ]},
  { id: "web-faq", name: "Module web - questions fréquentes", category: "web", Component: WebFaq, w: 560, h: 300, rotate: 0.4, editable: [
    { cle: "question", label: "Première question", valeur: "Puis-je imprimer mes pièces ?", taille: 18 },
  ]},
  { id: "web-footer", name: "Module web - pied de page", category: "web", Component: WebFooter, w: 560, h: 240, rotate: -0.4, editable: [
    { cle: "marque", label: "Marque", valeur: "MAISON", taille: 16 },
    { cle: "annee", label: "Mention légale", valeur: "© 1962", taille: 14 },
  ]},
  { id: "web-buttons", name: "Module web - jeu de boutons", category: "web", Component: WebButtons, w: 560, h: 180, rotate: 0.4, editable: [
    { cle: "label", label: "Libellé principal", valeur: "Valider", taille: 16 },
  ]},
  { id: "web-login", name: "Module web - connexion", category: "web", Component: WebLogin, w: 560, h: 320, rotate: -0.5, editable: [
    { cle: "titre", label: "Titre", valeur: "Se connecter", taille: 20 },
  ]},
  { id: "web-logos", name: "Module web - bande de références", category: "web", Component: WebLogos, w: 560, h: 140, rotate: 0.4, editable: [
    { cle: "titre", label: "Titre", valeur: "Ils composent avec la Maison", taille: 18 },
  ]},

  // ---- XVII · Monnaies & Tokens ------------------------------------
  { id: "token-nyc-1953", name: "Token NYC 1953 - Small Y percé au centre", category: "monnaies", Component: TokenNYC1953, w: 260, h: 260, rotate: -1.2, editable: [
    { cle: "annee", label: "Année frappée", valeur: "1953", taille: 10 },
  ]},
  { id: "token-nyc-1970", name: "Token NYC 1970 - Large Y percé au centre", category: "monnaies", Component: TokenNYC1970, w: 260, h: 260, rotate: 1.5, editable: [
    { cle: "annee", label: "Année frappée", valeur: "1970", taille: 10 },
  ]},
  { id: "piece-10c-lindauer", name: "10 Centimes Lindauer 1917 - Pièce percée au centre", category: "monnaies", Component: Piece10CentimesLindauer, w: 260, h: 260, rotate: -0.8, editable: [
    { cle: "annee", label: "Millésime", valeur: "1917", taille: 10 },
  ]},
  { id: "piece-1f-semeuse", name: "1 Franc Semeuse - Oscar Roty (Argent)", category: "monnaies", Component: Piece1FrancSemeuse, w: 260, h: 260, rotate: 0.6, editable: [
    { cle: "annee", label: "Millésime", valeur: "1960", taille: 10 },
  ]},
  { id: "piece-2f-chambre-commerce", name: "2 Francs Chambre de Commerce 1923 - Bon pour 2 Francs", category: "monnaies", Component: Piece2FrancsChambreCommerce, w: 260, h: 260, rotate: -0.5, editable: [
    { cle: "annee", label: "Millésime", valeur: "1923", taille: 10 },
  ]},
  { id: "piece-10f-hercule", name: "10 Francs Hercule - Argent massif", category: "monnaies", Component: Piece10FrancsHercule, w: 270, h: 270, rotate: 1, editable: [
    { cle: "annee", label: "Millésime", valeur: "1965", taille: 10 },
  ]},

  // ---- XVIII · Billets de banque -----------------------------------
  { id: "billet-100f-delacroix", name: "100 Francs Delacroix - La Liberté guidant le peuple", category: "billets", Component: Billet100FrancsDelacroix, w: 560, h: 280, rotate: -0.5, editable: [
    { cle: "serie", label: "Numéro de série", valeur: "Y.184 07482", taille: 20 },
    { cle: "date", label: "Date d'émission", valeur: "06-05-1982", taille: 14 },
  ]},
  { id: "billet-50f-st-exupery", name: "50 Francs Saint-Exupéry - Le Petit Prince & B612", category: "billets", Component: Billet50FrancsSaintExupery, w: 540, h: 280, rotate: 0.6, editable: [
    { cle: "serie", label: "Numéro de série", valeur: "T.042 19827", taille: 20 },
    { cle: "date", label: "Date de création", valeur: "18-03-1993", taille: 14 },
  ]},
  { id: "billet-200f-eiffel", name: "200 Francs Gustave Eiffel - Tour Eiffel", category: "billets", Component: Billet200FrancsEiffel, w: 560, h: 280, rotate: -0.6, editable: [
    { cle: "serie", label: "Numéro de série", valeur: "E.014 83921", taille: 20 },
    { cle: "date", label: "Date d'émission", valeur: "12-10-1995", taille: 14 },
  ]},

  // ---- XIX · Tampons & Cire ----------------------------------------
  { id: "sceau-fleur-de-lys", name: "Sceau de cire rouge - Fleur de Lys avec ruban de soie", category: "sceaux", Component: SceauCireFleurDeLys, w: 220, h: 290, rotate: -1, editable: [
    { cle: "devise", label: "Devise royale circulaire", valeur: "SEMPER FIDELIS", taille: 20 },
  ]},
  { id: "sceau-monogramme-rf", name: "Sceau de cire carmin - Monogramme R.F. avec ruban", category: "sceaux", Component: SceauCireMonogrammeRF, w: 220, h: 290, rotate: 1.2, editable: [
    { cle: "initiales", label: "Initiales ciselées", valeur: "R · F", taille: 10 },
  ]},
  { id: "tampon-paye", name: "Tampon d'atelier - PAYÉ avec date", category: "sceaux", Component: TamponPaye, w: 320, h: 180, rotate: -4.5, editable: [
    { cle: "date", label: "Date acquittée", valeur: "14 OCT. 1958", taille: 16 },
    { cle: "montant", label: "Mention de règlement", valeur: "ACQUITTÉ", taille: 16 },
  ]},
  { id: "tampon-confidentiel", name: "Tampon d'atelier - CONFIDENTIEL", category: "sceaux", Component: TamponConfidentiel, w: 320, h: 160, rotate: 5.5, editable: [
    { cle: "mention", label: "Niveau d'accréditation", valeur: "DIFFUSION RESTREINTE", taille: 24 },
  ]},
  { id: "tampon-vu-approuve", name: "Tampon de bureau - VU ET APPROUVÉ", category: "sceaux", Component: TamponVuApprouve, w: 320, h: 180, rotate: -2.8, editable: [
    { cle: "signataire", label: "Titre du signataire", valeur: "LE DIRECTEUR", taille: 20 },
    { cle: "date", label: "Date de validation", valeur: "12 MAI 1963", taille: 14 },
  ]},
  { id: "tampon-archives", name: "Tampon officiel - ARCHIVES NATIONALES", category: "sceaux", Component: TamponArchives, w: 240, h: 240, rotate: 3.5, editable: [
    { cle: "annee", label: "Millésime d'archivage", valeur: "1954", taille: 10 },
  ]},
  { id: "tampon-prioritaire", name: "Tampon d'expédition - PRIORITAIRE", category: "sceaux", Component: TamponPrioritaire, w: 320, h: 150, rotate: -7, editable: [
    { cle: "service", label: "Mention de service", valeur: "SERVICE RAPIDE", taille: 20 },
  ]},
];

/** Stable index following the catalogue order. */
export const ITEM_INDEX: Record<string, number> = Object.fromEntries(
  ITEMS.map((it, i) => [it.id, i + 1]),
);

export const countOf = (id: CategoryId): number => ITEMS.filter((i) => i.category === id).length;
