import { useEffect, useState } from 'react';
import { Database, Server } from 'lucide-react';
import { Navbar } from './components/Navbar.jsx';
import { QueryRunner } from './components/QueryRunner.jsx';
import { checkHealth, fetchQueries, runQuery } from './services/apiClient.js';

export default function App() {
  const [queries, setQueries] = useState([]);
  const [health, setHealth] = useState(null);
  const [initialError, setInitialError] = useState('');
  const [loadingQueryId, setLoadingQueryId] = useState('');
  const [results, setResults] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let mounted = true;

    async function loadInitialData() {
      try {
        const [healthResponse, queriesResponse] = await Promise.all([
          checkHealth(),
          fetchQueries(),
        ]);

        if (!mounted) return;
        setHealth(healthResponse);
        setQueries(queriesResponse.queries);
      } catch (error) {
        if (!mounted) return;
        setInitialError(error.message);
      }
    }

    loadInitialData();

    return () => {
      mounted = false;
    };
  }, []);

  const handleRunQuery = async (queryId) => {
    setLoadingQueryId(queryId);
    setErrors((current) => ({ ...current, [queryId]: '' }));

    try {
      const response = await runQuery(queryId);
      setResults((current) => ({ ...current, [queryId]: response }));
    } catch (error) {
      setErrors((current) => ({ ...current, [queryId]: error.message }));
    } finally {
      setLoadingQueryId('');
    }
  };

  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <section className="page-stack">
          <div className="page-heading dashboard-heading">
            <div>
              <p className="eyebrow">BD1 PostgreSQL + Express</p>
              <h1>Consultas del proyecto</h1>
              <p>Ejecuta las consultas SQL del proyecto contra la base de datos PostgreSQL real.</p>
            </div>
            <div className="connection-status">
              <Database size={18} />
              <span>{health?.database === 'connected' ? 'Base conectada' : 'Verificando base'}</span>
            </div>
          </div>

          {initialError && (
            <div className="error-box">
              <strong>No se pudo cargar la aplicación</strong>
              <span>{initialError}</span>
            </div>
          )}

          {!initialError && !queries.length && (
            <div className="loading-box">
              <Server size={18} />
              Cargando consultas desde la API...
            </div>
          )}

          {queries.map((query) => (
            <QueryRunner
              key={query.id}
              query={query}
              result={results[query.id]}
              loading={loadingQueryId === query.id}
              error={errors[query.id]}
              onRun={handleRunQuery}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
