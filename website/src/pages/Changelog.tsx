import { Link } from "react-router-dom";
import { PageHeader } from "@/components/Page";
import { DolffMark } from "@/components/Logo";
import { StatusBadge } from "@/components/StatusBadge";
import { FEATURES } from "@/data/features";

export default function Changelog() {
  return (
    <>
      <PageHeader title="Changelog" lead="Release notes appear here with every published version, with dates and what changed." />
      <section aria-labelledby="empty-title" className="section">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="flex items-center gap-6">
            <DolffMark className="h-24 w-auto text-graphite" />
            <div>
              <h2 id="empty-title" className="t-h3">No public release yet</h2>
              <p className="t-body muted-dark mt-2">Dolff has nothing to log until the first version ships. Until then, here is the status of everything in progress. <Link to="/download" className="link">Download status</Link></p>
            </div>
          </div>
          <ul className="divide-y divide-white/15 border-y border-white/15" aria-label="Feature status">
            {FEATURES.map((f) => (
              <li key={f.id} className="flex items-center justify-between gap-4 py-3">
                <span>{f.name}</span>
                <StatusBadge status={f.status} className="shrink-0 text-aluminium" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
