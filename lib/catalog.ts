export type Product = {id:string;code:string;slug:string;category:string;name:string;price:number;thumbnail:string;detailImage:string;description:string;customization:string;tags:string[];available:boolean;legacyName?:string;imagePosition?:string;detailImagePosition?:string};
export const categories = ['Semua','Fresh Flowers','Artificial Flowers','Artificial Boneka','Buket Kawat Bulu','Buket Pita Satin','Snack Bouquet','Papan Bunga','Bloom Box'];
export const rupiah = (n:number) => new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n);
export const GOOGLE_FORM_URL = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || '';
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/\D/g,'');
export const whatsapp = (p?:Product) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(p ? `Halo Kak, saya tertarik dengan produk ${p.code} — ${p.category}.` : 'Halo Kak, saya ingin bertanya tentang koleksi Kembang Panwis.')}`;
export const productUrl = (p:Product) => {const u=new URL(window.location.href);u.searchParams.set('product',p.code);u.hash='';return u.toString();};
export function filterProducts(products:Product[],query:string,category:string,price:string,sort:string) {
 const terms=query.toLocaleLowerCase('id').trim().split(/\s+/).filter(Boolean);
 const filtered=products.filter(p=>{
  const hay=[p.code,p.name,p.legacyName||'',p.category,p.description,p.customization,...p.tags].join(' ').toLocaleLowerCase('id');
  return (category==='Semua'||p.category===category)&&terms.every(t=>hay.includes(t))&&
  (price==='all'||(price==='under100'&&p.price<100000)||(price==='100to200'&&p.price>=100000&&p.price<=200000)||(price==='200to300'&&p.price>200000&&p.price<=300000)||(price==='over300'&&p.price>300000));
 });
 return sort==='low'?filtered.sort((a,b)=>a.price-b.price):sort==='high'?filtered.sort((a,b)=>b.price-a.price):filtered;
}
