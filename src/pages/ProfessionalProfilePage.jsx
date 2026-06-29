import { ArrowLeft, Award, BriefcaseBusiness, CalendarDays, MapPin, Users } from 'lucide-react';
import { EmptyState } from '../components/EmptyState.jsx';
import { JobCard } from '../components/JobCard.jsx';
import { SkillBadge } from '../components/SkillBadge.jsx';
import { getProfessionalById } from '../services/platformService.js';

export function ProfessionalProfilePage({ professionalId, onBack, onOpenJob }) {
  const professional = getProfessionalById(professionalId);

  if (!professional) {
    return <EmptyState title="Profesional no encontrado" text="No existe un profesional con ese identificador en los datos simulados." />;
  }

  return (
    <section className="page-stack">
      <button className="back-button" onClick={onBack}><ArrowLeft size={18} /> Volver</button>

      <div className="profile-hero">
        <div className="avatar large">{professional.nombre[0]}{professional.apellido[0]}</div>
        <div>
          <p className="eyebrow">Profesional</p>
          <h1>{professional.nombre_completo}</h1>
          <p>{professional.email}</p>
          <div className="meta-grid compact-meta">
            <span><MapPin size={16} /> {professional.ubicacion}</span>
            <span><Users size={16} /> {professional.perfil.seguidores} seguidores</span>
            <span><CalendarDays size={16} /> Registro {professional.fecha_registro}</span>
          </div>
        </div>
      </div>

      <div className="detail-grid">
        <section className="section-block detail-main">
          <h2>Habilidades</h2>
          <div className="skill-list expanded">
            {professional.habilidades.map((skill) => <SkillBadge key={skill.id_habilidad} skill={skill} />)}
          </div>

          <h2>Experiencia laboral</h2>
          <div className="timeline-list">
            {professional.experiencias.map((experience) => (
              <article className="timeline-item" key={experience.id_experiencia}>
                <BriefcaseBusiness size={18} />
                <div>
                  <h3>{experience.cargo}</h3>
                  <p>{experience.empresa.nombre} - {experience.tipo}</p>
                  <span>{experience.fecha_inicio} / {experience.trabajo_actual ? 'Actualidad' : experience.fecha_fin}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="section-block side-panel">
          <h2>Certificados</h2>
          <div className="certificate-list">
            {professional.certificados.map((certificate) => (
              <article key={certificate.id_certificado}>
                <Award size={17} />
                <div>
                  <strong>{certificate.titulo}</strong>
                  <span>{certificate.institucion}</span>
                </div>
              </article>
            ))}
          </div>
        </aside>
      </div>

      <section className="section-block">
        <div className="section-title-row">
          <h2>Ofertas compatibles</h2>
          <span>{professional.ofertas_recomendadas.length} ofertas</span>
        </div>
        <div className="content-grid two-columns">
          {professional.ofertas_recomendadas.map((job) => (
            <div className="match-card" key={job.id_oferta}>
              <strong>{job.compatibilidad}% compatibilidad</strong>
              <JobCard job={job} onOpen={onOpenJob} />
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
