import { Hero } from '@/components/EditorialPage';
import HarvestSections from './harvest-sections';

export const metadata = {
  title: 'Planet Harvest — From Farms to Communities',
  description: 'Reimagining how food moves from farms to communities. Unlocking the value of every whole harvest.',
  openGraph: {
    title: 'Planet Harvest — From Farms to Communities',
    description: 'Reimagining how food moves from farms to communities. Unlocking the value of every whole harvest.',
    url: 'https://planetharvest.com/ph',
    siteName: 'Planet Harvest',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Planet Harvest — From Farms to Communities',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Planet Harvest — From Farms to Communities',
    description: 'Reimagining how food moves from farms to communities. Unlocking the value of every whole harvest.',
    images: ['/og-image.jpg'],
  },
};

export default function PhPage() {
  return <main id="main-content"><Hero title="Reimagining How Food Moves From Farms to Communities." film="fields" videoSrc="/video.mp4" /><HarvestSections /></main>;
}
