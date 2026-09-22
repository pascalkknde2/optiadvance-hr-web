import { employees } from "@/mocks/employees";
import { leaveRequests } from "@/mocks/leave";

export interface LeaveBalance {
  employeeId: string;
  employeeName: string;
  avatar: (typeof employees)[number]["avatar"];
  department: string;
  entitlement: number;
  used: number;
  remaining: number;
  percentUsed: number;
}

const ANNUAL_ENTITLEMENT = 25;

// Days already taken earlier in the leave year, before the requests tracked
// on the Leave Requests page (deterministic, not random, for stable output).
const baseUsedByIndex = [9, 11, 13, 15, 10, 12, 14, 8, 16, 10, 12, 9, 13, 11, 15, 10, 12, 14, 8];

export const leaveBalances: LeaveBalance[] = employees
  .filter((employee) => employee.status !== "Inactive")
  .map((employee, index) => {
    const approvedAnnualDays = leaveRequests
      .filter(
        (request) =>
          request.employeeId === employee.id &&
          request.type === "Annual Leave" &&
          request.status === "Approved"
      )
      .reduce((sum, request) => sum + request.days, 0);

    const used = Math.min(ANNUAL_ENTITLEMENT, baseUsedByIndex[index % baseUsedByIndex.length] + approvedAnnualDays);
    const remaining = ANNUAL_ENTITLEMENT - used;

    return {
      employeeId: employee.id,
      employeeName: employee.name,
      avatar: employee.avatar,
      department: employee.department,
      entitlement: ANNUAL_ENTITLEMENT,
      used,
      remaining,
      percentUsed: Math.round((used / ANNUAL_ENTITLEMENT) * 100),
    };
  });
