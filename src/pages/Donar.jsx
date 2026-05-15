import { useState } from 'react';
import { publicApi } from '../services/api';
import { DONATION_CONFIG } from '../config/constants';
import { useKmProgress } from '../hooks/useStats';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import './Donar.css';

const BASE_URL = window.location.origin;

const amountOptions = [
  { value: 5, label: '5€', desc: 'Un café', icon: '☕' },
  { value: 10, label: '10€', desc: 'Una pizza', icon: '🍕', popular: true },
  { value: 20, label: '20€', desc: 'Repostaje', icon: '⛽' },
  { value: 50, label: '50€', desc: 'Una noche', icon: '🏨' },
];

export default function Donar() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState({ amount: false, name: false });

  const { totalDonors, loading: statsLoading } = useKmProgress();

  const finalAmount = selectedAmount || (customAmount ? parseInt(customAmount) : 0);
  const kmFinanced = Math.floor(finalAmount / DONATION_CONFIG.pricePerKm);

  const amountError = touched.amount && finalAmount < 1;
  const nameError = touched.name && !formData.name.trim();

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    setTouched(prev => ({ ...prev, amount: true }));
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
    setTouched(prev => ({ ...prev, amount: true }));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  };

  const handleBlur = (e) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ amount: true, name: true });

    if (!finalAmount || finalAmount < 1) return;
    if (!formData.name.trim()) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await publicApi.createCheckout({
        amount: finalAmount,
        name: formData.name,
        email: formData.email || undefined,
        comment: formData.comment || undefined,
        successUrl: `${BASE_URL}/donar/exito`,
        cancelUrl: `${BASE_URL}/donar/cancelar`,
      });

      if (response.checkoutUrl) {
        window.location.href = response.checkoutUrl;
      }
    } catch (err) {
      console.error('Error creating checkout:', err);
      setError('Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="donar-page">
        <div className="donar-hero">
          <div className="donar-hero-pattern" />
          <div className="container">
            <h1>Donar</h1>
            <p>Ayúdanos a llegar al Egeo. Cada euro cuenta.</p>
          </div>
        </div>

        <div className="donar-content">
          <div className="donar-card">
            <div className="donar-card-header">
              <h2>Elige tu aportación</h2>
              <p className="donar-card-subtitle">
                Si quieres ayudarnos a llegar a Grecia puedes aportar cualquier cantidad.
                <span className="highlight"> Cada euro cuenta.</span> Las donaciones superiores a 10€ recibirán un pequeño regalo del viaje.
              </p>
            </div>

            {error && <div className="donar-error">{error}</div>}

            <form className="donar-form" onSubmit={handleSubmit} noValidate>
              <div className="donar-section">
                <label className="donar-label">
                  Selecciona un importe <span className="required">*</span>
                </label>
                <div className={`amount-buttons ${amountError ? 'has-error' : ''}`}>
                  {amountOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`amount-btn ${selectedAmount === opt.value ? 'selected' : ''} ${opt.popular ? 'popular' : ''}`}
                      onClick={() => handleAmountSelect(opt.value)}
                    >
                      {opt.popular && <span className="popular-badge">Más popular</span>}
                      <span className="amount-icon">{opt.icon}</span>
                      <span className="amount-value">{opt.label}</span>
                      <span className="amount-desc">{opt.desc}</span>
                    </button>
                  ))}
                </div>
                {amountError && (
                  <p className="field-error">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Por favor, selecciona o introduce un importe.
                  </p>
                )}

                <div className={`custom-amount ${amountError ? 'has-error' : ''}`}>
                  <span className="custom-prefix">€</span>
                  <input
                    type="number"
                    placeholder="Otra cantidad"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    onBlur={handleBlur}
                    min="1"
                  />
                </div>

                <div className={`km-indicator ${finalAmount > 0 ? 'visible' : ''}`}>
                  <div className="km-indicator-inner">
                    <span className="km-icon">🚲</span>
                    <span>
                      Financias aproximadamente <strong>{kmFinanced} km</strong> del trayecto
                    </span>
                  </div>
                  <div className="km-bar">
                    <div className="km-bar-fill" style={{ width: `${Math.min(100, kmFinanced * 2)}%` }} />
                  </div>
                </div>
              </div>

              <div className="donar-section">
                <label className="donar-label">
                  Tus datos <span className="required">*</span>
                </label>
                <div className={`donar-input-group ${nameError ? 'has-error' : ''}`}>
                  <svg className="input-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <input
                    type="text"
                    name="name"
                    className="donar-input"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                </div>
                {nameError && (
                  <p className="field-error">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    El nombre es obligatorio para poder agradecerte la donación.
                  </p>
                )}

                <div className="donar-input-group">
                  <svg className="input-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <input
                    type="email"
                    name="email"
                    className="donar-input"
                    placeholder="Tu email (opcional)"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="donar-input-group textarea-group">
                  <svg className="input-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <textarea
                    name="comment"
                    className="donar-textarea"
                    placeholder="Mensaje opcional (se publicará con tu donación)"
                    value={formData.comment}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="donar-submit"
                disabled={!finalAmount || !formData.name.trim() || submitting}
              >
                {submitting ? (
                  <span className="submit-loading">
                    <span className="spinner" /> Redirigiendo al pago...
                  </span>
                ) : finalAmount > 0 ? (
                  <span className="submit-text">
                    Donar <strong>{finalAmount}€</strong> — Financia {kmFinanced} km
                  </span>
                ) : (
                  'Continuar al pago'
                )}
              </button>
            </form>

            <div className="donar-trust">
              <div className="trust-item">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Pago seguro con Stripe</span>
              </div>
              <div className="trust-divider" />
              <div className="trust-item">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
                <span>Regalo incluido +10€</span>
              </div>
              <div className="trust-divider" />
              <div className="trust-item">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{statsLoading ? '...' : totalDonors} personas ya donaron</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
