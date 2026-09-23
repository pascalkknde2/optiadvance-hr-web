import { employees } from "@/mocks/employees";

export type ExpenseCategory = "Travel" | "Meals & Entertainment" | "Equipment" | "Software & Subscriptions" | "Mileage" | "Other";
export type ExpenseStatus = "Pending" | "Approved" | "Rejected" | "Reimbursed";

export interface ExpenseClaim {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar: (typeof employees)[number]["avatar"];
  department: string;
  category: ExpenseCategory;
  description: string;
  date: string;
  amount: number;
  status: ExpenseStatus;
  note?: string;
}

const byId = new Map(employees.map((employee) => [employee.id, employee]));

const raw: Omit<ExpenseClaim, "employeeName" | "avatar" | "department">[] = [
  { id: "ex-1", employeeId: "1", category: "Equipment", description: "Replacement laptop charger", date: "05 Sep 2026", amount: 45.0, status: "Approved" },
  { id: "ex-2", employeeId: "2", category: "Travel", description: "Client site visit — train tickets", date: "10 Sep 2026", amount: 128.5, status: "Reimbursed" },
  { id: "ex-3", employeeId: "4", category: "Meals & Entertainment", description: "Client lunch — Acme Corp", date: "12 Sep 2026", amount: 86.4, status: "Approved" },
  { id: "ex-4", employeeId: "10", category: "Mileage", description: "Site visits — 142 miles", date: "15 Sep 2026", amount: 63.9, status: "Pending" },
  { id: "ex-5", employeeId: "5", category: "Software & Subscriptions", description: "Zendesk add-on licence", date: "08 Sep 2026", amount: 29.0, status: "Approved" },
  { id: "ex-6", employeeId: "18", category: "Travel", description: "Conference travel — Manchester", date: "18 Sep 2026", amount: 214.0, status: "Pending" },
  { id: "ex-7", employeeId: "8", category: "Equipment", description: "External monitor", date: "20 Sep 2026", amount: 189.99, status: "Pending" },
  { id: "ex-8", employeeId: "16", category: "Meals & Entertainment", description: "Team dinner — Q3 wins", date: "14 Sep 2026", amount: 312.0, status: "Rejected", note: "Exceeds team meal policy limit — resubmit under £250" },
  { id: "ex-9", employeeId: "7", category: "Travel", description: "Warehouse site visit — mileage & parking", date: "17 Sep 2026", amount: 54.2, status: "Approved" },
  { id: "ex-10", employeeId: "15", category: "Software & Subscriptions", description: "LinkedIn Recruiter add-on", date: "09 Sep 2026", amount: 99.0, status: "Reimbursed" },
  { id: "ex-11", employeeId: "13", category: "Other", description: "Home office supplies", date: "11 Sep 2026", amount: 38.75, status: "Approved" },
  { id: "ex-12", employeeId: "11", category: "Equipment", description: "Ergonomic keyboard", date: "21 Sep 2026", amount: 72.5, status: "Pending" },
  { id: "ex-13", employeeId: "9", category: "Travel", description: "Payroll audit trip — Birmingham", date: "07 Sep 2026", amount: 96.3, status: "Reimbursed" },
  { id: "ex-14", employeeId: "17", category: "Mileage", description: "Client demo travel — 68 miles", date: "19 Sep 2026", amount: 30.6, status: "Approved" },
];

export const expenseClaims: ExpenseClaim[] = raw.map((claim) => {
  const employee = byId.get(claim.employeeId)!;
  return {
    ...claim,
    employeeName: employee.name,
    avatar: employee.avatar,
    department: employee.department,
  };
});

export const expenseCategories: ExpenseCategory[] = [
  "Travel",
  "Meals & Entertainment",
  "Equipment",
  "Software & Subscriptions",
  "Mileage",
  "Other",
];
