# INTERACTIONS.md

All of these were exercised in the Playwright run unless marked otherwise.

| Interaction | Where | Behaviour |
|---|---|---|
| Signal → Memory loader | First home visit per session | Waveform draws, rings and points appear, Dolff mark draws and spectacles pop, timestamps and lines appear, wordmark, then lifts. ~1.2s. Skip button, Escape, 3s failsafe. Disabled for reduced motion. |
| Hero entrance | `/` | Visual fades in, headline lines rise, copy, actions. Starts as the loader lifts. Never blocks input. |
| Hero object | `/` | Pointer movement and press raise the "energy" of the rings; it decays back. It is explicitly **not** microphone input. |
| Recording states | Product tab, home, `/privacy` | Start / Pause / Resume / Stop / Reset, live timer, animated bars while recording, `aria-live` status. No audio is accessed. |
| Waveform explorer | Product "Transcript" tab | Click one of six moments to see its timestamp, speaker and transcript fragment. |
| Search | Product "Search" tab | Live filter over the example transcript. |
| Actions | Product "Actions" tab | Checkable action items. |
| Audio → memory | Home | Scroll advances four stages (Capture, Transcribe, Structure, Remember); the step buttons also jump to them. |
| Memory engine | Home, `/memory` | Filter topic threads; select a meeting for its summary, what changed, and related meetings. |
| Evidence | Home, `/memory` | Pick a question; citation buttons switch the source; the cited transcript line is highlighted with its neighbours. |
| Export | Home, `/memory` | "Export" expands the folder with a staggered reveal; open a `.md` or `.json` preview. |
| Provider independence | Home, `/developers` | Choose none / Provider A / Provider B; diagram and "what leaves your device" copy change. |
| Agent permissions | Home, `/developers` | Toggle scopes; the simulated response changes (forbidden / empty / summary / excerpt). |
| Mobile menu | < 1024px | Modal dialog with focus trap, Escape to close, body scroll lock. |
| Final CTA reveal | Home | Headline lines reveal once on scroll. |

Every demo that shows example data carries the line "Illustrative concept, not a captured meeting".
