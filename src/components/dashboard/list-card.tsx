import type { LucideIcon } from "lucide-react";

interface ListCardRow {
  name: string;
  meta: string;
  date: string;
}

interface ListCardProps {
  title: string;
  icon: LucideIcon;
  rows: ListCardRow[];
  emptyLabel?: string;
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const ListCard = ({ title, icon: Icon, rows, emptyLabel = "Nothing to show" }: ListCardProps) => {
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-5">
        <span className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Icon className="w-4.5 h-4.5" />
        </span>
        <h6 className="font-semibold mb-0">{title}</h6>
      </div>

      {rows.length === 0 ? (
        <p className="text-sm text-neutral-500 dark:text-neutral-300">{emptyLabel}</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {rows.map((row) => (
            <li key={`${row.name}-${row.date}`} className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-slate-700 text-neutral-600 dark:text-neutral-200 text-xs font-semibold flex items-center justify-center shrink-0">
                {initials(row.name)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{row.name}</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-300 truncate">{row.meta}</p>
              </div>
              <span className="text-sm text-neutral-500 dark:text-neutral-300 shrink-0">{row.date}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListCard;
