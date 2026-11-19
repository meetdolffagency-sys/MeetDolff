# CONTENT_MAP.md

## Pages and sections
| Route | Sections |
|---|---|
| `/` | Hero · Product showcase · From audio to memory (scroll story) · Memory engine · Answers with evidence · Memory belongs to you (export) · AI provider independence · External agents · Privacy and control · Final CTA · Footer |
| `/product` | What it does (status per capability) · Product interface concept · Where it works · Status legend |
| `/memory` | Questions memory is built for · Memory engine · Evidence · Files + local/export/external AI |
| `/privacy` | Recording states · Six control topics · What we don't claim |
| `/developers` | Provider independence · Agent permissions (planned) · Builder status |
| `/download` | Release status · Early access · Requirements · Install steps · Known limitations |
| `/changelog` | Empty state ("No public release yet") + feature-status list |

## Feature-status inventory (`src/data/features.ts`)
Nothing is **Available**: the extension repository was not provided, so nothing could be verified.

| Feature | Status |
|---|---|
| Explicit recording controls | In development |
| Transcription | In development |
| Structured summaries, decisions, action items | In development |
| Persistent memory (Markdown + JSON) | In development |
| Evidence-grounded answers | In development |
| Cross-meeting / project context | In development |
| Configurable AI providers and models | In development |
| Local-first, user-owned storage | In development |
| External agent API / MCP | Planned |
| Chrome Web Store listing | Planned |
| Encryption at rest | Unverified (no claim made) |
| Fully offline operation | Unverified (no claim made) |

These "In development" labels are conservative defaults taken from the brief, not verified product facts. A product owner should promote each to Beta/Available after checking it against a real build.

## Things deliberately absent
Customer logos, testimonials, user counts, statistics, supported-provider logos, a version number, a store URL, a contact address, and any claim of encryption or offline operation.

## Placeholders to replace
- Chrome Web Store URL, release version, contact email, early-access endpoint (env vars).
- Permissions list on `/download` (take from the manifest at release).
- Brand mark (if an official asset exists).
- Real product screenshots in place of the interface concept.
- Provider names, once each integration is verified (currently "Provider A / B").
