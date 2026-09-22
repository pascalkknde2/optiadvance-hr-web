import {
  Building2,
  Code2,
  Handshake,
  Headset,
  PoundSterling,
  Users2,
  type LucideIcon,
} from "lucide-react";

import { employees } from "@/mocks/employees";

export interface DepartmentMeta {
  name: string;
  description: string;
  icon: LucideIcon;
  headName: string;
  openPositions: number;
}

const departmentMeta: DepartmentMeta[] = [
  {
    name: "Engineering",
    description: "Product engineering, platform and quality assurance.",
    icon: Code2,
    headName: "Daniel Osei",
    openPositions: 6,
  },
  {
    name: "Operations",
    description: "Facilities, supply chain and day-to-day operations.",
    icon: Building2,
    headName: "Grace Adeyemi",
    openPositions: 2,
  },
  {
    name: "Sales",
    description: "New business, account management and partnerships.",
    icon: Handshake,
    headName: "Marcus Reid",
    openPositions: 4,
  },
  {
    name: "Customer Support",
    description: "Customer success, onboarding and support.",
    icon: Headset,
    headName: "Priya Nair",
    openPositions: 3,
  },
  {
    name: "Finance",
    description: "Financial planning, payroll and reporting.",
    icon: PoundSterling,
    headName: "Ella Thompson",
    openPositions: 1,
  },
  {
    name: "People & Talent",
    description: "HR operations, talent acquisition and culture.",
    icon: Users2,
    headName: "Sophie Carter",
    openPositions: 2,
  },
];

export const departmentSummaries = departmentMeta.map((meta) => {
  const members = employees.filter((employee) => employee.department === meta.name);
  const locations = Array.from(new Set(members.map((member) => member.location)));

  return {
    ...meta,
    headcount: members.length,
    activeCount: members.filter((member) => member.status === "Active").length,
    locations,
    members,
  };
});
