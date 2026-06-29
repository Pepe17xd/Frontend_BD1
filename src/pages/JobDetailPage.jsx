import { ArrowLeft, BriefcaseBusiness, Building2, CalendarDays, CheckCircle2, MapPin, Users } from 'lucide-react';
import { EmptyState } from '../components/EmptyState.jsx';
import { ProfessionalCard } from '../components/ProfessionalCard.jsx';
import { SkillBadge } from '../components/SkillBadge.jsx';
import { getJobById } from '../services/platformService.js';

export function JobDetailPage({ jobId, onBack, onOpenProfessional }) {
  const job = getJobById(jobId);

  if (!job) {
    return <EmptyState title="Oferta no encontrada" text="No existe una oferta con ese identificador en los datos simulados." />;
  }

  return (
    <section className="page-stack">
      <button className="back-button" onClick={onBack}><ArrowLeft size={18} /> Volver</button>

      <div className="detail-hero">
        <div>
          <p className="eyebrow">{job.empresa.nombre}</p>
          <h1>{job.titulo}</h1>
          <p>{job.descripcion}</p>
        </div>
        <span className={job.estado_oferta === 'Activa' ? 'status active' : 'status'}>{job.estado_oferta}</span>
      </div>

      <div className="detail-grid">
        <section className="section-block detail-main">
          <h2>Datos de la oferta</h2>
          <div className="info-list">
            <span><Building2 size={17} /> {job.empresa.industria} - {job.empresa.tamano}</span>
            <span><MapPin size={17} /> {job.empresa.ubicacion} - {job.modalidad}</span>
            <span><BriefcaseBusiness size={17} /> {job.tipo_contrato}</span>
            <span><Users size={17} /> {job.vacantes} vacantes</span>
            <span><CalendarDays size={17} /> Publicada el {job.fecha_publicacion}</span>
          </div>

          <h2>Habilidades requeridas</h2>
          <div className="requirement-list">
            {job.habilidades.map((skill) => (
              <div className="requirement-row" key={skill.id_habilidad}>
                <SkillBadge skill={skill} />
                <span>{skill.nivel_minimo}</span>
                {skill.es_excluyente && <strong><CheckCircle2 size={16} /> Excluyente</strong>}
              </div>
            ))}
          </div>
        </section>

        <aside className="section-block side-panel">
          <h2>Resumen</h2>
          <div className="summary-list">
            <span>Salario <strong>{job.salario_formateado}</strong></span>
            <span>Postulaciones <strong>{job.postulaciones}</strong></span>
            <span>Experiencia mínima <strong>{job.experiencia_minima} años</strong></span>
          </div>
        </aside>
      </div>

      <section className="section-block">
        <div className="section-title-row">
          <h2>Candidatos compatibles</h2>
          <span>{job.candidatos.length} perfiles</span>
        </div>
        <div className="content-grid two-columns">
          {job.candidatos.map((candidate) => (
            <div className="match-card" key={candidate.id_usuario}>
              <strong>{candidate.compatibilidad}% compatibilidad</strong>
              <ProfessionalCard professional={candidate} onOpen={onOpenProfessional} />
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
