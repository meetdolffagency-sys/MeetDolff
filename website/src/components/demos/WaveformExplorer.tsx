import { useState } from "react";
import { BARS, SEGMENTS } from "@/data/demo";

/** Select a stretch of a representative waveform to see the transcript fragment behind it. */
export function WaveformExplorer() {
  const [sel, setSel] = useState(2);
  const seg = SEGMENTS[sel];
  const per = BARS.length / SEGMENTS.length;
  return (
    <div>
      <div role="group" aria-label="Choose a moment in the recording" className="flex gap-1.5">
        {SEGMENTS.map((s, i) => {
          const active = i === sel;
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={active}
              aria-label={`Moment at ${s.ts}, ${s.tag}`}
              onClick={() => setSel(i)}
              className={`group relative flex h-28 flex-1 items-center justify-between gap-[2px] rounded-sm px-1 transition-colors ${active ? "bg-obsidian/[0.07]" : "hover:bg-obsidian/[0.04]"}`}
            >
              {BARS.slice(i * per, (i + 1) * per).map((h, k) => (
                <span
                  key={k}
                  aria-hidden
                  className={`block w-full max-w-[5px] rounded-full transition-colors ${active ? "bg-obsidian" : "bg-graphite/40"}`}
                  style={{ height: `${h * 100}%` }}
                />
              ))}
              {active && <span aria-hidden className="absolute -bottom-px left-0 h-[3px] w-full bg-signal" />}
            </button>
          );
        })}
      </div>
      <div className="t-mono mt-2 flex justify-between text-graphite/80" aria-hidden>
        <span>00:00:00</span>
        <span>00:30:00</span>
      </div>
      <div key={seg.id} className="page-in mt-6 border-l-[3px] border-signal pl-5" aria-live="polite">
        <p className="t-mono text-graphite/80">
          {seg.ts} · {seg.speaker} · {seg.tag}
        </p>
        <p className="mt-2 text-[1.2rem] leading-snug tracking-[-0.01em]">“{seg.text}”</p>
      </div>
    </div>
  );
}
