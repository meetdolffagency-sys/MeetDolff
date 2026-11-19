import { useState } from "react";
import { Illustrative, StatusBadge } from "../StatusBadge";

const SCOPES = [
  { id: "project", label: "Project: Atlas" },
  { id: "summaries", label: "Read summaries" },
  { id: "excerpts", label: "Read transcript excerpts" },
] as const;
type ScopeId = (typeof SCOPES)[number]["id"];

/** A planned interface, shown as a permission model: what the agent gets depends on what you grant. */
export function AgentDemo() {
  const [granted, setGranted] = useState<Record<ScopeId, boolean>>({ project: true, summaries: true, excerpts: false });

  let response: unknown;
  if (!granted.project) {
    response = { error: "forbidden", reason: "Project 'Atlas' is not in the granted scope" };
  } else if (!granted.summaries && !granted.excerpts) {
    response = { results: [], reason: "No content scope granted" };
  } else {
    response = {
      results: [
        {
          meeting: "Architecture sync",
          date: "2025-03-12",
          at: "00:09:37",
          ...(granted.summaries ? { summary: "Decision: SQLite for the pilot; revisit with multi-device sync." } : {}),
          ...(granted.excerpts ? { excerpt: "Then we decide: SQLite for the pilot…" } : {}),
        },
      ],
    };
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge status="Planned" className="text-signal" />
        <span className="t-mono text-aluminium">Not released. Interface shape is not final.</span>
      </div>
      <fieldset className="mt-6">
        <legend className="t-mono text-aluminium">Permissions you grant this agent</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {SCOPES.map((s) => (
            <button key={s.id} type="button" className="chip" aria-pressed={granted[s.id]} onClick={() => setGranted((g) => ({ ...g, [s.id]: !g[s.id] }))}>
              {granted[s.id] ? "✓ " : ""}{s.label}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="mt-6 grid gap-px bg-white/15 md:grid-cols-2">
        <div className="bg-obsidian p-5">
          <p className="t-mono text-aluminium">Agent request</p>
          <pre className="t-mono scrollbar-thin mt-3 overflow-x-auto whitespace-pre">{`memory.search({
  query: "database decision",
  project: "Atlas"
})`}</pre>
        </div>
        <div className="bg-obsidian p-5" aria-live="polite">
          <p className="t-mono text-aluminium">Response</p>
          <pre className="t-mono scrollbar-thin mt-3 overflow-x-auto whitespace-pre-wrap break-words">{JSON.stringify(response, null, 2)}</pre>
        </div>
      </div>
      <Illustrative className="mt-4 text-aluminium" />
    </div>
  );
}
