# AI search readiness findings

**Score: 64 / 100.**

## What works

- The full text is in the HTML, so crawlers that don't run JavaScript (GPTBot, ClaudeBot, PerplexityBot) can read every page.
- `robots.txt` allows all crawlers, including AI crawlers.
- The facts are easy to quote: prices per person, durations, what's included, and one-line place descriptions ("Kerkouane. The only Punic town that survives, a UNESCO site.").
- The structured data names the business, the offers and the destinations.

## Findings

| Severity | Finding | Fix |
|---|---|---|
| High | **AI systems can't confirm who Sense is.** The brand name "Sense" is generic, and there are no social profiles (`sameAs`), no reviews, no mentions on other sites and no About page. Assistants recommend businesses they can verify through several sources. | Create the profiles (Instagram, Facebook, Tripadvisor, Google Business Profile) and link them with `sameAs`. Get onto curated "best tours in Tunisia" lists, which assistants lean on. Use "Sense Tunisia" consistently as the full name. |
| Medium | Short destination pages give little to quote for planning questions such as "best time to visit Tozeur". | Answer these in journal posts that put a direct answer under each heading, and link them to the destination pages. |
| Medium | There are no FAQ blocks on the journey pages. Common questions go unanswered: pickup, cruise-port timing, cancellation, languages. | Add a short FAQ to each journey once the facts are confirmed. |
| Low | There is no `llms.txt`. | Optional and quick to add: a short file listing the key pages. Google ignores it. |
