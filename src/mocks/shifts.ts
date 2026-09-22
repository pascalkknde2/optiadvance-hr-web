import { employees } from "@/mocks/employees";

export type ShiftCode = "Morning" | "Day" | "Evening" | "Off";

export interface ShiftType {
  code: ShiftCode;
  label: string;
  time: string;
  color: string;
}

export const shiftTypes: ShiftType[] = [
  { code: "Morning", label: "Morning Shift", time: "06:00 – 14:00", color: "bg-yellow-500" },
  { code: "Day", label: "Day Shift", time: "09:00 – 17:00", color: "bg-primary" },
  { code: "Evening", label: "Evening Shift", time: "14:00 – 22:00", color: "bg-violet-600" },
];

export interface ShiftRoster {
  employeeId: string;
  employeeName: string;
  avatar: (typeof employees)[number]["avatar"];
  department: string;
  days: ShiftCode[]; // Mon–Fri
}

export const shiftWeek = "22–26 Sep 2026";

const dayShiftAllWeek: ShiftCode[] = ["Day", "Day", "Day", "Day", "Day"];

const overrides: Record<string, ShiftCode[]> = {
  // Customer Support rotation (Priya Nair, the team lead, stays on Day — see default)
  "13": ["Morning", "Morning", "Day", "Evening", "Evening"], // Isabella Rossi
  "20": ["Evening", "Evening", "Day", "Morning", "Morning"], // Charlotte Dubois
  // Operations coverage (Grace Adeyemi, the manager, stays on Day — see default)
  "19": ["Morning", "Morning", "Morning", "Day", "Day"], // Kwame Mensah
  // employees currently on leave are off-roster for the week
  "6": ["Off", "Off", "Off", "Off", "Off"],
  "16": ["Off", "Off", "Off", "Off", "Off"],
};

export const shiftRoster: ShiftRoster[] = employees
  .filter((employee) => employee.status !== "Inactive")
  .map((employee) => ({
    employeeId: employee.id,
    employeeName: employee.name,
    avatar: employee.avatar,
    department: employee.department,
    days: overrides[employee.id] ?? dayShiftAllWeek,
  }));
