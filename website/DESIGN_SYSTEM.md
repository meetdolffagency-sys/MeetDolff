# DESIGN_SYSTEM.md

Tokens live in `src/index.css` (`@theme` block and `@layer components`).

## Type scale
| Class | Size | Line | Tracking | Use |
|---|---|---|---|---|
| `.t-display` | clamp(2.9rem, 8.2vw, 7rem) | 0.95 | -0.04em | Hero and final CTA only |
| `.t-h2` | clamp(2rem, 4.4vw, 3.6rem) | 1.04 | -0.03em | Section titles |
| `.t-h3` | clamp(1.25rem, 2vw, 1.6rem) | 1.2 | -0.015em | Sub-heads |
| `.t-lead` | clamp(1.05rem, 1.5vw, 1.25rem) | 1.55 | | Section intros (max 38rem) |
| `.t-body` | 1rem | 1.6 | | Paragraphs (max 34rem, under 80 characters) |
| `.t-mono` | 0.8125rem | 1.5 | | Timestamps, file names, status |

## Spacing and grid
- `.wrap`: `min(100% - 2.5rem, 78rem)`, centred. Gutters are 1.25rem on mobile.
- `.section`: vertical padding `clamp(4.5rem, 9vw, 8.5rem)`.
- Two-column compositions use asymmetric ratios (0.7/1.3, 0.8/1.6, 0.9/1.1) rather than 50/50 to avoid a template look.

## Surfaces
Obsidian (default) → `.on-graphite` (#101214) → `.on-light` (Archive). Alternate to give the narrative rhythm: dark, light, dark story, graphite, light, dark, light, dark, light, dark.

## Buttons (`@layer components`)
- `.btn-primary` chalk on obsidian; hover Signal. `.btn-ghost` hairline on dark. `.btn-dark` / `.btn-outline-dark` for light sections.
- Sizes: `btn-sm` (2.5rem), default (3rem), `btn-lg` (3.5rem). All meet the 44px touch target.
- Press: `scale(0.97)` at 180ms. Focus: 2px outline, 3px offset.
- `.chip` = toggle/segment control; state through `aria-pressed` or `aria-selected`.

**Cascade note:** component classes sit in `@layer components` so Tailwind utilities (`hidden`, `w-full`, `lg:hidden`) can override them. An early build had them unlayered and the mobile "Menu" button leaked onto desktop; this was found in visual review and fixed.

## Motion
| Token | Value |
|---|---|
| Ease out | `cubic-bezier(0.16, 1, 0.3, 1)` (CSS), `power3.out` (GSAP) |
| Press / hover | 180–200ms |
| Page transition | 450ms fade + 10px rise |
| Hero entrance | ~1s total, visual → headline (stagger 120ms) → copy → actions |
| Loader | ~1.2s, then 400ms lift |
| Demo state change | 450ms `page-in` |

Rules: animate transform/opacity; no endless decorative loops (only the REC dot and live bars while "recording" is active in a demo); `prefers-reduced-motion` removes the loader, hero entrance and CSS animation durations.

## Components
`Nav`, `Footer`, `Hero`, `HeroScene`, `Loader`, `DownloadButton`, `StatusBadge`, `Illustrative`, `PageHeader`, `Intro`, `PageCta`, and the demos in `src/components/demos/`.

## Status vocabulary
Available · Beta · In development · Planned · Unverified. The dot shape encodes status (filled, Signal, hollow, dashed) so it does not rely on colour alone.
