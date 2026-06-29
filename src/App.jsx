import { Navbar } from './components/Navbar.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { JobsPage } from './pages/JobsPage.jsx';
import { JobDetailPage } from './pages/JobDetailPage.jsx';
import { ProfessionalsPage } from './pages/ProfessionalsPage.jsx';
import { ProfessionalProfilePage } from './pages/ProfessionalProfilePage.jsx';
import { useNavigation } from './hooks/useNavigation.js';

const pageTitle = {
  home: 'Inicio',
  jobs: 'Ofertas laborales',
  jobDetail: 'Detalle de oferta',
  professionals: 'Profesionales',
  professionalProfile: 'Perfil profesional',
};

export default function App() {
  const navigation = useNavigation('home');

  const renderPage = () => {
    if (navigation.page === 'jobs') {
      return <JobsPage onOpenJob={navigation.openJob} />;
    }

    if (navigation.page === 'jobDetail') {
      return <JobDetailPage jobId={navigation.params.jobId} onBack={() => navigation.goTo('jobs')} onOpenProfessional={navigation.openProfessional} />;
    }

    if (navigation.page === 'professionals') {
      return <ProfessionalsPage onOpenProfessional={navigation.openProfessional} />;
    }

    if (navigation.page === 'professionalProfile') {
      return <ProfessionalProfilePage professionalId={navigation.params.professionalId} onBack={() => navigation.goTo('professionals')} onOpenJob={navigation.openJob} />;
    }

    return <HomePage onOpenJobs={() => navigation.goTo('jobs')} onOpenProfessionals={() => navigation.goTo('professionals')} onOpenJob={navigation.openJob} onOpenProfessional={navigation.openProfessional} />;
  };

  return (
    <div className="app-shell">
      <Navbar activePage={navigation.page} currentTitle={pageTitle[navigation.page]} onNavigate={navigation.goTo} />
      <main className="main-content">{renderPage()}</main>
    </div>
  );
}
