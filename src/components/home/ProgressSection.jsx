import { useState, useEffect } from 'react';
import { api } from '../../data/mockData';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';
import Loading from '../common/Loading';
import './ProgressSection.css';

export default function ProgressSection() {
  const [fundedKm, setFundedKm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getFundedKm().then(data => {
      setFundedKm(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  const totalKm = 3400;
  const percentage = Math.round((fundedKm / totalKm) * 100);

  return (
    <section className="progress-section">
      <div className="container">
        <div className="progress-card">
          <div className="progress-header">
            <h2>La comunidad ya ha financiado:</h2>
            <p>Cada euro nos acerca un kilómetro más a Grecia</p>
          </div>
          
          <div className="progress-highlight">
            {fundedKm.toLocaleString()} km
          </div>
          
          <div className="progress-bar-section">
            <ProgressBar current={fundedKm} total={totalKm} />
            <div className="progress-info">
              <span>Objetivo: {totalKm.toLocaleString()} km</span>
              <span className="progress-rate">100 km ≈ 80€</span>
            </div>
          </div>
          
          <div className="progress-cta">
            <p>Ayúdanos a pedalear más lejos</p>
            <Button href="/donar" size="large">Donar ahora</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
