import {
  Briefcase,
  CheckSquare,
  PoundSterling,
  RefreshCw,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface KpiCardData {
  label: string;
  value: string;
  delta: string;
  tone: "positive" | "negative" | "neutral";
  icon: LucideIcon;
}

export const kpiCards: KpiCardData[] = [
  { label: "Total Employees", value: "1,284", delta: "+18 this month", tone: "positive", icon: Users },
  { label: "Active Employees", value: "1,201", delta: "93.5% of headcount", tone: "neutral", icon: UserCheck },
  { label: "New Hires (30d)", value: "36", delta: "+12% vs last month", tone: "positive", icon: UserPlus },
  { label: "On Leave Today", value: "42", delta: "+3 vs yesterday", tone: "negative", icon: Users },
  { label: "Open Positions", value: "18", delta: "-2 this week", tone: "positive", icon: Briefcase },
  { label: "Pending Approvals", value: "27", delta: "-8 this week", tone: "positive", icon: CheckSquare },
  { label: "Monthly Payroll", value: "£1.42M", delta: "+1.8% MoM", tone: "neutral", icon: PoundSterling },
  { label: "Turnover Rate", value: "3.1%", delta: "-0.4pt vs last qtr", tone: "positive", icon: RefreshCw },
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const workforceTrend = {
  categories: months,
  headcount: [1180, 1190, 1205, 1215, 1225, 1230, 1240, 1250, 1258, 1265, 1275, 1284],
  newHires: [8, 6, 10, 7, 9, 5, 11, 9, 8, 10, 6, 9],
};

export const departmentDistribution = [
  { department: "Engineering", employees: 412 },
  { department: "Operations", employees: 256 },
  { department: "Sales", employees: 198 },
  { department: "Customer Support", employees: 164 },
  { department: "Finance", employees: 98 },
  { department: "People & Talent", employees: 88 },
  { department: "Other", employees: 68 },
];

export const attendanceOverview = [
  { label: "Present", value: 1098, percent: 91, color: "bg-green-600" },
  { label: "Remote / WFH", value: 61, percent: 5, color: "bg-cyan-500" },
  { label: "Late", value: 23, percent: 2, color: "bg-yellow-500" },
  { label: "Absent", value: 19, percent: 2, color: "bg-red-500" },
];

export const leaveOverview = [
  { label: "Annual Leave", value: 24, percent: 57, color: "bg-primary" },
  { label: "Sick Leave", value: 11, percent: 26, color: "bg-red-500" },
  { label: "Parental Leave", value: 4, percent: 10, color: "bg-violet-600" },
  { label: "Unpaid Leave", value: 3, percent: 7, color: "bg-yellow-500" },
];

export const recruitmentFunnel = [
  { label: "Applied", value: 428, percent: 100, color: "bg-primary" },
  { label: "Screening", value: 214, percent: 50, color: "bg-cyan-500" },
  { label: "Interview", value: 96, percent: 22, color: "bg-yellow-500" },
  { label: "Offer", value: 24, percent: 6, color: "bg-violet-600" },
  { label: "Hired", value: 18, percent: 4, color: "bg-green-600" },
];

export const upcomingBirthdays = [
  { name: "Amara Okafor", meta: "Engineering", date: "24 Sep" },
  { name: "Liam Fitzgerald", meta: "Sales", date: "26 Sep" },
  { name: "Priya Nair", meta: "Customer Support", date: "29 Sep" },
  { name: "Tomasz Wojcik", meta: "Finance", date: "2 Oct" },
];

export const workAnniversaries = [
  { name: "Grace Adeyemi", meta: "5 years · Operations", date: "23 Sep" },
  { name: "Daniel Osei", meta: "2 years · Engineering", date: "25 Sep" },
  { name: "Sophie Carter", meta: "10 years · People & Talent", date: "1 Oct" },
];

export const approvalQueue = [
  { name: "Jack Sullivan", meta: "Leave request · 3 days", date: "Today" },
  { name: "Meera Patel", meta: "Expense claim · £284.50", date: "Today" },
  { name: "Chen Wei", meta: "Overtime · 6 hours", date: "Yesterday" },
  { name: "Olivia Bennett", meta: "Salary change request", date: "Yesterday" },
];

export const payrollSummary = {
  period: "September 2026",
  netPay: "£1.09M",
  lines: [
    { label: "Gross pay", value: "£1.42M" },
    { label: "Employer NI & pension", value: "£186K" },
    { label: "Deductions & tax", value: "£146K" },
  ],
  status: "Approved · runs 28 Sep",
};
