import { todoService } from '../services/todoService.js';

const DUE_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const VALID_STATUSES = new Set(['todo', 'in-progress', 'review', 'done']);

function isValidDueDate(dueDate) {
  if (dueDate === null || dueDate === undefined || dueDate === '') {
    return true;
  }
  if (typeof dueDate !== 'string' || !DUE_DATE_PATTERN.test(dueDate)) {
    return false;
  }
  const [year, month, day] = dueDate.split('-').map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  );
}

function normalizeDueDate(dueDate) {
  if (dueDate === null || dueDate === undefined || dueDate === '') {
    return null;
  }
  return dueDate;
}

function isValidStatus(status) {
  return typeof status === 'string' && VALID_STATUSES.has(status);
}

export default async function todosRoutes(fastify, options) {

  // GET /api/todos - Get all todos
  fastify.get('/', async (request, reply) => {
    return todoService.getAll();
  });

  // GET /api/todos/statistics - Get aggregated todo statistics
  fastify.get('/statistics', async (request, reply) => {
    return todoService.getStatistics();
  });

  // GET /api/todos/statistics/created-trend - Get daily task creation counts
  fastify.get('/statistics/created-trend', async (request, reply) => {
    return todoService.getCreatedTrend();
  });

  // GET /api/todos/:id - Get single todo
  fastify.get('/:id', async (request, reply) => {
    const todo = todoService.getById(request.params.id);
    if (!todo) {
      return reply.status(404).send({ error: 'Todo not found' });
    }
    return todo;
  });

  // POST /api/todos - Create new todo
  fastify.post('/', async (request, reply) => {
    const { title, dueDate } = request.body || {};
    if (!title || !title.trim()) {
      return reply.status(400).send({ error: 'Title is required' });
    }
    if (!isValidDueDate(dueDate)) {
      return reply.status(400).send({ error: 'dueDate must be YYYY-MM-DD' });
    }
    const todo = todoService.create({
      title: title.trim(),
      dueDate: normalizeDueDate(dueDate),
    });
    return reply.status(201).send(todo);
  });

  // PUT /api/todos/:id - Update todo
  fastify.put('/:id', async (request, reply) => {
    const updates = { ...(request.body || {}) };

    if ('title' in updates) {
      if (!updates.title || !String(updates.title).trim()) {
        return reply.status(400).send({ error: 'Title is required' });
      }
      updates.title = String(updates.title).trim();
    }

    if ('dueDate' in updates && !isValidDueDate(updates.dueDate)) {
      return reply.status(400).send({ error: 'dueDate must be YYYY-MM-DD' });
    }

    if ('status' in updates && !isValidStatus(updates.status)) {
      return reply.status(400).send({ error: 'status must be one of todo, in-progress, review, done' });
    }

    if ('dueDate' in updates) {
      updates.dueDate = normalizeDueDate(updates.dueDate);
    }

    const todo = todoService.update(request.params.id, updates);
    if (!todo) {
      return reply.status(404).send({ error: 'Todo not found' });
    }
    return todo;
  });

  // DELETE /api/todos/:id - Delete todo
  fastify.delete('/:id', async (request, reply) => {
    const deleted = todoService.delete(request.params.id);
    if (!deleted) {
      return reply.status(404).send({ error: 'Todo not found' });
    }
    return { success: true };
  });
}
