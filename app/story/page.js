import styles from './story.module.css';
import StoryTeamSection from './StoryTeamSection';
import StoryHeader from './StoryHeader';

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
    <div className={styles.page}>
      {/* Floating Navbar with Scroll Shrink Animation */}
      <StoryHeader />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroCard}>
          <h1 className={styles.heroTitle}>
            <span>Our</span>
            {/* Apple sticker SVG from public/story/apple.svg */}
            <img src="/story/apple.svg" alt="Apple icon" className={styles.inlineAppleSticker} />
            <span>Story</span>
          </h1>

          <div className={styles.heroContent}>
            {/* Broccoli sticker from public/story/broccoli.png */}
            <img src="/story/broccoli.png" alt="Broccoli sticker" className={styles.leftBroccoliSticker} />

            <div className={styles.centerHeroWrapper}>
              {/* Hero image from public/story/hero.png */}
              <img
                src="/story/hero.png"
                alt="Planet Harvest crate filled with fresh produce in farm field"
                className={styles.heroImage}
              />
            </div>

            <p className={styles.heroSideText}>
              A solution to maximize whole harvest sourcing, creating a market that turns waste into opportunity.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className={styles.missionSection}>
        <h2 className={styles.missionTitle}>
          At Planet Harvest, we bring unmatched expertise to the complexities of the fresh produce supply chain.
        </h2>
        <p className={styles.missionText}>
          Our team is made up of seasoned leaders with deep domain expertise immersed in every facet of the food industry, from sales, sourcing and logistics, marketing to capital structure and strategic partnerships.
        </p>
      </section>

      {/* Team Cards Section with Scroll Overlapping Parallax & No Shadows */}
      <StoryTeamSection />

      {/* Leadership Photo Section */}
      <section className={styles.leadershipSection}>
        <h2 className={styles.leadershipTitle}>Leadership</h2>
        <div className={styles.appleMaskWrapper}>
          {/* Leadership photo from public/story/leadership.png */}
          <img
            src="/story/leadership.png"
            alt="Planet Harvest leadership in strawberry field"
            className={styles.appleMaskImage}
          />
        </div>
      </section>

      {/* Reused Callout Section */}
      <section className={styles.callout} aria-labelledby="story-callout-title">
        <h2 id="story-callout-title">
          We source the whole harvest and connect all grades of produce from farmers to communities.
        </h2>
        <a className={styles.button} href="/ph#whole-harvest">
          Learn more <span aria-hidden="true">↗</span>
        </a>
      </section>

      {/* Reused Site Footer */}
      <footer className={styles.siteFooter} id="connect">
        <div className={styles.footerStickerTopRight}>
          <img src="/story/broccoli.png" alt="Broccoli Sticker" className={styles.footerSticker} />
        </div>

        <nav className={styles.footerNav} aria-label="Planet Harvest footer">
          <div>
            <span>Company</span>
            <a href="/story">Our story</a>
            <a href="/ph#whole-harvest">Our approach</a>
          </div>
          <div>
            <span>What we do</span>
            <a href="/ph#sustainable-sourcing">Sustainable sourcing</a>
            <a href="/ph#product-integration">Product integration</a>
            <a href="/ph#food-boxes">Food boxes</a>
          </div>
          <div>
            <span>Impact</span>
            <a href="/ph#our-impact">Farm to community</a>
            <a href="/ph#our-impact">Our impact</a>
          </div>
          <div>
            <span>Connect</span>
            <p>Let’s build a partnership</p>
            <a className={styles.footerButton} href="/story">Learn more ↗</a>
          </div>
        </nav>

        <a href="/" className={styles.footerLogoLink} aria-label="Planet Harvest home">
          <img src="/logo/logo1.svg" alt="Planet Harvest" className={styles.footerLogoSvg} />
        </a>

        <div className={styles.footerBottom}>
          <span>From farms to communities.</span>
          <span>© {new Date().getFullYear()} Planet Harvest, LLC</span>
          <a href="#">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}
