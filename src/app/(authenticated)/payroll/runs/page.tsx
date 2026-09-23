import { CalendarClock, PoundSterling, TrendingUp, Users } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import PayrollRunsTable from "@/components/table/payroll-runs-table";
import { netPay, payrollRuns } from "@/mocks/payroll-runs";

export const metadata: Metadata = {
  title: "Payroll Runs | OptiAdvance HR",
  description: "Payroll run history, current period and upcoming run.",
};

const gbp = (value: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(value);

export default function PayrollRunsPage() {
  const current = payrollRuns.find((run) => run.status === "Approved") ?? payrollRuns[1];
  const upcoming = payrollRuns.find((run) => run.status === "Draft");
  const ytdGross = payrollRuns
    .filter((run) => run.status !== "Draft")
    .reduce((sum, run) => sum + run.gross, 0);

  const summary = [
    { label: `${current.period} Net Pay`, value: gbp(netPay(current)), icon: PoundSterling },
    { label: "Employees Paid", value: current.employees.toLocaleString(), icon: Users },
    { label: "YTD Gross Pay", value: gbp(ytdGross), icon: TrendingUp },
    { label: "Next Run", value: upcoming?.runDate ?? "—", icon: CalendarClock },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Payroll" text="Runs" />

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

      <PayrollRunsTable />
    </>
  );
}
