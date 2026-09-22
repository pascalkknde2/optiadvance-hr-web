import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

import type { departmentSummaries } from "@/mocks/departments";

type DepartmentSummary = (typeof departmentSummaries)[number];

const DepartmentCard = ({ department }: { department: DepartmentSummary }) => {
  const { name, description, icon: Icon, headName, headcount, activeCount, locations, openPositions } =
    department;

  return (
    <div className="card">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <span className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5" />
          </span>
          <div>
            <h6 className="font-semibold mb-0.5">{name}</h6>
            <p className="text-sm text-neutral-500 dark:text-neutral-300">Led by {headName}</p>
          </div>
        </div>
        {openPositions > 0 && (
          <span className="shrink-0 px-2.5 py-1 rounded text-xs font-medium bg-cyan-500/15 text-cyan-600 border border-cyan-500">
            {openPositions} open
          </span>
        )}
      </div>

      <p className="text-sm text-neutral-500 dark:text-neutral-300 mb-4">{description}</p>

      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-2xl font-semibold mb-0">{headcount}</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-300">
            {activeCount} active
          </p>
        </div>
        <div className="flex flex-wrap justify-end gap-1.5 max-w-[60%]">
          {locations.map((location) => (
            <span
              key={location}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-neutral-100 dark:bg-slate-700 text-neutral-600 dark:text-neutral-200"
            >
              <MapPin className="w-3 h-3" />
              {location}
            </span>
          ))}
        </div>
      </div>

      <Link
        href={`/people/employees?department=${encodeURIComponent(name)}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        View team
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default DepartmentCard;
