const API_BASE = 'http://localhost:3001/api';

/**
 * Flip to `false` when Dan’s `add-search-filter` backend lands
 * (GET /api/todos?search=&status=&priority=). Same getAll(filters) shape either way.
 */
export const USE_CLIENT_TODO_FILTERS = true;

async function fetchApi(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `API Error: ${response.status}`);
  }

  return response.json();
}

function buildTodosQuery(filters = {}) {
  const params = new URLSearchParams();
  if (typeof filters.search === 'string' && filters.search.trim()) {
    params.set('search', filters.search.trim());
  }
  if (Array.isArray(filters.status) && filters.status.length > 0) {
    params.set('status', filters.status.join(','));
  }
  if (Array.isArray(filters.priority) && filters.priority.length > 0) {
    params.set('priority', filters.priority.join(','));
  }
  const query = params.toString();
  return query ? `?${query}` : '';
}

/** Mirrors Dan’s add-search-filter rules: AND across dims, OR within status/priority lists. */
export function filterTodosClientSide(todos, filters = {}) {
  let result = Array.isArray(todos) ? [...todos] : [];

  const search = typeof filters.search === 'string' ? filters.search.trim() : '';
  if (search) {
    const needle = search.toLowerCase();
    result = result.filter((todo) =>
      String(todo.title || '').toLowerCase().includes(needle)
    );
  }

  if (Array.isArray(filters.status) && filters.status.length > 0) {
    const allowed = new Set(filters.status);
    result = result.filter((todo) => allowed.has(todo.status));
  }

  if (Array.isArray(filters.priority) && filters.priority.length > 0) {
    const allowed = new Set(filters.priority);
    result = result.filter((todo) => allowed.has(todo.priority || 'medium'));
  }

  return result;
}

export const api = {
  statuses: {
    getAll: () => fetchApi('/statuses'),
  },
  todos: {
    getAll: async (filters = {}) => {
      if (USE_CLIENT_TODO_FILTERS) {
        const todos = await fetchApi('/todos');
        return filterTodosClientSide(todos, filters);
      }
      return fetchApi(`/todos${buildTodosQuery(filters)}`);
    },

    getStatistics: () => fetchApi('/todos/statistics'),

    getCreatedTrend: () => fetchApi('/todos/statistics/created-trend'),

    getById: (id) => fetchApi(`/todos/${id}`),

    create: ({ title, dueDate = null, priority = 'medium' }) => fetchApi('/todos', {
      method: 'POST',
      body: JSON.stringify({ title, dueDate, priority }),
    }),

    update: (id, updates) => fetchApi(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),

    delete: (id) => fetchApi(`/todos/${id}`, {
      method: 'DELETE',
    }),
  },
};
