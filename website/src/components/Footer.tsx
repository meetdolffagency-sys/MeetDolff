import { Link } from "react-router-dom";
import { DolffMark } from "./Logo";
import { DownloadButton } from "./DownloadButton";
import { CONTACT_EMAIL } from "@/config";

const COLS = [
  {
    title: "Product",
    links: [
      { to: "/product", label: "Capabilities" },
      { to: "/memory", label: "Meeting memory" },
      { to: "/download", label: "Download" },
    ],
  },
  {
    title: "Trust",
    links: [
      { to: "/privacy", label: "Privacy and control" },
      { to: "/memory", label: "Your data, your files" },
    ],
  },
  {
    title: "Build",
    links: [
      { to: "/developers", label: "Providers, API and MCP" },
      { to: "/changelog", label: "Changelog" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-obsidian">
      <div className="wrap grid gap-14 py-16 lg:grid-cols-[1.3fr_2fr]">
        <div>
          <div className="flex items-end gap-5">
            <DolffMark className="h-16 w-auto text-chalk" title="Dolff, the MeetDolff dolphin, wearing spectacles" />
            <p className="text-[1.6rem] font-medium leading-none tracking-[-0.03em]">MeetDolff</p>
          </div>
          <p className="t-body muted-dark mt-6">Meetings end. The memory doesn't.</p>
          <DownloadButton variant="ghost" className="mt-6" />
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {COLS.map((c) => (
            <div key={c.title}>
              <h2 className="t-mono muted-dark">{c.title}</h2>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="link text-[0.95rem]">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="t-mono muted-dark">Contact</h2>
            <p className="mt-4 text-[0.95rem]">
              {CONTACT_EMAIL ? (
                <a className="link break-all" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
              ) : (
                <span className="muted-dark">Contact details will be published with the first release.</span>
              )}
            </p>
          </div>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-2 py-6 sm:flex-row sm:justify-between">
          <p className="t-mono muted-dark">© 2026 MeetDolff. All rights reserved.</p>
          <p className="t-mono muted-dark">Product visuals on this site are illustrative concepts unless labelled otherwise.</p>
        </div>
      </div>
    </footer>
  );
}
