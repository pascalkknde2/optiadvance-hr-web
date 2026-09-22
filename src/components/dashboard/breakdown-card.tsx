import type { LucideIcon } from "lucide-react";

interface BreakdownRow {
  label: string;
  value: number;
  percent: number;
  color: string;
}

interface BreakdownCardProps {
  title: string;
  icon: LucideIcon;
  rows: BreakdownRow[];
  footer?: string;
}

const BreakdownCard = ({ title, icon: Icon, rows, footer }: BreakdownCardProps) => {
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-5">
        <span className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Icon className="w-4.5 h-4.5" />
        </span>
        <h6 className="font-semibold mb-0">{title}</h6>
      </div>

      <div className="flex flex-col gap-4">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="flex items-center justify-between mb-1.5 text-sm">
              <span className="text-neutral-600 dark:text-neutral-300">{row.label}</span>
              <span className="font-medium">{row.value}</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-neutral-100 dark:bg-slate-700 overflow-hidden">
              <div
                className={`h-full rounded-full ${row.color}`}
                style={{ width: `${row.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {footer && (
        <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-300">{footer}</p>
      )}
    </div>
  );
};

export default BreakdownCard;
