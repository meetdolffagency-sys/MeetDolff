import React from 'react';
import { PROBLEMS } from '../data/meetdolffContent';

export const ProblemSection: React.FC = () => {
  return (
    <section
      aria-labelledby="problem-heading"
      className="border-t border-white/[0.08] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-widest text-violet-400 uppercase">
            Why meetings fade
          </p>
          <h2
            id="problem-heading"
            className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Important conversations shouldn&apos;t disappear.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 divide-y divide-white/[0.08] border border-white/[0.08] bg-[#0d0e13] md:grid-cols-3 md:divide-x md:divide-y-0 rounded-xl">
          {PROBLEMS.map((problem) => (
            <div key={problem.index} className="p-7 sm:p-8">
              <span className="font-mono text-xs tabular-nums text-zinc-500">
                {problem.index}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-white">{problem.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-lg font-medium tracking-tight text-zinc-200 sm:text-xl">
          MeetDolff gives every meeting a searchable memory.
        </p>
      </div>
    </section>
  );
};
