import { FileText, PoundSterling, ShieldCheck, Users } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import PayslipsTable from "@/components/table/payslips-table";
import { payslipPeriods, payslips } from "@/mocks/payslips";

export const metadata: Metadata = {
  title: "Payslips | OptiAdvance HR",
  description: "Individual payslips by period.",
};

const gbp = (value: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(value);

export default function PayslipsPage() {
  const latestPeriod = payslipPeriods[0]?.period;
  const latestSlips = payslips.filter((slip) => slip.period === latestPeriod);
  const totalNet = latestSlips.reduce((sum, slip) => sum + slip.netPay, 0);
  const issued = latestSlips.filter((slip) => slip.status === "Issued").length;

  const summary = [
    { label: `${latestPeriod} Net Pay`, value: gbp(totalNet), icon: PoundSterling },
    { label: "Payslips This Period", value: latestSlips.length, icon: FileText },
    { label: "Issued", value: issued, icon: ShieldCheck },
    { label: "Employees Covered", value: latestSlips.length, icon: Users },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Payroll" text="Payslips" />

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

      <PayslipsTable />
    </>
  );
}
