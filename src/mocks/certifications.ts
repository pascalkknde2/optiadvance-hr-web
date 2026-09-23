import { differenceInCalendarDays, parse } from "date-fns";

import { employees } from "@/mocks/employees";

export type CertificationCategory = "Technical" | "Compliance" | "Leadership" | "Domain";
export type CertificationStatus = "Valid" | "Expiring Soon" | "Expired";

export interface Certification {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar: (typeof employees)[number]["avatar"];
  department: string;
  name: string;
  issuingBody: string;
  category: CertificationCategory;
  issueDate: string;
  expiryDate: string | null;
  status: CertificationStatus;
}

interface CertificationSeed {
  employeeName: string;
  name: string;
  issuingBody: string;
  category: CertificationCategory;
  issueDate: string;
  expiryDate: string | null;
}

const employeeByName = new Map(employees.map((employee) => [employee.name, employee]));

const parseDate = (date: string) => parse(date, "dd MMM yyyy", new Date());

const statusFor = (expiryDate: string | null): CertificationStatus => {
  if (!expiryDate) return "Valid";
  const days = differenceInCalendarDays(parseDate(expiryDate), new Date());
  if (days < 0) return "Expired";
  if (days <= 60) return "Expiring Soon";
  return "Valid";
};

const raw: CertificationSeed[] = [
  { employeeName: "Amara Okafor", name: "AWS Certified Solutions Architect – Associate", issuingBody: "Amazon Web Services", category: "Technical", issueDate: "15 Jan 2025", expiryDate: "15 Jan 2028" },
  { employeeName: "Chen Wei", name: "Certified Kubernetes Administrator (CKA)", issuingBody: "Cloud Native Computing Foundation", category: "Technical", issueDate: "02 Nov 2024", expiryDate: "02 Nov 2026" },
  { employeeName: "Yuki Tanaka", name: "AWS Certified Developer – Associate", issuingBody: "Amazon Web Services", category: "Technical", issueDate: "20 Jun 2023", expiryDate: "20 Jun 2026" },
  { employeeName: "Daniel Osei", name: "Certified ScrumMaster (CSM)", issuingBody: "Scrum Alliance", category: "Leadership", issueDate: "10 Mar 2024", expiryDate: "10 Mar 2026" },
  { employeeName: "Noah Williams", name: "ISTQB Certified Tester – Foundation Level", issuingBody: "ISTQB", category: "Technical", issueDate: "05 May 2022", expiryDate: null },
  { employeeName: "Meera Patel", name: "CIPP/E — Certified Information Privacy Professional/Europe", issuingBody: "IAPP", category: "Compliance", issueDate: "12 Sep 2025", expiryDate: "12 Sep 2027" },
  { employeeName: "Ella Thompson", name: "ACCA — Association of Chartered Certified Accountants", issuingBody: "ACCA", category: "Domain", issueDate: "18 Jul 2019", expiryDate: null },
  { employeeName: "Tomasz Wojcik", name: "CIMA — Chartered Institute of Management Accountants", issuingBody: "CIMA", category: "Domain", issueDate: "22 Nov 2021", expiryDate: null },
  { employeeName: "Sophie Carter", name: "CIPD Level 7 Advanced Diploma", issuingBody: "CIPD", category: "Leadership", issueDate: "14 Feb 2018", expiryDate: null },
  { employeeName: "Freya Johansson", name: "CIPD Level 5 Associate Diploma", issuingBody: "CIPD", category: "Leadership", issueDate: "30 Jun 2024", expiryDate: null },
  { employeeName: "Grace Adeyemi", name: "PRINCE2 Foundation", issuingBody: "AXELOS", category: "Domain", issueDate: "08 Aug 2023", expiryDate: "08 Aug 2026" },
  { employeeName: "Kwame Mensah", name: "Lean Six Sigma Green Belt", issuingBody: "ASQ", category: "Domain", issueDate: "16 Apr 2024", expiryDate: "16 Apr 2027" },
  { employeeName: "Priya Nair", name: "ITIL 4 Foundation", issuingBody: "AXELOS / PeopleCert", category: "Technical", issueDate: "09 Oct 2023", expiryDate: "09 Oct 2026" },
  { employeeName: "Isabella Rossi", name: "HDI Customer Service Representative", issuingBody: "HDI", category: "Domain", issueDate: "23 Jan 2024", expiryDate: "23 Jan 2027" },
  { employeeName: "Marcus Reid", name: "Certified Sales Professional (CSP)", issuingBody: "National Association of Sales Professionals", category: "Domain", issueDate: "08 Feb 2023", expiryDate: "08 Feb 2026" },
  { employeeName: "Olivia Bennett", name: "Google UX Design Professional Certificate", issuingBody: "Google", category: "Technical", issueDate: "19 Oct 2024", expiryDate: null },
];

export const certifications: Certification[] = raw.map((seed, index) => {
  const employee = employeeByName.get(seed.employeeName)!;
  return {
    id: `cert-${index + 1}`,
    employeeId: employee.id,
    employeeName: employee.name,
    avatar: employee.avatar,
    department: employee.department,
    name: seed.name,
    issuingBody: seed.issuingBody,
    category: seed.category,
    issueDate: seed.issueDate,
    expiryDate: seed.expiryDate,
    status: statusFor(seed.expiryDate),
  };
});

export const certificationCategories: CertificationCategory[] = ["Technical", "Compliance", "Leadership", "Domain"];
export const certificationStatuses: CertificationStatus[] = ["Valid", "Expiring Soon", "Expired"];
