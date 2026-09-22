import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import ShiftCatalog from "@/components/people/shift-catalog";
import ShiftsTable from "@/components/table/shifts-table";

export const metadata: Metadata = {
  title: "Shifts | OptiAdvance HR",
  description: "Shift types and the weekly shift roster.",
};

export default function ShiftsPage() {
  return (
    <>
      <DashboardBreadcrumb title="Shifts" text="This Week" />

      <ShiftCatalog />

      <ShiftsTable />
    </>
  );
}
