# Action plan: sensetunisia.com

*Prioritised from [FULL-AUDIT-REPORT.md](FULL-AUDIT-REPORT.md). Severity: Critical means indexing is blocked; High hurts rankings or conversions now; Medium is an optimisation within a month; Low is backlog.*

## Status on 31 October 2026

**Done in code:** 5, 6, 7, 10, 11, 12 (through the image sitemap), 13, 16, 17, 18, and the redirect half of 1. Journeys also gained a FAQ built only from facts already on the site (9, partly).

The fixes also added:

- the logo in the structured data, and an Apple touch icon;
- share-image size and alt tags;
- the `max-image-preview:large` robots tag;
- Speculation Rules, which fetch a linked page on hover;
- a dark placeholder behind image tiles while their photos load;
- build checks that fail on missing alt text or the text "undefined".

Measured on throttled mobile (1.6 Mbps, 150 ms, 4× CPU):

| Measure | Before | After |
|---|---|---|
| Home page visible (loader lifted) | 9.5 s | 2.4–2.9 s |
| Destination LCP | 4.3 s | 1.2 s |
| Journey LCP | 3.8 s | 1.3 s |

Lighthouse (mobile):

| Measure | Before | After |
|---|---|---|
| Home Performance | 63 | 66 |
| Home bytes | 3.5 MB | 2.1 MB |
| Home Accessibility | 96 | 100 |
| Destination Performance | 80 | 81 |
| Journey Performance | 86 | 87 |
| SEO, every page type | 100 | 100 |

**Still open, and needing you or business facts:**

- Deployment: 1, 2, 3 and 4.
- The trust layer and journey essentials: 8 and 9.
- Google Business Profile and reviews: 14.
- Building out the experience pages: 20.

15 (main-thread work) was profiled. The remaining time is the design's own layout and font work, with no cheap fix.

Image re-crops for bandwidth, such as landscape versions of the portrait `carthage` and `souk-medina` sources, need the asset pipeline and its `ssimulacra2` quality check, which isn't installed here.

## Critical: this week

1. **Register the domain, deploy on Cloudflare Pages and connect it.** Make `www.sensetunisia.com` primary and 301-redirect the bare domain and `*.pages.dev` to it (steps in `docs/seo/BRAND-PLAYBOOK.md`).
2. **Verify the live behaviour:**
   - an unknown URL returns 404 with the custom page;
   - `/destinations/sahara` 308-redirects to `/destinations/sahara/`;
   - the security headers are present.
3. **Search Console (DNS verification) and Bing Webmaster Tools:** submit `/sitemap.xml`, then request indexing of the home page and both journeys.
4. **Enable Cloudflare Web Analytics** in the Pages project. It becomes the source of real-user Core Web Vitals.

## High: within 1–2 weeks

5. **Stop the loader holding content back.** Lift it once the hero image and fonts are ready, or after about 2 s at most, instead of after every image. This reverses your earlier choice to keep it on every page, so it's your call. The measured cost is 9.5 s before content appears on slow mobile.
6. **Stop forcing every image to load.** Let below-the-fold images lazy-load natively. The home page currently transfers 3.4 MB of images up front. No change to image quality.
7. **Match destination titles to their content.** Drop "Guide" from the titles (e.g. "Tunis, Carthage & Sidi Bou Saïd: Private Trips | Sense"), or link each page to longer journal posts.
8. **Trust layer:** an About page (people, story, ONTT licence, address), real photos of hosts and days, and the business details added to the `TravelAgency` structured data. This depends on business information.
9. **Journey essentials:** meeting point or pickup area, group size, cancellation policy, languages and a short FAQ, once the facts are confirmed.

## Medium: within a month

10. **Internal links:** one or two contextual links per page, following `docs/seo/SITE-STRUCTURE.md` §4.
11. **Descriptive alt text:** add an `alt` per image in `src/content.js`, describing the photo.
12. **Image `src` for crawlers:** ship the smallest width as `src` on deferred images, or rely on native lazy loading.
13. **`BreadcrumbList`** (Home › page) on journeys and destinations.
14. **Google Business Profile** (Tour operator; service-area cities around Tunis) and review collection after each signature day (Google and Tripadvisor).
15. **Main-thread profiling** of the home page: the hidden atlas SVG, blur and backdrop filters. The target is TBT under 200 ms at 4× CPU.

## Low: backlog

16. Fix the duration-badge contrast on the turquoise card (`#157f85` is 3.53:1; it needs 4.5:1).
17. Reword the WhatsApp pre-filled message for experiences ("interested in the Culinary experience").
18. Add an `llms.txt` (optional).
19. Show an "updated" date on destination pages.
20. Build out the experience pages to about 300+ useful words, then set `index` back to true in `src/content.js`.

## Ongoing

- **Monthly:** Search Console coverage and queries, Speed Insights Core Web Vitals, and a 20-prompt check of how ChatGPT, Perplexity and Google AI Mode describe Sense.
- **Quarterly:** re-run this audit. The first re-run, about four weeks after launch, adds field data and indexation.
