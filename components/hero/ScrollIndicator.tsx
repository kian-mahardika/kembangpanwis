'use client';

import { ArrowDown } from 'lucide-react';
import { goToCatalog } from './HeroCTA';

export default function ScrollIndicator() {
  return <a className="hero-scroll-indicator" href="#catalog" onClick={goToCatalog} aria-label="Gulir ke katalog"><span>JELAJAHI KOLEKSI</span><ArrowDown size={17} strokeWidth={1.3} /></a>;
}
