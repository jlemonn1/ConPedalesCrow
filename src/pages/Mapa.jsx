import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import { api } from '../data/mockData';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Loading from '../components/common/Loading';
import 'leaflet/dist/leaflet.css';
import './Mapa.css';

import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const startIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const endIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const defaultIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function FitBounds({ points }) {
  const map = useMap();
  
  useEffect(() => {
    if (points && points.length > 0) {
      const validPoints = points.filter(p => p && typeof p[0] === 'number' && typeof p[1] === 'number');
      if (validPoints.length > 0) {
        const bounds = L.latLngBounds(validPoints);
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [points, map]);
  
  return null;
}

export default function Mapa() {
  const [route, setRoute] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [showAllRoutes, setShowAllRoutes] = useState(false);

  useEffect(() => {
    Promise.all([
      api.getMapRoute(),
      api.getMetrics()
    ]).then(([routeData, metricsData]) => {
      setRoute(routeData);
      setMetrics(metricsData);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  const totalKm = route.length > 0 ? route[route.length - 1].km : 0;
  
  const countries = [...new Set(route.map(p => p.country))];
  
  const stagesByCountry = countries.reduce((acc, country) => {
    const countryPoints = route.filter(p => p.country === country);
    const countryKm = countryPoints.length > 0 ? 
      countryPoints[countryPoints.length - 1].km - (countryPoints[0]?.km || 0) : 0;
    acc[country] = countryKm;
    return acc;
  }, {});

  const getCountryColor = (country) => {
    const colors = {
      'España': '#c9a227',
      'Francia': '#0055A4',
      'Mónaco': '#cecece',
      'Italia': '#009246',
      'Eslovenia': '#00A551',
      'Croacia': '#FF0000',
      'Bosnia': '#002395',
      'Montenegro': '#C6363C',
      'Albania': '#E41B17',
      'Serbia': '#0C4076',
      'Macedonia': '#D70000',
      'Grecia': '#001489'
    };
    return colors[country] || '#666';
  };

  const getPointIcon = (point, index, total) => {
    if (index === 0) return startIcon;
    if (index === total - 1) return endIcon;
    return defaultIcon;
  };

  const routePositions = route.filter(p => p && typeof p.lat === 'number' && typeof p.lng === 'number').map(p => [p.lat, p.lng]);

  return (
    <>
      <Navbar />
      <div className="mapa-page">
        <div className="mapa-hero">
          <div className="container">
            <h1>Mapa del viaje</h1>
            <p>Nuestra ruta completa desde Toledo hasta Atenas</p>
          </div>
        </div>
        
        <div className="mapa-content">
          <div className="mapa-container">
            <div className="mapa-visual">
              <div className="google-map-container">
                <div className="map-route-list">
                  <div className="route-list-header">
                    <h3>Ruta completa</h3>
                    <label className="toggle-route">
                      <input 
                        type="checkbox" 
                        checked={showAllRoutes}
                        onChange={(e) => setShowAllRoutes(e.target.checked)}
                      />
                      <span>Mostrar ruta</span>
                    </label>
                  </div>
                  {countries.map((country) => (
                    <div key={country} className="country-section">
                      <div className="country-header" style={{ borderLeftColor: getCountryColor(country) }}>
                        <h3>{country}</h3>
                        <span className="country-km">{stagesByCountry[country]} km</span>
                      </div>
                      <div className="country-points">
                        {route.filter(p => p.country === country).map((point, pIdx) => (
                          <div 
                            key={pIdx} 
                            className={`point-item ${point.status} ${selectedPoint === point ? 'active' : ''}`}
                            onClick={() => setSelectedPoint(selectedPoint === point ? null : point)}
                          >
                            <div className="point-marker" style={{ backgroundColor: getCountryColor(country) }}>
                              {pIdx + 1}
                            </div>
                            <div className="point-info">
                              <span className="point-name">{point.name}</span>
                              <span className="point-km">{point.km} km</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="map-display">
                  <MapContainer 
                    center={[route[0]?.lat || 40, route[0]?.lng || -4]} 
                    zoom={5} 
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={true}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <FitBounds points={routePositions} />
                    
                    {showAllRoutes && (
                      <Polyline 
                        positions={routePositions} 
                        color="#e74c3c" 
                        weight={4} 
                        opacity={0.8}
                      />
                    )}
                    
                    {route.map((point, index) => (
                      <Marker 
                        key={index} 
                        position={[point.lat, point.lng]}
                        icon={getPointIcon(point, index, route.length)}
                      >
                        <Popup>
                          <div className="leaflet-popup">
                            <h4>{point.name}</h4>
                            <p className="country-label" style={{ color: getCountryColor(point.country) }}>
                              {point.country}
                            </p>
                            <p className="km-label">{point.km} km desde Toledo</p>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                  
                  {selectedPoint && (
                    <div className="point-detail-popup">
                      <h4>{selectedPoint.name}</h4>
                      <p className="country-label" style={{ color: getCountryColor(selectedPoint.country) }}>
                        {selectedPoint.country}
                      </p>
                      <p className="km-label">{selectedPoint.km} km desde Toledo</p>
                      <p className="coords">
                        {selectedPoint.lat.toFixed(4)}°, {selectedPoint.lng.toFixed(4)}°
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="route-summary">
                <div className="summary-item">
                  <span className="label">Total países</span>
                  <span className="value">{countries.length}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Ciudades</span>
                  <span className="value">{route.length}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Km totales</span>
                  <span className="value">{totalKm.toLocaleString()}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Días estimados</span>
                  <span className="value">~{Math.round(totalKm / 80)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mapa-info">
            <div className="mapa-info-card">
              <h3>Km Totales</h3>
              <p>{metrics?.totalKm?.toLocaleString() || totalKm.toLocaleString()}</p>
            </div>
            <div className="mapa-info-card">
              <h3>Km Recorridos</h3>
              <p>{metrics?.kmRecorridos || 420}</p>
            </div>
            <div className="mapa-info-card">
              <h3>Días en camino</h3>
              <p>{metrics?.diasViaje || 6}</p>
            </div>
            <div className="mapa-info-card">
              <h3>Países</h3>
              <p>{countries.length}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
