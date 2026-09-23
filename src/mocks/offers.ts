import { candidates } from "@/mocks/candidates";
import { jobs } from "@/mocks/jobs";

export type OfferStatus = "Draft" | "Sent" | "Accepted" | "Declined" | "Expired";

export interface Offer {
  id: string;
  candidateId: string;
  candidateName: string;
  avatar: (typeof candidates)[number]["avatar"];
  jobTitle: string;
  department: string;
  offeredSalary: number;
  offerDate: string;
  expiryDate: string;
  startDate: string;
  status: OfferStatus;
}

const candidateByName = new Map(candidates.map((candidate) => [candidate.name, candidate]));
const jobByTitle = new Map(jobs.map((job) => [job.title, job]));

interface OfferSeed {
  candidateName: string;
  offeredSalary: number;
  offerDate: string;
  expiryDate: string;
  startDate: string;
  status: OfferStatus;
}

// One offer per candidate at the Offer/Hired stage in mocks/candidates.ts,
// so this page never disagrees with the Candidates or Pipeline pages.
const raw: OfferSeed[] = [
  { candidateName: "Leah Whitfield", offeredSalary: 52000, offerDate: "19 Sep 2026", expiryDate: "03 Oct 2026", startDate: "02 Nov 2026", status: "Sent" },
  { candidateName: "Sienna Blackwood", offeredSalary: 48000, offerDate: "12 Sep 2026", expiryDate: "26 Sep 2026", startDate: "13 Oct 2026", status: "Accepted" },
  { candidateName: "Diego Alvarez", offeredSalary: 30000, offerDate: "16 Sep 2026", expiryDate: "30 Sep 2026", startDate: "20 Oct 2026", status: "Sent" },
  { candidateName: "Meera Choudhury", offeredSalary: 44000, offerDate: "16 Sep 2026", expiryDate: "30 Sep 2026", startDate: "16 Oct 2026", status: "Sent" },
  { candidateName: "Aleksander Nowak", offeredSalary: 54000, offerDate: "11 Sep 2026", expiryDate: "25 Sep 2026", startDate: "05 Oct 2026", status: "Accepted" },
  { candidateName: "Isla Cameron", offeredSalary: 46000, offerDate: "20 Sep 2026", expiryDate: "04 Oct 2026", startDate: "26 Oct 2026", status: "Draft" },
];

export const offers: Offer[] = raw.map((seed, index) => {
  const candidate = candidateByName.get(seed.candidateName)!;
  const job = jobByTitle.get(candidate.jobTitle)!;
  return {
    id: `offer-${index + 1}`,
    candidateId: candidate.id,
    candidateName: candidate.name,
    avatar: candidate.avatar,
    jobTitle: candidate.jobTitle,
    department: job.department,
    offeredSalary: seed.offeredSalary,
    offerDate: seed.offerDate,
    expiryDate: seed.expiryDate,
    startDate: seed.startDate,
    status: seed.status,
  };
});

export const offerStatuses: OfferStatus[] = ["Draft", "Sent", "Accepted", "Declined", "Expired"];
