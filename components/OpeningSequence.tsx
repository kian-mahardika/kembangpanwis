'use client';
import Image from 'next/image';
import {useEffect,useRef,useState} from 'react';

type IntroPhase='loading'|'opening'|'interactive'|'done';

export default function OpeningSequence({children}:{children:React.ReactNode}){
 const [phase,setPhase]=useState<IntroPhase>('loading');
 const content=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced){setPhase('done');queueMicrotask(()=>window.dispatchEvent(new Event('kembang-panwis:intro-done')));return;}

  const container=content.current;
  const previousOverflow=document.body.style.overflow;
  let unlocked=false;
  const unlock=()=>{
   if(unlocked)return;
   unlocked=true;
   document.body.style.overflow=previousOverflow;
   if(container)container.inert=false;
  };

  document.body.style.overflow='hidden';
  if(container)container.inert=true;

  // The intro intentionally plays on every hard refresh. The hero begins
  // assembling while the bouquet-wrap folds are still opening.
  const open=setTimeout(()=>setPhase('opening'),720);
  const interactive=setTimeout(()=>{unlock();setPhase('interactive');},1340);
  const finish=setTimeout(()=>{unlock();setPhase('done');window.dispatchEvent(new Event('kembang-panwis:intro-done'));},1780);

  return()=>{
   clearTimeout(open);
   clearTimeout(interactive);
   clearTimeout(finish);
   unlock();
  };
 },[]);

 const revealing=phase==='opening'||phase==='interactive';
 return <div className="opening-sequence" data-intro-phase={phase}>
      <svg width="0" height="0" className="hero-filter-definitions" focusable="false" aria-hidden="true">
        <defs>
          <filter id="panwis-white-matte" colorInterpolationFilters="sRGB" x="-5%" y="-5%" width="110%" height="110%">
            <feColorMatrix result="goldMatte" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 -3 0 3" />
            <feComposite in="goldMatte" in2="SourceAlpha" operator="in" />
          </filter>
        </defs>
      </svg>
  {phase!=='done'&&<div className={`brand-preloader bouquet-reveal ${revealing?'is-opening':''} ${phase==='interactive'?'is-interactive':''}`} aria-hidden="true">
   <div className="wrap-fold wrap-fold-primary"/>
   <div className="wrap-fold wrap-fold-secondary"/>
   <div className="fold-seam"/>
   <div className="preloader-logo"><Image src="/hero/logo.png" alt="" width={706} height={427} sizes="180px" priority className="original-brand-art"/></div>
  </div>}
  <div ref={content}>{children}</div>
 </div>;
}
