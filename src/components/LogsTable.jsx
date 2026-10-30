import React, { useState } from 'react';

const pretty = (v) => (v == null ? '—' : JSON.stringify(v, null, 2));

export default function LogsTable({ logs, onPage }) {
  const [open, setOpen] = useState(null);
  return (
    <>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Request ID</th><th>Servicio</th><th>Operación</th><th>Duración</th><th>Estado</th><th>Hora</th></tr>
          </thead>
          <tbody>
            {logs.content.length === 0 && (
              <tr><td colSpan="6" className="empty">Sin logs. Usa “Simular carga”.</td></tr>
            )}
            {logs.content.map((l) => (
              <React.Fragment key={l.requestId}>
                <tr className="row" onClick={() => setOpen(open === l.requestId ? null : l.requestId)}>
                  <td className="mono">{l.requestId.slice(0, 8)}…</td>
                  <td>{l.serviceId}</td>
                  <td>{l.operation}</td>
                  <td>{l.durationMs} ms</td>
                  <td><span className={`badge ${l.status}`}>{l.status}</span></td>
                  <td>{new Date(l.timestamp).toLocaleTimeString()}</td>
                </tr>
                {open === l.requestId && (
                  <tr className="detail">
                    <td colSpan="6">
                      <p><strong>Request ID:</strong> <span className="mono">{l.requestId}</span></p>
                      <div className="detail-grid">
                        <div><h4>Parámetros de entrada</h4><pre>{pretty(l.params)}</pre></div>
                        <div><h4>Respuesta</h4><pre>{l.status === 'ERROR' ? l.error : pretty(l.response)}</pre></div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pager">
        <button className="secondary" disabled={logs.page <= 0} onClick={() => onPage(logs.page - 1)}>Anterior</button>
        <span>Página {logs.page + 1} de {Math.max(1, logs.totalPages)} · {logs.totalElements} logs</span>
        <button className="secondary" disabled={logs.page + 1 >= logs.totalPages} onClick={() => onPage(logs.page + 1)}>Siguiente</button>
      </div>
    </>
  );
}
