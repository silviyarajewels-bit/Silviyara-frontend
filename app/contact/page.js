'use client';

import { useEffect } from 'react';
import { useUI } from '@/context/UIContext';

/**
 * Original contact.html mein koi alag page content tha hi nahi —
 * wo bas contact modal dikhata tha. Yahan bhi wahi: page khulte hi modal open.
 */
export default function ContactPage() {
  const { setContactOpen } = useUI();

  useEffect(() => {
    setContactOpen(true);
  }, [setContactOpen]);

  return (
    <section className="about-hero" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <p className="section-label">✦ Get in touch</p>
      <h1>Contact <em>Us</em></h1>
      <p style={{ maxWidth: 600, margin: '1rem auto 0', color: 'var(--text2)', fontSize: '0.95rem', lineHeight: 1.8 }}>
        Questions about a piece, a custom order, or your delivery? We reply within 24 hours.
      </p>
      <button
        className="btn-primary"
        style={{ marginTop: '2rem', display: 'inline-block' }}
        onClick={() => setContactOpen(true)}
      >
        Send a Message →
      </button>
    </section>
  );
}
