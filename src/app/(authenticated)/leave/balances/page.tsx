import { AlertTriangle, CalendarDays, CalendarMinus, CalendarPlus } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import LeaveBalancesTable from "@/components/table/leave-balances-table";
import { leaveBalances } from "@/mocks/leave-balances";

export const metadata: Metadata = {
  title: "Leave Balances | OptiAdvance HR",
  description: "Annual leave entitlement, usage and remaining balance per employee.",
};

export default function LeaveBalancesPage() {
  const totalEntitlement = leaveBalances.reduce((sum, b) => sum + b.entitlement, 0);
  const totalUsed = leaveBalances.reduce((sum, b) => sum + b.used, 0);
  const totalRemaining = leaveBalances.reduce((sum, b) => sum + b.remaining, 0);
  const lowBalance = leaveBalances.filter((b) => b.remaining <= 3).length;

  const summary = [
    { label: "Total Entitlement", value: `${totalEntitlement}d`, icon: CalendarDays },
    { label: "Used So Far", value: `${totalUsed}d`, icon: CalendarMinus },
    { label: "Remaining", value: `${totalRemaining}d`, icon: CalendarPlus },
    { label: "Low Balance (≤3d)", value: lowBalance, icon: AlertTriangle },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Leave" text="Balances" />

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

      <LeaveBalancesTable />
    </>
  );
}
