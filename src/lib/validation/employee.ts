import { z } from "zod";

export const EMPLOYMENT_TYPES = ["Permanent", "Fixed Term", "Contractor"] as const;
export const PAY_FREQUENCIES = ["Monthly", "Weekly", "Bi-weekly"] as const;
export const EMPLOYEE_STATUSES = ["Active", "On Leave", "Inactive"] as const;
export const CURRENCIES = ["GBP", "EUR", "USD"] as const;
export const GENDERS = ["Female", "Male", "Non-binary", "Prefer not to say"] as const;

const requiredString = (label: string) =>
  z.string().trim().min(1, `${label} is required`);

/**
 * One flat schema drives both the Add Employee wizard and the edit form
 * (blueprint: a single shared create/edit component per entity, driven by
 * an optional id). The wizard validates one step's fields at a time via
 * `employeeWizardSteps`.
 */
export const employeeFormSchema = z.object({
  // Personal
  firstName: requiredString("First name"),
  lastName: requiredString("Last name"),
  preferredName: z.string().trim().optional(),
  dateOfBirth: requiredString("Date of birth"),
  gender: requiredString("Gender"),
  nationality: z.string().optional(),
  // Contact
  workEmail: z.string().trim().min(1, "Work email is required").email("Invalid email"),
  personalEmail: z.string().trim().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
  // Employment
  department: requiredString("Department"),
  position: requiredString("Position"),
  employmentType: z.enum(EMPLOYMENT_TYPES),
  location: requiredString("Location"),
  manager: z.string().optional(),
  startDate: requiredString("Start date"),
  // Compensation
  currency: z.enum(CURRENCIES),
  baseSalary: z.coerce
    .number({ message: "Base salary is required" })
    .positive("Base salary must be greater than 0"),
  payFrequency: z.enum(PAY_FREQUENCIES),
  salaryEffectiveDate: requiredString("Salary effective date"),
  // Bank & Tax
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  sortCode: z.string().optional(),
  // Documents
  documentNames: z.array(z.string()).optional(),
});

export type EmployeeFormInput = z.input<typeof employeeFormSchema>;
export type EmployeeFormValues = z.infer<typeof employeeFormSchema>;

export const employeeWizardSteps = [
  {
    id: "personal",
    title: "Personal",
    description: "Identity details for the employee record.",
    fields: ["firstName", "lastName", "preferredName", "dateOfBirth", "gender", "nationality"],
  },
  {
    id: "contact",
    title: "Contact",
    description: "Work and personal contact details.",
    fields: ["workEmail", "personalEmail", "phone", "address"],
  },
  {
    id: "employment",
    title: "Employment",
    description: "Role, team and reporting line.",
    fields: ["department", "position", "employmentType", "location", "manager", "startDate"],
  },
  {
    id: "compensation",
    title: "Compensation",
    description: "Salary structure. Changes here are written to the audit trail.",
    fields: ["currency", "baseSalary", "payFrequency", "salaryEffectiveDate"],
  },
  {
    id: "bank",
    title: "Bank & Tax",
    description: "Payment details for payroll.",
    fields: ["bankName", "accountNumber", "sortCode"],
  },
  {
    id: "documents",
    title: "Documents",
    description: "Contract, ID and right-to-work evidence.",
    fields: ["documentNames"],
  },
] as const;

export const employeeFormDefaults: EmployeeFormValues = {
  firstName: "",
  lastName: "",
  preferredName: "",
  dateOfBirth: "",
  gender: "",
  nationality: "",
  workEmail: "",
  personalEmail: "",
  phone: "",
  address: "",
  department: "",
  position: "",
  employmentType: "Permanent",
  location: "",
  manager: "",
  startDate: "",
  currency: "GBP",
  baseSalary: 0,
  payFrequency: "Monthly",
  salaryEffectiveDate: "",
  bankName: "",
  accountNumber: "",
  sortCode: "",
  documentNames: [],
};
