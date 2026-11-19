import {
  ArtifactTemplate,
  FaqItem,
  HeroQAItem,
  ProjectPlanData,
  SampleMeeting,
} from '../types';

export const REPO_URL = 'https://github.com/archanapriyadarshini1st-debug/MeetDolff';
export const COMPANION_DOCS_URL =
  'https://github.com/archanapriyadarshini1st-debug/MeetDolff/blob/main/companion/README.md';
export const PRIVACY_DOCS_URL =
  'https://github.com/archanapriyadarshini1st-debug/MeetDolff#privacy--security';
export const LOGO_PATH =
  '/assets/aistudio/file_0000000091a08211ad682351484353c8_a1b3fc4c.png';

export const HERO_TRANSCRIPT = [
  {
    id: 'seg-1',
    timestamp: '00:18:42',
    seconds: 1122,
    text: 'Let us keep all meeting records inside IndexedDB first, then offer Markdown and JSON exports for portability.',
  },
  {
    id: 'seg-2',
    timestamp: '00:19:15',
    seconds: 1155,
    text: 'Agreed. API credentials should use AES-GCM encryption with a non-extractable key—never chrome.storage.',
  },
  {
    id: 'seg-3',
    timestamp: '00:21:04',
    seconds: 1264,
    text: 'For v0.1.0, full-text search gives deterministic results without shipping a heavy vector store.',
  },
];

export const HERO_QA_PRESETS: HeroQAItem[] = [
  {
    id: 'qa-vault',
    question: 'How did we decide to encrypt API keys?',
    answer:
      'Credentials are encrypted with AES-GCM inside a dedicated IndexedDB vault using a non-extractable key, rather than chrome.storage.',
    citationMeeting: 'Sample: Architecture Review',
    citationTimestamp: '00:19:15',
    segmentId: 'seg-2',
  },
  {
    id: 'qa-search',
    question: 'Why are we skipping vector search in v0.1.0?',
    answer:
      'Deterministic full-text search covers transcripts, summaries, decisions, and action items reliably without external vector infrastructure.',
    citationMeeting: 'Sample: Architecture Review',
    citationTimestamp: '00:21:04',
    segmentId: 'seg-3',
  },
  {
    id: 'qa-missing',
    question: 'What budget was approved for desktop capture?',
    answer:
      'Not in memory. No recorded meeting in your local IndexedDB store contains a budget figure for desktop capture.',
    citationMeeting: 'Local Memory Check',
    citationTimestamp: 'No match',
    notInMemory: true,
  },
];

export const SAMPLE_MEETINGS: SampleMeeting[] = [
  {
    id: 'mtg-arch',
    title: 'Sample: Local Storage & Vault Sync',
    dateLabel: 'Nov 14, 2026',
    calendarDay: 14,
    topic: 'Architecture',
    duration: '28:40',
    durationSeconds: 1720,
    colorClass: 'bg-violet-500',
    summary:
      'Defined the IndexedDB persistence layer for structured meeting records, recovery chunks during tab capture, and portable Markdown/JSON export via the File System Access API with download fallback.',
    decisions: [
      'Encrypt provider API keys with AES-GCM in a dedicated IndexedDB vault using a non-extractable key.',
      'Persist audio recovery chunks during active capture so unexpected interruptions do not lose recorded segments.',
    ],
    actionItems: [
      'Implement File System Access API export with browser download fallback.',
      'Verify Whisper-compatible cloud transcription adapter and Web Speech API live microphone flow.',
    ],
    linkedMeetingIds: ['mtg-mcp', 'mtg-search'],
    transcript: [
      {
        id: 't1',
        timestamp: '00:04:12',
        seconds: 252,
        text: 'Recording starts only after the user explicitly clicks Start Recording in the extension controls.',
      },
      {
        id: 't2',
        timestamp: '00:11:38',
        seconds: 698,
        text: 'If a tab closes mid-call, recovery chunks in IndexedDB let the user restore the recorded session.',
      },
      {
        id: 't3',
        timestamp: '00:19:15',
        seconds: 1155,
        text: 'Keep API credentials out of chrome.storage entirely; lock them inside the AES-GCM IndexedDB vault.',
      },
    ],
  },
  {
    id: 'mtg-search',
    title: 'Sample: Deterministic Search & BYOK',
    dateLabel: 'Nov 16, 2026',
    calendarDay: 16,
    topic: 'Retrieval',
    duration: '19:15',
    durationSeconds: 1155,
    colorClass: 'bg-blue-500',
    summary:
      'Reviewed offline full-text indexing across transcripts, summaries, decisions, and action items alongside BYOK adapter parity for OpenAI-compatible, Groq, Together, Ollama, Anthropic, and Gemini.',
    decisions: [
      'Keep Tavily and Brave web search strictly optional and visually separated from local meeting memory.',
      'Return explicit "Not in memory" answers when meeting history lacks supporting evidence.',
    ],
    actionItems: [
      'Add date and topic filters to the offline search panel.',
      'Highlight meeting title and exact timestamp citations in Q&A responses.',
    ],
    linkedMeetingIds: ['mtg-arch'],
    transcript: [
      {
        id: 't4',
        timestamp: '00:03:05',
        seconds: 185,
        text: 'Users can configure local Ollama endpoints or bring their own OpenAI, Anthropic, or Gemini keys.',
      },
      {
        id: 't5',
        timestamp: '00:09:44',
        seconds: 584,
        text: 'External Tavily or Brave search URLs must appear distinctly outside meeting memory citations.',
      },
      {
        id: 't6',
        timestamp: '00:15:20',
        seconds: 920,
        text: 'Full-text search filters by date and topic completely offline without a cloud vector database.',
      },
    ],
  },
  {
    id: 'mtg-mcp',
    title: 'Sample: Companion MCP Boundaries',
    dateLabel: 'Nov 18, 2026',
    calendarDay: 18,
    topic: 'Companion',
    duration: '22:08',
    durationSeconds: 1328,
    colorClass: 'bg-indigo-400',
    summary:
      'Scoped the local companion architecture for external AI agents accessing exported meeting memory, enforcing narrow read-only schemas by default and token authentication.',
    decisions: [
      'Keep the Chrome extension free of any public MCP server; route agent access through the local companion.',
      'Require explicit user approval for any write operation proposed by an external client.',
    ],
    actionItems: [
      'Document local companion token setup and read-only tool schemas in companion/README.md.',
      'Require explicit user review before marking generated project plans as approved.',
    ],
    linkedMeetingIds: ['mtg-arch'],
    transcript: [
      {
        id: 't7',
        timestamp: '00:06:30',
        seconds: 390,
        text: 'External agents should never get unrestricted write access—read-only by default with narrow schemas.',
      },
      {
        id: 't8',
        timestamp: '00:14:51',
        seconds: 891,
        text: 'Project plans generated from meetings stay in draft review until the user explicitly approves them.',
      },
    ],
  },
];

export const SAMPLE_PROJECT_PLAN: ProjectPlanData = {
  meetingTitle: 'Sample: Local Storage & Vault Sync',
  objectives: [
    'Ensure zero unrequested audio capture across browser sessions.',
    'Keep exported meeting archives human-readable and tool-portable.',
  ],
  tasks: [
    {
      title: 'Implement File System Access API export with download fallback',
      owner: 'Storage Module',
      target: 'Sprint 1',
    },
    {
      title: 'Persist audio recovery chunks during tabCapture',
      owner: 'Capture Offscreen',
      target: 'Sprint 1',
    },
    {
      title: 'Add explicit approval gate for generated project plans',
      owner: 'Dashboard UI',
      target: 'Sprint 2',
    },
  ],
  milestones: [
    { name: 'Encrypted Vault Verification', window: 'Week 1' },
    { name: 'Portable Markdown & JSON Round-Trip', window: 'Week 2' },
  ],
  risks: [
    'Browser tabCapture does not capture native desktop apps such as Zoom desktop.',
    'Live Web Speech API transcription varies by browser speech engine availability.',
  ],
};

export const SAMPLE_ARTIFACTS: ArtifactTemplate[] = [
  {
    id: 'report',
    label: 'Report',
    title: 'Deterministic Memory Summary Report',
    content: `# Meeting Report: Local Storage & Vault Sync\nDate: Nov 14, 2026 · Duration: 28:40\n\n## Verified Decisions\n- Encrypt API keys using AES-GCM inside dedicated IndexedDB vault.\n- Store recording recovery chunks locally during active sessions.\n\n## Next Actions\n1. Finalize File System Access export fallback.\n2. Document Whisper-compatible transcription adapter setup.`,
  },
  {
    id: 'flashcards',
    label: 'Flashcards',
    title: 'Memory Review Flashcards (Deterministic)',
    content: `Card 1\nQ: Where are MeetDolff API keys stored?\nA: Encrypted via AES-GCM inside a dedicated IndexedDB vault using a non-extractable key.\n\nCard 2\nQ: How does MeetDolff recover interrupted recordings?\nA: By persisting recording recovery chunks locally during active capture.`,
  },
  {
    id: 'quiz',
    label: 'Quiz',
    title: 'Knowledge Check from Saved Transcript',
    content: `1. Which storage mechanism holds structured meeting records in v0.1.0?\n   [x] Browser IndexedDB\n   [ ] Remote cloud database\n\n2. Are API keys ever written to chrome.storage?\n   [x] No — stored only in the encrypted IndexedDB vault`,
  },
  {
    id: 'mermaid',
    label: 'Mermaid Map',
    title: 'Mermaid Mind Map Definition',
    content: `mindmap\n  root((Local Storage Sync))\n    Capture\n      Chrome tabCapture\n      Recovery Chunks\n    Vault\n      AES-GCM Encryption\n      Non-extractable Key\n    Portability\n      Markdown Export\n      JSON Import`,
  },
  {
    id: 'infographic',
    label: 'Infographic Text',
    title: 'Structured Infographic Outline',
    content: `HEADLINE: Local-First Meeting Memory\n[1] Explicit Start -> User triggers tabCapture or mic\n[2] Recovery State -> Chunks saved in IndexedDB\n[3] Encrypted BYOK -> AES-GCM key vault\n[4] Portable Output -> Markdown & JSON files`,
  },
];

export const PROBLEMS = [
  {
    index: '01',
    title: 'Forgotten decisions',
    description:
      'People forget what was discussed, why a trade-off was chosen, and what was actually agreed upon once the call ends.',
  },
  {
    index: '02',
    title: 'Scattered information',
    description:
      'Meeting notes, raw audio recordings, and follow-up action items drift across tabs, folders, and tools until they become impossible to track.',
  },
  {
    index: '03',
    title: 'Lost context',
    description:
      'Locating one critical statement or timestamp from a conversation days or weeks earlier turns into slow, frustrating guesswork.',
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: 'Step 1',
    title: 'Connect',
    description: 'Install MeetDolff as an unpacked Chrome extension from the repository build.',
  },
  {
    step: 'Step 2',
    title: 'Record',
    description: 'Open a supported browser meeting tab and explicitly start recording.',
  },
  {
    step: 'Step 3',
    title: 'Remember',
    description: 'Transcribe the meeting and save structured records to persistent local memory.',
  },
  {
    step: 'Step 4',
    title: 'Ask',
    description: 'Ask questions across previous conversations and receive grounded answers with timestamps.',
  },
];

export const PRIVACY_PILLARS = [
  {
    title: 'Local-First Memory',
    detail:
      'Structured meeting records—transcripts, summaries, decisions, and action items—are stored locally in browser IndexedDB.',
  },
  {
    title: 'Portable Memory',
    detail:
      'Export your entire meeting memory into standard Markdown and JSON files, and re-import records whenever you choose.',
  },
  {
    title: 'Encrypted API Key Storage',
    detail:
      'API keys are encrypted using AES-GCM and stored in a dedicated IndexedDB vault with a non-extractable key. They are never stored in chrome.storage or logged.',
  },
  {
    title: 'No Analytics',
    detail:
      'The verified v0.1.0 extension includes zero telemetry, zero tracking scripts, and zero usage analytics.',
  },
  {
    title: 'Minimal Permissions',
    detail:
      'Requests only tabCapture, offscreen, storage, sidePanel, and activeTab—strictly what is needed to capture and organize meetings.',
  },
  {
    title: 'Explicit Recording',
    detail:
      'Recording begins solely upon deliberate user action, accompanied by visible REC indicators and pause/resume/stop controls.',
  },
];

export const TECHNICAL_STACK = [
  { name: 'TypeScript', note: 'Strict typed extension & UI architecture' },
  { name: 'Chrome Manifest V3', note: 'Modern extension lifecycle & offscreen capture' },
  { name: 'IndexedDB', note: 'Persistent local records & audio recovery chunks' },
  { name: 'Web Speech API', note: 'Live browser microphone transcription' },
  { name: 'Chrome tabCapture', note: 'Explicit browser tab audio capture' },
  { name: 'AES-GCM Encryption', note: 'Non-extractable key vault in IndexedDB' },
  { name: 'Full-Text Search', note: 'Deterministic offline transcript & item search' },
  { name: 'OpenAI-Compatible Adapters', note: 'OpenAI, Groq, Together, and local Ollama' },
  { name: 'Anthropic & Gemini Adapters', note: 'Multi-provider BYOK model flexibility' },
  { name: 'Portable JSON & Markdown', note: 'File System Access API with download fallback' },
  { name: 'MCP Local Companion', note: 'Token-authenticated, read-only default architecture' },
];

export const ROADMAP_ITEMS = [
  {
    title: 'Native desktop application capture',
    description:
      'Capture audio from native desktop apps such as Zoom desktop and other non-browser meeting clients.',
  },
  {
    title: 'Real speaker diarization',
    description:
      'Identify and separate individual speakers automatically in multi-participant transcripts.',
  },
  {
    title: 'Vector search',
    description:
      'Semantic similarity retrieval to complement the deterministic full-text search available in v0.1.0.',
  },
  {
    title: 'Expanded MCP functionality',
    description:
      'Richer tool workflows for the local companion while preserving token authentication and write approvals.',
  },
];

export const INSTALL_STEPS = [
  'Clone or obtain the MeetDolff source code from the GitHub repository.',
  'Run npm install in the project directory.',
  'Run npm run build to generate the unpacked extension bundle.',
  'Open chrome://extensions in Google Chrome.',
  'Enable Developer mode in the top-right corner.',
  'Select Load unpacked.',
  'Choose the generated dist folder.',
  'Pin MeetDolff to your Chrome toolbar.',
];

export const CONFIG_STEPS = [
  'Open MeetDolff Settings and add your own AI API key (stored in the AES-GCM IndexedDB vault).',
  'Select your preferred chat and transcription providers.',
  'Save your settings.',
  'Open a supported browser meeting tab.',
  'Explicitly click Start Recording when you are ready to capture.',
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What is MeetDolff?',
    answer:
      'MeetDolff is a local-first AI meeting companion Chrome extension (v0.1.0). It records browser meetings with your explicit permission, transcribes conversations, and turns them into persistent, searchable, portable personal memory stored in your browser.',
  },
  {
    question: 'Does MeetDolff record automatically?',
    answer:
      'No. MeetDolff never records automatically or silently in the background. Recording begins only after you take explicit action, and it displays a visible recording indicator, timer, and pause/resume/stop controls.',
  },
  {
    question: 'Where is meeting data stored?',
    answer:
      'Structured meeting records—including transcripts, summaries, decisions, action items, and audio recovery chunks—are stored locally in your browser’s IndexedDB. API keys are stored separately in an AES-GCM encrypted IndexedDB vault with a non-extractable key, never in chrome.storage.',
  },
  {
    question: 'Does MeetDolff require an AI API key?',
    answer:
      'Yes, for AI-powered summaries, decision and action-item extraction, Q&A, or cloud Whisper-compatible transcription, MeetDolff uses a Bring Your Own Key (BYOK) model. You can also connect local Ollama-compatible endpoints without a cloud key, while local recording, IndexedDB storage, exports, and offline full-text search work locally.',
  },
  {
    question: 'Which AI providers are supported?',
    answer:
      'MeetDolff supports OpenAI, OpenAI-compatible APIs, Groq, Together, local Ollama-compatible providers, Anthropic, and Google Gemini, plus Whisper-compatible transcription adapters and optional Tavily or Brave web search.',
  },
  {
    question: 'Can I search old meetings?',
    answer:
      'Yes. MeetDolff includes deterministic full-text search across transcripts, summaries, decisions, and action items with date and topic filters. When you ask AI Q&A across meetings, answers cite specific meetings and timestamps—or state honestly when something is not in memory.',
  },
  {
    question: 'Does MeetDolff work offline?',
    answer:
      'Local meeting storage in IndexedDB, offline full-text search, audio recording, and Markdown/JSON export and import work locally without cloud databases. When you enable cloud transcription, external AI providers, or optional web search (Tavily or Brave), relevant data is sent to those configured providers and their privacy policies apply.',
  },
  {
    question: 'Does it support Zoom?',
    answer:
      'In v0.1.0, MeetDolff captures audio from supported browser tabs using Chrome tabCapture (such as browser-based meetings) and microphone input. Native desktop application capture for Zoom desktop and other standalone desktop apps is planned on the roadmap.',
  },
  {
    question: 'Does it identify individual speakers?',
    answer:
      'No. In v0.1.0, basic transcription does not provide real speaker diarization. Transcripts are timestamped sequentially, and real speaker diarization is listed transparently as a planned future capability.',
  },
  {
    question: 'Can I export my meeting memory?',
    answer:
      'Yes. You can export structured meeting records to portable Markdown and JSON files using the File System Access API (with standard browser download fallback) and re-import exported records later.',
  },
  {
    question: 'Does MeetDolff have a public MCP server?',
    answer:
      'No. The Chrome extension does not host a public MCP server. Instead, external AI agents can access exported meeting memory through an optional local companion architecture featuring narrow tool schemas, read-only defaults, token authentication, and explicit approval for writes.',
  },
  {
    question: 'Is MeetDolff free?',
    answer:
      'MeetDolff itself is open-source software you build and load locally as an unpacked Chrome extension with no subscription or analytics. If you configure paid third-party AI APIs or cloud transcription providers using your own key, you pay those providers directly based on your usage.',
  },
];
