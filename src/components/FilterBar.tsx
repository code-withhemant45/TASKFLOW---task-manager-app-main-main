
import { FilterStatus } from "@/types";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
  activeFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  taskCounts: {
    all: number;
    active: number;
    completed: number;
  };
}

const FilterBar = ({ activeFilter, onFilterChange, taskCounts }: FilterBarProps) => {
  return (
    <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:items-center sm:justify-between mb-4 animate-fade-in">
      <div className="flex space-x-2">
        <Button
          variant={activeFilter === "all" ? "default" : "ghost"}
          onClick={() => onFilterChange("all")}
          className="text-sm"
        >
          All ({taskCounts.all})
        </Button>
        <Button
          variant={activeFilter === "active" ? "default" : "ghost"}
          onClick={() => onFilterChange("active")}
          className="text-sm"
        >
          Active ({taskCounts.active})
        </Button>
        <Button
          variant={activeFilter === "completed" ? "default" : "ghost"}
          onClick={() => onFilterChange("completed")}
          className="text-sm"
        >
          Completed ({taskCounts.completed})
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
