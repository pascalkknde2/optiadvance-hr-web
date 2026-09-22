import { Clock, PoundSterling, Timer, TimerReset } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import OvertimeTable from "@/components/table/overtime-table";
import { overtimeRequests } from "@/mocks/overtime";

export const metadata: Metadata = {
  title: "Overtime | OptiAdvance HR",
  description: "Overtime requests, approvals and estimated cost.",
};

export default function OvertimePage() {
  const pending = overtimeRequests.filter((r) => r.status === "Pending").length;
  const approvedHours = overtimeRequests
    .filter((r) => r.status === "Approved" || r.status === "Paid")
    .reduce((sum, r) => sum + r.hours, 0);
  const estimatedCost = overtimeRequests
    .filter((r) => r.status !== "Rejected")
    .reduce((sum, r) => sum + r.hours * r.rate, 0);

  const summary = [
    { label: "Pending Requests", value: pending, icon: Clock },
    { label: "Approved Hours", value: `${approvedHours}h`, icon: Timer },
    { label: "Requests This Period", value: overtimeRequests.length, icon: TimerReset },
    { label: "Estimated Cost", value: `£${estimatedCost.toFixed(2)}`, icon: PoundSterling },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Overtime" text="Requests" />

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

      <OvertimeTable />
    </>
  );
}
