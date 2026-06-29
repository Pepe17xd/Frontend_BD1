import { BriefcaseBusiness, Building2, Sparkles, Users } from 'lucide-react';
import { JobCard } from '../components/JobCard.jsx';
import { MetricCard } from '../components/MetricCard.jsx';
import { ProfessionalCard } from '../components/ProfessionalCard.jsx';
import { getDashboardSummary } from '../services/platformService.js';

export function HomePage({ onOpenJobs, onOpenProfessionals, onOpenJob, onOpenProfessional }) {
  const summary = getDashboardSummary();

  return (
    <section className="page-stack">
      <div className="page-heading dashboard-heading">
        <div>
          <p className="eyebrow">Sistema de compatibilidad laboral</p>
          <h1>Panel de reclutamiento por habilidades</h1>
          <p>Perfiles, ofertas y habilidades conectados con el modelo relacional del proyecto.</p>
        </div>
        <div className="heading-actions">
          <button className="primary-button" onClick={onOpenJobs}>Ver ofertas</button>
          <button className="secondary-button" onClick={onOpenProfessionals}>Ver profesionales</button>
        </div>
      </div>

      <div className="metrics-grid">
        <MetricCard icon={Users} label="Profesionales" value={summary.profesionales} />
        <MetricCard icon={BriefcaseBusiness} label="Ofertas activas" value={summary.ofertasActivas} />
        <MetricCard icon={Building2} label="Empresas" value={summary.empresas} />
        <MetricCard icon={Sparkles} label="Habilidades" value={summary.habilidades} />
      </div>

      <div className="split-layout">
        <section className="section-block">
          <div className="section-title-row">
            <h2>Ofertas recientes</h2>
            <button className="text-button" onClick={onOpenJobs}>Ver todas</button>
          </div>
          <div className="compact-list">
            {summary.ofertasDestacadas.map((job) => <JobCard key={job.id_oferta} job={job} onOpen={onOpenJob} />)}
          </div>
        </section>

        <section className="section-block">
          <div className="section-title-row">
            <h2>Profesionales destacados</h2>
            <button className="text-button" onClick={onOpenProfessionals}>Ver todos</button>
          </div>
          <div className="compact-list">
            {summary.profesionalesDestacados.map((professional) => (
              <ProfessionalCard key={professional.id_usuario} professional={professional} onOpen={onOpenProfessional} />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
