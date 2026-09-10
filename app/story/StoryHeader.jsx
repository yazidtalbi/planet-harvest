'use client';

import { useEffect, useRef } from 'react';
import styles from './story.module.css';

export default function StoryHeader() {
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 20) {
          headerRef.current.classList.add(styles.headerScrolled);
        } else {
          headerRef.current.classList.remove(styles.headerScrolled);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header ref={headerRef} className={styles.header}>
      <nav className={styles.navLeft}>
        <a href="/story">About Us</a>
        <a href="/ph#whole-harvest">Sourcing</a>
        <a href="/ph#three-pillars">Products</a>
      </nav>

      <a className={styles.navLogo} href="/" aria-label="Planet Harvest home">
        <img src="/logo/logo2.svg" alt="Planet Harvest" className={styles.navLogoImg} />
      </a>

      <nav className={styles.navRight}>
        <a href="/ph#food-boxes">Food Boxes</a>
        <a href="/ph#our-impact">Impact</a>
        <a href="/ph#our-story" className={styles.navCta}>
          <span>Learn More</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </nav>
    </header>
  );
}
