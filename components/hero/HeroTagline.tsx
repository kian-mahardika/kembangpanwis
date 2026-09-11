import Image from 'next/image';

export default function HeroTagline() {
  return (
    <div className="hero-tagline-reveal">
      <div className="hero-tagline">
        <Image src="/hero/tagline.png" alt="Untuk setiap asa yang telah diperjuangkan, ada bunga yang layak diberikan." width={645} height={380} priority sizes="(max-width: 767px) 85vw, 340px" className="original-brand-art" />
        {/* Reuse the identical PNG, clipped to ASA for a brief, delayed glow. */}
        <div className="hero-asa-glow" aria-hidden="true">
          <Image src="/hero/tagline.png" alt="" width={645} height={380} sizes="(max-width: 767px) 85vw, 340px" className="original-brand-art" />
        </div>
      </div>
    </div>
  );
}
