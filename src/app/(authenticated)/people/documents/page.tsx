import { AlertTriangle, FileText, FileX, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import DocumentsTable from "@/components/table/documents-table";
import { documents } from "@/mocks/documents";

export const metadata: Metadata = {
  title: "Documents | OptiAdvance HR",
  description: "Employee documents — contracts, compliance checks and policy sign-off.",
};

export default function DocumentsPage() {
  const valid = documents.filter((doc) => doc.status === "Valid").length;
  const needsAttention = documents.filter(
    (doc) => doc.status === "Expiring Soon" || doc.status === "Expired"
  ).length;
  const missing = documents.filter((doc) => doc.status === "Missing").length;

  const summary = [
    { label: "Total Documents", value: documents.length, icon: FileText },
    { label: "Valid", value: valid, icon: ShieldCheck },
    { label: "Needs Attention", value: needsAttention, icon: AlertTriangle },
    { label: "Missing", value: missing, icon: FileX },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Documents" text="Directory" />

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

      <DocumentsTable />
    </>
  );
}
