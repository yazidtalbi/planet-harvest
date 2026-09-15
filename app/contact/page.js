import { Suspense } from 'react';
import ContactForm from './ContactForm';
import { Hero, Button, styles } from '@/components/EditorialPage';
export const metadata = { title: 'Let’s Connect — Planet Harvest', description: 'Explore a partnership with Planet Harvest as a grower, food company, healthcare organization, or community partner.' };
export default function ContactPage() {
  return <main id="main-content" className={styles.page}><Hero eyebrow="Let’s build a partnership" title="Let’s Grow Together." film="contact" copy="Whether you grow it, create with it, or help it reach your community, there’s a place for you in the whole harvest."><Button href="#inquiry">Start a conversation</Button></Hero><section id="inquiry" className={styles.contact}><div className={styles.contactIntro}><span className={styles.eyebrow}>Let’s build a partnership</span><h2>Good things<br />grow together.</h2><p>Whether you grow it, create with it, or help it reach your community, there’s a place for you in the whole harvest.</p><p style={{marginTop:20}}>Tell us a little about your organization and what you’d like to build with Planet Harvest.</p><img src="/contact-intro.jpg" alt="Partners shaking hands over fresh harvest produce" /></div><Suspense fallback={<p>Loading inquiry form…</p>}><ContactForm email={process.env.NEXT_PUBLIC_CONTACT_EMAIL || ''} /></Suspense></section></main>;
}
