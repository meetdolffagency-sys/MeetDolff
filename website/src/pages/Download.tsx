import { useId, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/Page";
import { DownloadButton } from "@/components/DownloadButton";
import { StatusBadge } from "@/components/StatusBadge";
import { CONTACT_EMAIL, EARLY_ACCESS_ENDPOINT, IS_PUBLISHED, RELEASE_VERSION } from "@/config";

type FormState = "idle" | "sending" | "done" | "error";

function EarlyAccessForm() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [msg, setMsg] = useState("");

  if (!EARLY_ACCESS_ENDPOINT && !CONTACT_EMAIL) {
    return (
      <p className="t-body muted-light" data-testid="early-access-unconfigured">
        Early-access sign-up isn't connected yet, so there is no form to fill in here. Once a sign-up endpoint or a verified contact address is configured, it appears in this spot.
      </p>
    );
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      setMsg("Enter a valid email address.");
      return;
    }
    if (!EARLY_ACCESS_ENDPOINT) {
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("MeetDolff early access")}&body=${encodeURIComponent(`Please add me to early access: ${email}`)}`;
      setState("done");
      setMsg("Your email app should open with a prepared message. Send it to join.");
      return;
    }
    setState("sending");
    try {
      const res = await fetch(EARLY_ACCESS_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, source: "download-page" }) });
      if (!res.ok) throw new Error(String(res.status));
      setState("done");
      setMsg("You're on the list. We'll email you when the extension is published.");
    } catch {
      setState("error");
      setMsg("That didn't go through. Check your connection and try again.");
    }
  };

  return (
    <form onSubmit={submit} noValidate className="max-w-md">
      <label htmlFor={id} className="font-medium">Email address</label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input id={id} type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={state === "error"} aria-describedby={`${id}-msg`} className="min-h-12 flex-1 rounded-md border border-obsidian/40 bg-white px-4 text-[1rem]" />
        <button type="submit" className="btn btn-dark" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Get early access"}</button>
      </div>
      <p id={`${id}-msg`} role="status" className="t-mono mt-3 min-h-[1.5rem]">{msg}</p>
    </form>
  );
}

const STEPS = [
  { t: "Open the listing", d: "Follow Download for Chrome to the Chrome Web Store page for MeetDolff." },
  { t: "Add it to Chrome", d: "Choose Add to Chrome and confirm the permission prompt." },
  { t: "Pin the extension", d: "Open the puzzle-piece menu in Chrome's toolbar and pin MeetDolff so it is one click away." },
  { t: "Open it on a meeting tab", d: "Click the MeetDolff icon on the tab where your meeting is running, then choose Start recording." },
];

export default function Download() {
  return (
    <>
      <PageHeader title="Download for Chrome" lead="MeetDolff installs as a Chrome extension. This page tells you exactly where release status stands, so the button never promises more than exists." />

      <section id="release-status" aria-labelledby="status-title" className="on-light section scroll-mt-16">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <div>
            <h2 id="status-title" className="t-h2">{IS_PUBLISHED ? "Available on the Chrome Web Store" : "Not published yet"}</h2>
            <p className="t-lead muted-light mt-5">
              {IS_PUBLISHED
                ? "The listing below is the official release."
                : "There is no Chrome Web Store listing for MeetDolff at the moment, and we won't point you to one that doesn't exist. Early access is the honest path until the first release."}
            </p>
            <dl className="mt-8 divide-y divide-obsidian/15 border-y border-obsidian/15">
              <div className="flex justify-between gap-4 py-3"><dt>Distribution</dt><dd><StatusBadge status={IS_PUBLISHED ? "Available" : "Planned"} /></dd></div>
              <div className="flex justify-between gap-4 py-3"><dt>Current version</dt><dd className="t-mono">{RELEASE_VERSION || "No verified release"}</dd></div>
              <div className="flex justify-between gap-4 py-3"><dt>Release notes</dt><dd><Link className="link" to="/changelog">Changelog</Link></dd></div>
            </dl>
            {IS_PUBLISHED && <div className="mt-8"><DownloadButton variant="dark" size="lg" /></div>}
          </div>
          <div id="early-access" className="scroll-mt-24 border border-obsidian/25 bg-white p-6 sm:p-8">
            <h2 className="t-h3">Early access</h2>
            <p className="t-body muted-light mb-6 mt-2">Leave your email and we'll tell you when the extension is ready to install. Used for that purpose only.</p>
            <EarlyAccessForm />
          </div>
        </div>
      </section>

      <section aria-labelledby="req-title" className="section">
        <div className="wrap grid gap-14 lg:grid-cols-2">
          <div>
            <h2 id="req-title" className="t-h2">Before you install</h2>
            <dl className="mt-8 divide-y divide-white/15 border-y border-white/15">
              <div className="py-4"><dt className="font-medium">Browser</dt><dd className="t-body muted-dark mt-1">Google Chrome on desktop. Other Chromium-based browsers are not verified, so we make no claim about them.</dd></div>
              <div className="py-4"><dt className="font-medium">Works with</dt><dd className="t-body muted-dark mt-1">Meetings running in a browser tab. A browser extension can't guarantee capture from native desktop meeting apps.</dd></div>
              <div className="py-4"><dt className="font-medium">Permissions</dt><dd className="t-body muted-dark mt-1">The definitive list comes from the extension's manifest at release and will be reproduced here. Expect permission to capture the tab you choose to record and to store your memory. <StatusBadge status="Unverified" className="ml-1" /></dd></div>
              <div className="py-4"><dt className="font-medium">Recording</dt><dd className="t-body muted-dark mt-1">Starts only when you start it, shows its state while active, and stops when you stop it. Recording laws and consent rules vary: tell participants before you record.</dd></div>
            </dl>
          </div>
          <div>
            <h2 className="t-h2">Installing</h2>
            <ol className="mt-8 divide-y divide-white/15 border-y border-white/15">
              {STEPS.map((s, i) => (
                <li key={s.t} className="grid grid-cols-[2.2rem_1fr] gap-3 py-4">
                  <span className="t-mono text-aluminium" aria-hidden>{i + 1}</span>
                  <div><h3 className="font-medium">{s.t}</h3><p className="t-body muted-dark mt-1">{s.d}</p></div>
                </li>
              ))}
            </ol>
            <h3 className="t-h3 mt-12">Known limitations</h3>
            <ul className="t-body muted-dark mt-3 list-disc space-y-2 pl-5">
              <li>No public release exists yet, so there is nothing to install today.</li>
              <li>Browser-tab meetings only; native apps are not supported by this architecture.</li>
              <li>Encryption at rest and fully offline operation are not claimed.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
