function formatValue(value) {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'boolean') return value ? 'Sí' : 'No';
  return String(value);
}

export function ResultsTable({ rows }) {
  if (!rows.length) {
    return <div className="empty-table">La consulta no devolvió filas.</div>;
  }

  const columns = Object.keys(rows[0]);

  return (
    <div className="table-scroll">
      <table className="results-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={column}>{formatValue(row[column])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
