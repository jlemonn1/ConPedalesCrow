import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import { useKmProgress } from '../hooks/useStats';
import './DonarExito.css';

export default function DonarExito() {
  const [searchParams] = useSearchParams();
  const { kmFinanced, totalDonors } = useKmProgress();

  const sessionId = searchParams.get('session_id');

  return (
    <>
      <Navbar />
      <div className="donar-exito-page">
        <div className="exito-card">
          <div className="exito-icon-wrapper">
            <div className="exito-icon-ring" />
            <div className="exito-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h1>¡Gracias por tu donación!</h1>

          <p className="exito-message">
            Tu apoyo nos ayuda a seguir pedaleando hacia Grecia.
            Cada euro cuenta y cada kilómetro nos acerca más a nuestro sueño.
          </p>

          <div className="exito-stats">
            <div className="exito-stat">
              <span className="exito-stat-icon">🚲</span>
              <span className="exito-stat-value">{kmFinanced.toLocaleString('es-ES')}</span>
              <span className="exito-stat-label">km financiados en total</span>
            </div>
            <div className="exito-stat-divider" />
            <div className="exito-stat">
              <span className="exito-stat-icon">👥</span>
              <span className="exito-stat-value">{totalDonors}</span>
              <span className="exito-stat-label">donantes</span>
            </div>
          </div>

          <div className="exito-actions">
            <Button href="/" variant="primary" size="large">
              Volver al inicio
            </Button>
            <Button href="/diario" variant="secondary" size="large">
              Ver el diario
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
