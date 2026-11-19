import React from 'react';
import { ArrowUpRight, Lock, ShieldCheck } from 'lucide-react';
import { PRIVACY_DOCS_URL, PRIVACY_PILLARS } from '../data/meetdolffContent';

const CHROME_PERMISSIONS = [
  'tabCapture',
  'offscreen',
  'storage',
  'sidePanel',
  'activeTab',
];

export const PrivacySection: React.FC = () => {
  return (
    <section
      id="privacy"
      aria-labelledby="privacy-heading"
      className="border-t border-white/[0.08] bg-[#0b0c10] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-widest text-violet-400 uppercase">
              Privacy &amp; Security Architecture
            </p>
            <h2
              id="privacy-heading"
              className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              Your conversations. Your control.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              MeetDolff is engineered around local-first storage, encrypted credential handling,
              and explicit user consent—without remote executable code or hidden telemetry.
            </p>
          </div>

          <a
            href={PRIVACY_DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-white/[0.14] bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/[0.09] lg:self-auto"
          >
            <ShieldCheck className="h-4 w-4 text-violet-400" aria-hidden="true" />
            <span>Explore the Privacy Architecture</span>
            <ArrowUpRight className="h-4 w-4 text-zinc-400" aria-hidden="true" />
          </a>
        </div>

        {/* 6 Core Privacy Pillars */}
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PRIVACY_PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-xl border border-white/[0.08] bg-[#101118] p-6"
            >
              <h3 className="text-base font-semibold text-white">{pillar.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">{pillar.detail}</p>
            </div>
          ))}
        </div>

        {/* Permissions & Cloud Transparency Split */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="rounded-xl border border-white/[0.08] bg-[#101118] p-6 lg:col-span-5">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-zinc-300 uppercase">
              <Lock className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
              <span>Manifest V3 Permission Scope</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              MeetDolff requests only five Chrome permissions required for explicit tab capture,
              offscreen audio processing, local settings, and the browser side panel:
            </p>
            <div className="mt-4 flex flex-wrap gap-2 font-mono text-xs text-zinc-200">
              {CHROME_PERMISSIONS.map((perm) => (
                <code
                  key={perm}
                  className="rounded border border-white/[0.08] bg-zinc-950/80 px-2.5 py-1"
                >
                  {perm}
                </code>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-[#101118] p-6 lg:col-span-7">
            <h3 className="text-xs font-semibold tracking-wide text-zinc-300 uppercase">
              Cloud Transparency
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              Local storage, offline full-text search, and exports run inside your browser.
              However, when you choose to enable cloud Whisper-compatible transcription, external
              AI providers (such as OpenAI, Groq, Together, Anthropic, or Google Gemini), or
              optional web search (Tavily or Brave Search), the relevant text or audio payload is
              sent directly to the provider you configured using your own key.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              In those cloud-enabled workflows, each third-party provider&apos;s own privacy
              policy and data handling terms apply. If you prefer strictly local inference,
              configure a local Ollama-compatible endpoint.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
