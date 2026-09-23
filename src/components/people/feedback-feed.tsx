"use client";

import { ArrowRight, Search } from "lucide-react";
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
import { feedbackEntries, feedbackTypes, type FeedbackType } from "@/mocks/feedback";

const typeStyles: Record<FeedbackType, string> = {
  Peer: "bg-cyan-500/15 text-cyan-600 border-cyan-500",
  Manager: "bg-primary/15 text-primary border-primary",
  Upward: "bg-yellow-500/15 text-yellow-600 border-yellow-500",
  Kudos: "bg-violet-600/15 text-violet-600 border-violet-600",
};

const FeedbackFeed = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"all" | FeedbackType>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return feedbackEntries.filter((entry) => {
      const matchesQuery =
        !q ||
        entry.fromName.toLowerCase().includes(q) ||
        entry.toName.toLowerCase().includes(q) ||
        entry.message.toLowerCase().includes(q);
      const matchesType = type === "all" || entry.type === type;
      return matchesQuery && matchesType;
    });
  }, [query, type]);

  return (
    <div className="card">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="relative w-full sm:w-[280px]">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 dark:text-neutral-300" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search people or feedback..."
            className="ps-9"
          />
        </div>

        <Select value={type} onValueChange={(value) => setType(value as typeof type)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            {feedbackTypes.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Feed */}
      {filtered.length === 0 ? (
        <p className="py-10 text-center text-neutral-500 dark:text-neutral-300">
          No feedback matches your filters.
        </p>
      ) : (
        <ul className="flex flex-col divide-y divide-neutral-200 dark:divide-slate-600">
          {filtered.map((entry) => (
            <li key={entry.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-center gap-2 mb-2">
                <Image
                  src={entry.fromAvatar}
                  alt={entry.fromName}
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                />
                <span className="text-sm font-medium">{entry.fromName}</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 shrink-0" />
                <Image
                  src={entry.toAvatar}
                  alt={entry.toName}
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                />
                <span className="text-sm font-medium">{entry.toName}</span>
                <span className={`ms-1 px-2.5 py-1 rounded text-xs font-medium border whitespace-nowrap ${typeStyles[entry.type]}`}>
                  {entry.type}
                </span>
                <span className="ms-auto text-sm text-neutral-500 dark:text-neutral-300 shrink-0">{entry.date}</span>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 ps-10">{entry.message}</p>
            </li>
          ))}
        </ul>
      )}

      <p className="text-sm text-neutral-500 dark:text-neutral-300 pt-5">
        {filtered.length} of {feedbackEntries.length} entries
      </p>
    </div>
  );
};

export default FeedbackFeed;
