import { courses, type CourseFormat } from "@/mocks/courses";

export type SessionStatus = "Scheduled" | "Completed" | "Cancelled";

export interface TrainingSession {
  id: string;
  courseTitle: string;
  format: CourseFormat;
  date: string;
  trainer: string;
  location: string;
  capacity: number;
  registered: number;
  status: SessionStatus;
  note?: string;
}

const courseByTitle = new Map(courses.map((course) => [course.title, course]));

interface SessionOverride {
  courseTitle: string;
  date: string;
  trainer: string;
  location: string;
  status: SessionStatus;
  capacity: number;
  note?: string;
}

const raw: SessionOverride[] = [
  { courseTitle: "Cyber Security Awareness", date: "08 Sep 2026", trainer: "IT Security Team", location: "Online", status: "Completed", capacity: 25 },
  { courseTitle: "GDPR & Data Protection Essentials", date: "05 Sep 2026", trainer: "External — Compliance Partners Ltd", location: "Online", status: "Completed", capacity: 25 },
  { courseTitle: "First Aid & Fire Safety", date: "12 Sep 2026", trainer: "External — St John Ambulance", location: "London Office, Room 2", status: "Completed", capacity: 15 },
  { courseTitle: "Diversity & Inclusion in the Workplace", date: "15 Sep 2026", trainer: "Sophie Carter", location: "Online", status: "Completed", capacity: 25 },
  { courseTitle: "Giving Effective Feedback", date: "16 Sep 2026", trainer: "Priya Nair", location: "Online", status: "Cancelled", capacity: 20, note: "Rescheduled — trainer availability" },
  { courseTitle: "Financial Modelling in Excel", date: "18 Sep 2026", trainer: "Ella Thompson", location: "Online", status: "Completed", capacity: 8 },
  { courseTitle: "Sales Negotiation Mastery", date: "20 Sep 2026", trainer: "Marcus Reid", location: "Manchester Office", status: "Completed", capacity: 6 },
  { courseTitle: "Recruitment & Interviewing Skills", date: "22 Sep 2026", trainer: "Freya Johansson", location: "Online", status: "Completed", capacity: 8 },
  { courseTitle: "Time Management & Prioritisation", date: "24 Sep 2026", trainer: "Sophie Carter", location: "Online", status: "Scheduled", capacity: 20 },
  { courseTitle: "Advanced TypeScript Patterns", date: "29 Sep 2026", trainer: "Daniel Osei", location: "Online", status: "Scheduled", capacity: 8 },
  { courseTitle: "Leading High-Performing Teams", date: "02 Oct 2026", trainer: "External — Leadership Dynamics", location: "London Office, Boardroom", status: "Scheduled", capacity: 8 },
  { courseTitle: "Cloud Infrastructure Fundamentals", date: "06 Oct 2026", trainer: "Chen Wei", location: "Online", status: "Scheduled", capacity: 6 },
];

export const trainingSessions: TrainingSession[] = raw.map((session, index) => {
  const course = courseByTitle.get(session.courseTitle)!;
  return {
    id: `session-${index + 1}`,
    courseTitle: session.courseTitle,
    format: course.format,
    date: session.date,
    trainer: session.trainer,
    location: session.location,
    capacity: session.capacity,
    registered: session.status === "Cancelled" ? 0 : course.enrolled,
    status: session.status,
    note: session.note,
  };
});
