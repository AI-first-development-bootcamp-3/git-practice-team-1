import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_FILE = join(__dirname, '../data/todos.json');

export const VALID_PRIORITIES = ['low', 'medium', 'high'];
const DEFAULT_PRIORITY = 'medium';

export class ValidationError extends Error {}

function readTodos() {
  try {
    const data = readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeTodos(todos) {
  writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
}

function normalizePriority(priority) {
  if (priority === undefined) {
    return DEFAULT_PRIORITY;
  }
  if (!VALID_PRIORITIES.includes(priority)) {
    throw new ValidationError('priority must be low, medium, or high');
  }
  return priority;
}

function withNormalizedPriority(todo) {
  if (!todo) return todo;
  return {
    ...todo,
    priority: VALID_PRIORITIES.includes(todo.priority) ? todo.priority : DEFAULT_PRIORITY,
  };
}

export const todoService = {
  getAll() {
    return readTodos().map(withNormalizedPriority);
  },

  getById(id) {
    const todos = readTodos();
    const todo = todos.find(todo => todo.id === id);
    return withNormalizedPriority(todo);
  },

  create(todoData) {
    const todos = readTodos();
    const newTodo = {
      id: crypto.randomUUID(),
      title: todoData.title,
      status: 'todo',
      priority: normalizePriority(todoData.priority),
      dueDate: todoData.dueDate ?? null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    todos.push(newTodo);
    writeTodos(todos);
    return newTodo;
  },

  update(id, updates) {
    const todos = readTodos();
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) return null;

    const next = {
      ...todos[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    if ('dueDate' in updates) {
      next.dueDate = updates.dueDate ?? null;
    }

    if ('priority' in updates) {
      next.priority = normalizePriority(updates.priority);
    }

    todos[index] = next;
    writeTodos(todos);
    return withNormalizedPriority(todos[index]);
  },

  delete(id) {
    const todos = readTodos();
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) return false;

    todos.splice(index, 1);
    writeTodos(todos);
    return true;
  }
};
