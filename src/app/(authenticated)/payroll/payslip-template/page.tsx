import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import PayslipTemplateDesigner from "@/features/payroll/payslip-template-designer";

export const metadata: Metadata = {
  title: "Payslip Template | OptiAdvance HR",
  description: "Design the payslip layout by dragging and dropping blocks.",
};

export default function PayslipTemplatePage() {
  return (
    <>
      <DashboardBreadcrumb title="Payroll" text="Payslip Template" />
      <PayslipTemplateDesigner />
    </>
  );
}
