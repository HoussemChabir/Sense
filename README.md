# Sense — Tunisia, felt differently

A responsive, image-led Tunisia travel concept inspired by the supplied EPIC Morocco reference. Crimson typography, original travel photography, hand-painted edges, and an illustrated regional map.

## Run

```sh
npm install
npm run dev
```

Production build:

```sh
npm run build
npm run preview
```

## Included

- Desktop and mobile layouts, with a separate portrait hero image.
- Fourteen original generated images, including an alpha-transparent watercolor border.
- Visually lossless responsive images: AVIF (10-bit, 4:4:4) with a JPEG fallback, served via `<picture>` at widths up to each original, lazy below the fold, and local DM Sans typography (Latin-subset WOFF2).
- Security headers and immutable caching of content-hashed assets for Vercel in `vercel.json`.
- Six-region discovery map, seven experience details, three sample itineraries, four accommodation concepts, and three journal entries.
- Keyboard-accessible dialogs, mobile navigation, manual story carousel, and reduced-motion support.
- Trip brief editing, local saving, text download, and deletion.
- Newsletter preview with explicit local-only behavior and data deletion.

## Documentation

Read `docs/DESIGN-ANALYSIS.md` for the comprehensive visual analysis and reconstruction specifications. `docs/asset-prompts.json` contains the original image-generation prompt set. Run `npm run assets` to rebuild the responsive images in `public/img/` from `assets/originals/` (plus the beach interlude photo and the atlas illustrations in `assets/atlas/`), and the watercolor edges and mask in `src/assets/`. It needs `ssimulacra2` from the [libjxl releases](https://github.com/libjxl/libjxl/releases) on `PATH` (or `SSIMULACRA2=/path/to/ssimulacra2`): every file is compared with its source at the same size and must score at least 90 ("visually lossless"), and the encoder quality is searched per file for the smallest file that passes. Results go to `assets/image-report.json`, and `src/image-manifest.json` tells the page which widths exist. Unchanged images are skipped, `npm run assets -- carthage` redoes one image, and `npm run assets -- --verify` re-checks every committed file. File names carry a content hash, so they are cached for a year. Source images that the site no longer uses live in `assets/unused/`. The loading screen's watercolour rings are the exception: `node scripts/extract-loader-rings.mjs` cuts them out of `assets/loader-mockup.png` into `src/assets/loader-ring-*` at a fixed AVIF quality 50, since they are only on screen while the page loads. The font is a subset of `assets/fonts/dm-sans-variable.ttf`:

```sh
python -m fontTools.subset assets/fonts/dm-sans-variable.ttf --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2190-2193,U+2212,U+2215,U+2713,U+FEFF,U+FFFD" --layout-features='*' --flavor=woff2 --output-file=assets/fonts/dm-sans-variable.woff2
```

## Status

This is a complete local frontend concept, not a live booking service. Trip briefs and newsletter emails stay in local browser storage. There is no enquiry/email backend, payment collection, reservation, analytics, or real newsletter submission. Photography is generated and illustrative. The working brand, real business information, production imagery, and legal documents can be replaced before launch.

## Technical choices

Vite with plain JavaScript and CSS; no runtime framework or external UI library. Native dialog, browser validation, and semantic controls keep the site small. Sharp is a development-only asset preparation tool. All fonts and images are served locally.
