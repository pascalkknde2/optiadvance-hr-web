import { Gift, PoundSterling, TrendingUp, Users } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import EarningsTable from "@/components/table/earnings-table";
import { earningLines, earningsPeriod } from "@/mocks/earnings";

export const metadata: Metadata = {
  title: "Earnings | OptiAdvance HR",
  description: "Overtime, commission, bonus and allowance earnings on top of base salary.",
};

const gbp = (value: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(value);

export default function EarningsPage() {
  const total = earningLines.reduce((sum, line) => sum + line.amount, 0);
  const overtimeTotal = earningLines
    .filter((line) => line.type === "Overtime")
    .reduce((sum, line) => sum + line.amount, 0);
  const commissionTotal = earningLines
    .filter((line) => line.type === "Commission")
    .reduce((sum, line) => sum + line.amount, 0);
  const recipients = new Set(earningLines.map((line) => line.employeeId)).size;

  const summary = [
    { label: `${earningsPeriod} Extra Earnings`, value: gbp(total), icon: PoundSterling },
    { label: "Overtime Paid", value: gbp(overtimeTotal), icon: TrendingUp },
    { label: "Commission Paid", value: gbp(commissionTotal), icon: Gift },
    { label: "Recipients", value: recipients, icon: Users },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Payroll" text="Earnings" />

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

      <EarningsTable />
    </>
  );
}
