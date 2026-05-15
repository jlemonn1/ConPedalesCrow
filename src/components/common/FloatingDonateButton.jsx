import { useNavigate } from 'react-router-dom';
import './FloatingDonateButton.css';

export default function FloatingDonateButton() {
  const navigate = useNavigate();

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
