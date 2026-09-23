import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import PipelineBoard from "@/features/recruitment/pipeline-board";

export const metadata: Metadata = {
  title: "Pipeline | OptiAdvance HR",
  description: "Applicant pipeline across every open job requisition.",
};

export default function PipelinePage() {
  return (
    <>
      <DashboardBreadcrumb title="Recruitment" text="Pipeline" />
      <p className="text-sm text-neutral-500 dark:text-neutral-300 mb-5">
        Drag a candidate card to move them to a different stage.
      </p>
      <PipelineBoard />
    </>
  );
}
