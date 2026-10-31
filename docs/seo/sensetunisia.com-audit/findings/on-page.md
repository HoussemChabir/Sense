# On-page SEO findings

**Score: 84 / 100.**

## What works

- Titles are 34–52 characters, all unique, and end with the brand name.
- Descriptions are 130–158 characters, all unique, with concrete facts such as prices and durations.
- Every page has exactly one `<h1>`, and the headings follow a logical order (h1, h2, h3). The home page H1 is "Tunisia, with a local host."
- URL slugs are descriptive (`/journeys/carthage-sidi-bou-said/`, `/destinations/kairouan-el-jem/`).
- Open Graph tags (title, description, URL, absolute image, type) and the Twitter card are present on every page.
- Every page is one click from the home page, which links to all 15.

## Findings

| Severity | Finding | Evidence | Fix |
|---|---|---|---|
| Medium | **Pages link mostly through home and next/previous, rarely to each other.** | Journey pages link only to `/` and the other journey, not to `/destinations/tunis/`. Five of the six destination pages (all but Tunis) link only to `/` and their neighbours, not to any journey or experience. Experience pages link only to `/` and their neighbours. | Add one or two contextual links per page, following the matrix in `docs/seo/SITE-STRUCTURE.md` §4. For example, both journeys link to `/destinations/tunis/`; the Sahara page links to the Sahara adventure experience; the Food experience links to the Tunis way-of-life journey. |
| Low | Some link text is generic. | "Explore this journey" on the home-page cards (an `aria-label` names the journey). | Fine for users. If you touch it, add the journey name to the visible text. |
| Low | The WhatsApp message for experiences reads oddly. | "Hi Sense, I'm interested in Culinary." | Use the subtitle or a longer phrase for experiences, e.g. "the Culinary experience". |
