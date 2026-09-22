import { employees } from "@/mocks/employees";

export type DocumentCategory = "Contract" | "Compliance" | "Policy";
export type DocumentStatus = "Valid" | "Expiring Soon" | "Expired" | "Missing";

export interface EmployeeDocument {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar: (typeof employees)[number]["avatar"];
  department: string;
  documentType: string;
  category: DocumentCategory;
  status: DocumentStatus;
  uploadedDate: string | null;
  expiryDate: string | null;
}

// Right to Work renewal is the one document type that realistically varies in
// status across a workforce snapshot; everything else is either on file or not.
const rightToWork: Record<string, { status: DocumentStatus; expiry: string | null; uploaded: string | null }> = {
  "17": { status: "Expiring Soon", expiry: "12 Oct 2026", uploaded: "15 Mar 2021" },
  "18": { status: "Expiring Soon", expiry: "30 Oct 2026", uploaded: "30 Jun 2023" },
  "19": { status: "Expired", expiry: "18 Aug 2026", uploaded: "08 Feb 2019" },
  "20": { status: "Missing", expiry: null, uploaded: null },
};

const defaultValidExpiry = ["14 Jun 2028", "02 Mar 2029", "21 Nov 2027", "09 May 2028", "17 Jan 2029"];

export const documents: EmployeeDocument[] = employees.flatMap((employee, index) => {
  const contract: EmployeeDocument = {
    id: `${employee.id}-contract`,
    employeeId: employee.id,
    employeeName: employee.name,
    avatar: employee.avatar,
    department: employee.department,
    documentType: "Employment Contract",
    category: "Contract",
    status: "Valid",
    uploadedDate: employee.joinDate,
    expiryDate: null,
  };

  const rtwOverride = rightToWork[employee.id];
  const rightToWorkDoc: EmployeeDocument = {
    id: `${employee.id}-rtw`,
    employeeId: employee.id,
    employeeName: employee.name,
    avatar: employee.avatar,
    department: employee.department,
    documentType: "Right to Work Check",
    category: "Compliance",
    status: rtwOverride?.status ?? "Valid",
    uploadedDate: rtwOverride?.uploaded ?? employee.joinDate,
    expiryDate: rtwOverride ? rtwOverride.expiry : defaultValidExpiry[index % defaultValidExpiry.length],
  };

  const handbook: EmployeeDocument = {
    id: `${employee.id}-handbook`,
    employeeId: employee.id,
    employeeName: employee.name,
    avatar: employee.avatar,
    department: employee.department,
    documentType: "Signed Employee Handbook",
    category: "Policy",
    status: index === 14 ? "Missing" : "Valid",
    uploadedDate: index === 14 ? null : employee.joinDate,
    expiryDate: null,
  };

  return [contract, rightToWorkDoc, handbook];
});
