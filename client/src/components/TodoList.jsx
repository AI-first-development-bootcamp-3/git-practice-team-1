import React from 'react';
import TodoItem from './TodoItem';

function TodoList({
  todos,
  statuses = [],
  onStatusChange,
  onDelete,
  onUpdateDueDate,
  onUpdateTitle,
  showOverdueOnly,
}) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>
          {showOverdueOnly
            ? 'No overdue todos.'
            : 'No todos yet. Add one above!'}
        </p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {statuses.map((status) => {
        const sectionTodos = todos.filter((t) => t.status === status.id);
        if (sectionTodos.length === 0) {
          return null;
        }

        return (
          <section key={status.id} className="todo-section">
            <h2>{status.label} ({sectionTodos.length})</h2>
            {sectionTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                statuses={statuses}
                onStatusChange={onStatusChange}
                onDelete={onDelete}
                onUpdateDueDate={onUpdateDueDate}
                onUpdateTitle={onUpdateTitle}
              />
            ))}
          </section>
        );
      })}
    </div>
  );
}

export default TodoList;
