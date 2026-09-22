import { employees } from "@/mocks/employees";

export type OvertimeStatus = "Pending" | "Approved" | "Rejected" | "Paid";

export interface OvertimeRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar: (typeof employees)[number]["avatar"];
  department: string;
  date: string;
  hours: number;
  rate: number; // £ per hour
  reason: string;
  status: OvertimeStatus;
  note?: string;
}

const byId = new Map(employees.map((employee) => [employee.id, employee]));

const raw: Omit<OvertimeRequest, "employeeName" | "avatar" | "department">[] = [
  { id: "ot-1", employeeId: "17", date: "15 Sep 2026", hours: 5, rate: 25, reason: "Production incident response", status: "Approved" }, // Yuki Tanaka
  { id: "ot-2", employeeId: "14", date: "16 Sep 2026", hours: 3, rate: 25, reason: "Regression testing before release", status: "Approved" }, // Noah Williams
  { id: "ot-3", employeeId: "8", date: "18 Sep 2026", hours: 4, rate: 25, reason: "Platform migration cutover", status: "Paid" }, // Chen Wei
  { id: "ot-4", employeeId: "19", date: "17 Sep 2026", hours: 6, rate: 18, reason: "Warehouse stocktake", status: "Approved" }, // Kwame Mensah
  { id: "ot-5", employeeId: "10", date: "19 Sep 2026", hours: 2, rate: 18, reason: "Client demo preparation", status: "Pending" }, // Jack Sullivan
  { id: "ot-6", employeeId: "4", date: "20 Sep 2026", hours: 3, rate: 25, reason: "Quarter-end client calls", status: "Pending" }, // Liam Fitzgerald
  { id: "ot-7", employeeId: "13", date: "16 Sep 2026", hours: 4, rate: 18, reason: "Evening coverage during service outage", status: "Approved" }, // Isabella Rossi
  { id: "ot-8", employeeId: "20", date: "21 Sep 2026", hours: 2.5, rate: 25, reason: "Escalation follow-up", status: "Pending" }, // Charlotte Dubois
  { id: "ot-9", employeeId: "9", date: "12 Sep 2026", hours: 5, rate: 25, reason: "Payroll processing", status: "Paid" }, // Meera Patel
  { id: "ot-10", employeeId: "18", date: "22 Sep 2026", hours: 3, rate: 35, reason: "Month-end close", status: "Pending" }, // Ella Thompson
  { id: "ot-11", employeeId: "15", date: "14 Sep 2026", hours: 2, rate: 25, reason: "Interview panel coverage", status: "Rejected", note: "Use TOIL instead" }, // Freya Johansson
  { id: "ot-12", employeeId: "7", date: "19 Sep 2026", hours: 4, rate: 45, reason: "Facilities emergency callout", status: "Approved" }, // Grace Adeyemi
];

export const overtimeRequests: OvertimeRequest[] = raw.map((request) => {
  const employee = byId.get(request.employeeId)!;
  return {
    ...request,
    employeeName: employee.name,
    avatar: employee.avatar,
    department: employee.department,
  };
});
