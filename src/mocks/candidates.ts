import type { StaticImageData } from "next/image";

import UserList1 from "@/public/assets/images/user-list/user-list1.png";
import UserList10 from "@/public/assets/images/user-list/user-list10.png";
import UserList2 from "@/public/assets/images/user-list/user-list2.png";
import UserList3 from "@/public/assets/images/user-list/user-list3.png";
import UserList4 from "@/public/assets/images/user-list/user-list4.png";
import UserList5 from "@/public/assets/images/user-list/user-list5.png";
import UserList6 from "@/public/assets/images/user-list/user-list6.png";
import UserList7 from "@/public/assets/images/user-list/user-list7.png";
import UserList8 from "@/public/assets/images/user-list/user-list8.png";
import UserList9 from "@/public/assets/images/user-list/user-list9.png";

import { jobs } from "@/mocks/jobs";

const avatars: StaticImageData[] = [
  UserList1, UserList2, UserList3, UserList4, UserList5,
  UserList6, UserList7, UserList8, UserList9, UserList10,
];

export type CandidateStage =
  | "Applied"
  | "Screening"
  | "Shortlisted"
  | "Interview"
  | "Technical Assessment"
  | "Final Interview"
  | "Offer"
  | "Hired"
  | "Rejected";

export type CandidateSource = "LinkedIn" | "Company Website" | "Referral" | "Job Board" | "Recruiter Outreach";

export interface Candidate {
  id: string;
  name: string;
  avatar: StaticImageData;
  email: string;
  phone: string;
  jobId: string;
  jobTitle: string;
  department: string;
  appliedDate: string;
  source: CandidateSource;
  stage: CandidateStage;
  rating: number;
}

const jobByTitle = new Map(jobs.map((job) => [job.title, job]));

interface CandidateSeed {
  name: string;
  jobTitle: string;
  appliedDate: string;
  source: CandidateSource;
  stage: CandidateStage;
  rating: number;
}

const raw: CandidateSeed[] = [
  { name: "Owen Baxter", jobTitle: "Backend Engineer", appliedDate: "20 Aug 2026", source: "LinkedIn", stage: "Final Interview", rating: 4.5 },
  { name: "Nadia Farouk", jobTitle: "Backend Engineer", appliedDate: "22 Aug 2026", source: "Job Board", stage: "Technical Assessment", rating: 4 },
  { name: "Marcus Lindqvist", jobTitle: "Backend Engineer", appliedDate: "25 Aug 2026", source: "Referral", stage: "Interview", rating: 3.5 },
  { name: "Priti Desai", jobTitle: "Backend Engineer", appliedDate: "28 Aug 2026", source: "Company Website", stage: "Screening", rating: 3 },
  { name: "Aleksander Nowak", jobTitle: "Backend Engineer", appliedDate: "19 Aug 2026", source: "Referral", stage: "Hired", rating: 4.5 },

  { name: "Leah Whitfield", jobTitle: "Frontend Engineer", appliedDate: "21 Aug 2026", source: "LinkedIn", stage: "Offer", rating: 4.5 },
  { name: "Tobias Reinholt", jobTitle: "Frontend Engineer", appliedDate: "24 Aug 2026", source: "Referral", stage: "Final Interview", rating: 4 },
  { name: "Ines Moreau", jobTitle: "Frontend Engineer", appliedDate: "27 Aug 2026", source: "Job Board", stage: "Shortlisted", rating: 3.5 },

  { name: "Callum Ashworth", jobTitle: "Sales Development Rep", appliedDate: "23 Aug 2026", source: "Company Website", stage: "Interview", rating: 4 },
  { name: "Rosa Fernandez", jobTitle: "Sales Development Rep", appliedDate: "26 Aug 2026", source: "Job Board", stage: "Screening", rating: 3 },
  { name: "Declan Murphy", jobTitle: "Sales Development Rep", appliedDate: "29 Aug 2026", source: "Recruiter Outreach", stage: "Applied", rating: 3 },

  { name: "Sienna Blackwood", jobTitle: "Account Executive", appliedDate: "17 Aug 2026", source: "LinkedIn", stage: "Hired", rating: 5 },
  { name: "Marco Ferreira", jobTitle: "Account Executive", appliedDate: "19 Aug 2026", source: "Referral", stage: "Final Interview", rating: 4 },
  { name: "Yara Haddad", jobTitle: "Account Executive", appliedDate: "22 Aug 2026", source: "Job Board", stage: "Shortlisted", rating: 3.5 },

  { name: "Felix Grunwald", jobTitle: "Platform Engineer", appliedDate: "27 Aug 2026", source: "LinkedIn", stage: "Technical Assessment", rating: 4 },
  { name: "Amina Diallo", jobTitle: "Platform Engineer", appliedDate: "30 Aug 2026", source: "Company Website", stage: "Screening", rating: 3 },

  { name: "Harriet Nolan", jobTitle: "QA Engineer", appliedDate: "03 Sep 2026", source: "Job Board", stage: "Applied", rating: 3 },

  { name: "Oscar Lindberg", jobTitle: "Customer Success Manager", appliedDate: "06 Sep 2026", source: "Referral", stage: "Interview", rating: 4 },
  { name: "Chiara Bellucci", jobTitle: "Customer Success Manager", appliedDate: "08 Sep 2026", source: "LinkedIn", stage: "Screening", rating: 3.5 },
  { name: "Meera Choudhury", jobTitle: "Customer Success Manager", appliedDate: "09 Sep 2026", source: "LinkedIn", stage: "Offer", rating: 4.5 },

  { name: "Nadia Okonkwo", jobTitle: "Support Specialist", appliedDate: "11 Sep 2026", source: "Job Board", stage: "Shortlisted", rating: 3.5 },
  { name: "Ben Sorensen", jobTitle: "Support Specialist", appliedDate: "12 Sep 2026", source: "Company Website", stage: "Applied", rating: 3 },
  { name: "Freya Lindstrom", jobTitle: "Support Specialist", appliedDate: "13 Sep 2026", source: "LinkedIn", stage: "Rejected", rating: 2 },
  { name: "Diego Alvarez", jobTitle: "Support Specialist", appliedDate: "14 Sep 2026", source: "Job Board", stage: "Offer", rating: 4 },

  { name: "Rhys Fletcher", jobTitle: "Financial Analyst", appliedDate: "13 Sep 2026", source: "Referral", stage: "Screening", rating: 3.5 },
  { name: "Isla Cameron", jobTitle: "Financial Analyst", appliedDate: "10 Sep 2026", source: "Company Website", stage: "Offer", rating: 4 },

  { name: "Sofia Almeida", jobTitle: "Talent Acquisition Partner", appliedDate: "04 Sep 2026", source: "LinkedIn", stage: "Applied", rating: 3.5 },
];

export const candidates: Candidate[] = raw.map((seed, index) => {
  const job = jobByTitle.get(seed.jobTitle)!;
  const [firstName, ...rest] = seed.name.toLowerCase().split(" ");
  const lastName = rest.join("");
  return {
    id: `cand-${index + 1}`,
    name: seed.name,
    avatar: avatars[index % avatars.length],
    email: `${firstName}.${lastName}@example.com`,
    phone: `+44 7700 9${String(100 + index).padStart(3, "0")}`,
    jobId: job.id,
    jobTitle: job.title,
    department: job.department,
    appliedDate: seed.appliedDate,
    source: seed.source,
    stage: seed.stage,
    rating: seed.rating,
  };
});

export const candidateStages: CandidateStage[] = [
  "Applied", "Screening", "Shortlisted", "Interview",
  "Technical Assessment", "Final Interview", "Offer", "Hired", "Rejected",
];
export const candidateSources: CandidateSource[] = [
  "LinkedIn", "Company Website", "Referral", "Job Board", "Recruiter Outreach",
];
