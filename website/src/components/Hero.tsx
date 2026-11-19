import { lazy, Suspense, useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { DownloadButton } from "./DownloadButton";
import { hasWebGL, prefersReducedMotion, useIntroDone } from "@/intro";
import { IS_PUBLISHED } from "@/config";

const HeroScene = lazy(() => import("./HeroScene"));

/** Static, WebGL-free rendition of the same object (poster + fallback). */
function HeroFallback() {
  const rings = useMemo(() => {
    const out: { cx: number; rx: number; ry: number; o: number; sig: boolean }[] = [];
    const N = 40;
    for (let i = 0; i < N; i++) {
      const u = i / (N - 1);
      const env = 0.34 + 0.5 * Math.abs(Math.sin(u * 9.5 + 2.2) * Math.sin(u * 3.1 + 1.2)) + 0.12 * Math.abs(Math.sin(u * 23));
      const r = (0.55 + env * 1.55) * 62;
      out.push({ cx: 90 + u * 620, rx: 16 + r * 0.16, ry: r, o: u <= 0.62 ? 0.5 + 0.5 * (u / 0.62) : Math.max(0.08, 0.4 * (1 - (u - 0.62) / 0.38)), sig: i === Math.round(0.62 * (N - 1)) });
    }
    return out;
  }, []);
  return (
    <svg viewBox="0 0 800 400" className="h-full w-full" role="img" aria-label="A stylised waveform made of concentric rings" preserveAspectRatio="xMidYMid meet" data-testid="hero-fallback">
      {rings.map((r, i) => (
        <ellipse key={i} cx={r.cx} cy="200" rx={r.rx} ry={r.ry} fill="none" stroke={r.sig ? "#d39a68" : "#fff"} strokeOpacity={r.o} strokeWidth={r.sig ? 1.6 : 1} />
      ))}
    </svg>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const introDone = useIntroDone();
  const [webgl] = useState(() => hasWebGL());
  const [reduced] = useState(() => prefersReducedMotion());
  const [sceneReady, setSceneReady] = useState(false);
  const ready = useCallback(() => setSceneReady(true), []);
  const played = useRef(false);

  // One choreographed entrance: visual → headline → copy → actions. Never blocks input.
  useLayoutEffect(() => {
    if (reduced || !introDone || played.current) return;
    played.current = true;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".h-visual", { opacity: 0, scale: 1.06, duration: 1, ease: "power2.out" }, 0)
        .from(".h-line", { yPercent: 110, duration: 0.8, stagger: 0.12 }, 0.2)
        .from(".h-copy", { opacity: 0, y: 14, duration: 0.6 }, 0.6)
        .from(".h-act", { opacity: 0, y: 12, duration: 0.5, stagger: 0.08 }, 0.75);
    }, root);
    return () => ctx.revert();
  }, [introDone, reduced]);

  return (
    <section ref={root} className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-obsidian pt-16" aria-labelledby="hero-title">
      <div className="h-visual pointer-events-none absolute inset-x-0 top-16 -z-10 h-[52svh] md:inset-y-0 md:left-[24%] md:h-auto md:pt-16" aria-hidden={webgl ? undefined : false}>
        {/* poster/fallback sits underneath and fades once WebGL paints */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${webgl && sceneReady ? "opacity-0" : "opacity-100"}`}>
          <HeroFallback />
        </div>
        {webgl && introDone && (
          <Suspense fallback={null}>
            <HeroScene reduced={reduced} onReady={ready} />
          </Suspense>
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,9,10,0)_40%,rgba(8,9,10,0.88)_74%,#08090a_100%)] md:bg-[linear-gradient(90deg,#08090a_6%,rgba(8,9,10,0.55)_38%,rgba(8,9,10,0)_62%)]" />

      <div className="wrap pb-14 pt-[44svh] md:pb-20 md:pt-32">
        <h1 id="hero-title" className="t-display max-w-[14ch] md:max-w-[11ch] lg:max-w-[12ch]">
          <span className="block overflow-hidden pb-[0.08em]"><span className="h-line block">Meetings end.</span></span>
          <span className="block overflow-hidden pb-[0.1em] text-aluminium"><span className="h-line block">The memory doesn't.</span></span>
        </h1>
        <p className="h-copy t-lead mt-6 text-chalk/90">Turn conversations into searchable knowledge that stays connected to your projects.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <div className="h-act"><DownloadButton size="lg" className="w-full sm:w-auto" /></div>
          <div className="h-act">
            <Link to="/memory" className="btn btn-ghost btn-lg w-full sm:w-auto">Explore the memory engine</Link>
          </div>
        </div>
        <p className="h-act t-mono muted-dark mt-5 max-w-md">
          {IS_PUBLISHED ? "Opens the Chrome Web Store listing." : "Chrome Web Store listing: not published yet. The download page shows current release status."}
        </p>
      </div>
    </section>
  );
}
