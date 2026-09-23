import { Briefcase, PauseCircle, Target, Users } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import JobsTable from "@/components/table/jobs-table";
import { jobs } from "@/mocks/jobs";

export const metadata: Metadata = {
  title: "Jobs | OptiAdvance HR",
  description: "Open job requisitions across the organisation.",
};

export default function JobsPage() {
  const openRequisitions = jobs.filter((job) => job.status === "Open").length;
  const onHold = jobs.filter((job) => job.status === "On Hold").length;
  const totalOpenings = jobs.reduce((sum, job) => sum + job.openings, 0);
  const totalApplicants = jobs.reduce((sum, job) => sum + job.applicants, 0);

  const summary = [
    { label: "Open Requisitions", value: openRequisitions, icon: Briefcase },
    { label: "Total Openings", value: totalOpenings, icon: Target },
    { label: "Total Applicants", value: totalApplicants, icon: Users },
    { label: "On Hold", value: onHold, icon: PauseCircle },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Recruitment" text="Jobs" />

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

      <JobsTable />
    </>
  );
}
