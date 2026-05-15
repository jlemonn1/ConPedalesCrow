import { useStats } from '../../hooks/useStats';
import './Hero.css';

export default function Hero() {
  const { stats } = useStats();

  const totalKm = stats?.totalKm ?? 3400;
  const estimatedDays = 90;
  const countries = 12;

  return (
    <section className="hero">
      <div className="hero-bg-pattern"></div>
      <div className="hero-grid"></div>
      
      <div className="hero-content">
        <div className="hero-badge">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          De Toledo a Grecia
        </div>
        
        <h1 className="hero-title">
          Con<span>Pedales</span>
        </h1>
        
        <p className="hero-subtitle">
          Miles dekilómetros. Cientos de pedaladas. Una aventura que queremos compartir contigo.
        </p>
        
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-value">{totalKm.toLocaleString('es-ES')}</span>
            <span className="hero-stat-label">Kilómetros</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">{estimatedDays}</span>
            <span className="hero-stat-label">Días</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">{countries}</span>
            <span className="hero-stat-label">Países</span>
          </div>
        </div>
        
        <div className="hero-buttons">
          <a href="/viaje" className="hero-btn hero-btn-primary">Ver el viaje</a>
          <a href="/donar" className="hero-btn hero-btn-secondary">Donar</a>
        </div>

        <div className="hero-socials">
          <a
            href="https://instagram.com/conpedales.porelmundo"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-link"
            aria-label="Instagram"
          >
            <span className="hero-social-ring" />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a
            href="https://tiktok.com/@conpedalesporelmundo"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-link"
            aria-label="TikTok"
          >
            <span className="hero-social-ring" />
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
          </a>
        </div>
      </div>
      
      <div className="hero-scroll">
        <div className="hero-scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
}