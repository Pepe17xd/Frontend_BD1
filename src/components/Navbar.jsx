import { Database } from 'lucide-react';

export function Navbar() {
  return (
    <header className="navbar">
      <div className="brand" aria-label="BD1 consultas">
        <span className="brand-mark"><Database size={20} /></span>
        <span>
          <strong>BD1 Consultas</strong>
          <small>PostgreSQL + Express</small>
        </span>
      </div>
    </header>
  );
}
