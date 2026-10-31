# Visual and mobile findings

Screenshots are in `../screenshots/`: home, journey and destination pages at desktop (1440×900) and mobile (390×844) sizes, plus `home-mobile-slow4g-at-3s.png`.

## What works

- Above the fold, on both desktop and mobile: the H1 ("Tunisia, with a local host."), the subtitle, and the main button ("Plan your private journey").
- No horizontal scrolling at 360–1440 px.
- The floating WhatsApp button is visible on every page.
- Detail pages show the title, a short summary, the main button and previous/next links on the first screen.
- Lighthouse accessibility scores 96–100.

## Findings

| Severity | Finding | Evidence | Fix |
|---|---|---|---|
| High | On a slow connection the first screen is the loading animation, not the page. | `home-mobile-slow4g-at-3s.png`. Content appears at about 9.5 s (see performance.md). | See performance.md. |
| Low | The duration badge on the turquoise Carthage card fails colour contrast. | `.duration` text `#157f85` on the paper background is 3.53:1; small text needs 4.5:1. | Use a darker turquoise for the badge text, or the default red. |
| Low | On mobile, the WhatsApp button covers the bottom-left corner of the text while scrolling. | Destination screenshots. | Acceptable for a floating action button. Optionally add bottom padding to long text sections on small screens. |
