import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './FloatingDonateButton.css';

export default function FloatingDonateButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Siempre oculto en /donar
    if (location.pathname === '/donar') {
      setIsVisible(false);
      return;
    }

    // En home, mostrar solo después de pasar el hero
    if (location.pathname === '/') {
      const handleScroll = () => {
        const threshold = window.innerHeight * 0.85;
        setIsVisible(window.scrollY > threshold);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Check inicial

      return () => window.removeEventListener('scroll', handleScroll);
    }

    // En otras páginas, siempre visible
    setIsVisible(true);
  }, [location.pathname]);

  if (!isVisible) return null;

  return (
    <button
      className="floating-donate"
      onClick={() => navigate('/donar')}
      aria-label="Donar"
      title="Donar"
    >
      <span className="floating-donate-ring" />
      <span className="floating-donate-inner">
        €
      </span>
    </button>
  );
}
