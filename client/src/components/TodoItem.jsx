import React, { useEffect, useRef, useState } from 'react';

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

function TodoItem({ todo, onToggle, onDelete, onUpdateDueDate, onUpdateTitle }) {
  const overdue = isOverdue(todo);
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(todo.title);
  const inputRef = useRef(null);
  const skipBlurSave = useRef(false);

  useEffect(() => {
    if (!isEditing) {
      setDraftTitle(todo.title);
    }
  }, [todo.title, isEditing]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const startEditing = () => {
    setDraftTitle(todo.title);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    skipBlurSave.current = true;
    setDraftTitle(todo.title);
    setIsEditing(false);
  };

  const saveTitle = () => {
    const nextTitle = draftTitle.trim();
    if (!nextTitle) {
      setDraftTitle(todo.title);
      setIsEditing(true);
      requestAnimationFrame(() => inputRef.current?.focus());
      return;
    }

    setIsEditing(false);

    if (nextTitle !== todo.title) {
      onUpdateTitle(todo.id, nextTitle);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveTitle();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelEditing();
    }
  };

  const handleBlur = () => {
    if (skipBlurSave.current) {
      skipBlurSave.current = false;
      return;
    }
    saveTitle();
  };

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
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            className="todo-title-input"
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            aria-label={`Edit title for ${todo.title}`}
          />
        ) : (
          <span
            className="todo-title"
            onClick={startEditing}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                startEditing();
              }
            }}
            title="Click to edit"
          >
            {todo.title}
          </span>
        )}
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
