import { IcShield, IcAlert } from '@/lib/icons';
export const metadata = {
  title: 'Return & Refund Policy — Silviyara Jewels',
  description: '7-day easy returns on all Silviyara Jewels orders.',
};

export default function Page() {
  return (
    <>
      <section className="about-hero" style={{ paddingBottom: '40px' }}>
        <p className="section-label">✦ Silviyara Jewels</p>
        <h1>Return & <em>Refund Policy</em></h1>
        <p style={{ maxWidth: '600px', margin: '1rem auto 0', color: 'var(--text2)', fontSize: '0.95rem', lineHeight: '1.8' }}>Effective from launch date · Applies to all orders on silviyara.com</p>
      </section>

      <section className="story-section" style={{ paddingTop: '60px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--card)', border: '1px solid var(--border)', padding: '40px' }}>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>1</span> Our Promise</h3>
          <p style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '0.75rem', paddingLeft: '32px' }}>At SILVIYARA, we stand behind the quality of every piece we sell. If you are not completely satisfied, we will make it right — no questions asked within the return window.</p>
          <div style={{ background: 'rgba(39,174,96,0.08)', border: '1px solid rgba(39,174,96,0.2)', padding: '12px 16px', margin: '0 0 1.5rem 32px' }}>
            <p style={{ fontSize: '0.88rem', color: '#27ae60', lineHeight: '1.7' }}><IcShield /> <strong>7-day easy returns</strong> on all orders. No questions asked. Full refund or exchange.</p>
          </div>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>2</span> What you can return</h3>
          <ul style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '1.5rem', paddingLeft: '32px' }}>
            <li>Unused jewellery in original condition with tags intact</li>
            <li>Items received in damaged or defective condition</li>
            <li>Wrong item delivered by us</li>
            <li>Size or style exchange (subject to availability)</li>
            <li>Items that do not match the product description on our website</li>
          </ul>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>3</span> What cannot be returned</h3>
          <ul style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '0.75rem', paddingLeft: '32px' }}>
            <li>Customized or engraved jewellery (name, initials, dates)</li>
            <li>Items damaged by customer misuse, chemical exposure, or improper storage</li>
            <li>Earrings (for hygiene reasons) — unless defective or wrong item</li>
            <li>Items returned after 7 days of delivery</li>
            <li>Items without original packaging, tags, or certificate</li>
          </ul>
          <div style={{ background: 'rgba(243,156,18,0.08)', border: '1px solid rgba(243,156,18,0.2)', padding: '12px 16px', margin: '0 0 1.5rem 32px' }}>
            <p style={{ fontSize: '0.88rem', color: '#e67e22', lineHeight: '1.7' }}><IcAlert /> Customized items are made specifically for you and cannot be resold — these are strictly non-returnable.</p>
          </div>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>4</span> Return timeline</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px', paddingLeft: '32px', margin: '10px 0 1.5rem' }}>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '12px' }}><div style={{ fontSize: '11px', color: 'var(--silver)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Raise request</div><div style={{ fontSize: '14px', fontWeight: '500' }}>Within 7 days</div></div>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '12px' }}><div style={{ fontSize: '11px', color: 'var(--silver)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Pickup</div><div style={{ fontSize: '14px', fontWeight: '500' }}>2–3 working days</div></div>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '12px' }}><div style={{ fontSize: '11px', color: 'var(--silver)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Quality check</div><div style={{ fontSize: '14px', fontWeight: '500' }}>1–2 working days</div></div>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '12px' }}><div style={{ fontSize: '11px', color: 'var(--silver)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Refund credit</div><div style={{ fontSize: '14px', fontWeight: '500' }}>5–7 working days</div></div>
          </div>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>5</span> Refund method</h3>
          <ul style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '1.5rem', paddingLeft: '32px' }}>
            <li>Original payment method — UPI, card, net banking: 5–7 working days</li>
            <li>COD orders: refund to your bank account (NEFT) within 7 working days</li>
            <li>Store credit: instant, valid for 6 months</li>
            <li>Exchange: dispatched within 3 working days of receiving return</li>
          </ul>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>6</span> How to raise a return</h3>
          <ul style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '0.75rem', paddingLeft: '32px' }}>
            <li>Email: silviyarajewels@gmail.com with your order number and photos</li>
            <li>WhatsApp: +91 8004703038 — fastest response</li>
            <li>Mention: Order ID, reason for return, 2-3 clear photos of the item</li>
          </ul>
          <div style={{ background: 'rgba(39,174,96,0.08)', border: '1px solid rgba(39,174,96,0.2)', padding: '12px 16px', margin: '0 0 1.5rem 32px' }}>
            <p style={{ fontSize: '0.88rem', color: '#27ae60', lineHeight: '1.7' }}>We respond to all return requests within <strong>24 hours</strong> on working days (Monday–Saturday, 10am–6pm).</p>
          </div>

          <div style={{ height: '1px', background: 'var(--border)', margin: '2rem 0' }}></div>
          <p style={{ fontSize: '12px', color: 'var(--silver)', textAlign: 'center' }}>SILVIYARA · M/s SILVIYARA Partnership Firm · MSME Reg. UDYAM-UP-50-0270342 · Lucknow, UP 226022<br />These policies are subject to applicable Indian laws including Consumer Protection Act 2019, IT Act 2000, and GST Act 2017.</p>
        </div>
      </section>

      {/* ═══ Auth Modal (Login / Register) ═══ */}
    </>
  );
}
