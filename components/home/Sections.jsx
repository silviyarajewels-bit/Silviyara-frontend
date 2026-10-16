'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  IcSilver, IcShipping, IcReturns, IcWhatsApp, IcEdit, IcExpert, IcDiamond,
  IcBirthday, IcAnniversary, IcWedding, IcFestive, IcFriendship, IcGift, IcSuccess,
} from '@/lib/icons';

export function WhyUs() {
  const items = [
    { Icon: IcSilver,   title: '925 Sterling Silver', desc: 'Every piece is crafted from genuine 925 sterling silver — hallmarked and certified.' },
    { Icon: IcShipping, title: 'Free Delivery', desc: 'Free shipping across India on orders above ₹999. Delivered in 3-5 business days.' },
    { Icon: IcReturns,  title: 'Easy Returns', desc: 'Not satisfied? Return within 7 days for a full refund — no questions asked.' },
    { Icon: IcWhatsApp, title: 'WhatsApp Support', desc: 'Order, track, or ask questions directly on WhatsApp. We respond within hours.' },
  ];

  return (
    <section className="why-section">
      <div className="section-header">
        <p className="section-label">✦ Why Choose Us</p>
        <h2 className="section-title">The Silviyara Promise</h2>
      </div>
      <div className="why-grid">
        {items.map((i) => (
          <div className="why-card" key={i.title}>
            <span className="why-icon"><i.Icon /></span>
            <h3 className="why-title">{i.title}</h3>
            <p className="why-desc">{i.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CustomDesignCTA() {
  return (
    <section className="custom-design-cta">
      <div className="cd-cta-glow" />
      <div className="cd-cta-glow2" />
      <div className="cd-cta-content">
        <span className="cd-cta-eyebrow">✦ Bespoke Creations</span>
        <h2 className="cd-cta-title">
          Have a <em>Unique Design</em><br />in Mind?
        </h2>
        <p className="cd-cta-desc">
          Share your vision with us — a sketch, a photo, or a CAD file — and our master craftsmen
          will bring it to life in pure 925 sterling silver. Your imagination, our craftsmanship.
        </p>
        <div className="cd-cta-features">
          <div className="cd-cta-feat"><span><IcEdit /></span> Upload Your Design</div>
          <div className="cd-cta-feat"><span><IcExpert /></span> Expert Review</div>
          <div className="cd-cta-feat"><span><IcDiamond /></span> Crafted for You</div>
        </div>
        <Link
          href="/custom-design"
          className="btn-primary"
          style={{
            display: 'inline-block', marginTop: '2rem',
            background: 'linear-gradient(135deg,#c9a84c,#e6c56a)', color: '#0e0d0c',
          }}
        >
          Explore Custom Design →
        </Link>
      </div>
    </section>
  );
}

export function Gifting() {
  const router = useRouter();
  const occasions = [
    { Icon: IcBirthday,    title: 'Birthday', desc: 'Make her day unforgettable' },
    { Icon: IcAnniversary, title: 'Anniversary', desc: 'Celebrate love in silver' },
    { Icon: IcWedding,     title: 'Wedding', desc: 'Bridal & bridesmaid gifts' },
    { Icon: IcFestive,     title: 'Festive', desc: 'Diwali, Eid & more' },
    { Icon: IcFriendship,  title: 'Friendship', desc: 'For your best friend' },
  ];

  return (
    <section className="gifting-section">
      <div className="section-header">
        <p className="section-label">✦ Perfect Gifts</p>
        <h2 className="section-title">
          Gift <em style={{ fontStyle: 'italic', color: 'var(--gold-accent)' }}>Something Beautiful</em>
        </h2>
        <p style={{ color: 'var(--text2)', maxWidth: 500, margin: '.75rem auto 0', fontSize: '.9rem', lineHeight: 1.8 }}>
          Pure silver jewellery — the most timeless gift. Comes in beautiful branded packaging,
          ready to gift.
        </p>
      </div>

      <div className="gifting-occasions">
        {occasions.map((o) => (
          <div className="occasion-card" key={o.title} onClick={() => router.push('/shop')}>
            <div className="occasion-emoji"><o.Icon /></div>
            <h3 className="occasion-title">{o.title}</h3>
            <p className="occasion-desc">{o.desc}</p>
          </div>
        ))}
      </div>

      <div className="gifting-usp">
        <div className="gift-usp-item"><span><IcGift /></span> Premium Gift Packaging</div>
        <div className="gift-usp-item"><span><IcEdit /></span> Personal Message Card</div>
        <div className="gift-usp-item"><span><IcSilver /></span> 925 Sterling Silver</div>
        <div className="gift-usp-item"><span><IcShipping /></span> Free Delivery above ₹999</div>
      </div>

      <Link href="/shop" className="btn-primary" style={{ display: 'inline-block', marginTop: '2rem' }}>
        Shop Gift-Ready Pieces →
      </Link>
    </section>
  );
}

export function Testimonials() {
  const reviews = [
    { text: 'The silver pendant I ordered is absolutely stunning. The quality is exceptional and delivery was super fast!', author: '— Priya S., Lucknow' },
    { text: "Ordered anklets for my sister's wedding. Everyone kept asking where we got them from. Highly recommend!", author: '— Neha R., Kanpur' },
    { text: "Best silver jewellery I've bought online. Genuine 925 silver, beautiful finish, and great customer service.", author: '— Anjali M., Delhi' },
  ];

  return (
    <section className="testimonials">
      <div className="section-header">
        <p className="section-label">✦ Customer Love</p>
        <h2 className="section-title">What They Say</h2>
      </div>
      <div className="testimonials-grid">
        {reviews.map((r) => (
          <div className="testimonial-card" key={r.author}>
            <div className="stars">★★★★★</div>
            <p className="testimonial-text">&quot;{r.text}&quot;</p>
            <p className="testimonial-author">{r.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);

  // FIX: original sirf alert() dikhata tha, email kahin save nahi hoti thi.
  // Ab actually /api/contact par jaati hai.
  const subscribe = async (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ ok: false, msg: 'Please enter a valid email address' });
      return;
    }
    setBusy(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Newsletter Subscriber',
          email,
          subject: 'Newsletter Subscription',
          message: `Newsletter signup: ${email}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ ok: true, msg: 'Subscribed! Thank you.' });
        setEmail('');
      } else {
        setStatus({ ok: false, msg: 'Could not subscribe. Please try again.' });
      }
    } catch {
      setStatus({ ok: false, msg: 'Could not reach the server.' });
    }
    setBusy(false);
    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <section className="newsletter">
      <h2>Stay in the Loop</h2>
      <p>Get notified about new arrivals, flash sales and exclusive offers.</p>
      <form className="newsletter-form" onSubmit={subscribe}>
        <input
          type="email"
          className="newsletter-input"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="btn-primary" disabled={busy}>
          {busy ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {status && (
        <p style={{
          marginTop: '1rem', fontSize: '.82rem',
          color: status.ok ? '#27ae60' : '#c0392b',
        }}>
          {status.ok && <IcSuccess />} {status.msg}
        </p>
      )}
    </section>
  );
}
