import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Wordmark } from "./Logo";
import { DownloadButton } from "./DownloadButton";

export const NAV_LINKS = [
  { to: "/product", label: "Product" },
  { to: "/memory", label: "Memory" },
  { to: "/privacy", label: "Privacy" },
  { to: "/developers", label: "Developers" },
  { to: "/changelog", label: "Changelog" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [loc.pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () => Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a,button") ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab") {
        const f = focusables();
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-3.5 py-2 text-[0.95rem] transition-colors hover:text-chalk ${isActive ? "text-chalk" : "text-aluminium"}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-obsidian/95">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-chalk focus:px-4 focus:py-2 focus:text-obsidian">
        Skip to content
      </a>
      <div className="wrap flex h-16 items-center justify-between">
        <Link to="/" aria-label="MeetDolff home" className="text-chalk">
          <Wordmark />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkCls}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <DownloadButton size="sm" className="hidden sm:inline-flex" />
          <button
            ref={toggleRef}
            type="button"
            className="btn btn-ghost btn-sm lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-obsidian lg:hidden"
        >
          <nav aria-label="Mobile" className="wrap flex flex-col py-6">
            {[{ to: "/", label: "Home" }, ...NAV_LINKS].map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `border-b border-white/10 py-4 text-[1.6rem] tracking-[-0.02em] ${isActive ? "text-chalk" : "text-aluminium"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <DownloadButton size="lg" className="mt-8 w-full" />
          </nav>
        </div>
      )}
    </header>
  );
}
