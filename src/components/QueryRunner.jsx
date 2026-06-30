import { Play } from 'lucide-react';
import { ResultsTable } from './ResultsTable.jsx';

export function QueryRunner({ query, result, loading, error, onRun }) {
  return (
    <section className="section-block query-card">
      <div className="query-card-header">
        <div>
          <p className="eyebrow">{query.id}</p>
          <h2>{query.title}</h2>
          <p>{query.question}</p>
        </div>
        <button className="primary-button" onClick={() => onRun(query.id)} disabled={loading}>
          <Play size={18} />
          {loading ? 'Ejecutando...' : 'Ejecutar consulta'}
        </button>
      </div>

      {loading && <div className="loading-box">Consultando PostgreSQL...</div>}

      {error && (
        <div className="error-box">
          <strong>Error</strong>
          <span>{error}</span>
        </div>
      )}

      {result && !loading && !error && (
        <div className="query-result">
          <div className="result-meta">
            <span>Tiempo de respuesta: <strong>{result.durationMs} ms</strong></span>
            <span>Filas: <strong>{result.rowCount}</strong></span>
          </div>
          <ResultsTable rows={result.rows} />
        </div>
      )}
    </section>
  );
}
