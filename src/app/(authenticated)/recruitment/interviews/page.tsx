import { AlertTriangle, CalendarClock, CheckCircle2, Video } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import InterviewsTable from "@/components/table/interviews-table";
import { interviews } from "@/mocks/interviews";

export const metadata: Metadata = {
  title: "Interviews | OptiAdvance HR",
  description: "Interview schedule across every open job requisition.",
};

export default function InterviewsPage() {
  const scheduled = interviews.filter((interview) => interview.status === "Scheduled").length;
  const completed = interviews.filter((interview) => interview.status === "Completed").length;
  const videoCalls = interviews.filter((interview) => interview.mode === "Video Call").length;
  const noShows = interviews.filter((interview) => interview.status === "No Show" || interview.status === "Cancelled").length;

  const summary = [
    { label: "Total Interviews", value: interviews.length, icon: CalendarClock },
    { label: "Scheduled", value: scheduled, icon: CalendarClock },
    { label: "Completed", value: completed, icon: CheckCircle2 },
    { label: "Video Calls", value: videoCalls, icon: Video },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Recruitment" text="Interviews" />

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

      {noShows > 0 && (
        <div className="card mb-6 flex items-center gap-3 border-s-4 border-s-red-500">
          <AlertTriangle className="h-5 w-5 shrink-0 text-red-500" />
          <p className="text-sm">
            {noShows} interview{noShows === 1 ? "" : "s"} cancelled or missed this month.
          </p>
        </div>
      )}

      <InterviewsTable />
    </>
  );
}
