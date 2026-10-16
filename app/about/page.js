import { IcDiamond, IcSilver, IcSparkle, IcGift, IcHandshake } from '@/lib/icons';
export const metadata = {
  title: 'About Us — Silviyara Jewels',
  description: 'Silviyara Jewels — handpicked 925 sterling silver jewellery from Lucknow.',
};

export default function Page() {
  return (
    <>
      <section className="about-hero">
        <p className="section-label">✦ Our Story</p>
        <h1>Crafted with <em>Love</em></h1>
        <p>Silviyara Jewels brings you timeless silver jewellery, handcrafted by skilled artisans from Lucknow. Every piece tells a story of tradition, elegance, and authenticity.</p>
      </section>

      <section className="story-section">
        <div className="story-grid">
          <div className="story-visual"><IcDiamond /></div>
          <div className="story-content">
            <p className="section-label">✦ The Beginning</p>
            <h2>From Passion to Purpose</h2>
            <p>What started as a love for beautiful jewellery grew into a mission — to make authentic 925 sterling silver accessible to everyone. We believe that luxury doesn't have to come with a luxury price tag.</p>
            <p>Each piece in our collection is carefully curated, ensuring quality, design, and affordability go hand in hand.</p>
          </div>
        </div>
      </section>

      <section className="values-section">
        <h2 className="section-title">What We Stand For</h2>
        <div className="values-grid">
          <div className="value-card"><span className="value-icon"><IcSilver /></span><h3 className="value-title">Authenticity</h3><p className="value-desc">Every piece is 925 sterling silver — hallmarked, certified, and guaranteed genuine.</p></div>
          <div className="value-card"><span className="value-icon"><IcSparkle /></span><h3 className="value-title">Craftsmanship</h3><p className="value-desc">We work with skilled artisans who bring decades of experience to every design.</p></div>
          <div className="value-card"><span className="value-icon"><IcGift /></span><h3 className="value-title">Affordability</h3><p className="value-desc">Beautiful jewellery shouldn't break the bank. We keep our prices honest and fair.</p></div>
          <div className="value-card"><span className="value-icon"><IcHandshake /></span><h3 className="value-title">Trust</h3><p className="value-desc">Easy returns, transparent pricing, and WhatsApp support — we're always here for you.</p></div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item"><span className="stat-num">500+</span><span className="stat-label">Happy Customers</span></div>
          <div className="stat-item"><span className="stat-num">100+</span><span className="stat-label">Unique Designs</span></div>
          <div className="stat-item"><span className="stat-num">925</span><span className="stat-label">Sterling Silver</span></div>
          <div className="stat-item"><span className="stat-num">7</span><span className="stat-label">Day Returns</span></div>
        </div>
      </section>

      <section className="promise-section">
        <h2>The Silviyara Promise</h2>
        <p>Every order comes with our commitment to quality, authenticity, and your complete satisfaction.</p>
        <a href="/shop" className="btn-primary">Shop Now</a>
      </section>

      {/* ═══ Auth Modal (Login / Register) ═══ */}
    </>
  );
}
