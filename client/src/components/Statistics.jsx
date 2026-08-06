import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

const STATUS_LABELS = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  review: 'Review',
  done: 'Done',
};

function Statistics() {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStatistics = async () => {
    try {
      setLoading(true);
      const data = await api.todos.getStatistics();
      setStatistics(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatistics();
  }, []);

  if (loading) {
    return <div className="loading">Loading statistics...</div>;
  }

  if (error) {
    return (
      <div className="statistics-error" role="alert">
        <p>Unable to load statistics: {error}</p>
        <button type="button" onClick={loadStatistics}>Try again</button>
      </div>
    );
  }

  const completionPercentage = Math.min(
    Math.max(statistics.completionPercentage, 0),
    100
  );

  return (
    <section className="statistics" aria-labelledby="statistics-title">
      <div className="statistics-heading">
        <h2 id="statistics-title">Task Statistics</h2>
        <p>An overview of your current task progress.</p>
      </div>

      <div className="statistics-summary">
        <article className="stat-card stat-card-featured">
          <span className="stat-label">Total Tasks</span>
          <strong className="stat-value">{statistics.totalTasks}</strong>
        </article>

        <article className="stat-card stat-card-featured">
          <span className="stat-label">Completion</span>
          <strong className="stat-value">
            {completionPercentage.toFixed(1)}%
          </strong>
          <div
            className="progress-track"
            role="progressbar"
            aria-label="Task completion"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={completionPercentage}
          >
            <div
              className="progress-fill"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </article>
      </div>

      <h3 className="status-heading">Tasks by status</h3>
      <div className="status-grid">
        {Object.entries(STATUS_LABELS).map(([status, label]) => (
          <article className={`stat-card status-card status-${status}`} key={status}>
            <span className="stat-label">{label}</span>
            <strong className="status-value">
              {statistics.tasksByStatus[status]}
            </strong>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Statistics;
