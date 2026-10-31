# Performance findings

**Score: 62 / 100.** These are lab measurements on the production build. There is no field data (CrUX) yet because the site is not live.

## Lighthouse 12.6 (mobile, simulated slow 4G)

| Page | Performance | FCP | LCP | TBT | CLS | Speed Index | Transfer | Requests |
|---|---|---|---|---|---|---|---|---|
| Home | 63 | 1.4 s | 7.1 s | 360 ms | 0 | 5.3 s | 3,530 KiB | 34 |
| Destination (Sahara) | 80 | 1.0 s | 4.5 s | 160 ms | 0 | 4.3 s | 820 KiB | 17 |
| Journey (Carthage) | 86 | 1.1 s | 3.8 s | 120 ms | 0 | 4.1 s | 552 KiB | 14 |

## Throttled browser run (1.6 Mbps, 150 ms RTT, 4× CPU, cache off)

| Page | `load` event | Content visible (loader gone) | LCP Chrome recorded | LCP with the loader removed |
|---|---|---|---|---|
| Home | 3.0 s | **9.5 s** | 2.4 s, the loader's ring image | 3.0 s, the hero's painted edge |
| Sahara | 3.0 s | **4.3 s** | 1.8 s, the loader's ring image | 1.1 s, text |

See `../screenshots/home-mobile-slow4g-at-3s.png`: 3 seconds in, the visitor still sees only the loader.

## Findings

| Severity | Finding | Fix |
|---|---|---|
| High | **The loading screen hides the page until every image has loaded**, including those far below the fold: 9.5 s on the home page on a slow mobile connection. Chrome's LCP records the loader's own ring image, so Core Web Vitals will look healthy while visitors wait. Slow connections are common for travellers browsing on mobile data. | Lift the loader once the hero image and fonts are ready, or after about 2 s at most. Let the rest load as visitors scroll. This is a design decision you made earlier (the loader on every page); the numbers above show what it costs. |
| High | **The home page loads 3.4 MB of images** (27 requests), because `main.js` switches every lazy image to eager so the loader can finish. The heaviest are `beach-interlude` (599 KiB), `souk-medina` (444 KiB), `carthage` (326 KiB) and `hero-mobile` (276 KiB). | Keep native `loading="lazy"` for images below the fold instead of forcing them eager. This cuts the first-visit transfer without touching image quality. |
| Medium | Main-thread work on the home page is heavy: TBT 360 ms, and 2.1 s of "Style & Layout" at 4× CPU. The DOM has 472 elements; two inline atlas SVGs, masks, filters and `backdrop-filter` are the likely causes. | Profile in Chrome DevTools, Performance panel, at 4× CPU. Check the cost of the hidden second atlas SVG (desktop and mobile versions are both in the DOM) and of the blur and backdrop filters. Watch Interaction to Next Paint (INP) on low-end phones. |
| Low | Lighthouse estimates 1.1 MiB could be saved by sizing images properly. | Most of this is by design: sizes are chosen so object-fit crops are never upscaled, and images are kept visually lossless (SSIMULACRA2 ≥ 90). Don't lower quality. If anything, check `sizes` for tiles and journey cards at mobile pixel densities. |
| Low | The stylesheet blocks rendering (52 kB, 12 kB gzipped; estimated 150 ms). | Acceptable as a single file. No action needed. |
