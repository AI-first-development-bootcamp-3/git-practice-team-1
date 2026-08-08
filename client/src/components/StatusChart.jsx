import React from 'react';

const STATUSES = [
  { key: 'todo', label: 'To Do' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'review', label: 'Review' },
  { key: 'done', label: 'Done' },
];

function StatusChart({ tasksByStatus }) {
  const highestCount = Math.max(
    ...STATUSES.map(({ key }) => tasksByStatus[key] ?? 0)
  );

  if (highestCount === 0) {
    return (
      <section className="status-chart" aria-labelledby="status-chart-title">
        <h3 id="status-chart-title">Status distribution</h3>
        <p className="status-chart-empty">No task data to chart yet.</p>
      </section>
    );
  }

  return (
    <section className="status-chart" aria-labelledby="status-chart-title">
      <h3 id="status-chart-title">Status distribution</h3>
      <div className="status-chart-bars">
        {STATUSES.map(({ key, label }) => {
          const count = tasksByStatus[key] ?? 0;
          const width = (count / highestCount) * 100;

          return (
            <div
              className="status-chart-row"
              key={key}
              aria-label={`${label}: ${count} tasks`}
            >
              <span className="status-chart-label">{label}</span>
              <div className="status-chart-track" aria-hidden="true">
                <div
                  className={`status-chart-bar status-chart-bar-${key}`}
                  style={{ width: `${width}%` }}
                />
              </div>
              <strong className="status-chart-count">{count}</strong>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default StatusChart;
