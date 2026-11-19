import { PageCta, PageHeader, Intro } from "@/components/Page";
import { MemoryEngine } from "@/components/demos/MemoryEngine";
import { EvidenceDemo } from "@/components/demos/EvidenceDemo";
import { ExportDemo } from "@/components/demos/ExportDemo";

const QUESTIONS = [
  "What happened in our meeting last Tuesday?",
  "What did we decide about the new project?",
  "What problems have we discussed repeatedly?",
  "Did someone commit to completing the frontend?",
  "What was the reason we rejected our previous approach?",
  "What changed between our first and most recent discussion?",
];

export default function Memory() {
  return (
    <>
      <PageHeader title="Summaries expire. Memory compounds." lead="A disposable summary answers one meeting. Persistent memory keeps every meeting, links them by project and topic, and lets you ask questions across all of them." />

      <section aria-labelledby="q-title" className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 id="q-title" className="t-h2">Questions memory is built for</h2>
            <p className="t-body muted-dark mt-5">Answers are grounded in the actual meeting records, with the meeting name and timestamp where available.</p>
          </div>
          <ul className="divide-y divide-white/15 border-y border-white/15">
            {QUESTIONS.map((q) => (
              <li key={q} className="py-5 text-[1.25rem] leading-snug tracking-[-0.015em] sm:text-[1.5rem]">{q}</li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="eng-title" className="on-graphite section border-t border-white/10">
        <div className="wrap">
          <Intro id="eng-title" title="Conversations, connected" lead="Select a topic thread or a meeting. The detail shows what that meeting decided and how it relates to the ones around it." />
          <div className="mt-14"><MemoryEngine /></div>
        </div>
      </section>

      <section aria-labelledby="ev-title" className="on-light section">
        <div className="wrap">
          <Intro light id="ev-title" title="Every answer points back" lead="Grounding is what separates memory from guesswork. If an answer can't be tied to a record, it shouldn't be trusted." />
          <div className="mt-14"><EvidenceDemo /></div>
        </div>
      </section>

      <section aria-labelledby="files-title" className="section">
        <div className="wrap">
          <Intro id="files-title" title="Memory you can open in any editor" lead="A meeting is saved as a Markdown file for reading and a JSON file for tools, both listed in index.json." />
          <div className="mt-12"><ExportDemo /></div>
          <div className="mt-20 grid gap-px bg-white/15 md:grid-cols-3">
            {[
              ["Local storage", "Where your memory lives. You can browse, back up and delete it."],
              ["Portable exports", "Markdown and JSON, readable without MeetDolff."],
              ["External AI processing", "Happens only if you configure a provider, for the text you ask it to process."],
            ].map(([t, d]) => (
              <div key={t} className="bg-obsidian p-6">
                <h3 className="t-h3">{t}</h3>
                <p className="t-body muted-dark mt-2">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageCta title="Start building a memory that lasts." to="/privacy" label="How control works" />
    </>
  );
}
