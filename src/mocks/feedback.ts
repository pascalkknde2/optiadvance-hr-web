import { employees } from "@/mocks/employees";

export type FeedbackType = "Peer" | "Manager" | "Upward" | "Kudos";

export interface FeedbackEntry {
  id: string;
  fromId: string;
  fromName: string;
  fromAvatar: (typeof employees)[number]["avatar"];
  toId: string;
  toName: string;
  toAvatar: (typeof employees)[number]["avatar"];
  type: FeedbackType;
  message: string;
  date: string;
}

const byId = new Map(employees.map((employee) => [employee.id, employee]));

const raw: { id: string; fromId: string; toId: string; type: FeedbackType; message: string; date: string }[] = [
  { id: "fb-1", fromId: "2", toId: "1", type: "Manager", message: "Amara's work on the reporting API has been outstanding — clean, well-tested, and delivered ahead of schedule.", date: "18 Sep 2026" },
  { id: "fb-2", fromId: "1", toId: "17", type: "Peer", message: "Yuki jumped on the production incident without hesitation and had it resolved in under an hour. Huge thanks.", date: "16 Sep 2026" },
  { id: "fb-3", fromId: "7", toId: "19", type: "Manager", message: "Kwame handled the warehouse stocktake single-handedly and it went smoothly. Really reliable.", date: "18 Sep 2026" },
  { id: "fb-4", fromId: "3", toId: "15", type: "Manager", message: "Freya's new onboarding flow is already getting great feedback from new starters.", date: "15 Sep 2026" },
  { id: "fb-5", fromId: "5", toId: "13", type: "Manager", message: "Isabella covered the evening shift during the outage without being asked. That's real ownership.", date: "17 Sep 2026" },
  { id: "fb-6", fromId: "4", toId: "16", type: "Upward", message: "Would love more visibility into pipeline targets earlier in the quarter — it would help us prioritise better.", date: "12 Sep 2026" },
  { id: "fb-7", fromId: "9", toId: "18", type: "Peer", message: "Ella's board reporting pack template saved me hours this month.", date: "20 Sep 2026" },
  { id: "fb-8", fromId: "14", toId: "2", type: "Upward", message: "More pairing time on the migration work would really help new team members ramp up faster.", date: "14 Sep 2026" },
  { id: "fb-9", fromId: "8", toId: "1", type: "Peer", message: "Amara's code reviews are thorough and always teach me something new.", date: "19 Sep 2026" },
  { id: "fb-10", fromId: "11", toId: "8", type: "Kudos", message: "Massive congrats on shipping the platform migration — flawless cutover!", date: "18 Sep 2026" },
  { id: "fb-11", fromId: "10", toId: "4", type: "Peer", message: "Liam's demo prep notes made my first client call so much easier.", date: "13 Sep 2026" },
  { id: "fb-12", fromId: "18", toId: "9", type: "Manager", message: "Meera's payroll schedule migration was executed without a single issue. Excellent work.", date: "21 Sep 2026" },
];

export const feedbackEntries: FeedbackEntry[] = raw.map((entry) => {
  const from = byId.get(entry.fromId)!;
  const to = byId.get(entry.toId)!;
  return {
    id: entry.id,
    fromId: entry.fromId,
    fromName: from.name,
    fromAvatar: from.avatar,
    toId: entry.toId,
    toName: to.name,
    toAvatar: to.avatar,
    type: entry.type,
    message: entry.message,
    date: entry.date,
  };
});

export const feedbackTypes: FeedbackType[] = ["Peer", "Manager", "Upward", "Kudos"];
