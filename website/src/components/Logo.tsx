/** Dolff — the MeetDolff mark. A dolphin in profile, wearing spectacles. */
export const DOLFF_BODY =
  "M10 70C12 42 38 20 68 22c12 1 22 6 28 14l16 5c3 2 2 6-2 7l-12 2C92 66 76 78 56 80 40 82 24 80 10 70Z";
export const DOLFF_FINS = [
  "M50 24C54 12 64 8 72 10c-6 4-8 10-6 13Z",
  "M12 69C6 66 3 60 4 54c5 4 10 6 14 8Z",
  "M12 72c-6 4-8 10-6 15 4-4 9-7 13-10Z",
];

interface MarkProps {
  className?: string;
  title?: string;
}

export function DolffMark({ className = "h-8 w-auto", title }: MarkProps) {
  return (
    <svg
      viewBox="0 0 120 100"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <g fill="currentColor">
        <path d={DOLFF_BODY} />
        {DOLFF_FINS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g fill="none" stroke="var(--mark-lens, #08090a)" strokeWidth="2.6" strokeLinecap="round">
        <circle cx="86" cy="40" r="7.5" />
        <path d="M78.5 39 63 34M93.5 40.5 99 42" />
      </g>
      <circle cx="86" cy="40" r="2" fill="var(--color-signal)" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <DolffMark className="h-7 w-auto" />
      <span className="text-[1.2rem] font-medium tracking-[-0.03em]">MeetDolff</span>
    </span>
  );
}
