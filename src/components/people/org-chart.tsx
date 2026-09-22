"use client";

import { ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { orgChart, orgChartDepartments, type OrgNode } from "@/mocks/org-chart";
import { cn } from "@/lib/utils";

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const matches = (node: OrgNode, query: string) =>
  !query ||
  node.employeeName.toLowerCase().includes(query) ||
  node.positionTitle.toLowerCase().includes(query);

const OrgChart = () => {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("all");
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const q = query.trim().toLowerCase();

  const visibleLeads = useMemo(
    () => orgChart.filter((lead) => department === "all" || lead.department === department),
    [department]
  );

  const toggle = (positionTitle: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(positionTitle)) {
        next.delete(positionTitle);
      } else {
        next.add(positionTitle);
      }
      return next;
    });
  };

  return (
    <div className="card">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="relative w-full sm:w-[280px]">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 dark:text-neutral-300" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search people or roles..."
            className="ps-9"
          />
        </div>

        <Select value={department} onValueChange={setDepartment}>
          <SelectTrigger className="w-[190px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All departments</SelectItem>
            {orgChartDepartments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {visibleLeads.map((lead) => {
          const isOpen = !collapsed.has(lead.positionTitle);
          const leadMatches = matches(lead, q);

          return (
            <div
              key={lead.positionTitle}
              className="rounded-xl border border-neutral-200 dark:border-slate-600 overflow-hidden"
            >
              {/* Lead */}
              <button
                type="button"
                onClick={() => toggle(lead.positionTitle)}
                className={cn(
                  "w-full flex items-center gap-3 p-4 text-left bg-neutral-50 dark:bg-slate-700/60 hover:bg-neutral-100 dark:hover:bg-slate-700 transition-colors",
                  leadMatches && q ? "ring-2 ring-primary ring-inset" : ""
                )}
              >
                {lead.avatar ? (
                  <Image
                    src={lead.avatar}
                    alt={lead.employeeName}
                    className="w-11 h-11 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <span className="w-11 h-11 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center shrink-0">
                    {initials(lead.employeeName)}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold truncate">{lead.employeeName}</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-300 truncate">
                    {lead.positionTitle} · {lead.department}
                  </p>
                </div>
                <span className="text-sm text-neutral-500 dark:text-neutral-300 shrink-0">
                  {lead.reports.length} report{lead.reports.length === 1 ? "" : "s"}
                </span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 shrink-0 transition-transform text-neutral-500 dark:text-neutral-300",
                    isOpen ? "rotate-180" : ""
                  )}
                />
              </button>

              {/* Reports */}
              {isOpen && lead.reports.length > 0 && (
                <ul className="divide-y divide-neutral-200 dark:divide-slate-600">
                  {lead.reports.map((report) => (
                    <li
                      key={report.positionTitle}
                      className={cn(
                        "flex items-center gap-3 py-3 ps-8 pe-4",
                        matches(report, q) && q ? "bg-primary/5" : ""
                      )}
                    >
                      {report.avatar ? (
                        <Image
                          src={report.avatar}
                          alt={report.employeeName}
                          className="w-8 h-8 rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <span className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-slate-600 text-xs font-semibold flex items-center justify-center shrink-0">
                          {initials(report.employeeName)}
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{report.employeeName}</p>
                        <p className="text-sm text-neutral-500 dark:text-neutral-300 truncate">
                          {report.positionTitle}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrgChart;
