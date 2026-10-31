# Technical SEO findings

**Score: 84 / 100.** Audited 31 October 2026 against the production build (`npm run build`, served locally), because `sensetunisia.com` does not resolve yet.

## What works

- All 16 pages are static, prerendered HTML: home, 2 journeys, 6 destinations and 7 experiences. Crawlers read the full content without running JavaScript.
- A crawl from the home page reaches every page. All of them return 200.
- URLs are clean and use a trailing slash (`/destinations/sahara/`). `vercel.json` sets `"trailingSlash": true`.
- The 9 indexable pages have a self-referencing canonical tag. The 7 experience pages and the 404 page carry `noindex, follow` and no canonical, which is consistent.
- `robots.txt` allows every agent and points to the sitemap.
- `sitemap.xml` lists exactly the 9 indexable URLs, each returning 200 with a canonical that matches.
- A `404.html` page exists, and Vercel serves it with a 404 status.
- Every page has `lang="en"` and a viewport meta tag.
- The security headers in `vercel.json` are thorough: CSP, HSTS (2 years, includeSubDomains), `X-Frame-Options: DENY`, `nosniff`, referrer policy, permissions policy and COOP. Hashed assets and images are cached for a year as immutable.
- The JavaScript is small: 17.2 kB, or 5.4 kB gzipped.
- Each build fails if a title or description is the wrong length, a page doesn't have exactly one `<h1>`, or a link points to a page that doesn't exist.

## Findings

| Severity | Finding | Evidence | Fix |
|---|---|---|---|
| Critical | **The site is not live.** Nothing can be crawled or indexed. | `https://sensetunisia.com` and `https://www.sensetunisia.com` do not resolve (31 Oct 2026). | Deploy to Vercel and connect the domain. Then verify it in Search Console (DNS) and Bing Webmaster Tools, and submit `/sitemap.xml`. |
| Medium | The live server's behaviour can't be verified before launch. | The local preview returns 200 for unknown URLs and applies none of the `vercel.json` headers or redirects. | After deploying, check four things: an unknown URL returns 404, `/destinations/sahara` 308-redirects to `/destinations/sahara/`, the headers are present, and one host (apex or `www`) 301-redirects to the other. |
| Medium | There is no www/apex canonical host rule in the repo. | Set in the Vercel dashboard, not in `vercel.json`. | Make `sensetunisia.com` the primary domain and redirect `www` to it. That matches every canonical URL on the site. |
| Low | The Vercel analytics scripts return 404 until they are switched on. | 2 console errors per page, which costs 4 points in Lighthouse Best Practices (96). | Enable Web Analytics and Speed Insights in the Vercel project. |
| Info | The sitemap has no `lastmod` dates. | `sitemap.xml` | Optional: add dates once pages change on different schedules. |
