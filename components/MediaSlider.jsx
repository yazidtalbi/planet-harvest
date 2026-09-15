'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './media-slider.module.css';

const mediaStories = [
  {
    id: 1,
    date: 'JUNE 15, 2026',
    title: 'Fresh Communities Chicago Supports 1,500 Families',
    image: '/media-card-1.jpg',
    alt: 'Fresh Express, Chiquita and Planet Harvest event in Chicago',
    linkText: 'VIEW ORIGINAL COVERAGE',
    url: 'https://perishablenews.com/produce/fresh-express-chiquita-planet-harvest-and-world-vision-unite-to-support-1500-chicago-families/',
    bg: '#edf4fa',
    textColor: '#1a365d',
  },
  {
    id: 2,
    date: 'JUNE 20, 2026',
    title: 'We’re Throwing Away $218 Billion of Food Every Year',
    image: '/media-card-2.jpg',
    alt: 'Planet Harvest founders on the Him & Her Podcast',
    linkText: 'WATCH THE PODCAST',
    url: 'https://www.youtube.com/watch?v=fNMPIdkGsgs',
    bg: '#faebf5',
    textColor: '#4a2034',
  },
  {
    id: 3,
    date: 'MAY 01, 2026',
    title: 'Fresh Communities Tour Arrives in Salinas',
    image: '/media-card-3.jpg',
    alt: 'Volunteers distributing food boxes in Salinas',
    linkText: 'READ THE STORY',
    url: 'https://www.thecalifornian.com/story/news/local/2026/05/11/nationwide-fresh-communities-tour-feeds-hundreds-food-drive-salinas/89983867007/',
    bg: '#eef3e6',
    textColor: '#1e382b',
  },
  {
    id: 4,
    date: 'MAY 11, 2026',
    title: 'Fresh Communities Tour Brings Fresh Produce Nationwide',
    image: '/media-card-4.jpg',
    alt: 'Community food drive with fresh produce boxes',
    linkText: 'READ THE STORY',
    url: 'https://www.andnowuknow.com/behind-greens/fresh-express-chiquita-and-planet-harvest-bring-fresh-communities-tour/anuk-staff/104310',
    bg: '#f9f5e8',
    textColor: '#3d3216',
  },
  {
    id: 5,
    date: 'APRIL 28, 2026',
    title: 'United Way & Partners Kick Off Fresh Communities Tour',
    image: '/media-card-5.jpg',
    alt: 'United Way and Planet Harvest partnership event',
    linkText: 'READ THE STORY',
    url: 'https://wsvn.com/news/local/miami-dade/united-way-of-broward-teams-up-with-local-partners-to-kick-off-fresh-communities-tour/',
    bg: '#eeeef8',
    textColor: '#202048',
  },
];

export default function MediaSlider() {
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const total = mediaStories.length;

  const updateProgress = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    const maxScroll = scrollWidth - clientWidth;
    const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
    setScrollProgress(progress);

    const index = Math.min(
      total,
      Math.max(1, Math.round(progress * (total - 1)) + 1)
    );
    setCurrentIndex(index);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => track.removeEventListener('scroll', updateProgress);
  }, []);

  const scrollByAmount = (direction) => {
    if (!trackRef.current) return;
    const amount = trackRef.current.clientWidth * 0.75 * direction;
    trackRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeftState(trackRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    trackRef.current.scrollLeft = scrollLeftState - walk;
  };

  return (
    <section className={styles.section} aria-labelledby="media-slider-heading">
      <div className={styles.header}>
        <h2 id="media-slider-heading" className={styles.title}>
          Stories about the people, partnerships and ideas helping build a better food system.
        </h2>
        <p className={styles.description}>
          Explore the latest news and media coverage featuring Planet Harvest. From maximizing the value of the whole harvest and creating new markets for fresh produce to expanding fresh food access and driving meaningful community impact.
        </p>
      </div>

      <div
        ref={trackRef}
        className={`${styles.track} ${isDragging ? styles.dragging : ''}`}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
      >
        {mediaStories.map((story) => (
          <article
            key={story.id}
            className={styles.card}
            style={{ backgroundColor: story.bg, color: story.textColor }}
          >
            <div className={styles.cardTop}>
              <span className={styles.date}>{story.date}</span>
              <h3 className={styles.cardTitle}>{story.title}</h3>
            </div>

            <div className={styles.imageWrapper}>
              <img src={story.image} alt={story.alt} className={styles.image} draggable={false} />
            </div>

            <a
              href={story.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              style={{ color: story.textColor }}
            >
              <span>{story.linkText}</span>
              <span aria-hidden="true" className={styles.arrow}>→</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </article>
        ))}
      </div>

      {/* Progress Bar & Controls Footer */}
      <div className={styles.footerControls}>
        <span className={styles.counter}>{currentIndex} / {total}</span>

        <div className={styles.progressBarWrapper}>
          <div
            className={styles.progressBarFill}
            style={{
              width: `${Math.max(20, (1 / total) * 100)}%`,
              transform: `translateX(${scrollProgress * ((total - 1) * 100)}%)`,
            }}
          />
        </div>

        <div className={styles.arrowButtons}>
          <button
            type="button"
            onClick={() => scrollByAmount(-1)}
            aria-label="Previous slide"
            className={styles.arrowBtn}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount(1)}
            aria-label="Next slide"
            className={styles.arrowBtn}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
