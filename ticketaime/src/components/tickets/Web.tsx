import type { CSSProperties, ReactNode, MouseEvent } from "react";
import { u } from "../../lib/units";
import { F } from "../../lib/fonts";

/* ------------------------------------------------------------------ */
/*  Palette & primitives du "spécimen" web — modules fonctionnels      */
/* ------------------------------------------------------------------ */

const ENCRE = "#232833";
const DOUC = "#5a6172";
const ACCENT = "#2f5fd0";
const LIGNE = "#c9cfdb";
const ECRAN = "#f4f6f9";

type P = { personnalisation?: Record<string, string> };

/** Les liens internes au canevas ne doivent pas déclencher le drag de la pièce. */
const stop = (e: MouseEvent) => e.stopPropagation();

function Lien({
  href,
  cible,
  style,
  children,
  title,
}: {
  href?: string;
  cible?: string;
  style?: CSSProperties;
  children: ReactNode;
  title?: string;
}) {
  if (!href) return <span style={style}>{children}</span>;
  return (
    <a
      href={href}
      target={cible || undefined}
      rel={cible === "_blank" ? "noreferrer" : undefined}
      title={title || href}
      onPointerDown={stop}
      onClick={stop}
      style={{ ...style, textDecoration: "none", cursor: "pointer" }}
    >
      {children}
    </a>
  );
}

function WebFrame({ label, children }: { label: string; children: ReactNode }) {
  const dot = (c: string): CSSProperties => ({ width: u(7), height: u(7), borderRadius: "50%", background: c, flex: "none" });
  return (
    <div className="paper paper-dark w-full h-full flex flex-col" style={{ borderRadius: u(6), overflow: "hidden" }}>
      <div
        className="flex flex-none"
        style={{ height: u(26), background: "#12151c", alignItems: "center", gap: u(6), padding: `0 ${u(10)}` }}
      >
        <span style={dot("#e05252")} />
        <span style={dot("#e0b23e")} />
        <span style={dot("#4fae62")} />
        <span style={{ marginLeft: u(8), fontFamily: F.mono, fontSize: u(8), letterSpacing: u(2.5), color: "#8a93a6", textTransform: "uppercase" }}>
          {label}
        </span>
      </div>
      <div className="min-h-0 flex-1" style={{ background: ECRAN, color: ENCRE, padding: `${u(14)} ${u(18)}`, overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

const titre = (s = u(26)): CSSProperties => ({ fontFamily: F.cond, fontWeight: 700, fontSize: s, lineHeight: 1.1, letterSpacing: u(0.5) });
const corps: CSSProperties = { fontFamily: F.type, fontSize: u(10.5), lineHeight: 1.55, color: DOUC };
const labelChamp: CSSProperties = { fontFamily: F.cond, fontWeight: 600, fontSize: u(8.5), letterSpacing: u(2), textTransform: "uppercase", color: DOUC, marginBottom: u(4) };
const champ: CSSProperties = { border: `${u(1.5)} solid ${LIGNE}`, background: "#fff", padding: `${u(7)} ${u(10)}`, fontFamily: F.type, fontSize: u(10.5), color: ENCRE };

const stylePrimaire: CSSProperties = {
  display: "inline-block",
  background: ACCENT,
  color: "#fff",
  fontFamily: F.cond,
  fontWeight: 600,
  fontSize: u(11),
  letterSpacing: u(1.5),
  textTransform: "uppercase",
  padding: `${u(7)} ${u(16)}`,
  borderRadius: u(3),
};
const styleGhost: CSSProperties = {
  display: "inline-block",
  border: `${u(1.5)} solid ${ACCENT}`,
  color: ACCENT,
  fontFamily: F.cond,
  fontWeight: 600,
  fontSize: u(11),
  letterSpacing: u(1.5),
  textTransform: "uppercase",
  padding: `${u(6.5)} ${u(15.5)}`,
  borderRadius: u(3),
  background: "#fff",
};

const boutonPrimaire = (label: string, href?: string, cible?: string): ReactNode => (
  <Lien href={href} cible={cible} style={stylePrimaire}>{label}</Lien>
);
const boutonGhost = (label: string, href?: string, cible?: string): ReactNode => (
  <Lien href={href} cible={cible} style={styleGhost}>{label}</Lien>
);
const losange = (c: string): CSSProperties => ({ width: u(26), height: u(26), borderRadius: u(4), background: c, flex: "none" });

/* ------------------------------------------------------------------ */
/*  1. Hero                                                            */
/* ------------------------------------------------------------------ */

export function WebHero({ personnalisation }: P) {
  const t = personnalisation?.titre ?? "L'atelier du matin";
  const s = personnalisation?.sous ?? "Des pièces d'exception, composées à la main et prêtes à imprimer.";
  const c = personnalisation?.cta ?? "Découvrir la collection";
  const ctaUrl = personnalisation?.ctaUrl ?? "#collection";
  const secondUrl = personnalisation?.secondUrl ?? "#atelier";
  const cible = personnalisation?.cible ?? "_self";
  return (
    <WebFrame label="module · hero">
      <div style={{ textAlign: "center" }}>
        <span style={{ fontFamily: F.cond, fontWeight: 700, fontSize: u(9), letterSpacing: u(4), color: ACCENT, textTransform: "uppercase" }}>
          Maison fondée en 1958
        </span>
        <h1 style={{ ...titre(u(30)), margin: `${u(8)} 0 ${u(6)}` }}>{t}</h1>
        <p style={{ ...corps, margin: "0 0", maxWidth: u(300), marginLeft: "auto", marginRight: "auto" }}>{s}</p>
        <div className="flex justify-center" style={{ gap: u(10), marginTop: u(14) }}>
          {boutonPrimaire(c, ctaUrl, cible)}
          {boutonGhost("Catalogue", secondUrl, cible)}
        </div>
      </div>
    </WebFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  2. Barre de navigation                                             */
/* ------------------------------------------------------------------ */

export function WebNavbar({ personnalisation }: P) {
  const marque = personnalisation?.marque ?? "MAISON";
  const liens: [string, string][] = [
    ["Collection", personnalisation?.lien1Url ?? "#collection"],
    ["Atelier", personnalisation?.lien2Url ?? "#atelier"],
    ["À propos", personnalisation?.lien3Url ?? "#apropos"],
  ];
  const ctaUrl = personnalisation?.ctaUrl ?? "#commander";
  return (
    <WebFrame label="module · navigation">
      <nav className="flex items-center" style={{ gap: u(14) }} aria-label={marque}>
        <div className="flex items-center" style={{ gap: u(7) }}>
          <span style={{ width: u(14), height: u(14), background: ACCENT, borderRadius: u(3) }} />
          <span style={{ fontFamily: F.cond, fontWeight: 700, fontSize: u(15), letterSpacing: u(3) }}>{marque}</span>
        </div>
        <div className="flex" style={{ gap: u(12), marginLeft: "auto" }}>
          {liens.map(([l, href]) => (
            <Lien key={l} href={href} style={{ fontFamily: F.type, fontSize: u(10.5), color: DOUC }}>{l}</Lien>
          ))}
        </div>
        {boutonPrimaire("Commander", ctaUrl)}
      </nav>
    </WebFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  3. Bloc de caractéristiques                                        */
/* ------------------------------------------------------------------ */

export function WebFeatures({ personnalisation }: P) {
  const t = personnalisation?.titre ?? "Trois raisons de rester";
  const items: [string, string, string?][] = [
    ["Papiers authentiques", "Chaque pièce est composée en CSS pur, sans image.", personnalisation?.lien1Url],
    ["Paramétrables", "Chaque module se personnalise dans l'atelier.", personnalisation?.lien2Url],
    ["Prêts à imprimer", "Un clic et le billet sort de l'écran.", personnalisation?.lien3Url],
  ];
  return (
    <WebFrame label="module · caractéristiques">
      <h2 style={{ ...titre(u(18)), margin: "0 0" }}>{t}</h2>
      <div className="grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: u(12), marginTop: u(12) }}>
        {items.map(([tt, tx, href], i) => (
          <Lien key={tt} href={href} style={{ display: "block" }}>
            <span style={losange([ACCENT, "#4fae62", "#e0b23e"][i])} />
            <div style={{ fontFamily: F.cond, fontWeight: 600, fontSize: u(11.5), marginTop: u(8), lineHeight: 1.2, color: ENCRE }}>{tt}</div>
            <p style={{ ...corps, fontSize: u(9.5), margin: `${u(4)} 0 0` }}>{tx}</p>
          </Lien>
        ))}
      </div>
    </WebFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  4. Bloc de chiffres                                                */
/* ------------------------------------------------------------------ */

export function WebStats({ personnalisation }: P) {
  const v1 = personnalisation?.valeur ?? "152";
  const l1 = personnalisation?.label ?? "pièces";
  return (
    <WebFrame label="module · chiffres">
      <div className="grid" style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: u(10) }}>
        {[
          [v1, l1],
          ["16", "catégories"],
          ["0", "image externe"],
          ["∞", "variantes"],
        ].map(([v, l], i) => (
          <div key={i} style={{ borderLeft: `${u(2)} solid ${i === 0 ? ACCENT : LIGNE}`, paddingLeft: u(8) }}>
            <div style={{ fontFamily: F.bebas, fontSize: u(28), color: ENCRE, lineHeight: 1 }}>{v}</div>
            <div style={{ ...labelChamp, textTransform: "none", fontSize: u(9.5), letterSpacing: u(0.5) }}>{l}</div>
          </div>
        ))}
      </div>
    </WebFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  5. Tarifs                                                          */
/* ------------------------------------------------------------------ */

export function WebPricing({ personnalisation }: P) {
  const plan = personnalisation?.plan ?? "Essentiel";
  const prix = personnalisation?.prix ?? "29 €";
  const plan1Url = personnalisation?.plan1Url ?? "#offre-essentiel";
  const plan2Url = personnalisation?.plan2Url ?? "#offre-atelier";
  return (
    <WebFrame label="module · tarifs">
      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: u(12) }}>
        <div style={{ border: `${u(1.5)} solid ${LIGNE}`, borderRadius: u(5), padding: u(12), background: "#fff" }}>
          <div style={{ ...labelChamp, textTransform: "none", fontSize: u(11) }}>{plan}</div>
          <div style={{ fontFamily: F.bebas, fontSize: u(30), margin: `${u(4)} 0` }}>{prix}<span style={{ fontSize: u(12), fontFamily: F.type }}> / mois</span></div>
          {["50 pièces à l'atelier", "Impression en PDF", "Support par courrier"].map((f) => (
            <div key={f} style={{ ...corps, fontSize: u(9.5) }}>- {f}</div>
          ))}
          <div style={{ marginTop: u(10) }}>{boutonGhost("Choisir", plan1Url)}</div>
        </div>
        <div style={{ border: `${u(2)} solid ${ACCENT}`, borderRadius: u(5), padding: u(12), background: "#eef3ff" }}>
          <div style={{ ...labelChamp, textTransform: "none", fontSize: u(11), color: ACCENT }}>Atelier complet</div>
          <div style={{ fontFamily: F.bebas, fontSize: u(30), margin: `${u(4)} 0` }}>49 €<span style={{ fontSize: u(12), fontFamily: F.type }}> / mois</span></div>
          {["152 pièces paramétrables", "Export & impression", "Nouveautés chaque mois"].map((f) => (
            <div key={f} style={{ ...corps, fontSize: u(9.5) }}>- {f}</div>
          ))}
          <div style={{ marginTop: u(10) }}>{boutonPrimaire("Choisir", plan2Url)}</div>
        </div>
      </div>
    </WebFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  6. Témoignage                                                      */
/* ------------------------------------------------------------------ */

export function WebTestimonial({ personnalisation }: P) {
  const cite = personnalisation?.cite ?? "J'ai retrouvé le ticket de mon premier cinéma, et je l'ai re-composé à mon nom.";
  const auteur = personnalisation?.auteur ?? "H. Moreau";
  const avisUrl = personnalisation?.avisUrl;
  return (
    <WebFrame label="module · témoignage">
      <div style={{ fontFamily: F.display, fontSize: u(44), color: ACCENT, lineHeight: 0.6, marginTop: u(4) }}>«</div>
      <p style={{ ...corps, fontSize: u(12), margin: `${u(2)} 0 ${u(10)}`, color: ENCRE, fontStyle: "italic" }}>{cite}</p>
      <div className="flex items-center" style={{ gap: u(8) }}>
        <span style={{ width: u(22), height: u(22), borderRadius: "50%", background: "#c9d4f2", flex: "none" }} />
        <div>
          <div style={{ fontFamily: F.cond, fontWeight: 600, fontSize: u(11) }}>{auteur}</div>
          <div style={{ ...labelChamp, marginBottom: 0, fontSize: u(8.5) }}>Collectionneuse, Lyon</div>
        </div>
        <span style={{ marginLeft: "auto", fontFamily: F.type, fontSize: u(11), color: "#e0a33e", letterSpacing: u(2) }}>★★★★★</span>
      </div>
      {avisUrl && (
        <div style={{ marginTop: u(10) }}>
          <Lien href={avisUrl} style={{ fontFamily: F.cond, fontWeight: 600, fontSize: u(10), color: ACCENT }}>
            Lire tous les avis →
          </Lien>
        </div>
      )}
    </WebFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  7. Bloc contact — vrai formulaire                                  */
/* ------------------------------------------------------------------ */

export function WebContact({ personnalisation }: P) {
  const t = personnalisation?.titre ?? "Nous écrire";
  const email = personnalisation?.email ?? "bonjour@maison.fr";
  const destinataire = personnalisation?.destinataire ?? email;
  const tel = personnalisation?.tel ?? "";
  const adresseUrl = personnalisation?.adresseUrl;
  return (
    <WebFrame label="module · contact">
      <div className="grid" style={{ gridTemplateColumns: "1.2fr 1fr", gap: u(16) }}>
        <div onPointerDown={stop} onClick={stop}>
          <h2 style={{ ...titre(u(18)), margin: "0 0" }}>{t}</h2>
          <form
            action={`mailto:${destinataire}`}
            method="post"
            encType="text/plain"
            style={{ marginTop: u(10) }}
            onSubmit={(e) => {
              if (!destinataire || destinataire.startsWith("#")) e.preventDefault();
            }}
          >
            <label style={labelChamp as CSSProperties} htmlFor={`wc-nom-${email}`}>Nom</label>
            <input name="nom" required placeholder="Votre nom" style={{ ...champ, width: "100%", marginBottom: u(8), outline: "none" }} />
            <label style={labelChamp as CSSProperties}>E-mail</label>
            <input name="email" type="email" required placeholder="vous@exemple.fr" style={{ ...champ, width: "100%", marginBottom: u(8), outline: "none" }} />
            <label style={labelChamp as CSSProperties}>Message</label>
            <textarea name="message" required rows={2} placeholder="Votre message…" style={{ ...champ, width: "100%", height: u(34), outline: "none", resize: "none" }} />
            <button type="submit" style={{ ...stylePrimaire, border: "none", cursor: "pointer", marginTop: u(10) }}>
              Envoyer
            </button>
          </form>
        </div>
        <div style={{ borderLeft: `${u(1.5)} solid ${LIGNE}`, paddingLeft: u(14), ...corps, fontSize: u(9.5) }}>
          <div style={{ ...labelChamp, fontSize: u(9) }}>Maison</div>
          <Lien href={adresseUrl} style={{ color: DOUC }}>
            <>14 rue des éphémères<br />75003 Paris</>
          </Lien>
          <br /><br />
          <div style={{ ...labelChamp, fontSize: u(9) }}>Écrire</div>
          <Lien href={`mailto:${email}`} style={{ color: ACCENT }}>{email}</Lien>
          {tel && (
            <>
              <br />
              <Lien href={`tel:${tel.replace(/\s/g, "")}`} style={{ color: ACCENT }}>{tel}</Lien>
            </>
          )}
          <br /><br />
          <div style={{ ...labelChamp, fontSize: u(9) }}>Horaires</div>
          Mar–Sam · 10h à 18h
        </div>
      </div>
    </WebFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  8. Newsletter — vrai formulaire                                    */
/* ------------------------------------------------------------------ */

export function WebNewsletter({ personnalisation }: P) {
  const t = personnalisation?.titre ?? "Le bulletin du dimanche";
  const c = personnalisation?.cta ?? "S'abonner";
  const actionUrl = personnalisation?.actionUrl ?? "#newsletter";
  const isMailto = actionUrl.startsWith("mailto:") || actionUrl.startsWith("#");
  return (
    <WebFrame label="module · newsletter">
      <div className="flex items-center flex-wrap" style={{ gap: u(12) }}>
        <div style={{ flex: "1 1 180px", minWidth: 0 }}>
          <h2 style={{ ...titre(u(17)), margin: "0 0" }}>{t}</h2>
          <p style={{ ...corps, margin: `${u(4)} 0 0`, fontSize: u(9.5) }}>Deux nouvelles pièces, chaque dimanche. Pas de spam.</p>
        </div>
        <form
          action={isMailto && actionUrl.startsWith("#") ? undefined : actionUrl}
          method="post"
          className="flex"
          style={{ gap: u(8), flex: "none" }}
          onPointerDown={stop}
          onClick={stop}
          onSubmit={(e) => {
            if (actionUrl.startsWith("#")) {
              e.preventDefault();
              const input = (e.currentTarget.querySelector("input[type=email]") as HTMLInputElement | null);
              if (input?.value) input.value = "";
              alert("Merci ! Inscription enregistrée (démo).");
            }
          }}
        >
          <input
            name="email"
            type="email"
            required
            placeholder="votre@email.fr"
            style={{ ...champ, width: u(110), outline: "none" }}
          />
          <button type="submit" style={{ ...stylePrimaire, border: "none", cursor: "pointer" }}>{c}</button>
        </form>
      </div>
    </WebFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  9. Bandeau d'appel à l'action                                      */
/* ------------------------------------------------------------------ */

export function WebCta({ personnalisation }: P) {
  const t = personnalisation?.titre ?? "Prêt à composer votre pièce ?";
  const c = personnalisation?.cta ?? "Commencer gratuitement";
  const ctaUrl = personnalisation?.ctaUrl ?? "#commencer";
  return (
    <WebFrame label="module · appel à l'action">
      <div
        className="flex items-center flex-wrap"
        style={{ background: "linear-gradient(120deg, #2f5fd0, #4a76e8)", borderRadius: u(5), padding: `${u(14)} ${u(18)}`, gap: u(12) }}
      >
        <h2 style={{ margin: 0, fontFamily: F.cond, fontWeight: 700, fontSize: u(19), color: "#fff", flex: "1 1 200px" }}>{t}</h2>
        <Lien
          href={ctaUrl}
          style={{
            display: "inline-block",
            background: "#fff",
            color: ACCENT,
            fontFamily: F.cond,
            fontWeight: 700,
            fontSize: u(11),
            letterSpacing: u(1.5),
            textTransform: "uppercase",
            padding: `${u(7)} ${u(16)}`,
            borderRadius: u(3),
          }}
        >
          {c}
        </Lien>
      </div>
    </WebFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  10. Foire aux questions — accordéon fonctionnel                    */
/* ------------------------------------------------------------------ */

export function WebFaq({ personnalisation }: P) {
  const q1 = personnalisation?.question ?? "Puis-je imprimer mes pièces ?";
  const aideUrl = personnalisation?.aideUrl;
  const rows: [string, string, boolean][] = [
    [q1, "Oui — l'atelier prépare l'impression du seul billet sélectionné, au format carte.", true],
    ["Les pièces sont-elles vectorielles ?", "Oui, 100 % CSS/SVG, sans image matricielle.", false],
    ["Puis-je contribuer une catégorie ?", "Écrivez-nous, le référentiel est ouvert.", false],
  ];
  return (
    <WebFrame label="module · questions fréquentes">
      <div className="flex flex-col" style={{ gap: u(7) }} onPointerDown={stop} onClick={stop}>
        {rows.map(([q, a, open], i) => (
          <details
            key={i}
            open={open}
            style={{ border: `${u(1.5)} solid ${LIGNE}`, borderRadius: u(4), padding: `${u(8)} ${u(11)}`, background: open ? "#eef3ff" : "#fff" }}
          >
            <summary style={{ display: "flex", alignItems: "center", gap: u(8), cursor: "pointer", listStyle: "none" }}>
              <span style={{ flex: 1, fontFamily: F.cond, fontWeight: 600, fontSize: u(11.5) }}>{q}</span>
              <span style={{ fontFamily: F.bebas, fontSize: u(16), color: open ? ACCENT : DOUC }}>{open ? "−" : "+"}</span>
            </summary>
            <p style={{ ...corps, fontSize: u(9.5), margin: `${u(6)} 0 0` }}>{a}</p>
          </details>
        ))}
        {aideUrl && (
          <div style={{ marginTop: u(4) }}>
            <Lien href={aideUrl} style={{ fontFamily: F.cond, fontWeight: 600, fontSize: u(10), color: ACCENT }}>
              Centre d'aide →
            </Lien>
          </div>
        )}
      </div>
    </WebFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  11. Pied de page — liens réels                                     */
/* ------------------------------------------------------------------ */

export function WebFooter({ personnalisation }: P) {
  const marque = personnalisation?.marque ?? "MAISON";
  const annee = personnalisation?.annee ?? "© 1962";
  const mentionsUrl = personnalisation?.mentionsUrl ?? "#mentions";
  const confUrl = personnalisation?.confUrl ?? "#confidentialite";
  return (
    <WebFrame label="module · pied de page">
      <div className="flex" style={{ gap: u(16) }}>
        <div style={{ flex: "1 1 40%" }}>
          <div className="flex items-center" style={{ gap: u(7) }}>
            <span style={{ width: u(12), height: u(12), background: ACCENT, borderRadius: u(3) }} />
            <span style={{ fontFamily: F.cond, fontWeight: 700, fontSize: u(13), letterSpacing: u(3) }}>{marque}</span>
          </div>
          <p style={{ ...corps, fontSize: u(9.5), margin: `${u(8)} 0 0`, maxWidth: u(140) }}>
            L'atlas des imprimés éphémères, posé sur son canevas de points.
          </p>
        </div>
        {[
          ["Collection", ["Voyage", "Cinéma", "Timbres", "Modules web"]],
          ["Maison", ["À propos", "Atelier", "Contact", "Presse"]],
        ].map(([tt, liens]) => (
          <nav key={tt as string} style={{ flex: "1 1 25%" }} aria-label={tt as string}>
            <div style={{ ...labelChamp, textTransform: "none", fontSize: u(10) }}>{tt as string}</div>
            {(liens as string[]).map((l) => (
              <div key={l} style={{ marginTop: u(4) }}>
                <Lien href={`#${l.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, "-")}`} style={{ ...corps, fontSize: u(9.5) }}>{l}</Lien>
              </div>
            ))}
          </nav>
        ))}
      </div>
      <div style={{ borderTop: `${u(1)} solid ${LIGNE}`, marginTop: u(12), paddingTop: u(8), display: "flex", justifyContent: "space-between", fontFamily: F.type, fontSize: u(9), color: DOUC }}>
        <span>{annee} · Tous droits réservés</span>
        <span>
          <Lien href={mentionsUrl} style={{ color: DOUC }}>Mentions</Lien>
          {" · "}
          <Lien href={confUrl} style={{ color: DOUC }}>Confidentialité</Lien>
        </span>
      </div>
    </WebFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  12. Jeu de boutons — actions réelles                               */
/* ------------------------------------------------------------------ */

export function WebButtons({ personnalisation }: P) {
  const l = personnalisation?.label ?? "Valider";
  const primaireUrl = personnalisation?.primaireUrl;
  const dangerUrl = personnalisation?.dangerUrl;
  return (
    <WebFrame label="module · boutons">
      <div className="flex items-center flex-wrap" style={{ gap: u(10) }} onPointerDown={stop} onClick={stop}>
        {primaireUrl ? (
          <Lien href={primaireUrl} style={stylePrimaire}>{l}</Lien>
        ) : (
          <button type="button" style={{ ...stylePrimaire, border: "none", cursor: "pointer" }} onClick={() => alert(`${l} — action confirmée (démo).`)}>{l}</button>
        )}
        <button
          type="button"
          style={{ ...styleGhost, cursor: "pointer" }}
          onClick={() => window.history.length > 1 ? window.history.back() : null}
        >
          Annuler
        </button>
        <Lien
          href="#savoir-plus"
          style={{
            display: "inline-block",
            fontFamily: F.cond,
            fontWeight: 600,
            fontSize: u(11),
            letterSpacing: u(1.5),
            textTransform: "uppercase",
            color: DOUC,
            padding: `${u(7)} ${u(16)}`,
            borderRadius: u(3),
          }}
        >
          En savoir plus
        </Lien>
        {dangerUrl ? (
          <Lien
            href={dangerUrl}
            style={{
              display: "inline-block",
              border: `${u(1.5)} solid #d05a4e`,
              color: "#c0453a",
              fontFamily: F.cond,
              fontWeight: 600,
              fontSize: u(11),
              letterSpacing: u(1.5),
              textTransform: "uppercase",
              padding: `${u(6.5)} ${u(15.5)}`,
              borderRadius: u(3),
              background: "#fff",
            }}
          >
            Supprimer
          </Lien>
        ) : (
          <button
            type="button"
            style={{
              border: `${u(1.5)} solid #d05a4e`,
              color: "#c0453a",
              fontFamily: F.cond,
              fontWeight: 600,
              fontSize: u(11),
              letterSpacing: u(1.5),
              textTransform: "uppercase",
              padding: `${u(6.5)} ${u(15.5)}`,
              borderRadius: u(3),
              background: "#fff",
              cursor: "pointer",
            }}
            onClick={() => { if (window.confirm("Supprimer cet élément ? (démo)")) alert("Élément supprimé (démo)."); }}
          >
            Supprimer
          </button>
        )}
      </div>
    </WebFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  13. Formulaire de connexion — vrai formulaire                      */
/* ------------------------------------------------------------------ */

export function WebLogin({ personnalisation }: P) {
  const t = personnalisation?.titre ?? "Se connecter";
  const actionUrl = personnalisation?.actionUrl ?? "#login";
  const oublieUrl = personnalisation?.oublieUrl ?? "#reset";
  return (
    <WebFrame label="module · connexion">
      <form
        action={actionUrl.startsWith("#") ? undefined : actionUrl}
        method="post"
        style={{ maxWidth: u(180), margin: "0 auto" }}
        onPointerDown={stop}
        onClick={stop}
        onSubmit={(e) => {
          if (actionUrl.startsWith("#")) {
            e.preventDefault();
            alert("Connexion simulée — bienvenue dans votre carnet (démo).");
          }
        }}
      >
        <h2 style={{ ...titre(u(18)), margin: "0", textAlign: "center" }}>{t}</h2>
        <p style={{ ...corps, fontSize: u(9.5), textAlign: "center", margin: `${u(4)} 0 ${u(12)}` }}>Votre carnet vous attend.</p>
        <label style={labelChamp as CSSProperties}>E-mail</label>
        <input name="email" type="email" required autoComplete="email" style={{ ...champ, width: "100%", marginBottom: u(9), outline: "none" }} />
        <label style={labelChamp as CSSProperties}>Mot de passe</label>
        <input name="password" type="password" required autoComplete="current-password" style={{ ...champ, width: "100%", marginBottom: u(10), outline: "none" }} />
        <div className="flex items-center justify-between" style={{ marginBottom: u(12), fontFamily: F.type, fontSize: u(9.5), color: DOUC }}>
          <label className="flex items-center" style={{ gap: u(5), cursor: "pointer" }}>
            <input type="checkbox" name="remember" defaultChecked style={{ width: u(9), height: u(9), accentColor: ACCENT }} />
            Se souvenir de moi
          </label>
          <Lien href={oublieUrl} style={{ color: ACCENT }}>Mot de passe oublié ?</Lien>
        </div>
        <div className="text-center">
          <button type="submit" style={{ ...stylePrimaire, border: "none", cursor: "pointer" }}>Entrer</button>
        </div>
      </form>
    </WebFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  14. Bande de logos                                                 */
/* ------------------------------------------------------------------ */

export function WebLogos({ personnalisation }: P) {
  const t = personnalisation?.titre ?? "Ils composent avec la Maison";
  const urls = [personnalisation?.lien1Url, personnalisation?.lien2Url, undefined, undefined, undefined];
  return (
    <WebFrame label="module · références">
      <div style={{ textAlign: "center" }}>
        <div style={{ ...labelChamp, textTransform: "none", fontSize: u(10) }}>{t}</div>
        <div className="flex items-center justify-between" style={{ marginTop: u(10), opacity: 0.85 }}>
          {["PARADIS", "ROYAL", "GAZETTE", "LYONNE", "ATLAS"].map((l, i) => (
            <Lien
              key={l}
              href={urls[i]}
              style={{ fontFamily: [F.bebas, F.cond, F.cinzel, F.display, F.cond][i], fontSize: u(14), fontWeight: 700, letterSpacing: u(2), color: ENCRE }}
            >
              {l}
            </Lien>
          ))}
        </div>
      </div>
    </WebFrame>
  );
}
