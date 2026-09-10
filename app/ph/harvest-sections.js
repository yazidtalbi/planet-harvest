'use client';

import { useEffect, useRef } from 'react';
import styles from './harvest-sections.module.css';

const pillars = [
  { id: 'sustainable-sourcing', title: 'Sustainable Sourcing', imageSrc: '/6.png', imageAlt: 'Farmers in the field', copy: 'We work with food companies, food service, and retailers to incorporate sustainably sourced produce into new and existing products.', speed: 0.16 },
  { id: 'food-boxes', title: 'Food Boxes', imageSrc: '/7.png', imageAlt: 'Fresh food boxes', copy: 'We design and deliver curated food boxes in partnership with healthcare providers, corporate employers, insurers & nonprofit organizations.', speed: 0.34 },
  { id: 'product-integration', title: 'Product Integration', imageSrc: '/8.png', imageAlt: 'Harvesting fresh produce', copy: 'We work with food companies, food service, and retailers to incorporate sustainably sourced produce into new and existing products.', speed: 0.24 },
];

export default function HarvestSections() {
  const pillarsRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const update = () => {
      // Card shift animation
      if (pillarsRef.current) {
        const rect = pillarsRef.current.getBoundingClientRect();
        const mobile = window.innerWidth < 700;
        const travel = window.innerHeight * 0.65 - rect.top;
        cardsRef.current.forEach((card, index) => {
          if (!card) return;
          const limit = mobile ? 35 : 240;
          const shift = motion.matches ? 0 : Math.max(-limit, Math.min(limit, -travel * pillars[index].speed * (mobile ? 0.25 : 1)));
          card.style.setProperty('--card-shift', `${shift}px`);
        });
      }

      // Smooth Parallax on image containers using stable parent wrapper bounds
      if (!motion.matches) {
        const viewHeight = window.innerHeight;

        // 5.png Landscape Parallax (Pan down from top of photo to bottom of photo on scroll)
        const landscape = document.querySelector(`.${styles.landscape}`);
        if (landscape) {
          const wrapper = landscape.closest(`.${styles.landscapeWrapper}`) || landscape.parentElement;
          const rect = wrapper.getBoundingClientRect();
          if (rect.bottom >= -300 && rect.top <= viewHeight + 300) {
            const total = viewHeight + rect.height;
            const progress = Math.max(0, Math.min(1, (viewHeight - rect.top) / total));
            // +150px at entry shows sky/mountains at top of photo, panning down to -150px at exit showing bottom fields
            const parallaxY = (0.5 - progress) * 300;
            landscape.style.setProperty('--parallax-y', `${parallaxY.toFixed(2)}px`);
          }
        }

        // Row images & card images parallax
        const otherImages = document.querySelectorAll(`.${styles.rowImage}, .${styles.cardImage}`);
        otherImages.forEach((img) => {
          const wrapper = img.parentElement;
          if (!wrapper) return;
          const rect = wrapper.getBoundingClientRect();
          if (rect.bottom >= -150 && rect.top <= viewHeight + 150) {
            const total = viewHeight + rect.height;
            const progress = Math.max(0, Math.min(1, (viewHeight - rect.top) / total));
            const parallaxY = (0.5 - progress) * 140;
            img.style.setProperty('--parallax-y', `${parallaxY.toFixed(2)}px`);
          }
        });
      }
    };

    // IntersectionObserver for reveal-on-scroll animations
    const revealElements = document.querySelectorAll(`.${styles.revealOnScroll}, .${styles.revealScale}, .${styles.revealMaskTitle}`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.isRevealed);
          }
        });
      },
      { threshold: 0.10, rootMargin: '0px 0px -30px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));

    let frameId;
    const loop = () => {
      update();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.harvest}>
      <section className={styles.intro} id="our-story" aria-labelledby="harvest-title">
        {/* Classic Masked Line Reveal Title */}
        <h2 id="harvest-title" className={`${styles.sectionTitle} ${styles.revealMaskTitle}`}>
          <span className={styles.lineMask}>
            <span className={styles.lineInner}>Unlocking the Value of</span>
          </span>
          <span className={styles.lineMask}>
            <span className={`${styles.lineInner} ${styles.lineInnerDelay}`}>Every Whole Harvest</span>
          </span>
        </h2>

        <div className={styles.stackingRows}>
          {/* 2. Purpose Row Image (2.png) */}
          <div className={`${styles.splitRow} ${styles.purposeRow} ${styles.revealOnScroll}`}>
            <div className={styles.imageWrapper}>
              <img src="/2.png" alt="Tractor working a farm" className={styles.rowImage} />
            </div>
            <div className={`${styles.copyPanel} ${styles.darkPanel}`}>
              <div className={`${styles.appleStickerWrapper} ${styles.revealScale}`}>
                <img src="/sticker-apple.png" alt="Fresh Apple Sticker" className={styles.appleSticker} />
              </div>
              <h3>Planet Harvest is a purpose-driven company with a vision to maximize the amount of fresh produce that moves from farms to families.</h3>
              <p>We connect farmers with food companies, foodservice and retailers to unlock the value of the whole harvest, optimize the supply chain, &amp; reduce environmental waste.</p>
            </div>
          </div>

          {/* 3. Sourcing Row Image (3.png) */}
          <div className={`${styles.splitRow} ${styles.sourcingRow}`} id="whole-harvest">
            <div className={`${styles.copyPanel} ${styles.lightPanel}`}>
              <h3>Planet Harvest is setting the standard in whole harvest sourcing.</h3>
              <p>Our solution is to work directly with growers to analyze the entire harvest, from #1 grade to excess crops, creating a market that turns waste into opportunity. We deliver end-to-end solutions that are designed for scale, rooted in transparency, and aligned with both farmer realities and buyer needs.</p>
            </div>
            <div className={styles.imageWrapper}>
              <img src="/3.png" alt="Farmers picking strawberries" className={`${styles.rowImage} ${styles.harvestingImage}`} />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.vision} id="our-impact" aria-labelledby="vision-title">
        {/* 4. Separator Graphic (4-tractor-separator.png) - Slowed down reveal */}
        <div className={`${styles.fieldMark} ${styles.revealScale} ${styles.revealSlow}`} aria-hidden="true">
          <img src="/4-tractor-separator.png" alt="" className={styles.separatorImage} />
        </div>
        
        {/* Long term goal text - Slowed down reveal */}
        <h2 id="vision-title" className={`${styles.revealOnScroll} ${styles.revealSlow}`}>Our long term goal is to create<br className={styles.desktopBreak} /> a whole harvest marketplace that aligns farmers supply with real time demand across food &amp; retail sectors, while driving increased revenue back to the farm.</h2>
        
        {/* 5. Vision Landscape Image (5.png) */}
        <div className={`${styles.landscapeWrapper} ${styles.revealScale}`}>
          <img src="/5.png" alt="A panoramic view of farmland" className={styles.landscape} />
        </div>
      </section>

      <section className={styles.pillars} id="three-pillars" ref={pillarsRef} aria-labelledby="pillars-title">
        <h2 id="pillars-title" className={`${styles.pillarsTitle} ${styles.revealOnScroll}`}>Three Pillars</h2>
        <div className={styles.cards}>
          {/* 6, 7, 8. Pillar Cards Images (6.png, 7.png, 8.png) */}
          {pillars.map((pillar, index) => (
            <article id={pillar.id} key={pillar.id} ref={(node) => { cardsRef.current[index] = node; }} className={`${styles.card} ${styles[`card${index}`]} ${styles.revealOnScroll} ${styles[`revealDelay${index + 1}`]}`}>
              <div className={styles.cardImageWrapper}>
                <img src={pillar.imageSrc} alt={pillar.imageAlt} className={styles.cardImage} />
              </div>
              <h3>{pillar.title}</h3>
              <p>{pillar.copy}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 9. Callout Section Background (9.png) */}
      <section className={`${styles.callout} ${styles.revealScale}`} aria-labelledby="callout-title">
        <h2 id="callout-title">We source the whole harvest and connect all grades of produce from farmers to communities.</h2>
        <a className={styles.button} href="#whole-harvest">Learn more <span aria-hidden="true">↗</span></a>
      </section>

      <footer className={styles.siteFooter} id="connect">
        {/* Broccoli sticker on top right with high z-index */}
        <div className={`${styles.footerStickerTopRight} ${styles.revealScale}`}>
          <img src="/10-sticker-footer.png" alt="Broccoli Sticker" className={styles.footerSticker} />
        </div>

        {/* Centered navigation links */}
        <nav className={`${styles.footerNav} ${styles.revealOnScroll}`} aria-label="Planet Harvest footer">
          <div><span>Company</span><a href="#our-story">Our story</a><a href="#whole-harvest">Our approach</a></div>
          <div><span>What we do</span><a href="#sustainable-sourcing">Sustainable sourcing</a><a href="#product-integration">Product integration</a><a href="#food-boxes">Food boxes</a></div>
          <div><span>Impact</span><a href="#our-impact">Farm to community</a><a href="#our-impact">Our impact</a></div>
          <div><span>Connect</span><p>Let’s build a partnership</p><a className={styles.footerButton} href="#our-story">Learn more ↗</a></div>
        </nav>
        
        {/* Footer logo SVG (logo1.svg) replacing big text wordmark */}
        <a href="#" className={`${styles.footerLogoLink} ${styles.revealScale}`} aria-label="Planet Harvest, back to top">
          <img src="/logo/logo1.svg" alt="Planet Harvest" className={styles.footerLogoSvg} />
        </a>

        <div className={styles.footerBottom}><span>From farms to communities.</span><span>© {new Date().getFullYear()} Planet Harvest, LLC</span><a href="#">Back to top ↑</a></div>
      </footer>
    </div>
  );
}

