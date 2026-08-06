import React from 'react';

const STATUS_OPTIONS = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'review', label: 'Review' },
  { value: 'done', label: 'Done' },
];

function isOverdue(todo) {
  if (!todo.dueDate || todo.status === 'done') {
    return false;
  }

  const today = new Date();
  const todayStr = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-');

  return todo.dueDate < todayStr;
}

function TodoItem({ todo, onStatusChange, onDelete, onUpdateDueDate }) {
  const overdue = isOverdue(todo);

  return (
    <div className={`todo-item status-${todo.status} ${todo.status === 'done' ? 'done' : ''} ${overdue ? 'overdue' : ''}`}>
      <div className="todo-content">
        <span className="todo-title">{todo.title}</span>

        <div className="todo-meta-row">
          <label className="status-select-label">
            Status
            <select
              className="status-select"
              value={todo.status}
              onChange={(e) => onStatusChange(todo.id, e.target.value)}
              aria-label={`Status for ${todo.title}`}
            >
              {STATUS_OPTIONS.map((statusOption) => (
                <option key={statusOption.value} value={statusOption.value}>
                  {statusOption.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="todo-due-date">
          <label>
            Due
            <input
              type="date"
              className="due-date-input"
              value={todo.dueDate || ''}
              onChange={(e) => onUpdateDueDate(todo.id, e.target.value || null)}
              aria-label={`Due date for ${todo.title}`}
            />
          </label>
          {overdue && <span className="overdue-badge">Overdue</span>}
        </div>
      </div>

      <button
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
        aria-label="Delete todo"
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
export { isOverdue };
