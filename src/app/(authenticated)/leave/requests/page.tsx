import { CalendarCheck, CalendarClock, CalendarX, Palmtree } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import LeaveTable from "@/components/table/leave-table";
import { leaveRequests } from "@/mocks/leave";

export const metadata: Metadata = {
  title: "Leave Requests | OptiAdvance HR",
  description: "Leave requests and approvals.",
};

export default function LeaveRequestsPage() {
  const pending = leaveRequests.filter((r) => r.status === "Pending").length;
  const approved = leaveRequests.filter((r) => r.status === "Approved").length;
  const onLeaveToday = leaveRequests.filter(
    (r) => r.status === "Approved" && (r.employeeId === "6" || r.employeeId === "16")
  ).length;
  const totalDays = leaveRequests
    .filter((r) => r.status !== "Rejected")
    .reduce((sum, r) => sum + r.days, 0);

  const summary = [
    { label: "Pending Requests", value: pending, icon: CalendarClock },
    { label: "Approved", value: approved, icon: CalendarCheck },
    { label: "On Leave Today", value: onLeaveToday, icon: Palmtree },
    { label: "Total Days Requested", value: totalDays, icon: CalendarX },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Leave" text="Requests" />

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

      <LeaveTable />
    </>
  );
}
