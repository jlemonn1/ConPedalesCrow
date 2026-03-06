import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../data/mockData';
import StageCard from '../common/StageCard';
import Loading from '../common/Loading';
import './LatestStages.css';

export default function LatestStages() {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.getStages(3).then(data => {
      setStages(data);
      setLoading(false);
    });
  }, []);

  const handleReadMore = (stage) => {
    navigate(`/diario?id=${stage.id}`);
  };

  if (loading) return <Loading />;

  return (
    <section className="latest-stages">
      <div className="container">
        <div className="latest-header">
          <div>
            <h2>Últimas etapas</h2>
            <p>Síguenos día a día en esta aventura</p>
          </div>
        </div>
        
        <div className="latest-grid">
          {stages.map(stage => (
            <StageCard 
              key={stage.id} 
              stage={stage} 
              onReadMore={handleReadMore}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
