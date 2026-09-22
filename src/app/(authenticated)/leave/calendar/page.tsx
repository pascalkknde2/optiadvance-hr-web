import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import LeaveCalendar from "@/components/people/leave-calendar";

export const metadata: Metadata = {
  title: "Leave Calendar | OptiAdvance HR",
  description: "Month view of approved leave across the company.",
};

export default function LeaveCalendarPage() {
  return (
    <>
      <DashboardBreadcrumb title="Leave" text="Calendar" />

      <LeaveCalendar />
    </>
  );
}
