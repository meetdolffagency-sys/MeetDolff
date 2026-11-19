import { useState } from "react";
import { Illustrative } from "../StatusBadge";

const OPTIONS = [
  { id: "none", label: "No provider" },
  { id: "a", label: "Provider A · Model 1" },
  { id: "b", label: "Provider B · Model 2" },
] as const;

/** Provider independence: memory format never changes; the provider slot does. */
export function ProviderDemo() {
  const [sel, setSel] = useState<(typeof OPTIONS)[number]["id"]>("a");
  const on = sel !== "none";
  return (
    <div>
      <div role="group" aria-label="Configured provider" className="flex flex-wrap gap-2">
        {OPTIONS.map((o) => (
          <button key={o.id} type="button" className="chip" aria-pressed={sel === o.id} onClick={() => setSel(o.id)}>
            {o.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
        <div className="border border-obsidian/30 bg-white p-5">
          <p className="t-mono text-graphite/80">Your memory</p>
          <p className="mt-2 text-[1.05rem] font-medium">Markdown + JSON files</p>
          <p className="t-mono mt-2 text-graphite/80">Same format, whatever you choose</p>
        </div>
        <Link on={on} />
        <div className="border border-obsidian bg-obsidian p-5 text-chalk">
          <p className="t-mono text-aluminium">Provider adapter</p>
          <p className="mt-2 text-[1.05rem] font-medium">One interface</p>
          <p className="t-mono mt-2 text-aluminium">{on ? "Routing to your selection" : "Idle: nothing to route to"}</p>
        </div>
        <Link on={on} />
        <div className={`border p-5 transition-colors ${on ? "border-obsidian bg-white" : "border-dashed border-obsidian/30 bg-transparent"}`}>
          <p className="t-mono text-graphite/80">Provider you configure</p>
          <p className="mt-2 text-[1.05rem] font-medium">{on ? OPTIONS.find((o) => o.id === sel)?.label : "Empty slot"}</p>
          <p className="t-mono mt-2 text-graphite/80">{on ? "Chosen by you" : "No AI processing requested"}</p>
        </div>
      </div>

      <p className="t-body mt-6 min-h-[4.8rem]" aria-live="polite">
        {on
          ? "Only the text you ask this provider to process is sent to it, under that provider's own terms. Switch provider or model whenever you like; your memory stays in the same files."
          : "With no provider configured, nothing is sent for AI processing. Your memory remains readable files on your machine."}
      </p>
      <p className="t-mono text-graphite/80">
        “Provider A” and “Provider B” are placeholders. The list of supported providers will be published once each integration is verified.
      </p>
      <Illustrative className="mt-3 text-graphite/80" />
    </div>
  );
}

function Link({ on }: { on: boolean }) {
  return (
    <div aria-hidden className="flex items-center justify-center py-1 md:py-0">
      <span className={`block h-6 w-px md:h-px md:w-10 ${on ? "bg-signal" : "bg-obsidian/25"}`} style={{ transition: "background-color .25s" }} />
    </div>
  );
}
