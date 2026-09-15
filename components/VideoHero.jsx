'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './video-hero.module.css';

export default function VideoHero({ eyebrow, title, copy, film = 'fields', videoSrc, children }) {
  const video = useRef(null);
  const root = useRef(null);
  const [playing, setPlaying] = useState(false);
  const manuallyPaused = useRef(false);
  useEffect(() => {
    const media = video.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = true;
    const sync = () => {
      if (motion.matches || manuallyPaused.current || document.hidden || !visible) media.pause();
      else media.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.05 });
    observer.observe(root.current);
    motion.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => { observer.disconnect(); motion.removeEventListener('change', sync); document.removeEventListener('visibilitychange', sync); media.pause(); };
  }, [film, videoSrc]);
  const toggle = () => {
    if (video.current.paused) { manuallyPaused.current = false; video.current.play().catch(() => {}); }
    else { manuallyPaused.current = true; video.current.pause(); }
  };
  return <section ref={root} className={styles.hero} data-video-hero data-film={film} style={{ backgroundImage: `url('/videos/${film}.jpg')` }}>
    <video ref={video} className={styles.video} src={videoSrc || `/videos/${film}.mp4`} poster={`/videos/${film}.jpg`} muted loop playsInline preload="metadata" aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
    <div className={styles.shade} />
    <div className={styles.heading}>{eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}<h1 className={styles.title}>{title}</h1></div>
    {(copy || children) && <div className={styles.bottom}>{copy && <p className={styles.copy}>{copy}</p>}{children && <div className={styles.actions}>{children}<button type="button" className={styles.playback} onClick={toggle} aria-label={playing ? 'Pause background video' : 'Play background video'}><span aria-hidden="true">{playing ? 'Ⅱ' : '▷'}</span></button></div>}</div>}
    <span className={styles.scroll} aria-hidden="true">Scroll to discover <span>↓</span></span>
  </section>;
}
