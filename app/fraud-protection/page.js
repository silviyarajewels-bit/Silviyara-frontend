import { IcAlert, IcCamera } from '@/lib/icons';
export const metadata = {
  title: 'Fraud Protection — Silviyara Jewels',
  description: 'Stay safe while shopping with Silviyara Jewels.',
};

export default function Page() {
  return (
    <>
      <section className="about-hero" style={{ paddingBottom: '40px' }}>
        <p className="section-label">✦ Silviyara Jewels</p>
        <h1>Fraud <em>Protection</em></h1>
        <p style={{ maxWidth: '600px', margin: '1rem auto 0', color: 'var(--text2)', fontSize: '0.95rem', lineHeight: '1.8' }}>Protecting SILVIYARA and our customers from fraud — both ways.</p>
      </section>

      <section className="story-section" style={{ paddingTop: '60px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--card)', border: '1px solid var(--border)', padding: '40px' }}>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>1</span> How we protect you</h3>
          <ul style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '0.75rem', paddingLeft: '32px' }}>
            <li>We never ask for OTP, PIN, or password via call, email, or WhatsApp</li>
            <li>All payments happen on official website only — we never send payment links on WhatsApp for prepaid orders</li>
            <li>Official contact: silviyarajewels@gmail.com and +91 8004703038 only</li>
            <li>If anyone claims to be SILVIYARA and asks for payment elsewhere — it is a fraud. Report to us immediately.</li>
          </ul>
          <div style={{ background: 'rgba(231,76,60,0.06)', border: '1px solid rgba(231,76,60,0.15)', padding: '12px 16px', margin: '0 0 1.5rem 32px' }}>
            <p style={{ fontSize: '0.88rem', color: '#c0392b', lineHeight: '1.7' }}><IcAlert /> SILVIYARA will never ask for OTP, Aadhaar, or bank details to "process your refund." This is a scam. Hang up and report.</p>
          </div>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>2</span> How we protect ourselves</h3>
          <p style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '0.75rem', paddingLeft: '32px' }}>We have systems in place to detect and prevent order fraud. The following actions will result in permanent account ban and legal action:</p>
          <div style={{ paddingLeft: '32px', margin: '8px 0 1.5rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '100px', fontSize: '12px', fontWeight: '500', marginRight: '6px', marginBottom: '4px', background: 'rgba(231,76,60,0.08)', color: '#c0392b' }}>False "not delivered" claims</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '100px', fontSize: '12px', fontWeight: '500', marginRight: '6px', marginBottom: '4px', background: 'rgba(231,76,60,0.08)', color: '#c0392b' }}>Returning fake items</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '100px', fontSize: '12px', fontWeight: '500', marginRight: '6px', marginBottom: '4px', background: 'rgba(231,76,60,0.08)', color: '#c0392b' }}>Chargeback fraud</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '100px', fontSize: '12px', fontWeight: '500', marginRight: '6px', marginBottom: '4px', background: 'rgba(231,76,60,0.08)', color: '#c0392b' }}>Reselling returned items</span>
          </div>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>3</span> "Item not received" fraud prevention</h3>
          <ul style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '1.5rem', paddingLeft: '32px' }}>
            <li>All orders above Rs. 1,000 require OTP/signature on delivery</li>
            <li>Delivery proof (photo + GPS) taken by courier partner</li>
            <li>Courier CCTV footage requested in case of dispute</li>
            <li>Repeated "not received" claims flagged and investigated before processing</li>
            <li>Police complaint filed for proven false claims</li>
          </ul>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>4</span> Return fraud prevention</h3>
          <ul style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '0.75rem', paddingLeft: '32px' }}>
            <li>All returns are quality-checked upon receipt</li>
            <li>Items returned must match the exact product ordered (weight, make, purity)</li>
            <li>Swapped items (returning fake/different product) — refund rejected, legal action initiated</li>
            <li>Photos taken at time of dispatch and at return receipt — both compared</li>
            <li>Repeat fraudulent return attempts permanently banned</li>
          </ul>
          <div style={{ background: 'rgba(243,156,18,0.08)', border: '1px solid rgba(243,156,18,0.2)', padding: '12px 16px', margin: '0 0 1.5rem 32px' }}>
            <p style={{ fontSize: '0.88rem', color: '#e67e22', lineHeight: '1.7' }}><IcCamera /> Every item is photographed and weighed before dispatch. We will know if a different item is returned.</p>
          </div>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>5</span> Chargeback policy</h3>
          <ul style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '1.5rem', paddingLeft: '32px' }}>
            <li>We maintain complete records of every order — tracking, delivery proof, communication</li>
            <li>False chargebacks are disputed with full evidence submitted to payment gateway</li>
            <li>Proven chargeback fraud — legal notice issued and amount recovered with penalty</li>
          </ul>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>6</span> Report fraud</h3>
          <div style={{ background: 'rgba(39,174,96,0.08)', border: '1px solid rgba(39,174,96,0.2)', padding: '12px 16px', margin: '0 0 1.5rem 32px' }}>
            <p style={{ fontSize: '0.88rem', color: '#27ae60', lineHeight: '1.7' }}>If you suspect any fraud — by us or against us — email <strong>silviyarajewels@gmail.com</strong> with details. We respond within 24 hours.</p>
          </div>

          <div style={{ height: '1px', background: 'var(--border)', margin: '2rem 0' }}></div>
          <p style={{ fontSize: '12px', color: 'var(--silver)', textAlign: 'center' }}>SILVIYARA · M/s SILVIYARA Partnership Firm · MSME Reg. UDYAM-UP-50-0270342 · Lucknow, UP 226022<br />These policies are subject to applicable Indian laws including Consumer Protection Act 2019, IT Act 2000, and GST Act 2017.</p>
        </div>
      </section>

      {/* ═══ Auth Modal (Login / Register) ═══ */}
    </>
  );
}
