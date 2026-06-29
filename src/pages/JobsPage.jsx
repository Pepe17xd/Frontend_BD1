import { JobCard } from '../components/JobCard.jsx';
import { getJobListings } from '../services/platformService.js';

export function JobsPage({ onOpenJob }) {
  const jobs = getJobListings();

  return (
    <section className="page-stack">
      <div className="page-heading">
        <div>
          <p className="eyebrow">OfertaLaboral</p>
          <h1>Ofertas laborales</h1>
          <p>Vacantes publicadas por empresas y asociadas a habilidades requeridas.</p>
        </div>
      </div>

      <div className="content-grid two-columns">
        {jobs.map((job) => <JobCard key={job.id_oferta} job={job} onOpen={onOpenJob} />)}
      </div>
    </section>
  );
}
