# SEO audit: sensetunisia.com

*31 October 2026. Detailed evidence for each category is in [findings/](findings/); screenshots are in [screenshots/](screenshots/); the prioritised fixes are in [ACTION-PLAN.md](ACTION-PLAN.md).*

> **Update, 31 October 2026:** the code-level findings below have been fixed. Since then, hosting has moved from Vercel to Cloudflare Pages (`public/_headers` replaces `vercel.json`), and the canonical address is now `https://www.sensetunisia.com`. See the status at the top of [ACTION-PLAN.md](ACTION-PLAN.md) for what changed and the before and after measurements. What remains needs deployment or business details.

## Executive summary

**SEO health score: 69 / 100 (pre-launch build).**

**Business type:** tour operator and travel agency (a local service business with destination content). It sells private day experiences around Tunis (€129–149 per person) and tailor-made trips, booked through WhatsApp.

**Scope and method.** `sensetunisia.com` does not resolve yet, so this audit ran on the production build (`npm run build`) served locally:

- A crawl from the home page: 16 pages and a 404 page.
- Lighthouse 12.6 on the home page, one destination and one journey (mobile, simulated slow 4G).
- A throttled browser run that measured when content actually becomes visible.
- Screenshots at desktop and mobile sizes.

No Google Search Console, CrUX, GA4, Moz or DataForSEO data was available, and with no live domain there are no backlinks to analyse. The score reflects the build's readiness; the live site scores nothing until it is deployed.

The technical foundation is strong:

- Every page is static HTML with unique titles and descriptions, canonical tags and valid structured data.
- There is a sitemap, a 404 page and thorough security headers.
- Lighthouse scores SEO 100 on every page type.

The gaps are elsewhere: the site isn't live, the loading screen holds content back, trust signals are missing, and the destination pages are thin compared with their "Guide" titles.

### Top 5 issues

| # | Severity | Issue |
|---|---|---|
| 1 | Critical | **The site is not live.** The domain does not resolve, so nothing can be indexed. |
| 2 | High | **The loading screen hides the page until every image loads:** 9.5 s on the home page on slow mobile, while Chrome's LCP records the loader's own image (2.4 s). |
| 3 | High | **The home page loads 3.4 MB of images up front**, because every lazy image is forced to load so the loader can finish. |
| 4 | High | **There are almost no trust signals.** No About page, named hosts, licence, address, reviews or social profiles, and the photography is generated. |
| 5 | High | **Destination pages are titled "Guide" but run to about 200 words**, while those searches are answered by long guide articles. |

### Top 5 quick wins

1. Fix the contrast of the turquoise duration badge (`#157f85` on paper is 3.53:1; small text needs 4.5:1). One line of CSS.
2. Add one or two contextual links per page. For example, both journeys link to `/destinations/tunis/`, and destinations link to their journeys and experiences.
3. Rewrite the alt text so it describes the photos. Taglines like "A generous table. A thousand stories." describe nothing.
4. Retitle the destination pages away from "Guide" to fit their short, planning-focused content.
5. Add a two-level `BreadcrumbList` (Home › page) to journey and destination pages.

## Category scores

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 84 | 18.5 |
| Content quality | 23% | 48 | 11.0 |
| On-page SEO | 20% | 84 | 16.8 |
| Schema / structured data | 10% | 74 | 7.4 |
| Performance (Core Web Vitals) | 10% | 62 | 6.2 |
| AI search readiness | 10% | 64 | 6.4 |
| Images | 5% | 62 | 3.1 |
| **Total** | | | **69** |

## Technical SEO (84): [details](findings/technical.md)

What works:

- 16 static pages, all returning 200 and all reached by crawling from the home page.
- Trailing-slash URLs.
- Canonical tags on the 9 indexable pages; `noindex, follow` on the 7 experiences and the 404 page.
- `robots.txt` allows all crawlers and points to the sitemap; the sitemap lists exactly the 9 indexable pages.
- Strong security headers and immutable caching in `vercel.json`.
- A build check that fails on bad titles, descriptions, H1s or broken links.

What doesn't:

- **Critical:** the site is not live.
- **Medium:** server behaviour (404 status, trailing-slash redirects, headers, www/apex) can only be verified after deployment.
- **Low:** the analytics scripts 404 until Vercel Web Analytics and Speed Insights are enabled.

## Content quality (48): [details](findings/content.md)

What works: titles and descriptions are unique; the journey pages state facts (duration, what's included, price per person); the destination copy is plain and easy to scan.

What doesn't:

- **High:** almost no trust signals (no About page, licence, address, hosts, reviews or real photos).
- **High:** the "Guide" titles promise more than the roughly 200-word pages deliver.
- **Medium:** experience pages run to 47–62 words (contained by `noindex`).
- **Medium:** journey pages lack meeting point, cancellation policy, languages and a FAQ.

## On-page SEO (84): [details](findings/on-page.md)

What works: titles are 34–52 characters and descriptions 130–158; each page has one H1 and logical heading levels; slugs are descriptive; share tags are complete; every page is one click from home.

What doesn't: **Medium:** pages rarely link to each other beyond home and next/previous; journeys don't link to the Tunis destination, and five of the six destinations don't link to any journey or experience.

## Schema (74): [details](findings/schema.md)

What works: valid JSON-LD on every page. `TravelAgency` appears site-wide, `WebSite` on home, `TouristTrip` with a per-person EUR offer on the journeys, and `TouristDestination` with its attractions on the destinations. All of it is generated from the same data as the pages.

What doesn't:

- **Medium:** `TravelAgency` has no address, logo, `sameAs` or `priceRange`.
- **Medium:** there is no `BreadcrumbList`.

## Performance (62): [details](findings/performance.md)

Lighthouse (mobile) Performance scores:

| Page | Score | LCP | TBT | CLS |
|---|---|---|---|---|
| Home | 63 | 7.1 s | 360 ms | 0 |
| Destination | 80 | 4.5 s | — | 0 |
| Journey | 86 | 3.8 s | — | 0 |

What doesn't:

- **High:** on a throttled connection the loader hides the home page until about 9.5 s.
- **High:** the home page transfers 3.4 MB of images up front.
- **Medium:** heavy main-thread work (2.1 s of style and layout at 4× CPU slowdown).

The image file sizes themselves are deliberate: images are kept visually lossless, so the fix is to load fewer images up front, not to lower quality.

## Images (62): [details](findings/images.md)

What works: AVIF with fallbacks, responsive widths, fixed dimensions (no layout shift), lazy loading and a high-priority hero image.

What doesn't:

- **Medium:** deferred images have no `src` in the HTML, so crawlers that don't run JavaScript can't see them (10 of 11 on home).
- **Medium:** alt text is mostly taglines or titles rather than descriptions.
- **Low:** the photography is generated.

## AI search readiness (64): [details](findings/ai-search.md)

What works: full content in the HTML, AI crawlers allowed, and short facts that are easy to quote.

What doesn't:

- **High:** weak signals about the business itself (generic name, no profiles, reviews or mentions).
- **Medium:** short pages and no FAQ blocks for common planning questions.
- **Low:** no `llms.txt`.

## Local SEO and search experience: [details](findings/local-sxo.md)

What works: the phone number (+216 27 757 537) is the same everywhere, and WhatsApp is on every page.

What doesn't:

- **High:** no address, no Google Business Profile, no reviews.

Search-experience mismatches:

- Journey searches are answered by marketplace listings with reviews and cancellation terms, which the journey pages lack.
- Destination searches expect long guides.
- Food tours and shore excursions have no matching page yet.

## Visual and mobile: [details](findings/visual.md)

What works: the H1, subtitle and main button are above the fold on desktop and mobile; there's no horizontal scroll; accessibility scores 96–100.

What doesn't:

- **High:** the loader is the first screen on slow connections (screenshot at 3 s).
- **Low:** the turquoise badge fails colour contrast.

## Limitations

- The live server could not be tested: headers, redirects, 404 status and the www/apex host rule.
- There is no field data (CrUX/INP), Search Console coverage, backlink profile or keyword-ranking data. Re-run this audit about four weeks after launch to get them.
