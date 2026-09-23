import { employees } from "@/mocks/employees";

export type GoalType = "Individual" | "Team" | "Company";
export type GoalStatus = "On Track" | "At Risk" | "Completed" | "Not Started";

export interface Goal {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar: (typeof employees)[number]["avatar"];
  department: string;
  title: string;
  type: GoalType;
  cycle: string;
  progress: number;
  status: GoalStatus;
  dueDate: string;
}

const byId = new Map(employees.map((employee) => [employee.id, employee]));

const raw: Omit<Goal, "employeeName" | "avatar" | "department">[] = [
  { id: "g-1", employeeId: "1", title: "Ship v2 of the reporting API", type: "Individual", cycle: "Q3 2026", progress: 85, status: "On Track", dueDate: "30 Sep 2026" },
  { id: "g-2", employeeId: "2", title: "Grow engineering team to 8 engineers", type: "Team", cycle: "Q3 2026", progress: 75, status: "On Track", dueDate: "30 Sep 2026" },
  { id: "g-3", employeeId: "3", title: "Launch new starter onboarding programme", type: "Company", cycle: "Q3 2026", progress: 100, status: "Completed", dueDate: "15 Sep 2026" },
  { id: "g-4", employeeId: "4", title: "Close £150k in new business", type: "Individual", cycle: "Q3 2026", progress: 62, status: "At Risk", dueDate: "30 Sep 2026" },
  { id: "g-5", employeeId: "5", title: "Reduce average first-response time to under 2h", type: "Team", cycle: "Q3 2026", progress: 90, status: "On Track", dueDate: "30 Sep 2026" },
  { id: "g-6", employeeId: "7", title: "Roll out new supplier onboarding process", type: "Team", cycle: "Q3 2026", progress: 40, status: "At Risk", dueDate: "30 Sep 2026" },
  { id: "g-7", employeeId: "8", title: "Complete platform migration to new infra", type: "Individual", cycle: "Q3 2026", progress: 95, status: "On Track", dueDate: "30 Sep 2026" },
  { id: "g-8", employeeId: "18", title: "Implement quarterly board reporting pack", type: "Company", cycle: "Q4 2026", progress: 10, status: "Not Started", dueDate: "20 Dec 2026" },
  { id: "g-9", employeeId: "16", title: "Expand into 2 new regional accounts", type: "Team", cycle: "Q3 2026", progress: 55, status: "At Risk", dueDate: "30 Sep 2026" },
  { id: "g-10", employeeId: "15", title: "Reduce time-to-hire to 21 days", type: "Team", cycle: "Q3 2026", progress: 70, status: "On Track", dueDate: "30 Sep 2026" },
  { id: "g-11", employeeId: "14", title: "Achieve 90% automated test coverage", type: "Individual", cycle: "Q3 2026", progress: 80, status: "On Track", dueDate: "30 Sep 2026" },
  { id: "g-12", employeeId: "13", title: "Complete advanced support certification", type: "Individual", cycle: "Q4 2026", progress: 15, status: "Not Started", dueDate: "15 Nov 2026" },
  { id: "g-13", employeeId: "9", title: "Migrate payroll to new processing schedule", type: "Team", cycle: "Q3 2026", progress: 100, status: "Completed", dueDate: "10 Sep 2026" },
  { id: "g-14", employeeId: "17", title: "Launch API v2 public docs", type: "Individual", cycle: "Q3 2026", progress: 30, status: "At Risk", dueDate: "30 Sep 2026" },
];

export const goals: Goal[] = raw.map((goal) => {
  const employee = byId.get(goal.employeeId)!;
  return {
    ...goal,
    employeeName: employee.name,
    avatar: employee.avatar,
    department: employee.department,
  };
});

export const goalTypes: GoalType[] = ["Individual", "Team", "Company"];
export const goalStatuses: GoalStatus[] = ["On Track", "At Risk", "Completed", "Not Started"];
