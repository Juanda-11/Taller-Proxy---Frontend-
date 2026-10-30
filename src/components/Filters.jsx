import React from 'react';

export default function Filters({ filters, services, onChange }) {
  const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value });
  return (
    <div className="filters">
      <label>Servicio
        <select value={filters.service} onChange={set('service')}>
          <option value="">Todos</option>
          {services.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </label>
      <label>Estado
        <select value={filters.status} onChange={set('status')}>
          <option value="">Todos</option>
          <option value="SUCCESS">SUCCESS</option>
          <option value="ERROR">ERROR</option>
        </select>
      </label>
      <label>Desde
        <input type="datetime-local" value={filters.from} onChange={set('from')} />
      </label>
      <label>Hasta
        <input type="datetime-local" value={filters.to} onChange={set('to')} />
      </label>
      <button className="secondary" onClick={() => onChange({ service: '', status: '', from: '', to: '' })}>
        Limpiar
      </button>
    </div>
  );
}
