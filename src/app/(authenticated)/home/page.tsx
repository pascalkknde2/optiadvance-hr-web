import { Award, Briefcase, Cake, CheckSquare, Clock, Palmtree } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import BreakdownCard from "@/components/dashboard/breakdown-card";
import KpiCard from "@/components/dashboard/kpi-card";
import ListCard from "@/components/dashboard/list-card";
import PayrollSummaryCard from "@/components/dashboard/payroll-summary-card";
import DepartmentDistributionChart from "@/components/charts/department-distribution-chart";
import WorkforceTrendChart from "@/components/charts/workforce-trend-chart";
import {
  approvalQueue,
  attendanceOverview,
  kpiCards,
  leaveOverview,
  payrollSummary,
  recruitmentFunnel,
  upcomingBirthdays,
  workAnniversaries,
} from "@/mocks/dashboard";

export const metadata: Metadata = {
  title: "Dashboard | OptiAdvance HR",
  description: "Workforce, attendance, leave, payroll and hiring overview.",
};

export default function HomePage() {
  return (
    <>
      <DashboardBreadcrumb title="Dashboard" text="Overview" />

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {kpiCards.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* Trend + department distribution */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <div className="card xl:col-span-2">
          <h6 className="font-semibold mb-1">Workforce Trend</h6>
          <p className="text-sm text-neutral-500 dark:text-neutral-300 mb-4">
            Headcount and new hires over the last 12 months
          </p>
          <WorkforceTrendChart />
        </div>

        <div className="card">
          <h6 className="font-semibold mb-1">Department Distribution</h6>
          <p className="text-sm text-neutral-500 dark:text-neutral-300 mb-4">
            Employees by department
          </p>
          <DepartmentDistributionChart />
        </div>
      </div>

      {/* Attendance / Leave / Recruitment funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <BreakdownCard
          title="Attendance Overview"
          icon={Clock}
          rows={attendanceOverview}
          footer="Today, across all locations"
        />
        <BreakdownCard
          title="Leave Overview"
          icon={Palmtree}
          rows={leaveOverview}
          footer="42 employees currently on leave"
        />
        <BreakdownCard
          title="Recruitment Funnel"
          icon={Briefcase}
          rows={recruitmentFunnel}
          footer="18 open positions across 6 departments"
        />
      </div>

      {/* Birthdays / anniversaries / approvals / payroll */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        <ListCard title="Upcoming Birthdays" icon={Cake} rows={upcomingBirthdays} />
        <ListCard title="Work Anniversaries" icon={Award} rows={workAnniversaries} />
        <ListCard title="Approval Queue" icon={CheckSquare} rows={approvalQueue} />
        <PayrollSummaryCard {...payrollSummary} />
      </div>
    </>
  );
}
