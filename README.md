# Kembang Panwis — Popup & Signature Opening Revision

Project ini adalah katalog Kembang Panwis berbasis Next.js 15, React 19, TypeScript, Tailwind, Framer Motion, dan Next Image. Revisi terakhir mempertahankan seluruh hasil Sprint katalog/mobile sebelumnya, lalu memperbaiki popup produk secara global dan mengganti opening straight split menjadi signature **Bouquet Wrap Unfold**.

## Menjalankan

Gunakan Node.js 22 LTS. Setelah ekstrak ZIP, buka terminal pada folder yang memiliki `package.json`:

```bash
npm ci
npm run check:data
npm run dev
```

Produksi:

```bash
npm run build
npm start
```

Project ini adalah aplikasi Next.js; bukan file HTML standalone. Untuk Vercel, root directory adalah folder `package.json`, Build Command `npm run build`, Output Directory default.

## Revisi popup global

Akar bug popup lama adalah kombinasi grid `1fr 1fr`, `height:100%`, `min-height` besar, dan `aspect-ratio` pada panel foto. Produk dengan description/customization panjang membuat row semakin tinggi, lalu panel foto dapat menghitung lebar yang lebih besar daripada track grid dan menimpa panel informasi.

Perbaikan final:

- Desktop `>=1100px`: dua kolom stabil `minmax(0,.9fr) minmax(0,1.1fr)` (sekitar 45% foto / 55% informasi).
- `.detail-photo` dan `.detail-info` memakai `min-width:0` dan `max-width:100%`.
- Foto tidak lagi memakai `height:100%` atau `min-height` besar; ukurannya dikendalikan oleh lebar kolom dan `aspect-ratio`.
- Crop premium tetap dipertahankan dengan `object-fit:cover` dan posisi atas.
- Tablet/small laptop `768–1099px`: popup sengaja ditumpuk satu kolom dan modal dibatasi hingga `min(780px,94vw)`.
- Mobile `<=767px`: bottom sheet existing dipertahankan, foto `5:4`, informasi/CTA tetap satu alur vertikal.
- Long description/customization sekarang menambah vertical scroll di dialog, bukan membuat foto melebar ke panel teks.
- Close button tetap memiliki touch target 44×44px.

## Signature opening — Bouquet Wrap Unfold

Straight curtain kiri/kanan ala benchmark lama telah dihapus. Opening sekarang memakai dua bidang wrapping bouquet maroon yang saling overlap dengan seam diagonal.

Sequence:

- Logo existing `/hero/logo.png` muncul di tengah tanpa tulisan loading tambahan.
- Logo fade/breathe sekitar 700 ms.
- Dua wrapping fold membuka diagonal ke upper-left dan lower-right dengan rotasi sangat kecil.
- Gold fold seam tipis menegaskan lipatan tanpa particle/confetti.
- Total intro sekitar 1,78 detik.
- Intro dimainkan pada setiap hard refresh/reload; tidak ada sessionStorage/localStorage skip.
- Saat CTA hero mulai terlihat, konten dilepas dari `inert` dan overlay tidak lagi menahan pointer.
- `prefers-reduced-motion` langsung menyederhanakan intro dan menampilkan hero tanpa motion panjang.

Deep link `?product=...` tetap aman: dialog top-layer ditunda sampai event `kembang-panwis:intro-done`, sehingga popup tidak muncul di atas opening lalu tetap terbuka setelah intro selesai.

## Staggered hero entrance

Hero tidak lagi muncul serentak. Element masuk bertahap sambil wrap masih membuka:

1. atmosphere/background terekspos,
2. gold frame/corner ornaments,
3. floral edge layer,
4. gold wave/accent,
5. opening note + hero logo,
6. divider + tagline,
7. CTA,
8. scroll indicator.

Jarak stagger pendek dan motion hanya berupa opacity, translate kecil, serta masked reveal. Tidak ada bounce, spring agresif, large rotation, flower particle, atau confetti. Existing subtle parallax saat scroll tetap dipertahankan.

## Fitur sebelumnya yang tetap dipertahankan

- Product code sebagai main title.
- Old title/descriptor berada di `Tentang Kembang Ini` secara fleksibel.
- Section description/customization kosong tidak dirender.
- Product card dan detail memakai crop cover premium.
- Hover desktop: card maroon, text off-white, zoom foto 1.06, lift/depth subtle.
- Touch card memakai tap feedback tanpa sticky hover.
- Category chips horizontal-scroll di mobile/tablet.
- Heart/save target 44×44px.
- WhatsApp menggunakan satu product code tanpa duplikasi.
- Documentation gallery 16:9 tetap berada setelah katalog.
- Semua 94 produk dan 8 kategori tetap utuh.

## Environment variables

Isi bila digunakan:

- `NEXT_PUBLIC_GOOGLE_FORM_URL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_OG_IMAGE_URL`

Lihat `.env.example`.

## QA revisi ini

Pemeriksaan yang berhasil dilakukan di workspace revisi:

- `node scripts/check-data.mjs`: PASS — 94 produk, 8 kategori, semua configured product image path tersedia.
- TS/TSX parse check menggunakan TypeScript compiler parser: PASS untuk seluruh source TS/TSX.
- CSS parse check (`globals.css`, `revision.css`, `hero.css`): PASS, tanpa parse error.
- Structural popup QA: `>=1100px` width-constrained two-column; `768–1099px` single-column; `<=767px` block/bottom-sheet. Tidak ada lagi hubungan height-driven yang dapat membuat foto menyerobot info panel.
- Stress data diperiksa pada seluruh kategori; Artificial Flowers dan Artificial Boneka tetap memiliki copy terpanjang tanpa membutuhkan category-specific patch.
- Session-storage intro skip telah dihapus dari source aktif.
- Legacy straight-curtain classes telah dihapus dari source aktif.

Catatan build: dependency installation (`npm ci`) di workspace QA ini mengalami registry/container timeout, sehingga production build tidak diklaim sebagai rerun independen setelah patch terakhir. Data, syntax, dan CSS parser checks telah lulus. Jalankan `npm ci && npm run build` di environment dengan registry npm normal atau di Vercel sebelum publish final.
