import './ExitIntentModal.css';

export default function ExitIntentModal({ isOpen, onClose, onDonate, submitting }) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      // Solo cerrar si se pincha fuera del panel (opcional, pero mejor no cerrar por backdrop)
      // Según requisito: solo se cierra con la cruz
    }
  };

  return (
    <div className="exit-modal-overlay" onClick={handleBackdropClick}>
      <div className="exit-modal-panel">
        <button className="exit-modal-close" onClick={onClose} aria-label="Cerrar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="exit-modal-content">
          <div className="exit-modal-icon">💸</div>

          <p className="exit-modal-text">
            ¿En serio te piras? Venga no seas rata. Son 50 céntimos, ni siquiera un euro entero. Con Apple Pay ni tienes que buscar la tarjeta. Tres segundos y nos salvas del ridículo. ¿O es que te da igual?
          </p>

          <button
            className="exit-modal-cta"
            onClick={onDonate}
            disabled={submitting}
          >
            {submitting ? (
              <span className="exit-modal-loading">
                <span className="exit-modal-spinner" /> Redirigiendo...
              </span>
            ) : (
              <>
                Donar 0,50€ →
              </>
            )}
          </button>

          <p className="exit-modal-sub">
            Pago seguro con Stripe · Apple Pay · Google Pay
          </p>
        </div>
      </div>
    </div>
  );
}
