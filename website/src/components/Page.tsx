import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { DownloadButton } from "./DownloadButton";

export function PageHeader({ title, lead, children }: { title: string; lead: string; children?: ReactNode }) {
  return (
    <header className="border-b border-white/10 pb-14 pt-32 md:pb-20 md:pt-44">
      <div className="wrap">
        <h1 className="t-display max-w-[16ch] !text-[clamp(2.6rem,7vw,5.5rem)]">{title}</h1>
        <p className="t-lead muted-dark mt-6">{lead}</p>
        {children}
      </div>
    </header>
  );
}

export function Intro({ title, lead, light = false, id }: { title: string; lead?: string; light?: boolean; id?: string }) {
  return (
    <div className="max-w-3xl">
      <h2 id={id} className="t-h2">{title}</h2>
      {lead && <p className={`t-lead mt-5 ${light ? "muted-light" : "muted-dark"}`}>{lead}</p>}
    </div>
  );
}

export function PageCta({ title, to, label }: { title: string; to?: string; label?: string }) {
  return (
    <section className="border-t border-white/10 section">
      <div className="wrap flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <h2 className="t-h2 max-w-[18ch]">{title}</h2>
        <div className="flex flex-col gap-3 sm:flex-row">
          <DownloadButton size="lg" />
          {to && label && (
            <Link to={to} className="btn btn-ghost btn-lg">
              {label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
