import Button from '../common/Button';
import './CTA.css';

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2>Impulsa la próxima pedalada</h2>
          <p>Cada euro nos acerca un poco más a Grecia</p>
          <div className="cta-button">
            <Button href="/donar" size="large">DONAR</Button>
          </div>
          <div className="cta-stats">
            <div className="cta-stat">
              <div className="cta-stat-value">2.430</div>
              <div className="cta-stat-label">km financiados</div>
            </div>
            <div className="cta-stat">
              <div className="cta-stat-value">132</div>
              <div className="cta-stat-label">donantes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
