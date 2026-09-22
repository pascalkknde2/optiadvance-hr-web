import { shiftRoster, shiftTypes } from "@/mocks/shifts";

const ShiftCatalog = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {shiftTypes.map((shift) => {
        const assigned = shiftRoster.filter((roster) => roster.days.includes(shift.code)).length;

        return (
          <div key={shift.code} className="card">
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2.5 h-2.5 rounded-full ${shift.color}`} />
              <h6 className="font-semibold mb-0">{shift.label}</h6>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-300 mb-3">{shift.time}</p>
            <p className="text-2xl font-semibold mb-0">{assigned}</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-300">people rostered this week</p>
          </div>
        );
      })}
    </div>
  );
};

export default ShiftCatalog;
