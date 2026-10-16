import { IcBlocked } from '@/lib/icons';
export const metadata = {
  title: 'Privacy Policy — Silviyara Jewels',
  description: 'How Silviyara Jewels handles your data.',
};

export default function Page() {
  return (
    <>
      <section className="about-hero" style={{ paddingBottom: '40px' }}>
        <p className="section-label">✦ Silviyara Jewels</p>
        <h1>Privacy <em>Policy</em></h1>
        <p style={{ maxWidth: '600px', margin: '1rem auto 0', color: 'var(--text2)', fontSize: '0.95rem', lineHeight: '1.8' }}>We respect your privacy — your data is never sold or shared.</p>
      </section>

      <section className="story-section" style={{ paddingTop: '60px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--card)', border: '1px solid var(--border)', padding: '40px' }}>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>1</span> What data we collect</h3>
          <ul style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '1.5rem', paddingLeft: '32px' }}>
            <li>Name, email, phone, and delivery address (for order processing)</li>
            <li>Payment information (processed securely via Razorpay — we never store card details)</li>
            <li>Order history and preferences</li>
            <li>Device type, browser, and pages visited (for website improvement)</li>
            <li>WhatsApp messages you send us (for customer support)</li>
          </ul>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>2</span> How we use your data</h3>
          <ul style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '1.5rem', paddingLeft: '32px' }}>
            <li>To process and deliver your orders</li>
            <li>To send order confirmations, shipping updates, and invoices</li>
            <li>To send promotional offers — only with your consent (opt-out anytime)</li>
            <li>To improve our website and product offerings</li>
            <li>To comply with GST invoicing and legal requirements</li>
          </ul>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>3</span> What we never do</h3>
          <div style={{ background: 'rgba(231,76,60,0.06)', border: '1px solid rgba(231,76,60,0.15)', padding: '12px 16px', margin: '0 0 12px 32px' }}>
            <p style={{ fontSize: '0.88rem', color: '#c0392b', lineHeight: '1.7' }}><IcBlocked /> We never sell, rent, or share your personal data with third parties for marketing purposes. Your data is yours.</p>
          </div>
          <ul style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '1.5rem', paddingLeft: '32px' }}>
            <li>Never sell your data to advertisers</li>
            <li>Never share your number with third-party sellers</li>
            <li>Never store your card, CVV, or UPI PIN</li>
            <li>Never contact you via unofficial channels or fake customer care numbers</li>
          </ul>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>4</span> Your rights</h3>
          <ul style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '1.5rem', paddingLeft: '32px' }}>
            <li>Request a copy of all data we hold about you</li>
            <li>Request deletion of your account and personal data</li>
            <li>Opt out of marketing emails/SMS anytime</li>
            <li>Raise a complaint: silviyarajewels@gmail.com</li>
          </ul>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>5</span> Data security</h3>
          <ul style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '1.5rem', paddingLeft: '32px' }}>
            <li>Website secured with SSL (HTTPS) — all data encrypted in transit</li>
            <li>Payments processed by Razorpay (PCI-DSS compliant)</li>
            <li>Customer data stored in password-protected systems with limited access</li>
            <li>Regular security reviews conducted</li>
          </ul>

        </div>
      </section>

      {/* ═══ Auth Modal (Login / Register) ═══ */}
    </>
  );
}
