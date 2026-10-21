# Sense — Tunisia, felt differently

A responsive, image-led Tunisia travel concept inspired by the supplied EPIC Morocco reference. Crimson typography, original travel photography, hand-painted edges, and an illustrated regional map.

## Run

```sh
npm install
npm run dev
```

Production build:

```sh
npm run build
npm run preview
```

## Included

- Desktop and mobile layouts, with a separate portrait hero image.
- Fourteen original generated images, including an alpha-transparent watercolor border.
- Responsive WebP image derivatives and local DM Sans typography.
- Six-region discovery map, seven experience details, three sample itineraries, four accommodation concepts, and three journal entries.
- Keyboard-accessible dialogs, mobile navigation, manual story carousel, and reduced-motion support.
- Trip brief editing, local saving, text download, and deletion.
- Newsletter preview with explicit local-only behavior and data deletion.

## Documentation

Read `docs/DESIGN-ANALYSIS.md` for the comprehensive visual analysis and reconstruction specifications. `docs/asset-prompts.json` contains the original image-generation prompt set. Run `npm run assets` to rebuild responsive derivatives from the original PNGs.

## Status

This is a complete local frontend concept, not a live booking service. Trip briefs and newsletter emails stay in local browser storage. There is no enquiry/email backend, payment collection, reservation, analytics, or real newsletter submission. Photography is generated and illustrative. The working brand, real business information, production imagery, and legal documents can be replaced before launch.

## Technical choices

Vite with plain JavaScript and CSS; no runtime framework or external UI library. Native dialog, browser validation, and semantic controls keep the site small. Sharp is a development-only asset preparation tool. All fonts and images are served locally.
