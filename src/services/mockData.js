export const usuarios = [
  { id_usuario: 1, nombre: 'Andrea', apellido: 'Valdivia', email: 'andrea.valdivia@mail.com', ubicacion: 'Lima, Peru', fecha_registro: '2025-03-12' },
  { id_usuario: 2, nombre: 'Marco', apellido: 'Quispe', email: 'marco.quispe@mail.com', ubicacion: 'Arequipa, Peru', fecha_registro: '2024-11-06' },
  { id_usuario: 3, nombre: 'Lucia', apellido: 'Ramos', email: 'lucia.ramos@mail.com', ubicacion: 'Lima, Peru', fecha_registro: '2025-01-18' },
  { id_usuario: 4, nombre: 'Diego', apellido: 'Salazar', email: 'diego.salazar@mail.com', ubicacion: 'Cusco, Peru', fecha_registro: '2024-08-22' },
  { id_usuario: 5, nombre: 'Valeria', apellido: 'Mendoza', email: 'valeria.mendoza@mail.com', ubicacion: 'Trujillo, Peru', fecha_registro: '2025-04-09' },
];

export const perfiles = [
  { id_perfil: 101, id_usuario: 1, foto: '', seguidores: 820, estado_premium: true },
  { id_perfil: 102, id_usuario: 2, foto: '', seguidores: 410, estado_premium: false },
  { id_perfil: 103, id_usuario: 3, foto: '', seguidores: 690, estado_premium: true },
  { id_perfil: 104, id_usuario: 4, foto: '', seguidores: 360, estado_premium: false },
  { id_perfil: 105, id_usuario: 5, foto: '', seguidores: 540, estado_premium: false },
];

export const profesionales = [
  { id_usuario: 1 },
  { id_usuario: 2 },
  { id_usuario: 3 },
  { id_usuario: 4 },
  { id_usuario: 5 },
];

export const empresas = [
  { id_empresa: 1, nombre: 'Andes Analytics', ubicacion: 'Lima', industria: 'Tecnologia', tamano: 'Mediana' },
  { id_empresa: 2, nombre: 'Pacífico Health', ubicacion: 'Lima', industria: 'Salud', tamano: 'Grande' },
  { id_empresa: 3, nombre: 'Kuntur Retail', ubicacion: 'Arequipa', industria: 'Comercio', tamano: 'Mediana' },
];

export const habilidades = [
  { id_habilidad: 1, nombre_habilidad: 'SQL', descripcion: 'Consultas relacionales y optimizacion' },
  { id_habilidad: 2, nombre_habilidad: 'React', descripcion: 'Interfaces web con componentes' },
  { id_habilidad: 3, nombre_habilidad: 'Python', descripcion: 'Automatizacion y analisis de datos' },
  { id_habilidad: 4, nombre_habilidad: 'PostgreSQL', descripcion: 'Diseno y administracion de bases de datos' },
  { id_habilidad: 5, nombre_habilidad: 'Analisis de datos', descripcion: 'Modelado, indicadores y reportes' },
  { id_habilidad: 6, nombre_habilidad: 'Comunicacion', descripcion: 'Colaboracion con equipos y stakeholders' },
];

export const ofertasLaborales = [
  {
    id_oferta: 1,
    titulo: 'Analista de Datos Junior',
    descripcion: 'Apoyo en reportes, consultas SQL y analisis de indicadores para equipos de producto.',
    salario: 3500,
    vacantes: 2,
    tipo_contrato: 'Tiempo completo',
    estado_oferta: 'Activa',
    experiencia_minima: 1,
    fecha_publicacion: '2026-06-10',
    modalidad: 'Hibrida',
    id_empresa: 1,
  },
  {
    id_oferta: 2,
    titulo: 'Frontend React Developer',
    descripcion: 'Construccion de interfaces para plataforma interna de reclutamiento y perfiles profesionales.',
    salario: 5200,
    vacantes: 1,
    tipo_contrato: 'Tiempo completo',
    estado_oferta: 'Activa',
    experiencia_minima: 2,
    fecha_publicacion: '2026-06-18',
    modalidad: 'Remota',
    id_empresa: 1,
  },
  {
    id_oferta: 3,
    titulo: 'Especialista PostgreSQL',
    descripcion: 'Diseno fisico, revision de consultas y soporte a procesos de optimizacion de base de datos.',
    salario: 6800,
    vacantes: 1,
    tipo_contrato: 'Proyecto',
    estado_oferta: 'Activa',
    experiencia_minima: 3,
    fecha_publicacion: '2026-06-20',
    modalidad: 'Presencial',
    id_empresa: 2,
  },
  {
    id_oferta: 4,
    titulo: 'Coordinador de Inteligencia Comercial',
    descripcion: 'Gestion de reportes comerciales, cruces de informacion y seguimiento de campanas.',
    salario: 4700,
    vacantes: 1,
    tipo_contrato: 'Tiempo completo',
    estado_oferta: 'Cerrada',
    experiencia_minima: 2,
    fecha_publicacion: '2026-05-28',
    modalidad: 'Hibrida',
    id_empresa: 3,
  },
];

export const requiere = [
  { id_oferta: 1, id_habilidad: 1, nivel_minimo: 'Intermedio', es_excluyente: true },
  { id_oferta: 1, id_habilidad: 5, nivel_minimo: 'Intermedio', es_excluyente: true },
  { id_oferta: 1, id_habilidad: 6, nivel_minimo: 'Basico', es_excluyente: false },
  { id_oferta: 2, id_habilidad: 2, nivel_minimo: 'Intermedio', es_excluyente: true },
  { id_oferta: 2, id_habilidad: 1, nivel_minimo: 'Basico', es_excluyente: false },
  { id_oferta: 2, id_habilidad: 6, nivel_minimo: 'Intermedio', es_excluyente: false },
  { id_oferta: 3, id_habilidad: 4, nivel_minimo: 'Avanzado', es_excluyente: true },
  { id_oferta: 3, id_habilidad: 1, nivel_minimo: 'Avanzado', es_excluyente: true },
  { id_oferta: 3, id_habilidad: 3, nivel_minimo: 'Intermedio', es_excluyente: false },
  { id_oferta: 4, id_habilidad: 5, nivel_minimo: 'Intermedio', es_excluyente: true },
  { id_oferta: 4, id_habilidad: 6, nivel_minimo: 'Intermedio', es_excluyente: false },
];

export const posee = [
  { id_usuario: 1, id_habilidad: 1, nivel: 'Avanzado' },
  { id_usuario: 1, id_habilidad: 3, nivel: 'Intermedio' },
  { id_usuario: 1, id_habilidad: 5, nivel: 'Avanzado' },
  { id_usuario: 2, id_habilidad: 2, nivel: 'Avanzado' },
  { id_usuario: 2, id_habilidad: 1, nivel: 'Intermedio' },
  { id_usuario: 2, id_habilidad: 6, nivel: 'Intermedio' },
  { id_usuario: 3, id_habilidad: 4, nivel: 'Avanzado' },
  { id_usuario: 3, id_habilidad: 1, nivel: 'Avanzado' },
  { id_usuario: 3, id_habilidad: 3, nivel: 'Intermedio' },
  { id_usuario: 4, id_habilidad: 5, nivel: 'Intermedio' },
  { id_usuario: 4, id_habilidad: 6, nivel: 'Avanzado' },
  { id_usuario: 5, id_habilidad: 2, nivel: 'Intermedio' },
  { id_usuario: 5, id_habilidad: 3, nivel: 'Avanzado' },
  { id_usuario: 5, id_habilidad: 4, nivel: 'Intermedio' },
];

export const experiencias = [
  { id_experiencia: 1, id_usuario: 1, id_empresa: 1, cargo: 'Practicante de BI', tipo: 'Analisis', trabajo_actual: true, fecha_inicio: '2025-02-01', fecha_fin: null },
  { id_experiencia: 2, id_usuario: 2, id_empresa: 1, cargo: 'Frontend Trainee', tipo: 'Desarrollo', trabajo_actual: true, fecha_inicio: '2024-09-15', fecha_fin: null },
  { id_experiencia: 3, id_usuario: 3, id_empresa: 2, cargo: 'Asistente DBA', tipo: 'Base de datos', trabajo_actual: true, fecha_inicio: '2023-06-01', fecha_fin: null },
  { id_experiencia: 4, id_usuario: 4, id_empresa: 3, cargo: 'Analista Comercial', tipo: 'Comercial', trabajo_actual: false, fecha_inicio: '2022-03-01', fecha_fin: '2025-12-30' },
  { id_experiencia: 5, id_usuario: 5, id_empresa: 2, cargo: 'Desarrolladora Python', tipo: 'Desarrollo', trabajo_actual: true, fecha_inicio: '2024-01-10', fecha_fin: null },
];

export const certificadosCurso = [
  { id_certificado: 1, id_usuario: 1, id_experiencia: 1, titulo: 'SQL para Analisis', institucion: 'UTEC', fecha_emision: '2025-08-10' },
  { id_certificado: 2, id_usuario: 2, id_experiencia: 2, titulo: 'React Fundamentals', institucion: 'LinkedIn Learning', fecha_emision: '2025-07-04' },
  { id_certificado: 3, id_usuario: 3, id_experiencia: 3, titulo: 'PostgreSQL Performance', institucion: 'PostgreSQL Academy', fecha_emision: '2025-11-21' },
  { id_certificado: 4, id_usuario: 5, id_experiencia: 5, titulo: 'Python Data Toolkit', institucion: 'DataCamp', fecha_emision: '2026-01-14' },
];

export const postula = [
  { id_usuario: 1, id_oferta: 1, estado_postulacion: 'En revision' },
  { id_usuario: 2, id_oferta: 2, estado_postulacion: 'Entrevista' },
  { id_usuario: 3, id_oferta: 3, estado_postulacion: 'En revision' },
  { id_usuario: 4, id_oferta: 4, estado_postulacion: 'Finalizada' },
];
