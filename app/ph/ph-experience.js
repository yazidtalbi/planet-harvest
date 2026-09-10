'use client';

import { useEffect, useRef } from 'react';
import styles from './ph.module.css';

const FRAME_COUNT = 120;
const frameUrl = (index) => `/ph/frames-alpha/straw-${String(index + 1).padStart(3, '0')}.png`;

export default function PhExperience() {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const heroBgRef = useRef(null);
  const circleRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const frames = new Map();
    const requested = new Set();
    let disposed = false;
    let active = 0;
    let target = 0;
    let drawn = -1;
    let raf = 0;

    // Preload frame 0 immediately so hero strawberry displays without delay
    const firstImg = new Image();
    firstImg.onload = () => {
      if (disposed) return;
      frames.set(0, firstImg);
      schedule();
    };
    requested.add(0);
    firstImg.src = frameUrl(0);

    function paint() {
      raf = 0;
      if (disposed) return;

      const scrollY = window.scrollY;
      const animDistance = Math.max(1, window.innerHeight * 0.36);
      const progress = Math.max(0, Math.min(1, scrollY / animDistance));

      // Rich parallax effect on hero background video
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `translate3d(0, ${-scrollY * 0.38}px, 0)`;
      }

      // Growing white circle behind strawberry on scroll
      if (circleRef.current) {
        const circleScale = progress * 7;
        const circleOpacity = Math.min(1, progress * 3.5);
        circleRef.current.style.transform = `translate(-50%, -50%) scale(${circleScale})`;
        circleRef.current.style.opacity = `${circleOpacity}`;
      }

      // Toggle header dark green color (#083D31) once circle begins growing
      if (headerRef.current) {
        if (progress > 0.04 || scrollY > 20) {
          headerRef.current.classList.add(styles.headerScrolled);
        } else {
          headerRef.current.classList.remove(styles.headerScrolled);
        }
      }

      target = motion.matches ? 0 : Math.round(progress * (FRAME_COUNT - 1));
      root.style.setProperty('--ph-progress', progress);

      // Reveal strawberry on initial scroll, then shrink and move down near "Unlocking the Value" section
      const revealDistance = Math.max(1, window.innerHeight * 0.12);
      const revealProgress = Math.max(0, Math.min(1, scrollY / revealDistance));
      const revealEased = motion.matches ? (revealProgress > 0 ? 1 : 0) : revealProgress * revealProgress * (3 - 2 * revealProgress);

      const shrink = Math.max(0, Math.min(1, (progress - 0.15) / 0.85));
      const eased = motion.matches ? (shrink === 1 ? 1 : 0) : shrink * shrink * (3 - 2 * shrink);
      const renderedHeight = Math.min(canvas.clientHeight, canvas.clientWidth * 810 / 1440);
      const finalScale = Math.min(1, 120 / (renderedHeight * 0.84));

      const revealScale = 0.75 + 0.25 * revealEased;
      const revealTranslateY = (1 - revealEased) * 40;
      const shrinkTranslateY = eased * Math.min(330, window.innerHeight * 0.35);

      const totalScale = revealScale * (1 + (finalScale - 1) * eased);
      const totalTranslateY = revealTranslateY + shrinkTranslateY;

      canvas.style.transform = `translate3d(0, ${totalTranslateY}px, 0) scale(${totalScale})`;
      canvas.style.opacity = `${revealEased}`;
      root.style.setProperty('--scene-opacity', (1 - eased) * revealEased);

      let nearest = -1;
      for (const index of frames.keys()) {
        if (nearest === -1 || Math.abs(index - target) < Math.abs(nearest - target)) nearest = index;
      }
      if (nearest !== -1 && nearest !== drawn) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(frames.get(nearest), 0, 0, canvas.width, canvas.height);
        drawn = nearest;
      }
      loadNext();
    }

    function schedule() {
      if (!raf && !disposed) raf = requestAnimationFrame(paint);
    }

    function loadNext() {
      while (!disposed && active < 4 && requested.size < (motion.matches ? 1 : FRAME_COUNT)) {
        let next = -1;
        for (let index = 0; index < FRAME_COUNT; index++) {
          if (!requested.has(index) && (next === -1 || Math.abs(index - target) < Math.abs(next - target))) next = index;
        }
        if (next === -1) break;
        requested.add(next);
        active++;
        const img = new Image();
        img.onload = () => {
          active--;
          if (disposed) return;
          frames.set(next, img);
          schedule();
          loadNext();
        };
        img.onerror = () => { active--; if (!disposed) loadNext(); };
        img.src = frameUrl(next);
      }
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    motion.addEventListener('change', schedule);
    schedule();
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      motion.removeEventListener('change', schedule);
      frames.clear();
    };
  }, []);

  return (
    <div className={styles.page} ref={rootRef}>
      {/* Floating navbar outside stage so overflow: hidden on stage never clips it */}
      <header ref={headerRef} className={styles.header}>
        <nav className={styles.navLeft}>
          <a href="#our-story">About Us</a>
          <a href="#whole-harvest">Sourcing</a>
          <a href="#three-pillars">Products</a>
        </nav>

        <a className={styles.navLogo} href="/" aria-label="Planet Harvest home">
          <img src="/logo/logo2.svg" alt="Planet Harvest" className={styles.navLogoImg} />
        </a>

        <nav className={styles.navRight}>
          <a href="#food-boxes">Food Boxes</a>
          <a href="#our-impact">Impact</a>
          <a href="#our-story" className={styles.navCta}>
            <span>Learn More</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </nav>
      </header>

      <div className={styles.stage}>
        {/* video.mp4 full viewport background with parallax */}
        <div className={styles.heroBgWrapper}>
          <video
            ref={heroBgRef}
            src="/video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={styles.heroBgImage}
          />
          <div className={styles.heroBgOverlay} />
        </div>

        {/* Growing white circle behind the strawberry */}
        <div ref={circleRef} className={styles.growingCircle} />

        {/* Rotating strawberry backdrop canvas */}
        <div className={styles.backdrop}>
          <canvas ref={canvasRef} width="1440" height="810" className={styles.canvas} role="img" aria-label="A strawberry slowly transforms as you scroll." />
        </div>

        {/* Headline text above the strawberry in color #FEFFFF */}
        <h1 className={styles.openingStatement}>Reimagining How food comes<br />from farm to communities</h1>

        {/* Scroll to explore indicator in sans-serif font at bottom of hero */}
        <div className={styles.scrollToExplore}>Scroll to explore</div>
      </div>
    </div>
  );
}


