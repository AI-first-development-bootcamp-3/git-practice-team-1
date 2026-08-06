const API_BASE = 'http://localhost:3001/api';

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

export const api = {
  todos: {
    getAll: () => fetchApi('/todos'),

    getStatistics: () => fetchApi('/todos/statistics'),

    getCreatedTrend: () => fetchApi('/todos/statistics/created-trend'),

    getById: (id) => fetchApi(`/todos/${id}`),

    create: ({ title, dueDate = null }) => fetchApi('/todos', {
      method: 'POST',
      body: JSON.stringify({ title, dueDate }),
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
