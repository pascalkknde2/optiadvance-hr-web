import { Award, CheckCircle2, Hourglass, Star } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import AppraisalsTable from "@/components/table/appraisals-table";
import { appraisalCycle, appraisals } from "@/mocks/appraisals";

export const metadata: Metadata = {
  title: "Appraisals | OptiAdvance HR",
  description: "Calibrated appraisal outcomes, pay recommendations and promotions.",
};

export default function AppraisalsPage() {
  const signedOff = appraisals.filter((a) => a.calibrationStatus === "Signed Off").length;
  const pending = appraisals.filter((a) => a.calibrationStatus === "Pending Calibration").length;
  const promotions = appraisals.filter((a) => a.promotionRecommended).length;
  const avgScore = Math.round((appraisals.reduce((sum, a) => sum + a.score, 0) / appraisals.length) * 10) / 10;

  const summary = [
    { label: `${appraisalCycle} Appraisals`, value: appraisals.length, icon: Star },
    { label: "Signed Off", value: signedOff, icon: CheckCircle2 },
    { label: "Pending Calibration", value: pending, icon: Hourglass },
    { label: "Promotions Recommended", value: promotions, icon: Award },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Performance" text="Appraisals" />

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

      <p className="text-sm text-neutral-500 dark:text-neutral-300 mb-4">
        Average appraisal score: {avgScore} / 5
      </p>

      <AppraisalsTable />
    </>
  );
}
