'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './founders.module.css';

const founders = [
  {
    id: 'melissa', name: 'Melissa Melshenker Ackerman', role: 'CEO & Co-Founder', image: '/story/melissa-full.jpg',
    bio: [
      'Melissa Melshenker Ackerman is the former President of Produce Alliance, one of the country’s largest produce management, procurement, and consulting companies.',
      'During her time in this role, she spearheaded the company’s work as a contractor for the Farmers to Families Food Box Program, which delivered fresh food to hungry families across the nation—and helped farmers maintain their operations—during the pandemic.',
      'Her experience leading this important initiative inspired her to start Planet Harvest with a simple goal: to optimize the fresh produce supply chain and increase consumption of fresh produce.',
    ],
  },
  {
    id: 'ivanka', name: 'Ivanka Trump', role: 'Entrepreneur & Co-Founder', image: '/story/ivanka-full.avif',
    bio: [
      'Ivanka Trump is an entrepreneur and former senior White House advisor. She created and spearheaded the USDA’s Farmers to Families Food Box Program during the pandemic, which delivered more than 175 million boxes of fresh food to families in need while supporting struggling farmers across the country.',
      'That experience sparked a deep passion for supporting America’s small farmers and feeding families in need. Since leaving government, she has continued to champion emergency feeding efforts—from Maui to Fort Myers to North Carolina—and to promote private sector solutions that improve food access and support farmers.',
      'She co-founded Planet Harvest alongside Melissa to reimagine how the whole harvest, including surplus produce, moves from farm to table—building a smarter, more sustainable food system that reduces waste, supports farmers, and nourishes families.',
    ],
  },
];

const FruitSvg = () => (
  <svg className={styles.fruitIcon} width="44" height="48" viewBox="0 0 24 26" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 2.5c-.8-1-2.2-1.5-3.5-1-1.3.5-2.2 1.7-2.2 3.1 0 .4.1.8.3 1.2-2.1-.3-4.2.8-5.1 2.7-.9 2-.4 4.3 1.2 5.7L11 23.8c.3.4.8.6 1.3.6s1-.2 1.3-.6l8.3-9.6c1.6-1.4 2.1-3.7 1.2-5.7-.9-1.9-3-3-5.1-2.7.2-.4.3-.8.3-1.2 0-1.4-.9-2.6-2.2-3.1-1.3-.5-2.7 0-3.5 1zm-4 6.5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm8 0c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm-6 4c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm4 0c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm-2 4c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z" />
  </svg>
);

export default function StoryTeamSection() {
  const [selected, setSelected] = useState(null);
  const section = useRef(null);
  const dialog = useRef(null);
  const trigger = useRef(null);
  const closeButton = useRef(null);
  useEffect(() => {
    if (!selected) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current.showModal();
    dialog.current.scrollTop = 0;
    closeButton.current.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = previous;
      trigger.current?.focus({ preventScroll: true });
    };
  }, [selected]);
  useEffect(() => {
    const root = section.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / distance));
      root.style.setProperty('--founder-progress', progress.toFixed(4));
      root.style.setProperty('--founder-fuse', Math.max(0, Math.min(1, (progress - .34) / .28)).toFixed(4));
      root.style.setProperty('--leadership-reveal', Math.max(0, Math.min(1, (progress - .62) / .25)).toFixed(4));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    if (!reducedMotion.matches) {
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule);
      schedule();
    }
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
  const close = () => dialog.current.close();
  const card = (founder) => <button key={founder.id} type="button" className={styles.portraitCard} aria-label={`Read ${founder.name}’s biography`} aria-haspopup="dialog" aria-controls="founder-profile" onClick={event => { trigger.current = event.currentTarget; setSelected(founder); }}>
    <img src={founder.image} alt="" className={styles.portrait} loading="lazy" />
    <span className={styles.cardShade} />
    <span className={styles.openIcon} aria-hidden="true">→</span>
    <span className={styles.founderName}>{founder.name}</span>
    <div className={styles.cardBottom}>
      <span className={styles.founderRole}>{founder.role}</span>
    </div>
    <span className={styles.readBio}>Read her story</span>
  </button>;
  return <section ref={section} id="founders" className={styles.section} aria-labelledby="founders-heading">
    <div className={styles.stickyStage}>
      <div className={styles.founderGrid}>
      <div className={styles.leftFounder}>{card(founders[0])}</div>
      <div className={styles.statement}>
        <div className={styles.statementCopy}>
          <FruitSvg />
          <h2 id="founders-heading">At Planet Harvest, we bring unmatched expertise to the complexities of the fresh produce supply chain.</h2>
        </div>
      </div>
      <div className={styles.rightFounder}>{card(founders[1])}</div>
      </div>
      <figure className={styles.leadershipReveal}>
        <img src="/story/full.webp" alt="Planet Harvest leadership in a strawberry field" />
        <figcaption className={styles.leadershipCaption}>
          <strong>Leadership</strong>
        </figcaption>
      </figure>
    </div>
    <dialog ref={dialog} id="founder-profile" className={styles.dialog} aria-labelledby="founder-profile-name" data-lenis-prevent onClose={() => setSelected(null)} onKeyDown={event => { if (event.key === 'Tab') { event.preventDefault(); closeButton.current?.focus(); } }}>
      {selected && <>
        <button ref={closeButton} type="button" className={styles.close} onClick={close} aria-label="Close founder profile"><span aria-hidden="true">×</span></button>
        <div className={styles.profileLayout}>
          <div className={styles.profileImage}><img src={selected.image} alt={`Portrait of ${selected.name}`} /></div>
          <div className={styles.profileCopy}>
            <span className={styles.eyebrow}>The people behind Planet Harvest</span>
            <h2 id="founder-profile-name">{selected.name}</h2>
            <FruitSvg />
            <p className={styles.profileRole}>{selected.role}</p>
            <div className={styles.biography}>{selected.bio.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
          </div>
        </div>
      </>}
    </dialog>
  </section>;
}
