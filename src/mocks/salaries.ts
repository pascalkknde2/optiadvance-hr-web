import { addMonths, subMonths } from "date-fns";

import { employees } from "@/mocks/employees";
import { positions } from "@/mocks/positions";

export interface SalaryRecord {
  employeeId: string;
  employeeName: string;
  avatar: (typeof employees)[number]["avatar"];
  department: string;
  position: string;
  grade: string;
  annualSalary: number;
  lastReviewDate: string;
  nextReviewDate: string;
  changePercent: number;
}

// Annual salary for each employee, kept inside their position's band in
// positions.ts.
const annualSalaryByEmployeeId: Record<string, number> = {
  "1": 74000, // Amara Okafor — Senior Software Engineer
  "2": 88000, // Daniel Osei — Engineering Manager
  "3": 92000, // Sophie Carter — Head of People
  "4": 46000, // Liam Fitzgerald — Account Executive
  "5": 54000, // Priya Nair — Support Team Lead
  "6": 45000, // Tomasz Wojcik — Financial Analyst
  "7": 78000, // Grace Adeyemi — Operations Manager
  "8": 58000, // Chen Wei — Platform Engineer
  "9": 39500, // Meera Patel — Payroll Specialist
  "10": 29500, // Jack Sullivan — Sales Development Rep
  "11": 49500, // Olivia Bennett — Frontend Engineer
  "13": 29000, // Isabella Rossi — Support Specialist
  "14": 44000, // Noah Williams — QA Engineer
  "15": 43000, // Freya Johansson — Talent Acquisition Partner
  "16": 82000, // Marcus Reid — Regional Sales Manager
  "17": 52000, // Yuki Tanaka — Backend Engineer
  "18": 62000, // Ella Thompson — Finance Business Partner
  "19": 31000, // Kwame Mensah — Supply Chain Analyst
  "20": 42000, // Charlotte Dubois — Customer Success Manager
};

const changePercentPattern = [3.0, 4.5, 2.8, 5.2, 3.7, 4.0, 2.5, 6.0, 3.3, 4.8];

const positionByTitle = new Map(positions.map((position) => [position.title, position]));
const now = new Date();

export const salaries: SalaryRecord[] = employees
  .filter((employee) => employee.status !== "Inactive")
  .map((employee, index) => {
    const position = positionByTitle.get(employee.position);
    const lastReviewDate = subMonths(now, (index % 12) + 1);
    const nextReviewDate = addMonths(lastReviewDate, 12);

    return {
      employeeId: employee.id,
      employeeName: employee.name,
      avatar: employee.avatar,
      department: employee.department,
      position: employee.position,
      grade: position?.grade ?? "Mid",
      annualSalary: annualSalaryByEmployeeId[employee.id] ?? 40000,
      lastReviewDate: lastReviewDate.toISOString(),
      nextReviewDate: nextReviewDate.toISOString(),
      changePercent: changePercentPattern[index % changePercentPattern.length],
    };
  });
