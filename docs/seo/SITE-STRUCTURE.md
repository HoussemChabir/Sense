# Sense Tunisia: Site Structure

*Domain shown as `sense-tunisia.com` (placeholder). All URLs are lowercase, hyphenated, with a trailing slash.*

## 1. URL hierarchy

```
/                                     Home
├── /journeys/                        Signature days (hub)
│   ├── /journeys/tunis-way-of-life/          ← #journey/the-tunisian-way-of-life
│   └── /journeys/carthage-sidi-bou-said/     ← #journey/the-carthage-blue-escape
├── /destinations/                    The atlas (hub)
│   ├── /destinations/tunis/                  ← #destination/tunis-the-north
│   ├── /destinations/cap-bon-coast/          ← #destination/the-mediterranean-coast
│   ├── /destinations/kairouan-el-jem/        ← #destination/the-historic-heart-kairouan-el-jem
│   ├── /destinations/tozeur/                 ← #destination/tozeur-the-oases
│   ├── /destinations/sahara/                 ← #destination/the-sahara
│   └── /destinations/djerba/                 ← #destination/djerba-the-south
│       (Phase 3, gated: /destinations/tunis/sidi-bou-said/, /destinations/tunis/carthage/, …)
├── /experiences/                     Themes (hub)
│   ├── /experiences/sahara-adventure/        ← #experience/adventure
│   ├── /experiences/food/                    ← #experience/culinary
│   ├── /experiences/culture/                 ← #experience/culture
│   ├── /experiences/family/                  ← #experience/family
│   ├── /experiences/roman-tunisia/           ← #experience/ancient-worlds
│   ├── /experiences/local-life/              ← #experience/go-local
│   └── /experiences/off-the-beaten-path/     ← #experience/off-the-beaten-path
├── /tailor-made/                     Planner + how it works (replaces #plan)
├── /journal/                         Guides (Phase 2)
│   └── /journal/<slug>/
├── /about/                           Story, hosts, licence, values
├── /reviews/                         (Phase 2, once 10+ real reviews exist)
├── /contact/
├── /terms/                           Booking and cancellation terms
├── /privacy/
└── /fr/…                             (Phase 3) mirror of the core pages
```

Nothing is indexed yet, so better slugs cost no redirects. The arrow shows the old hash route, which a small client-side shim forwards with `location.replace()` so WhatsApp links already shared keep working.

## 2. Quality gates

A URL ships only when its page passes the gate. Until then, the topic stays a homepage tile or a section of a hub with no URL of its own.

| Page type | Min unique words | Must include |
|---|---|---|
| Journey | 800 | Hour-by-hour day, inclusions table, price per person, meeting point, what to bring, 3+ real photos, host profile, 5-question FAQ |
| Destination | 600 | Why go, best season, 3–5 named places, how Sense does it here, links to the relevant journeys and experiences, real photos |
| Experience | 500 | What it feels like, where in Tunisia, sample day, who it suits, linked destinations and journeys |
| Journal post | 1,200 | Named author, last-updated date, first-hand detail, 1 table or list of facts, a CTA to the relevant journey |
| City sub-destination (Phase 3) | 600 and 60%+ different from its parent | Only for places with real search demand and a Sense offer there. **Stop at 20** before reviewing performance |

## 3. Page metadata

Titles are written to stay under about 60 characters. Descriptions are 140–160 characters and carry a concrete fact.

| URL | Title | H1 | Meta description (draft) |
|---|---|---|---|
| `/` | Private Tours & Tailor-Made Trips in Tunisia \| Sense | Tunisia. (visual) + descriptive line "Private journeys with local hosts, from the medina to the Sahara" | Private, host-led days and tailor-made journeys across Tunisia: Tunis medina, Carthage, Sidi Bou Saïd, the Sahara and Djerba. Plan yours on WhatsApp. |
| `/journeys/` | Private Day Experiences in Tunis & Carthage \| Sense | A little inspiration. | Two signature private days around Tunis, with meals, tastings and a local host included. From €129 per person. |
| `/journeys/tunis-way-of-life/` | Tunis Local Life Day: Medina & Sidi Bou Saïd \| Sense | The Tunisian way of life | Breakfast with a host, the souks of the Tunis medina, a family-style lunch and Sidi Bou Saïd. A private full day from €149 per person, all included. |
| `/journeys/carthage-sidi-bou-said/` | Carthage & Sidi Bou Saïd Private Day Tour \| Sense | The Carthage & Blue escape | The ruins of Carthage, then Sidi Bou Saïd's blue lanes, lunch and mint tea above the sea. Private, 7–8 hours, from €129 per person with entries included. |
| `/destinations/` | Where to Go in Tunisia: From Tunis to the Sahara \| Sense | Discover Tunisia. | An illustrated guide to Tunisia's six regions, from the medinas of the north to the oases, the Sahara and Djerba, with ideas for every kind of trip. |
| `/destinations/tunis/` | Tunis, Carthage & Sidi Bou Saïd Guide \| Sense | Tunis & the North | Medina mornings, Roman Carthage and the blue village of Sidi Bou Saïd: how to experience Tunisia's capital region with a local. |
| `/destinations/cap-bon-coast/` | Cap Bon & Tunisia's Mediterranean Coast \| Sense | The Mediterranean Coast | Nabeul ceramics, Kelibia's harbour and hidden coves: a slower guide to Tunisia's Mediterranean coast. |
| `/destinations/kairouan-el-jem/` | Kairouan & El Jem: Tunisia's Historic Heart \| Sense | The Historic Heart | The Great Mosque of Kairouan and El Jem's Roman amphitheatre: when to go, what to see and how to visit with an expert guide. |
| `/destinations/tozeur/` | Tozeur, Chebika & the Oases of Tunisia \| Sense | Tozeur & the Oases | Palm groves, mountain oases at Chebika and sunset over Chott el Djerid: planning a trip to Tunisia's oasis country. |
| `/destinations/sahara/` | The Tunisian Sahara from Douz: Dunes & Camps \| Sense | The Sahara | Walk the Grand Erg Oriental from Douz with a local guide, sleep in a desert camp and see the stars. Seasons, routes and what to pack. |
| `/destinations/djerba/` | Djerba, Guellala & Matmata: Tunisia's South \| Sense | Djerba & the South | Island villages, Guellala pottery and the earth-carved homes of Matmata: a guide to Djerba and southern Tunisia. |
| `/experiences/` | Tunisia Experiences: Food, Culture & Sahara \| Sense | Don't just see Tunisia. Feel it. | Seven ways to experience Tunisia, from desert nights and family kitchens to Roman arenas, each shaped around you. |
| `/experiences/sahara-adventure/` | Sahara Adventure in Tunisia: Dunes & Camps \| Sense | Adventure | Leave the road at Douz for the Grand Erg Oriental: guided dune walks, a slow-cooked camp dinner and a sky full of stars. |
| `/experiences/food/` | Tunisian Food Experiences & Cooking in Tunis \| Sense | Culinary | Brik, couscous, harissa and market mornings: cook and eat with Tunisian hosts and makers. |
| `/experiences/culture/` | Cultural Trips in Tunisia: Medinas & Craft \| Sense | Culture | Medina lanes, Sidi Bou Saïd's blue doors and the stones of Carthage: Tunisian culture as it is lived today. |
| `/experiences/family/` | Family Holidays in Tunisia, Planned for Kids \| Sense | Family | Camels, dunes, Roman arenas and the sea, with short travel days and welcoming places to stay. |
| `/experiences/roman-tunisia/` | Roman Tunisia: El Jem & Ancient Sites \| Sense | Ancient worlds | El Jem's amphitheatre and quieter archaeological landscapes, with guides who bring Roman Africa to life. |
| `/experiences/local-life/` | Meet Local Makers & Hosts in Tunisia \| Sense | Go local | Time with ceramicists, market traders and hometown guides: unhurried, respectful encounters. |
| `/experiences/off-the-beaten-path/` | Off the Beaten Path in Tunisia: Matmata \| Sense | Off the beaten path | The earth-carved courtyards of Matmata, hilltop villages of the south and landscapes from another world. |
| `/tailor-made/` | Plan a Tailor-Made Trip to Tunisia \| Sense | What does your Tunisia look like? | Tell us when, who and what calls you. A local planner replies on WhatsApp with a journey shaped around you. |
| `/about/` | About Sense: Local Hosts in Tunisia \| Sense | (story headline) | Who we are, the hosts you will meet, how we work and our licence details. |

Every page also needs: `<link rel="canonical">` (absolute, self-referencing), `og:url`, an absolute `og:image` (1200 px wide, already produced by the image pipeline), `og:title` and `og:description` matching the title and description, and `twitter:card`.

## 4. Internal linking

```
                 Home
      ┌───────────┼─────────────┐
  /journeys/  /destinations/  /experiences/      (hubs; also in nav + footer)
      │            │               │
   journey ◄──► destination ◄──► experience      (contextual cross-links)
      ▲            ▲               ▲
      └──────── /journal/<post> ───┘             (every post links up to 1 destination
                                                  and across to 1 journey CTA)
```

Rules:

1. **Every page is within 2 clicks of home.** Hubs sit in the header nav (rename "Tunisia" to "Destinations") and the footer.
2. **Money pages get the most internal links.** Both journeys are linked from home, `/destinations/tunis/`, `/experiences/culture/`, `/experiences/food/`, `/experiences/local-life/` and every Tunis-area journal post.
3. **Descriptive anchors.** Use "the Carthage & Sidi Bou Saïd private day" rather than "Explore this journey". Keep the visual CTA, and put a descriptive `aria-label` and a contextual text link nearby.
4. **Breadcrumbs** on every inner page (Home › Destinations › The Sahara), visible and in `BreadcrumbList` JSON-LD.
5. **The atlas map** keeps linking to destinations, now with real `href="/destinations/…/"` values, which makes it a crawlable navigation element.
6. **Previous and next links** between siblings (already in the design) stay, as plain `<a href>`.
7. **Experience to destination mapping:**

| Experience | Links to destinations | Links to journeys |
|---|---|---|
| Sahara adventure | sahara, tozeur | n/a |
| Food | tunis, cap-bon-coast | tunis-way-of-life |
| Culture | tunis, kairouan-el-jem | both |
| Family | sahara, djerba, kairouan-el-jem | carthage-sidi-bou-said |
| Roman Tunisia | kairouan-el-jem, tunis | carthage-sidi-bou-said |
| Local life | tunis, cap-bon-coast, djerba | tunis-way-of-life |
| Off the beaten path | djerba, tozeur | n/a |

## 5. XML sitemap

Generate `sitemap.xml` at build from the same route list that drives prerendering, so a route can never exist without being listed (or the reverse). Include only pages that passed the quality gate and are indexable. Use a `lastmod` taken from the content's last git change, not the build time. Add this line to `public/robots.txt`:

```
Sitemap: https://sense-tunisia.com/sitemap.xml
```

In Phase 3, add `xhtml:link` hreflang alternates (`en`, `fr`, `x-default`) to each entry. Keep a single sitemap file until it passes about 1,000 URLs.

## 6. User journeys

| Visitor | Lands on | Next step | Converts via |
|---|---|---|---|
| Cruise passenger, port day in La Goulette | `/journeys/carthage-sidi-bou-said/` (shore-excursion section) | Inclusions, timing back to the ship | WhatsApp with date and ship name prefilled |
| First-timer planning a week | `/journal/tunisia-itinerary-7-days/` | `/destinations/*`, then `/tailor-made/` | Planner sent to WhatsApp |
| Couple already in Tunis | `/journeys/tunis-way-of-life/` (mobile, same-week search) | Price, reviews | WhatsApp tap from the sticky button |
| Food traveller | `/journal/tunisian-food-guide/` | `/experiences/food/`, then `/journeys/tunis-way-of-life/` | WhatsApp |
| Family | `/experiences/family/` | `/destinations/sahara/` or `/destinations/djerba/` | `/tailor-made/` |
