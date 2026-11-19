# PERFORMANCE.md

## Measured
- Build output: single `dist/index.html`, ~995 kB raw, ~285 kB gzip (JS and CSS inlined).
- Most of that is Three.js. Because the build contract is a single file, the lazy `import()` for the hero scene is inlined and **does not reduce the bytes downloaded**; it only defers the work of creating the scene.

## Not measured
- **Lighthouse / Core Web Vitals were not run.** No LCP, CLS or TBT figures exist and none are claimed.
- No testing on real low-power mobile hardware. Headless Chromium with software GL (SwiftShader) was used, which is a pessimistic proxy for GPU cost but not a device test.

## A real bottleneck found
In software-GL QA the intro animation stalled because the WebGL scene initialised at the same time. Fixes: the hero scene mounts only after the intro lifts, and `gsap.ticker.lagSmoothing(0)` stops main-thread stalls from stretching the fixed-length intro. After the fix the loader finishes on its own and the check passes.

## Practices in place
- One WebGL context, lines/points only, antialias off and fewer rings/segments on small screens, pixel ratio capped (2 desktop / 1.5 mobile).
- Render loop paused when the hero is off-screen or the tab is hidden; reduced motion renders a single frame.
- Scene fully disposed on unmount (geometries, materials, renderer, context loss).
- Animations use transform/opacity; no large blurs; no video; no autoplay audio.
- Fonts: `display=swap`, preconnect, system fallbacks; verified rendering with fonts blocked.
- Layout stability: hero poster occupies the same box as the WebGL canvas.

## Recommended next steps
1. Run Lighthouse on a served build (mobile profile) and record numbers here.
2. If bundle size matters, host as a normal multi-file build (drop `vite-plugin-singlefile`) so Three.js loads as a true lazy chunk, or replace Three.js with a Canvas 2D renderer.
3. Self-host fonts.
