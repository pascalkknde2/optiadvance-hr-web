import type { StaticImageData } from "next/image";

import UserList1 from "@/public/assets/images/user-list/user-list1.png";
import UserList10 from "@/public/assets/images/user-list/user-list10.png";
import UserList2 from "@/public/assets/images/user-list/user-list2.png";
import UserList4 from "@/public/assets/images/user-list/user-list4.png";
import UserList5 from "@/public/assets/images/user-list/user-list5.png";
import UserList6 from "@/public/assets/images/user-list/user-list6.png";
import UserList7 from "@/public/assets/images/user-list/user-list7.png";
import UserList8 from "@/public/assets/images/user-list/user-list8.png";
import UserList9 from "@/public/assets/images/user-list/user-list9.png";

export interface PulseCategory {
  label: string;
  score: number; // out of 5
}

export const enpsScore = 42;
export const pulseParticipation = 87; // % of workforce who responded to the latest pulse survey
export const pulseSurveyPeriod = "September 2026";

export const pulseCategories: PulseCategory[] = [
  { label: "Work-Life Balance", score: 4.1 },
  { label: "Management Support", score: 4.3 },
  { label: "Culture & Values", score: 4.4 },
  { label: "Career Growth", score: 3.6 },
  { label: "Compensation & Benefits", score: 3.4 },
];

export interface RecognitionPost {
  id: string;
  from: string;
  fromAvatar: StaticImageData;
  to: string;
  toAvatar: StaticImageData;
  message: string;
  date: string;
  likes: number;
}

export const recognitionPosts: RecognitionPost[] = [
  { id: "rec-1", from: "Sophie Carter", fromAvatar: UserList1, to: "Priya Nair", toAvatar: UserList5, message: "Priya kept a calm head and a clear plan through a tough incident week — the whole support team followed her lead.", date: "19 Sep 2026", likes: 14 },
  { id: "rec-2", from: "Daniel Osei", fromAvatar: UserList2, to: "Yuki Tanaka", toAvatar: UserList7, message: "Shipped the payments retry logic a full sprint early, with tests that caught two edge cases the rest of us missed.", date: "17 Sep 2026", likes: 11 },
  { id: "rec-3", from: "Grace Adeyemi", fromAvatar: UserList6, to: "Kwame Mensah", toAvatar: UserList9, message: "Kwame's supplier renegotiation saved us a genuinely meaningful amount on the Q4 logistics contract.", date: "15 Sep 2026", likes: 9 },
  { id: "rec-4", from: "Ella Thompson", fromAvatar: UserList4, to: "Meera Patel", toAvatar: UserList8, message: "Meera closed out September payroll without a single query — cleanest run this year.", date: "12 Sep 2026", likes: 8 },
  { id: "rec-5", from: "Marcus Reid", fromAvatar: UserList10, to: "Liam Fitzgerald", toAvatar: UserList2, message: "Liam turned around the Meridian account after a rocky start — they've since doubled their order size.", date: "10 Sep 2026", likes: 12 },
];

export const openSuggestions = 6;
