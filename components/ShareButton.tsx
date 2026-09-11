'use client';
import {useState} from 'react';
import {Share2,Copy} from 'lucide-react';
import {Product,productUrl} from '@/lib/catalog';
export default function ShareButton({product,notify}:{product:Product;notify:(s:string)=>void}){
 const [fallback,setFallback]=useState(false);const [url,setUrl]=useState('');
 async function share(){const link=productUrl(product);setUrl(link);if(navigator.share){try{await navigator.share({title:`${product.category} ${product.code} | Kembang Panwis`,text:product.name,url:link});return;}catch(e){if(e instanceof DOMException&&e.name==='AbortError')return;}}setFallback(v=>!v);}
 async function copy(){try{await navigator.clipboard.writeText(url);notify('Tautan produk disalin.');setFallback(false);}catch{notify('Pilih dan salin tautan di bawah.');}}
 return <div className="share"><button className="text-button" onClick={share} aria-expanded={fallback}><Share2 size={17}/> Bagikan</button>{fallback&&<div className="share-options"><button className="text-button" onClick={copy}><Copy size={15}/> Salin tautan</button><a target="_blank" rel="noopener noreferrer" href={`https://wa.me/?text=${encodeURIComponent(product.category+' '+product.code+' '+url)}`}>Bagikan via WhatsApp ↗</a><input aria-label="Tautan produk untuk disalin" readOnly value={url} onFocus={e=>e.target.select()}/></div>}</div>;
}
