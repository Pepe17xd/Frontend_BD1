import { ProfessionalCard } from '../components/ProfessionalCard.jsx';
import { getProfessionalProfiles } from '../services/platformService.js';

export function ProfessionalsPage({ onOpenProfessional }) {
  const professionals = getProfessionalProfiles();

  return (
    <section className="page-stack">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Usuario + Profesional + Perfil</p>
          <h1>Profesionales</h1>
          <p>Candidatos con habilidades, experiencia, certificados y postulaciones registradas.</p>
        </div>
      </div>

      <div className="content-grid two-columns">
        {professionals.map((professional) => (
          <ProfessionalCard key={professional.id_usuario} professional={professional} onOpen={onOpenProfessional} />
        ))}
      </div>
    </section>
  );
}
