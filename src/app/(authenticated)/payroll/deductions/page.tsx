import { Landmark, PiggyBank, ReceiptText, Wallet } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import DeductionsTable from "@/components/table/deductions-table";
import { deductionLines, deductionsPeriod } from "@/mocks/deductions";

export const metadata: Metadata = {
  title: "Deductions | OptiAdvance HR",
  description: "Income tax, National Insurance, pension and loan deductions.",
};

const gbp = (value: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(value);

const sumType = (type: string) =>
  deductionLines.filter((line) => line.type === type).reduce((sum, line) => sum + line.amount, 0);

export default function DeductionsPage() {
  const total = deductionLines.reduce((sum, line) => sum + line.amount, 0);
  const incomeTax = sumType("Income Tax");
  const ni = sumType("National Insurance");
  const pension = sumType("Pension");

  const summary = [
    { label: `${deductionsPeriod} Total Deductions`, value: gbp(total), icon: ReceiptText },
    { label: "Income Tax", value: gbp(incomeTax), icon: Landmark },
    { label: "National Insurance", value: gbp(ni), icon: Wallet },
    { label: "Pension", value: gbp(pension), icon: PiggyBank },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Payroll" text="Deductions" />

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

      <DeductionsTable />
    </>
  );
}
