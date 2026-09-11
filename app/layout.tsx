import type { Metadata, Viewport } from 'next';
import './globals.css';
import './revision.css';
import OpeningSequence from '@/components/OpeningSequence';
export const viewport:Viewport={width:"device-width",initialScale:1,viewportFit:"cover"};
export const metadata:Metadata = {
 title:'Kembang Panwis | Buket Wisuda Premium',
 description:'Temukan koleksi buket wisuda dan bunga pilihan dari Kembang Panwis.',
 openGraph:{title:'Kembang Panwis | Buket Wisuda Premium',description:'Temukan koleksi buket wisuda dan bunga pilihan dari Kembang Panwis.',locale:'id_ID',type:'website',...(process.env.NEXT_PUBLIC_OG_IMAGE_URL?{images:[process.env.NEXT_PUBLIC_OG_IMAGE_URL]}:{})},
 robots:{index:true,follow:true}
};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="id"><body><a className="skip-link" href="#catalog">Langsung ke katalog</a><OpeningSequence>{children}</OpeningSequence></body></html>;}
