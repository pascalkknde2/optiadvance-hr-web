"use client";

import {
  Building2,
  FileWarning,
  GripVertical,
  Landmark,
  RotateCcw,
  User,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
import type { DragEvent } from "react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { gbp, getPayslipBreakdown } from "@/lib/payslip";
import { earningsPeriod } from "@/mocks/earnings";
import { payslips } from "@/mocks/payslips";

type BlockId = "header" | "employee" | "earnings" | "deductions" | "summary" | "notes";

interface BlockDef {
  id: BlockId;
  label: string;
  description: string;
  icon: LucideIcon;
}

const BLOCK_DEFS: Record<BlockId, BlockDef> = {
  header: { id: "header", label: "Company Header", description: "Logo, company name and address", icon: Building2 },
  employee: { id: "employee", label: "Employee Details", description: "Name, ID, department and position", icon: User },
  earnings: { id: "earnings", label: "Earnings Table", description: "Basic pay plus overtime, bonuses and allowances", icon: Wallet },
  deductions: { id: "deductions", label: "Deductions Table", description: "Tax, National Insurance, pension and loans", icon: Landmark },
  summary: { id: "summary", label: "Net Pay Summary", description: "Gross, total deductions and net pay", icon: Wallet },
  notes: { id: "notes", label: "Footer Notes", description: "Disclaimer and generated-by note", icon: FileWarning },
};

const DEFAULT_ORDER: BlockId[] = ["header", "employee", "earnings", "deductions", "summary", "notes"];

const previewCandidates = payslips.filter((slip) => slip.period === earningsPeriod);
const defaultPreviewId = previewCandidates.find((slip) => slip.employeeName === "Amara Okafor")?.id
  ?? previewCandidates[0]?.id
  ?? "";

const PayslipTemplateDesigner = () => {
  const [order, setOrder] = useState<BlockId[]>(DEFAULT_ORDER);
  const [previewId, setPreviewId] = useState(defaultPreviewId);

  const available = useMemo(
    () => (Object.keys(BLOCK_DEFS) as BlockId[]).filter((id) => !order.includes(id)),
    [order],
  );

  const previewSlip = useMemo(
    () => previewCandidates.find((slip) => slip.id === previewId) ?? previewCandidates[0],
    [previewId],
  );

  const breakdown = useMemo(
    () => (previewSlip ? getPayslipBreakdown(previewSlip) : null),
    [previewSlip],
  );

  const moveToIndex = (id: BlockId, targetIndex: number) => {
    setOrder((prev) => {
      const withoutDragged = prev.filter((existing) => existing !== id);
      const insertAt = Math.min(targetIndex, withoutDragged.length);
      return [...withoutDragged.slice(0, insertAt), id, ...withoutDragged.slice(insertAt)];
    });
  };

  const removeBlock = (id: BlockId) => {
    setOrder((prev) => prev.filter((existing) => existing !== id));
  };

  const handleDragStart = (event: DragEvent, id: BlockId) => {
    event.dataTransfer.setData("text/plain", id);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDropOnRow = (event: DragEvent, targetIndex: number) => {
    event.preventDefault();
    event.stopPropagation();
    const id = event.dataTransfer.getData("text/plain") as BlockId;
    if (!id || !BLOCK_DEFS[id]) return;
    moveToIndex(id, targetIndex);
  };

  const handleDropOnCanvasEnd = (event: DragEvent) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain") as BlockId;
    if (!id || !BLOCK_DEFS[id]) return;
    moveToIndex(id, order.length);
  };

  const renderBlockPreview = (id: BlockId) => {
    if (!previewSlip || !breakdown) return null;
    const { basicPay, extraEarnings, itemisedDeductions } = breakdown;
    const totalDeductions = previewSlip.gross - previewSlip.netPay;

    switch (id) {
      case "header":
        return (
          <div className="flex items-center justify-between">
            {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, next/image's optimizer rejects local SVGs without extra config */}
            <img src="/logo/optiadvance-logo-refined.svg" alt="OptiAdvance" width={120} height={28} />
            <div className="text-right text-xs text-neutral-500 dark:text-neutral-300">
              <p className="font-medium text-foreground">Payslip · {previewSlip.period}</p>
              <p>1 Aldgate Square, London</p>
            </div>
          </div>
        );
      case "employee":
        return (
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div>
              <p className="text-neutral-500 dark:text-neutral-300">Employee</p>
              <p className="font-medium">{previewSlip.employeeName}</p>
            </div>
            <div>
              <p className="text-neutral-500 dark:text-neutral-300">Department</p>
              <p className="font-medium">{previewSlip.department}</p>
            </div>
            <div>
              <p className="text-neutral-500 dark:text-neutral-300">Position</p>
              <p className="font-medium">{previewSlip.position}</p>
            </div>
          </div>
        );
      case "earnings":
        return (
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-neutral-600 dark:text-neutral-300">Basic Pay</span>
              <span>{gbp(basicPay)}</span>
            </div>
            {extraEarnings.map((line) => (
              <div key={line.id} className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-300">{line.description}</span>
                <span>{gbp(line.amount)}</span>
              </div>
            ))}
            <div className="flex justify-between font-semibold pt-1 border-t border-neutral-200 dark:border-slate-600">
              <span>Gross Pay</span>
              <span>{gbp(previewSlip.gross)}</span>
            </div>
          </div>
        );
      case "deductions":
        return (
          <div className="space-y-1 text-xs">
            {itemisedDeductions.length > 0 ? (
              itemisedDeductions.map((line) => (
                <div key={line.id} className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-300">{line.type}</span>
                  <span className="text-red-500">−{gbp(line.amount)}</span>
                </div>
              ))
            ) : (
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-300">Tax, NI & Pension</span>
                <span className="text-red-500">−{gbp(totalDeductions)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold pt-1 border-t border-neutral-200 dark:border-slate-600">
              <span>Total Deductions</span>
              <span className="text-red-500">−{gbp(totalDeductions)}</span>
            </div>
          </div>
        );
      case "summary":
        return (
          <div className="flex items-center justify-between rounded-lg bg-primary/10 px-4 py-2.5">
            <span className="text-sm font-semibold">Net Pay</span>
            <span className="text-base font-semibold text-primary">{gbp(previewSlip.netPay)}</span>
          </div>
        );
      case "notes":
        return (
          <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
            This is a computer-generated payslip and does not require a signature.
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
      {/* Palette */}
      <div className="card h-fit">
        <h6 className="font-semibold mb-1">Blocks</h6>
        <p className="text-sm text-neutral-500 dark:text-neutral-300 mb-4">
          Drag a block onto the layout to add it.
        </p>

        {available.length === 0 ? (
          <p className="text-sm text-neutral-400 dark:text-neutral-500">All blocks are on the layout.</p>
        ) : (
          <div className="space-y-2">
            {available.map((id) => {
              const block = BLOCK_DEFS[id];
              const Icon = block.icon;
              return (
                <div
                  key={id}
                  draggable
                  onDragStart={(event) => handleDragStart(event, id)}
                  className="flex cursor-grab items-start gap-2.5 rounded-lg border border-neutral-200 dark:border-slate-600 p-3 active:cursor-grabbing"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{block.label}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-300">{block.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-5 flex flex-col gap-2">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setOrder(DEFAULT_ORDER)}
          >
            <RotateCcw className="h-4 w-4" /> Reset to default
          </Button>
          <Button onClick={() => toast.success("Template saved (preview only).")}>Save Template</Button>
        </div>
      </div>

      {/* Canvas */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h6 className="font-semibold mb-1">Layout</h6>
            <p className="text-sm text-neutral-500 dark:text-neutral-300">Drag blocks to reorder. Live preview below.</p>
          </div>
          {previewCandidates.length > 0 && (
            <Select value={previewId} onValueChange={setPreviewId}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Preview employee" />
              </SelectTrigger>
              <SelectContent>
                {previewCandidates.map((slip) => (
                  <SelectItem key={slip.id} value={slip.id}>
                    {slip.employeeName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div
          className="card space-y-3"
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDropOnCanvasEnd}
        >
          {order.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-300 dark:border-slate-600 px-6 py-16 text-center">
              <p className="text-sm text-neutral-500 dark:text-neutral-300">Drag a block here to start building the payslip.</p>
            </div>
          ) : (
            order.map((id, index) => {
              const block = BLOCK_DEFS[id];
              return (
                <div
                  key={id}
                  draggable
                  onDragStart={(event) => handleDragStart(event, id)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => handleDropOnRow(event, index)}
                  className="rounded-lg border border-neutral-200 dark:border-slate-600 p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex cursor-grab items-center gap-2 active:cursor-grabbing">
                      <GripVertical className="h-4 w-4 text-neutral-400" />
                      <span className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-300">
                        {block.label}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeBlock(id)}
                      className="text-neutral-400 hover:text-red-500"
                      aria-label={`Remove ${block.label}`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  {renderBlockPreview(id)}
                </div>
              );
            })
          )}

          {order.length > 0 && (
            <div
              onDragOver={(event) => event.preventDefault()}
              onDrop={handleDropOnCanvasEnd}
              className="rounded-lg border-2 border-dashed border-neutral-200 dark:border-slate-600 py-4 text-center text-xs text-neutral-400 dark:text-neutral-500"
            >
              Drop here to add to the end
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PayslipTemplateDesigner;
