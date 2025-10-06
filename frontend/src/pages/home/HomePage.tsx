import { InitialScreen } from '../../components/layout/home/InitialScreen';
import { FeaturesSection } from '../../components/layout/home/FeaturesSection';
import { HowWorks } from '../../components/layout/home/HowWorks';
import { StatsSection } from '../../components/layout/home/StatsSection';
import { ToStart } from '../../components/layout/home/ToStart';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <InitialScreen />

      <FeaturesSection />
      
      <HowWorks />

      <StatsSection />
     
      <ToStart />
    </div>
  );
};