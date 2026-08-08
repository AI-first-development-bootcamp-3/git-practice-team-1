import React from 'react';
import TodoItem from './TodoItem';

const BOARD_COLUMNS = [
  { key: 'todo', title: 'To Do' },
  { key: 'in-progress', title: 'In Progress' },
  { key: 'review', title: 'Review' },
  { key: 'done', title: 'Done' },
];

function TodoList({
  todos,
  statuses = [],
  onStatusChange,
  onDelete,
  onUpdateDueDate,
  onUpdatePriority,
  onUpdateTitle,
  showOverdueOnly,
  hasActiveFilters = false,
}) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>
          {showOverdueOnly
            ? 'No overdue todos.'
            : hasActiveFilters
              ? 'No todos match your search or filters.'
              : 'No todos yet. Add one above!'}
        </p>
      </div>
    );
  }

  return (
    <div className="board-grid">
      {BOARD_COLUMNS.map((column) => {
        const columnTodos = todos.filter((todo) => todo.status === column.key);

        return (
          <section key={column.key} className={`board-column board-column-${column.key}`}>
            <div className="board-column-header">
              <h2>{column.title}</h2>
              <span>{columnTodos.length}</span>
            </div>

            <div className="board-column-items">
              {columnTodos.length > 0 ? (
                columnTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    statuses={statuses}
                    onStatusChange={onStatusChange}
                    onDelete={onDelete}
                    onUpdateDueDate={onUpdateDueDate}
                    onUpdatePriority={onUpdatePriority}
                    onUpdateTitle={onUpdateTitle}
                  />
                ))
              ) : (
                <p className="board-column-empty">No tasks in this stage.</p>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default TodoList;
