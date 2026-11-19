import React, { useEffect, useMemo, useState } from 'react';
import {
  Calendar as CalendarIcon,
  Check,
  FileText,
  Link2,
  Pause,
  Play,
  Search,
} from 'lucide-react';
import {
  SAMPLE_ARTIFACTS,
  SAMPLE_MEETINGS,
  SAMPLE_PROJECT_PLAN,
} from '../data/meetdolffContent';

function formatSeconds(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export const DashboardShowcase: React.FC = () => {
  const [selectedMeetingId, setSelectedMeetingId] = useState<string>(SAMPLE_MEETINGS[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [topicFilter, setTopicFilter] = useState<string>('All');
  const [activeView, setActiveView] = useState<'details' | 'plan' | 'artifacts'>('details');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playheadSec, setPlayheadSec] = useState(252);
  const [planApproved, setPlanApproved] = useState(false);
  const [activeArtifactId, setActiveArtifactId] = useState<string>(SAMPLE_ARTIFACTS[0].id);

  const topics = ['All', 'Architecture', 'Retrieval', 'Companion'];

  const filteredMeetings = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return SAMPLE_MEETINGS.filter((m) => {
      const matchesTopic = topicFilter === 'All' || m.topic === topicFilter;
      if (!matchesTopic) return false;
      if (!q) return true;
      const haystack = [
        m.title,
        m.summary,
        m.topic,
        ...m.decisions,
        ...m.actionItems,
        ...m.transcript.map((t) => t.text),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [searchQuery, topicFilter]);

  const activeMeeting =
    SAMPLE_MEETINGS.find((m) => m.id === selectedMeetingId) || SAMPLE_MEETINGS[0];

  useEffect(() => {
    if (!isPlayingAudio) return;
    const interval = window.setInterval(() => {
      setPlayheadSec((prev) => {
        if (prev >= activeMeeting.durationSeconds) {
          setIsPlayingAudio(false);
          return activeMeeting.durationSeconds;
        }
        return prev + 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isPlayingAudio, activeMeeting.durationSeconds]);

  const linkedMeetings = SAMPLE_MEETINGS.filter((m) =>
    activeMeeting.linkedMeetingIds.includes(m.id)
  );

  const activeArtifact =
    SAMPLE_ARTIFACTS.find((a) => a.id === activeArtifactId) || SAMPLE_ARTIFACTS[0];

  const handleSelectMeeting = (id: string) => {
    setSelectedMeetingId(id);
    setIsPlayingAudio(false);
    const target = SAMPLE_MEETINGS.find((m) => m.id === id);
    if (target && target.transcript[0]) {
      setPlayheadSec(target.transcript[0].seconds);
    }
  };

  // Sample November calendar grid (days 10 to 23)
  const calendarDays = Array.from({ length: 14 }, (_, i) => i + 10);

  return (
    <div
      id="dashboard-preview"
      className="overflow-hidden rounded-xl border border-white/[0.1] bg-[#0e0f15]"
    >
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] bg-[#13141c] px-5 py-3.5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-display text-sm font-semibold text-white">
            Meeting Memory Dashboard
          </span>
          <span className="text-xs text-zinc-500" aria-hidden="true">
            ·
          </span>
          <span className="text-xs text-zinc-400">
            IndexedDB Store (Fictional Sample Workspace)
          </span>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-white/[0.08] bg-zinc-950/70 p-1">
          {[
            { id: 'details', label: 'Meeting Details' },
            { id: 'plan', label: 'Project Plan Review' },
            { id: 'artifacts', label: 'Artifacts' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveView(tab.id as 'details' | 'plan' | 'artifacts')}
              className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                activeView === tab.id
                  ? 'bg-violet-500/20 text-white'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Sidebar: Search, History, Color-Coded Calendar */}
        <div className="border-b border-white/[0.08] bg-[#101118] lg:col-span-4 lg:border-b-0 lg:border-r">
          {/* Search & Topic Filter */}
          <div className="border-b border-white/[0.08] p-4">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-500"
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search transcripts, decisions, actions..."
                aria-label="Search sample meeting history"
                className="w-full rounded-lg border border-white/[0.08] bg-zinc-950/80 py-2 pl-8 pr-3 text-xs text-zinc-100 placeholder:text-zinc-500 focus:border-violet-500/60 focus:outline-none"
              />
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1">
              {topics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setTopicFilter(topic)}
                  className={`rounded px-2 py-1 text-[11px] font-medium transition-colors ${
                    topicFilter === topic
                      ? 'bg-white/[0.12] text-white'
                      : 'text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-200'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Meeting History List */}
          <div className="border-b border-white/[0.08] p-4">
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-300">Meeting History</span>
              <span className="font-mono text-[11px] tabular-nums text-zinc-500">
                {filteredMeetings.length} records
              </span>
            </div>
            <div className="space-y-1.5">
              {filteredMeetings.length === 0 ? (
                <p className="py-4 text-xs text-zinc-500">
                  No matching meetings in sample memory.
                </p>
              ) : (
                filteredMeetings.map((meeting) => {
                  const selected = meeting.id === activeMeeting.id;
                  return (
                    <button
                      key={meeting.id}
                      type="button"
                      onClick={() => handleSelectMeeting(meeting.id)}
                      className={`w-full rounded-lg px-3 py-2.5 text-left transition-colors ${
                        selected
                          ? 'bg-white/[0.07] ring-1 ring-white/[0.12]'
                          : 'hover:bg-white/[0.03]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-xs font-medium text-white">
                          {meeting.title}
                        </span>
                        <span className="shrink-0 font-mono text-[11px] tabular-nums text-zinc-400">
                          {meeting.duration}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-zinc-400">
                        <span
                          className={`inline-block h-1.5 w-1.5 rounded-full ${meeting.colorClass}`}
                          aria-hidden="true"
                        />
                        <span>{meeting.topic}</span>
                        <span aria-hidden="true">·</span>
                        <span>{meeting.dateLabel}</span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Color-Coded Calendar */}
          <div className="p-4">
            <div className="mb-2.5 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1.5 font-semibold text-zinc-300">
                <CalendarIcon className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true" />
                <span>November 2026</span>
              </span>
              <span className="text-[11px] text-zinc-500">Topic color-coded</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {calendarDays.map((day) => {
                const meetingOnDay = SAMPLE_MEETINGS.find((m) => m.calendarDay === day);
                const isSelectedDay = meetingOnDay?.id === activeMeeting.id;
                return (
                  <button
                    key={day}
                    type="button"
                    disabled={!meetingOnDay}
                    onClick={() => meetingOnDay && handleSelectMeeting(meetingOnDay.id)}
                    aria-label={
                      meetingOnDay
                        ? `November ${day}: ${meetingOnDay.title}`
                        : `November ${day}: No recorded meeting`
                    }
                    className={`flex flex-col items-center justify-center rounded py-1.5 font-mono text-[11px] tabular-nums transition-colors ${
                      isSelectedDay
                        ? 'bg-violet-500/25 text-white ring-1 ring-violet-400/50'
                        : meetingOnDay
                        ? 'bg-white/[0.04] text-zinc-200 hover:bg-white/[0.09]'
                        : 'text-zinc-600'
                    }`}
                  >
                    <span>{day}</span>
                    <span
                      className={`mt-1 h-1 w-3 rounded-full ${
                        meetingOnDay ? meetingOnDay.colorClass : 'bg-transparent'
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Detail Viewport */}
        <div className="p-5 sm:p-6 lg:col-span-8">
          {activeView === 'details' && (
            <div className="space-y-6">
              {/* Meeting Header & Audio Playback */}
              <div className="flex flex-col justify-between gap-4 border-b border-white/[0.08] pb-5 sm:flex-row sm:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                    <span>{activeMeeting.dateLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeMeeting.topic}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{activeMeeting.duration}</span>
                  </div>
                  <h3 className="mt-1.5 text-lg font-semibold text-white">
                    {activeMeeting.title}
                  </h3>
                </div>

                {/* Audio Playback Control */}
                <div className="flex items-center gap-3 rounded-lg border border-white/[0.08] bg-zinc-950/70 px-3 py-2">
                  <button
                    type="button"
                    onClick={() => setIsPlayingAudio((p) => !p)}
                    aria-label={isPlayingAudio ? 'Pause sample audio' : 'Play sample audio'}
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white text-zinc-950 transition-colors hover:bg-zinc-200"
                  >
                    {isPlayingAudio ? (
                      <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <Play className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                  </button>
                  <div className="min-w-[130px]">
                    <div className="flex items-center justify-between font-mono text-[10px] tabular-nums text-zinc-400">
                      <span>{formatSeconds(playheadSec)}</span>
                      <span>{activeMeeting.duration}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={activeMeeting.durationSeconds}
                      value={playheadSec}
                      onChange={(e) => setPlayheadSec(Number(e.target.value))}
                      aria-label="Audio playback position"
                      className="mt-1 h-1 w-full cursor-pointer accent-violet-500"
                    />
                  </div>
                </div>
              </div>

              {/* Summary, Decisions & Action Items */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="text-xs font-semibold tracking-wide text-zinc-300 uppercase">
                    AI Summary &amp; Decisions
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-300">
                    {activeMeeting.summary}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-xs text-zinc-400">
                    {activeMeeting.decisions.map((decision) => (
                      <li key={decision} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                        <span>{decision}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-semibold tracking-wide text-zinc-300 uppercase">
                    Extracted Action Items
                  </h4>
                  <ul className="mt-2 space-y-2">
                    {activeMeeting.actionItems.map((item) => (
                      <li
                        key={item}
                        className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs text-zinc-300"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Linked Meetings */}
                  <div className="mt-5">
                    <h4 className="text-xs font-semibold tracking-wide text-zinc-300 uppercase">
                      Linked Meetings
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {linkedMeetings.map((linked) => (
                        <button
                          key={linked.id}
                          type="button"
                          onClick={() => handleSelectMeeting(linked.id)}
                          className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-xs text-zinc-300 transition-colors hover:border-violet-500/40 hover:text-white"
                        >
                          <Link2 className="h-3 w-3 text-blue-400" aria-hidden="true" />
                          <span>{linked.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timestamped Transcript */}
              <div className="border-t border-white/[0.08] pt-5">
                <div className="mb-2.5 flex items-center justify-between">
                  <h4 className="text-xs font-semibold tracking-wide text-zinc-300 uppercase">
                    Timestamped Transcript
                  </h4>
                  <span className="text-[11px] text-zinc-500">
                    Click timestamp to jump playback
                  </span>
                </div>
                <div className="space-y-1.5">
                  {activeMeeting.transcript.map((seg) => (
                    <button
                      key={seg.id}
                      type="button"
                      onClick={() => setPlayheadSec(seg.seconds)}
                      className="flex w-full items-start gap-3 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-white/[0.04]"
                    >
                      <span className="shrink-0 pt-0.5 font-mono text-[11px] tabular-nums text-blue-400">
                        {seg.timestamp}
                      </span>
                      <span className="text-xs leading-relaxed text-zinc-300">{seg.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeView === 'plan' && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <span>Meeting to Project</span>
                    <span aria-hidden="true">·</span>
                    <span>
                      Status:{' '}
                      <strong className={planApproved ? 'text-emerald-400' : 'text-amber-300'}>
                        {planApproved ? 'User Approved' : 'Pending Explicit Review'}
                      </strong>
                    </span>
                  </div>
                  <h3 className="mt-1 text-lg font-semibold text-white">
                    {SAMPLE_PROJECT_PLAN.meetingTitle}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setPlanApproved((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors ${
                    planApproved
                      ? 'border border-emerald-500/30 bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/20'
                      : 'bg-white text-zinc-950 hover:bg-zinc-200'
                  }`}
                >
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{planApproved ? 'Approved (Click to Reset)' : 'Approve Project Plan'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <h4 className="text-xs font-semibold text-zinc-300 uppercase">Objectives</h4>
                  <ul className="mt-2 space-y-1.5 text-xs text-zinc-300">
                    {SAMPLE_PROJECT_PLAN.objectives.map((obj) => (
                      <li key={obj} className="leading-relaxed">
                        • {obj}
                      </li>
                    ))}
                  </ul>

                  <h4 className="mt-5 text-xs font-semibold text-zinc-300 uppercase">
                    Milestones
                  </h4>
                  <div className="mt-2 space-y-1.5">
                    {SAMPLE_PROJECT_PLAN.milestones.map((m) => (
                      <div
                        key={m.name}
                        className="flex items-center justify-between border-b border-white/[0.06] py-1.5 text-xs"
                      >
                        <span className="text-zinc-200">{m.name}</span>
                        <span className="font-mono text-[11px] text-zinc-400">{m.window}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-zinc-300 uppercase">Tasks</h4>
                  <div className="mt-2 space-y-2">
                    {SAMPLE_PROJECT_PLAN.tasks.map((task) => (
                      <div
                        key={task.title}
                        className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5 text-xs"
                      >
                        <div className="font-medium text-zinc-200">{task.title}</div>
                        <div className="mt-1 flex items-center gap-2 text-[11px] text-zinc-400">
                          <span>{task.owner}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono">{task.target}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h4 className="mt-5 text-xs font-semibold text-zinc-300 uppercase">Risks</h4>
                  <ul className="mt-2 space-y-1.5 text-xs text-zinc-400">
                    {SAMPLE_PROJECT_PLAN.risks.map((risk) => (
                      <li key={risk}>• {risk}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeView === 'artifacts' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Deterministic Memory Artifacts
                  </h3>
                  <p className="mt-0.5 text-xs text-zinc-400">
                    Generated from saved meeting memory using deterministic templates.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {SAMPLE_ARTIFACTS.map((art) => (
                    <button
                      key={art.id}
                      type="button"
                      onClick={() => setActiveArtifactId(art.id)}
                      className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                        activeArtifact.id === art.id
                          ? 'bg-violet-500/20 text-white ring-1 ring-violet-500/40'
                          : 'bg-white/[0.04] text-zinc-400 hover:bg-white/[0.08] hover:text-zinc-200'
                      }`}
                    >
                      {art.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-white/[0.08] bg-zinc-950/80 p-4">
                <div className="mb-2 flex items-center gap-2 text-xs font-medium text-zinc-300">
                  <FileText className="h-3.5 w-3.5 text-violet-400" aria-hidden="true" />
                  <span>{activeArtifact.title}</span>
                </div>
                <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-zinc-300">
                  {activeArtifact.content}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
