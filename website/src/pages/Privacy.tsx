import { PageCta, PageHeader } from "@/components/Page";
import { RecordingStates } from "@/components/demos/RecordingStates";
import { StatusBadge } from "@/components/StatusBadge";
import { FEATURES } from "@/data/features";

const TOPICS = [
  { t: "Explicit recording control", d: "Nothing is captured until you press Start. You can pause or stop at any time." },
  { t: "Visible recording states", d: "While capture is active the state is clearly shown, so recording is never ambiguous to you." },
  { t: "User-managed recording and memory", d: "The records are yours to review, correct and organise by project." },
  { t: "Retention and deletion", d: "You decide how long a meeting is kept, and you can delete it. Deleting a record removes it from your memory." },
  { t: "Export and recovery", d: "Memory is stored as Markdown and JSON, so you can back it up, move it, or recover it with ordinary tools." },
  { t: "Third-party AI processing", d: "If you configure a provider, the text you ask it to process is sent to that provider under its own terms. Without one, nothing is sent for AI processing." },
];

export default function Privacy() {
  const unverified = FEATURES.filter((f) => f.status === "Unverified");
  return (
    <>
      <PageHeader title="Recording should never be a surprise." lead="MeetDolff is built so that you decide when a meeting is recorded, what is kept, and where it goes. These are the principles, stated plainly and no further than the evidence." />

      <section aria-labelledby="states-title" className="on-light section">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <div>
            <h2 id="states-title" className="t-h2">See the states</h2>
            <p className="t-lead muted-light mt-5">Press Start, pause, resume or stop. This is a demonstration of the interaction model; no audio is captured here and your microphone is never accessed on this site.</p>
          </div>
          <div className="border border-obsidian/25 bg-white p-6 sm:p-8"><RecordingStates /></div>
        </div>
      </section>

      <section aria-labelledby="ctl-title" className="section">
        <div className="wrap">
          <h2 id="ctl-title" className="t-h2">Control, in six parts</h2>
          <ul className="mt-12 grid gap-x-16 gap-y-0 md:grid-cols-2">
            {TOPICS.map((p) => (
              <li key={p.t} className="border-t border-white/15 py-7">
                <h3 className="t-h3">{p.t}</h3>
                <p className="t-body muted-dark mt-2">{p.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="no-title" className="on-graphite section border-t border-white/10">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 id="no-title" className="t-h2">What we don't claim</h2>
            <p className="t-body muted-dark mt-5">Trust is built from claims you can check. These aren't made until there is technical evidence behind them.</p>
          </div>
          <ul className="divide-y divide-white/15 border-y border-white/15">
            {unverified.map((f) => (
              <li key={f.id} className="flex items-start justify-between gap-4 py-5">
                <div>
                  <h3 className="t-h3">{f.name}</h3>
                  <p className="t-body muted-dark mt-1">{f.summary}</p>
                </div>
                <StatusBadge status={f.status} className="mt-1 shrink-0 text-aluminium" />
              </li>
            ))}
            <li className="py-5 t-body muted-dark">Also not claimed: that every meeting application can be captured, or that all processing happens on your device.</li>
          </ul>
        </div>
      </section>

      <PageCta title="Control first. Convenience second." to="/memory" label="See how memory is stored" />
    </>
  );
}
