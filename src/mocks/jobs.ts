import { positions, type PositionGrade } from "@/mocks/positions";

export type JobStatus = "Open" | "On Hold";
export type JobEmploymentType = "Permanent" | "Fixed Term" | "Contractor";

export interface Job {
  id: string;
  title: string;
  department: string;
  grade: PositionGrade;
  location: string;
  employmentType: JobEmploymentType;
  openings: number;
  applicants: number;
  hiringManager: string;
  salaryBand: string;
  status: JobStatus;
  postedDate: string;
}

interface JobSeed {
  title: string;
  location: string;
  employmentType: JobEmploymentType;
  applicants: number;
  status: JobStatus;
  postedDate: string;
}

const positionByTitle = new Map(positions.map((position) => [position.title, position]));

// One requisition per open position, so openings here always match the
// "Open Positions" KPI on the dashboard and the People > Positions page.
const raw: JobSeed[] = [
  { title: "Account Executive", location: "Manchester", employmentType: "Permanent", applicants: 46, status: "Open", postedDate: "15 Aug 2026" },
  { title: "Backend Engineer", location: "London", employmentType: "Permanent", applicants: 52, status: "Open", postedDate: "18 Aug 2026" },
  { title: "Frontend Engineer", location: "London", employmentType: "Permanent", applicants: 48, status: "Open", postedDate: "20 Aug 2026" },
  { title: "Sales Development Rep", location: "Manchester", employmentType: "Fixed Term", applicants: 63, status: "Open", postedDate: "22 Aug 2026" },
  { title: "Platform Engineer", location: "Remote", employmentType: "Contractor", applicants: 21, status: "Open", postedDate: "25 Aug 2026" },
  { title: "Supply Chain Analyst", location: "Birmingham", employmentType: "Permanent", applicants: 18, status: "Open", postedDate: "28 Aug 2026" },
  { title: "Facilities Coordinator", location: "Birmingham", employmentType: "Permanent", applicants: 12, status: "Open", postedDate: "01 Sep 2026" },
  { title: "QA Engineer", location: "London", employmentType: "Permanent", applicants: 34, status: "On Hold", postedDate: "02 Sep 2026" },
  { title: "Talent Acquisition Partner", location: "London", employmentType: "Permanent", applicants: 25, status: "On Hold", postedDate: "03 Sep 2026" },
  { title: "Customer Success Manager", location: "Remote", employmentType: "Permanent", applicants: 27, status: "Open", postedDate: "05 Sep 2026" },
  { title: "Support Specialist", location: "Remote", employmentType: "Permanent", applicants: 58, status: "Open", postedDate: "10 Sep 2026" },
  { title: "Financial Analyst", location: "London", employmentType: "Permanent", applicants: 24, status: "Open", postedDate: "12 Sep 2026" },
];

export const jobs: Job[] = raw.map((seed, index) => {
  const position = positionByTitle.get(seed.title)!;
  return {
    id: `job-${index + 1}`,
    title: position.title,
    department: position.department,
    grade: position.grade,
    location: seed.location,
    employmentType: seed.employmentType,
    openings: position.openings,
    applicants: seed.applicants,
    hiringManager: position.reportsTo,
    salaryBand: position.salaryBand,
    status: seed.status,
    postedDate: seed.postedDate,
  };
});

export const jobDepartments = Array.from(new Set(jobs.map((job) => job.department))).sort();
export const jobStatuses: JobStatus[] = ["Open", "On Hold"];
