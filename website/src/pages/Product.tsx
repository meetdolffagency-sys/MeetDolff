import { Link } from "react-router-dom";
import { PageCta, PageHeader } from "@/components/Page";
import { ProductShowcase } from "@/components/demos/ProductShowcase";
import { StatusBadge } from "@/components/StatusBadge";
import { FEATURES, STATUS_MEANING, STATUS_ORDER } from "@/data/features";

export default function Product() {
  const core = FEATURES.slice(0, 8);
  return (
    <>
      <PageHeader title="Capture it once. Use it for the whole project." lead="MeetDolff records a meeting when you tell it to, then turns the conversation into a transcript, a structured record and a searchable memory. Here is each capability and where it honestly stands." />

      <section aria-labelledby="cap-title" className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <h2 id="cap-title" className="t-h2">What it does</h2>
            <p className="t-body muted-dark mt-5">The process is simple to say and careful to build: capture, transcribe, understand, remember, retrieve.</p>
          </div>
          <ul className="divide-y divide-white/15 border-y border-white/15">
            {core.map((f) => (
              <li key={f.id} className="grid gap-2 py-6 sm:grid-cols-[1fr_auto] sm:gap-8">
                <div>
                  <h3 className="t-h3">{f.name}</h3>
                  <p className="t-body muted-dark mt-1">{f.summary}</p>
                </div>
                <StatusBadge status={f.status} className="self-start text-aluminium sm:mt-1.5" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="try-title" className="on-light section">
        <div className="wrap">
          <h2 id="try-title" className="t-h2 max-w-[20ch]">Try the product interface concept</h2>
          <p className="t-lead muted-light mb-12 mt-5">These controls work, but the data is an example. The shipped extension may differ in layout and detail.</p>
          <ProductShowcase />
        </div>
      </section>

      <section aria-labelledby="scope-title" className="section">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <div>
            <h2 id="scope-title" className="t-h2">Where it works</h2>
            <p className="t-body muted-dark mt-5">MeetDolff is a Chrome extension, so it is designed for meetings that happen in a browser tab. It can't promise capture from native desktop meeting apps, and we won't claim support for every meeting platform.</p>
            <Link to="/download" className="link mt-6 inline-block">Compatibility and limitations</Link>
          </div>
          <div>
            <h2 className="t-h3">How to read the status labels</h2>
            <dl className="mt-5 divide-y divide-white/15 border-y border-white/15">
              {STATUS_ORDER.map((s) => (
                <div key={s} className="grid grid-cols-[9.5rem_1fr] items-center gap-3 py-3">
                  <dt><StatusBadge status={s} /></dt>
                  <dd className="t-body muted-dark">{STATUS_MEANING[s]}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <PageCta title="See how memory connects your meetings." to="/memory" label="Explore memory" />
    </>
  );
}
