"use client";

import { Search, Star } from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  candidateStages,
  candidates,
  type CandidateStage,
} from "@/mocks/candidates";
import { jobDepartments } from "@/mocks/jobs";

const stageStyles: Record<CandidateStage, string> = {
  Applied: "bg-gray-500/15 text-gray-500 dark:text-white border-gray-400",
  Screening: "bg-cyan-500/15 text-cyan-600 border-cyan-500",
  Shortlisted: "bg-yellow-500/15 text-yellow-600 border-yellow-500",
  Interview: "bg-primary/15 text-primary border-primary",
  "Technical Assessment": "bg-violet-600/15 text-violet-600 border-violet-600",
  "Final Interview": "bg-violet-600/15 text-violet-600 border-violet-600",
  Offer: "bg-green-600/15 text-green-600 border-green-600",
  Hired: "bg-green-600/15 text-green-600 border-green-600",
  Rejected: "bg-red-500/15 text-red-500 border-red-500",
};

const CandidatesTable = () => {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("all");
  const [stage, setStage] = useState<"all" | CandidateStage>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return candidates.filter((candidate) => {
      const matchesQuery =
        !q ||
        candidate.name.toLowerCase().includes(q) ||
        candidate.jobTitle.toLowerCase().includes(q) ||
        candidate.email.toLowerCase().includes(q);
      const matchesDepartment = department === "all" || candidate.department === department;
      const matchesStage = stage === "all" || candidate.stage === stage;
      return matchesQuery && matchesDepartment && matchesStage;
    });
  }, [query, department, stage]);

  return (
    <div className="card">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="relative w-full sm:w-[260px]">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 dark:text-neutral-300" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search candidate, role, email..."
            className="ps-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-[170px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All departments</SelectItem>
              {jobDepartments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={stage} onValueChange={(value) => setStage(value as typeof stage)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All stages</SelectItem>
              {candidateStages.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tl-lg">Candidate</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Applying For</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Source</TableHead>
              <TableHead className="px-4 h-12 text-start bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Applied</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600">Rating</TableHead>
              <TableHead className="px-4 h-12 text-center bg-neutral-100 dark:bg-slate-700 border-t border-neutral-200 first:border-s last:border-e dark:border-slate-600 rounded-tr-lg">Stage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-neutral-500 dark:text-neutral-300">
                  No candidates match your filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                    <div className="flex items-center gap-3">
                      <Image
                        src={candidate.avatar}
                        alt={candidate.name}
                        className="w-9 h-9 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{candidate.name}</p>
                        <p className="text-sm text-neutral-500 dark:text-neutral-300 truncate">{candidate.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                    <p className="text-sm font-medium">{candidate.jobTitle}</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-300">{candidate.department}</p>
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600">
                    {candidate.source}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 whitespace-nowrap">
                    {candidate.appliedDate}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center">
                    <span className="inline-flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                      {candidate.rating.toFixed(1)}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 px-4 border-b border-neutral-200 dark:border-slate-600 text-center">
                    <span className={`px-3 py-1.5 rounded text-sm font-medium border whitespace-nowrap ${stageStyles[candidate.stage]}`}>
                      {candidate.stage}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-sm text-neutral-500 dark:text-neutral-300 pt-5">
        {filtered.length} of {candidates.length} candidates
      </p>
    </div>
  );
};

export default CandidatesTable;
