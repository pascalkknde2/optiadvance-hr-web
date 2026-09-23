import { AlertTriangle, CheckCircle2, Target, TrendingUp } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import GoalsTable from "@/components/table/goals-table";
import { goals } from "@/mocks/goals";

export const metadata: Metadata = {
  title: "Goals | OptiAdvance HR",
  description: "Individual, team and company goals for the current cycle.",
};

export default function GoalsPage() {
  const onTrack = goals.filter((goal) => goal.status === "On Track").length;
  const atRisk = goals.filter((goal) => goal.status === "At Risk").length;
  const completed = goals.filter((goal) => goal.status === "Completed").length;
  const avgProgress = Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length);

  const summary = [
    { label: "Total Goals", value: goals.length, icon: Target },
    { label: "On Track", value: onTrack, icon: TrendingUp },
    { label: "At Risk", value: atRisk, icon: AlertTriangle },
    { label: "Completed", value: completed, icon: CheckCircle2 },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Performance" text="Goals" />

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

      <p className="text-sm text-neutral-500 dark:text-neutral-300 mb-4">
        Average progress across all goals: {avgProgress}%
      </p>

      <GoalsTable />
    </>
  );
}
