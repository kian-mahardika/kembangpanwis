import Image from 'next/image';

export default function HeroLogo() {
  return (
    <div className="hero-logo-reveal">
      <h1 className="hero-logo" id="hero-brand">
        <Image src="/hero/logo.png" alt="Kembang Panwis" width={706} height={427} priority sizes="(max-width: 767px) 88vw, 470px" className="original-brand-art" />
      </h1>
    </div>
  );
}
