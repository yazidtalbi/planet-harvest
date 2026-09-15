'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './partner-showcase.module.css';

const tabs = [
  {
    id: 'growers',
    label: 'Growers',
    headline: 'Create more value from every harvest.',
    copy: 'Connect more grades of produce with dependable markets and meaningful destinations.',
    buttonText: 'Partner as a Grower',
    href: '/contact?interest=grower',
    image: '/partner-grower.jpg',
    alt: 'Farmer in a field harvesting fresh produce',
    bg: '#edf0df',
    textColor: '#07503f',
    buttonBg: '#07503f',
  },
  {
    id: 'food-companies',
    label: 'Food Companies',
    headline: 'Incorporate sustainably sourced produce.',
    copy: 'Transform surplus and whole harvest produce grades into high-quality ingredients and finished goods.',
    buttonText: 'Partner as a Food Company',
    href: '/contact?interest=food-company',
    image: '/partner-food-company.jpg',
    alt: 'Freshly harvested produce ready for product integration',
    bg: '#e8eef7',
    textColor: '#1a365d',
    buttonBg: '#1a365d',
  },
  {
    id: 'healthcare',
    label: 'Healthcare Organizations',
    headline: 'Drive health outcomes with fresh produce.',
    copy: 'Power produce prescription and food-as-medicine programs tailored to patient care and community wellness.',
    buttonText: 'Partner as a Healthcare Provider',
    href: '/contact?interest=healthcare',
    image: '/partner-healthcare.jpg',
    alt: 'Curated fresh food boxes for health and nutrition programs',
    bg: '#f7e9ef',
    textColor: '#4a2034',
    buttonBg: '#4a2034',
  },
  {
    id: 'community',
    label: 'Community Partners',
    headline: 'Nourish families in need at scale.',
    copy: 'Direct fresh, nutritious produce to emergency feeding efforts and local community programs.',
    buttonText: 'Partner as a Community Leader',
    href: '/contact?interest=community',
    image: '/partner-community.jpg',
    alt: 'Fresh food distribution supporting community families',
    bg: '#eef4d4',
    textColor: '#07503f',
    buttonBg: '#07503f',
  },
];

export default function PartnerShowcase() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const current = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section className={styles.showcase} aria-labelledby="partner-showcase-title">
      <span className={styles.eyebrow}>Partner with Planet Harvest</span>
      <h2 id="partner-showcase-title" className={styles.title}>
        There’s A Place For Everyone At The Table
      </h2>

      {/* Interactive Tabs */}
      <div className={styles.tabList} role="tablist" aria-label="Partner categories">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              type="button"
              className={`${styles.tabButton} ${isActive ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {isActive && <span className={styles.dot} style={{ backgroundColor: tab.buttonBg }} aria-hidden="true" />}
            </button>
          );
        })}
      </div>

      {/* Active Tab Card Container */}
      <div
        id={`panel-${current.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${current.id}`}
        className={styles.cardContainer}
        style={{ backgroundColor: current.bg, color: current.textColor }}
      >
        <div className={styles.cardCopy}>
          <h3 className={styles.cardHeadline} style={{ color: current.textColor }}>
            {current.headline}
          </h3>
          <p className={styles.cardDescription} style={{ color: current.textColor }}>
            {current.copy}
          </p>
          <Link
            className={styles.primaryButton}
            href={current.href}
            style={{ backgroundColor: current.buttonBg }}
          >
            <span>{current.buttonText}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className={styles.cardImageWrapper}>
          <img src={current.image} alt={current.alt} className={styles.cardImage} />
        </div>
      </div>

      {/* Sub-CTA */}
      <div className={styles.subCta}>
        <span className={styles.subCtaText}>Have something bigger in mind?</span>
        <Link className={styles.secondaryButton} href="/contact">
          <span>Let’s Build</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
