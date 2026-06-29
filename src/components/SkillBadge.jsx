export function SkillBadge({ skill, muted = false }) {
  return <span className={muted ? 'skill-badge muted' : 'skill-badge'}>{skill.nombre_habilidad || skill}</span>;
}
