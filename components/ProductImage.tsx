'use client';
import Image from 'next/image';
import {useState} from 'react';
import type {Product} from '@/lib/catalog';
export default function ProductImage({product,detail=false,priority=false}:{product:Product;detail?:boolean;priority?:boolean}) {
 const [loaded,setLoaded]=useState(false);const [failed,setFailed]=useState(false);const src=detail?product.detailImage:product.thumbnail;
 return <div className={`product-photo ${loaded?'loaded':''} ${detail?'detail-photo':''}`}>
 {src&&!failed?<><div className="photo-skeleton" aria-hidden="true"/><Image src={src} alt={`${product.category}, kode ${product.code}`} fill style={{objectPosition:detail?(product.detailImagePosition||product.imagePosition||'50% 0%'):(product.imagePosition||'50% 0%')}} sizes={detail?'(max-width: 767px) 100vw, (max-width: 1099px) 780px, 480px':'(max-width: 767px) calc((100vw - 44px) / 2), (max-width: 1023px) 45vw, (max-width: 1450px) 30vw, 430px'} quality={detail?90:75} priority={priority} onLoad={()=>setLoaded(true)} onError={()=>setFailed(true)}/></>:<div className="photo-placeholder"><span>KEMBANG PANWIS</span><p>Foto segera hadir</p><small>{product.category} · {product.code}</small></div>}
 </div>;
}
