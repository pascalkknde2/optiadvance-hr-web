import { CalendarCheck, Star, UserCheck, Users } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import CandidatesTable from "@/components/table/candidates-table";
import { candidates } from "@/mocks/candidates";

export const metadata: Metadata = {
  title: "Candidates | OptiAdvance HR",
  description: "Candidates tracked across open job requisitions.",
};

export default function CandidatesPage() {
  const inInterviewStages = candidates.filter((candidate) =>
    ["Interview", "Technical Assessment", "Final Interview"].includes(candidate.stage),
  ).length;
  const offersOut = candidates.filter((candidate) => candidate.stage === "Offer").length;
  const avgRating =
    Math.round((candidates.reduce((sum, candidate) => sum + candidate.rating, 0) / candidates.length) * 10) / 10;

  const summary = [
    { label: "Candidates Tracked", value: candidates.length, icon: Users },
    { label: "Interviewing", value: inInterviewStages, icon: CalendarCheck },
    { label: "Offers Extended", value: offersOut, icon: UserCheck },
    { label: "Avg. Rating", value: `${avgRating} / 5`, icon: Star },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Recruitment" text="Candidates" />

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

      <CandidatesTable />
    </>
  );
}
