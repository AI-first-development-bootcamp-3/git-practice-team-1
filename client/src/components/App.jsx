import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import TodoFilters from './TodoFilters';
import Statistics from './Statistics';
import { isOverdue } from './TodoItem';
import '../App.css';

function toggleValue(list, value) {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

function App() {
  const [activeView, setActiveView] = useState('board');
  const [todos, setTodos] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOverdueOnly, setShowOverdueOnly] = useState(false);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedPriorities, setSelectedPriorities] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 250);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    loadStatuses();
  }, []);

  useEffect(() => {
    loadTodos();
  }, [debouncedSearch, selectedStatuses, selectedPriorities]);

  const hasActiveFilters =
    Boolean(debouncedSearch.trim()) ||
    selectedStatuses.length > 0 ||
    selectedPriorities.length > 0;

  const loadStatuses = async () => {
    try {
      const statusesData = await api.statuses.getAll();
      setStatuses(statusesData);
    } catch (err) {
      setError(err.message);
    }
  };

  const loadTodos = async () => {
    try {
      setLoading(true);
      const todosData = await api.todos.getAll({
        search: debouncedSearch,
        status: selectedStatuses,
        priority: selectedPriorities,
      });
      setTodos(todosData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async ({ title, dueDate, priority }) => {
    try {
      await api.todos.create({ title, dueDate, priority });
      await loadTodos();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.todos.update(id, { status });
      await loadTodos();
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
      await api.todos.update(id, { priority });
      await loadTodos();
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

  const clearFilters = () => {
    setSearch('');
    setDebouncedSearch('');
    setSelectedStatuses([]);
    setSelectedPriorities([]);
  };

  // Overdue-only is client-side and runs AFTER search/status/priority (not a server param).
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

            <TodoFilters
              search={search}
              selectedStatuses={selectedStatuses}
              selectedPriorities={selectedPriorities}
              statuses={statuses}
              onSearchChange={setSearch}
              onToggleStatus={(statusId) =>
                setSelectedStatuses((current) => toggleValue(current, statusId))
              }
              onTogglePriority={(priority) =>
                setSelectedPriorities((current) => toggleValue(current, priority))
              }
              onClear={clearFilters}
              hasActiveFilters={hasActiveFilters}
            />

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
                hasActiveFilters={hasActiveFilters}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
