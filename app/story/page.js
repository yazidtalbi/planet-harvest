import styles from './story.module.css';
import { Hero, Intro, Button } from '@/components/EditorialPage';
import StoryTeamSection from './StoryTeamSection';

export const metadata = {
  title: 'Our Story — Planet Harvest',
  description: 'At Planet Harvest, we bring unmatched expertise to the complexities of the fresh produce supply chain. Meet our founders Melissa Melshenker Ackerman and Ivanka Trump.',
  openGraph: {
    title: 'Our Story — Planet Harvest',
    description: 'At Planet Harvest, we bring unmatched expertise to the complexities of the fresh produce supply chain.',
    url: 'https://planetharvest.com/story',
    siteName: 'Planet Harvest',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Our Story — Planet Harvest',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Story — Planet Harvest',
    description: 'At Planet Harvest, we bring unmatched expertise to the complexities of the fresh produce supply chain.',
    images: ['/og-image.jpg'],
  },
};

export default function StoryPage() {
  return (
    <main id="main-content" className={styles.page}>
      <Hero eyebrow="Rooted in purpose" title="Our Story." film="story" copy="A solution to maximize whole harvest sourcing, creating a market that turns waste into opportunity."><Button href="/contact">Grow with us</Button></Hero>

      {/* Mission Statement Section */}
      <Intro eyebrow="Our foundation" title="Rooted in experience.">
        <p>Our team is made up of seasoned leaders who have spent decades immersed in every facet of the food industry, from procurement and perishables, marketing to operations and strategic partnerships.</p>
        <p>Together, we’ve led national food relief efforts, fueled category growth for farmers and retailers, and built supply chain programs that stand up to the toughest conditions.</p>
        <p>This experience forms the foundation of how we operate today: as problem-solvers, connectors, and market makers for fresh produce across all grades, from premium to perfectly imperfect.</p>
      </Intro>

      {/* Founders with full-screen biographies */}
      <StoryTeamSection />

      {/* Reused Callout Section */}
      <section className={styles.callout} aria-labelledby="story-callout-title">
        <h2 id="story-callout-title">
          We source the whole harvest and connect all grades of produce from farmers to communities.
        </h2>
        <a className={styles.button} href="/sourcing">
          Learn more <span aria-hidden="true">→</span>
        </a>
      </section>

    </main>
  );
}
