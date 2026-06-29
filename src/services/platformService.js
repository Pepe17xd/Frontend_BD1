import {
  certificadosCurso,
  empresas,
  experiencias,
  habilidades,
  ofertasLaborales,
  perfiles,
  posee,
  postula,
  profesionales,
  requiere,
  usuarios,
} from './mockData.js';

const byId = (items, key, value) => items.find((item) => item[key] === value);
const formatCurrency = (value) => `S/ ${Number(value).toLocaleString('es-PE')}`;

function attachSkill(record) {
  const skill = byId(habilidades, 'id_habilidad', record.id_habilidad);
  return { ...record, ...skill };
}

function calculateCompatibility(userId, jobId) {
  const requiredSkillIds = requiere.filter((item) => item.id_oferta === jobId).map((item) => item.id_habilidad);
  const userSkillIds = posee.filter((item) => item.id_usuario === userId).map((item) => item.id_habilidad);
  if (!requiredSkillIds.length) return 0;
  const matches = requiredSkillIds.filter((id) => userSkillIds.includes(id));
  return Math.round((matches.length / requiredSkillIds.length) * 100);
}

export function getJobListings() {
  return ofertasLaborales.map((job) => {
    const company = byId(empresas, 'id_empresa', job.id_empresa);
    const requiredSkills = requiere.filter((item) => item.id_oferta === job.id_oferta).map(attachSkill);
    const applications = postula.filter((item) => item.id_oferta === job.id_oferta);

    return {
      ...job,
      salario_formateado: formatCurrency(job.salario),
      empresa: company,
      habilidades: requiredSkills,
      postulaciones: applications.length,
    };
  });
}

export function getJobById(jobId) {
  const id = Number(jobId);
  const job = getJobListings().find((item) => item.id_oferta === id);
  if (!job) return null;

  const candidates = getProfessionalProfiles()
    .map((professional) => ({ ...professional, compatibilidad: calculateCompatibility(professional.id_usuario, id) }))
    .filter((professional) => professional.compatibilidad > 0)
    .sort((a, b) => b.compatibilidad - a.compatibilidad);

  return { ...job, candidatos: candidates };
}

export function getProfessionalProfiles() {
  return profesionales.map(({ id_usuario }) => {
    const user = byId(usuarios, 'id_usuario', id_usuario);
    const profile = byId(perfiles, 'id_usuario', id_usuario);
    const userSkills = posee.filter((item) => item.id_usuario === id_usuario).map(attachSkill);
    const userExperiences = experiencias
      .filter((item) => item.id_usuario === id_usuario)
      .map((item) => ({ ...item, empresa: byId(empresas, 'id_empresa', item.id_empresa) }));
    const certificates = certificadosCurso.filter((item) => item.id_usuario === id_usuario);
    const applications = postula.filter((item) => item.id_usuario === id_usuario).map((item) => ({ ...item, oferta: byId(ofertasLaborales, 'id_oferta', item.id_oferta) }));

    return {
      ...user,
      perfil: profile,
      habilidades: userSkills,
      experiencias: userExperiences,
      certificados: certificates,
      postulaciones: applications,
      nombre_completo: `${user.nombre} ${user.apellido}`,
    };
  });
}

export function getProfessionalById(professionalId) {
  const professional = getProfessionalProfiles().find((item) => item.id_usuario === Number(professionalId));
  if (!professional) return null;

  const recommendedJobs = getJobListings()
    .map((job) => ({ ...job, compatibilidad: calculateCompatibility(professional.id_usuario, job.id_oferta) }))
    .filter((job) => job.compatibilidad > 0)
    .sort((a, b) => b.compatibilidad - a.compatibilidad);

  return { ...professional, ofertas_recomendadas: recommendedJobs };
}

export function getDashboardSummary() {
  return {
    profesionales: profesionales.length,
    ofertasActivas: ofertasLaborales.filter((job) => job.estado_oferta === 'Activa').length,
    empresas: empresas.length,
    habilidades: habilidades.length,
    ofertasDestacadas: getJobListings().filter((job) => job.estado_oferta === 'Activa').slice(0, 3),
    profesionalesDestacados: getProfessionalProfiles().slice(0, 3),
  };
}
