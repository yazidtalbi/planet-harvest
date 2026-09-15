'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import tractorBehind from '@/trax/behind.png';
import tractorMain from '@/trax/main.png';
import tractorWheelOne from '@/trax/wheel1.png';
import tractorWheelTwo from '@/trax/wheel2.png';
import styles from './site-shell.module.css';

export const pages = [
  ['/', 'Home'], ['/story', 'Our story'], ['/sourcing', 'Sustainable sourcing'],
  ['/products', 'Product integration'], ['/food-boxes', 'Food boxes'],
  ['/impact', 'Our impact'], ['/media', 'In the news'], ['/contact', 'Let’s connect'],
];

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const dialog = useRef(null);
  const trigger = useRef(null);
  const transitionTimers = useRef([]);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState(null);
  const [fadeOut, setFadeOut] = useState(false);

  const hasVideoHero = pages.some(([href]) => href === pathname) || pathname === '/ph';

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [pathname]);

  useEffect(() => {
    if (!open && !transitioning) {
      dialog.current?.close();
    }
  }, [open, transitioning]);

  useEffect(() => () => {
    transitionTimers.current.forEach(window.clearTimeout);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  const handleNavClick = (e, href, label) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    if (href === pathname) {
      e.preventDefault();
      close();
      return;
    }

    e.preventDefault();
    if (transitioning) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      dialog.current?.close();
      setOpen(false);
      router.push(href);
      return;
    }

    setTransitionTarget(label);
    setTransitioning(true);
    setFadeOut(false);

    // Load the destination while the expanding menu completely covers the page.
    transitionTimers.current.push(window.setTimeout(() => {
      router.push(href);
    }, 2320));

    // Once the tractor reaches the far edge, reveal the new page underneath.
    transitionTimers.current.push(window.setTimeout(() => {
      setFadeOut(true);
    }, 2980));

    transitionTimers.current.push(window.setTimeout(() => {
      setTransitioning(false);
      setFadeOut(false);
      setTransitionTarget(null);
      dialog.current?.close();
      setOpen(false);
      transitionTimers.current = [];
    }, 3680));
  };

  const containFocus = (event) => {
    if (event.key !== 'Tab') return;
    const controls = dialog.current.querySelectorAll('a[href], button:not([disabled])');
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  };

  const close = () => { dialog.current.close(); setOpen(false); trigger.current?.focus(); };

  return <>
    <a className={styles.skip} href="#main-content">Skip to content</a>
    <header className={`${styles.header} ${hasVideoHero && !scrolled ? styles.transparent : ''} ${scrolled ? styles.compact : ''}`}>
      <button ref={trigger} className={styles.menuButton} aria-label="Open navigation menu" aria-expanded={open} aria-controls="site-menu" onClick={() => { dialog.current.showModal(); setOpen(true); }}>
        <span className={styles.hamburger} aria-hidden="true"><span /><span /><span /></span><span className={styles.menuLabel}>Menu</span>
      </button>
      <Link href="/" className={styles.logo} aria-label="Planet Harvest home"><img src="/logo/logo2.svg" alt="Planet Harvest" /></Link>
      <Link href="/contact" className={styles.cta}>Let’s connect <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="4" y1="12" x2="20" y2="12" /><polyline points="13 5 20 12 13 19" /></svg></Link>
    </header>

    <dialog ref={dialog} id="site-menu" className={`${styles.drawer} ${transitioning ? styles.drawerFullWidth : ''} ${fadeOut ? styles.drawerFadeOut : ''}`} aria-label="Site navigation" data-lenis-prevent onKeyDown={containFocus} onClose={() => setOpen(false)} onClick={e => { if (!transitioning && e.target === dialog.current && e.clientX > dialog.current.getBoundingClientRect().right) close(); }}>
      <div className={styles.drawerContent}>
        <div className={styles.drawerTop}><button autoFocus onClick={close} aria-label="Close navigation menu" disabled={transitioning}>Close <span aria-hidden="true">×</span></button></div>
        <nav aria-label="Main navigation">
          {pages.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? 'page' : undefined}
              data-tractor-transition
              data-transition-target={transitionTarget === label || undefined}
              onClick={(e) => handleNavClick(e, href, label)}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <div className={`${styles.tractorPuller} ${transitioning ? styles.tractorPullerActive : ''}`} aria-hidden="true">
        <svg className={styles.tractorChain} viewBox="0 0 100 30" preserveAspectRatio="none">
          <path d="M 1 2 Q 50 28 99 2" />
        </svg>
        <div className={styles.tractorAssembly}>
          <img className={styles.tractorBehind} src={tractorBehind.src} alt="" />
          <img className={styles.tractorWheelOne} src={tractorWheelOne.src} alt="" />
          <img className={styles.tractorWheelTwo} src={tractorWheelTwo.src} alt="" />
          <img className={styles.tractorMain} src={tractorMain.src} alt="" />
        </div>
      </div>
      <span className="sr-only" aria-live="polite">{transitioning ? `Navigating to ${transitionTarget}` : ''}</span>
    </dialog>
  </>;
}
