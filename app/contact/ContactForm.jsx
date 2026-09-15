'use client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ArrowIcon } from '@/components/EditorialPage';
import styles from '@/components/editorial.module.css';
const audiences = [ ['grower', 'I’m a grower'], ['food-company', 'I’m a food company'], ['healthcare', 'I’m a healthcare organization'], ['community', 'I’m interested in community impact'], ['partnership', 'Let’s build a partnership'] ];
export default function ContactForm({ email }) {
  const search = useSearchParams();
  const initial = audiences.some(([value]) => value === search.get('interest')) ? search.get('interest') : 'partnership';
  const [status, setStatus] = useState('');
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const interest = audiences.find(([value]) => value === data.get('interest'))[1];
    const body = `Partnership inquiry — Planet Harvest\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nOrganization: ${data.get('organization')}\nInterest: ${interest}\n\n${data.get('message')}`;
    if (email) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Planet Harvest partnership: ${data.get('organization')}`)}&body=${encodeURIComponent(body)}`;
      setStatus('Your email app has been requested. Please send the draft there to complete your inquiry.');
    } else {
      const url = URL.createObjectURL(new Blob([body], { type: 'text/plain;charset=utf-8' }));
      const link = document.createElement('a'); link.href = url; link.download = 'planet-harvest-partnership-inquiry.txt'; link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setStatus('Your inquiry has been downloaded. It has not been sent.');
    }
  }
  return <form className={styles.form} onSubmit={submit}>
    <label>I’m interested in<select name="interest" defaultValue={initial} key={initial}>{audiences.map(([value,label]) => <option key={value} value={value}>{label}</option>)}</select></label>
    <div className={styles.formRow}><label>Your name<input name="name" autoComplete="name" required maxLength={120} /></label><label>Work email<input name="email" type="email" autoComplete="email" required maxLength={200} /></label></div>
    <label>Organization<input name="organization" autoComplete="organization" required maxLength={200} /></label>
    <label>What would you like to build together?<textarea name="message" required maxLength={3000} placeholder="Tell us about your goals, community, or harvest…" /></label>
    <p className={styles.note}>{email ? 'This opens a draft in your email app for you to review and send.' : 'Online inquiries are not available yet. You can prepare and download your partnership inquiry below.'}</p>
    <button type="submit" className={styles.button}>{email ? 'Prepare email' : 'Download inquiry'}<ArrowIcon /></button>
    <p className={styles.status} role="status" aria-live="polite">{status}</p>
  </form>;
}
