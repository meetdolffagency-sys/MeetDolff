import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/meetdolffContent';

export const HowItWorksSection: React.FC = () => {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="border-t border-white/[0.08] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-widest text-blue-400 uppercase">
            How It Works
          </p>
          <h2
            id="how-it-works-heading"
            className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Record once. Remember everything.
          </h2>
          <p className="mt-3 text-base text-zinc-400">
            Four deliberate steps from a browser meeting tab to searchable, portable personal
            memory.
          </p>
        </div>

        {/* Desktop horizontal connected diagram / Mobile vertical layout */}
        <div className="relative mt-14">
          {/* Desktop horizontal connector line */}
          <div
            className="pointer-events-none absolute top-5 right-12 left-12 hidden h-px bg-gradient-to-r from-violet-500/40 via-blue-500/40 to-white/[0.12] md:block"
            aria-hidden="true"
          />

          <ol className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6">
            {HOW_IT_WORKS_STEPS.map((item, idx) => (
              <li key={item.step} className="relative flex gap-4 md:block">
                {/* Mobile vertical connector line */}
                {idx < HOW_IT_WORKS_STEPS.length - 1 && (
                  <div
                    className="absolute top-10 bottom-[-2rem] left-5 w-px bg-white/[0.1] md:hidden"
                    aria-hidden="true"
                  />
                )}

                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.14] bg-[#12131a] font-mono text-xs font-semibold tabular-nums text-white">
                  0{idx + 1}
                </div>

                <div className="md:mt-6">
                  <div className="font-mono text-xs text-zinc-500">{item.step}</div>
                  <h3 className="mt-1 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
