import { useState, useEffect } from 'react';
import { api } from '../data/mockData';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import DonationCard from '../components/common/DonationCard';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import './Comunidad.css';

export default function Comunidad() {
  const [donations, setDonations] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getDonations(20),
      api.getMetrics()
    ]).then(([donationsData, metricsData]) => {
      setDonations(donationsData);
      setMetrics(metricsData);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  const totalDonated = donations.reduce((acc, d) => acc + d.amount, 0);

  return (
    <>
      <Navbar />
      <div className="comunidad-page">
        <div className="comunidad-hero">
          <div className="container">
            <h1>Comunidad</h1>
            <p>Gente que cree en nosotros y nos acompaña en esta aventura</p>
          </div>
        </div>
        
        <div className="comunidad-content">
          <div className="comunidad-stats">
            <div className="comunidad-stat">
              <div className="comunidad-stat-value">{metrics?.donaciones || 0}</div>
              <div className="comunidad-stat-label">Donantes</div>
            </div>
            <div className="comunidad-stat">
              <div className="comunidad-stat-value">{totalDonated}€</div>
              <div className="comunidad-stat-label">Total donado</div>
            </div>
            <div className="comunidad-stat">
              <div className="comunidad-stat-value">{api.fundedKm || 2430}</div>
              <div className="comunidad-stat-label">Km financiados</div>
            </div>
          </div>
          
          <div className="comunidad-section">
            <h2>Todas las donaciones</h2>
            <div className="comunidad-feed">
              {donations.map(donation => (
                <DonationCard key={donation.id} donation={donation} />
              ))}
            </div>
          </div>
          
          <div className="comunidad-cta">
            <h3>¿Quieres unirte a la comunidad?</h3>
            <p>Cada euro nos acerca un poco más a Grecia. Tu apoyo importa.</p>
            <Button href="/donar" size="large">Donar ahora</Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
