# Image findings

**Score: 62 / 100.**

## What works

- AVIF (10-bit, 4:4:4) with JPEG or WebP fallbacks through `<picture>`, in responsive widths.
- `width` and `height` on every image, so nothing shifts (CLS 0).
- Images below the fold are lazy-loaded, and the hero has `fetchpriority="high"`.
- File names describe the photo (`carthage-4c3ce5c6-800.avif`).

## Findings

| Severity | Finding | Evidence | Fix |
|---|---|---|---|
| Medium | **Deferred images have no `src` in the HTML.** Their URLs sit in `data-src` / `data-srcset` until JavaScript runs, so crawlers that don't render (image search, social previews, most AI crawlers) see no image. | 10 of 11 images on the home page, and 3 of 4 on each destination page. | Ship a real `src` (the smallest width) and defer only `srcset`, or drop the deferral and rely on native `loading="lazy"`. |
| Medium | **Alt text often doesn't describe the photo.** | Tiles use taglines ("A generous table. A thousand stories."). Destination galleries use "Tunis & the North — destination photograph 1". The page hero uses the page title ("The Carthage & Blue escape"). | Describe what is in the picture, e.g. "Blue door in a white wall, Sidi Bou Saïd", or "Couscous and brik on a shared table". Add an `alt` field per image in `src/content.js`. |
| Low | The photography is generated, not real (per the README). | `README.md` "Status" | Replace it with real photos, starting with the journey pages. Google Business Profile and reviews need real images anyway. |
| Info | File sizes are large for their dimensions. | e.g. `beach-interlude` 1080w AVIF is 599 KiB. | This is deliberate: every image is kept visually lossless. Keep the quality and reduce how many images load up front instead (see performance.md). |
