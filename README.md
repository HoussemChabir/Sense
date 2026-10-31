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
- Security headers and immutable caching of content-hashed assets for Cloudflare Workers in `public/_headers`.
- Six destination guides on an illustrated regional map, two signature day journeys, and seven experience pages. Each has its own URL as static HTML with:
  - a title, description and canonical link;
  - share tags;
  - schema.org data: the travel agency, trips with their per-person offer and FAQ, destinations, and breadcrumbs.
- `sitemap.xml` (with images), `llms.txt`, a 404 page, favicons (`favicon.ico` at 16, 32 and 48 px; 192 and 512 px PNGs; an Apple touch icon) and a web manifest. `icon-512.png` doubles as the logo in the structured data.
- Keyboard-accessible dialogs, mobile navigation, manual story carousel, and reduced-motion support.
- Trip brief editing, local saving, text download, deletion, and sending on WhatsApp.

## Pages

The words live in `src/content.js`, including the alt text of every photo (`alts`) and the brand (`brand`): the name Sense Tunisia, the @sensetunisia Instagram and the one-line description. Titles, structured data, the footer, `llms.txt` and the WhatsApp greetings all read from it. The markup lives in `src/templates.js`.

At build time, the `pages` plugin in `vite.config.js` writes every page into `dist/`: `index.html` with the built CSS and JS, plus that page's head tags and markup. It then writes three more files:

- `sitemap.xml`, which lists each page's photos for image search;
- `llms.txt`, a plain-text map of the site for AI assistants;
- `404.html`.

The dev server renders the same pages per request.

The build fails on any of these:

- a missing or overlong title or description, or a title without the brand name;
- a page without exactly one `<h1>`;
- an image without alt text;
- the text "undefined" in a page;
- a link to a page that doesn't exist.

`src/main.js` only adds behaviour. To add a page, add an item to `src/content.js`. Set `index: false` to keep it out of search results and the sitemap until its copy is ready. `related` (journeys, destinations) and `where` (experiences) set the links between pages.

Only the home page shows the loading screen. It lifts once the hero photo is decoded and the font is ready, or 2.5 s after navigation at most. Photos below the fold get their source after the page has loaded, then load as they near the screen.

Each page's head carries inline speculation rules, so Chrome fetches a linked page when the visitor hovers over the link.

The site is hosted on Cloudflare Workers as static assets, with no Worker code: build command `npm run build`, deploy command `npx wrangler deploy`. `wrangler.jsonc` points Workers at `dist`, which serves each `dist/<path>/index.html` at `/<path>/` and uses `404.html` for unknown URLs.

`https://www.sensetunisia.com` is the one canonical address. A Cloudflare redirect rule sends the bare domain there with a 301, and the Worker's `*.workers.dev` address is turned off.

`docs/seo/BRAND-PLAYBOOK.md` lists the launch steps.

`docs/seo/` holds the SEO strategy, the audit and the brand playbook behind all of this.

## Documentation

Read `docs/DESIGN-ANALYSIS.md` for the comprehensive visual analysis and reconstruction specifications. `docs/asset-prompts.json` contains the original image-generation prompt set. Run `npm run assets` to rebuild the responsive images in `public/img/` from `assets/originals/` (plus the beach interlude photo and the atlas illustrations in `assets/atlas/`), and the watercolor edges and mask in `src/assets/`. It needs `ssimulacra2` from the [libjxl releases](https://github.com/libjxl/libjxl/releases) on `PATH` (or `SSIMULACRA2=/path/to/ssimulacra2`): every file is compared with its source at the same size and must score at least 90 ("visually lossless"), and the encoder quality is searched per file for the smallest file that passes. Results go to `assets/image-report.json`, and `src/image-manifest.json` tells the page which widths exist. Unchanged images are skipped, `npm run assets -- carthage` redoes one image, and `npm run assets -- --verify` re-checks every committed file. File names carry a content hash, so they are cached for a year. Source images that the site no longer uses live in `assets/unused/`. The loading screen's watercolour rings are the exception: `node scripts/extract-loader-rings.mjs` cuts them out of `assets/loader-mockup.png` into `src/assets/loader-ring-*` at a fixed AVIF quality 50, since they are only on screen while the page loads. The font is a subset of `assets/fonts/dm-sans-variable.ttf`:

```sh
python -m fontTools.subset assets/fonts/dm-sans-variable.ttf --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2190-2193,U+2212,U+2215,U+2713,U+FEFF,U+FFFD" --layout-features='*' --flavor=woff2 --output-file=assets/fonts/dm-sans-variable.woff2
```

## Status

Not a live booking service. Trip briefs stay in local browser storage until the visitor sends one to Sense Tunisia on WhatsApp; there is no booking backend, payment collection, or reservation. Page views and Core Web Vitals are measured with Cloudflare Web Analytics, which is cookieless, once it is enabled in the Worker. The CSP in `public/_headers` already allows its beacon. Photography is generated and illustrative. The working brand, real business information, production imagery, and legal documents can be replaced before launch.

## Technical choices

Vite with plain JavaScript and CSS; no runtime framework or external UI library. Pages are rendered to static HTML at build time from template strings, so search engines and AI crawlers read the full content without running JavaScript. Native dialog, browser validation, and semantic controls keep the site small. Sharp is a development-only asset preparation tool. All fonts and images are served locally.
