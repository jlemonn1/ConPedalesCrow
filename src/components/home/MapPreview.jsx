import { useState, useEffect } from 'react';
import { api } from '../../data/mockData';
import Button from '../common/Button';
import Loading from '../common/Loading';
import './MapPreview.css';

export default function MapPreview() {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getStages(6).then(data => {
      setStages(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  const points = [
    { name: 'Toledo', km: '0 km', status: 'completed' },
    { name: 'Illescas', km: '45 km', status: 'completed' },
    { name: 'Torrijos', km: '165 km', status: 'completed' },
    { name: 'Talavera', km: '293 km', status: 'completed' },
    { name: 'Navalmoral', km: '378 km', status: 'completed' },
    { name: 'Plasencia', km: '470 km', status: 'active' },
    { name: 'Grecia', km: '3.400 km', status: 'pending' },
  ];

  return (
    <section className="map-preview">
      <div className="container">
        <div className="map-header">
          <h2>Mapa del viaje</h2>
          <p>Nuestra ruta desde Toledo hasta Grecia</p>
        </div>
        
        <div className="map-container">
          <div className="map-placeholder">
            <div className="map-route-visual">
              <div className="map-route-line"></div>
              <div className="map-route-points">
                {points.map((point, index) => (
                  <div key={index} className="map-route-point">
                    <div className={`map-point-dot ${point.status}`}></div>
                    <span className="map-point-label">{point.name}</span>
                    <span className="map-point-km">{point.km}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="map-overlay-text">
              <p>Seguimos pedaleando hacia Grecia</p>
              <span>Cada día añadimos nuevas etapas</span>
            </div>
          </div>
        </div>
        
        <div className="map-cta">
          <Button href="/mapa" variant="secondary">Ver mapa completo</Button>
        </div>
      </div>
    </section>
  );
}
