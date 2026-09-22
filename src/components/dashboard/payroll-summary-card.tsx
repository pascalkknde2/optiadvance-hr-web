import { PoundSterling } from "lucide-react";

import type { payrollSummary } from "@/mocks/dashboard";

const PayrollSummaryCard = ({ period, netPay, lines, status }: typeof payrollSummary) => {
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-5">
        <span className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <PoundSterling className="w-4.5 h-4.5" />
        </span>
        <h6 className="font-semibold mb-0">Payroll Summary</h6>
      </div>

      <p className="text-sm text-neutral-500 dark:text-neutral-300 mb-1">{period} · Net pay</p>
      <h4 className="font-semibold mb-5">{netPay}</h4>

      <div className="flex flex-col gap-3 mb-5">
        {lines.map((line) => (
          <div key={line.label} className="flex items-center justify-between text-sm">
            <span className="text-neutral-600 dark:text-neutral-300">{line.label}</span>
            <span className="font-medium">{line.value}</span>
          </div>
        ))}
      </div>

      <p className="text-sm text-primary font-medium">{status}</p>
    </div>
  );
};

export default PayrollSummaryCard;
