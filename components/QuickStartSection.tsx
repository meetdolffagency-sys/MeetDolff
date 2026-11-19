import React, { useState } from 'react';
import { ArrowUpRight, Check, Copy, Terminal } from 'lucide-react';
import { CONFIG_STEPS, INSTALL_STEPS, REPO_URL } from '../data/meetdolffContent';

const TERMINAL_COMMANDS = `git clone ${REPO_URL}.git
cd MeetDolff
npm install
npm run build`;

export const QuickStartSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(TERMINAL_COMMANDS);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="quick-start"
      aria-labelledby="quick-start-heading"
      className="border-t border-white/[0.08] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-widest text-violet-400 uppercase">
              Quick Start
            </p>
            <h2
              id="quick-start-heading"
              className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              Build and load in Chrome in minutes.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              MeetDolff v0.1.0 currently uses manual unpacked installation from the official
              source repository while a Chrome Web Store listing is not yet published.
            </p>
          </div>

          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-white/[0.14] bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-white/[0.09] lg:self-auto"
          >
            <span>Open GitHub Repository</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left: Terminal Commands & Initial Configuration */}
          <div className="space-y-6 lg:col-span-5">
            <div className="overflow-hidden rounded-xl border border-white/[0.1] bg-[#0d0e13]">
              <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#13141c] px-4 py-2.5">
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                  <Terminal className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
                  <span>Build Unpacked Extension</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.1] bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-zinc-200 transition-colors hover:bg-white/[0.09]"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-zinc-200">
                <code>{TERMINAL_COMMANDS}</code>
              </pre>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-[#101118] p-6">
              <h3 className="text-base font-semibold text-white">Initial Configuration</h3>
              <p className="mt-1.5 text-xs text-zinc-400">
                Complete these steps after pinning the extension in Chrome:
              </p>
              <ol className="mt-4 space-y-2.5">
                {CONFIG_STEPS.map((step, i) => (
                  <li key={step} className="flex items-start gap-3 text-sm text-zinc-300">
                    <span className="mt-0.5 font-mono text-xs tabular-nums text-violet-400">
                      0{i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right: 8-Step Unpacked Installation Guide */}
          <div className="rounded-xl border border-white/[0.08] bg-[#101118] p-6 sm:p-8 lg:col-span-7">
            <h3 className="text-base font-semibold text-white">
              Unpacked Chrome Installation Steps
            </h3>
            <ol className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {INSTALL_STEPS.map((step, idx) => (
                <li
                  key={step}
                  className="flex items-start gap-3.5 rounded-lg border border-white/[0.06] bg-zinc-950/50 p-4"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-white/[0.12] bg-white/[0.04] font-mono text-xs font-semibold tabular-nums text-zinc-200">
                    {idx + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-zinc-300">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};
