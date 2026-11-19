import { useEffect, useState } from "react";

type RecState = "idle" | "recording" | "paused" | "stopped";

const LABEL: Record<RecState, string> = {
  idle: "Not recording",
  recording: "Recording",
  paused: "Paused",
  stopped: "Stopped and saved to memory",
};
const HELP: Record<RecState, string> = {
  idle: "Nothing is captured. The extension does nothing until you press Start.",
  recording: "Capture is on, and this indicator stays visible for as long as it is.",
  paused: "Capture is suspended. Nothing is recorded until you resume.",
  stopped: "Capture has ended. The meeting becomes a record you can review, export or delete.",
};

const fmt = (s: number) => [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60].map((n) => String(n).padStart(2, "0")).join(":");

export function RecordingStates({ className = "" }: { className?: string }) {
  const [state, setState] = useState<RecState>("idle");
  const [secs, setSecs] = useState(0);

  useEffect(() => {
    if (state !== "recording") return;
    const id = window.setInterval(() => setSecs((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [state]);

  const start = () => {
    setSecs(0);
    setState("recording");
  };

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="inline-flex items-center gap-3 text-[1.15rem] font-medium" role="status" aria-live="polite">
          <span
            aria-hidden
            className={`inline-block h-3 w-3 rounded-full ${state === "recording" ? "rec-dot bg-signal" : state === "paused" ? "bg-aluminium" : state === "stopped" ? "bg-chalk" : "border border-current"}`}
          />
          {LABEL[state]}
        </p>
        <p className="t-mono tabular-nums" aria-label={`Elapsed ${fmt(secs)}`}>{fmt(secs)}</p>
      </div>

      <div className="mt-5 flex h-16 items-center gap-[3px]" aria-hidden>
        {Array.from({ length: 40 }, (_, i) => {
          const h = 28 + Math.abs(Math.sin(i * 0.7) * 60) + (i % 5) * 4;
          return (
            <span
              key={i}
              className="block flex-1 origin-center rounded-full bg-current"
              style={{
                height: `${h}%`,
                opacity: state === "recording" ? 0.9 : 0.25,
                transform: state === "recording" ? undefined : "scaleY(0.35)",
                animation: state === "recording" ? `bar-live ${0.8 + (i % 7) * 0.12}s ease-in-out ${(i % 9) * 0.07}s infinite` : undefined,
              }}
            />
          );
        })}
      </div>

      <p className="t-body mt-4 min-h-[3.2rem] opacity-90">{HELP[state]}</p>

      <div className="mt-4 flex flex-wrap gap-3">
        {(state === "idle" || state === "stopped") && (
          <button type="button" className="btn btn-sm bg-signal text-obsidian hover:bg-chalk" onClick={start}>
            Start recording
          </button>
        )}
        {state === "recording" && (
          <button type="button" className="chip" onClick={() => setState("paused")}>
            Pause
          </button>
        )}
        {state === "paused" && (
          <button type="button" className="chip" onClick={() => setState("recording")}>
            Resume
          </button>
        )}
        {(state === "recording" || state === "paused") && (
          <button type="button" className="chip" onClick={() => setState("stopped")}>
            Stop
          </button>
        )}
        {state === "stopped" && (
          <button type="button" className="chip" onClick={() => { setSecs(0); setState("idle"); }}>
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
