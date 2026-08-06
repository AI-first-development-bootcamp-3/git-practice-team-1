import React from 'react';

const STATUSES = [
  { key: 'todo', label: 'To Do', color: '#64748b' },
  { key: 'in-progress', label: 'In Progress', color: '#f59e0b' },
  { key: 'review', label: 'Review', color: '#8b5cf6' },
  { key: 'done', label: 'Done', color: '#10b981' },
];

const CENTER = 60;
const RADIUS = 50;

function getPoint(angle) {
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  };
}

function getSlicePath(startAngle, endAngle) {
  const start = getPoint(startAngle);
  const end = getPoint(endAngle);
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

  return [
    `M ${CENTER} ${CENTER}`,
    `L ${start.x} ${start.y}`,
    `A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${end.x} ${end.y}`,
    'Z',
  ].join(' ');
}

function PieChart({ tasksByStatus }) {
  const values = STATUSES.map(status => ({
    ...status,
    count: tasksByStatus[status.key] ?? 0,
  }));
  const total = values.reduce((sum, status) => sum + status.count, 0);

  if (total === 0) {
    return (
      <section className="visual-chart" aria-labelledby="pie-chart-title">
        <h3 id="pie-chart-title">Status proportions</h3>
        <p className="visual-chart-empty">No task data to chart yet.</p>
      </section>
    );
  }

  let currentAngle = -Math.PI / 2;

  return (
    <section className="visual-chart" aria-labelledby="pie-chart-title">
      <h3 id="pie-chart-title">Status proportions</h3>
      <div className="pie-chart-layout">
        <svg
          className="pie-chart"
          viewBox="0 0 120 120"
          role="img"
          aria-labelledby="pie-svg-title pie-svg-description"
        >
          <title id="pie-svg-title">Task status proportions</title>
          <desc id="pie-svg-description">
            {values.map(({ label, count }) => `${label}: ${count}`).join(', ')}
          </desc>
          {values.map(({ key, label, color, count }) => {
            if (count === 0) return null;

            const sliceAngle = (count / total) * Math.PI * 2;
            const startAngle = currentAngle;
            const endAngle = currentAngle + sliceAngle;
            currentAngle = endAngle;

            if (count === total) {
              return (
                <circle
                  key={key}
                  cx={CENTER}
                  cy={CENTER}
                  r={RADIUS}
                  fill={color}
                  aria-label={`${label}: ${count}`}
                />
              );
            }

            return (
              <path
                key={key}
                d={getSlicePath(startAngle, endAngle)}
                fill={color}
                aria-label={`${label}: ${count}`}
              />
            );
          })}
        </svg>

        <ul className="pie-chart-legend" aria-label="Task status counts">
          {values.map(({ key, label, color, count }) => (
            <li key={key}>
              <span
                className="pie-chart-swatch"
                style={{ backgroundColor: color }}
                aria-hidden="true"
              />
              <span>{label}</span>
              <strong>{count}</strong>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default PieChart;
