'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import HeroBackground from './HeroBackground';
import HeroLogo from './HeroLogo';
import HeroTagline from './HeroTagline';
import HeroCTA from './HeroCTA';
import ScrollIndicator from './ScrollIndicator';
import './hero.css';

export default function HeroSection() {
  const hero = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const ornamentY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -20]);
  const flowerY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -40]);
  const logoY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -30]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.72], reducedMotion ? [1, 1, 1] : [1, 1, 0]);
  const dimOpacity = useTransform(scrollYProgress, [0.1, 0.85], reducedMotion ? [0, 0] : [0, 0.5]);

  return (
    <section ref={hero} className="cinematic-hero" aria-labelledby="hero-brand" id="home">
      <HeroBackground ornamentY={ornamentY} flowerY={flowerY} />
      <motion.div className="hero-content" style={{ y: logoY, opacity: contentOpacity }}>
        <div className="hero-opening-note">UNTUK MOMEN YANG TAK TERULANG</div>
        <HeroLogo />
        <div className="hero-divider" aria-hidden="true"><span /></div>
        <HeroTagline />
        <div className="hero-cta-reveal"><HeroCTA /></div>
      </motion.div>
      <motion.div className="hero-scroll-wrapper" style={{ opacity: contentOpacity }}><ScrollIndicator /></motion.div>
      <motion.div className="hero-scroll-dim" style={{ opacity: dimOpacity }} aria-hidden="true" />
      <div className="hero-floor-line" aria-hidden="true" />
    </section>
  );
}
