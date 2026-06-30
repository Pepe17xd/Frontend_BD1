export const queries = [
  {
    id: 'consulta-1',
    title: 'Consulta 1',
    question: 'Profesionales con mayor coincidencia de habilidades para una oferta laboral específica.',
    sql: `-- Consulta 1
SELECT
    u.id_usuario,
    u.nombre,
    u.apellido,
    COUNT(*) AS habilidades_coincidentes
FROM usuario u
JOIN posee p
    ON u.id_usuario = p.id_usuario
JOIN requiere r
    ON p.id_habilidad = r.id_habilidad
WHERE r.id_oferta = 1
GROUP BY
    u.id_usuario,
    u.nombre,
    u.apellido
ORDER BY habilidades_coincidentes DESC;`,
  },
  {
    id: 'consulta-2',
    title: 'Consulta 2',
    question: 'Habilidades demandadas con baja representación en usuarios para empresas de tecnología.',
    sql: `-- Consulta 2
SELECT
    h.nombre_habilidad,
    d.demanda,
    COALESCE(p.usuarios_con_habilidad, 0) AS usuarios_con_habilidad,
    d.demanda - COALESCE(p.usuarios_con_habilidad, 0) AS brecha
FROM habilidad h

JOIN (
    SELECT
        r.id_habilidad,
        COUNT(DISTINCT r.id_oferta) AS demanda
    FROM requiere r
    JOIN ofertalaboral o
        ON r.id_oferta = o.id_oferta
    JOIN empresa e
        ON o.id_empresa = e.id_empresa
    WHERE e.industria = 'Tecnologia'
      AND o.estado_oferta = 'Activa'
    GROUP BY r.id_habilidad
) d
ON h.id_habilidad = d.id_habilidad

LEFT JOIN (
    SELECT
        id_habilidad,
        COUNT(DISTINCT id_usuario) AS usuarios_con_habilidad
    FROM posee
    GROUP BY id_habilidad
) p
ON h.id_habilidad = p.id_habilidad

ORDER BY brecha DESC;`,
  },
  {
    id: 'consulta-3',
    title: 'Consulta 3',
    question: 'Candidatos conectados con reclutadores, con habilidades y certificados, que aún no postularon.',
    sql: `-- Consulta 3
SELECT DISTINCT
    u.id_usuario,
    u.nombre,
    u.apellido
FROM usuario u
JOIN conecta co
    ON u.id_usuario = co.id_usuario1
JOIN reclutador r
    ON co.id_usuario2 = r.id_usuario
JOIN gestiona g
    ON r.id_usuario = g.id_usuario
JOIN ofertalaboral o
    ON g.id_oferta = o.id_oferta
JOIN requiere req
    ON o.id_oferta = req.id_oferta
JOIN posee p
    ON u.id_usuario = p.id_usuario
    AND p.id_habilidad = req.id_habilidad
JOIN certificadocurso c
    ON u.id_usuario = c.id_usuario
WHERE NOT EXISTS
(
    SELECT 1
    FROM postula po
    WHERE po.id_usuario = u.id_usuario
    AND po.id_oferta = o.id_oferta
);`,
  },
  {
    id: 'consulta-4',
    title: 'Consulta 4',
    question: 'Usuarios más competitivos que el promedio según experiencia, habilidades, certificados y conexiones.',
    sql: `-- Consulta 4
SELECT
    u.id_usuario,
    u.nombre,
    u.apellido,
    COUNT(DISTINCT ex.id_experiencia) AS experiencias,
    COUNT(DISTINCT p.id_habilidad) AS habilidades,
    COUNT(DISTINCT c.id_certificado) AS certificados,
    COUNT(DISTINCT co.id_usuario2) AS conexiones
FROM usuario u
JOIN profesional pr
    ON u.id_usuario = pr.id_usuario
LEFT JOIN experiencia ex
    ON u.id_usuario = ex.id_usuario
LEFT JOIN posee p
    ON u.id_usuario = p.id_usuario
LEFT JOIN certificadocurso c
    ON u.id_usuario = c.id_usuario
LEFT JOIN conecta co
    ON u.id_usuario = co.id_usuario1
GROUP BY
    u.id_usuario,
    u.nombre,
    u.apellido
HAVING
(
    COUNT(DISTINCT ex.id_experiencia) +
    COUNT(DISTINCT p.id_habilidad) +
    COUNT(DISTINCT c.id_certificado) +
    COUNT(DISTINCT co.id_usuario2)
)
>
(
    SELECT AVG(score)
    FROM
    (
        SELECT
            COUNT(DISTINCT ex2.id_experiencia) +
            COUNT(DISTINCT p2.id_habilidad) +
            COUNT(DISTINCT c2.id_certificado) +
            COUNT(DISTINCT co2.id_usuario2)
            AS score
        FROM usuario u2
        JOIN profesional pr2
            ON u2.id_usuario = pr2.id_usuario
        LEFT JOIN experiencia ex2
            ON u2.id_usuario = ex2.id_usuario
        LEFT JOIN posee p2
            ON u2.id_usuario = p2.id_usuario
        LEFT JOIN certificadocurso c2
            ON u2.id_usuario = c2.id_usuario
        LEFT JOIN conecta co2
            ON u2.id_usuario = co2.id_usuario1
        GROUP BY u2.id_usuario
    ) ranking
);`,
  },
];

export function findQuery(queryId) {
  return queries.find((query) => query.id === queryId);
}
