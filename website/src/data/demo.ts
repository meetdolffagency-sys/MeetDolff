/** Illustrative demo content. Every use of this data is labelled "illustrative" in the UI. */

export interface Segment {
  id: number;
  ts: string;
  speaker: string;
  text: string;
  tag: string;
}

export const SEGMENTS: Segment[] = [
  { id: 0, ts: "00:00:42", speaker: "Maya", tag: "Question", text: "Let's settle storage before we touch the API. Postgres, or keep SQLite for the pilot?" },
  { id: 1, ts: "00:04:10", speaker: "Jon", tag: "Context", text: "SQLite covers the pilot. If we migrate later it's a day of work, not a week." },
  { id: 2, ts: "00:09:37", speaker: "Maya", tag: "Decision", text: "Then we decide: SQLite for the pilot, and we revisit when multi-device sync lands." },
  { id: 3, ts: "00:14:05", speaker: "Priya", tag: "Action", text: "I'll write up the migration notes and share them by Friday." },
  { id: 4, ts: "00:19:48", speaker: "Jon", tag: "Risk", text: "The real risk is sync conflicts if two devices edit the same meeting record." },
  { id: 5, ts: "00:26:20", speaker: "Maya", tag: "Next", text: "Parking that for now. Next topic: the export format." },
];

export const BARS: number[] = Array.from({ length: 48 }, (_, i) => {
  const a = Math.sin(i * 0.55) * 0.5 + Math.sin(i * 1.7 + 1) * 0.3 + Math.sin(i * 0.17) * 0.2;
  return Math.max(0.14, Math.min(1, 0.52 + a * 0.5));
});

export interface Meeting {
  id: string;
  name: string;
  date: string;
  topics: string[];
  summary: string;
  changed?: string;
}

export const TOPICS = ["Database", "Sync", "Export"] as const;

export const MEETINGS: Meeting[] = [
  { id: "m1", name: "Kickoff", date: "4 Mar", topics: ["Database"], summary: "Postgres is proposed. A hosted database is set aside because text would leave the device by default." },
  { id: "m2", name: "Scope review", date: "7 Mar", topics: ["Export"], summary: "Export format agreed: one Markdown file and one JSON file per meeting." },
  { id: "m3", name: "Architecture sync", date: "12 Mar", topics: ["Database", "Sync"], summary: "Decision: SQLite for the pilot. Sync is flagged as the open risk.", changed: "Changed since 4 Mar: Postgres was proposed at kickoff; the pilot now uses SQLite." },
  { id: "m4", name: "Sync risks", date: "19 Mar", topics: ["Sync", "Database"], summary: "Sync conflicts come up again — the second meeting where this is the blocker.", changed: "Repeated topic: sync conflicts were first raised on 12 Mar." },
  { id: "m5", name: "Pilot planning", date: "26 Mar", topics: ["Sync", "Export"], summary: "Migration notes are referenced as shared. Conflict policy is still an open item.", changed: "Open since 12 Mar: conflict policy has no owner yet." },
];

export interface Source {
  meeting: string;
  date: string;
  ts: string;
  before: string;
  cited: string;
  after: string;
}
export interface QA {
  q: string;
  a: string;
  sources: Source[];
}

export const QAS: QA[] = [
  {
    q: "What did we decide about the database architecture?",
    a: "Use SQLite for the pilot and revisit when multi-device sync lands. Postgres was considered first, but migration cost was judged small.",
    sources: [
      { meeting: "Architecture sync", date: "12 Mar", ts: "00:09:37", before: "Jon: If we migrate later it's a day of work, not a week.", cited: "Maya: Then we decide: SQLite for the pilot, and we revisit when multi-device sync lands.", after: "Maya: Priya, can you document the migration path?" },
      { meeting: "Kickoff", date: "4 Mar", ts: "00:21:15", before: "Jon: Do we really need a server on day one?", cited: "Maya: Postgres is the obvious option, so let's put it on the table first.", after: "Jon: Let's weigh it against keeping data on the device." },
    ],
  },
  {
    q: "Did anyone commit to the migration notes?",
    a: "Yes. Priya committed to writing the migration notes and sharing them by Friday.",
    sources: [
      { meeting: "Architecture sync", date: "12 Mar", ts: "00:14:05", before: "Maya: Priya, can you document the migration path?", cited: "Priya: I'll write up the migration notes and share them by Friday.", after: "Maya: Perfect. Jon, sync risks next." },
    ],
  },
  {
    q: "Why did we reject the hosted-database approach?",
    a: "It would have sent meeting text off the device by default. The team preferred storage the user owns and can export.",
    sources: [
      { meeting: "Kickoff", date: "4 Mar", ts: "00:31:02", before: "Priya: A hosted database is simplest to build.", cited: "Maya: But then the transcript leaves the device by default, and that's not the product we want.", after: "Jon: Agreed. Local first, export always." },
    ],
  },
];

export interface FileNode {
  name: string;
  kind: "dir" | "file";
  children?: FileNode[];
  preview?: string;
}

export const MEMORY_TREE: FileNode = {
  name: "MeetDolff Memory",
  kind: "dir",
  children: [
    {
      name: "index.json",
      kind: "file",
      preview: `{
  "version": 1,
  "project": "Atlas",
  "meetings": [
    { "id": "meeting-001", "title": "Kickoff",
      "date": "2025-03-04",
      "files": ["meetings/meeting-001.md",
                "meetings/meeting-001.json"] },
    { "id": "meeting-002", "title": "Scope review",
      "date": "2025-03-07",
      "files": ["meetings/meeting-002.md",
                "meetings/meeting-002.json"] }
  ]
}`,
    },
    {
      name: "meetings",
      kind: "dir",
      children: [
        {
          name: "meeting-001.md",
          kind: "file",
          preview: `# Kickoff
Date: 2025-03-04 · Project: Atlas

## Summary
Postgres is proposed. A hosted database is
set aside: text would leave the device by default.

## Decisions
- Keep storage under user control.

## Transcript
[00:21:15] Maya: Postgres is the obvious option...
[00:31:02] Maya: But then the transcript leaves
the device by default...`,
        },
        {
          name: "meeting-001.json",
          kind: "file",
          preview: `{
  "id": "meeting-001",
  "title": "Kickoff",
  "decisions": [
    { "text": "Keep storage under user control",
      "at": "00:31:02" }
  ],
  "actionItems": [],
  "topics": ["Database"],
  "segments": [
    { "at": "00:21:15", "speaker": "Maya",
      "text": "Postgres is the obvious option..." }
  ]
}`,
        },
        {
          name: "meeting-002.md",
          kind: "file",
          preview: `# Scope review
Date: 2025-03-07 · Project: Atlas

## Summary
Export format agreed: one Markdown file and
one JSON file per meeting.

## Decisions
- Markdown for people, JSON for tools.`,
        },
        {
          name: "meeting-002.json",
          kind: "file",
          preview: `{
  "id": "meeting-002",
  "title": "Scope review",
  "decisions": [
    { "text": "Markdown for people, JSON for tools" }
  ],
  "topics": ["Export"]
}`,
        },
      ],
    },
  ],
};
