# TESTING.md

## How
`tests/qa.mjs` drives the built `dist/index.html` with Playwright (Chromium headless shell, software WebGL). Last run: **103 of 103 checks passed** (`tests/last-run.json`).

Run: `npm run build && PW=/path/to/node_modules/playwright node tests/qa.mjs` (Playwright is not a project dependency).

## Executed and passing
- **Loader**: appears on first visit; finishes by itself; Skip button dismisses; Escape dismisses; does not replay in the same session; absent with reduced motion.
- **Hero**: WebGL canvas renders; with `getContext` forced to null the static SVG fallback is shown and no canvas exists; headline is in place immediately with reduced motion.
- **Routes**: all seven routes plus the 404 at 1440, 1280, 1024, 768, 390 and 360 px: no horizontal overflow; no console errors (remote font failures excluded).
- **Metadata**: one `h1` per route; unique `document.title` per route; meta description present.
- **Navigation**: each primary link navigates; hero secondary CTA goes to `/memory`.
- **Download**: at least four download CTAs on the homepage; nav CTA reaches `/download`; unpublished state is stated honestly; no fake form while no endpoint or email is configured.
- **Mobile nav**: opens as a modal dialog, Escape closes, link navigates and closes.
- **Keyboard**: first Tab stop is "Skip to content".
- **Demos**: waveform selection, search filter, action checkbox, recording start/timer/stop, memory engine meeting and topic selection, evidence question/source swap, export tree expansion and JSON preview, agent scope toggling, provider selection, scroll-driven story (step button and wheel).
- **Network failure**: page renders with remote fonts blocked.
- **Screenshots**: `screenshots/` (reviewed visually; this found the unlayered-CSS bug and the `w-full` on `.wrap` bug, both fixed).

## Not done
- Real-published-URL behaviour of the Download button (`VITE_CHROME_STORE_URL` set): logic is simple but untested.
- Early-access form submission (needs an endpoint): not tested.
- Screen-reader testing (VoiceOver/NVDA), colour-contrast tooling, axe.
- Lighthouse, real-device and cross-browser (Firefox/Safari) testing.
- Impeccable's CLI detector and a formal Vercel Web Interface Guidelines audit; only manual review against their principles.
- Visual regression of every viewport; viewport screenshots were taken for all, but only some were inspected by eye (home at 1440, hero at 1440 and 390, story section, memory page, download mobile).
