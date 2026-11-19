import { useId, useMemo, useState } from "react";
import { MEETINGS, SEGMENTS } from "@/data/demo";
import { DolffMark } from "../Logo";
import { Illustrative } from "../StatusBadge";
import { RecordingStates } from "./RecordingStates";
import { WaveformExplorer } from "./WaveformExplorer";

const TABS = ["Record", "Transcript", "Summary", "Decisions", "Actions", "Search"] as const;
type Tab = (typeof TABS)[number];

const ACTIONS = [
  { id: "a1", text: "Write migration notes and share them", who: "Priya", due: "Friday", ts: "00:14:05" },
  { id: "a2", text: "Draft a sync conflict policy", who: "Unassigned", due: "—", ts: "00:19:48" },
  { id: "a3", text: "Confirm export format with the team", who: "Maya", due: "Next sync", ts: "00:26:20" },
];

function SearchTab() {
  const [q, setQ] = useState("");
  const id = useId();
  const hits = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? SEGMENTS.filter((s) => (s.text + s.speaker + s.tag).toLowerCase().includes(t)) : SEGMENTS.slice(2, 4);
  }, [q]);
  return (
    <div>
      <label htmlFor={id} className="t-mono text-graphite/80">Search this meeting's memory</label>
      <input
        id={id}
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Try “sync”, “SQLite” or “Friday”"
        className="mt-2 w-full rounded-md border border-obsidian/30 bg-white px-4 py-3 text-[1rem] outline-none focus:border-obsidian"
      />
      <ul className="mt-5 space-y-4" aria-live="polite">
        {hits.length === 0 && <li className="muted-light">No matching moments in this meeting.</li>}
        {hits.map((s) => (
          <li key={s.id} className="border-l-[3px] border-obsidian/20 pl-4">
            <p className="t-mono text-graphite/80">Architecture sync · {s.ts}</p>
            <p className="mt-1">“{s.text}”</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ActionsTab() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  return (
    <ul className="divide-y divide-obsidian/15">
      {ACTIONS.map((a) => (
        <li key={a.id} className="flex items-start gap-4 py-4 first:pt-0">
          <input
            id={a.id}
            type="checkbox"
            className="mt-1.5 h-5 w-5 accent-obsidian"
            checked={!!done[a.id]}
            onChange={(e) => setDone((d) => ({ ...d, [a.id]: e.target.checked }))}
          />
          <label htmlFor={a.id} className="flex-1 cursor-pointer">
            <span className={done[a.id] ? "line-through opacity-50" : ""}>{a.text}</span>
            <span className="t-mono mt-1 block text-graphite/80">
              {a.who} · due {a.due} · from {a.ts}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}

export function ProductShowcase() {
  const [tab, setTab] = useState<Tab>("Record");
  const panelId = useId();
  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-obsidian/20 bg-white shadow-[0_30px_60px_-30px_rgba(8,9,10,0.35)]">
        <div className="flex items-center gap-3 border-b border-obsidian/10 bg-archive px-4 py-3">
          <DolffMark className="h-5 w-auto text-obsidian" />
          <span className="text-[0.95rem] font-medium">MeetDolff</span>
          <span className="t-mono ml-auto text-graphite/80">Project Atlas</span>
        </div>
        <div className="grid md:grid-cols-[14rem_1fr]">
          <aside className="hidden border-r border-obsidian/10 bg-archive/60 p-4 md:block" aria-label="Meeting history (example)">
            <p className="t-mono text-graphite/80">Meeting history</p>
            <ul className="mt-3 space-y-1">
              {MEETINGS.slice().reverse().map((m, i) => (
                <li key={m.id} className={`rounded-md px-3 py-2 ${i === 2 ? "bg-obsidian text-chalk" : ""}`}>
                  <p className="text-[0.92rem] leading-tight">{m.name}</p>
                  <p className={`t-mono ${i === 2 ? "text-aluminium" : "text-graphite/80"}`}>{m.date}</p>
                </li>
              ))}
            </ul>
          </aside>
          <div className="min-w-0">
            <div role="tablist" aria-label="Product views" className="scrollbar-thin flex gap-2 overflow-x-auto border-b border-obsidian/10 p-3">
              {TABS.map((t) => (
                <button
                  key={t}
                  role="tab"
                  id={`${panelId}-tab-${t}`}
                  aria-selected={tab === t}
                  aria-controls={`${panelId}-panel`}
                  tabIndex={tab === t ? 0 : -1}
                  className="chip shrink-0"
                  onClick={() => setTab(t)}
                  onKeyDown={(e) => {
                    const i = TABS.indexOf(tab);
                    if (e.key === "ArrowRight") setTab(TABS[(i + 1) % TABS.length]);
                    if (e.key === "ArrowLeft") setTab(TABS[(i + TABS.length - 1) % TABS.length]);
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
            <div role="tabpanel" id={`${panelId}-panel`} aria-labelledby={`${panelId}-tab-${tab}`} className="min-h-[24rem] p-5 sm:p-7">
              <div key={tab} className="page-in">
                {tab === "Record" && <RecordingStates />}
                {tab === "Transcript" && <WaveformExplorer />}
                {tab === "Summary" && (
                  <div>
                    <h3 className="t-h3">Architecture sync</h3>
                    <ul className="t-body mt-4 list-disc space-y-2 pl-5">
                      <li>The pilot will store data in SQLite; Postgres was considered and set aside.</li>
                      <li>Multi-device sync is the main open risk.</li>
                      <li>Migration notes are owed by Friday.</li>
                    </ul>
                  </div>
                )}
                {tab === "Decisions" && (
                  <ul className="space-y-5">
                    <li className="border-l-[3px] border-signal pl-4">
                      <p className="text-[1.1rem]">SQLite for the pilot; revisit when multi-device sync lands.</p>
                      <p className="t-mono mt-1 text-graphite/80">00:09:37 · Maya</p>
                    </li>
                    <li className="border-l-[3px] border-obsidian/20 pl-4">
                      <p className="text-[1.1rem]">Park the sync discussion until the export format is settled.</p>
                      <p className="t-mono mt-1 text-graphite/80">00:26:20 · Maya</p>
                    </li>
                  </ul>
                )}
                {tab === "Actions" && <ActionsTab />}
                {tab === "Search" && <SearchTab />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Illustrative className="mt-4 text-graphite/80" />
    </div>
  );
}
