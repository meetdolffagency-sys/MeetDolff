# WEBSITE_RESEARCH.md

This file records research that was actually performed. Where something was **not** inspected, it says so.

## 1. What was actually inspected

| Source | Depth | Notes |
|---|---|---|
| Vibe Coding Armory — repository README | Read in full | Toolkit index and "Vibe-Coding Standard" (avoid arbitrary gradients, excess rounded cards, repetitive glassmorphism, decorative motion). |
| Armory — `skills/frontend-design.md` | Read in full | A pointer to the Anthropic skill. |
| Armory — `DESIGN-RESOURCE-VAULT.md`, `toolkit.md`, other `skills/*` | **Not read** | Only the README's link list was seen. |
| Anthropic `frontend-design/SKILL.md` | Read (fetched text was truncated near the end) | Used heavily: one memorable element, restraint, avoid eyebrow labels, avoid single-word accents in headlines, avoid numbered markers unless the content is a sequence, one orchestrated entrance rather than fade-ups everywhere. |
| Impeccable README | Read in full | Used its vocabulary (critique / audit / polish) for manual review. The CLI detector (`npx impeccable detect`) was **not run**. |
| Granola homepage | Fetched text content only (no visuals) | Positioning: "Perfect meeting memory", no-bot capture, MCP connector, calendar briefs, free tier with a 30-day limit. |
| Fathom homepage | Fetched text content only | Positioning: bot or no bot, summaries, "Ask Fathom", team/role-based sections, CRM sync, statistics (not reproduced here). |
| Fireflies homepage | Fetched text content only | Positioning: "AI teammate", 240+ app integrations, compliance badges, customer quotes. |
| refero.design/styles | Fetch returned empty content | **Not inspected.** |
| Awwwards, recent.design, Mobbin, post.design, mnmm.xyz, godly.website, podium.global | **Not fetched** | Design judgement for these came from general prior knowledge, not from fresh inspection. Do not read this as a claim that they were studied. |
| Taste Skill, Emil Kowalski skills, UI/UX Pro Max, Vercel agent skills | **Not fetched** | Vercel's guidance (semantic HTML, focus, reduced motion) was applied from general knowledge. |
| React Bits, 21st.dev, shadcn/ui, Aceternity, Motion Primitives, HeroUI, Kokonut, Skiper | **Not fetched** | Evaluated conceptually only. None are installed. |
| GSAP, Three.js docs | Prior knowledge | Both are installed and used. |
| Lenis, Motion.dev, Rive, Anime.js, Jitter, Spline, Unicorn Studio, Haikei, Shaders | Not inspected | Not used. |
| MeetDolff extension repository / existing master product directive | **Not available to this task** | See "Product truth" below. |

## 2. Patterns worth borrowing (conceptually)

- **Granola**: a single memory-centred promise and the "your notes, not a bot" framing. MeetDolff differs by making memory the *structure* of the page (timeline, files) rather than a feature bullet.
- **Granola / Fathom**: connecting meeting data to external AI tools is now table stakes. MeetDolff's angle is *permissioned* access you can see (the agent-scope demo) and *files you own*.
- **Fathom**: concrete question prompts ("Ask Fathom…") make memory tangible. We use a grounded Q&A where each answer shows its source.
- **Anthropic skill**: "spend your boldness in one place." The hero object is the one bold gesture; everything else is quiet and typographic.

## 3. Patterns avoided

- Logo walls, customer quotes, statistics, compliance badges (we have none and won't invent them).
- Role-based "for sales / for CS / for HR" tabs.
- Identical rounded-card grids, glassmorphism, purple gradients.
- Tracked all-caps eyebrows above every heading; numbered markers except real sequences (steps).
- Fade-up on every section.

## 4. Competitor positioning and the MeetDolff difference

Competitors lead with time saved, integrations and scale. MeetDolff leads with **ownership and evidence**: memory as readable files, answers that cite meeting and timestamp, a provider you choose. It explicitly states what it does *not* yet claim.

## 5. Aesthetic direction: The Listening Archive

Obsidian dominant, Archive (warm paper) sections for contrast, Aluminium for secondary text, Signal (#D39A68) only for the active/meaningful state (playhead ring, selected citation, recording dot). General Sans for display and interface; IBM Plex Mono for timestamps, file names and status.

## 6. Technical decisions

- **Vite + React + TypeScript + Tailwind v4** (the existing project) rather than Next.js: the repository was a fresh Vite scaffold with `vite-plugin-singlefile`, and the build output must be a single `dist/index.html`. Switching frameworks would have broken that contract.
- **HashRouter**: a single static HTML file has no server to rewrite `/product` to `index.html`. Routes are `/#/product` etc. Page code-splitting is configured but the single-file plugin inlines chunks.
- **GSAP** (+ ScrollTrigger) for the loader, hero entrance, pinned-style story and final CTA. CSS transitions for hover/press.
- **Three.js** as the only 3D tech, lines and points only, lazy-loaded, one WebGL context, paused off-screen, static SVG fallback. Spline/Rive not used (no real asset needed).
- **No shadcn/ui install**: needed primitives (tabs, tree, dialog, toggles) were small and hand-built with ARIA so they match the visual system. This is a deliberate deviation from the brief's preference.
- **Fonts**: General Sans via Fontshare CSS, IBM Plex Mono via Google Fonts. Both have system fallbacks; the QA run verified the page renders with them blocked.

## 7. Product truth

The extension repository was not provided, so no feature could be verified as shipped. Every capability is therefore labelled *In development*, *Planned* or *Unverified* (see `src/data/features.ts`). Nothing is labelled *Available*. All demo data is flagged "illustrative".
