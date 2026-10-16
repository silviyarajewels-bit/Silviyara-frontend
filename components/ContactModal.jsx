'use client';

import { useState } from 'react';
import { useUI } from '@/context/UIContext';
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from '@/lib/constants';
import { IcPhone, IcClock, IcWhatsApp, IcClose } from '@/lib/icons';

const EMPTY = { name: '', phone: '', email: '', subject: '', message: '' };

export default function ContactModal() {
  const { contactOpen, setContactOpen } = useUI();
  const [form, setForm] = useState(EMPTY);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const close = () => setContactOpen(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr('');
    // Pehle jawab dekhe bina "Thank you" dikh jaata tha — DB down ho to
    // message chupchaap kho jaata aur customer intezaar karta reh jaata.
    let ok = false;
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      ok = res.ok && data.success;
    } catch {}
    setBusy(false);
    if (!ok) {
      setErr(`Message abhi nahi bhej paaye. WhatsApp par likhein: ${WHATSAPP_DISPLAY}`);
      return;   // form waisa hi rehne do — customer ka likha hua na mite
    }
    setSent(true);
    setForm(EMPTY);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div
      className={`contact-modal-overlay ${contactOpen ? 'open' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div className="contact-modal">
        <div className="cmodal-left">
          <p className="cmodal-eyebrow">✦ Get in touch</p>
          <h2>Let&apos;s talk<br /><em>jewellery.</em></h2>
          <p>
            Whether you have a question about a piece, a custom order, or just want to say hello —
            we&apos;d love to hear from you.
          </p>
          <div className="cmodal-contacts">
            <div className="cmodal-contact-item">
              <div className="cmodal-contact-icon"><IcPhone /></div>
              <div className="cmodal-contact-text">
                <p>Call / WhatsApp</p>
                <a href={`tel:+${WHATSAPP_NUMBER}`}>{WHATSAPP_DISPLAY}</a>
              </div>
            </div>
            <div className="cmodal-contact-item">
              <div className="cmodal-contact-icon"><IcClock /></div>
              <div className="cmodal-contact-text">
                <p>Working Hours</p>
                <span>Mon–Sat: 10am – 8pm</span>
              </div>
            </div>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Silviyara!%20I%20have%20a%20question.`}
            target="_blank"
            rel="noopener noreferrer"
            className="cmodal-wa-btn"
          >
            <IcWhatsApp /> &nbsp;Chat on WhatsApp
          </a>
        </div>

        <div className="cmodal-right">
          <button className="cmodal-close" onClick={close} aria-label="Close"><IcClose /></button>
          <h3>Send a Message</h3>
          <p>We reply within 24 hours. For quick answers, WhatsApp is fastest.</p>

          <form onSubmit={submit}>
            <div className="cmodal-form-row">
              <div className="cmodal-form-group">
                <label>Your Name *</label>
                <input type="text" className="cmodal-form-input" placeholder="Priya Sharma" required value={form.name} onChange={set('name')} />
              </div>
              <div className="cmodal-form-group">
                <label>Phone</label>
                <input type="tel" className="cmodal-form-input" placeholder="+91 9876543210" value={form.phone} onChange={set('phone')} />
              </div>
            </div>
            <div className="cmodal-form-group">
              <label>Email</label>
              <input type="email" className="cmodal-form-input" placeholder="priya@email.com" value={form.email} onChange={set('email')} />
            </div>
            <div className="cmodal-form-group">
              <label>Subject</label>
              <input type="text" className="cmodal-form-input" placeholder="Order inquiry, custom piece..." value={form.subject} onChange={set('subject')} />
            </div>
            <div className="cmodal-form-group">
              <label>Message *</label>
              <textarea className="cmodal-form-input" placeholder="How can we help you?" required value={form.message} onChange={set('message')} />
            </div>
            <button type="submit" className="cmodal-submit-btn" disabled={busy}>
              <span>{busy ? 'Sending...' : 'Send Message →'}</span>
            </button>
            {err && (
              <div className="cmodal-success-msg" style={{ display: 'block', color: '#c0392b' }}>
                {err}
              </div>
            )}
            {sent && (
              <div className="cmodal-success-msg" style={{ display: 'block' }}>
                ✦ Thank you! We&apos;ll be in touch within 24 hours.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
