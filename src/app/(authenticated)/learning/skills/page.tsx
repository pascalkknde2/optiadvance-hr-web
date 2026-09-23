import { AlertTriangle, Layers, Sparkles, Target } from "lucide-react";
import type { Metadata } from "next";

import DashboardBreadcrumb from "@/components/layout/dashboard-breadcrumb";
import SkillsTable from "@/components/table/skills-table";
import { skills } from "@/mocks/skills";

export const metadata: Metadata = {
  title: "Skills Matrix | OptiAdvance HR",
  description: "Workforce skills coverage and proficiency for succession planning.",
};

export default function SkillsPage() {
  const avgProficiency =
    Math.round((skills.reduce((sum, skill) => sum + skill.avgProficiency, 0) / skills.length) * 10) / 10;
  const gaps = skills.filter((skill) => skill.peopleCount <= 3).length;

  const summary = [
    { label: "Skills Tracked", value: skills.length, icon: Layers },
    { label: "Org-wide Avg. Proficiency", value: `${avgProficiency} / 5`, icon: Sparkles },
    { label: "Skill Gaps (≤3 people)", value: gaps, icon: AlertTriangle },
    { label: "Categories", value: 4, icon: Target },
  ];

  return (
    <>
      <DashboardBreadcrumb title="Learning" text="Skills Matrix" />

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

      <SkillsTable />
    </>
  );
}
