import React from 'react';

const LABELS = { inventory: 'Inventario', orders: 'Pedidos', payments: 'Pagos' };
const ERROR_THRESHOLD = 15;

export default function ServiceCard({ serviceId, data }) {
  const d = data || { totalCalls: 0, successRate: 0, errorRate: 0, avgDurationMs: 0 };
  const problem = d.errorRate > ERROR_THRESHOLD;
  return (
    <article className={`card ${problem ? 'problem' : ''}`}>
      <h3>
        {LABELS[serviceId]}
        {problem && <span className="tag">⚠ Con problemas</span>}
      </h3>
      <dl>
        <div><dt>Total de llamadas</dt><dd>{d.totalCalls}</dd></div>
        <div><dt>Tasa de éxito</dt><dd>{d.successRate.toFixed(1)}%</dd></div>
        <div><dt>Tiempo promedio</dt><dd>{d.avgDurationMs.toFixed(1)} ms</dd></div>
      </dl>
    </article>
  );
}
