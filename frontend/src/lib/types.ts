/* ═══════════════════════════════════════════════════
   Types — Full TypeScript definitions matching DB schema
   ═══════════════════════════════════════════════════ */

// ── Enums ──

export type ExamType = "MID_SEM" | "END_OF_SEM" | "QUIZ" | "TEST";
export type ExamSemester = "FIRST" | "SECOND";
export type Difficulty = "EASY" | "MEDIUM" | "HARD";
export type Priority = "HIGH" | "MEDIUM" | "LOW";

export type CredibilitySource =
  | "LECTURER_DIRECT"
  | "TA"
  | "ADMIN"
  | "COMMUNITY";

export type VerifiedSubtype = "LIKELY_TO_COME" | "CONFIRMED_CAME_UP";

export type SolutionSource =
  | "OFFICIAL"
  | "LECTURER"
  | "ALTERNATIVE"
  | "STUDENT";

export type SolutionStatus = "PENDING" | "APPROVED" | "REJECTED";

export type ContentType =
  | "GUIDE_VIDEO"
  | "SLIDE"
  | "PASSCO"
  | "VERIFIED_QUESTION"
  | "PRACTICE_QUESTION"
  | "COURSE_BREAKDOWN"
  | "LECTURE_BREAKDOWN"
  | "RESOURCE";

export type QuestionFormat = "text" | "pdf" | "image" | "video_link";

// ── Platform Entities ──

export interface School {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  primaryColor: string;
  isActive: boolean;
}

export interface Program {
  id: string;
  name: string;
  slug: string;
  disciplineSlug: string;
  schoolId: string;
  school?: School;
}

export interface AcademicYear {
  id: string;
  label: string; // "2024/2025"
  slug: string; // "2024-25"
  programId: string;
  isActive: boolean;
}

export interface Lecturer {
  id: string;
  name: string;
  photo?: string;
  bio?: string;
  email?: string;
  phone?: string;
  officeHours?: string;
  schoolId: string;
}

export interface Course {
  id: string;
  name: string;
  code: string; // "CSM 157"
  slug: string; // "csm157"
  academicYearId: string;
  programId: string;
  yearLevel: number; // 1-4
  semester: 1 | 2;
  creditHours: number;
  theoryHours: number;
  practicalHours: number;
  isEvergreen: boolean;
  lecturers: Lecturer[];
  sectionCounts: SectionCounts;
}

export interface SectionCounts {
  assignments: number;
  passco: number;
  verifiedQuestions: number;
  practiceQuestions: number;
  videos: number;
  slides: number;
  hasBreakdown: boolean;
  lectureCount: number;
}

// ── Content Entities ──

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  dueDate?: string;
  questionType: QuestionFormat;
  questionContent: string;
  solutions: AssignmentSolution[];
  createdAt: string;
}

export interface AssignmentSolution {
  id: string;
  assignmentId: string;
  label: string;
  solutionSource: SolutionSource;
  solutionType: QuestionFormat;
  solutionContent: string;
  contributorName?: string;
  status: SolutionStatus;
  isReleased: boolean;
  releasedAt?: string;
}

export interface PasscoPaper {
  id: string;
  courseId: string;
  title: string;
  examType: ExamType;
  examYear: number;
  examSemester: ExamSemester;
  fileUrl?: string;
  priority: Priority | null;
  passcoFrequency: number;
  hasSolutions: boolean;
  solutionCount: number;
  isHistorical: boolean;
}

export interface VerifiedQuestion {
  id: string;
  courseId: string;
  questionContent: string;
  questionType: QuestionFormat;
  topic: string;
  verifiedType: VerifiedSubtype;
  sourceType: CredibilitySource;
  evidenceNote?: string;
  passcoFrequency: number;
  priority: Priority | null;
  solutions: Solution[];
  createdAt: string;
}

export interface PracticeQuestion {
  id: string;
  courseId: string;
  questionContent: string;
  questionType: QuestionFormat;
  topic: string;
  difficulty: Difficulty;
  source?: string;
  solutions: Solution[];
  createdAt: string;
}

export interface Solution {
  id: string;
  label: string;
  solutionSource: SolutionSource;
  solutionType: QuestionFormat;
  solutionContent: string;
  contributorName?: string;
  status: SolutionStatus;
  isReleased: boolean;
  releasedAt?: string;
  upvoteCount: number;
}

export interface GuideVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  isEvergreen: boolean;
  isPlatformWide: boolean;
}

export interface CourseBreakdown {
  overview: string;
  studyTips: string[];
  weeklyPlan: WeeklyPlanItem[];
  topicWeightings: TopicWeight[];
  recommendedBooks: string[];
}

export interface WeeklyPlanItem {
  week: number;
  topic: string;
  focus: string;
}

export interface TopicWeight {
  topic: string;
  weight: number; // percentage
}

export interface LectureBreakdown {
  id: string;
  lectureNumber: number;
  title: string;
  weekNumber: number;
  summary: string;
  keyTopics: string[];
  linkedSlideId?: string;
}

export interface SlideResource {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: "pdf" | "image";
  priority: Priority | null;
  weekNumber?: number;
}

// ── Cross-Program ──

export interface DisciplineProgram {
  school: School;
  program: Program;
  courseCount: number;
  passcoCount: number;
  questionCount: number;
}

// ── Quiz (Practice MCQ) ──

export interface QuizQuestion {
  id: string;
  courseId: string;
  topic: string;
  difficulty: Difficulty;
  questionText: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface QuizConfig {
  topics: string[];
  difficulty: Difficulty | "ALL";
  questionCount: number;
}

export interface QuizResult {
  totalQuestions: number;
  correct: number;
  timeTakenSeconds: number;
  answers: { questionId: string; selectedIndex: number; isCorrect: boolean }[];
}

// ── Section config for navigation ──

export interface SectionConfig {
  slug: string;
  label: string;
  icon: string; // emoji
  description: string;
}

export const SECTIONS: SectionConfig[] = [
  { slug: "assignments", label: "Assignments", icon: "📝", description: "Assignment questions with multiple solutions" },
  { slug: "passco", label: "Passco", icon: "📄", description: "Past exam papers grouped by year" },
  { slug: "verified-questions", label: "Verified Questions", icon: "✅", description: "Lecturer-confirmed exam questions" },
  { slug: "practice", label: "Practice", icon: "🎯", description: "Drill questions by topic and difficulty" },
  { slug: "videos", label: "Guide Videos", icon: "🎬", description: "Software setup and learning walkthroughs" },
  { slug: "breakdown", label: "Course Breakdown", icon: "📊", description: "Study plan, tips, and topic weightings" },
  { slug: "lectures", label: "Lectures", icon: "📚", description: "Per-lecture summaries and key topics" },
  { slug: "slides", label: "Slides & Resources", icon: "📎", description: "Lecture slides and academic materials" },
];
