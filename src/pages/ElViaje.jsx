import { useState, useEffect } from 'react';
import { api } from '../data/mockData';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Loading from '../components/common/Loading';
import './ElViaje.css';

export default function ElViaje() {
  const [tripInfo, setTripInfo] = useState(null);
  const [previousTrips, setPreviousTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getTripInfo(),
      api.getPreviousTrips()
    ]).then(([info, trips]) => {
      setTripInfo(info);
      setPreviousTrips(trips);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />
      <div className="elviaje-page">
        <div className="elviaje-hero">
          <div className="container">
            <h1>El Viaje</h1>
            <p className="tagline">{tripInfo.title}</p>
            <p>{tripInfo.subtitle}</p>
          </div>
        </div>
        
        <div className="elviaje-content">
          <div className="story-section">
            <h2>Nuestra historia</h2>
            <p>
              Somos dos amigos que un día tomamos una decisión que cambiaría nuestras vidas: dejar todo 
              temporalmente para vivir la aventura de nuestros sueños. En marzo de 2026, saldremos de 
              Toledo con un objetivo claro: llegar a Grecia pedaleando.
            </p>
            <p>
              ¿Por qué Grecia? El Egeo siempre ha sido un sueño. Imagine kilometers de carreteras 
              serpenteantes, montañas que tocan el cielo, pueblos donde el tiempo parece detenido. 
              Queríamos descubrir Europa de la forma más auténtica posible: solo con la fuerza de 
              nuestras piernas y la ilusión de quienes saben que el camino es tan importante como el destino.
            </p>
            <p>
              Este viaje no es solo un reto físico. Es una forma de demostrar que los sueños se pueden 
              cumplir con constancia, esfuerzo y el apoyo de quienes crees en ti. Cada pedalada nos 
              acerca a Grecia, pero también nos acerca a nosotros mismos.
            </p>
            
            <div className="story-highlight">
              <div className="story-stat">
                <div className="story-stat-value">3.400</div>
                <div className="story-stat-label">kilómetros</div>
              </div>
              <div className="story-stat">
                <div className="story-stat-value">90</div>
                <div className="story-stat-label">días estimados</div>
              </div>
              <div className="story-stat">
                <div className="story-stat-value">4</div>
                <div className="story-stat-label">países</div>
              </div>
            </div>
          </div>
          
          <div className="previous-trips">
            <h2>Viajes anteriores</h2>
            <div className="previous-trips-grid">
              {previousTrips.map(trip => (
                <div key={trip.id} className="trip-card">
                  <div className="trip-image">
                    {trip.image === 'camino' ? '⛪' : '🏔️'}
                  </div>
                  <div className="trip-content">
                    <div className="trip-header">
                      <h3 className="trip-title">{trip.title}</h3>
                      <span className="trip-year">{trip.year}</span>
                    </div>
                    <p className="trip-distance">{trip.distance} km</p>
                    <p className="trip-description">{trip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
