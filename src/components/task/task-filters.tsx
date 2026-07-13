import React from "react";

type FilterStatus = "all" | "active" | "done";

type Props = {
  status: FilterStatus;
  setStatus: (s: FilterStatus) => void;
  search: string;
  setSearch: (v: string) => void;
  remainingCount: number;
};

export default function TaskFilters({
  status,
  setStatus,
  search,
  setSearch,
  remainingCount,
}: Props) {
  return (
    <div className="task-filters">
      <div className="task-filters__tabs">
        <button className={`btn ${status === "all" ? "btn--primary" : ""}`} onClick={() => setStatus("all")}>
          All
        </button>
        <button className={`btn ${status === "active" ? "btn--primary" : ""}`} onClick={() => setStatus("active")}>
          Active
        </button>
        <button className={`btn ${status === "done" ? "btn--primary" : ""}`} onClick={() => setStatus("done")}>
          Done
        </button>
      </div>

      <input
        className="input"
        placeholder="Search tasks..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="task-filters__meta">
        <span className="pill">{remainingCount} remaining</span>
      </div>
    </div>
  );
}
