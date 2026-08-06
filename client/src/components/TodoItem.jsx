import React from 'react';

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

function TodoItem({ todo, onToggle, onDelete, onUpdateDueDate, onUpdatePriority }) {
  const overdue = isOverdue(todo);
  const priority = todo.priority || 'medium';

  return (
    <div
      className={`todo-item priority-${priority} ${todo.status === 'done' ? 'done' : ''} ${overdue ? 'overdue' : ''}`}
    >
      <button
        className="toggle-btn"
        onClick={() => onToggle(todo.id)}
        aria-label={todo.status === 'done' ? 'Mark as pending' : 'Mark as done'}
      >
        {todo.status === 'done' ? '✓' : '○'}
      </button>

      <div className="todo-content">
        <span className="todo-title">{todo.title}</span>
        <div className="todo-meta">
          <label className="priority-label">
            Priority
            <select
              className={`priority-select priority-${priority}`}
              value={priority}
              onChange={(e) => onUpdatePriority(todo.id, e.target.value)}
              aria-label={`Priority for ${todo.title}`}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
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
      </div>

      <button
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
        aria-label="Delete todo"
      >
        🗑️
      </button>
    </div>
  );
}

export default TodoItem;
export { isOverdue };
