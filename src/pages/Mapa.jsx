import { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap, useMapEvents } from 'react-leaflet';
import { api } from '../data/mockData';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Loading from '../components/common/Loading';
import 'leaflet/dist/leaflet.css';
import './Mapa.css';

import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const startIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const endIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const defaultIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const completedIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const EUROPE_BOUNDS = [[25, -25], [72, 45]];

function MapEvents({ onMoveEnd }) {
  const map = useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      if (center.lat < EUROPE_BOUNDS[0][0]) map.setLatLng([EUROPE_BOUNDS[0][0] + 1, center.lng]);
      if (center.lat > EUROPE_BOUNDS[1][0]) map.setLatLng([EUROPE_BOUNDS[1][0] - 1, center.lng]);
      if (center.lng < EUROPE_BOUNDS[0][1]) map.setLatLng([center.lat, EUROPE_BOUNDS[0][1] + 1]);
      if (center.lng > EUROPE_BOUNDS[1][1]) map.setLatLng([center.lat, EUROPE_BOUNDS[1][1] - 1]);
    }
  });
  return null;
}

function FitBounds({ points }) {
  const map = useMap();
  
  useEffect(() => {
    if (points && points.length > 0) {
      const validPoints = points.filter(p => p && typeof p[0] === 'number' && typeof p[1] === 'number');
      if (validPoints.length > 0) {
        const bounds = L.latLngBounds(validPoints);
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 });
      }
    }
  }, [points, map]);
  
  return null;
}

function MapController({ center, zoom }) {
  const map = useMap();
  
  useEffect(() => {
    if (center && zoom) {
      map.flyTo(center, zoom, { duration: 1 });
    }
  }, [center, zoom, map]);
  
  return null;
}

export default function Mapa() {
  const [route, setRoute] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [showRoute, setShowRoute] = useState(true);
  const [panelOpen, setPanelOpen] = useState(true);
  const [mapCenter, setMapCenter] = useState(null);
  const [mapZoom, setMapZoom] = useState(null);
  const [expandedCountry, setExpandedCountry] = useState(null);
  const [filterCountry, setFilterCountry] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef(null);

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

  useEffect(() => {
    if (mapRef.current && route.length > 0 && !mapZoom) {
      setTimeout(() => {
        const bounds = L.latLngBounds(route.map(p => [p.lat, p.lng]));
        mapRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 8 });
      }, 100);
    }
  }, [route, mapZoom]);

  if (loading) return <Loading />;

  const totalKm = route.length > 0 ? route[route.length - 1].km : 0;
  const countries = [...new Set(route.map(p => p.country))];
  const filteredRoute = filterCountry ? route.filter(p => p.country === filterCountry) : route;
  
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
    if (point.status === 'completed') return completedIcon;
    if (index === 0) return startIcon;
    if (index === total - 1) return endIcon;
    return defaultIcon;
  };

  const routePositions = filteredRoute
    .filter(p => p && typeof p.lat === 'number' && typeof p.lng === 'number')
    .map(p => [p.lat, p.lng]);

  const handlePointClick = (point) => {
    setSelectedPoint(point);
    setMapCenter([point.lat, point.lng]);
    setMapZoom(10);
  };

  const centerOnRoute = () => {
    setMapCenter(null);
    setMapZoom(null);
    if (mapRef.current && route.length > 0) {
      const bounds = L.latLngBounds(route.map(p => [p.lat, p.lng]));
      mapRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 8 });
    }
  };

  const toggleCountry = (country) => {
    setExpandedCountry(prev => prev === country ? null : country);
  };

  const togglePanel = () => {
    setPanelOpen(prev => !prev);
  };

  const center = route.length > 0 ? [route[0].lat, route[0].lng] : [46, 10];

  return (
    <>
      <Navbar />
      <div className="mapa-page">
        <div className="mapa-hero">
          <div className="container">
            <h1>Mapa del viaje</h1>
            <p>Desde Toledo hasta Atenas</p>
          </div>
        </div>
        
        <div className="mapa-layout">
          <div className={`route-panel ${panelOpen ? 'open' : 'closed'}`}>
            <div className="panel-header">
              <button className="panel-toggle-btn" onClick={togglePanel}>
                {panelOpen ? '◀' : '▶'}
              </button>
              <span className="panel-title">Ruta</span>
              <label className="route-toggle">
                <input 
                  type="checkbox" 
                  checked={showRoute}
                  onChange={(e) => setShowRoute(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            
            {panelOpen && (
              <div className="panel-body">
                <div className="country-filter">
                  <select 
                    value={filterCountry || ''} 
                    onChange={(e) => setFilterCountry(e.target.value || null)}
                  >
                    <option value="">Todos los países</option>
                    {countries.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="countries-list">
                  {countries.map((country) => (
                    <div key={country} className="country-block">
                      <div 
                        className="country-title"
                        style={{ borderLeftColor: getCountryColor(country) }}
                        onClick={() => toggleCountry(country)}
                      >
                        <span className="expand-icon">
                          {expandedCountry === country ? '▼' : '▶'}
                        </span>
                        <span className="country-name">{country}</span>
                        <span className="country-km">{stagesByCountry[country]} km</span>
                      </div>
                      
                      {expandedCountry === country && (
                        <div className="country-cities">
                          {route.filter(p => p.country === country).map((point, pIdx) => (
                            <div 
                              key={pIdx} 
                              className={`city-item ${selectedPoint === point ? 'selected' : ''} ${point.status}`}
                              onClick={() => handlePointClick(point)}
                            >
                              <div 
                                className="city-marker" 
                                style={{ backgroundColor: getCountryColor(country) }}
                              >
                                {pIdx + 1}
                              </div>
                              <div className="city-info">
                                <span className="city-name">{point.name}</span>
                                <span className="city-km">{point.km} km</span>
                              </div>
                              {point.status === 'completed' && (
                                <span className="status-badge">✓</span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="map-container">
            <div className="map-wrapper">
              <MapContainer 
                ref={mapRef}
                center={center}
                zoom={5}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
                zoomControl={true}
                minZoom={4}
                maxBounds={EUROPE_BOUNDS}
                maxBoundsViscosity={1.0}
                whenReady={() => setMapReady(true)}
              >
                <TileLayer
                  attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
                  url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                  maxZoom={19}
                  bounds={EUROPE_BOUNDS}
                />
                
                <MapEvents />
                {mapCenter && <MapController center={mapCenter} zoom={mapZoom} />}
                <FitBounds points={routePositions} />
                
                {showRoute && routePositions.length > 1 && (
                  <Polyline 
                    positions={routePositions} 
                    color="#e74c3c" 
                    weight={4} 
                    opacity={0.8}
                    dashArray="10, 10"
                  />
                )}
                
                {filteredRoute.map((point, index) => (
                  <Marker 
                    key={index} 
                    position={[point.lat, point.lng]}
                    icon={getPointIcon(point, index, filteredRoute.length)}
                    eventHandlers={{ click: () => setSelectedPoint(point) }}
                  >
                    <Popup>
                      <div className="leaflet-popup">
                        <h4>{point.name}</h4>
                        <p style={{ color: getCountryColor(point.country), fontWeight: 600 }}>
                          {point.country}
                        </p>
                        <p>{point.km} km desde Toledo</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>

              <div className="map-controls">
                <button className="map-btn" onClick={centerOnRoute} title="Ver toda la ruta">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </button>
                <button className="map-btn mobile-toggle" onClick={togglePanel} title="Ver ruta">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                  </svg>
                </button>
              </div>

              {selectedPoint && (
                <div className="selected-point-card">
                  <button className="close-card" onClick={() => setSelectedPoint(null)}>×</button>
                  <div className="card-content" style={{ borderLeftColor: getCountryColor(selectedPoint.country) }}>
                    <h4>{selectedPoint.name}</h4>
                    <p style={{ color: getCountryColor(selectedPoint.country) }}>{selectedPoint.country}</p>
                    <span>{selectedPoint.km} km</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mapa-stats">
          <div className="stat-item">
            <span className="stat-icon">🌍</span>
            <span className="stat-info">
              <span className="stat-number">{countries.length}</span>
              <span className="stat-text">Países</span>
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🏙️</span>
            <span className="stat-info">
              <span className="stat-number">{route.length}</span>
              <span className="stat-text">Ciudades</span>
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🛣️</span>
            <span className="stat-info">
              <span className="stat-number">{totalKm.toLocaleString()}</span>
              <span className="stat-text">Km</span>
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">📅</span>
            <span className="stat-info">
              <span className="stat-number">~{Math.round(totalKm / 80)}</span>
              <span className="stat-text">Días</span>
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
