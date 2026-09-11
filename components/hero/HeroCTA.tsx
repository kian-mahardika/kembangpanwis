'use client';

import { ArrowDownRight } from 'lucide-react';
import type { MouseEvent } from 'react';

export function goToCatalog(event: MouseEvent<HTMLAnchorElement>) {
  const catalog = document.getElementById('catalog');
  if (!catalog) return;
  event.preventDefault();
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  history.replaceState(history.state, '', `${location.pathname}${location.search}#catalog`);
  catalog.scrollIntoView({ behavior: reduce ? 'instant' : 'smooth', block: 'start' });
  // Keyboard users arrive at the collection instead of tabbing through the hero.
  catalog.focus({ preventScroll: true });
}

export default function HeroCTA() {
  return <a href="#catalog" className="hero-cta" onClick={goToCatalog}>Temukan Buketmu <ArrowDownRight size={18} strokeWidth={1.5} /></a>;
}
