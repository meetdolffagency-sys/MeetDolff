import React from 'react';
import { ROADMAP_ITEMS, TECHNICAL_STACK } from '../data/meetdolffContent';

export const TechnicalAndRoadmapSection: React.FC = () => {
  return (
    <>
      {/* Technical Transparency */}
      <section
        id="architecture"
        aria-labelledby="architecture-heading"
        className="border-t border-white/[0.08] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium tracking-widest text-blue-400 uppercase">
                Technical Transparency
              </p>
              <h2
                id="architecture-heading"
                className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl"
              >
                Built with intention. Not unnecessary complexity.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                Every dependency in MeetDolff v0.1.0 is chosen for predictability and local
                ownership. No remote executable code is loaded at runtime.
              </p>

              <div className="mt-6 rounded-xl border border-white/[0.08] bg-[#101118] p-5">
                <h3 className="text-sm font-semibold text-white">
                  Why deterministic full-text search instead of vector search in v0.1.0
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  Vector search is deliberately not included in v0.1.0. Deterministic full-text
                  search across IndexedDB transcripts, summaries, decisions, and action items
                  requires zero embedding API calls, works offline immediately, and produces
                  transparent, reproducible matches with exact date and topic filtering.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 divide-y divide-white/[0.07] rounded-xl border border-white/[0.08] bg-[#0d0e13] sm:grid-cols-2 sm:divide-y-0">
                {TECHNICAL_STACK.map((tech, idx) => (
                  <div
                    key={tech.name}
                    className={`border-white/[0.07] p-5 ${
                      idx < TECHNICAL_STACK.length - 2 ? 'sm:border-b' : ''
                    } ${idx % 2 === 0 ? 'sm:border-r' : ''} ${
                      idx === TECHNICAL_STACK.length - 1 ? 'sm:col-span-2 sm:border-t' : ''
                    }`}
                  >
                    <div className="text-sm font-semibold text-white">{tech.name}</div>
                    <div className="mt-1 text-xs text-zinc-400">{tech.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Honest Product Limitations / Roadmap */}
      <section
        id="roadmap"
        aria-labelledby="roadmap-heading"
        className="border-t border-white/[0.08] bg-[#0b0c10] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 border-b border-white/[0.08] pb-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-widest text-zinc-400 uppercase">
                Honest Product Scope
              </p>
              <h2
                id="roadmap-heading"
                className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl"
              >
                What&apos;s next?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                We distinguish verified v0.1.0 capabilities from planned future work. The items
                below are on the roadmap and are not yet shipped in v0.1.0.
              </p>
            </div>
            <div className="text-xs text-zinc-400">
              <span className="font-mono text-zinc-200">Current release:</span> Verified v0.1.0
              unpacked extension
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {ROADMAP_ITEMS.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/[0.08] bg-[#101118] p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <span className="shrink-0 font-mono text-xs text-amber-300/90">
                    Planned
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
