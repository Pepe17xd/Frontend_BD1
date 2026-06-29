import { Award, MapPin, Users } from 'lucide-react';
import { SkillBadge } from './SkillBadge.jsx';

export function ProfessionalCard({ professional, onOpen }) {
  const currentRole = professional.experiencias.find((item) => item.trabajo_actual) || professional.experiencias[0];

  return (
    <article className="item-card professional-card">
      <div className="profile-line">
        <div className="avatar">{professional.nombre[0]}{professional.apellido[0]}</div>
        <div>
          <h3>{professional.nombre_completo}</h3>
          <p>{currentRole?.cargo || 'Profesional'}</p>
        </div>
      </div>

      <div className="meta-grid">
        <span><MapPin size={16} /> {professional.ubicacion}</span>
        <span><Users size={16} /> {professional.perfil.seguidores} seguidores</span>
        <span><Award size={16} /> {professional.certificados.length} certificados</span>
      </div>

      <div className="skill-list">
        {professional.habilidades.slice(0, 4).map((skill) => <SkillBadge key={skill.id_habilidad} skill={skill} muted />)}
      </div>

      <div className="card-footer-row">
        <span>{professional.postulaciones.length} postulaciones</span>
        <button className="primary-button compact" onClick={() => onOpen(professional.id_usuario)}>Ver perfil</button>
      </div>
    </article>
  );
}
