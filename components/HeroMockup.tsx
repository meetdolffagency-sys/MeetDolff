import React, { useEffect, useState } from 'react';
import { Pause, Play, RotateCcw, Search, Square } from 'lucide-react';
import { HERO_QA_PRESETS, HERO_TRANSCRIPT } from '../data/meetdolffContent';

function formatTimer(totalSeconds: number): string {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  return [hrs, mins, secs].map((v) => String(v).padStart(2, '0')).join(':');
}

export const HeroMockup: React.FC = () => {
  const [recordState, setRecordState] = useState<'recording' | 'paused' | 'stopped'>('recording');
  const [elapsedSeconds, setElapsedSeconds] = useState(1458); // 00:24:18
  const [selectedQaId, setSelectedQaId] = useState<string>(HERO_QA_PRESETS[0].id);
  const [highlightedSegId, setHighlightedSegId] = useState<string | null>('seg-2');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (recordState !== 'recording') return;
    const timer = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [recordState]);

  const activeQa = HERO_QA_PRESETS.find((item) => item.id === selectedQaId) || HERO_QA_PRESETS[0];

  const handleSelectQa = (qaId: string) => {
    setSelectedQaId(qaId);
    const found = HERO_QA_PRESETS.find((item) => item.id === qaId);
    setHighlightedSegId(found?.segmentId ?? null);
  };

  const filteredTranscript = searchTerm.trim()
    ? HERO_TRANSCRIPT.filter((seg) =>
        seg.text.toLowerCase().includes(searchTerm.trim().toLowerCase())
      )
    : HERO_TRANSCRIPT;

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-white/[0.1] bg-[#111218] shadow-2xl shadow-black/60"
      aria-label="MeetDolff Chrome extension product interface preview"
    >
      {/* Window / Side Panel Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] bg-[#15161f] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2">
            {recordState === 'recording' ? (
              <span className="inline-flex items-center gap-1.5 rounded bg-red-500/15 px-2 py-0.5 font-mono text-[11px] font-medium tracking-wider text-red-400">
                <span className="h-2 w-2 rounded-full bg-red-500" aria-hidden="true" />
                REC
              </span>
            ) : recordState === 'paused' ? (
              <span className="inline-flex items-center gap-1.5 rounded bg-amber-500/15 px-2 py-0.5 font-mono text-[11px] font-medium tracking-wider text-amber-300">
                PAUSED
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded bg-zinc-700/40 px-2 py-0.5 font-mono text-[11px] font-medium tracking-wider text-zinc-300">
                SAVED
              </span>
            )}
            <span className="font-mono text-xs tabular-nums text-zinc-200">
              {formatTimer(elapsedSeconds)}
            </span>
          </div>
          <span className="text-xs text-zinc-500" aria-hidden="true">
            ·
          </span>
          <span className="truncate text-xs font-medium text-zinc-300">
            Sample: Architecture Review
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {recordState === 'stopped' ? (
            <button
              type="button"
              onClick={() => {
                setElapsedSeconds(1458);
                setRecordState('recording');
              }}
              className="inline-flex min-h-[32px] items-center gap-1.5 rounded-md border border-white/[0.1] bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-zinc-200 transition-colors hover:bg-white/[0.08]"
            >
              <RotateCcw className="h-3 w-3" aria-hidden="true" />
              <span>Resume Preview</span>
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() =>
                  setRecordState((prev) => (prev === 'recording' ? 'paused' : 'recording'))
                }
                aria-label={recordState === 'recording' ? 'Pause recording' : 'Resume recording'}
                className="inline-flex min-h-[32px] items-center gap-1 rounded-md border border-white/[0.1] bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-zinc-200 transition-colors hover:bg-white/[0.08]"
              >
                {recordState === 'recording' ? (
                  <>
                    <Pause className="h-3 w-3" aria-hidden="true" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3 w-3" aria-hidden="true" />
                    <span>Resume</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setRecordState('stopped')}
                aria-label="Stop recording"
                className="inline-flex min-h-[32px] items-center gap-1 rounded-md border border-red-500/25 bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-300 transition-colors hover:bg-red-500/20"
              >
                <Square className="h-3 w-3" aria-hidden="true" />
                <span>Stop</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Sub-header metadata line */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] bg-[#0e0f15] px-4 py-2 text-xs text-zinc-400">
        <span>Capture: Chrome tabCapture + Mic · Local IndexedDB</span>
        <span className="font-mono text-[11px] text-zinc-500">Fictional sample data</span>
      </div>

      {/* Timestamped Transcript */}
      <div className="border-b border-white/[0.08] px-4 py-3.5">
        <div className="mb-2.5 flex items-center justify-between gap-3">
          <span className="text-xs font-semibold tracking-wide text-zinc-300">
            Timestamped Transcript
          </span>
          <div className="relative w-44">
            <Search
              className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-500"
              aria-hidden="true"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter transcript..."
              aria-label="Filter sample transcript"
              className="w-full rounded-md border border-white/[0.08] bg-zinc-950/70 py-1 pl-7 pr-2.5 text-xs text-zinc-200 placeholder:text-zinc-500 focus:border-violet-500/60 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          {filteredTranscript.length === 0 ? (
            <p className="py-3 text-xs text-zinc-500">
              No transcript lines match &ldquo;{searchTerm}&rdquo;.
            </p>
          ) : (
            filteredTranscript.map((segment) => {
              const isHighlighted = highlightedSegId === segment.id;
              return (
                <button
                  key={segment.id}
                  type="button"
                  onClick={() => setHighlightedSegId(segment.id)}
                  className={`flex w-full items-start gap-3 rounded-lg px-2.5 py-2 text-left transition-colors ${
                    isHighlighted
                      ? 'bg-violet-500/12 text-zinc-100 ring-1 ring-violet-500/35'
                      : 'text-zinc-300 hover:bg-white/[0.03]'
                  }`}
                >
                  <span className="shrink-0 pt-0.5 font-mono text-[11px] tabular-nums text-blue-400">
                    {segment.timestamp}
                  </span>
                  <span className="text-xs leading-relaxed">{segment.text}</span>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* AI Q&A Panel + Cited Search Result */}
      <div className="bg-[#0d0e13] px-4 py-3.5">
        <div className="mb-2.5 flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-zinc-200">
            Memory Q&amp;A (BYOK Provider)
          </span>
          <span className="text-[11px] text-zinc-400">Grounded citations only</span>
        </div>

        <div className="mb-3 flex flex-wrap gap-1.5">
          {HERO_QA_PRESETS.map((qa) => {
            const active = qa.id === activeQa.id;
            return (
              <button
                key={qa.id}
                type="button"
                onClick={() => handleSelectQa(qa.id)}
                className={`rounded-md px-2.5 py-1 text-left text-[11px] font-medium transition-colors ${
                  active
                    ? 'bg-violet-500/20 text-violet-200 ring-1 ring-violet-500/40'
                    : 'bg-white/[0.04] text-zinc-400 hover:bg-white/[0.08] hover:text-zinc-200'
                }`}
              >
                {qa.question}
              </button>
            );
          })}
        </div>

        <div className="rounded-lg border border-white/[0.08] bg-zinc-950/70 p-3">
          <p className="text-xs leading-relaxed text-zinc-200">{activeQa.answer}</p>
          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] pt-2">
            <div className="flex items-center gap-2 text-[11px] text-zinc-400">
              <span>Source:</span>
              <span className="font-medium text-zinc-200">{activeQa.citationMeeting}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums text-blue-400">
                {activeQa.citationTimestamp}
              </span>
            </div>
            {activeQa.segmentId && (
              <button
                type="button"
                onClick={() => setHighlightedSegId(activeQa.segmentId ?? null)}
                className="text-[11px] font-medium text-violet-300 transition-colors hover:text-violet-200"
              >
                Jump to timestamp
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
