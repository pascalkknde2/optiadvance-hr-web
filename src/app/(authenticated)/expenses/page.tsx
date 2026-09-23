import { Clock, PoundSterling, Receipt, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import ExpensesTable from "@/components/table/expenses-table";
import { expenseClaims } from "@/mocks/expenses";

export const metadata: Metadata = {
  title: "Expenses | OptiAdvance HR",
  description: "Expense claims, approvals and reimbursements.",
};

const gbp = (value: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value);

export default function ExpensesPage() {
  const pending = expenseClaims.filter((claim) => claim.status === "Pending").length;
  const reimbursed = expenseClaims
    .filter((claim) => claim.status === "Reimbursed")
    .reduce((sum, claim) => sum + claim.amount, 0);
  const totalClaimed = expenseClaims
    .filter((claim) => claim.status !== "Rejected")
    .reduce((sum, claim) => sum + claim.amount, 0);

  const summary = [
    { label: "Pending Claims", value: pending, icon: Clock },
    { label: "Total Claimed", value: gbp(totalClaimed), icon: Receipt },
    { label: "Reimbursed", value: gbp(reimbursed), icon: ShieldCheck },
    { label: "Total Claims", value: expenseClaims.length, icon: PoundSterling },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Expenses" text="Claims" />

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

      <ExpensesTable />
    </>
  );
}
