# Local SEO and search-experience findings

## Local SEO (business type: tour operator and travel agency, local service with publisher content)

| Signal | Status |
|---|---|
| Name | "Sense Tunisia" in the structured data and footer; "Sense" in the wordmark |
| Phone | +216 27 757 537, the same in the footer, the floating button and the structured data |
| Address | Missing (the footer says "Tunisia, North Africa") |
| Google Business Profile | None |
| Reviews | None |
| Licence (ONTT) | Not shown |
| Messaging | WhatsApp on every page, with a pre-filled message that names the page |

| Severity | Finding | Fix |
|---|---|---|
| High | There is no Google Business Profile and no address, so the business can't appear in map results for searches like "tours Tunis". | Create the profile with the "Tour operator" category. If there's no public office, set it up as a service-area business listing cities (Tunis, Carthage, Sidi Bou Saïd, La Marsa, La Goulette), not the whole country. Connect WhatsApp, then add the address to the structured data and footer. |
| High | There are no reviews anywhere. | After each signature day, ask guests on WhatsApp for a review, with links to Google and Tripadvisor. |

## Search experience (does each page match what searchers expect?)

| Search | What ranks today | Sense page | Gap |
|---|---|---|---|
| "carthage sidi bou said private tour" | Product listings on Viator, GetYourGuide and Tripadvisor, with reviews, price, duration, free cancellation and instant booking | `/journeys/carthage-sidi-bou-said/`: price, duration, inclusions, WhatsApp booking | No reviews, cancellation policy, pickup or meeting point, or availability |
| "sidi bou said", "tozeur", "douz sahara" | Encyclopedia and travel-guide articles of 1,500+ words | Destination pages of about 200 words titled "Guide" | The page type doesn't match: retitle for planning intent, or put the depth in journal posts |
| "tunis food tour", "cooking class tunis" | Tour listings and food guides | `/experiences/food/`, which is `noindex` and 58 words | No page competes for this search yet |
| "la goulette shore excursion" | One local operator and the tour marketplaces | Nothing | Cruise visitors need port timing. Add a section to the Carthage journey. |
