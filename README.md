# BD1 Consultas Web

Aplicación web para ejecutar las consultas SQL del proyecto BD1 contra una base de datos PostgreSQL real.

## Arquitectura

- **Frontend:** React + Vite, servido en Docker con Nginx.
- **Backend:** Express + `pg` + `dotenv`, sin ORM.
- **Base de datos:** PostgreSQL 16 con esquema, relaciones, índices, triggers y datos CSV reales.
- **Comunicación:** el frontend llama a `/api`, Nginx redirige esas rutas al backend.

## Estructura de carpetas

```text
frontend/
  backend/
    src/
      db.js
      queries.js
      server.js
    Dockerfile
    .env.example
    package.json
  database/
    init.sql
  src/
    components/
      Navbar.jsx
      QueryRunner.jsx
      ResultsTable.jsx
    services/
      apiClient.js
    styles/
      global.css
    App.jsx
    main.jsx
  Dockerfile
  docker-compose.yml
  nginx.conf
  .env.example
  package.json
```

Los CSV se montan desde `../poblar`, que debe existir al lado de esta carpeta `frontend`.

## Ejecución con Docker

Desde esta carpeta:

```bash
docker compose up --build
```

Servicios:

- Frontend: `http://localhost:8080`
- Backend: `http://localhost:3000`
- PostgreSQL: `localhost:5432`

Docker inicializa PostgreSQL automáticamente con:

- `database/init.sql`
- CSV ubicados en `../poblar`

Si cambias `init.sql` o los CSV y necesitas reinicializar la base:

```bash
docker compose down -v
docker compose up --build
```

## Ejecución sin Docker

Requisitos:

- Node.js 20 o superior
- PostgreSQL local
- Base de datos BD1 creada e inicializada con el esquema y CSV del proyecto

Backend:

```bash
cd backend
cp .env.example .env
npm install
npm start
```

Frontend:

```bash
cp .env.example .env
npm install
npm run dev
```

En modo local, Vite proxyea `/api` hacia `http://localhost:3000`.

## Variables de entorno

Frontend (`.env.example`):

```text
VITE_API_URL=/api
POSTGRES_DB=bd1
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_PORT=5432
BACKEND_PORT=3000
FRONTEND_PORT=8080
CORS_ORIGIN=*
```

Backend (`backend/.env.example`):

```text
PORT=3000
PGHOST=localhost
PGPORT=5432
PGDATABASE=bd1
PGUSER=postgres
PGPASSWORD=postgres
PGPOOL_MAX=10
CORS_ORIGIN=http://localhost:5173
```

No guardes credenciales reales en archivos `.env`.

## Endpoints

### Healthcheck

```http
GET /api/health
```

Respuesta esperada:

```json
{
  "status": "ok",
  "database": "connected"
}
```

### Listar consultas

```http
GET /api/queries
```

Devuelve las cuatro consultas disponibles.

### Ver una consulta

```http
GET /api/queries/:queryId
```

Ejemplo:

```http
GET /api/queries/consulta-1
```

### Ejecutar una consulta

```http
POST /api/queries/:queryId/run
```

Ejemplo:

```http
POST /api/queries/consulta-1/run
```

Respuesta:

```json
{
  "id": "consulta-1",
  "title": "Consulta 1",
  "rows": [],
  "rowCount": 0,
  "durationMs": 12.34,
  "executedAt": "2026-06-29T00:00:00.000Z"
}
```

## Consultas implementadas

- **Consulta 1:** profesionales con mayor coincidencia de habilidades para una oferta laboral específica.
- **Consulta 2:** habilidades demandadas con baja representación en usuarios para empresas de tecnología.
- **Consulta 3:** candidatos conectados con reclutadores, con habilidades y certificados, que aún no postularon.
- **Consulta 4:** usuarios más competitivos que el promedio según experiencia, habilidades, certificados y conexiones.

## Calidad y decisiones técnicas

- No se usa ORM.
- Las consultas SQL son estáticas y se ejecutan desde el backend.
- El frontend no contiene mock data.
- La UI muestra botón de ejecución, estado de carga, errores, tiempo de respuesta, número de filas y tabla de resultados.
- El esquema usa nombres reales de tablas y columnas documentados en el proyecto.

## Solución de errores comunes

### `relation "usuario" does not exist`

La base no se inicializó. Ejecuta:

```bash
docker compose down -v
docker compose up --build
```

### Error al copiar CSV

Verifica que exista la carpeta:

```text
../poblar
```

Debe contener archivos como `usuario.csv`, `empresa.csv`, `ofertalaboral.csv`, etc.

### El frontend carga pero las consultas fallan

Revisa el backend:

```bash
curl http://localhost:3000/api/health
```

También puedes revisar logs:

```bash
docker compose logs backend
docker compose logs postgres
```

### Cambié datos pero no se reflejan

PostgreSQL conserva datos en un volumen Docker. Reinicia con:

```bash
docker compose down -v
docker compose up --build
```
