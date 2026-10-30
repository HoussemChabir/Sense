# Sense Tunisia: Implementation Roadmap

*Start: Monday 2 November 2026. Effort: S is under half a day, M is 1–2 days, L is 3+ days. "Owner" is a suggestion: Dev, Content (writer), or Founder (business decisions, people, partners).*

## Phase 1: Foundation (weeks 1–4, 2 to 29 November 2026)

Goal: every page that exists is crawlable, unique, measurable and converts.

### Technical (Dev)

| # | Task | Effort | Depends on | Done when |
|---|---|---|---|---|
| 1.1 | Move `experiences`, `journeys` and `regions` out of `src/main.js:9-52` into a data-only module (for example `src/content.js`) with final slugs from [SITE-STRUCTURE.md](SITE-STRUCTURE.md) | S | slug decisions | Module imports cleanly in Node (no `document`) |
| 1.2 | Split the page templates (home and the `render` functions at `src/main.js:147-151`) from DOM wiring so they are pure `data → HTML string` functions | M | 1.1 | Templates run in Node |
| 1.3 | Build-time prerender: a Vite plugin in `vite.config.js` (for example a `closeBundle` hook) writes `dist/<route>/index.html` for every route, each with its own title, description, canonical, `og:url`, absolute `og:image`, JSON-LD and full body markup | L | 1.2, domain | `curl https://<domain>/destinations/sahara/` returns the page text with no JS |
| 1.4 | Swap hash links for real `href`s; plain page navigation; keep image warm-up on hover; delete the hash router (`src/main.js:153-174`) | M | 1.3 | No `#type/slug` links remain |
| 1.5 | Hash shim: `#journey/…`, `#destination/…`, `#experience/…` → `location.replace(newPath)` | S | 1.4 | Old WhatsApp links land on the right page |
| 1.6 | Show the loader on the first visit of a session only (`sessionStorage` flag) | S | 1.4 | Navigating between pages shows no loader |
| 1.7 | `sitemap.xml` generated in the same build step from the same route list; `Sitemap:` line in `public/robots.txt` | S | 1.3 | Sitemap validates and lists only indexable URLs |
| 1.8 | `vercel.json`: `"trailingSlash": true`, a real `404.html` | S | 1.3 | Unknown URLs return a 404 status, not the homepage |
| 1.9 | JSON-LD: sitewide `TravelAgency` + `WebSite`; `TouristTrip`, `TouristDestination`, `Service` and `BreadcrumbList` per type (examples in [SEO-STRATEGY.md](SEO-STRATEGY.md) §6), generated from the content data | M | 1.1, NAP | Rich Results Test and the Schema.org validator show 0 errors |
| 1.10 | Visible breadcrumbs on inner pages | S | 1.3 | Present on every non-home page |
| 1.11 | Planner sends to WhatsApp: on submit, open `https://wa.me/21627757537?text=<encoded brief>` (keep the local save and download) | S | — | Submitting opens WhatsApp with the brief prefilled |
| 1.12 | Every `data-plan`/CTA WhatsApp link carries prefilled text naming the page | S | 1.11 | Click events are attributable by page |
| 1.13 | Replace `#` social links with real profiles, or remove them until they exist (`src/main.js:54-59`) | S | Founder | No `href="#"` in the footer |

### Measurement (Dev + Founder)

| # | Task | Effort | Done when |
|---|---|---|---|
| 1.14 | Google Search Console (DNS verification, so no on-page code) and Bing Webmaster Tools; submit the sitemap | S | Both show the sitemap as "Success" |
| 1.15 | Vercel Web Analytics and Speed Insights. Both load from `/_vercel/…` on the same origin, so the existing CSP needs no change and no cookies are set. Custom events (WhatsApp clicks) need the Vercel Pro plan; on Hobby, rely on the page name in the prefilled WhatsApp text (1.12) and log enquiries by source in the KPI sheet | S | Dashboard shows page views and real-user CWV; enquiries attributable by page |
| 1.16 | Monthly KPI sheet (the table in [SEO-STRATEGY.md](SEO-STRATEGY.md) §8) | S | First baseline row filled in |

### Content and trust (Content + Founder)

| # | Task | Effort | Depends on |
|---|---|---|---|
| 1.17 | Rewrite both journey pages to the quality gate | M | host details |
| 1.18 | Write the destination pages that can pass the gate (Tunis and Sahara at minimum) | L | — |
| 1.19 | `/about/` (story, hosts, licence), `/tailor-made/`, `/terms/`, `/privacy/`, `/contact/` | M | licence, address |
| 1.20 | New homepage title, meta description and descriptive line under the visual "Tunisia." H1 | S | — |

**Phase 1 exit check:** a URL Inspection "Test live URL" in Search Console shows full content for 5 sample pages; 0 schema errors; WhatsApp click events recording.

## Phase 2: Expansion (weeks 5–12, 30 November 2026 to 24 January 2027)

| # | Task | Owner | Effort | Done when |
|---|---|---|---|---|
| 2.1 | Journal template (`/journal/` index plus post layout with author, dates, `BlogPosting` JSON-LD) inside the same prerender step | Dev | M | First post live |
| 2.2 | Publish journal posts on the [CONTENT-CALENDAR.md](CONTENT-CALENDAR.md) schedule (5 by the end of January) | Content | ongoing | On schedule |
| 2.3 | Remaining destination and experience pages, each only when it passes the gate | Content | L | All 6 destinations live |
| 2.4 | **Photo shoot 1:** both signature days, with hosts and consenting guests. Replace generated images on the journey and about pages. Process with `npm run assets` (SSIMULACRA2 ≥ 90 holds) | Founder | L | No generated images on money pages |
| 2.5 | Host profiles on `/about/` with `Person` JSON-LD | Content | M | 2+ named hosts |
| 2.6 | Google Business Profile: "Tour operator" category, service-area cities, WhatsApp connected, 10+ real photos | Founder | M | Verified |
| 2.7 | Tripadvisor listing for each signature day; post-trip review request on WhatsApp (Google + Tripadvisor links) | Founder | S | 10 reviews total |
| 2.8 | Internal linking pass per [SITE-STRUCTURE.md](SITE-STRUCTURE.md) §4 (descriptive anchors, experience ↔ destination matrix) | Dev + Content | S | Every page has 3+ contextual inbound links |
| 2.9 | Search Console review: fix "Crawled – currently not indexed" pages by improving them, not by resubmitting | Dev | S | 90%+ of submitted URLs indexed |

## Phase 3: Scale (weeks 13–24, 25 January to 18 April 2027)

| # | Task | Owner | Effort | Done when |
|---|---|---|---|---|
| 3.1 | French version of the core pages (`/fr/`), hreflang `en` / `fr` / `x-default` in the HTML and sitemap, `lang="fr"`. Translate with a native editor, never raw machine output | Content + Dev | L | FR core indexed |
| 3.2 | List both signature days on GetYourGuide and/or Viator | Founder | M | Live listings |
| 3.3 | Outreach: host 3–5 travel writers who rank for Tunisia itineraries; pitch The Tunisia Guide's "best tours in Tunisia" list | Founder | M | 10+ referring domains |
| 3.4 | GEO: answer-first passages on all money pages; a monthly 20-prompt check in ChatGPT, Perplexity and Google AI Mode; decide the AI-crawler rules in `robots.txt` | Content | S | Baseline recorded |
| 3.5 | Performance: profile the first visit on slow 4G. If the loader (which waits for every image, `src/main.js:235-244`) keeps users waiting past ~2.5 s, release it once the hero and fonts are ready. Never lower image quality to gain speed | Dev | S | Speed Insights p75 LCP ≤ 2.0 s |
| 3.6 | `Speculation-Rules` response header pointing to a JSON file (served as `application/speculationrules+json`, set in `vercel.json`) to prerender likely next pages on hover, with no inline script, so the CSP is unchanged | Dev | S | Instant navigations in Chrome |
| 3.7 | Gated city sub-pages (Sidi Bou Saïd, Carthage) if Search Console shows impressions for them | Content | M | Each passes the 600-word / 60%-unique gate |
| 3.8 | Shore-excursion page split out from the Carthage journey if that section earns impressions | Content | M | Live |

## Phase 4: Authority (months 7–12, May to October 2027)

| # | Task | Owner | Effort |
|---|---|---|---|
| 4.1 | Original research: "What travellers ask before visiting Tunisia" (anonymised WhatsApp questions), then the annual "Travel in Tunisia 2027" report; pitch both to travel media | Content + Founder | L |
| 4.2 | Digital PR: seasonal stories (Sahara season, Ramadan, cruise season) pitched to UK and French travel desks | Founder | M |
| 4.3 | `/reviews/` page with first-party reviews; `aggregateRating` on journey pages only, from reviews collected on the site | Dev | M |
| 4.4 | Sustainability credential (Travelife or similar) and memberships shown on `/about/` | Founder | L |
| 4.5 | Content refresh cycle (see the calendar's refresh rules); prune or merge underperforming posts | Content | ongoing |
| 4.6 | Evaluate a German or Italian version from Search Console country data (competitors run both) | Founder | S |
| 4.7 | Quarterly technical audit: indexation, schema, CWV, broken links | Dev | S |

## Resource requirements

| Role | Load | Phase focus |
|---|---|---|
| Developer | ~5 days in Phase 1, then ~2 hours per week | Prerender, schema, measurement |
| Writer (native English; plus native French editor from Phase 3) | ~8 hours per week | Pages, then 2 posts a month |
| Founder | ~3 hours per week | Licence and NAP, hosts, reviews, partners, PR |
| Photographer | 1 shoot per season | Real imagery for money pages first |

## Dependencies (critical path)

```
Domain ─┬─► 1.3 prerender ─► 1.7 sitemap ─► 1.14 Search Console submit ─► indexing
        └─► canonical / og:url / JSON-LD @id values
Licence + address ─► 1.9 TravelAgency schema ─► 2.6 GBP ─► reviews ─► 3.2 OTA listings
Host consent ─► 2.4 photo shoot ─► 2.5 host profiles ─► E-E-A-T
```

## Risk register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Prerender step drifts from the live templates | Medium | High | One set of template functions used both client-side and at build; no duplicated markup |
| Thin pages shipped to hit the page count | Medium | High | Quality gate enforced in the build: a route without `ready: true` in the content data is not emitted |
| Licence or address unavailable | Medium | Medium | Launch the site without GBP; rely on Tripadvisor and OTAs for reviews meanwhile |
| Enquiries not attributable to pages | Medium | Medium | Prefilled WhatsApp text names the page (1.12); founder tags each conversation's source in the KPI sheet |
| Writer capacity slips | High | Medium | 2 posts a month is the floor; refreshes count toward cadence |
| Algorithm or AI Overview changes cut informational clicks | Medium | Medium | Weight KPIs toward enquiries and AI citations, not sessions alone |
| Old hash links break | Low | Low | Shim in 1.5; test with links from WhatsApp history |
