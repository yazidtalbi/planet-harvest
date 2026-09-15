import { Hero, Callout, Button, styles } from '@/components/EditorialPage';
import MediaSlider from '@/components/MediaSlider';

export const metadata = { title: 'In the News — Planet Harvest', description: 'Stories about the people, partnerships and ideas helping build a better food system.' };

export default function MediaPage() {
  return (
    <main id="main-content" className={styles.page}>
      <Hero
        eyebrow="News & media"
        title="Stories That Grow."
        film="media"
        copy="Stories about the people, partnerships and ideas helping build a better food system."
        image="/media-hero.jpg"
        alt="Broadcast crew filming Planet Harvest work in organic farm field"
        tone="sage"
      >
        <Button href="#latest">Read the latest</Button>
      </Hero>

      <div id="latest">
        <MediaSlider />
      </div>

      <Callout title="Be part of the next chapter." button="Connect with our team" />
    </main>
  );
}
