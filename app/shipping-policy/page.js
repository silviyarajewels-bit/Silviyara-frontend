import { IcShipping, IcAlert } from '@/lib/icons';
export const metadata = {
  title: 'Shipping Policy — Silviyara Jewels',
  description: 'Free delivery across India on orders above ₹999.',
};

export default function Page() {
  return (
    <>
      <section className="about-hero" style={{ paddingBottom: '40px' }}>
        <p className="section-label">✦ Silviyara Jewels</p>
        <h1>Shipping <em>Policy</em></h1>
        <p style={{ maxWidth: '600px', margin: '1rem auto 0', color: 'var(--text2)', fontSize: '0.95rem', lineHeight: '1.8' }}>Pan India delivery available · Effective from launch date</p>
      </section>

      <section className="story-section" style={{ paddingTop: '60px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--card)', border: '1px solid var(--border)', padding: '40px' }}>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>1</span> Delivery timeline</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px', paddingLeft: '32px', margin: '10px 0 1.5rem' }}>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '12px' }}><div style={{ fontSize: '11px', color: 'var(--silver)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Order processing</div><div style={{ fontSize: '14px', fontWeight: '500' }}>1–2 working days</div></div>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '12px' }}><div style={{ fontSize: '11px', color: 'var(--silver)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Standard delivery</div><div style={{ fontSize: '14px', fontWeight: '500' }}>5–7 working days</div></div>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '12px' }}><div style={{ fontSize: '11px', color: 'var(--silver)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Express delivery</div><div style={{ fontSize: '14px', fontWeight: '500' }}>2–3 working days</div></div>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '12px' }}><div style={{ fontSize: '11px', color: 'var(--silver)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Lucknow local</div><div style={{ fontSize: '14px', fontWeight: '500' }}>1–2 working days</div></div>
          </div>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>2</span> Shipping charges</h3>
          <ul style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '0.75rem', paddingLeft: '32px' }}>
            <li>Free shipping on orders above Rs. 999</li>
            <li>Standard shipping: Rs. 60 on orders below Rs. 999</li>
            <li>Express shipping: Rs. 120 (available on select pincodes)</li>
            <li>COD available — additional Rs. 30 handling charge</li>
          </ul>
          <div style={{ background: 'rgba(39,174,96,0.08)', border: '1px solid rgba(39,174,96,0.2)', padding: '12px 16px', margin: '0 0 1.5rem 32px' }}>
            <p style={{ fontSize: '0.88rem', color: '#27ae60', lineHeight: '1.7' }}><IcShipping /> All jewellery is shipped in tamper-proof, branded packaging with insurance cover.</p>
          </div>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>3</span> Packaging & safety</h3>
          <ul style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '1.5rem', paddingLeft: '32px' }}>
            <li>Every piece is individually wrapped in soft anti-tarnish cloth</li>
            <li>Packed in branded SILVIYARA box with authenticity certificate</li>
            <li>Outer packaging is discreet — no jewellery branding on outer box</li>
            <li>Transit insurance included on all orders above Rs. 1,000</li>
            <li>Signature required on delivery for orders above Rs. 2,000</li>
          </ul>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>4</span> Order tracking</h3>
          <ul style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '1.5rem', paddingLeft: '32px' }}>
            <li>Tracking link sent via SMS and email once dispatched</li>
            <li>Live tracking available on our website and courier partner app</li>
            <li>If not delivered in promised time — contact us for full refund or reship</li>
          </ul>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>5</span> Delivery issues</h3>
          <div style={{ background: 'rgba(243,156,18,0.08)', border: '1px solid rgba(243,156,18,0.2)', padding: '12px 16px', margin: '0 0 12px 32px' }}>
            <p style={{ fontSize: '0.88rem', color: '#e67e22', lineHeight: '1.7' }}><IcAlert /> If your package shows "delivered" but you did not receive it — contact us within 48 hours. We will raise a courier dispute and reship or refund within 7 working days.</p>
          </div>
          <ul style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '1.5rem', paddingLeft: '32px' }}>
            <li>Wrong address entered by customer — reshipping charges apply</li>
            <li>Failed delivery attempts (3 times) — package returned, reshipping charged</li>
            <li>Damaged in transit — full replacement at no cost, report within 24 hours of delivery</li>
          </ul>

        </div>
      </section>

      {/* ═══ Auth Modal (Login / Register) ═══ */}
    </>
  );
}
