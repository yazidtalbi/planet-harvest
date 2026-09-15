import { Hero, Intro, Split, Callout, Button, styles } from '@/components/EditorialPage';
import PartnerShowcase from '@/components/PartnerShowcase';
import MadeFromHarvestCard from '@/components/MadeFromHarvestCard';

export const metadata = { title: 'Sustainable Sourcing — Planet Harvest', description: 'Connecting growers and buyers to unlock the value of every edible part of the whole harvest.' };
export default function SourcingPage() {
  return <main id="main-content" className={styles.page}>
    <Hero eyebrow="What we do / Sustainable sourcing" title="The Whole Harvest." film="sourcing" copy="We champion a whole harvest philosophy: connecting farmers with purchasers for every portion of their edible produce, regardless of grade or appearance." image="/sourcing-hero.jpg" alt="Growers working in the field"><Button href="/contact?interest=grower">I’m a grower</Button></Hero>
    <Intro eyebrow="The whole harvest philosophy" title="Good food deserves a place at the table."><p>Every fruit and vegetable should be able to fulfill its ultimate purpose: providing life-enriching nourishment to a person who needs it.</p><p>We provide a seamless connection point for our community of verified produce growers, wholesalers, producers, and buyers, enabling stakeholders throughout the supply chain to conduct business more efficiently.</p></Intro>
    <Split eyebrow="From premium to perfectly imperfect" title="Turning waste into opportunity." image="/sourcing-split.jpg" alt="Fresh produce being harvested on a farm"><p>Our solution is to work directly with growers to analyze the entire harvest, from #1 grade to excess crops, creating a market that turns waste into opportunity.</p><p>We deliver end-to-end solutions that are designed for scale, rooted in transparency, and aligned with both farmer realities and buyer needs.</p><Button light href="/contact?interest=food-company">I’m a food company</Button></Split>
    
    <MadeFromHarvestCard />

    <PartnerShowcase />

    <Callout title="There’s more value in the whole harvest." href="/contact?interest=grower" button="Let’s grow together" />
  </main>;
}
