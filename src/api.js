const BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/$/, '');

async function request(path, options) {
  const res = await fetch(`${BASE}${path}`, options);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export const getSummary = () => request('/api/metrics/summary');

export function getLogs({ service, status, from, to, page = 0, size = 20 } = {}) {
  const q = new URLSearchParams();
  if (service) q.set('service', service);
  if (status) q.set('status', status);
  if (from) q.set('from', new Date(from).toISOString());
  if (to) q.set('to', new Date(to).toISOString());
  q.set('page', page);
  q.set('size', size);
  return request(`/api/metrics/logs?${q}`);
}

export const simulateLoad = () => request('/api/metrics/simulate-load', { method: 'POST' });
