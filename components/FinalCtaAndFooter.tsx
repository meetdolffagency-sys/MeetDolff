import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { COMPANION_DOCS_URL, LOGO_PATH, PRIVACY_DOCS_URL, REPO_URL } from '../data/meetdolffContent';

export const FinalCtaAndFooter: React.FC = () => {
  return (
    <>
      {/* Final Conversion CTA */}
      <section
        aria-labelledby="final-cta-heading"
        className="relative overflow-hidden border-t border-white/[0.08] py-24 sm:py-32"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-80 max-w-3xl rounded-full bg-gradient-to-b from-violet-600/15 via-blue-600/10 to-transparent blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            id="final-cta-heading"
            className="mx-auto max-w-3xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-5xl"
          >
            Never lose the context of a conversation again.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Give your meetings a memory. Keep your knowledge searchable, portable and under your
            control.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-lg bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
            >
              <span>Get Started with MeetDolff</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-lg border border-white/[0.14] bg-white/[0.04] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.09] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
            >
              <span>Explore the Documentation</span>
              <ArrowUpRight className="h-4 w-4 text-zinc-400" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-[#070709] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <a href="#top" className="inline-flex items-center">
                <img
                  src={LOGO_PATH}
                  alt="MeetDolff"
                  referrerPolicy="no-referrer"
                  className="h-10 w-auto rounded-md bg-white px-2.5 py-1 object-contain"
                />
              </a>
              <p className="mt-4 text-sm font-medium text-zinc-200">
                Your meetings. Your memory.
              </p>
              <p className="mt-2 max-w-xs text-xs leading-relaxed text-zinc-500">
                Local-first AI meeting companion Chrome extension. Bring your own key, export
                portable Markdown and JSON, and keep full control.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8">
              <div>
                <h3 className="text-xs font-semibold tracking-wide text-zinc-300 uppercase">
                  Product
                </h3>
                <ul className="mt-3 space-y-2.5 text-sm text-zinc-400">
                  <li>
                    <a href="#features" className="transition-colors hover:text-white">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#how-it-works" className="transition-colors hover:text-white">
                      How it works
                    </a>
                  </li>
                  <li>
                    <a href="#architecture" className="transition-colors hover:text-white">
                      Architecture
                    </a>
                  </li>
                  <li>
                    <a href="#roadmap" className="transition-colors hover:text-white">
                      Roadmap
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold tracking-wide text-zinc-300 uppercase">
                  Resources
                </h3>
                <ul className="mt-3 space-y-2.5 text-sm text-zinc-400">
                  <li>
                    <a
                      href={REPO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 transition-colors hover:text-white"
                    >
                      <span>Documentation</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={COMPANION_DOCS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 transition-colors hover:text-white"
                    >
                      <span>Companion documentation</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={PRIVACY_DOCS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 transition-colors hover:text-white"
                    >
                      <span>Privacy</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#quick-start" className="transition-colors hover:text-white">
                      Quick Start
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold tracking-wide text-zinc-300 uppercase">
                  Project
                </h3>
                <ul className="mt-3 space-y-2.5 text-sm text-zinc-400">
                  <li>
                    <a
                      href={REPO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 transition-colors hover:text-white"
                    >
                      <span>GitHub repository</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={`${REPO_URL}/issues`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 transition-colors hover:text-white"
                    >
                      <span>Contact (GitHub Issues)</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center">
            <span>MeetDolff · Verified v0.1.0 specification</span>
            <span>Local-first Chrome Extension · No analytics · BYOK AI</span>
          </div>
        </div>
      </footer>
    </>
  );
};
