import styles from './sustainability-impact.module.css';

export default function SustainabilityImpact() {
  return (
    <section className={styles.sustainabilityImpactSection}>
      <div className={styles.impactBgWrapper}>
        <img src="/story/farm.webp" alt="Aerial view of farm fields" className={styles.impactBgImage} />
        <div className={styles.impactOverlay} />
      </div>

      <div className={styles.impactContent}>
        <div className={styles.impactRow}>
          <div className={styles.impactEyebrowCol}>
            <p className={styles.impactEyebrow}>Our sustainability impact achieved in 2026</p>
          </div>

          <div className={styles.impactStatsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>50M+</span>
              <p className={styles.statLabel}>Pounds of produce rescued from farm waste &amp; retail loss.</p>
            </div>

            <div className={styles.statCard}>
              <span className={styles.statNumber}>100%</span>
              <p className={styles.statLabel}>Harvest value unlocked across all edible produce grades.</p>
            </div>

            <div className={styles.statCard}>
              <span className={styles.statNumber}>1.5M+</span>
              <p className={styles.statLabel}>Fresh produce food boxes delivered to families &amp; communities.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
