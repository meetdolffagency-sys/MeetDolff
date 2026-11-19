# WEBSITE_ARCHITECTURE.md

## Stack
Vite 7, React 19, TypeScript (strict), Tailwind 4, React Router (HashRouter), GSAP + ScrollTrigger, Three.js. Build emits a single self-contained `dist/index.html` (`vite-plugin-singlefile`).

## Routing
Hash routes because the output is a single static file: `/#/`, `/#/product`, `/#/memory`, `/#/privacy`, `/#/developers`, `/#/download`, `/#/changelog`; unknown routes show a 404 page. Document title and meta description are set per route in `src/App.tsx`. If this is later deployed behind a server, switch to `BrowserRouter` and add an SPA fallback.

**SEO limitation:** a hash-routed SPA exposes one HTML document, so crawlers see only the homepage metadata. Moving to Next.js or pre-rendering is the fix if organic search per page matters.

## Layout of `src/`
```
App.tsx              router, intro orchestration, route effects
config.ts            release configuration from env
intro.tsx            intro context, reduced-motion and WebGL helpers
data/features.ts     feature-status inventory (source of truth for badges)
data/demo.ts         illustrative demo content
components/          Nav, Footer, Hero, HeroScene, Loader, Logo, ...
components/demos/    interactive demonstrations
pages/               one file per route
tests/qa.mjs         Playwright QA
```

## Download system and configuration
`DownloadButton` is the single entry point (nav, hero, footer, final CTA, download page).

| Variable | Effect |
|---|---|
| `VITE_CHROME_STORE_URL` | When set, every Download button becomes an external link to this URL and the download page shows "Available". When empty, buttons route to `/download` and state that no listing is published. |
| `VITE_EARLY_ACCESS_ENDPOINT` | HTTPS endpoint receiving `POST {"email","source"}` JSON. Enables the early-access form. |
| `VITE_CONTACT_EMAIL` | Verified address. Shown in footer; used as a `mailto:` fallback for the form if no endpoint exists. |
| `VITE_RELEASE_VERSION` | Shown only if set. Leave empty until a version is verified. |

The brief suggested `NEXT_PUBLIC_CHROME_STORE_URL`; Vite's equivalent public prefix is `VITE_`. Variables are baked in at build time; change them and rebuild. Never put secrets in these; all are public.

When the release goes live: set `VITE_CHROME_STORE_URL`, set `VITE_RELEASE_VERSION`, update `src/data/features.ts` statuses, rebuild, and add real entries to the changelog page.

## Hero / 3D
`Hero` renders a static SVG poster of the same object, then lazy-loads `HeroScene` (Three.js) only after the intro lifts. If WebGL is unavailable the poster stays. Reduced motion renders one static frame.

## Loader
`Loader` plays only on the first homepage load in a session (`sessionStorage`), never with reduced motion, has a Skip button and Escape, and a 3s failsafe. It does not display a progress percentage.
