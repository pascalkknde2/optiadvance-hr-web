import { Briefcase, Building2, Users } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import DepartmentCard from "@/components/people/department-card";
import { departmentSummaries } from "@/mocks/departments";

export const metadata: Metadata = {
  title: "Departments | OptiAdvance HR",
  description: "Department structure, headcount and open positions.",
};

export default function DepartmentsPage() {
  const totalHeadcount = departmentSummaries.reduce((sum, dept) => sum + dept.headcount, 0);
  const totalOpenPositions = departmentSummaries.reduce((sum, dept) => sum + dept.openPositions, 0);

  const summary = [
    { label: "Departments", value: departmentSummaries.length, icon: Building2 },
    { label: "Employees Covered", value: totalHeadcount, icon: Users },
    { label: "Open Positions", value: totalOpenPositions, icon: Briefcase },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Departments" text="Organisation" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {summary.map(({ label, value, icon: Icon }) => (
          <div key={label} className="card flex items-center gap-3">
            <span className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5" />
            </span>
            <div>
              <p className="text-sm text-neutral-500 dark:text-neutral-300">{label}</p>
              <h5 className="font-semibold mb-0">{value}</h5>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {departmentSummaries.map((department) => (
          <DepartmentCard key={department.name} department={department} />
        ))}
      </div>
    </>
  );
}
