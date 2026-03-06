import { useState, useEffect } from 'react';
import { api } from '../../data/mockData';
import DonationCard from '../common/DonationCard';
import Button from '../common/Button';
import Loading from '../common/Loading';
import './DonationFeed.css';

export default function DonationFeed() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getDonations(6).then(data => {
      setDonations(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <section className="donation-feed">
      <div className="container">
        <div className="donation-header">
          <h2>Comunidad</h2>
          <p>Gente que ya nos acompaña en esta aventura</p>
        </div>
        
        <div className="donation-grid">
          {donations.map(donation => (
            <DonationCard key={donation.id} donation={donation} />
          ))}
        </div>
      </div>
    </section>
  );
}
