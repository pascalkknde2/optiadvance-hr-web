import { AlertTriangle, CheckCircle2, Clock, FileClock } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import TimesheetsTable from "@/components/table/timesheets-table";
import { timesheets } from "@/mocks/timesheets";

export const metadata: Metadata = {
  title: "Timesheets | OptiAdvance HR",
  description: "Weekly timesheets and approvals.",
};

export default function TimesheetsPage() {
  const approved = timesheets.filter((sheet) => sheet.status === "Approved").length;
  const pending = timesheets.filter((sheet) => sheet.status === "Submitted").length;
  const needsAction = timesheets.filter((sheet) => sheet.status === "Draft" || sheet.status === "Rejected").length;
  const totalHours = Math.round(timesheets.reduce((sum, sheet) => sum + sheet.total, 0));

  const summary = [
    { label: "Approved", value: approved, icon: CheckCircle2 },
    { label: "Pending Approval", value: pending, icon: Clock },
    { label: "Needs Action", value: needsAction, icon: AlertTriangle },
    { label: "Total Hours Logged", value: `${totalHours}h`, icon: FileClock },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Timesheets" text="This Week" />

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

      <TimesheetsTable />
    </>
  );
}
