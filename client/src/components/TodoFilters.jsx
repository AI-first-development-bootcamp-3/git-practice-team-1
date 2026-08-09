import React from 'react';

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

function TodoFilters({
  search,
  selectedStatuses,
  selectedPriorities,
  statuses = [],
  onSearchChange,
  onToggleStatus,
  onTogglePriority,
  onClear,
  hasActiveFilters,
}) {
  return (
    <div className="todo-filters" aria-label="Search and filters">
      <input
        type="search"
        className="filter-search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by title..."
        aria-label="Search todos by title"
      />

      <div className="filter-group">
        <span className="filter-group-label">Status</span>
        <div className="filter-options">
          {statuses.map((status) => (
            <label key={status.id} className="filter-chip">
              <input
                type="checkbox"
                checked={selectedStatuses.includes(status.id)}
                onChange={() => onToggleStatus(status.id)}
              />
              {status.label}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-group-label">Priority</span>
        <div className="filter-options">
          {PRIORITY_OPTIONS.map((priority) => (
            <label key={priority.value} className="filter-chip">
              <input
                type="checkbox"
                checked={selectedPriorities.includes(priority.value)}
                onChange={() => onTogglePriority(priority.value)}
              />
              {priority.label}
            </label>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button type="button" className="filter-clear" onClick={onClear}>
          Clear filters
        </button>
      )}
    </div>
  );
}

export default TodoFilters;
