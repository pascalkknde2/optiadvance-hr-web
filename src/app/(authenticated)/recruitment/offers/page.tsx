import { CheckCircle2, FileText, PoundSterling, Send } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import OffersTable from "@/components/table/offers-table";
import { offers } from "@/mocks/offers";

export const metadata: Metadata = {
  title: "Offers | OptiAdvance HR",
  description: "Offers extended to candidates across open job requisitions.",
};

const gbp = (value: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(value);

export default function OffersPage() {
  const outstanding = offers.filter((offer) => offer.status === "Sent").length;
  const accepted = offers.filter((offer) => offer.status === "Accepted").length;
  const avgOffer =
    offers.length > 0
      ? Math.round(offers.reduce((sum, offer) => sum + offer.offeredSalary, 0) / offers.length)
      : 0;

  const summary = [
    { label: "Offers Extended", value: offers.length, icon: FileText },
    { label: "Awaiting Response", value: outstanding, icon: Send },
    { label: "Accepted", value: accepted, icon: CheckCircle2 },
    { label: "Avg. Offered Salary", value: gbp(avgOffer), icon: PoundSterling },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Recruitment" text="Offers" />

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

      <OffersTable />
    </>
  );
}
