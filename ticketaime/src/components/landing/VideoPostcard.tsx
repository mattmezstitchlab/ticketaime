import { useEffect, useRef, useState } from "react";

/** A local video object, not a certificate or an NFC-enabled ticket. */
export default function VideoPostcard({ hero = false }: { hero?: boolean }) {
  const [paused, setPaused] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (media.matches) {
        video.current?.pause();
        setPaused(true);
      } else
        void video.current?.play().catch(() => {
          setPaused(true);
        });
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  if (hero)
    return (
      <div
        id="video-postcard"
        className="hero-background-video postcard-scene--hero"
      >
        <video
          ref={video}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onPlay={() => setPaused(false)}
          onPause={() => setPaused(true)}
        >
          <source src="/videos/le-monde-aime-postcard.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-shade" />
        <button
          type="button"
          className="hero-video-toggle"
          onClick={() => {
            if (video.current?.paused)
              void video.current.play().catch(() => setPaused(true));
            else video.current?.pause();
          }}
        >
          {paused ? "Lire la vidéo" : "Mettre la vidéo en pause"}
        </button>
      </div>
    );
  return (
    <section
      id="video-postcard"
      className={`postcard-scene ${hero ? "postcard-scene--hero" : ""}`}
      aria-label="Carte postale vidéo Le Monde Aime"
    >
      <figure className="video-postcard">
        <div className="video-postcard-heading">
          <span>LE MONDE AIME · CORRESPONDANCE</span>
          <span className="video-postcard-stamp" aria-hidden="true">
            LMA
            <br />
            PAR IMAGES
          </span>
        </div>
        <video
          ref={video}
          controls
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Carte postale animée Le Monde Aime"
        >
          <source src="/videos/le-monde-aime-postcard.mp4" type="video/mp4" />
          Votre navigateur ne peut pas lire cette vidéo.{" "}
          <a href="/videos/le-monde-aime-postcard.mp4">
            Télécharger la carte postale vidéo
          </a>
          .
        </video>
        {!hero && (
          <figcaption>
            <div>
              <p className="lma-eyebrow">Une carte postale en mouvement</p>
              <h2 id="postcard-title">
                Les images passent.
                <br />
                <em>Les souvenirs restent.</em>
              </h2>
            </div>
            <p className="video-postcard-note">
              À garder, à regarder,
              <br />à envoyer avec le cœur.<span>LE MONDE AIME.</span>
            </p>
          </figcaption>
        )}
      </figure>
      {!hero && (
        <p className="postcard-next">
          <a href="#usages">Poursuivre votre histoire ↓</a>
        </p>
      )}
    </section>
  );
}
