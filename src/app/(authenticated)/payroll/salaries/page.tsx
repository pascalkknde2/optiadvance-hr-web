import { differenceInCalendarDays, parseISO } from "date-fns";
import { CalendarClock, PoundSterling, TrendingUp, Wallet } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import SalariesTable from "@/components/table/salaries-table";
import { salaries } from "@/mocks/salaries";

export const metadata: Metadata = {
  title: "Salaries | OptiAdvance HR",
  description: "Annual salaries, bands and upcoming reviews.",
};

const gbp = (value: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(value);

export default function SalariesPage() {
  const total = salaries.reduce((sum, salary) => sum + salary.annualSalary, 0);
  const average = Math.round(total / salaries.length);
  const dueSoon = salaries.filter((salary) => {
    const days = differenceInCalendarDays(parseISO(salary.nextReviewDate), new Date());
    return days >= 0 && days <= 60;
  }).length;
  const avgChange =
    Math.round((salaries.reduce((sum, salary) => sum + salary.changePercent, 0) / salaries.length) * 10) / 10;

  const summary = [
    { label: "Total Annual Payroll", value: gbp(total), icon: Wallet },
    { label: "Average Salary", value: gbp(average), icon: PoundSterling },
    { label: "Reviews Due (60d)", value: dueSoon, icon: CalendarClock },
    { label: "Avg. Last Increase", value: `+${avgChange}%`, icon: TrendingUp },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Payroll" text="Salaries" />

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

      <SalariesTable />
    </>
  );
}
