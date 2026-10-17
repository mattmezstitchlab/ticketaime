import { useEffect, useRef } from "react";

/** A local video object, not a certificate or an NFC-enabled ticket. */
export default function VideoPostcard() {
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (media.matches) video.current?.pause();
      else void video.current?.play().catch(() => { /* Native controls remain available. */ });
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return (
    <section id="video-postcard" className="postcard-scene" aria-labelledby="postcard-title">
      <figure className="video-postcard">
        <div className="video-postcard-heading">
          <span>LE MONDE AIME · CORRESPONDANCE</span>
          <span className="video-postcard-stamp" aria-hidden="true">LMA<br />PAR IMAGES</span>
        </div>
        <video ref={video} controls muted loop playsInline preload="metadata" aria-label="Carte postale animée Le Monde Aime">
          <source src="/videos/le-monde-aime-postcard.mp4" type="video/mp4" />
          Votre navigateur ne peut pas lire cette vidéo. <a href="/videos/le-monde-aime-postcard.mp4">Télécharger la carte postale vidéo</a>.
        </video>
        <figcaption>
          <div><p className="lma-eyebrow">Une carte postale en mouvement</p><h2 id="postcard-title">Les images passent.<br /><em>Les souvenirs restent.</em></h2></div>
          <p className="video-postcard-note">À garder, à regarder,<br />à envoyer avec le cœur.<span>LE MONDE AIME.</span></p>
        </figcaption>
      </figure>
      <p className="postcard-next"><a href="#usages">Poursuivre votre histoire ↓</a></p>
    </section>
  );
}
