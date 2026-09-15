import Link from 'next/link';
import VideoHero from './VideoHero';
import HarvestMarquee from './HarvestMarquee';
import styles from './editorial.module.css';

export { styles };

export function ArrowIcon({ width = 16, height = 16, className }) {
  return (
    <svg className={className} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
      <line x1="4" y1="12" x2="20" y2="12" />
      <polyline points="13 5 20 12 13 19" />
    </svg>
  );
}

export function Button({ href = '/contact', children = 'Let’s build a partnership', light = false }) {
  return <Link className={`${styles.button} ${light ? styles.lightButton : ''}`} href={href}>{children}<ArrowIcon /></Link>;
}
export function Hero(props) {
  return <><VideoHero {...props} /><HarvestMarquee /></>;
}
export function Intro({ eyebrow, title, children }) {
  return <section className={styles.intro}><span className={styles.eyebrow}>{eyebrow}</span><h2>{title}</h2><div className={styles.introCopy}>{children}</div></section>;
}
export function Split({ title, image, alt, children, reverse = false, eyebrow }) {
  return <section className={`${styles.split} ${reverse ? styles.reverse : ''}`}><div className={styles.splitImage}><img src={image} alt={alt} loading="lazy" /></div><div className={styles.splitCopy}>{eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}<h2>{title}</h2>{children}</div></section>;
}
export function Callout({ title = 'Let’s put the whole harvest to work.', copy, href = '/contact', button = 'Let’s build a partnership' }) {
  return <section className={styles.callout}><img className={styles.sticker} src="/sticker-apple.png" alt="" loading="lazy" /><span className={styles.eyebrow}>Good food. Greater possibilities.</span><h2>{title}</h2>{copy && <p>{copy}</p>}<Button href={href}>{button}</Button></section>;
}
export function Cards({ items }) {
  return <div className={styles.cards}>{items.map((item, i) => <article className={styles.card} key={item.title}><span className={styles.eyebrow}>0{i + 1}</span><h3>{item.title}</h3><p>{item.copy}</p>{item.href && <Button href={item.href}>{item.button || 'Explore more'}</Button>}</article>)}</div>;
}
