export type PositionGrade = "Leadership" | "Senior" | "Mid" | "Junior";

export interface Position {
  title: string;
  department: string;
  grade: PositionGrade;
  headcount: number;
  openings: number;
  salaryBand: string;
  reportsTo: string;
}

export const positions: Position[] = [
  // Engineering
  { title: "Engineering Manager", department: "Engineering", grade: "Leadership", headcount: 1, openings: 0, salaryBand: "£80,000 – £100,000", reportsTo: "Executive Team" },
  { title: "Senior Software Engineer", department: "Engineering", grade: "Senior", headcount: 1, openings: 0, salaryBand: "£65,000 – £80,000", reportsTo: "Engineering Manager" },
  { title: "Backend Engineer", department: "Engineering", grade: "Mid", headcount: 1, openings: 2, salaryBand: "£45,000 – £58,000", reportsTo: "Engineering Manager" },
  { title: "Frontend Engineer", department: "Engineering", grade: "Mid", headcount: 1, openings: 2, salaryBand: "£45,000 – £58,000", reportsTo: "Engineering Manager" },
  { title: "Platform Engineer", department: "Engineering", grade: "Mid", headcount: 1, openings: 1, salaryBand: "£48,000 – £62,000", reportsTo: "Engineering Manager" },
  { title: "QA Engineer", department: "Engineering", grade: "Mid", headcount: 1, openings: 1, salaryBand: "£38,000 – £50,000", reportsTo: "Engineering Manager" },

  // Operations
  { title: "Operations Manager", department: "Operations", grade: "Leadership", headcount: 1, openings: 0, salaryBand: "£70,000 – £90,000", reportsTo: "Executive Team" },
  { title: "Supply Chain Analyst", department: "Operations", grade: "Junior", headcount: 1, openings: 1, salaryBand: "£28,000 – £36,000", reportsTo: "Operations Manager" },
  { title: "Facilities Coordinator", department: "Operations", grade: "Junior", headcount: 1, openings: 1, salaryBand: "£26,000 – £32,000", reportsTo: "Operations Manager" },

  // Sales
  { title: "Regional Sales Manager", department: "Sales", grade: "Leadership", headcount: 1, openings: 0, salaryBand: "£75,000 – £95,000 + OTE", reportsTo: "Executive Team" },
  { title: "Account Executive", department: "Sales", grade: "Mid", headcount: 1, openings: 2, salaryBand: "£42,000 – £55,000 + OTE", reportsTo: "Regional Sales Manager" },
  { title: "Sales Development Rep", department: "Sales", grade: "Junior", headcount: 1, openings: 2, salaryBand: "£28,000 – £36,000 + OTE", reportsTo: "Regional Sales Manager" },

  // Customer Support
  { title: "Support Team Lead", department: "Customer Support", grade: "Senior", headcount: 1, openings: 0, salaryBand: "£48,000 – £58,000", reportsTo: "Executive Team" },
  { title: "Customer Success Manager", department: "Customer Support", grade: "Mid", headcount: 1, openings: 1, salaryBand: "£38,000 – £48,000", reportsTo: "Support Team Lead" },
  { title: "Support Specialist", department: "Customer Support", grade: "Junior", headcount: 1, openings: 2, salaryBand: "£26,000 – £33,000", reportsTo: "Support Team Lead" },

  // Finance
  { title: "Finance Business Partner", department: "Finance", grade: "Senior", headcount: 1, openings: 0, salaryBand: "£55,000 – £68,000", reportsTo: "Executive Team" },
  { title: "Financial Analyst", department: "Finance", grade: "Mid", headcount: 1, openings: 1, salaryBand: "£40,000 – £50,000", reportsTo: "Finance Business Partner" },
  { title: "Payroll Specialist", department: "Finance", grade: "Mid", headcount: 1, openings: 0, salaryBand: "£36,000 – £45,000", reportsTo: "Finance Business Partner" },

  // People & Talent
  { title: "Head of People", department: "People & Talent", grade: "Leadership", headcount: 1, openings: 0, salaryBand: "£80,000 – £100,000", reportsTo: "Executive Team" },
  { title: "Talent Acquisition Partner", department: "People & Talent", grade: "Mid", headcount: 1, openings: 2, salaryBand: "£40,000 – £52,000", reportsTo: "Head of People" },
];

export const positionDepartments = Array.from(new Set(positions.map((position) => position.department))).sort();
