export type Status = "Available" | "Beta" | "In development" | "Planned" | "Unverified";

export interface Feature {
  id: string;
  name: string;
  status: Status;
  summary: string;
}

/**
 * Feature-status inventory. This is the single source of truth for every status
 * badge on the site. Statuses were set conservatively from the product brief:
 * the extension repository was not available to this task, so NOTHING is
 * marked "Available" until it has been verified against a real release.
 * Update this file (and CONTENT_MAP.md) when a feature ships.
 */
export const FEATURES: Feature[] = [
  { id: "recording", name: "Explicit recording controls", status: "In development", summary: "Recording starts and stops only when you say so, with a visible state at all times." },
  { id: "transcribe", name: "Transcription", status: "In development", summary: "Meeting audio becomes a timestamped transcript." },
  { id: "structure", name: "Structured summaries, decisions and action items", status: "In development", summary: "Each meeting is distilled into a summary, decisions, open questions and commitments." },
  { id: "memory", name: "Persistent memory in Markdown and JSON", status: "In development", summary: "Every meeting is saved as a readable .md file and a structured .json file, indexed by index.json." },
  { id: "retrieve", name: "Evidence-grounded answers", status: "In development", summary: "Answers cite the meeting name and timestamp they came from, where available." },
  { id: "crossmeeting", name: "Cross-meeting and project context", status: "In development", summary: "Related conversations are connected so you can see how a topic changed over time." },
  { id: "providers", name: "User-configurable AI providers and models", status: "In development", summary: "You choose the provider and model used for understanding and answering." },
  { id: "localfirst", name: "Local-first, user-owned storage", status: "In development", summary: "Your memory lives in files you own and can export or delete." },
  { id: "agents", name: "External agent access through API / MCP", status: "Planned", summary: "A permissioned interface so your own AI agents can query your meeting memory." },
  { id: "store", name: "Chrome Web Store listing", status: "Planned", summary: "Public listing and one-click install. Not published yet." },
  { id: "encryption", name: "Encryption at rest", status: "Unverified", summary: "No technical evidence yet, so we make no claim." },
  { id: "offline", name: "Fully offline operation", status: "Unverified", summary: "No technical evidence yet, so we make no claim." },
];

export const STATUS_ORDER: Status[] = ["Available", "Beta", "In development", "Planned", "Unverified"];

export const STATUS_MEANING: Record<Status, string> = {
  Available: "Implemented and verified",
  Beta: "Implemented, with stated limitations",
  "In development": "Being actively built",
  Planned: "Intended future functionality",
  Unverified: "No sufficient evidence of implementation",
};
