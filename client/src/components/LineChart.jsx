import React from 'react';

const WIDTH = 600;
const HEIGHT = 260;
const PADDING = {
  top: 20,
  right: 20,
  bottom: 42,
  left: 44,
};

function LineChart({ tasksCreatedByDate }) {
  if (tasksCreatedByDate.length === 0) {
    return (
      <section className="visual-chart visual-chart-wide" aria-labelledby="line-chart-title">
        <h3 id="line-chart-title">Tasks created over time</h3>
        <p className="visual-chart-empty">No creation history to chart yet.</p>
      </section>
    );
  }

  const chartWidth = WIDTH - PADDING.left - PADDING.right;
  const chartHeight = HEIGHT - PADDING.top - PADDING.bottom;
  const highestCount = Math.max(
    ...tasksCreatedByDate.map(({ count }) => count),
    1
  );

  const points = tasksCreatedByDate.map(({ date, count }, index) => {
    const x = tasksCreatedByDate.length === 1
      ? PADDING.left + chartWidth / 2
      : PADDING.left + (index / (tasksCreatedByDate.length - 1)) * chartWidth;
    const y = PADDING.top + chartHeight - (count / highestCount) * chartHeight;

    return { date, count, x, y };
  });

  return (
    <section className="visual-chart visual-chart-wide" aria-labelledby="line-chart-title">
      <h3 id="line-chart-title">Tasks created over time</h3>
      <svg
        className="line-chart"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-labelledby="line-svg-title line-svg-description"
      >
        <title id="line-svg-title">Daily task creation trend</title>
        <desc id="line-svg-description">
          {points.map(({ date, count }) => `${date}: ${count}`).join(', ')}
        </desc>

        <line
          className="line-chart-axis"
          x1={PADDING.left}
          y1={PADDING.top + chartHeight}
          x2={WIDTH - PADDING.right}
          y2={PADDING.top + chartHeight}
        />
        <line
          className="line-chart-axis"
          x1={PADDING.left}
          y1={PADDING.top}
          x2={PADDING.left}
          y2={PADDING.top + chartHeight}
        />

        <text className="line-chart-axis-label" x={PADDING.left - 8} y={PADDING.top + 5}>
          {highestCount}
        </text>
        <text
          className="line-chart-axis-label"
          x={PADDING.left - 8}
          y={PADDING.top + chartHeight + 4}
        >
          0
        </text>

        {points.length > 1 && (
          <polyline
            className="line-chart-path"
            points={points.map(({ x, y }) => `${x},${y}`).join(' ')}
          />
        )}

        {points.map(({ date, count, x, y }) => (
          <circle className="line-chart-point" key={date} cx={x} cy={y} r="6">
            <title>{`${date}: ${count} tasks created`}</title>
          </circle>
        ))}

        <text
          className="line-chart-date"
          x={points[0].x}
          y={HEIGHT - 12}
          textAnchor={points.length === 1 ? 'middle' : 'start'}
        >
          {points[0].date}
        </text>
        {points.length > 1 && (
          <text
            className="line-chart-date"
            x={points.at(-1).x}
            y={HEIGHT - 12}
            textAnchor="end"
          >
            {points.at(-1).date}
          </text>
        )}
      </svg>

      <ul className="line-chart-values" aria-label="Daily task creation counts">
        {points.map(({ date, count }) => (
          <li key={date}>
            <span>{date}</span>
            <strong>{count}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default LineChart;
