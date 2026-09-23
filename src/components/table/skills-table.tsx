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
import { skillCategories, skills, skillsTotalEmployees, type SkillCategory } from "@/mocks/skills";

const categoryStyles: Record<SkillCategory, string> = {
  Technical: "bg-primary/15 text-primary border-primary",
  Leadership: "bg-violet-600/15 text-violet-600 border-violet-600",
  Domain: "bg-cyan-500/15 text-cyan-600 border-cyan-500",
  "Soft Skills": "bg-yellow-500/15 text-yellow-600 border-yellow-500",
};

const proficiencyLabel = (score: number) => {
  if (score >= 4.5) return "Expert";
  if (score >= 3.5) return "Advanced";
  if (score >= 2) return "Intermediate";
  return "Beginner";
};

const SkillsTable = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | SkillCategory>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return skills.filter((skill) => {
      const matchesQuery = !q || skill.name.toLowerCase().includes(q);
      const matchesCategory = category === "all" || skill.category === category;
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
            placeholder="Search skills..."
            className="ps-9"
          />
        </div>

        <Select value={category} onValueChange={(value) => setCategory(value as typeof category)}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {skillCategories.map((c) => (
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
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tl-lg">Skill</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Category</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">People</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 w-[160px]">Coverage</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tr-lg">Avg. Proficiency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-neutral-500 dark:text-neutral-300">
                  No skills match your filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((skill) => {
                const coverage = Math.round((skill.peopleCount / skillsTotalEmployees) * 100);
                return (
                  <TableRow key={skill.id}>
                    <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 font-medium">
                      {skill.name}
                    </TableCell>
                    <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                      <span className={`px-2.5 py-1 rounded text-xs font-medium border whitespace-nowrap ${categoryStyles[skill.category]}`}>
                        {skill.category}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center">
                      {skill.peopleCount}
                    </TableCell>
                    <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 rounded-full bg-neutral-100 dark:bg-slate-700 overflow-hidden">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${coverage}%` }} />
                        </div>
                        <span className="text-sm text-neutral-500 dark:text-neutral-300 w-9 text-right">{coverage}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center">
                      <span className="font-medium">{skill.avgProficiency.toFixed(1)}</span>
                      <span className="text-sm text-neutral-500 dark:text-neutral-300"> / 5 · {proficiencyLabel(skill.avgProficiency)}</span>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-sm text-neutral-500 dark:text-neutral-300 pt-5">
        {filtered.length} of {skills.length} skills
      </p>
    </div>
  );
};

export default SkillsTable;
