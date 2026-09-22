import { TrendingDown, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";
import type { KpiCardData } from "@/mocks/dashboard";

const toneStyles: Record<KpiCardData["tone"], string> = {
  positive: "text-green-600 dark:text-green-400",
  negative: "text-red-600 dark:text-red-400",
  neutral: "text-neutral-500 dark:text-neutral-300",
};

const KpiCard = ({ label, value, delta, tone, icon: Icon }: KpiCardData) => {
  const isDown = delta.trim().startsWith("-");

  return (
    <div className="card flex items-start justify-between gap-3">
      <div>
        <p className="text-sm text-neutral-500 dark:text-neutral-300 mb-2">{label}</p>
        <h4 className="font-semibold mb-2">{value}</h4>
        <span className={cn("inline-flex items-center gap-1 text-sm font-medium", toneStyles[tone])}>
          {isDown ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
          {delta}
        </span>
      </div>
      <span className="shrink-0 w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center">
        <Icon className="w-5 h-5" />
      </span>
    </div>
  );
};

export default KpiCard;
