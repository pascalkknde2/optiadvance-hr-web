import { Gift, PiggyBank, ShieldCheck, Users } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import BenefitsTable from "@/components/table/benefits-table";
import { benefitPlans, eligibleEmployees } from "@/mocks/benefits";

export const metadata: Metadata = {
  title: "Benefits | OptiAdvance HR",
  description: "Benefit plans, providers and enrollment across the workforce.",
};

export default function BenefitsPage() {
  const avgEnrollmentRate = Math.round(
    (benefitPlans.reduce((sum, plan) => sum + plan.enrolled / plan.eligible, 0) / benefitPlans.length) * 100,
  );
  const insurancePlans = benefitPlans.filter((plan) => plan.category === "Insurance").length;

  const summary = [
    { label: "Active Plans", value: benefitPlans.length, icon: Gift },
    { label: "Eligible Employees", value: eligibleEmployees, icon: Users },
    { label: "Avg. Enrollment Rate", value: `${avgEnrollmentRate}%`, icon: ShieldCheck },
    { label: "Insurance Plans", value: insurancePlans, icon: PiggyBank },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Benefits" text="Plans" />

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

      <BenefitsTable />
    </>
  );
}
