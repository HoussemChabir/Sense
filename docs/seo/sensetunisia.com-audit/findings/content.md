# Content quality findings

**Score: 48 / 100.**

## Word counts (main content)

| Page type | Pages | Words |
|---|---|---|
| Home | 1 | 393 |
| Journeys (signature days) | 2 | 405–420 |
| Destinations | 6 | 192–227 |
| Experiences (`noindex`) | 7 | 47–62 |

## What works

- Every title and description is unique (16 of 16).
- The journey pages carry concrete, checkable facts: duration (7–8 hours), what's included, and a starting price per person (€129 / €149).
- The destination copy is short, plain and factual, with each place on one line. It's easy to scan and to quote.
- The brand voice is consistent and distinctive.

## Findings

| Severity | Finding | Evidence | Fix |
|---|---|---|---|
| High | **There are almost no trust signals (E-E-A-T).** | No About page, no named hosts or guides, no ONTT licence number, no address, no reviews or testimonials, no social profiles. The README says the photography is generated. | Add an About page with the people, licence, address and story, and real photos of hosts and days. Then collect reviews on Google and Tripadvisor. For a paid travel service, this matters more than word count. |
| High | **Destination pages promise a guide but deliver a summary.** | The titles say "Guide" (e.g. "Tunis, Carthage & Sidi Bou Saïd Guide"). The pages are about 200 words. Searches like "Sidi Bou Said" or "Tozeur" are answered by Wikipedia, Lonely Planet and long guides. | Either retitle the pages for planning intent (e.g. "Tunis, Carthage & Sidi Bou Saïd: Private Trips \| Sense") and keep them short, or put the depth in journal posts that link back here. Don't do both short pages and "Guide" titles. |
| Medium | Experience pages are very thin. | 47–62 words each. They are `noindex`, which contains the risk. | Keep them `noindex` until each has around 300+ useful words: what happens, where, who it suits, and links to destinations. Then set `index` back to true in `src/content.js`. |
| Medium | Journey pages leave out what buyers check first. | No meeting point or pickup area, group size, cancellation policy, languages, what to bring, FAQ or reviews. Every competing product page on Viator, GetYourGuide and Tripadvisor shows these. | Add them once the business facts are confirmed. A short FAQ (4–5 questions) answers the same questions AI assistants get asked. |
| Low | Guides have no "last updated" date. | Facts like seasons and festival dates change. | Show an updated date on destination pages. |
