import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../data/mockData';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import './Diario.css';

export default function Diario() {
  const [searchParams] = useSearchParams();
  const stageId = searchParams.get('id');
  const [stages, setStages] = useState([]);
  const [selectedStage, setSelectedStage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getStages(20).then(data => {
      setStages(data);
      setLoading(false);
      
      if (stageId) {
        const stage = data.find(s => s.id === parseInt(stageId));
        if (stage) setSelectedStage(stage);
      }
    });
  }, [stageId]);

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />
      <div className="diario-page">
        <div className="diario-hero">
          <div className="container">
            <h1>Diario del viaje</h1>
            <p>Documentamos cada pedalada de esta aventura</p>
          </div>
        </div>
        
        <div className="diario-content">
          {stages.length === 0 ? (
            <div className="timeline-empty">
              <p>Próximamente añadiremos las primeras etapas del viaje.</p>
            </div>
          ) : (
            <div className="timeline">
              {stages.map(stage => (
                <div key={stage.id} className="timeline-item">
                  <div className={`timeline-dot ${stage.current ? 'current' : ''}`}></div>
                  <div className="timeline-content">
                    <span className={`timeline-number ${stage.current ? 'current' : ''}`}>
                      ETAPA {stage.number}
                      {stage.current && ' • EN CURSO'}
                    </span>
                    <h3 className="timeline-title">{stage.title}</h3>
                    <div className="timeline-stats">
                      <span className="timeline-stat">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        {stage.distance} km
                      </span>
                      <span className="timeline-stat">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        {stage.elevation} m
                      </span>
                      <span className="timeline-stat">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {Math.round(stage.distance / 20)}h
                      </span>
                    </div>
                    <p className="timeline-text">{stage.summary}</p>
                    <span className="timeline-date">{stage.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
