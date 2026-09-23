import { employees } from "@/mocks/employees";

export type BenefitCategory = "Pension" | "Insurance" | "Wellbeing" | "Allowance";

export interface BenefitPlan {
  id: string;
  name: string;
  category: BenefitCategory;
  provider: string;
  enrolled: number;
  eligible: number;
  employerCost: string;
  employeeCost: string;
}

const activeEmployees = employees.filter((employee) => employee.status !== "Inactive").length;

// Employee pension contribution matches PENSION_RATE in mocks/payslips.ts
// (5%), so this page never disagrees with Payroll > Payslips.
const raw: Omit<BenefitPlan, "id" | "eligible">[] = [
  { name: "Workplace Pension", category: "Pension", provider: "NEST", enrolled: activeEmployees, employerCost: "3% of salary", employeeCost: "5% of salary" },
  { name: "Death in Service (4x salary)", category: "Insurance", provider: "Aviva", enrolled: activeEmployees, employerCost: "£12 / employee / month", employeeCost: "Free" },
  { name: "Private Health Insurance", category: "Insurance", provider: "Vitality", enrolled: 14, employerCost: "£68 / employee / month", employeeCost: "Optional family top-up" },
  { name: "Dental Cashback Plan", category: "Insurance", provider: "Denplan", enrolled: 8, employerCost: "£0", employeeCost: "£9 / month" },
  { name: "Cycle to Work Scheme", category: "Allowance", provider: "Cyclescheme", enrolled: 5, employerCost: "Salary sacrifice — no employer cost", employeeCost: "Spread over 12 months" },
  { name: "Gym Membership Discount", category: "Wellbeing", provider: "Gympass", enrolled: 11, employerCost: "£0", employeeCost: "From £15 / month" },
  { name: "Employee Assistance Programme", category: "Wellbeing", provider: "Health Assured", enrolled: activeEmployees, employerCost: "£4 / employee / month", employeeCost: "Free" },
];

export const benefitPlans: BenefitPlan[] = raw.map((plan, index) => ({
  id: `benefit-${index + 1}`,
  eligible: activeEmployees,
  ...plan,
}));

export const benefitCategories: BenefitCategory[] = ["Pension", "Insurance", "Wellbeing", "Allowance"];
export const eligibleEmployees = activeEmployees;
