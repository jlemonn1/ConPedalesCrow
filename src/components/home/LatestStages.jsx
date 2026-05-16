import { useLatestStages } from '../../hooks/useStages';
import { adaptStagesForCards } from '../../services/adapters';
import Loading from '../common/Loading';
import LatestStagesCarousel from './LatestStagesCarousel';
import './LatestStages.css';

export default function LatestStages() {
  const { stages, loading } = useLatestStages(6);
  const adaptedStages = adaptStagesForCards(stages || []);

  if (loading) return <Loading />;
  if (adaptedStages.length === 0) return null;

  return <LatestStagesCarousel stages={adaptedStages} />;
}
