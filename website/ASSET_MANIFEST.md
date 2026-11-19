# ASSET_MANIFEST.md

| Asset | Origin | License / notes |
|---|---|---|
| Dolff mark and wordmark | Original SVG authored for this project (`src/components/Logo.tsx`) | Project-owned. No pre-existing brand asset was available to inspect; replace if an official one exists. |
| Hero object | Procedural: generated at runtime by Three.js (`HeroScene.tsx`); static SVG poster generated in `Hero.tsx` | No external asset. |
| Loader animation | Original SVG + GSAP (`Loader.tsx`) | No external asset. |
| General Sans | Indian Type Foundry via Fontshare CSS (remote) | Fontshare free licence for commercial use. Not self-hosted, so check the licence terms before launch or self-host the files. |
| IBM Plex Mono | Google Fonts (remote) | SIL Open Font License 1.1. |
| Favicon | Inline SVG data URI derived from the mark | Project-owned. |
| Product screenshots | **None.** Interface visuals are illustrative concepts | Replace with real captures once a build exists. |
| Photography / stock | **None used** | |
| Third-party logos | **None used** | |

## Libraries (runtime)
react, react-dom, react-router-dom (MIT); gsap (GSAP "Standard" licence, free incl. ScrollTrigger); three (MIT).

## Screenshots
`screenshots/` holds QA captures produced by `tests/qa.mjs` (home at six widths; every route at 1440 and 390; hero with WebGL, hero fallback).
