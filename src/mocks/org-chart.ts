import type { StaticImageData } from "next/image";

import { employees } from "@/mocks/employees";
import { positions } from "@/mocks/positions";

export interface OrgNode {
  positionTitle: string;
  employeeName: string;
  avatar: StaticImageData | null;
  department: string;
  reports: OrgNode[];
}

const employeeByPosition = new Map(employees.map((employee) => [employee.position, employee]));

const buildNode = (positionTitle: string): OrgNode | null => {
  const position = positions.find((p) => p.title === positionTitle);
  const employee = employeeByPosition.get(positionTitle);
  if (!position || !employee) return null;

  const reports = positions
    .filter((p) => p.reportsTo === positionTitle)
    .map((p) => buildNode(p.title))
    .filter((node): node is OrgNode => node !== null);

  return {
    positionTitle,
    employeeName: employee.name,
    avatar: employee.avatar,
    department: position.department,
    reports,
  };
};

export const orgChart: OrgNode[] = positions
  .filter((position) => position.reportsTo === "Executive Team")
  .map((position) => buildNode(position.title))
  .filter((node): node is OrgNode => node !== null);

export const orgChartDepartments = orgChart.map((node) => node.department).sort();
