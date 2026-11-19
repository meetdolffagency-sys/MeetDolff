import { useState } from "react";
import { MEETINGS, TOPICS } from "@/data/demo";
import { Illustrative } from "../StatusBadge";

type Topic = (typeof TOPICS)[number];
const LANE_Y: Record<Topic, number> = { Database: 60, Sync: 130, Export: 200 };
const LANE_COLOR: Record<Topic, string> = { Database: "#ffffff", Sync: "#d39a68", Export: "#b7bec3" };
const colX = (i: number) => 70 + i * 165;

/** Project history across time: meetings as columns, topics as threads. */
export function MemoryEngine() {
  const [sel, setSel] = useState(2);
  const [topic, setTopic] = useState<Topic | "All">("All");
  const m = MEETINGS[sel];

  return (
    <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
      <div>
        <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
          {(["All", ...TOPICS] as const).map((t) => (
            <button key={t} type="button" className="chip" aria-pressed={topic === t} onClick={() => setTopic(t)}>
              {t === "All" ? "All topics" : <span className="inline-flex items-center gap-2"><span aria-hidden className="inline-block h-2 w-2 rounded-full" style={{ background: LANE_COLOR[t] }} />{t}</span>}
            </button>
          ))}
        </div>

        <svg viewBox="0 0 800 260" className="mt-5 w-full" role="img" aria-label={`Timeline of ${MEETINGS.length} Project Atlas meetings with three topic threads`}>
          {MEETINGS.map((_, i) => (
            <line key={i} x1={colX(i)} x2={colX(i)} y1="20" y2="240" stroke="#fff" strokeOpacity={i === sel ? 0.55 : 0.12} strokeDasharray={i === sel ? "0" : "3 5"} style={{ transition: "stroke-opacity .25s" }} />
          ))}
          {TOPICS.map((t) => {
            const idx = MEETINGS.map((mm, i) => (mm.topics.includes(t) ? i : -1)).filter((i) => i >= 0);
            const dim = topic !== "All" && topic !== t;
            return (
              <g key={t} style={{ opacity: dim ? 0.15 : 1, transition: "opacity .25s" }}>
                <polyline points={idx.map((i) => `${colX(i)},${LANE_Y[t]}`).join(" ")} fill="none" stroke={LANE_COLOR[t]} strokeWidth={topic === t ? 2.5 : 1.5} strokeOpacity="0.85" />
                {idx.map((i) => (
                  <circle key={i} cx={colX(i)} cy={LANE_Y[t]} r={i === sel ? 11 : 7} fill={i === sel ? LANE_COLOR[t] : "#08090a"} stroke={LANE_COLOR[t]} strokeWidth="2" style={{ transition: "r .2s", cursor: "pointer" }} onClick={() => setSel(i)} />
                ))}
              </g>
            );
          })}
        </svg>

        <div role="group" aria-label="Choose a meeting" className="mt-3 grid grid-cols-5 gap-1.5">
          {MEETINGS.map((mm, i) => (
            <button key={mm.id} type="button" aria-pressed={sel === i} onClick={() => setSel(i)} className="chip !min-h-[3.25rem] !rounded-lg !px-1 text-center leading-tight">
              <span className="t-mono block text-[0.72rem] opacity-80">{mm.date}</span>
              <span className="block text-[0.82rem] sm:text-[0.9rem]">{mm.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div key={m.id} className="page-in" aria-live="polite">
        <p className="t-mono text-aluminium">{m.date} · {m.topics.join(", ")}</p>
        <h3 className="t-h3 mt-2">{m.name}</h3>
        <p className="t-body mt-3 text-chalk/90">{m.summary}</p>
        {m.changed && (
          <p className="mt-5 border-l-[3px] border-signal pl-4 text-[1rem]">{m.changed}</p>
        )}
        <p className="t-mono mt-6 text-aluminium">
          Related: {MEETINGS.filter((x) => x.id !== m.id && x.topics.some((t) => m.topics.includes(t))).map((x) => x.name).join(" · ")}
        </p>
        <Illustrative className="mt-6 text-aluminium" />
      </div>
    </div>
  );
}
