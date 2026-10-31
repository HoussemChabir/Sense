# Sense Tunisia: SEO Strategy

*Prepared 30 October 2026. Companion documents: [COMPETITOR-ANALYSIS.md](COMPETITOR-ANALYSIS.md), [SITE-STRUCTURE.md](SITE-STRUCTURE.md), [CONTENT-CALENDAR.md](CONTENT-CALENDAR.md), [IMPLEMENTATION-ROADMAP.md](IMPLEMENTATION-ROADMAP.md).*

## 1. Executive summary

Sense is a premium, host-led travel brand for Tunisia: signature private days around Tunis (€129–149 per person) and tailor-made journeys across six regions, sold through WhatsApp. The site is well built for people (fast AVIF imagery, accessible markup, strong editorial voice) but today it is close to invisible to search engines and AI assistants:

1. **Only one URL can rank.** Every destination, experience and journey lives behind a hash route (`#destination/the-sahara`). Google treats everything after `#` as the same page, so 15 content views collapse into the homepage.
2. **The HTML is empty until JavaScript runs.** `index.html` ships `<div id="app"></div>`; all copy is injected by `src/main.js`. Google renders JavaScript (with a delay), but GPTBot, ClaudeBot, PerplexityBot and most social/link previewers do not, so they see no content at all.
3. **No search metadata beyond the homepage title.** No canonical, no `og:url`, a relative `og:image`, no structured data, no sitemap.
4. **Thin trust signals.** No address, licence, team, reviews or real social profiles (footer links point to `#`), and the photography is largely generated.

The strategy is therefore **foundation first, then a focused content engine**: turn the existing content into ~15 real, prerendered, schema-marked pages; add the trust layer travel buyers and Google expect; then publish one cornerstone guide every two weeks that feeds the two money pages. Sense should not try to out-volume the marketplaces (Viator, GetYourGuide, Tripadvisor) or the 850-URL local operators. It should own a position nobody holds yet: **premium, host-led, "live a Tunisian day" travel**, in English first and French second.

## 2. Discovery: business profile and assumptions

| Item | What the codebase shows | Assumption used in this plan |
|---|---|---|
| Business type | Hybrid of local tour operator (day experiences) and tailor-made travel designer | Treated as a **local-service + travel-publisher hybrid** (no travel-specific template exists, so the local-service and publisher templates were combined) |
| Offer | 2 signature days (Tunis way of life €149, Carthage & Blue €129), 7 experience themes, 6 regions | Day experiences are the main revenue; multi-day tailor-made trips are upsell |
| Audience | English copy, prices in EUR | English-speaking Europeans (UK, Ireland, Nordics, NL) and North Americans first; **French-speaking market second** |
| Conversion | WhatsApp +216 27 757 537; the trip planner saves only to the browser | WhatsApp click is the primary conversion; the planner must be connected (see roadmap) |
| Domain | Not live yet (GitHub repo `HoussemChabir/Sense`); hosting on Cloudflare Pages | `https://www.sensetunisia.com`, confirmed as the production domain |
| Budget / capacity | Unknown | ~10–15 hours per week: founder plus one freelance writer, one photo shoot per season |
| Analytics | None by design (privacy-first) | Keep it cookieless: Search Console + Cloudflare Web Analytics |

### Open questions that change the plan

1. **Final domain** (and whether a `.tn` should redirect to it).
2. **Legal entity and ONTT travel-agency licence number.** Every serious competitor displays one; without it, Google Business Profile, OTA listings and trust copy are all weaker.
3. **A real address** (office or registered), or confirmation that Sense is a service-area business.
4. **Pickup coverage.** Can the signature days start from Hammamet, Sousse or La Goulette cruise port? Each one opens a distinct keyword set (see the competitor analysis).
5. **People.** Which hosts and guides agree to be named and photographed? This is the single biggest E-E-A-T lever.

## 3. Current site assessment

| # | Finding | Evidence | Severity | Fix (phase) |
|---|---|---|---|---|
| 1 | Hash routing hides all inner pages from search | `src/main.js:153-172` routes on `location.hash` | Critical | Real paths plus build-time prerender (P1) |
| 2 | Content only exists after JS executes | `index.html:26`, template at `src/main.js:86-129` | Critical | Prerender every route to static HTML (P1) |
| 3 | No per-page title/description, no canonical, no `og:url` | `index.html:7-18` | High | Generated per route (P1) |
| 4 | `og:image` is a relative path | `vite.config.js:21` emits `/img/...` | High | Absolute URL (P1) |
| 5 | No structured data | none in repo | High | TravelAgency, TouristTrip, TouristDestination, BreadcrumbList (P1) |
| 6 | No `sitemap.xml`; `robots.txt` has no `Sitemap:` line | `public/robots.txt` | High | Generate at build (P1) |
| 7 | Homepage title and H1 carry no searchable terms | `<title>Sense — Tunisia, felt differently</title>`, `<h1>Tunisia.</h1>` | High | Keyword-led title; keep the visual H1 but add a descriptive line (P1) |
| 8 | Detail views are thin (experience views are about 50 words) | `src/main.js:9-17` | High | Quality gate: 500–800+ unique words or no URL (P1–P2) |
| 9 | The trip planner never reaches Sense | `src/main.js:195-201`, README "no enquiry backend" | High (conversion) | Send the brief to WhatsApp with prefilled text (P1) |
| 10 | No NAP, licence, team or reviews; social links are `#` | `src/main.js:54-59`, footer | High (E-E-A-T) | About page, real profiles, `sameAs` (P1–P2) |
| 11 | Loader overlay waits for every image on the page, including below the fold | `src/main.js:235-244` | Medium (UX/engagement) | Measure on a slow 4G profile; release the loader once the hero and fonts are ready (P3) |
| 12 | Single language | `lang="en"` only | Medium | French version of core pages (P3) |
| 13 | No measurement | README | Medium | Search Console, Bing Webmaster Tools and Cloudflare Web Analytics (P1) |

What is already strong and must be kept: AVIF/JPEG `<picture>` delivery with visually lossless quality (SSIMULACRA2 ≥ 90; performance work must never lower this bar), a preloaded hero with `fetchpriority`, local fonts, a strict CSP and security headers, semantic landmarks, alt text, reduced-motion support, and concrete, citable facts on the journey views (duration, inclusions, starting price).

## 4. Positioning and keyword strategy

Exact search volumes were not available (no DataForSEO connection). The themes below come from SERP inspection on 30 October 2026; validate volumes with Google Keyword Planner and, after launch, with Search Console.

### Keyword themes by intent

| Theme | Example queries | Intent | Target page | Realistic first-year goal |
|---|---|---|---|---|
| Signature days (money) | carthage sidi bou said private tour, tunis day tour, tunis medina tour with local, tunis food tour | Transactional | `/journeys/*` | Top 10 for long-tail variants; page 1 for "with a local" modifiers |
| Shore excursions | la goulette shore excursion, tunis cruise port excursion | Transactional | `/journeys/carthage-sidi-bou-said/` plus a shore-excursion section, later its own page | Top 5 (low competition, only one local competitor targets it) |
| Tailor-made | tailor-made tunisia holiday, private tour tunisia, luxury tunisia tour | Commercial | `/tailor-made/`, home | Top 20, then top 10 with reviews |
| Destinations | sidi bou said, carthage ruins, tozeur oasis, douz sahara, djerba villages, el jem | Informational to commercial | `/destinations/*` | Top 10 for "[place] guide" and "[place] with a local" long-tail |
| Experiences | tunisian cooking class tunis, sahara camp tunisia, family holiday tunisia | Commercial | `/experiences/*` | Top 10 long-tail |
| Planning | tunisia itinerary 7 days, best time to visit tunisia, is tunisia safe, tunisian food | Informational | `/journal/*` | Top 10 for 5–10 guides; cited in AI answers |

### Differentiation to press in every title and intro

- **A host, not a script:** meals with locals, workshops, conversations. Competitors sell transport and entry tickets.
- **Everything included, per person:** meals, tastings, entries, transfers. This justifies €129–149 against "€74 per vehicle" competitors.
- **Editorial quality:** Sense's writing and design can earn links that generic operator sites cannot.

## 5. E-E-A-T building plan

Travel is not YMYL, but Google's raters and travellers both look for proof that real, accountable people run the experience.

| Signal | Action | Page | Phase |
|---|---|---|---|
| Experience | Real photography of hosts, guests (with consent) and the actual places on each signature day; replace generated images on money pages first. Run new photos through `npm run assets` so the SSIMULACRA2 ≥ 90 bar holds | `/journeys/*`, `/about/` | P2 |
| Expertise | Named host profiles: name, photo, neighbourhood, languages, years hosting, a personal quote | `/about/#hosts`, later `/hosts/<name>/` | P2 |
| Authoritativeness | ONTT licence number, Fédération Tunisienne des Agences de Voyages (FTAV) membership if held, press mentions, partner logos | `/about/`, footer | P1–P4 |
| Trust | Legal entity, address, booking and cancellation terms, privacy page, response-time promise, review widgets (Tripadvisor / Google) | footer, `/terms/`, `/privacy/` | P1–P2 |
| Authorship | Every journal post carries a named author with a bio, plus a "last updated" date | `/journal/*` | P2 |

## 6. Technical foundation

### Hosting and rendering

- Host on Cloudflare Pages, built with Vite. **Prerender every route at build time**: one static HTML file per URL, containing the full page markup, its own `<head>` and its JSON-LD. Plain multi-page navigation is the simplest model. The existing hover/focus image warm-up (`src/main.js:176-181`) keeps transitions feeling instant, and a `Speculation-Rules` response header can prerender likely next pages without inline script, so the CSP stays intact.
- Show the loader only on the first visit of a session. Repeating it on every multi-page navigation would hurt engagement.
- Keep a tiny shim so old hash links already shared on WhatsApp still work: `#journey/<slug>` → `location.replace('/journeys/<new-slug>/')`.

### Schema markup plan

| Page type | Schema types | Notes |
|---|---|---|
| Sitewide (in every page's graph) | `TravelAgency` (@id `#org`), `WebSite` | `TravelAgency` is a `LocalBusiness` subtype. Add `sameAs` only for real profiles |
| Home | `WebPage` + the sitewide graph | |
| Journey (signature day) | `TouristTrip` with `itinerary` (ItemList of `TouristAttraction`), `offers` (per-person `UnitPriceSpecification`), `provider` → `#org`, `BreadcrumbList` | No Google rich result exists for `TouristTrip`, but it gives AI systems and Bing unambiguous facts |
| Destination | `TouristDestination` with `includesAttraction`, `BreadcrumbList` | |
| Experience | `Service` (`serviceType`, `areaServed`, `provider`), `BreadcrumbList` | |
| Journal post | `BlogPosting` with `author` → `Person`, `dateModified`, `BreadcrumbList` | |
| About | `AboutPage` + `Person` for each named host | |
| FAQ blocks | `FAQPage` is optional | Since 2023, FAQ rich results only show for government and health sites. Keep FAQ content for users and AI answers, not for stars |
| Reviews | `aggregateRating` only on `TouristTrip`/`Product`-type pages and only from first-party reviews collected on site | Self-serving review markup on `TravelAgency`/`Organization` is not eligible for stars |

The CSP (`script-src 'self'`) does not block `<script type="application/ld+json">`: data blocks are never executed, so no CSP change is needed.

Sitewide graph (replace the placeholders):

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": "https://www.sensetunisia.com/#org",
      "name": "Sense Tunisia",
      "alternateName": "Sense",
      "url": "https://www.sensetunisia.com/",
      "logo": "https://www.sensetunisia.com/logo.png",
      "image": "https://www.sensetunisia.com/img/hero-desktop-<hash>-1600.jpg",
      "telephone": "+216 27 757 537",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "<street>",
        "addressLocality": "Tunis",
        "addressCountry": "TN"
      },
      "areaServed": { "@type": "Country", "name": "Tunisia" },
      "priceRange": "€€€",
      "sameAs": ["<instagram>", "<facebook>", "<tripadvisor>", "<google-business-profile>"]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.sensetunisia.com/#website",
      "url": "https://www.sensetunisia.com/",
      "name": "Sense Tunisia",
      "publisher": { "@id": "https://www.sensetunisia.com/#org" },
      "inLanguage": "en"
    }
  ]
}
```

Journey page (`/journeys/carthage-sidi-bou-said/`):

```json
{
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "@id": "https://www.sensetunisia.com/journeys/carthage-sidi-bou-said/#trip",
  "name": "The Carthage & Blue escape",
  "description": "A private full day from the ruins of Carthage to the blue-and-white village of Sidi Bou Saïd, with a Tunisian lunch, mint tea and a local host.",
  "touristType": ["Cultural tourism", "Couples"],
  "itinerary": {
    "@type": "ItemList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "item": { "@type": "TouristAttraction", "name": "Archaeological Site of Carthage" } },
      { "@type": "ListItem", "position": 2, "item": { "@type": "TouristAttraction", "name": "Sidi Bou Saïd" } }
    ]
  },
  "offers": {
    "@type": "Offer",
    "url": "https://www.sensetunisia.com/journeys/carthage-sidi-bou-said/",
    "priceCurrency": "EUR",
    "price": "129",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "129",
      "priceCurrency": "EUR",
      "referenceQuantity": { "@type": "QuantitativeValue", "value": 1, "unitText": "person" }
    },
    "availability": "https://schema.org/InStock"
  },
  "provider": { "@id": "https://www.sensetunisia.com/#org" }
}
```

Generate this JSON from the same data objects that render the page (`journeys`, `regions`, `experiences` in `src/main.js`), so prices and copy can never drift apart.

### Core Web Vitals targets (p75, mobile)

| Metric | Target | Notes |
|---|---|---|
| LCP | ≤ 2.0 s (Good threshold is 2.5 s) | Prerendered HTML removes the wait for `main.js` before the hero `<img>` exists |
| INP | ≤ 150 ms (Good threshold is 200 ms) | Little JS; keep it that way |
| CLS | ≤ 0.05 (Good threshold is 0.1) | Width and height are already set on images |

CrUX will not report field data until traffic is meaningful, so use **Cloudflare Web Analytics** (its Core Web Vitals report; the CSP in `public/_headers` allows its beacon) as the real-user source.

### AI search readiness (GEO)

- **Server-visible content** (prerendering) is the prerequisite: AI crawlers do not execute JavaScript.
- `robots.txt` already allows all agents. Make an explicit decision about `GPTBot`, `ClaudeBot`, `PerplexityBot` and `Google-Extended`. Recommendation: allow them, because citations in AI answers are free distribution for a niche brand.
- Write **quotable passages**: a 40–60 word answer under each H2 ("How long is the Carthage & Sidi Bou Saïd day? About 7–8 hours…"), tables for inclusions and prices, and dated facts.
- Build presence on **curated "best of" lists** (The Tunisia Guide, travel bloggers, Tripadvisor), which assistants lean on for recommendations.
- An `llms.txt` file is optional and cheap. Google ignores it.

### Mobile-first

Most travel research happens on phones, and WhatsApp is the conversion channel. Keep the floating WhatsApp button, make every CTA open WhatsApp with a prefilled message naming the page ("Hi Sense, I'm interested in the Carthage & Blue escape for 2 people in April"), and test every page at 360 px.

## 7. Off-site and local

| Channel | Why | Action |
|---|---|---|
| Google Business Profile | Map-pack visibility for "tours Tunis" and review collection | Category "Tour operator" (secondary "Travel agency"). If there is no public office, set it up as a service-area business listing cities (Tunis, Carthage, Sidi Bou Saïd, La Marsa, La Goulette), not the whole country. Connect WhatsApp as the messaging channel |
| Tripadvisor | Dominates "things to do in Tunis" SERPs; strong trust signal | Claim a listing for each signature day; ask every guest for a review |
| GetYourGuide / Viator | They own transactional SERPs; listing there captures that demand and builds branded search | List both signature days and accept the ~20–30% commission as an acquisition cost |
| Partnerships and PR | Links plus "best of" inclusion | Host travel writers who rank for Tunisia itineraries; pitch The Tunisia Guide's "best tours" list |
| Certifications | Touil Travel shows Travelife and ATTA membership as trust badges | Consider Travelife or a similar sustainability label in Phase 4 |

## 8. KPI targets

Baselines are zero because the domain is not live. Targets are planning estimates for a niche, premium operator; recalibrate after the first 8 weeks of Search Console data.

| Metric | Baseline | 3 months | 6 months | 12 months |
|---|---|---|---|---|
| Organic sessions / month | 0 | 150–400 | 800–1,500 | 3,000–6,000 (EN + FR) |
| Queries ranking top 10 (GSC avg. position ≤ 10) | 0 | 5–15 | 30–60 | 100–200 |
| Referring domains | 0 | 10 | 25 | 50+ |
| Moz Domain Authority | 0 | 3–5 | 8–12 | 15–20 |
| Indexed pages | 0 | 22–28 | 35–45 | 70–90 |
| Core Web Vitals (p75 mobile, Speed Insights) | not measured | All Good | All Good | All Good |
| Organic enquiries / month (WhatsApp clicks + planner sends) | 0 | 5–10 | 20–40 | 60–120 |
| Reviews (Google + Tripadvisor) | 0 | 10 | 30 | 75 |
| AI citations (manual monthly check of 20 prompts in ChatGPT, Perplexity, Google AI Mode) | 0 | 0–1 | 2–4 | 6–10 |

## 9. Success criteria per phase

| Phase | Done when |
|---|---|
| 1. Foundation (weeks 1–4) | Every route returns full HTML with a unique title, description, canonical and JSON-LD; sitemap submitted; Search Console shows the core URLs indexed; WhatsApp enquiries are trackable |
| 2. Expansion (weeks 5–12) | All launched pages pass the quality gate; journal live with 6+ posts; real photography on both journey pages; GBP and Tripadvisor live with first reviews |
| 3. Scale (weeks 13–24) | French core pages live with hreflang; 10+ referring domains; first top-10 rankings for journey long-tail; listed on GetYourGuide or Viator |
| 4. Authority (months 7–12) | Original first-party research published and cited; 50+ referring domains; enquiries from organic meet the 12-month target |

## 10. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Launching 15 thin pages invites low-quality signals | Quality gate in [SITE-STRUCTURE.md](SITE-STRUCTURE.md): pages that miss it stay as homepage tiles with no URL |
| Generated photography reads as stock and undermines trust | Seasonal real shoots; money pages first |
| No licence or address blocks GBP and OTA listings | Resolve before Phase 2; the plan can run without them, but more slowly |
| Price comparison with €74-per-vehicle operators | Lead with what is included and with the host; never compete on price |
| Travel-advisory news shifts demand | A dated, honest safety guide that cites official sources; diversify markets via French |
| Small team, so content cadence slips | Two posts a month is the floor; refresh beats volume |
