"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { benefitCategories, benefitPlans, type BenefitCategory } from "@/mocks/benefits";

const categoryStyles: Record<BenefitCategory, string> = {
  Pension: "bg-primary/15 text-primary border-primary",
  Insurance: "bg-cyan-500/15 text-cyan-600 border-cyan-500",
  Wellbeing: "bg-green-600/15 text-green-600 border-green-600",
  Allowance: "bg-yellow-500/15 text-yellow-600 border-yellow-500",
};

const BenefitsTable = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | BenefitCategory>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return benefitPlans.filter((plan) => {
      const matchesQuery =
        !q ||
        plan.name.toLowerCase().includes(q) ||
        plan.provider.toLowerCase().includes(q);
      const matchesCategory = category === "all" || plan.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <div className="card">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="relative w-full sm:w-[260px]">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 dark:text-neutral-300" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search plan, provider..."
            className="ps-9"
          />
        </div>

        <Select value={category} onValueChange={(value) => setCategory(value as typeof category)}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {benefitCategories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tl-lg">Benefit Plan</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Category</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Provider</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 w-[160px]">Enrolled</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Employer Cost</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tr-lg">Employee Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-neutral-500 dark:text-neutral-300">
                  No benefit plans match your filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((plan) => {
                const percent = Math.round((plan.enrolled / plan.eligible) * 100);
                return (
                  <TableRow key={plan.id}>
                    <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 font-medium">
                      {plan.name}
                    </TableCell>
                    <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center">
                      <span className={`px-2.5 py-1 rounded text-xs font-medium border whitespace-nowrap ${categoryStyles[plan.category]}`}>
                        {plan.category}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                      {plan.provider}
                    </TableCell>
                    <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 rounded-full bg-neutral-100 dark:bg-slate-700 overflow-hidden">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
                        </div>
                        <span className="text-sm text-neutral-500 dark:text-neutral-300 whitespace-nowrap">
                          {plan.enrolled}/{plan.eligible}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 whitespace-nowrap">
                      {plan.employerCost}
                    </TableCell>
                    <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 whitespace-nowrap">
                      {plan.employeeCost}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-sm text-neutral-500 dark:text-neutral-300 pt-5">
        {filtered.length} of {benefitPlans.length} benefit plans
      </p>
    </div>
  );
};

export default BenefitsTable;
