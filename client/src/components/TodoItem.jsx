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

function TodoItem({ todo, onToggle, onDelete, onUpdateDueDate }) {
  const overdue = isOverdue(todo);

  return (
    <div className={`todo-item ${todo.status === 'done' ? 'done' : ''} ${overdue ? 'overdue' : ''}`}>
      <button
        className="toggle-btn"
        onClick={() => onToggle(todo.id)}
        aria-label={todo.status === 'done' ? 'Mark as pending' : 'Mark as done'}
      >
        {todo.status === 'done' ? '✓' : '○'}
      </button>

      <div className="todo-content">
        <span className="todo-title">{todo.title}</span>
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
        🗑️
      </button>
    </div>
  );
}

export default TodoItem;
export { isOverdue };
