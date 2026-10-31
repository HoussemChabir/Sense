# Schema and structured data findings

**Score: 74 / 100.**

## Current implementation (JSON-LD, all valid JSON)

| Page | Types |
|---|---|
| Home | `TravelAgency` (`@id` `#org`), `WebSite` |
| Journeys (2) | `TravelAgency`, `TouristTrip` with `itinerary` (ItemList of `TouristAttraction`) and an `Offer` priced per person through `UnitPriceSpecification` (EUR) |
| Destinations (6) | `TravelAgency`, `TouristDestination` with `includesAttraction` |
| Experiences (7), 404 | `TravelAgency` |

The data is generated from `src/content.js`, the same data that renders the pages, so prices and names can't drift apart.

## Findings

| Severity | Finding | Fix |
|---|---|---|
| Medium | `TravelAgency` has no street address, locality, postal code, `logo`, `sameAs`, `priceRange` or contact hours. Without an address it can't qualify for local results or a knowledge panel. | Add these once the business details exist. Use a raster logo of at least 112 px for `logo`, and the Instagram, Facebook, Tripadvisor and Google Business Profile URLs for `sameAs`. |
| Medium | There is no `BreadcrumbList`. | Add a two-level breadcrumb (Home › page) to journey and destination pages now, and a three-level one when hub pages exist. |
| Low | `TouristTrip` has no Google rich result. | Keep it, because it helps Bing and AI systems understand the offer. Don't add `aggregateRating` until there are real first-party reviews. |
| Low | The `Offer` has no `availability` or `validFrom`. | Optional. Leave them out rather than guess. |
