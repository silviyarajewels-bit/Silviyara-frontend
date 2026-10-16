export const metadata = {
  title: 'Terms & Conditions — Silviyara Jewels',
  description: 'Terms of use for silviyara.com',
};

export default function Page() {
  return (
    <>
      <section className="about-hero" style={{ paddingBottom: '40px' }}>
        <p className="section-label">✦ Silviyara Jewels</p>
        <h1>Terms of <em>Use</em></h1>
        <p style={{ maxWidth: '600px', margin: '1rem auto 0', color: 'var(--text2)', fontSize: '0.95rem', lineHeight: '1.8' }}>By placing an order on silviyara.com, you agree to these terms.</p>
      </section>

      <section className="story-section" style={{ paddingTop: '60px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--card)', border: '1px solid var(--border)', padding: '40px' }}>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>1</span> General</h3>
          <p style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '1.5rem', paddingLeft: '32px' }}>silviyara.com is owned and operated by M/s SILVIYARA, a Partnership Firm registered in Lucknow, Uttar Pradesh (MSME Reg. No. UDYAM-UP-50-0270342). These terms govern your use of our website and purchase of our products.</p>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>2</span> Ordering & payment</h3>
          <ul style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '1.5rem', paddingLeft: '32px' }}>
            <li>By placing an order, you confirm that all information provided is accurate</li>
            <li>We reserve the right to cancel any order in case of pricing errors, stock unavailability, or suspected fraud</li>
            <li>Full payment is required before dispatch for prepaid orders</li>
            <li>GST invoice will be provided for every order</li>
            <li>Prices are inclusive of GST unless stated otherwise</li>
          </ul>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>3</span> Product accuracy</h3>
          <ul style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '1.5rem', paddingLeft: '32px' }}>
            <li>We make every effort to display product images and descriptions accurately</li>
            <li>Actual product color may vary slightly due to screen settings</li>
            <li>Weight mentioned is approximate (±0.1 gram)</li>
            <li>In case of any discrepancy — contact us within 48 hours of delivery</li>
          </ul>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>4</span> Intellectual property</h3>
          <ul style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '1.5rem', paddingLeft: '32px' }}>
            <li>All content on silviyara.com — images, text, logo, brand name — is the property of M/s SILVIYARA</li>
            <li>Unauthorized use, copying, or reproduction is strictly prohibited</li>
            <li>Product photos may not be used for resale without written permission</li>
          </ul>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>5</span> Dispute resolution</h3>
          <p style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '1.5rem', paddingLeft: '32px' }}>All disputes shall be subject to the exclusive jurisdiction of courts in Lucknow, Uttar Pradesh, India. We encourage you to contact us first — most issues are resolved within 24–48 hours.</p>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>6</span> Limitation of liability</h3>
          <p style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '1.5rem', paddingLeft: '32px' }}>SILVIYARA's liability is limited to the value of the product purchased. We are not liable for indirect damages, loss of profit, or consequential losses arising from the use of our products.</p>

          <div style={{ height: '1px', background: 'var(--border)', margin: '2rem 0' }}></div>
          <p style={{ fontSize: '12px', color: 'var(--silver)', textAlign: 'center' }}>SILVIYARA · M/s SILVIYARA Partnership Firm · MSME Reg. UDYAM-UP-50-0270342 · Lucknow, UP 226022<br />These policies are subject to applicable Indian laws including Consumer Protection Act 2019, IT Act 2000, and GST Act 2017.</p>
        </div>
      </section>

      {/* ═══ Auth Modal (Login / Register) ═══ */}
    </>
  );
}
