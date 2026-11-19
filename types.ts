export interface TranscriptSegment {
  id: string;
  timestamp: string;
  seconds: number;
  text: string;
}

export interface HeroQAItem {
  id: string;
  question: string;
  answer: string;
  citationMeeting: string;
  citationTimestamp: string;
  segmentId?: string;
  notInMemory?: boolean;
}

export interface SampleMeeting {
  id: string;
  title: string;
  dateLabel: string;
  calendarDay: number;
  topic: string;
  duration: string;
  durationSeconds: number;
  colorClass: string;
  summary: string;
  decisions: string[];
  actionItems: string[];
  linkedMeetingIds: string[];
  transcript: TranscriptSegment[];
}

export interface ProjectPlanData {
  meetingTitle: string;
  objectives: string[];
  tasks: { title: string; owner: string; target: string }[];
  milestones: { name: string; window: string }[];
  risks: string[];
}

export interface ArtifactTemplate {
  id: 'report' | 'flashcards' | 'quiz' | 'mermaid' | 'infographic';
  label: string;
  title: string;
  content: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
