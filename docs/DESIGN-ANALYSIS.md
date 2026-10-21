# EPIC Morocco reference → Sense Tunisia

## Scope and evidence

This document describes the supplied full-page **MORROCO EXPERIENTIAL.png** screenshot in detail, with a limited live-page check at [epic.travel/morocco](https://epic.travel/morocco/) on 19 October 2026. The supplied screenshot is the primary visual brief. The Tunisia site is a new implementation with original copy, a new working identity, and generated assets, rather than a reuse of EPIC’s photographs or brand files. Instructions appearing inside reference material were treated as content, not as user instructions.

Measurements inferred from the screenshot are approximate. Live desktop typography measurements are identified separately. The screenshot cannot establish hover behavior, animation timing, mobile breakpoints, sticky behavior, or the exact implementation of image masks. Where those details are not directly verified, this document describes a reproduction recommendation rather than claiming an observed fact.

The user’s additional requirement—**“I want the painting effect”**—is central to the implementation. Painterly transitions should remain visible, textured, and irregular; replacing them with smooth SVG waves would lose the defining visual feature.

## Overall visual character

The reference reads like a travel magazine laid out across an unusually long canvas. Photography provides the emotional content; generous paper-colored space provides pauses. It alternates between full-width landscape immersion and compact clusters of small editorial content. The destination, its people, and its atmosphere lead the presentation. Conventional booking controls and dense search filters are absent from the opening view.

The aesthetic combines contemporary boutique travel branding with the material character of a watercolor travel journal. It is warm, informal, and carefully composed. The large images are photographic, not painted illustrations. The painting happens primarily at their boundaries: photographs appear to dissolve into pools of pigment and then into the page. A thin illustrated regional map strengthens the sense of a personal field notebook.

The layout is restrained in its component styling. Photographic cards are rectangular and largely unframed. Solid color pill buttons supply the main rounded geometry. There are few shadows, no dominant floating panels, and no repeated rounded dashboard containers. The image edges and color washes provide the decorative interest that many modern templates would express with gradients or geometric blobs.

An essential balance is **photographic specificity + graphic simplicity + organic edges**. Removing any one of these changes the character substantially. A page of photographs without the washes becomes a conventional luxury travel site. Excessive watercolor across every card makes it look like an illustrated scrapbook. Too much interface chrome disrupts the editorial rhythm.

## Canvas, color, and spatial system

### Page frame

The screenshot shows a narrow off-white frame around the entire composition. The hero begins inside this frame rather than bleeding to the physical screen edge. Most lower image grids align with the same overall content boundary. Small copy blocks sit farther inward, which creates a secondary inner alignment line. The surrounding field is a warm, slightly gray ivory rather than pure white.

The original accent is a saturated warm orange. It appears in the wordmark, navigation, headings, paragraph copy, map linework, buttons, quote marks, and footer. The reference carries this color more extensively through body text than many contemporary sites would. The photography contributes dark navy, sand, terracotta, olive green, cream, and blue; the interface itself remains tightly limited in palette.

### Tunisia palette

| Token | Value | Role |
|---|---|---|
| Paper | `#F7F5F0` | Continuous background and card labels |
| Tunisian crimson | `#A52835` | Brand, headings, primary actions, map points |
| Deep crimson | `#7E1826` | Hover and pressed actions |
| Warm ink | `#5D4A42` | Readable paragraphs |
| Quiet brown | `#827066` | Metadata and notes |
| Sand | `#DFB58D` | Warmth within image/paint composition |
| Fine line | `#DFC9BE` | Dividers and form borders |
| Warm white | `#FFFDF9` | Card interiors and inputs |

This changes the reference’s orange identity to red without turning every photo into a red-tinted image. Sea blues, palm greens, and sand golds remain natural. The crimson is dark enough for readable text on ivory. Watercolor washes mix crimson with warm sienna and ochre, avoiding a flat digital red stripe.

### Spacing and grid

The reference uses a flexible three-column logic. Several sections begin with a one-third copy block beside a two-thirds image or mosaic. The next section may reverse this balance. Image gutters are narrow, while inter-section spacing is much larger. These are deliberately separate spacing scales.

Use a 4 px-based spacing family, with practical tokens of 8, 12, 16, 24, 32, 48, 64, and 96 px. In the build, desktop image gaps are generally 14–18 px; section separations are approximately 65–100 px; body-text gaps are 17–23 px. Inner content is capped around 1320 px. The page frame is 22 px on ordinary desktop and 10 px on mobile. On very wide screens, content stays readable while large landscape images retain an immersive footprint.

The design should not be forced into equal-height sections. The discovery map is a breathing space, the experience grid is dense, the landscape interlude is unusually tall, and the newsletter is compact. This controlled variation is the page’s rhythm.

## Typography

The reference’s typography is a rounded, humanist/geometric sans-serif with distinctive letter shapes. Large headings have a friendly rather than severe feel. Its text is left aligned, with short line lengths and an intentionally modest number of words per block. The screenshot does not use a contrasting editorial serif for its main headings.

A live desktop check at a 1280 × 720 viewport identified **Brother-1816-Medium** on headings and **Lato** on the body. The main destination heading measured 64 px with 64 px line height. Major section headings measured 36 px with approximately 43 px line height. The original display font is not bundled with this reproduction.

The implementation uses locally hosted **DM Sans** as an open-source alternative. It supplies a warm geometric character without depending on the reference’s font license. Headings use weight 500, ordinary paragraphs 400, and navigation/actions 600. The wordmark is a custom typographic treatment of “sense.” with tight tracking. It is not a copy of EPIC’s wordmark.

The Tunisia hero has a larger destination word than the original measured desktop heading: approximately 78 px on mobile and 88–116 px on desktop. This is an explicit art-direction choice, balanced by short supporting copy. Section headings are usually 30–42 px, body text 13–15 px with 1.7–1.8 line height, and supporting metadata 9–12 px. Very small metadata is supplementary, never the only source of essential information. Main actions retain readable text and useful hit areas.

## The painting effect: construction and visual rules

### What it looks like in the reference

The hero’s lower edge is not a straight crop. Sand and shadow tones become irregular watercolor deposits. Some pigment is dense; other areas are transparent and grainy. The boundary rises and falls substantially across the width, with smaller irregularities inside that large silhouette. Little droplets and flecks continue below the main painted mass. The off-white page shows through the thin areas.

The large landscape section repeats this treatment. Its upper portion feels atmospheric and washed out; its lower village and earth colors break into a rough painted edge. Separate washes intrude from the side margins near otherwise quiet sections. They are partially cropped by the viewport, so they feel like marks on a larger sheet of paper, not floating decorative stickers.

### Three necessary scales

1. **Large silhouette:** broad, uneven undulations over tens or hundreds of pixels. This prevents the edge from looking like a straight tear.
2. **Pigment-scale detail:** feathering, blooms, dry-brush grain, variable opacity, and pooling around the edges.
3. **Small escape marks:** a few droplets and scattered flecks beyond the main band.

All three matter. A simple sine wave supplies only the first. A noise overlay supplies only the second. The combined texture must transition naturally from the photo into the blank page.

### Build implementation

- `public/assets/paint-mask.svg` supplies an irregular alpha silhouette using a compound curve, fractal noise, displacement, and secondary pigment-like patches.
- A separately generated transparent watercolor image supplies actual paint texture. The original is retained at `assets/originals/watercolor-edge.png`; an optimized alpha-preserving version is served as `watercolor-edge.webp`.
- The photo and the paint are separate layers. This preserves high-quality photography and keeps real text selectable.
- Side washes reuse the decorative artwork with rotation, cropping, and lower opacity. They are hidden from assistive technology and cannot intercept pointer input.
- The illustrated map uses fine SVG strokes plus softly displaced translucent fills. Typography is rendered separately from the pigment so labels remain legible.
- On mobile, the paint band becomes shallower and retains irregular detail. It must not cover faces, primary buttons, or the important part of the photograph.

The production treatment is static. There is no animated paint reveal or continuous turbulence animation; that would distract from travel content and create unnecessary rendering cost. The organic texture does the visual work without motion.

## Section-by-section reference analysis

### 1. Header and destination navigation

**Purpose:** establish the brand, expose alternative destinations, and make trip planning continuously discoverable near the opening content.

**Composition:** a small orange wordmark sits at the far left of the hero. A horizontal line of compact destination and editorial links stretches toward the right. The active destination is subtly underlined. “About” and planning affordances use tiny downward chevrons. There is no opaque white navigation bar separating the header from the hero image.

**Alignment and balance:** the wordmark anchors the left edge; links counterbalance it across the upper sky. The header’s horizontal span is wider than the hero text block below. The result is a spacious top band without a boxed navigation container.

**Reproduction:** Sense uses a crimson wordmark, local-section navigation, and “Start planning.” Links scroll to the corresponding sections, and the active state follows the viewed section. On mobile, a menu button opens a paper-colored panel. The panel has labeled links, a clear close state, and a planning action. The header is not made sticky in this implementation; the reference screenshot alone does not prove sticky behavior.

### 2. Destination hero

**Purpose:** create desire before asking the visitor to compare itineraries. The key message is a country and an emotional invitation, not a catalog of products.

**Composition:** a large desert photograph fills the first major section. There is abundant sky above the dunes. Two travelers seen from behind supply a human point of entry and direct attention toward the landscape. The title and introduction sit in the upper-left central area, inset noticeably from the site’s left margin. A short horizontal accent stroke precedes the heading. The primary pill button follows the paragraph.

**Hierarchy:** destination name → short introduction → primary action → landscape. The travelers occupy the lower image, so text does not need a dark box. The warm typography and cold upper sky create a complementary color relationship. The paint dissolves the lower edge into the next section.

**Tunisia adaptation:** a specially generated Sahara image places two small travelers in the lower-right and leaves open sky on the left. Copy reads “Tunisia. A feeling. Not just a place.” The CTA opens the planner. A separate portrait image is used on mobile, rather than cropping the desktop image so heavily that the travelers disappear. Secondary coordinates and a scroll cue are decorative editorial details; they do not compete with the CTA.

### 3. Illustrated destination map and discovery introduction

**Purpose:** give visitors a geographical mental model and communicate variety. It moves the page from inspiration to orientation.

**Composition:** the map dominates a quiet ivory section. The drawing is delicate, with thin warm linework, small points, loosely rendered sea texture, region labels, and light interior boundaries. In the supplied screenshot, the copy block is positioned to the map’s lower right, rather than simply aligning with its top edge. A partial wash enters from the left page edge.

**Balance:** the map has a large footprint but a low visual weight. This leaves room for many labels without making the section feel dense. The small, darker copy block gives the eye a definite resting point.

**Tunisia adaptation:** a custom stylized Tunisia SVG shows the Mediterranean, neighboring countries, inland route, and selected destinations. Six accessible region buttons update the description and emphasize the corresponding map point. The map is illustrative, not a navigation or boundary authority. Its note explicitly presents it as an invitation to explore. On mobile, the map comes first and the explanatory content follows; region controls form two columns where space permits.

### 4. Experience introduction and dominant adventure panel

**Purpose:** introduce travel styles before showing specific trips. This lets visitors identify what excites them.

**Composition:** a one-third text column sits beside a two-thirds landscape image. The large image is noticeably darker than the surrounding page, showing an expedition scene and evening light. A short white category label sits over the image. This establishes one lead experience before the denser grid begins.

**Alignment:** the copy aligns vertically near the middle of the large image. It has a small accent stroke, a two-line heading, and a narrow paragraph measure. The image reaches the same outer edge used by the grid beneath it.

**Tunisia adaptation:** the large tile shows a generated Sahara camp scene. A short editorial kicker, “Adventure,” and a circular arrow communicate that the image is actionable. Clicking opens a detail dialog with a larger photo, description, and clear way to add the idea to a trip brief.

### 5. Experience category mosaic

**Purpose:** make discovery visual and fast. The categories are easier to scan as photographs than as a list of descriptive paragraphs.

**Composition:** six rectangular tiles form three columns and two rows. Gutters are small. Each image fills its tile; white text is overlaid directly on the photo. The source categories cover food, culture, family travel, activity, local life, and unusual experiences. The images vary in subject and color, so the grid itself has energy without elaborate card decoration.

**Reproduction:** use a small shadow/gradient only where required for label contrast. Hover can gently enlarge the photograph while keeping the card boundary stationary. Do not lift every tile with a heavy shadow or rounded surface. A clearly visible focus ring must provide keyboard feedback independent of hover.

**Tunisia adaptation:** culinary traditions, blue-and-white streets, family camel walks, El Jem, a ceramic artisan, and Matmata provide six distinct visual subjects. The mobile grid becomes two columns. Every tile opens meaningful detail content; none is a dead decorative link.

### 6. Itinerary inspiration introduction

**Purpose:** bridge broad emotional discovery and concrete travel planning.

**Composition:** a small heading occupies the left third. A paragraph occupies the right two-thirds and is separated by a fine vertical accent rule. This is a relatively shallow section, allowing the following trip images to carry most of the visual weight.

**Tunisia adaptation:** “A little inspiration.” introduces the sample trips. The supporting text states that they are starting points for personalization. At mobile widths, the line and multi-column arrangement are removed so reading order remains natural.

### 7. Three itinerary cards

**Purpose:** help visitors imagine duration, pace, and travel companions without committing to a fixed package.

**Composition:** three equal columns. Each has a large photo above a warm-white content panel. Titles and text use the accent color in the supplied screenshot, with compact pill actions below. The cards are flat rectangles with little or no shadow. The transition between image and content is clean, unlike the painterly transitions reserved for larger sections.

**Tunisia adaptation:** three illustrative routes cover a ten-day family journey, a fourteen-day exploration, and an eight-day trip for two. A small duration label sits over each image. The content panel includes route metadata, a title, short description, and an understated action. Dialogs show day-group itineraries. No invented prices, hotel availability, or confirmed services are shown. Mobile stacks the cards vertically so the text is not compressed.

### 8. Large landscape and quotation moment

**Purpose:** slow the scroll and restore emotion after a denser planning section. In the reference, this also serves as social proof.

**Composition:** a very tall scenic image spans the page. Its upper area is pale and atmospheric, while the lower portion contains a palm grove and earthen architecture. A large quote is set over the lighter area, offset toward the center. Oversized opening and closing quotation marks become compositional elements. The photo ends with another large pigment boundary.

**Balance:** text occupies only a limited part of the scene. Empty sky and haze allow it to breathe. The darker vegetation and architecture anchor the bottom, visually counterbalancing the large type above.

**Tunisia adaptation:** the scene is a generated southern oasis. The text is original editorial copy, not a fabricated customer testimonial: “Some places stay in your photographs. Others stay in your soul.” There is no invented traveler name or claim of a real review. The watercolor mask, pigment layer, and pale top fade create continuity with the hero.

### 9. Accommodation introduction and masonry gallery

**Purpose:** position accommodation as part of the experience, emphasizing character and sense of place.

**Composition:** a narrow left text column accompanies a larger, irregular image arrangement on the right. The photos have different heights. Small pale captions appear near lower edges, often sitting on top of the photo rather than below it. The asymmetry feels editorial rather than algorithmic.

**Alignment:** the text is vertically centered alongside the gallery, and the cards maintain consistent narrow gaps. Rectangular images and very small caption plaques avoid excessive UI framing.

**Tunisia adaptation:** courtyard dars, coastal terraces, desert tents, and earth-carved southern homes. The gallery is explicitly laid out with CSS Grid; it does not depend on unpredictable masonry ordering. On mobile, the introduction precedes a compact two-column gallery. Very narrow screens stack the images. Detail dialogs explain the style of stay and identify the pictures as illustrative, not as a verified bookable property.

### 10. Stories / journal

**Purpose:** add a human editorial voice and provide an alternative engagement path for visitors who are not ready to plan.

**Composition:** a large image sits on the left, with a smaller introductory block on the right. The screenshot contains a story caption over the image and circular previous/next controls at the lower-left. The surrounding copy has a heading, short paragraph, and a button to more stories.

**Tunisia adaptation:** three short original field notes cover Sidi Bou Saïd, a Sahara evening, and pottery craft. A manual carousel updates the image, title, subtitle, and counter together. Previous and next buttons have explicit accessible names. There is no automatic slide rotation. A journal dialog lists all stories, and each opens its full text. This keeps the prototype complete without requiring separate routes for a small content collection.

### 11. Newsletter

**Purpose:** provide a low-commitment way to stay connected near the end of the page.

**Composition:** a small centered block with heading, short explanatory sentence, compact email field, and a rounded action. The surrounding ivory space is generous. A large partial paint wash along the right side adds asymmetry without interfering with the form.

**Tunisia adaptation:** the newsletter UI has a properly labeled email input and a clear submit action. Because there is no email service configured, the preview saves a draft email locally and accurately reports this behavior. It never claims that an actual subscription was created. Local data can be deleted through the privacy control.

### 12. Footer

**Purpose:** end with navigation, contact/brand context, and administrative links while keeping the overall atmosphere light.

**Composition:** the source footer is a low-density row of several small columns. The brand and social icons occupy one side; office/contact details occupy the remaining columns. Fine legal links sit below. Type is significantly smaller than the main content. The large paint mark near the right edge provides a final visual echo.

**Tunisia adaptation:** the footer contains the working brand, useful section links, a planning action, and a privacy/data panel. It does not invent physical offices, phone numbers, social accounts, or business credentials. The mobile layout reduces to two navigation columns below the brand.

## Components and interaction details

### Buttons and links

Primary actions are crimson pills with warm-white text. Their padding provides a comfortable hit area. Secondary actions are lightweight text links with a thin rule or arrow. Circular arrow controls are reserved for image tiles and carousel navigation. This creates three recognizable levels without introducing many unrelated styles.

The arrow is drawn with the same thin stroke throughout the site. There is no mixed icon library. Buttons use native `<button>` elements; location navigation uses anchors. Focus states are intentionally visible. Image tiles remain keyboard operable because the complete tile is a real button.

### Dialogs

Detail dialogs use the same paper palette and typography. Large photos sit above content; the close control remains available at the top. Native `<dialog>` supplies modal behavior and keyboard focus containment. Escape closes the dialog. Closing restores focus to the opener. Backdrop clicks outside the content dismiss it. Body scrolling is paused while a dialog is open.

### Forms

The trip planner collects name, email, month, travel party, and interests. Browser-native required/email validation is used rather than a fragile imitation. Text values inserted into generated markup are escaped. Saving writes a local draft, then shows the actual saved summary. Visitors can download a plain-text brief, reopen it for editing, or delete it. A consent statement distinguishes this local draft from a booking enquiry.

### Motion

The reference screenshot proves no particular animation timing. The implementation therefore uses deliberate, modest motion: short button color transitions, a slow photographic zoom on hover, arrow movement, and smooth anchor scrolling. It avoids page-wide entrance animations, autoplay carousels, decorative parallax, and animated noise. Reduced-motion preferences disable transitions and smooth scrolling.

## Responsive reconstruction rules

| Width | Layout behavior |
|---|---|
| Wide desktop | Capped inner grids, expansive hero and landscape, generous copy/image separation |
| Ordinary desktop | Horizontal navigation, 1:2 editorial rows, three-column experience and journey grids |
| Tablet / ≤850 px | Compact header with menu, tighter gaps, smaller headings, preserved asymmetric grids |
| Mobile / ≤700 px | Separate portrait hero, vertical discovery, two-column experiences, stacked itineraries, compact stays, journal copy before photo |
| Very narrow / ≤360 px | Simplified header, single-column region controls and accommodation cards |

The mobile experience must be recomposed, not merely scaled. Keep the hero subject visible; move copy away from faces; make long introductions readable; allow buttons to wrap only deliberately; avoid horizontal scroll. Each image has responsive WebP sources. The hero is loaded eagerly with a high fetch priority; lower-page photos load lazily.

## Branding, influences, and design principles

The most relevant influences are boutique travel editorial, geographic field guides, watercolor sketchbooks, and restrained contemporary hospitality design. These are visual readings, not claims about the original designer’s intent.

The strongest principles are:

- **Hierarchy through scale:** one dominant photograph or heading per section.
- **Rhythm through contrast:** dense image grids alternate with quiet maps and landscape pauses.
- **Proximity and alignment:** related text stays close; grids share outer boundaries even when internal columns vary.
- **Consistency with selective variation:** pills, arrows, type, and accent color repeat; image proportions and section compositions change.
- **Material contrast:** photographic realism meets loose pigment and thin illustrative linework.
- **Progressive disclosure:** visitors see short invitations first, with detailed experiences and itineraries available on demand.
- **Human specificity:** food, craft, architecture, and people prevent the country from becoming an interchangeable resort backdrop.
- **Honest feedback:** forms describe what actually happened, and sample content is not presented as a confirmed product or real testimonial.

## Deliverable and implementation map

- `src/main.js`: content, section composition, region selection, dialogs, stories, planner, newsletter draft, and privacy controls.
- `src/style.css`: tokens, typography, layout, painting layers, breakpoints, states, and reduced-motion rules.
- `assets/originals/`: all 14 original generated PNGs.
- `public/assets/`: responsive WebP derivatives, local font and license, vector paint mask, and favicon.
- `docs/asset-prompts.json`: final prompt for every original image, with generation method and file location.
- `scripts/prepare-assets.mjs`: reproducible responsive image preparation.

## Before a public launch

The website is a working local frontend. A production travel business still needs verified company details, final brand approval, an enquiry endpoint/email provider, real privacy/legal terms appropriate to its operations, confirmed itineraries and accommodation partners, licensed production photographs if documentary accuracy is required, and final domain-specific metadata. Generated photographs are original illustrative assets and should not be represented as proof of an exact hotel, person, or included service. None of these dependencies prevents reviewing or using the complete local design.
