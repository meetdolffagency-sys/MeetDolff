import React from 'react';
import { COMPANION_DOCS_URL } from '../data/meetdolffContent';
import { DashboardShowcase } from './DashboardShowcase';
import { ArrowUpRight } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="border-t border-white/[0.08] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-medium tracking-widest text-violet-400 uppercase">
            Verified v0.1.0 Capabilities
          </p>
          <h2
            id="features-heading"
            className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Everything your meetings leave behind. Organized.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            Designed around explicit user consent, local IndexedDB persistence, and
            provider-independent AI—without locking your conversations inside a proprietary cloud.
          </p>
        </div>

        {/* Asymmetric Bento Grid: Features 1-6 */}
        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Feature 1: Explicit Meeting Recording (Wide) */}
          <div className="rounded-xl border border-white/[0.08] bg-[#101118] p-7 lg:col-span-7">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-xs text-zinc-500">01 · Recording</span>
              <span className="text-xs text-zinc-400">User-initiated only</span>
            </div>
            <h3 className="mt-3 text-xl font-semibold text-white">
              Explicit Meeting Recording
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
              Recording begins only after explicit user action—never silently or automatically.
              Capture Chrome tab audio via <code className="font-mono text-zinc-200">tabCapture</code>,
              microphone audio, or both where supported.
            </p>
            <div className="mt-5 grid grid-cols-1 gap-3 border-t border-white/[0.07] pt-5 text-xs text-zinc-300 sm:grid-cols-2">
              <div>Visible REC indicator &amp; live recording timer</div>
              <div>Pause, resume, and stop controls</div>
              <div>Active recovery states during interruptions</div>
              <div>Local recording recovery chunks in IndexedDB</div>
            </div>
          </div>

          {/* Feature 2: Intelligent Transcription */}
          <div className="rounded-xl border border-white/[0.08] bg-[#101118] p-7 lg:col-span-5">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-xs text-zinc-500">02 · Transcription</span>
              <span className="text-xs text-zinc-400">Side panel workflow</span>
            </div>
            <h3 className="mt-3 text-xl font-semibold text-white">
              Intelligent Transcription
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
              Use the Web Speech API for live microphone transcription, or run a Cloud
              Whisper-compatible adapter on recorded audio via the{' '}
              <span className="text-zinc-200">Transcribe latest</span> side panel workflow and
              optional post-stop processing.
            </p>
            <p className="mt-4 rounded-lg border border-white/[0.07] bg-zinc-950/60 px-3.5 py-2.5 text-xs leading-relaxed text-zinc-400">
              Transparency note: Basic transcription in v0.1.0 produces sequential timestamped
              transcripts and does not provide real speaker diarization.
            </p>
          </div>

          {/* Feature 3: Persistent Meeting Memory */}
          <div className="rounded-xl border border-white/[0.08] bg-[#101118] p-7 lg:col-span-5">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-xs text-zinc-500">03 · Persistence</span>
              <span className="text-xs text-zinc-400">Markdown &amp; JSON</span>
            </div>
            <h3 className="mt-3 text-xl font-semibold text-white">
              Persistent Meeting Memory
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
              Store structured meeting records—history, transcripts, summaries, decisions, and
              action items—directly in IndexedDB. Export and re-import portable Markdown and JSON
              archives using the File System Access API where supported, with automatic download
              fallback.
            </p>
          </div>

          {/* Feature 4: Powerful Offline Search */}
          <div className="rounded-xl border border-white/[0.08] bg-[#101118] p-7 lg:col-span-7">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-xs text-zinc-500">04 · Search</span>
              <span className="text-xs text-zinc-400">Zero vector DB required</span>
            </div>
            <h3 className="mt-3 text-xl font-semibold text-white">
              Powerful Offline Search
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
              Run deterministic full-text search across every saved transcript, summary, decision,
              and action item. Filter results by date and topic completely locally—without
              requiring a cloud vector database.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/[0.07] pt-4 text-xs text-zinc-300">
              <span>Transcripts</span>
              <span>Summaries</span>
              <span>Decisions</span>
              <span>Action items</span>
              <span>Date &amp; topic filters</span>
            </div>
          </div>

          {/* Feature 5: AI Meeting Intelligence (BYOK) (Wide) */}
          <div className="rounded-xl border border-white/[0.08] bg-[#101118] p-7 lg:col-span-7">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-xs text-zinc-500">05 · Bring Your Own Key</span>
              <span className="text-xs text-zinc-400">Provider-independent</span>
            </div>
            <h3 className="mt-3 text-xl font-semibold text-white">
              AI Meeting Intelligence
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
              Connect your own API credentials—or run local Ollama-compatible endpoints. Generate
              AI summaries, extract decisions and action items, and ask cross-meeting questions
              with grounded meeting and timestamp citations. When evidence is missing, MeetDolff
              responds honestly with &ldquo;not in memory.&rdquo;
            </p>
            <div className="mt-5 border-t border-white/[0.07] pt-4 text-xs text-zinc-300">
              <span className="text-zinc-500">Supported providers: </span>
              <span>
                OpenAI · OpenAI-compatible APIs · Groq · Together · Local Ollama-compatible ·
                Anthropic · Google Gemini
              </span>
            </div>
          </div>

          {/* Feature 6: Optional Web Search */}
          <div className="rounded-xl border border-white/[0.08] bg-[#101118] p-7 lg:col-span-5">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-xs text-zinc-500">06 · External Context</span>
              <span className="text-xs text-zinc-400">Independently configured</span>
            </div>
            <h3 className="mt-3 text-xl font-semibold text-white">
              Optional Web Search
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
              Independently enable Tavily or Brave Search when you want outside reference context.
              External web search results are kept strictly separate from your local meeting memory,
              with external URLs displayed distinctly.
            </p>
          </div>
        </div>

        {/* Feature 7: Interactive Meeting Dashboard Mockup */}
        <div className="mt-10">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-zinc-500">07 · Workspace</span>
              <h3 className="mt-1 text-2xl font-semibold text-white">
                Meeting Dashboard
              </h3>
              <p className="mt-1 text-sm text-zinc-400">
                Inspect meeting history, timestamped transcripts, audio playback, color-coded
                calendar dates, linked meetings, reviewable project plans, and search in one place.
              </p>
            </div>
          </div>
          <DashboardShowcase />
        </div>

        {/* Features 8, 9, 10 */}
        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Feature 8: Meeting to Project */}
          <div className="rounded-xl border border-white/[0.08] bg-[#101118] p-7">
            <span className="font-mono text-xs text-zinc-500">08 · Execution</span>
            <h3 className="mt-3 text-lg font-semibold text-white">Meeting to Project</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
              Transform meeting discussions into structured Objectives, Tasks, Milestones, and
              Risks. Generated project plans remain reviewable drafts and require explicit user
              approval before being treated as approved.
            </p>
          </div>

          {/* Feature 9: AI-Generated Artifacts */}
          <div className="rounded-xl border border-white/[0.08] bg-[#101118] p-7">
            <span className="font-mono text-xs text-zinc-500">09 · Artifacts</span>
            <h3 className="mt-3 text-lg font-semibold text-white">AI-Generated Artifacts</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
              Produce Reports, Flashcards, Quizzes, Mermaid mind maps, and Infographic text from
              saved meeting memory using deterministic templates rather than ungrounded fabrication.
            </p>
          </div>

          {/* Feature 10: MCP-Ready Architecture */}
          <div className="rounded-xl border border-white/[0.08] bg-[#101118] p-7">
            <span className="font-mono text-xs text-zinc-500">10 · Local Companion</span>
            <h3 className="mt-3 text-lg font-semibold text-white">MCP-Ready Architecture</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
              Let external AI agents read exported meeting memory through a token-authenticated
              local companion with narrow tool schemas, read-only defaults, and explicit write
              approvals. The Chrome extension itself never hosts a public MCP server.
            </p>
            <a
              href={COMPANION_DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-blue-400 transition-colors hover:text-blue-300"
            >
              <span>Read companion architecture docs</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
