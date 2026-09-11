'use client';
import {useEffect,useRef} from 'react';
import {motion,useReducedMotion} from 'framer-motion';
import {X} from 'lucide-react';

export default function Dialog({children,onClose,label,drawer=false,message}:{children:React.ReactNode;onClose:()=>void;label:string;drawer?:boolean;message?:string}){
 const reduced=useReducedMotion();
 const ref=useRef<HTMLDialogElement>(null);
 const close=useRef(onClose);close.current=onClose;
 useEffect(()=>{
  const el=ref.current!;
  const prior=document.activeElement as HTMLElement|null;
  let previousOverflow='';
  let opened=false;

  const openDialog=()=>{
   if(opened||!el.isConnected)return;
   opened=true;
   previousOverflow=document.body.style.overflow;
   el.showModal();
   document.body.style.overflow='hidden';
  };

  // A dialog opened from a ?product deep link lives in the browser top layer,
  // which would otherwise appear above the branded refresh animation. Defer
  // showModal until the bouquet-wrap intro finishes, while preserving the URL.
  const introActive=Boolean(document.querySelector('.brand-preloader'));
  if(introActive)window.addEventListener('kembang-panwis:intro-done',openDialog,{once:true});
  else openDialog();

  return()=>{
   window.removeEventListener('kembang-panwis:intro-done',openDialog);
   if(opened){
    if(el.open)el.close();
    document.body.style.overflow=previousOverflow;
   }
   if(prior?.isConnected)prior.focus();
  };
 },[]);
 return <dialog ref={ref} className={`dialog ${drawer?'drawer':''}`} aria-label={label} onCancel={e=>{e.preventDefault();close.current();}} onClick={e=>{if(e.target===e.currentTarget)close.current();}}><motion.div className="dialog-surface" initial={{opacity:reduced?1:0,scale:reduced||drawer?1:.96,y:reduced?0:20}} animate={{opacity:1,scale:1,y:0}} transition={{duration:.22}}><button className="close-button" aria-label={drawer?"Tutup Pilihanmu":"Tutup detail produk"} onClick={onClose} autoFocus><X size={21}/></button>{children}{message&&<div className="dialog-message" role="status">{message}</div>}</motion.div></dialog>;
}
