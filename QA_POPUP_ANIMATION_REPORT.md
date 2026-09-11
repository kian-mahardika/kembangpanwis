# QA Report — Popup + Bouquet Wrap + Hero Stagger

## Root cause popup

Popup lama menggabungkan two-column grid dengan panel foto yang memakai `height:100%`, `min-height` besar, dan `aspect-ratio`. Tinggi copy pada panel kanan dapat memperbesar row; foto kemudian memperoleh width intrinsik yang melebihi track kiri dan menutupi karakter awal pada panel informasi.

## Files changed

- `components/OpeningSequence.tsx`
- `components/Dialog.tsx`
- `components/ProductImage.tsx`
- `app/globals.css`
- `app/revision.css`
- `README.md`
- `REVISION_STATUS.json`

## Popup behavior final

- `>=1100px`: 45/55 two-column grid menggunakan `minmax(0,...)`.
- `768–1099px`: stacked single-column, dialog maksimal 780px/94vw.
- `<=767px`: existing bottom-sheet stack dipertahankan.
- Foto width-constrained, `height:auto`, `min-height:0`, `overflow:hidden`.
- Long copy menjadi vertical scroll pada dialog; tidak lagi mendorong width foto.
- Image crop tetap `cover` dengan posisi atas.

## Opening final

- Straight split curtain dihapus.
- Dua diagonal bouquet-wrap folds maroon membuka ke arah upper-left / lower-right.
- Existing logo Kembang Panwis tetap satu-satunya isi utama loader.
- Gold fold seam subtle; tanpa text loader, spinner, particle, atau confetti.
- Timer: opening mulai 720 ms; hero interactive 1340 ms; overlay unmount 1780 ms.
- Intro dimainkan pada setiap refresh; session-based skip dihapus.
- Deep-link product dialog menunggu `kembang-panwis:intro-done` agar tidak menimpa opening sebagai top-layer dialog.

## Hero stagger

Relative terhadap start wrap:

- frame: +80 ms
- ornament: +140 ms
- floral: +240 ms
- gold wave: +300 ms
- opening note: +340 ms
- main logo: +400 ms
- divider: +480 ms
- tagline: +520 ms
- CTA: +640 ms
- scroll indicator: +720 ms

CTA menjadi interactive saat konten unlock sekitar 1340 ms, bertepatan dengan entrance CTA.

## Cross-category stress inspection

Data category stress samples:

- Fresh Flowers: 33
- Artificial Flowers: AF-8
- Artificial Boneka: AFB-2
- Buket Kawat Bulu: KB-6
- Buket Pita Satin: PS-9
- Snack Bouquet: SB-4
- Papan Bunga: PB-1
- Bloom Box: BB-2

Perbaikan tidak memakai selector kategori atau product-specific CSS.

## QA checks

PASS:
- 94 products / 8 categories / all image paths.
- TS/TSX parser syntax check.
- CSS parser check for all relevant stylesheets.
- No active sessionStorage intro logic.
- No active `curtain-left` / `curtain-right` classes.

Not independently rerun:
- `npm run build`, because `npm ci` could not complete in the QA container due registry/container timeout.
