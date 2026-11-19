import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroMockup } from './components/HeroMockup';
import { ProblemSection } from './components/ProblemSection';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { PrivacySection } from './components/PrivacySection';
import { TechnicalAndRoadmapSection } from './components/TechnicalAndRoadmapSection';
import { QuickStartSection } from './components/QuickStartSection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaAndFooter } from './components/FinalCtaAndFooter';
import { REPO_URL } from './data/meetdolffContent';

const App: React.FC = () => {
  return (
    <div id="top" className="min-h-screen bg-[#09090b] text-zinc-50">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section
          aria-labelledby="hero-heading"
          className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28"
        >
          {/* Subtle atmospheric radial glow */}
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-600/15 via-blue-600/12 to-indigo-600/15 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
              {/* Left Column: Brand Value Proposition */}
              <div className="lg:col-span-5">
                <p className="font-mono text-xs font-medium tracking-[0.14em] text-violet-300 uppercase">
                  AI Meeting Companion for Chrome
                </p>

                <h1
                  id="hero-heading"
                  className="mt-4 text-balance text-[clamp(2.25rem,4vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-white"
                >
                  Your meetings. Your memory.
                </h1>

                <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                  Stop forgetting important conversations. MeetDolff turns your meetings into
                  searchable, timestamped knowledge you actually own.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <a
                    href={REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors duration-150 hover:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
                  >
                    <span>Get MeetDolff</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>

                  <a
                    href="#features"
                    className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-lg border border-white/[0.14] bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-white/[0.09] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
                  >
                    <span>Explore Features</span>
                    <ArrowRight className="h-4 w-4 text-zinc-400" aria-hidden="true" />
                  </a>
                </div>

                {/* Unboxed Trust Indicators */}
                <div className="mt-8 border-t border-white/[0.08] pt-5">
                  <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-zinc-400">
                    <span>Local-first memory</span>
                    <span aria-hidden="true" className="text-zinc-600">
                      ·
                    </span>
                    <span>Explicit recording permission</span>
                    <span aria-hidden="true" className="text-zinc-600">
                      ·
                    </span>
                    <span>Bring your own AI</span>
                    <span aria-hidden="true" className="text-zinc-600">
                      ·
                    </span>
                    <span>Portable data</span>
                  </p>
                </div>
              </div>

              {/* Right Column: Realistic Interactive Product Mockup */}
              <div className="lg:col-span-7">
                <HeroMockup />
              </div>
            </div>
          </div>
        </section>

        <ProblemSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PrivacySection />
        <TechnicalAndRoadmapSection />
        <QuickStartSection />
        <FaqSection />
      </main>

      <FinalCtaAndFooter />
    </div>
  );
};

export default App;