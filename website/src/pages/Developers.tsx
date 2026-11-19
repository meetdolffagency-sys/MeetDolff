import { Link } from "react-router-dom";
import { PageCta, PageHeader, Intro } from "@/components/Page";
import { ProviderDemo } from "@/components/demos/ProviderDemo";
import { AgentDemo } from "@/components/demos/AgentDemo";
import { StatusBadge } from "@/components/StatusBadge";
import { FEATURES } from "@/data/features";

export default function Developers() {
  const rows = FEATURES.filter((f) => ["providers", "memory", "agents"].includes(f.id));
  return (
    <>
      <PageHeader title="Your models. Your files. Your agents." lead="MeetDolff keeps memory separate from the AI that reads it, so you can change providers without losing anything, and one day let your own agents query it." />

      <section aria-labelledby="prov-title" className="on-light section">
        <div className="wrap">
          <Intro light id="prov-title" title="Provider independence" lead="Choose the provider and model for understanding and answering. The adapter is the only thing that changes." />
          <div className="mt-14"><ProviderDemo /></div>
        </div>
      </section>

      <section aria-labelledby="agent-title" className="section">
        <div className="wrap">
          <Intro id="agent-title" title="External agents, with permissions" lead="The planned API / MCP interface lets an agent retrieve meeting knowledge, limited to the projects and content types you grant." />
          <div className="mt-14"><AgentDemo /></div>
        </div>
      </section>

      <section aria-labelledby="stat-title" className="on-graphite section border-t border-white/10">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 id="stat-title" className="t-h2">Status for builders</h2>
            <p className="t-body muted-dark mt-5">No public API, MCP server or provider list has been released. Nothing on this page should be integrated against yet. The memory files are the stable idea: <Link className="link" to="/memory">Markdown and JSON</Link>.</p>
          </div>
          <ul className="divide-y divide-white/15 border-y border-white/15">
            {rows.map((f) => (
              <li key={f.id} className="flex items-start justify-between gap-4 py-5">
                <div>
                  <h3 className="t-h3">{f.name}</h3>
                  <p className="t-body muted-dark mt-1">{f.summary}</p>
                </div>
                <StatusBadge status={f.status} className="mt-1 shrink-0 text-aluminium" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PageCta title="Own the memory. Choose the model." to="/changelog" label="Follow the changelog" />
    </>
  );
}
