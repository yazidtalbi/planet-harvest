import Link from 'next/link';
import { ArrowIcon } from './EditorialPage';
import styles from '@/app/ph/harvest-sections.module.css';

export default function SiteFooter() {
  return <footer className={styles.siteFooter}>
    <div className={styles.footerStickerTopRight}><img src="/10-sticker-footer.png" alt="" className={styles.footerSticker} /></div>
    <nav className={styles.footerNav} aria-label="Footer navigation">
      <div><span>Company</span><Link href="/story">Our story</Link><Link href="/sourcing">Our approach</Link><Link href="/media">In the news</Link></div>
      <div><span>What we do</span><Link href="/sourcing">Sustainable sourcing</Link><Link href="/products">Product integration</Link><Link href="/food-boxes">Food boxes</Link></div>
      <div><span>Impact</span><Link href="/impact">Farm to community</Link><Link href="/food-boxes#programs">Our programs</Link><Link href="/impact#partners">Our partners</Link></div>
      <div><span>Connect</span><p style={{color:'inherit'}}>Let’s build a partnership</p><Link className={styles.footerButton} href="/contact">Get in touch <ArrowIcon /></Link></div>
    </nav>
    <Link href="/" className={styles.footerLogoLink} aria-label="Planet Harvest home"><img src="/logo/logo1.svg" alt="Planet Harvest" className={styles.footerLogoSvg} /></Link>
    <div className={styles.footerBottom}><span>From farms to communities.</span><span>© {new Date().getFullYear()} Planet Harvest, LLC</span><a href="#main-content">Back to top ↑</a></div>
  </footer>;
}
