const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.detail || payload.message || 'Error al comunicarse con la API');
  }

  return payload;
}

export function fetchQueries() {
  return request('/queries');
}

export function runQuery(queryId) {
  return request(`/queries/${queryId}/run`, { method: 'POST' });
}

export function checkHealth() {
  return request('/health');
}
