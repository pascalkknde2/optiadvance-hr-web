import { CheckCircle2, Rocket, UserPlus, Clock } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import OnboardingTable from "@/components/table/onboarding-table";
import { newHires } from "@/mocks/onboarding";

export const metadata: Metadata = {
  title: "Onboarding | OptiAdvance HR",
  description: "New hires and their onboarding checklist progress.",
};

export default function OnboardingPage() {
  const inProgress = newHires.filter((hire) => hire.status === "In Progress").length;
  const notStarted = newHires.filter((hire) => hire.status === "Not Started").length;
  const completed = newHires.filter((hire) => hire.status === "Completed").length;

  const summary = [
    { label: "New Hires", value: newHires.length, icon: UserPlus },
    { label: "Not Started", value: notStarted, icon: Clock },
    { label: "In Progress", value: inProgress, icon: Rocket },
    { label: "Completed", value: completed, icon: CheckCircle2 },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Onboarding" text="New Hires" />

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

      <OnboardingTable />
    </>
  );
}
