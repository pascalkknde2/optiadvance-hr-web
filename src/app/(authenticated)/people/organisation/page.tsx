import { Building2, Network, Users } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import OrgChart from "@/components/people/org-chart";
import { orgChart, orgChartDepartments } from "@/mocks/org-chart";
import { employees } from "@/mocks/employees";

export const metadata: Metadata = {
  title: "Organisation Chart | OptiAdvance HR",
  description: "Reporting lines from leadership down to individual contributors.",
};

export default function OrganisationPage() {
  const totalReports = orgChart.reduce((sum, lead) => sum + lead.reports.length, 0);
  const avgSpan = orgChart.length ? Math.round((totalReports / orgChart.length) * 10) / 10 : 0;

  const summary = [
    { label: "People", value: employees.length, icon: Users },
    { label: "Departments", value: orgChartDepartments.length, icon: Building2 },
    { label: "Avg. Span of Control", value: avgSpan, icon: Network },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Organisation" text="Org Chart" />

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

      <OrgChart />
    </>
  );
}
