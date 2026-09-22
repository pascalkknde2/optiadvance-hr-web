import { Briefcase, Layers, UserCheck } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import PositionsTable from "@/components/table/positions-table";
import { positions } from "@/mocks/positions";

export const metadata: Metadata = {
  title: "Positions | OptiAdvance HR",
  description: "Job architecture — positions, grades, headcount and vacancies.",
};

export default function PositionsPage() {
  const totalFilled = positions.reduce((sum, position) => sum + position.headcount, 0);
  const totalOpen = positions.reduce((sum, position) => sum + position.openings, 0);

  const summary = [
    { label: "Positions", value: positions.length, icon: Layers },
    { label: "Filled Roles", value: totalFilled, icon: UserCheck },
    { label: "Open Vacancies", value: totalOpen, icon: Briefcase },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Positions" text="Organisation" />

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

      <PositionsTable />
    </>
  );
}
