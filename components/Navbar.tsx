import React, { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { LOGO_PATH, REPO_URL } from '../data/meetdolffContent';

const NAV_LINKS = [
  { label: 'Features', href: '#features', external: false },
  { label: 'How it works', href: '#how-it-works', external: false },
  { label: 'Privacy', href: '#privacy', external: false },
  { label: 'Quick Start', href: '#quick-start', external: false },
  { label: 'Documentation', href: REPO_URL, external: true },
];

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#09090b]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="inline-flex shrink-0 items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
          aria-label="MeetDolff home"
        >
          <img
            src={LOGO_PATH}
            alt="MeetDolff"
            referrerPolicy="no-referrer"
            className="h-9 w-auto rounded-md bg-white px-2 py-0.5 object-contain"
          />
        </a>

        <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-sm font-medium text-zinc-300 transition-colors duration-150 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true" />
              </a>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="shrink-0 whitespace-nowrap text-sm font-medium text-zinc-300 transition-colors duration-150 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500"
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg bg-white px-4 py-2 text-xs font-semibold text-zinc-950 transition-colors duration-150 hover:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 md:inline-flex"
          >
            <span>Get MeetDolff</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/[0.1] bg-zinc-900/70 text-zinc-200 transition-colors hover:bg-zinc-800 hover:text-white focus-visible:outline-2 focus-visible:outline-violet-500 md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          className="border-t border-white/[0.08] bg-[#09090b] px-4 py-5 md:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                onClick={handleLinkClick}
                className="flex min-h-[44px] items-center justify-between rounded-lg px-3 text-base font-medium text-zinc-200 transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                <span>{item.label}</span>
                {item.external && (
                  <ArrowUpRight className="h-4 w-4 text-zinc-400" aria-hidden="true" />
                )}
              </a>
            ))}
            <div className="pt-3">
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
              >
                <span>Get MeetDolff</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
