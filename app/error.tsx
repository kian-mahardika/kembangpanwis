'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <main className="empty-state"><h1>Katalog belum dapat dibuka.</h1><p>Silakan coba kembali sebentar lagi.</p><button className="button primary" onClick={reset}>Coba lagi</button></main>;}
