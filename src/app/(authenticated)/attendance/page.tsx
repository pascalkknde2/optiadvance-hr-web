import { CalendarX, Laptop, TimerOff, UserCheck } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import AttendanceTable from "@/components/table/attendance-table";
import { attendanceToday } from "@/mocks/attendance";

export const metadata: Metadata = {
  title: "Attendance | OptiAdvance HR",
  description: "Daily attendance — clock-ins, remote working, lateness and absence.",
};

export default function AttendancePage() {
  const present = attendanceToday.filter((r) => r.status === "Present" || r.status === "Remote").length;
  const remote = attendanceToday.filter((r) => r.status === "Remote").length;
  const late = attendanceToday.filter((r) => r.status === "Late").length;
  const absent = attendanceToday.filter((r) => r.status === "Absent" || r.status === "On Leave").length;

  const summary = [
    { label: "Present Today", value: present, icon: UserCheck },
    { label: "Remote / WFH", value: remote, icon: Laptop },
    { label: "Late Arrivals", value: late, icon: TimerOff },
    { label: "Absent / On Leave", value: absent, icon: CalendarX },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Attendance" text="Today" />

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

      <AttendanceTable />
    </>
  );
}
