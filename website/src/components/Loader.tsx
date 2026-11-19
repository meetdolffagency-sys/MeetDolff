import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { DOLFF_BODY, DOLFF_FINS } from "./Logo";

/** Signal → Memory intro. ~1.2s, skippable, only once per session, never fakes progress. */
function wavePath(): string {
  const pts: string[] = [];
  for (let x = 0; x <= 1000; x += 8) {
    const env = Math.sin((x / 1000) * Math.PI);
    const y = 300 + Math.sin(x * 0.09) * 70 * env * Math.sin(x * 0.021 + 1) + Math.sin(x * 0.33) * 14 * env;
    pts.push(`${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}
const WAVE = wavePath();
// A fixed-length intro must not be stretched by main-thread stalls.
gsap.ticker.lagSmoothing(0);
const POINTS = [
  [190, 262], [270, 340], [350, 250], [655, 346], [735, 258], [815, 330], [500, 190], [500, 412],
];
const ARCHIVE = ["00:00:42", "00:04:10", "00:09:37", "00:14:05"];

interface Props {
  onReveal: () => void;
  onDone: () => void;
}

export default function Loader({ onReveal, onDone }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const finished = useRef(false);

  const finish = (fast: boolean) => {
    if (finished.current) return;
    finished.current = true;
    tl.current?.kill();
    onReveal();
    gsap.to(root.current, {
      yPercent: -100,
      duration: fast ? 0.25 : 0.4,
      ease: "power3.inOut",
      onComplete: onDone,
    });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const t = gsap.timeline({ onComplete: () => finish(false) });
      tl.current = t;
      t.fromTo(".l-wave", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.3, ease: "power2.out" }, 0)
        .fromTo(".l-ring", { opacity: 0, scale: 0.6, transformOrigin: "500px 300px" }, { opacity: 0.55, scale: 1, duration: 0.3, stagger: 0.04, ease: "power2.out" }, 0.15)
        .fromTo(".l-pt", { opacity: 0, scale: 0, transformOrigin: "center" }, { opacity: 1, scale: 1, duration: 0.2, stagger: 0.02 }, 0.25)
        .to(".l-wave", { opacity: 0.12, duration: 0.2 }, 0.4)
        .fromTo(".l-mark-line", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.3, ease: "power2.inOut" }, 0.32)
        .to(".l-mark-fill", { opacity: 1, duration: 0.15 }, 0.55)
        .fromTo(".l-lens", { opacity: 0, scale: 0.4, transformOrigin: "86px 40px" }, { opacity: 1, scale: 1, duration: 0.18, ease: "back.out(2)" }, 0.55)
        .to(".l-ring,.l-pt", { opacity: 0, duration: 0.2 }, 0.62)
        .fromTo(".l-arch", { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.2, stagger: 0.04 }, 0.6)
        .fromTo(".l-word", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" }, 0.72)
        .to({}, { duration: 0.12 });
    }, root);
    // Failsafe: never trap a visitor.
    const failsafe = window.setTimeout(() => finish(true), 3000);
    return () => {
      window.clearTimeout(failsafe);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={root}
      role="dialog"
      aria-label="MeetDolff intro animation"
      className="fixed inset-0 z-[100] bg-obsidian text-chalk"
      data-testid="loader"
    >
      <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {[60, 100, 140, 190].map((r) => (
          <circle key={r} className="l-ring" cx="500" cy="300" r={r} fill="none" stroke="#b7bec3" strokeWidth="1" style={{ opacity: 0 }} />
        ))}
        {POINTS.map(([x, y]) => (
          <circle key={`${x}-${y}`} className="l-pt" cx={x} cy={y} r="3" fill="#d39a68" style={{ opacity: 0 }} />
        ))}
        <path className="l-wave" d={WAVE} pathLength={1} fill="none" stroke="#fff" strokeWidth="1.5" strokeDasharray="1" strokeDashoffset="1" />
        <g transform="translate(416 238) scale(1.4)">
          <g fill="none" stroke="#fff" strokeWidth="1.4">
            <path d={DOLFF_BODY} pathLength={1} strokeDasharray="1" strokeDashoffset="1" className="l-mark-line" />
          </g>
          <g className="l-mark-fill" fill="#fff" style={{ opacity: 0 }}>
            <path d={DOLFF_BODY} />
            {DOLFF_FINS.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
          <g className="l-lens" style={{ opacity: 0 }}>
            <circle cx="86" cy="40" r="7.5" fill="none" stroke="#08090a" strokeWidth="2.6" />
            <path d="M78.5 39 63 34M93.5 40.5 99 42" fill="none" stroke="#08090a" strokeWidth="2.6" strokeLinecap="round" />
            <circle cx="86" cy="40" r="2" fill="#d39a68" />
          </g>
        </g>
        {ARCHIVE.map((ts, i) => (
          <g key={ts} className="l-arch" style={{ opacity: 0 }}>
            <line x1="120" x2="300" y1={250 + i * 28} y2={250 + i * 28} stroke="#b7bec3" strokeOpacity="0.5" />
            <text x="120" y={242 + i * 28} fill="#b7bec3" fontSize="11" fontFamily="IBM Plex Mono, monospace">{ts}</text>
            <line x1="700" x2={880 - i * 24} y1={250 + i * 28} y2={250 + i * 28} stroke="#b7bec3" strokeOpacity="0.5" />
          </g>
        ))}
      </svg>
      <div className="l-word absolute inset-x-0 bottom-[22%] text-center text-[1.6rem] font-medium tracking-[-0.03em]" style={{ opacity: 0 }}>
        MeetDolff
      </div>
      <button type="button" onClick={() => finish(true)} className="btn btn-ghost btn-sm absolute right-5 top-5">
        Skip intro
      </button>
    </div>
  );
}

export const LOADER_KEY = "meetdolff:intro-seen";
