import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BARS, SEGMENTS } from "@/data/demo";
import { Illustrative } from "../StatusBadge";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { name: "Capture", desc: "Audio is captured only while you record, with a visible state." },
  { name: "Transcribe", desc: "Speech becomes timestamped text, split by speaker where available." },
  { name: "Structure", desc: "Each meeting is distilled into decisions, action items and topics." },
  { name: "Remember", desc: "The record joins your project's history and stays retrievable." },
];

function Stage({ i }: { i: number }) {
  if (i === 0)
    return (
      <div className="flex h-full flex-col justify-center">
        <div className="flex h-40 items-center gap-[3px]" aria-hidden>
          {BARS.map((h, k) => (
            <span key={k} className="block flex-1 origin-center rounded-full bg-chalk" style={{ height: `${h * 100}%`, animation: `bar-live ${0.9 + (k % 6) * 0.14}s ease-in-out ${(k % 8) * 0.06}s infinite` }} />
          ))}
        </div>
        <p className="t-mono mt-6 inline-flex items-center gap-2"><span className="rec-dot inline-block h-2.5 w-2.5 rounded-full bg-signal" aria-hidden /> Recording · started by you</p>
      </div>
    );
  if (i === 1)
    return (
      <ul className="flex h-full flex-col justify-center gap-4">
        {SEGMENTS.slice(0, 4).map((s) => (
          <li key={s.id} className="grid grid-cols-[5.2rem_1fr] gap-3 border-b border-white/10 pb-3">
            <span className="t-mono text-aluminium">{s.ts}</span>
            <span className="text-[0.98rem] leading-snug">
              <b className="font-medium">{s.speaker}</b> {s.text}
            </span>
          </li>
        ))}
      </ul>
    );
  if (i === 2)
    return (
      <div className="grid h-full content-center gap-5 sm:grid-cols-2">
        <div className="border border-white/15 p-4">
          <p className="t-mono text-aluminium">decisions</p>
          <p className="mt-2 text-[1rem]">SQLite for the pilot; revisit with multi-device sync.</p>
          <p className="t-mono mt-2 text-signal">00:09:37</p>
        </div>
        <div className="border border-white/15 p-4">
          <p className="t-mono text-aluminium">actionItems</p>
          <p className="mt-2 text-[1rem]">Priya: migration notes by Friday.</p>
          <p className="t-mono mt-2 text-signal">00:14:05</p>
        </div>
        <div className="border border-white/15 p-4 sm:col-span-2">
          <p className="t-mono text-aluminium">topics</p>
          <p className="t-mono mt-2">["Database", "Sync", "Export"]</p>
        </div>
      </div>
    );
  const nodes = [[70, 130], [190, 70], [310, 160], [430, 90], [550, 150]];
  return (
    <div className="flex h-full flex-col justify-center">
      <svg viewBox="0 0 640 230" className="w-full" aria-hidden>
        {nodes.map(([x, y], k) => (
          <line key={k} x1={x} y1={y} x2="330" y2="205" stroke="#b7bec3" strokeOpacity="0.35" />
        ))}
        {nodes.slice(1).map(([x, y], k) => (
          <line key={`c${k}`} x1={nodes[k][0]} y1={nodes[k][1]} x2={x} y2={y} stroke="#fff" strokeOpacity="0.8" />
        ))}
        {nodes.map(([x, y], k) => (
          <circle key={`n${k}`} cx={x} cy={y} r={k === 2 ? 9 : 6} fill={k === 2 ? "#d39a68" : "#fff"} />
        ))}
        <rect x="270" y="195" width="120" height="26" fill="none" stroke="#fff" />
        <text x="330" y="213" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="IBM Plex Mono, monospace">Project Atlas</text>
      </svg>
      <p className="t-mono mt-4 text-aluminium">Five meetings, one thread. The 12 Mar decision is linked to the 4 Mar proposal it replaced.</p>
    </div>
  );
}

export function AudioToMemory() {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top+=64",
      end: "bottom bottom",
      onUpdate: (self) => setActive(Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length))),
    });
    return () => st.kill();
  }, []);

  const jump = (i: number) => {
    const el = section.current;
    if (!el) return;
    setActive(i);
    const total = el.offsetHeight - window.innerHeight + 64;
    const top = el.getBoundingClientRect().top + window.scrollY - 64 + (total * (i + 0.5)) / STEPS.length;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section ref={section} aria-labelledby="a2m-title" className="relative h-[330vh] bg-obsidian md:h-[380vh]">
      <div className="sticky top-16 flex h-[calc(100svh-4rem)] items-center overflow-hidden">
        <div className="wrap grid gap-5 md:gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 id="a2m-title" className="t-h2 max-w-[16ch]">From audio to memory</h2>
            <p className="t-body muted-dark mt-3 hidden sm:block">Scroll, or choose a step. Each stage turns the last one into something you can use.</p>
            <ol className="mt-4 flex gap-2 overflow-x-auto lg:mt-8 lg:block lg:space-y-1 lg:overflow-visible" aria-label="Stages">
              {STEPS.map((s, i) => (
                <li key={s.name} className="shrink-0">
                  <button
                    type="button"
                    aria-current={active === i ? "step" : undefined}
                    onClick={() => jump(i)}
                    className={`flex w-full items-center gap-3 rounded-full border px-4 py-2 text-left transition-colors lg:rounded-none lg:border-0 lg:border-l-2 lg:py-3 ${active === i ? "border-chalk bg-chalk text-obsidian lg:bg-transparent lg:text-chalk lg:border-signal" : "border-white/25 text-aluminium hover:text-chalk lg:border-white/15"}`}
                  >
                    <span className="t-mono" aria-hidden>{i + 1}</span>
                    <span className="text-[1.05rem] font-medium lg:text-[1.35rem]">{s.name}</span>
                  </button>
                </li>
              ))}
            </ol>
            <p className="t-body mt-4 min-h-[3rem] text-chalk/90 lg:mt-5" aria-live="polite">{STEPS[active].desc}</p>
          </div>
          <div className="relative h-[17rem] border border-white/15 p-5 sm:h-[22rem] lg:h-[26rem]">
            {STEPS.map((_, i) => (
              <div
                key={i}
                aria-hidden={active !== i}
                className="absolute inset-5 transition-[opacity,transform] duration-500"
                style={{ opacity: active === i ? 1 : 0, transform: active === i ? "none" : "translateY(10px)", pointerEvents: active === i ? "auto" : "none" }}
              >
                {Math.abs(active - i) <= 1 && <Stage i={i} />}
              </div>
            ))}
            <Illustrative className="absolute -bottom-9 left-0 text-aluminium" />
          </div>
        </div>
      </div>
    </section>
  );
}
