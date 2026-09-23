import { CheckCircle2, ClipboardList, Hourglass, Users } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import ReviewsTable from "@/components/table/reviews-table";
import { reviewCycle, reviews } from "@/mocks/reviews";

export const metadata: Metadata = {
  title: "Reviews | OptiAdvance HR",
  description: "Performance review cycle status.",
};

export default function ReviewsPage() {
  const completed = reviews.filter((review) => review.stage === "Completed").length;
  const inProgress = reviews.filter(
    (review) => review.stage === "Self-Assessment" || review.stage === "Manager Review"
  ).length;
  const notStarted = reviews.filter((review) => review.stage === "Not Started").length;

  const summary = [
    { label: `${reviewCycle} Reviews`, value: reviews.length, icon: Users },
    { label: "Completed", value: completed, icon: CheckCircle2 },
    { label: "In Progress", value: inProgress, icon: ClipboardList },
    { label: "Not Started", value: notStarted, icon: Hourglass },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Performance" text="Reviews" />

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

      <ReviewsTable />
    </>
  );
}
