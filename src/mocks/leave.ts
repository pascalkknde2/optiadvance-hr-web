import { eachDayOfInterval, parse } from "date-fns";

import { employees } from "@/mocks/employees";

export type LeaveType = "Annual Leave" | "Sick Leave" | "Parental Leave" | "Unpaid Leave";
export type LeaveStatus = "Pending" | "Approved" | "Rejected";

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar: (typeof employees)[number]["avatar"];
  department: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  status: LeaveStatus;
  note?: string;
}

const byId = new Map(employees.map((employee) => [employee.id, employee]));

// Tomasz Wojcik and Marcus Reid are the two employees already shown as
// "On Leave" across the employee directory, attendance and timesheets pages.
const raw: Omit<LeaveRequest, "employeeName" | "avatar" | "department">[] = [
  { id: "lv-1", employeeId: "6", type: "Annual Leave", startDate: "17 Sep 2026", endDate: "19 Sep 2026", days: 3, status: "Approved" },
  { id: "lv-2", employeeId: "16", type: "Sick Leave", startDate: "15 Sep 2026", endDate: "16 Sep 2026", days: 2, status: "Approved" },
  { id: "lv-3", employeeId: "1", type: "Annual Leave", startDate: "05 Oct 2026", endDate: "09 Oct 2026", days: 5, status: "Pending" },
  { id: "lv-4", employeeId: "2", type: "Annual Leave", startDate: "28 Sep 2026", endDate: "02 Oct 2026", days: 5, status: "Approved" },
  { id: "lv-5", employeeId: "4", type: "Unpaid Leave", startDate: "30 Sep 2026", endDate: "30 Sep 2026", days: 1, status: "Pending", note: "Personal appointment" },
  { id: "lv-6", employeeId: "5", type: "Annual Leave", startDate: "12 Oct 2026", endDate: "16 Oct 2026", days: 5, status: "Approved" },
  { id: "lv-7", employeeId: "7", type: "Sick Leave", startDate: "21 Sep 2026", endDate: "21 Sep 2026", days: 1, status: "Approved" },
  { id: "lv-8", employeeId: "8", type: "Annual Leave", startDate: "06 Oct 2026", endDate: "10 Oct 2026", days: 5, status: "Pending" },
  { id: "lv-9", employeeId: "9", type: "Parental Leave", startDate: "01 Oct 2026", endDate: "23 Dec 2026", days: 60, status: "Approved" },
  { id: "lv-10", employeeId: "15", type: "Annual Leave", startDate: "23 Sep 2026", endDate: "25 Sep 2026", days: 3, status: "Rejected", note: "Clashes with interview panel — please reschedule" },
  { id: "lv-11", employeeId: "10", type: "Unpaid Leave", startDate: "02 Oct 2026", endDate: "02 Oct 2026", days: 1, status: "Pending" },
  { id: "lv-12", employeeId: "18", type: "Annual Leave", startDate: "19 Oct 2026", endDate: "20 Oct 2026", days: 2, status: "Approved" },
];

export const leaveRequests: LeaveRequest[] = raw.map((request) => {
  const employee = byId.get(request.employeeId)!;
  return {
    ...request,
    employeeName: employee.name,
    avatar: employee.avatar,
    department: employee.department,
  };
});

export const leaveTypeColors: Record<LeaveType, string> = {
  "Annual Leave": "bg-primary/15 text-primary border-primary",
  "Sick Leave": "bg-red-500/15 text-red-500 border-red-500",
  "Parental Leave": "bg-violet-600/15 text-violet-600 border-violet-600",
  "Unpaid Leave": "bg-yellow-500/15 text-yellow-600 border-yellow-500",
};

export const leaveTypeDotColors: Record<LeaveType, string> = {
  "Annual Leave": "bg-primary",
  "Sick Leave": "bg-red-500",
  "Parental Leave": "bg-violet-600",
  "Unpaid Leave": "bg-yellow-500",
};

export interface LeaveDayEvent {
  date: Date;
  employeeId: string;
  employeeName: string;
  type: LeaveType;
}

// Expand each approved request's date range into one entry per calendar day,
// for the month-view calendar.
export const leaveDayEvents: LeaveDayEvent[] = leaveRequests
  .filter((request) => request.status === "Approved")
  .flatMap((request) => {
    const start = parse(request.startDate, "dd MMM yyyy", new Date());
    const end = parse(request.endDate, "dd MMM yyyy", new Date());
    return eachDayOfInterval({ start, end }).map((date) => ({
      date,
      employeeId: request.employeeId,
      employeeName: request.employeeName,
      type: request.type,
    }));
  });
