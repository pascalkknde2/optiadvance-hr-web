"use client";

import Image from "next/image";
import type { DragEvent } from "react";
import { useMemo, useState } from "react";

import { candidates, type Candidate, type CandidateStage } from "@/mocks/candidates";

const BOARD_STAGES: CandidateStage[] = [
  "Applied",
  "Screening",
  "Shortlisted",
  "Interview",
  "Technical Assessment",
  "Final Interview",
  "Hired",
];

const columnAccent: Record<CandidateStage, string> = {
  Applied: "border-t-gray-400",
  Screening: "border-t-cyan-500",
  Shortlisted: "border-t-yellow-500",
  Interview: "border-t-primary",
  "Technical Assessment": "border-t-violet-600",
  "Final Interview": "border-t-violet-600",
  Offer: "border-t-green-600",
  Hired: "border-t-green-600",
  Rejected: "border-t-red-500",
};

const boardCandidates: Candidate[] = candidates.filter(
  (candidate) => candidate.stage !== "Offer" && candidate.stage !== "Rejected",
);

const PipelineBoard = () => {
  const [overrides, setOverrides] = useState<Record<string, CandidateStage>>({});

  const columns = useMemo(() => {
    const grouped = new Map<CandidateStage, Candidate[]>(BOARD_STAGES.map((stage) => [stage, []]));
    boardCandidates.forEach((candidate) => {
      const stage = overrides[candidate.id] ?? candidate.stage;
      grouped.get(stage)?.push(candidate);
    });
    return grouped;
  }, [overrides]);

  const handleDragStart = (event: DragEvent, id: string) => {
    event.dataTransfer.setData("text/plain", id);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (event: DragEvent, stage: CandidateStage) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain");
    if (!id) return;
    setOverrides((prev) => ({ ...prev, [id]: stage }));
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {BOARD_STAGES.map((stage) => {
        const stageCandidates = columns.get(stage) ?? [];
        return (
          <div
            key={stage}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDrop(event, stage)}
            className={`card w-[260px] shrink-0 border-t-4 ${columnAccent[stage]}`}
          >
            <div className="mb-3 flex items-center justify-between">
              <h6 className="text-sm font-semibold">{stage}</h6>
              <span className="rounded-full bg-neutral-100 dark:bg-slate-700 px-2 py-0.5 text-xs font-medium text-neutral-600 dark:text-neutral-300">
                {stageCandidates.length}
              </span>
            </div>

            <div className="space-y-2 min-h-[80px]">
              {stageCandidates.length === 0 ? (
                <div className="rounded-lg border border-dashed border-neutral-200 dark:border-slate-600 py-6 text-center text-xs text-neutral-400 dark:text-neutral-500">
                  No candidates
                </div>
              ) : (
                stageCandidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    draggable
                    onDragStart={(event) => handleDragStart(event, candidate.id)}
                    className="cursor-grab rounded-lg border border-neutral-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-3 active:cursor-grabbing"
                  >
                    <div className="flex items-center gap-2.5">
                      <Image
                        src={candidate.avatar}
                        alt={candidate.name}
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{candidate.name}</p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-300 truncate">{candidate.jobTitle}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PipelineBoard;
