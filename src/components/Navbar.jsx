import { BriefcaseBusiness, Home, Users } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Inicio', icon: Home },
  { id: 'jobs', label: 'Ofertas', icon: BriefcaseBusiness },
  { id: 'professionals', label: 'Profesionales', icon: Users },
];

export function Navbar({ activePage, currentTitle, onNavigate }) {
  return (
    <header className="navbar">
      <button className="brand" onClick={() => onNavigate('home')} aria-label="Ir al inicio">
        <span className="brand-mark">SM</span>
        <span>
          <strong>SkillMatch</strong>
          <small>{currentTitle}</small>
        </span>
      </button>

      <nav className="nav-links" aria-label="Navegacion principal">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button key={id} className={activePage === id ? 'nav-link active' : 'nav-link'} onClick={() => onNavigate(id)}>
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </header>
  );
}
