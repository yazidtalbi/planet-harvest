'use client';

import { useEffect, useRef } from 'react';
import styles from './story.module.css';

export default function StoryTeamSection() {
  const sectionRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches) return;

    let frameId;
    const update = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        if (rect.bottom >= -300 && rect.top <= viewHeight + 300) {
          const total = viewHeight + rect.height;
          const progress = Math.max(0, Math.min(1, (viewHeight - rect.top) / total));
          
          // Card 1 (Melissa) moves slower; Card 2 (Ivanka) moves faster to overlap over Card 1 on scroll
          const shift1 = (progress - 0.5) * -70;
          const shift2 = (progress - 0.5) * 120;

          if (card1Ref.current) {
            card1Ref.current.style.setProperty('--card-shift', `${shift1.toFixed(2)}px`);
          }
          if (card2Ref.current) {
            card2Ref.current.style.setProperty('--card-shift', `${shift2.toFixed(2)}px`);
          }
        }
      }
      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section ref={sectionRef} className={styles.teamSection}>
      <div className={styles.teamStackingContainer}>
        {/* Card 1: Melissa Melshenker Ackerman */}
        <article
          ref={card1Ref}
          className={`${styles.teamCard} ${styles.melissaCard}`}
        >
          <div className={styles.avatarWrapper}>
            <img
              src="/story/melissa.png"
              alt="Melissa Melshenker Ackerman"
              className={styles.avatarImage}
            />
          </div>
          <h3 className={styles.cardName}>Melissa Melshenker Ackerman</h3>
          <p className={styles.cardRole}>CEO &amp; Co-Founder of Planet Harvest</p>
          <p className={styles.cardBio}>
            Former President of Produce Alliance, one of the country’s largest produce management, procurement, and consulting companies. During her time in this role, she spearheaded the company’s work as a contractor for the Farmers to Families Food Box Program, which delivered fresh food to hungry families across the nation—and helped farmers maintain their operations—during the pandemic. Her experience leading this important initiative inspired her to start Planet Harvest with a simple goal: to optimize the fresh produce supply chain and increase consumption of fresh produce.
          </p>
        </article>

        {/* Floating Green Strawberry Sticker from public/story/green-strawberry.png */}
        <img
          src="/story/green-strawberry.png"
          alt="Green Strawberry Sticker"
          className={styles.floatingStrawberrySticker}
        />

        {/* Card 2: Ivanka Trump (Overlaps Card 1 on scroll) */}
        <article
          ref={card2Ref}
          className={`${styles.teamCard} ${styles.ivankaCard}`}
        >
          <div className={styles.avatarWrapper}>
            <img
              src="/story/ivanka.png"
              alt="Ivanka Trump"
              className={styles.avatarImage}
            />
          </div>
          <h3 className={styles.cardName}>Ivanka Trump</h3>
          <p className={styles.cardRole}>Entrepreneur &amp; Co-Founder of Planet Harvest</p>
          <p className={styles.cardBio}>
            She is an entrepreneur &amp; former senior White House advisor. She created and spearheaded the USDA’s Farmers to Families Food Box Program during the pandemic, which delivered more than 175 million boxes of fresh food to families in need while supporting struggling farmers across the country. That experience sparked a deep passion for supporting America’s small farmers and feeding families in need.
          </p>
        </article>
      </div>
    </section>
  );
}
