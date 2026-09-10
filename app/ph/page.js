import PhExperience from './ph-experience';
import HarvestSections from './harvest-sections';

export const metadata = {
  title: 'Planet Harvest — From Farms to Communities',
  description: 'Reimagining how food moves from farms to communities. Unlocking the value of every whole harvest.',
};

export default function PhPage() {
  return <main><PhExperience /><HarvestSections /></main>;
}
