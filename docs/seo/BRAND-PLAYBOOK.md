# Sense Tunisia: brand playbook

*How to make search engines and AI assistants recognise **Sense Tunisia** as one brand, living at `www.sensetunisia.com` and `@sensetunisia` on Instagram. The website side is built (see the end of this document). Everything below is a step for you to take, with text ready to paste.*

On 31 October 2026, nobody else uses "sensetunisia" or "Sense Tunisia" in search. The only similar name is "Sensya Experience", a Tunisian hotel label launched in April 2026. Consistency is what turns that free name into a brand Google can recognise.

## 1. Brand facts

Use these exact words everywhere: Instagram, Google Business Profile, directories, partner sites and press.

| Field | Value |
|---|---|
| Name | **Sense Tunisia** (two words, capital S and T) |
| Handle | **@sensetunisia** |
| Website | **https://www.sensetunisia.com** |
| One-line description | Sense Tunisia designs private days and tailor-made trips across Tunisia with local hosts, from the Tunis medina to the Sahara. |
| Short description (160 characters) | Private days and tailor-made trips across Tunisia with local hosts: the Tunis medina, Carthage, Sidi Bou Saïd, the Sahara and Djerba. |
| Phone / WhatsApp | +216 27 757 537 (https://wa.me/21627757537) |
| Instagram | https://www.instagram.com/sensetunisia/ |
| Tagline | Extraordinary Tunisia |

**Rules:**
- Never use "Sense" on its own as a name or title. It is generic, and close to "Sensya".
- Write the handle as "@sensetunisia" and the address as "www.sensetunisia.com".
- Use the same profile picture everywhere: the favicon mark (`public/icon-512.png`).

## 2. Launch on Cloudflare

1. **Domain.** Done: `sensetunisia.com` was registered on 31 Oct 2026 at Cloudflare Registrar and expires on 31 Oct 2027. Keep auto-renew on (Domain Registration → Manage domains). Losing the domain would cost the brand everything built on it.
2. **Pages project.** Go to Workers & Pages → Create → Pages, and connect the GitHub repo `HoussemChabir/Sense`.
   - Build command: `npm run build`. Output directory: `dist`.
   - `public/_headers` deploys with the site: security headers, the CSP, and long caching for `/assets/*` and `/img/*`.
3. **Custom domains.** Add both `www.sensetunisia.com` and `sensetunisia.com` to the project.
4. **Bare domain to www.** Rules → Redirect Rules → Single Redirect:
   - match `https://sensetunisia.com/*`;
   - redirect to `https://www.sensetunisia.com/${1}` with status 301, and preserve the query string.
5. **`pages.dev` to www.** Add a Bulk Redirect from `<project>.pages.dev` to `https://www.sensetunisia.com`, with path and query preserved, status 301. This stops Google from finding a duplicate copy of the site. Cloudflare's guide: "Redirecting *.pages.dev to a custom domain".
6. **Analytics.** In the Pages project, Metrics → enable Web Analytics. It's cookieless, and the CSP already allows its beacon.
7. **Zone settings to check:**
   - **Rocket Loader:** off. It rewrites scripts.
   - **Email Address Obfuscation:** off. It rewrites HTML.
   - **Crawler access (critical).** Under Security → Bots (AI Crawl Control), Cloudflare sorts crawlers into Search, Agent and Training. Set **Search** and **Training** to Allow. Since 15 September 2026, blocking Training also blocks crawlers that do both, including **Googlebot, Bingbot and Applebot**, which would take the site out of Google and Bing. Allowing them also lets ChatGPT, Perplexity and Claude find and cite the site. After launch, confirm with Search Console → URL Inspection → Test live URL.
   - **Managed robots.txt:** if you enable it, check that the final `https://www.sensetunisia.com/robots.txt` still allows crawling and lists the sitemap.
   - **Speed Brain:** optional. Every page already includes its own speculation rules.
8. **Search engines.**
   - Google Search Console: add a Domain property for `sensetunisia.com`, verify with the DNS TXT record (one click on Cloudflare), and submit `https://www.sensetunisia.com/sitemap.xml`.
   - Bing Webmaster Tools: import from Search Console.

**Launch checks:**

| Command | Expected result |
|---|---|
| `curl -I https://sensetunisia.com/` | 301 → `https://www.sensetunisia.com/` |
| `curl -I https://<project>.pages.dev/` | 301 → www |
| `curl -I https://www.sensetunisia.com/destinations/sahara` | 308 → `/destinations/sahara/` |
| `curl -I https://www.sensetunisia.com/nope/` | 404 with the "This path wandered off." page |
| `curl -I https://www.sensetunisia.com/` | `Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options` present |
| Search Console → URL Inspection → Test live URL (home page) | Page fetch: Successful. If not, check the crawler access setting above. |

Also open DevTools on a few pages: there should be no CSP errors in the console.

## 3. Instagram (@sensetunisia)

| Setting | What to use |
|---|---|
| **Name** (searchable, 30 characters max) | `Sense Tunisia · Private Trips` |
| **Username** | `sensetunisia` (keep it) |
| **Category** | Tour Agency (or Travel Company) |
| **Bio** (150 characters max) | see the two options below |
| **Link** | `https://www.sensetunisia.com/?utm_source=instagram&utm_medium=social&utm_campaign=bio` |
| **Contact options** | WhatsApp: +216 27 757 537 |
| **Profile photo** | the final favicon mark, identical to the website |

Bio, option A:
```
Private days & tailor-made trips in Tunisia with local hosts 🇹🇳
Tunis · Carthage · Sahara · Djerba
Plan yours on WhatsApp ↓
```

Bio, option B, with no emoji:
```
Sense Tunisia: private days and tailor-made trips with local hosts. Tunis, Carthage, the Sahara, Djerba. Plan yours ↓
```

**Highlights** mirror the website: *Tunis · Carthage · Sahara · Djerba · Signature days · How to book*. Use one cover style, in the brand red and paper colours.

**Pinned posts.** Pin three:
1. Who Sense Tunisia is, using the one-line description.
2. The Tunisian way of life (from €149).
3. The Carthage & Blue escape (from €129).

**Every post:**
- First line: place and offer, e.g. "Sidi Bou Saïd · a private afternoon above the sea".
- Add "Plan your day: www.sensetunisia.com", or "link in bio".
- Tag the real location.
- Write custom alt text (Advanced settings → Accessibility) that describes the photo.
- Hashtags: `#sensetunisia` (always) plus 3–5 relevant ones (`#tunisia #sidibousaid #sahara #djerba #visittunisia`).
- Stories: use the link sticker to send people to the exact page, e.g. `www.sensetunisia.com/journeys/carthage-sidi-bou-said/`.

## 4. Google Business Profile

- **Business name:** `Sense Tunisia`. Add no keywords; that's against Google's rules.
- **Categories:** primary "Tour operator", secondary "Travel agency".
- **Website:** `https://www.sensetunisia.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp`
- **Phone:** +216 27 757 537, with WhatsApp chat connected.
- **Service area:** the cities you actually cover (e.g. Tunis, Carthage, Sidi Bou Saïd, La Marsa, La Goulette). Not "Tunisia", because Google no longer accepts whole countries.
- **Description:** the one-line description plus the short description.
- **Social profiles:** add Instagram.
- **Photos and reviews:** real photos only, and ask every guest for a review.

## 5. Claim "sensetunisia" everywhere

Reserve the same handle now, even before you post:
- Facebook (`facebook.com/sensetunisia`)
- TikTok, YouTube, X and Pinterest (`@sensetunisia`)
- A LinkedIn company page
- A Tripadvisor listing named "Sense Tunisia"

Once a profile is live and has content, add its URL to `brand.sameAs` in `src/content.js`, then rebuild and deploy. Search engines then link it to the website automatically. Use the brand facts (§1) on every one.

## 6. After launch: measure the brand

| When | Check |
|---|---|
| Week 1 | Search Console: sitemap read, home page and both journeys indexed (URL Inspection). [Rich Results Test](https://search.google.com/test/rich-results) and [validator.schema.org](https://validator.schema.org/) on the home page and one journey. |
| Weeks 2–4 | Google and Bing: search **"sensetunisia"** and **"Sense Tunisia"**. Expect the home page first, with Instagram nearby. In Google results, the site name above the link should read "Sense Tunisia". |
| Monthly | Search Console → Performance → Queries, filtered with regex `sense ?tunisia\|sensetunisia`: branded impressions, clicks and position. |
| Monthly | Cloudflare Web Analytics → Referrers: visits from `instagram.com` and `l.instagram.com`. Instagram Insights: link taps. |
| Quarterly | Ask ChatGPT, Perplexity and Google AI Mode "What is Sense Tunisia?" and check that the answer matches the one-line description. |

## What the website already does (built)

- **Every page title ends with "| Sense Tunisia"**; the home page leads with it. The build fails if a title is missing the brand.
- **Structured data on every page:**
  - the travel agency "Sense Tunisia", with alternate names "sensetunisia" and "Sense", the Instagram profile (`sameAs`), slogan, description, logo and WhatsApp booking contact;
  - the website "Sense Tunisia", which drives the site name Google shows;
  - a page node linking the two;
  - breadcrumbs rooted at "Sense Tunisia".
- **Visible brand:**
  - "Sense Tunisia signature days" on the home page and on each journey;
  - a footer on every page with the brand sentence, "Instagram @sensetunisia" and WhatsApp.
- **One address:** canonical links, share tags, the sitemap, `robots.txt` and `llms.txt` all use `https://www.sensetunisia.com`.
- **WhatsApp messages** open with "Hi Sense Tunisia, …".

## Favicons and logo (done)

The site uses your favicon set:
- `favicon.ico` at 16, 32 and 48 px, which covers Google's rule that the search-result icon be a multiple of 48 px;
- `icon-192.png` and `icon-512.png`;
- `apple-touch-icon.png`;
- `site.webmanifest`.

`icon-512.png` is also the logo in the structured data. Use the same mark as the Instagram profile photo, the Google Business Profile logo and the picture on every claimed profile.
