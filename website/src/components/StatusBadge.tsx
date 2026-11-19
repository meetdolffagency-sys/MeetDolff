import type { Status } from "@/data/features";

const DOT: Record<Status, string> = {
  Available: "bg-chalk",
  Beta: "bg-aluminium",
  "In development": "bg-signal",
  Planned: "border border-current bg-transparent",
  Unverified: "border border-dashed border-current bg-transparent",
};

export function StatusBadge({ status, className = "" }: { status: Status; className?: string }) {
  return (
    <span className={`t-mono inline-flex items-center gap-2 whitespace-nowrap ${className}`}>
      <span aria-hidden className={`inline-block h-2 w-2 rounded-full ${DOT[status]}`} />
      <span>{status}</span>
    </span>
  );
}

export function Illustrative({ className = "" }: { className?: string }) {
  return (
    <p className={`t-mono inline-flex items-center gap-2 ${className}`}>
      <span aria-hidden className="inline-block h-2 w-2 rounded-full border border-dashed border-current" />
      Illustrative concept, not a captured meeting
    </p>
  );
}
