'use client';

import Image from 'next/image';
import { motion, type MotionValue } from 'framer-motion';

type Props = { ornamentY: MotionValue<number>; flowerY: MotionValue<number> };

export default function HeroBackground({ ornamentY, flowerY }: Props) {
  return (
    <div className="hero-art" aria-hidden="true">
      {/* Remove the supplied PNGs' white matte at presentation time only.
          Gold RGB values and the original files remain unchanged. */}

      <div className="hero-atmosphere" />
      <div className="hero-vignette" />
      <div className="hero-edge-frame" />
      <motion.div className="hero-ornament-layer" style={{ y: ornamentY }}>
        <div className="hero-corner hero-corner-top">
          <Image src="/hero/corner-top.png" alt="" fill sizes="(max-width: 767px) 88vw, 46vw" priority />
        </div>
        <div className="hero-corner hero-corner-bottom">
          <Image src="/hero/corner-bottom.png" alt="" fill sizes="(max-width: 767px) 75vw, 45vw" />
        </div>
        <div className="hero-gold-wave">
          <Image src="/hero/gold-wave.png" alt="" fill sizes="(max-width: 767px) 115vw, 65vw" />
        </div>
      </motion.div>
      <motion.div className="hero-floral-layer" style={{ y: flowerY }}>
        <div className="hero-floral-texture">
          <Image src="/hero/floral-texture.png" alt="" fill sizes="(max-width: 767px) 80vw, 42vw" />
        </div>
        <div className="hero-edge-flower hero-edge-flower-left">
          <Image src="/hero/flower-two.png" alt="" fill sizes="(max-width: 767px) 120px, 230px" />
        </div>
        <div className="hero-edge-flower hero-edge-flower-right">
          <Image src="/hero/flower-one.png" alt="" fill sizes="(max-width: 767px) 100px, 180px" />
        </div>
      </motion.div>
    </div>
  );
}
