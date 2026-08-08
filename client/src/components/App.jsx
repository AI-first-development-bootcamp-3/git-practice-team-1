import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import Statistics from './Statistics';
import { isOverdue } from './TodoItem';
import '../App.css';

function App() {
  const [activeView, setActiveView] = useState('board');
  const [todos, setTodos] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOverdueOnly, setShowOverdueOnly] = useState(false);

  useEffect(() => {
    loadBoard();
  }, []);

  const loadBoard = async () => {
    try {
      setLoading(true);
      const [todosData, statusesData] = await Promise.all([
        api.todos.getAll(),
        api.statuses.getAll(),
      ]);
      setTodos(todosData);
      setStatuses(statusesData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async ({ title, dueDate, priority }) => {
    try {
      const newTodo = await api.todos.create({ title, dueDate, priority });
      setTodos([...todos, newTodo]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const updated = await api.todos.update(id, { status });
      setTodos(todos.map(t => t.id === id ? updated : t));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateDueDate = async (id, dueDate) => {
    try {
      const updated = await api.todos.update(id, { dueDate });
      setTodos(todos.map(t => t.id === id ? updated : t));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdatePriority = async (id, priority) => {
    try {
      const updated = await api.todos.update(id, { priority });
      setTodos(todos.map(t => t.id === id ? updated : t));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateTitle = async (id, title) => {
    try {
      const updated = await api.todos.update(id, { title });
      setTodos(todos.map(t => t.id === id ? updated : t));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.todos.delete(id);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const visibleTodos = showOverdueOnly
    ? todos.filter(isOverdue)
    : todos;

  return (
    <div className="app">
      <header className="header">
        <h1>Todo App</h1>
        <nav className="view-tabs" aria-label="Main navigation">
          <button
            type="button"
            className={activeView === 'board' ? 'active' : ''}
            aria-pressed={activeView === 'board'}
            onClick={() => setActiveView('board')}
          >
            Task Board
          </button>
          <button
            type="button"
            className={activeView === 'statistics' ? 'active' : ''}
            aria-pressed={activeView === 'statistics'}
            onClick={() => setActiveView('statistics')}
          >
            Statistics
          </button>
        </nav>
      </header>

      <main className="main">
        {activeView === 'statistics' ? (
          <Statistics />
        ) : (
          <>
            <AddTodo onAdd={handleAdd} />

            <div className="filters">
              <label className="filter-toggle">
                <input
                  type="checkbox"
                  checked={showOverdueOnly}
                  onChange={(e) => setShowOverdueOnly(e.target.checked)}
                />
                Overdue only
              </label>
            </div>

            {error && (
              <div className="error-message">
                {error}
                <button onClick={() => setError(null)}>x</button>
              </div>
            )}

            {loading ? (
              <div className="loading">Loading...</div>
            ) : (
              <TodoList
                todos={visibleTodos}
                statuses={statuses}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
                onUpdateDueDate={handleUpdateDueDate}
                onUpdatePriority={handleUpdatePriority}
                onUpdateTitle={handleUpdateTitle}
                showOverdueOnly={showOverdueOnly}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
