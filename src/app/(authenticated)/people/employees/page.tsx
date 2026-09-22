import { Building2, UserCheck, UserMinus, Users } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import EmployeesTable from "@/components/table/employees-table";
import { departments, employees } from "@/mocks/employees";

export const metadata: Metadata = {
  title: "Employees | OptiAdvance HR",
  description: "Employee directory — search, filter and manage your workforce.",
};

export default function EmployeesPage() {
  const active = employees.filter((employee) => employee.status === "Active").length;
  const onLeave = employees.filter((employee) => employee.status === "On Leave").length;

  const summary = [
    { label: "Total Employees", value: employees.length, icon: Users },
    { label: "Active", value: active, icon: UserCheck },
    { label: "On Leave", value: onLeave, icon: UserMinus },
    { label: "Departments", value: departments.length, icon: Building2 },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Employees" text="Directory" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
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

      <EmployeesTable />
    </>
  );
}
