import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_FILE = join(__dirname, '../data/todos.json');

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

export const todoService = {
  getAll() {
    return readTodos();
  },

  getStatistics() {
    const todos = readTodos();
    const tasksByStatus = {
      todo: 0,
      'in-progress': 0,
      review: 0,
      done: 0
    };

    for (const todo of todos) {
      if (Object.hasOwn(tasksByStatus, todo.status)) {
        tasksByStatus[todo.status] += 1;
      }
    }

    const totalTasks = todos.length;
    const completionPercentage = totalTasks === 0
      ? 0
      : (tasksByStatus.done / totalTasks) * 100;

    return {
      totalTasks,
      completionPercentage,
      tasksByStatus
    };
  },

  getById(id) {
    const todos = readTodos();
    return todos.find(todo => todo.id === id);
  },

  create(todoData) {
    const todos = readTodos();
    const newTodo = {
      id: crypto.randomUUID(),
      title: todoData.title,
      status: 'todo',
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

    todos[index] = {
      ...todos[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    writeTodos(todos);
    return todos[index];
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
