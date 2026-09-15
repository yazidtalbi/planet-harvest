'use client';
import styles from './made-from-harvest.module.css';

export default function MadeFromHarvestCard() {
  return (
    <section className={styles.statisticsSection} aria-labelledby="statistics-title">
      <div className={styles.header}>
        <span className={styles.eyebrow}>STATISTICS</span>
        <h2 id="statistics-title" className={styles.title}>
          Impact You Can Feel
        </h2>
      </div>

      <div className={styles.grid}>
        {/* Column 1: Food Boxes */}
        <div className={styles.column}>
          <div className={styles.imageContainer}>
            <img src="/impact-boxes.png" alt="Fresh food boxes stacked" className={styles.iconImage} />
          </div>
          <div className={styles.statNumber}>5,000</div>
          <p className={styles.statLabel}>Fresh food boxes across South Florida</p>
        </div>

        {/* Vertical Divider 1 */}
        <div className={styles.divider} aria-hidden="true" />

        {/* Column 2: Apples */}
        <div className={styles.column}>
          <div className={styles.imageContainer}>
            <img src="/impact-apples.png" alt="Fresh red apples stacked" className={styles.iconImage} />
          </div>
          <div className={styles.statNumber}>1,500+</div>
          <p className={styles.statLabel}>Families supported in Chicago</p>
        </div>

        {/* Vertical Divider 2 */}
        <div className={styles.divider} aria-hidden="true" />

        {/* Column 3: US Tour Map */}
        <div className={styles.column}>
          <div className={styles.imageContainer}>
            <img src="/impact-map.png" alt="Map with national tour stops" className={styles.iconImage} />
          </div>
          <div className={styles.statNumber}>200</div>
          <p className={styles.statLabel}>National tour stops and growing</p>
        </div>
      </div>
    </section>
  );
}
