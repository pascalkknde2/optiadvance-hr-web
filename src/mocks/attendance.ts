import { employees } from "@/mocks/employees";

export type AttendanceStatus = "Present" | "Remote" | "Late" | "Absent" | "On Leave";

export interface AttendanceRecord {
  employeeId: string;
  employeeName: string;
  avatar: (typeof employees)[number]["avatar"];
  department: string;
  status: AttendanceStatus;
  clockIn: string | null;
  clockOut: string | null;
  hoursWorked: number;
  note?: string;
}

const overrides: Record<string, Partial<AttendanceRecord> & { status: AttendanceStatus }> = {
  // already on leave per the employee directory
  "6": { status: "On Leave", clockIn: null, clockOut: null, hoursWorked: 0, note: "Annual leave" },
  "16": { status: "On Leave", clockIn: null, clockOut: null, hoursWorked: 0, note: "Sick leave" },
  // remote workers
  "8": { status: "Remote", clockIn: "08:52", clockOut: "17:10", hoursWorked: 8.3 },
  "17": { status: "Remote", clockIn: "09:01", clockOut: "17:25", hoursWorked: 8.4 },
  // running late / absent
  "10": { status: "Late", clockIn: "09:38", clockOut: "17:45", hoursWorked: 8.1, note: "Train delay" },
  "19": { status: "Absent", clockIn: null, clockOut: null, hoursWorked: 0, note: "Uncertified absence" },
};

const presentTimes = ["08:47", "08:55", "08:58", "09:02", "08:51", "08:49", "09:04", "08:56", "08:53", "09:00", "08:48", "08:59", "09:03"];
const presentOut = ["17:12", "17:20", "17:05", "17:30", "17:15", "17:08", "17:22", "17:18", "17:10", "17:25", "17:14", "17:19", "17:07"];

let presentIndex = 0;

export const attendanceToday: AttendanceRecord[] = employees
  .filter((employee) => employee.status !== "Inactive")
  .map((employee) => {
    const override = overrides[employee.id];
    if (override) {
      return {
        employeeId: employee.id,
        employeeName: employee.name,
        avatar: employee.avatar,
        department: employee.department,
        clockIn: null,
        clockOut: null,
        hoursWorked: 0,
        ...override,
      };
    }

    const clockIn = presentTimes[presentIndex % presentTimes.length];
    const clockOut = presentOut[presentIndex % presentOut.length];
    presentIndex += 1;

    return {
      employeeId: employee.id,
      employeeName: employee.name,
      avatar: employee.avatar,
      department: employee.department,
      status: "Present" as const,
      clockIn,
      clockOut,
      hoursWorked: 8.2,
    };
  });
