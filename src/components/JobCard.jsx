import { Building2, CalendarDays, MapPin } from 'lucide-react';
import { SkillBadge } from './SkillBadge.jsx';

export function JobCard({ job, onOpen }) {
  return (
    <article className="item-card job-card">
      <div className="card-header-row">
        <div>
          <p className="eyebrow">{job.empresa.nombre}</p>
          <h3>{job.titulo}</h3>
        </div>
        <span className={job.estado_oferta === 'Activa' ? 'status active' : 'status'}>{job.estado_oferta}</span>
      </div>

      <p className="card-description">{job.descripcion}</p>

      <div className="meta-grid">
        <span><Building2 size={16} /> {job.tipo_contrato}</span>
        <span><MapPin size={16} /> {job.modalidad}</span>
        <span><CalendarDays size={16} /> {job.fecha_publicacion}</span>
      </div>

      <div className="skill-list">
        {job.habilidades.slice(0, 4).map((skill) => <SkillBadge key={skill.id_habilidad} skill={skill} />)}
      </div>

      <div className="card-footer-row">
        <strong>{job.salario_formateado}</strong>
        <button className="primary-button compact" onClick={() => onOpen(job.id_oferta)}>Ver detalle</button>
      </div>
    </article>
  );
}
