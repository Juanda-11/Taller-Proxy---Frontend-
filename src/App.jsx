import React, { useCallback, useEffect, useState } from 'react';
import { getLogs, getSummary, simulateLoad } from './api.js';
import ServiceCard from './components/ServiceCard.jsx';
import ResponseChart from './components/ResponseChart.jsx';
import LogsTable from './components/LogsTable.jsx';
import Filters from './components/Filters.jsx';

const SERVICES = ['inventory', 'orders', 'payments'];
const POLL_MS = 3000;
const PAGE_SIZE = 15;

export default function App() {
  const [summary, setSummary] = useState([]);
  const [recent, setRecent] = useState({});
  const [logs, setLogs] = useState({ content: [], page: 0, totalPages: 0, totalElements: 0 });
  const [filters, setFilters] = useState({ service: '', status: '', from: '', to: '' });
  const [page, setPage] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const [sum, table, ...last] = await Promise.all([
        getSummary(),
        getLogs({ ...filters, page, size: PAGE_SIZE }),
        ...SERVICES.map((s) => getLogs({ service: s, size: 20 })),
      ]);
      setSummary(sum);
      setLogs(table);
      setRecent(Object.fromEntries(SERVICES.map((s, i) => [s, last[i].content])));
      setError(null);
    } catch (e) {
      setError(`No se pudo conectar con el backend (${e.message})`);
    }
  }, [filters, page]);

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, POLL_MS);
    return () => clearInterval(id);
  }, [refresh]);

  const onSimulate = async () => {
    setLoading(true);
    try {
      await simulateLoad();
      await refresh();
    } catch (e) {
      setError(`Error al simular carga (${e.message})`);
    } finally {
      setLoading(false);
    }
  };

  const onFilters = (f) => {
    setFilters(f);
    setPage(0);
  };

  return (
    <main>
      <header>
        <h1>Monitor de Microservicios</h1>
        <button onClick={onSimulate} disabled={loading}>
          {loading ? 'Simulando…' : 'Simular carga'}
        </button>
      </header>
      {error && <div className="banner">{error}</div>}

      <section className="cards">
        {SERVICES.map((s) => (
          <ServiceCard key={s} serviceId={s} data={summary.find((x) => x.serviceId === s)} />
        ))}
      </section>

      <section className="panel">
        <h2>Últimas 20 llamadas — tiempo de respuesta (ms)</h2>
        <ResponseChart recent={recent} services={SERVICES} />
      </section>

      <section className="panel">
        <h2>Logs en tiempo real</h2>
        <Filters filters={filters} services={SERVICES} onChange={onFilters} />
        <LogsTable logs={logs} onPage={setPage} />
      </section>
    </main>
  );
}
