import { candidates } from "@/mocks/candidates";
import { jobs } from "@/mocks/jobs";

export type InterviewType = "Phone Screen" | "Technical" | "Panel" | "Final";
export type InterviewMode = "Video Call" | "In Person" | "Phone Call";
export type InterviewStatus = "Scheduled" | "Completed" | "Cancelled" | "No Show";

export interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  avatar: (typeof candidates)[number]["avatar"];
  jobTitle: string;
  interviewer: string;
  type: InterviewType;
  mode: InterviewMode;
  scheduledDate: string;
  scheduledTime: string;
  status: InterviewStatus;
}

const candidateByName = new Map(candidates.map((candidate) => [candidate.name, candidate]));
const jobByTitle = new Map(jobs.map((job) => [job.title, job]));

interface InterviewSeed {
  candidateName: string;
  type: InterviewType;
  mode: InterviewMode;
  date: string;
  time: string;
  status: InterviewStatus;
}

// Interviewer reuses each job's hiring-manager role, so this page never
// disagrees with the "Hiring Manager" column on the Jobs page.
const raw: InterviewSeed[] = [
  { candidateName: "Owen Baxter", type: "Final", mode: "In Person", date: "24 Sep 2026", time: "10:00", status: "Scheduled" },
  { candidateName: "Nadia Farouk", type: "Technical", mode: "Video Call", date: "22 Sep 2026", time: "14:00", status: "Completed" },
  { candidateName: "Marcus Lindqvist", type: "Technical", mode: "Video Call", date: "25 Sep 2026", time: "11:30", status: "Scheduled" },
  { candidateName: "Priti Desai", type: "Phone Screen", mode: "Phone Call", date: "20 Sep 2026", time: "09:30", status: "Completed" },
  { candidateName: "Aleksander Nowak", type: "Final", mode: "In Person", date: "10 Sep 2026", time: "13:00", status: "Completed" },

  { candidateName: "Leah Whitfield", type: "Final", mode: "In Person", date: "18 Sep 2026", time: "13:00", status: "Completed" },
  { candidateName: "Tobias Reinholt", type: "Final", mode: "Video Call", date: "26 Sep 2026", time: "15:00", status: "Scheduled" },
  { candidateName: "Ines Moreau", type: "Panel", mode: "Video Call", date: "29 Sep 2026", time: "10:00", status: "Scheduled" },

  { candidateName: "Callum Ashworth", type: "Technical", mode: "Video Call", date: "23 Sep 2026", time: "16:00", status: "Scheduled" },
  { candidateName: "Rosa Fernandez", type: "Phone Screen", mode: "Phone Call", date: "21 Sep 2026", time: "09:00", status: "Completed" },

  { candidateName: "Sienna Blackwood", type: "Final", mode: "In Person", date: "16 Sep 2026", time: "11:00", status: "Completed" },
  { candidateName: "Marco Ferreira", type: "Final", mode: "Video Call", date: "27 Sep 2026", time: "14:30", status: "Scheduled" },

  { candidateName: "Felix Grunwald", type: "Technical", mode: "Video Call", date: "24 Sep 2026", time: "09:30", status: "Scheduled" },

  { candidateName: "Oscar Lindberg", type: "Technical", mode: "Video Call", date: "28 Sep 2026", time: "13:30", status: "Scheduled" },
  { candidateName: "Chiara Bellucci", type: "Phone Screen", mode: "Phone Call", date: "19 Sep 2026", time: "10:30", status: "No Show" },
  { candidateName: "Meera Choudhury", type: "Final", mode: "In Person", date: "15 Sep 2026", time: "14:00", status: "Completed" },

  { candidateName: "Freya Lindstrom", type: "Phone Screen", mode: "Phone Call", date: "17 Sep 2026", time: "09:00", status: "Cancelled" },

  { candidateName: "Isla Cameron", type: "Final", mode: "Video Call", date: "12 Sep 2026", time: "11:30", status: "Completed" },
];

export const interviews: Interview[] = raw.map((seed, index) => {
  const candidate = candidateByName.get(seed.candidateName)!;
  const job = jobByTitle.get(candidate.jobTitle)!;
  return {
    id: `int-${index + 1}`,
    candidateId: candidate.id,
    candidateName: candidate.name,
    avatar: candidate.avatar,
    jobTitle: candidate.jobTitle,
    interviewer: job.hiringManager,
    type: seed.type,
    mode: seed.mode,
    scheduledDate: seed.date,
    scheduledTime: seed.time,
    status: seed.status,
  };
});

export const interviewTypes: InterviewType[] = ["Phone Screen", "Technical", "Panel", "Final"];
export const interviewStatuses: InterviewStatus[] = ["Scheduled", "Completed", "Cancelled", "No Show"];
