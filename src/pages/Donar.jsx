import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../data/mockData';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import './Donar.css';

const amounts = [5, 10, 20, 50, 100];

export default function Donar() {
  const navigate = useNavigate();
  const [step, setStep] = useState('form');
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    comment: '',
    contact: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const finalAmount = selectedAmount || (customAmount ? parseInt(customAmount) : 0);
  const kmFinanced = Math.floor(finalAmount / 0.80);

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!finalAmount || finalAmount < 1) return;
    if (!formData.name.trim()) return;

    setSubmitting(true);
    
    try {
      await api.createDonation({
        name: formData.name,
        amount: finalAmount,
        comment: formData.comment
      });
      setStep('thankyou');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (step === 'thankyou') {
    return (
      <>
        <Navbar />
        <div className="donar-page">
          <div className="thank-you">
            <div className="thank-you-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2>¡Gracias por tu donación!</h2>
            <p>Tu apoyo nos acerca un poco más a Grecia. Cada pedalada cuenta.</p>
            <Button href="/" variant="primary">Volver al inicio</Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="donar-page">
        <div className="donar-hero">
          <div className="container">
            <h1>Donar</h1>
            <p>Ayúdanos a llegar al Egeo. Cada euro cuenta.</p>
          </div>
        </div>
        
        <div className="donar-content">
          <div className="donar-explanation">
            <h3>¿Por qué donate?</h3>
            <p>
              Si quieres ayudarnos a llegar a Grecia puedes aportar cualquier cantidad.
              <span className="highlight"> Cada euro cuenta.</span>
              <br /><br />
              Las donaciones superiores a 10€ recibirán un pequeño regalo del viaje.
            </p>
          </div>
          
          <form className="donar-form" onSubmit={handleSubmit}>
            <div className="donar-section">
              <h3>Selecciona un importe</h3>
              <div className="amount-buttons">
                {amounts.map(amount => (
                  <button
                    key={amount}
                    type="button"
                    className={`amount-btn ${selectedAmount === amount ? 'selected' : ''}`}
                    onClick={() => handleAmountSelect(amount)}
                  >
                    {amount}€
                  </button>
                ))}
              </div>
              <div className="custom-amount">
                <span>Otro:</span>
                <input
                  type="number"
                  placeholder="Importe personalizado"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  min="1"
                />
              </div>
              {finalAmount > 0 && (
                <div className="km-indicator">
                  <p>Esto financia aproximadamente: <strong>{kmFinanced} km</strong></p>
                </div>
              )}
            </div>
            
            <div className="donar-section">
              <h3>Tus datos</h3>
              <input
                type="text"
                name="name"
                className="donar-input"
                placeholder="Tu nombre *"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="comment"
                className="donar-textarea"
                placeholder="Mensaje opcional (opublicaremos con tu donación)"
                value={formData.comment}
                onChange={handleInputChange}
              />
              {finalAmount >= 10 && (
                <div className="contact-section">
                  <p>Si tu donación supera los 10€, déjanos un contacto para enviarte un regalo del viaje.</p>
                  <input
                    type="text"
                    name="contact"
                    className="donar-input"
                    placeholder="Email o teléfono"
                    value={formData.contact}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>
            
            <Button 
              type="submit" 
              size="large" 
              className="donar-submit"
              disabled={!finalAmount || !formData.name.trim() || submitting}
            >
              {submitting ? 'Procesando...' : 'Continuar al pago'}
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
