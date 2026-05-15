import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLatestStages } from '../../hooks/useStages';
import { adaptStagesForCards } from '../../services/adapters';
import StageCard from '../common/StageCard';
import Loading from '../common/Loading';
import './LatestStages.css';

export default function LatestStages() {
  const navigate = useNavigate();
  const { stages, loading } = useLatestStages(6);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const adaptedStages = adaptStagesForCards(stages || []);
  const total = adaptedStages.length;

  // Desktop: 3 visibles, Tablet: 2, Mobile: 1
  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  };

  const visibleCount = getVisibleCount();
  const maxIndex = Math.max(0, total - visibleCount);

  const goTo = useCallback((index) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
  }, [maxIndex]);

  const goNext = useCallback(() => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay
  useEffect(() => {
    if (total <= visibleCount || isPaused) return;
    const interval = setInterval(() => {
      goNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [total, visibleCount, isPaused, goNext]);

  // Responsive re-calc
  useEffect(() => {
    const handleResize = () => {
      const vc = getVisibleCount();
      const newMax = Math.max(0, total - vc);
      setCurrentIndex(prev => Math.min(prev, newMax));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [total]);

  if (loading) return <Loading />;
  if (total === 0) return null;

  const translatePercent = currentIndex * (100 / visibleCount);

  return (
    <section
      className="latest-stages"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container">
        <div className="latest-header">
          <div>
            <h2>Últimas etapas</h2>
            <p>Síguenos día a día en esta aventura</p>
          </div>
          <button
            type="button"
            className="latest-diario-link"
            onClick={() => navigate('/diario')}
          >
            Diario
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="carousel-wrapper">
          <button
            type="button"
            className="carousel-arrow carousel-arrow-prev"
            onClick={goPrev}
            aria-label="Anterior"
            disabled={currentIndex === 0 && total <= visibleCount}
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="carousel-viewport">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${translatePercent}%)` }}
            >
              {adaptedStages.map(stage => (
                <div
                  key={stage.id}
                  className="carousel-slide"
                  style={{ flex: `0 0 ${100 / visibleCount}%` }}
                >
                  <StageCard stage={stage} />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="carousel-arrow carousel-arrow-next"
            onClick={goNext}
            aria-label="Siguiente"
            disabled={currentIndex >= maxIndex && total <= visibleCount}
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {total > visibleCount && (
          <div className="carousel-dots">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                className={`carousel-dot ${i === currentIndex ? 'active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Ir a slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
