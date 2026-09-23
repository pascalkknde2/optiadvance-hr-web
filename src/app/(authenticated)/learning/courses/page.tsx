import { BookOpen, GraduationCap, ShieldCheck, Users } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import CoursesTable from "@/components/table/courses-table";
import { courses } from "@/mocks/courses";

export const metadata: Metadata = {
  title: "Courses | OptiAdvance HR",
  description: "Course catalogue, enrollment and completion rates.",
};

export default function CoursesPage() {
  const totalEnrolled = courses.reduce((sum, course) => sum + course.enrolled, 0);
  const totalCompleted = courses.reduce((sum, course) => sum + course.completed, 0);
  const avgCompletion = Math.round((totalCompleted / totalEnrolled) * 100);
  const compliance = courses.filter((course) => course.category === "Compliance").length;

  const summary = [
    { label: "Total Courses", value: courses.length, icon: BookOpen },
    { label: "Total Enrollments", value: totalEnrolled, icon: Users },
    { label: "Avg. Completion Rate", value: `${avgCompletion}%`, icon: GraduationCap },
    { label: "Compliance Courses", value: compliance, icon: ShieldCheck },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Learning" text="Courses" />

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

      <CoursesTable />
    </>
  );
}
