import type { StaticImageData } from "next/image";

import UserList1 from "@/public/assets/images/user-list/user-list1.png";
import UserList2 from "@/public/assets/images/user-list/user-list2.png";
import UserList3 from "@/public/assets/images/user-list/user-list3.png";
import UserList4 from "@/public/assets/images/user-list/user-list4.png";
import UserList5 from "@/public/assets/images/user-list/user-list5.png";

import { candidates } from "@/mocks/candidates";

export type OnboardingStatus = "Not Started" | "In Progress" | "Completed";

export const CHECKLIST_ITEMS = [
  "Contract signed",
  "Right-to-work documents verified",
  "Equipment assigned",
  "System accounts provisioned",
  "Induction training assigned",
  "Probation review scheduled",
] as const;

export interface NewHire {
  id: string;
  name: string;
  avatar: StaticImageData;
  jobTitle: string;
  department: string;
  startDate: string;
  buddy: string;
  tasksDone: number;
  status: OnboardingStatus;
}

const statusFor = (tasksDone: number): OnboardingStatus => {
  if (tasksDone === 0) return "Not Started";
  if (tasksDone === CHECKLIST_ITEMS.length) return "Completed";
  return "In Progress";
};

interface NewHireSeed {
  name: string;
  avatar: StaticImageData;
  jobTitle: string;
  department: string;
  startDate: string;
  buddy: string;
  tasksDone: number;
}

// Sienna Blackwood and Aleksander Nowak are the two "Hired" candidates from
// the Recruitment module (mocks/candidates.ts) — their offer start dates
// become their onboarding start dates here, so the two modules agree.
const hiredCandidate = (name: string) => candidates.find((candidate) => candidate.name === name)!;

const raw: NewHireSeed[] = [
  { name: "Priya Shah", avatar: UserList1, jobTitle: "Support Specialist", department: "Customer Support", startDate: "01 Sep 2026", buddy: "Priya Nair", tasksDone: 6 },
  { name: "Tom Reilly", avatar: UserList2, jobTitle: "Financial Analyst", department: "Finance", startDate: "08 Sep 2026", buddy: "Ella Thompson", tasksDone: 4 },
  { name: "Grace Kim", avatar: UserList3, jobTitle: "Frontend Engineer", department: "Engineering", startDate: "15 Sep 2026", buddy: "Daniel Osei", tasksDone: 3 },
  { name: hiredCandidate("Sienna Blackwood").name, avatar: UserList4, jobTitle: hiredCandidate("Sienna Blackwood").jobTitle, department: hiredCandidate("Sienna Blackwood").department, startDate: "13 Oct 2026", buddy: "Marcus Reid", tasksDone: 0 },
  { name: hiredCandidate("Aleksander Nowak").name, avatar: UserList5, jobTitle: hiredCandidate("Aleksander Nowak").jobTitle, department: hiredCandidate("Aleksander Nowak").department, startDate: "05 Oct 2026", buddy: "Daniel Osei", tasksDone: 0 },
];

export const newHires: NewHire[] = raw.map((seed, index) => ({
  id: `hire-${index + 1}`,
  name: seed.name,
  avatar: seed.avatar,
  jobTitle: seed.jobTitle,
  department: seed.department,
  startDate: seed.startDate,
  buddy: seed.buddy,
  tasksDone: seed.tasksDone,
  status: statusFor(seed.tasksDone),
}));
