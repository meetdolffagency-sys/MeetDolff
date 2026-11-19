import { useState } from "react";
import { QAS } from "@/data/demo";
import { Illustrative } from "../StatusBadge";

/** Ask a question; see the answer and the exact transcript moment it rests on. */
export function EvidenceDemo() {
  const [qi, setQi] = useState(0);
  const [si, setSi] = useState(0);
  const qa = QAS[qi];
  const src = qa.sources[Math.min(si, qa.sources.length - 1)];

  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-0">
        <div className="lg:pr-12">
          <div role="group" aria-label="Example questions" className="flex flex-col gap-2">
            {QAS.map((x, i) => (
              <button key={x.q} type="button" aria-pressed={qi === i} onClick={() => { setQi(i); setSi(0); }} className="chip !rounded-lg !px-4 !py-3 text-left">
                {x.q}
              </button>
            ))}
          </div>
          <div key={qi} className="page-in mt-8" aria-live="polite">
            <p className="t-mono text-graphite/80">Answer</p>
            <p className="mt-2 text-[1.3rem] leading-snug tracking-[-0.015em]">
              {qa.a}
              {qa.sources.map((s, i) => (
                <button
                  key={s.ts + s.meeting}
                  type="button"
                  aria-label={`Source ${i + 1}: ${s.meeting}, ${s.date}, ${s.ts}`}
                  aria-pressed={si === i}
                  onClick={() => setSi(i)}
                  className={`t-mono ml-1.5 inline-flex h-7 min-w-7 -translate-y-1 items-center justify-center rounded-full border px-1.5 align-middle transition-colors ${si === i ? "border-obsidian bg-signal text-obsidian" : "border-obsidian/40 hover:border-obsidian"}`}
                >
                  {i + 1}
                </button>
              ))}
            </p>
          </div>
        </div>

        <div className="relative border-t border-obsidian/20 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
          <span aria-hidden className="absolute -left-px top-[5.2rem] hidden h-px w-12 -translate-x-full bg-obsidian/40 lg:block" />
          <div key={`${qi}-${si}`} className="page-in" aria-live="polite">
            <p className="t-mono text-graphite/80">Source {si + 1} of {qa.sources.length}</p>
            <h3 className="t-h3 mt-1">{src.meeting}</h3>
            <p className="t-mono mt-1 text-graphite/80">{src.date} · at {src.ts}</p>
            <div className="mt-6 space-y-3 text-[1rem]">
              <p className="opacity-55">{src.before}</p>
              <p className="border-l-[4px] border-signal bg-white px-4 py-3 text-[1.05rem]">{src.cited}</p>
              <p className="opacity-55">{src.after}</p>
            </div>
          </div>
        </div>
      </div>
      <Illustrative className="mt-8 text-graphite/80" />
    </div>
  );
}
