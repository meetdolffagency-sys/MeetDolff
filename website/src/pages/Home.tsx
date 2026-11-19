import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/Hero";
import { Intro } from "@/components/Page";
import { DolffMark } from "@/components/Logo";
import { DownloadButton } from "@/components/DownloadButton";
import { ProductShowcase } from "@/components/demos/ProductShowcase";
import { AudioToMemory } from "@/components/demos/AudioToMemory";
import { MemoryEngine } from "@/components/demos/MemoryEngine";
import { EvidenceDemo } from "@/components/demos/EvidenceDemo";
import { ExportDemo } from "@/components/demos/ExportDemo";
import { ProviderDemo } from "@/components/demos/ProviderDemo";
import { AgentDemo } from "@/components/demos/AgentDemo";
import { RecordingStates } from "@/components/demos/RecordingStates";
import { StatusBadge } from "@/components/StatusBadge";
import { prefersReducedMotion } from "@/intro";
import { IS_PUBLISHED } from "@/config";

gsap.registerPlugin(ScrollTrigger);

function FinalCta() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top 70%", once: true } })
        .from(".f-line", { yPercent: 110, duration: 0.9, stagger: 0.12, ease: "power3.out" })
        .from(".f-fade", { opacity: 0, y: 12, duration: 0.5, stagger: 0.08 }, "-=0.4");
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} aria-labelledby="final-title" className="relative flex min-h-[90svh] items-center overflow-hidden border-t border-white/10 bg-obsidian">
      <DolffMark className="pointer-events-none absolute -right-[12%] top-1/2 hidden h-[85%] w-auto -translate-y-1/2 text-graphite/50 [--mark-lens:#08090a] md:block" />
      <div className="wrap relative py-24">
        <h2 id="final-title" className="t-display max-w-[12ch]">
          <span className="block overflow-hidden pb-[0.08em]"><span className="f-line block">Meetings end.</span></span>
          <span className="block overflow-hidden pb-[0.1em] text-aluminium"><span className="f-line block">The memory doesn't.</span></span>
        </h2>
        <div className="f-fade mt-10 flex flex-col gap-3 sm:flex-row">
          <DownloadButton size="lg" className="sm:min-w-[16rem]" />
          <Link to="/download" className="btn btn-ghost btn-lg">Release information</Link>
        </div>
        <p className="f-fade t-mono muted-dark mt-5 max-w-md">
          {IS_PUBLISHED ? "Opens the Chrome Web Store listing." : "The Chrome Web Store listing isn't published yet. Early access details are on the download page."}
        </p>
      </div>
    </section>
  );
}

const PRIVACY_POINTS = [
  { t: "You start every recording", d: "Capture begins only when you press Start, and a visible state shows while it runs.", s: "In development" as const },
  { t: "You decide what is kept", d: "Memory is yours to review, export and delete.", s: "In development" as const },
  { t: "AI processing is a choice", d: "Text goes to a third-party provider only if you configure one.", s: "In development" as const },
  { t: "No claim without evidence", d: "We don't claim encryption or fully offline operation until we can show it.", s: "Unverified" as const },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section aria-labelledby="show-title" className="on-light section">
        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 id="show-title" className="t-h2">One place from record to retrieval</h2>
              <p className="t-lead muted-light mt-5">Start a recording, read the transcript, check what was decided, tick off actions, and search it all later. Try the controls.</p>
              <Link to="/product" className="btn btn-outline-dark mt-7">See every capability</Link>
            </div>
            <ProductShowcase />
          </div>
        </div>
      </section>

      <AudioToMemory />

      <section id="memory-engine" aria-labelledby="engine-title" className="on-graphite section border-t border-white/10">
        <div className="wrap">
          <Intro id="engine-title" title="The memory engine connects meetings across time" lead="One summary is useful for a day. A thread of meetings shows what was decided, what changed, and what keeps coming back." />
          <div className="mt-14"><MemoryEngine /></div>
          <Link to="/memory" className="link mt-12 inline-block">How persistent memory works</Link>
        </div>
      </section>

      <section aria-labelledby="evidence-title" className="on-light section">
        <div className="wrap">
          <Intro light id="evidence-title" title="Answers that show their evidence" lead="Ask about a decision, a commitment or a reason. Each answer points to the meeting and the moment it came from." />
          <div className="mt-14"><EvidenceDemo /></div>
        </div>
      </section>

      <section aria-labelledby="own-title" className="section bg-obsidian">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 id="own-title" className="t-h2">Your memory belongs to you</h2>
              <p className="t-lead muted-dark mt-5">Every meeting becomes a Markdown file you can read and a JSON file tools can parse, organised by an index. No export button hiding your own notes.</p>
              <dl className="mt-10 space-y-6">
                {[
                  ["Local storage", "Your memory lives in the folder structure shown here."],
                  ["Portable exports", "Plain Markdown and JSON, so you can move, back up or open them anywhere."],
                  ["External AI processing", "Only when you configure a provider, and only for text you ask it to process."],
                ].map(([k, v]) => (
                  <div key={k} className="border-t border-white/15 pt-4">
                    <dt className="font-medium">{k}</dt>
                    <dd className="t-body muted-dark mt-1">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <ExportDemo />
          </div>
        </div>
      </section>

      <section aria-labelledby="prov-title" className="on-light section">
        <div className="wrap">
          <Intro light id="prov-title" title="Bring your own AI provider" lead="MeetDolff separates your memory from the model that reads it. Configure a provider and model, change them later, and your files stay the same." />
          <div className="mt-14"><ProviderDemo /></div>
        </div>
      </section>

      <section aria-labelledby="agent-title" className="section bg-obsidian">
        <div className="wrap">
          <Intro id="agent-title" title="Let your own agents ask your meetings" lead="The longer-term goal: an external AI agent retrieves meeting knowledge through an API or MCP interface, limited to the permissions you grant." />
          <div className="mt-14"><AgentDemo /></div>
        </div>
      </section>

      <section aria-labelledby="priv-title" className="on-light section">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 id="priv-title" className="t-h2">Recording is never a surprise</h2>
            <p className="t-lead muted-light mt-5">Control starts at the first button. Try the recording states below; the real extension is designed around the same rule.</p>
            <div className="mt-8 border border-obsidian/25 bg-white p-6"><RecordingStates /></div>
          </div>
          <div>
            <ul className="divide-y divide-obsidian/15 border-y border-obsidian/15">
              {PRIVACY_POINTS.map((p) => (
                <li key={p.t} className="py-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="t-h3">{p.t}</h3>
                    <StatusBadge status={p.s} className="mt-1 shrink-0 text-graphite/80" />
                  </div>
                  <p className="t-body muted-light mt-2">{p.d}</p>
                </li>
              ))}
            </ul>
            <Link to="/privacy" className="btn btn-dark mt-8">Read the privacy details</Link>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
