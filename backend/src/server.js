import express from 'express';
import dotenv from 'dotenv';
import { pool, queryDatabase } from './db.js';
import { findQuery, queries } from './queries.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3000);
const allowedOrigin = process.env.CORS_ORIGIN || '*';

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  return next();
});

app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(503).json({ status: 'error', database: 'unavailable', message: error.message });
  }
});

app.get('/api/queries', (req, res) => {
  res.json({
    queries: queries.map(({ id, title, question }) => ({ id, title, question })),
  });
});

app.get('/api/queries/:queryId', (req, res) => {
  const query = findQuery(req.params.queryId);

  if (!query) {
    return res.status(404).json({ message: 'Consulta no encontrada' });
  }

  return res.json({
    id: query.id,
    title: query.title,
    question: query.question,
    sql: query.sql.trim(),
  });
});

app.post('/api/queries/:queryId/run', async (req, res) => {
  const query = findQuery(req.params.queryId);

  if (!query) {
    return res.status(404).json({ message: 'Consulta no encontrada' });
  }

  try {
    const result = await queryDatabase(query.sql);
    return res.json({
      id: query.id,
      title: query.title,
      question: query.question,
      rows: result.rows,
      rowCount: result.rowCount,
      durationMs: result.durationMs,
      executedAt: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(500).json({
      id: query.id,
      title: query.title,
      message: 'No se pudo ejecutar la consulta',
      detail: error.message,
    });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`BD1 API listening on port ${port}`);
});
