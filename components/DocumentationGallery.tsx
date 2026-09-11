import Image from 'next/image';
import photos from '@/data/documentation.json';
export default function DocumentationGallery(){return <section className="documentation" aria-labelledby="documentation-heading"><h2 id="documentation-heading">Dokumentasi</h2><div className="documentation-grid">{photos.map(photo=><figure key={photo.src}><Image src={photo.src} alt={photo.alt} fill sizes="(max-width:599px) 92vw, (max-width:1023px) 44vw, (max-width:1599px) 29vw, 22vw" loading="lazy"/></figure>)}</div></section>;}
