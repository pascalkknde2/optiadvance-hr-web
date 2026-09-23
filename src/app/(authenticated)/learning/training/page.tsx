import { CalendarCheck, CalendarClock, Users, UserCheck } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import TrainingSessionsTable from "@/components/table/training-sessions-table";
import { trainingSessions } from "@/mocks/training-sessions";

export const metadata: Metadata = {
  title: "Training | OptiAdvance HR",
  description: "Training sessions, trainers and attendance.",
};

export default function TrainingPage() {
  const scheduled = trainingSessions.filter((s) => s.status === "Scheduled").length;
  const completed = trainingSessions.filter((s) => s.status === "Completed").length;
  const totalAttendees = trainingSessions.reduce((sum, s) => sum + s.registered, 0);

  const summary = [
    { label: "Total Sessions", value: trainingSessions.length, icon: Users },
    { label: "Scheduled", value: scheduled, icon: CalendarClock },
    { label: "Completed", value: completed, icon: CalendarCheck },
    { label: "Total Attendees", value: totalAttendees, icon: UserCheck },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Learning" text="Training" />

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

      <TrainingSessionsTable />
    </>
  );
}
