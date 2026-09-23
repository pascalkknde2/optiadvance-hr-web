import { AlertTriangle, Award, ShieldCheck, XCircle } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import CertificationsTable from "@/components/table/certifications-table";
import { certifications } from "@/mocks/certifications";

export const metadata: Metadata = {
  title: "Certifications | OptiAdvance HR",
  description: "Professional certifications and credentials held across the workforce.",
};

export default function CertificationsPage() {
  const valid = certifications.filter((cert) => cert.status === "Valid").length;
  const expiringSoon = certifications.filter((cert) => cert.status === "Expiring Soon").length;
  const expired = certifications.filter((cert) => cert.status === "Expired").length;

  const summary = [
    { label: "Certifications Tracked", value: certifications.length, icon: Award },
    { label: "Valid", value: valid, icon: ShieldCheck },
    { label: "Expiring Soon (≤60 days)", value: expiringSoon, icon: AlertTriangle },
    { label: "Expired", value: expired, icon: XCircle },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Learning" text="Certifications" />

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

      <CertificationsTable />
    </>
  );
}
