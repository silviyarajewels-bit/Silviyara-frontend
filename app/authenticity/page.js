import { IcAward } from '@/lib/icons';
export const metadata = {
  title: 'Authenticity Guarantee — Silviyara Jewels',
  description: 'Every Silviyara piece is hallmarked 925 sterling silver.',
};

export default function Page() {
  return (
    <>
      <section className="about-hero" style={{ paddingBottom: '40px' }}>
        <p className="section-label">✦ Silviyara Jewels</p>
        <h1>Authenticity <em>Guarantee</em></h1>
        <p style={{ maxWidth: '600px', margin: '1rem auto 0', color: 'var(--text2)', fontSize: '0.95rem', lineHeight: '1.8' }}>Every piece sold by SILVIYARA is authentic — we put our name on it.</p>
      </section>

      <section className="story-section" style={{ paddingTop: '60px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--card)', border: '1px solid var(--border)', padding: '40px' }}>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>1</span> Our guarantee</h3>
          <div style={{ background: 'rgba(39,174,96,0.08)', border: '1px solid rgba(39,174,96,0.2)', padding: '12px 16px', margin: '0 0 1.5rem 32px' }}>
            <p style={{ fontSize: '0.88rem', color: '#27ae60', lineHeight: '1.7' }}><IcAward /> <strong>100% authentic guarantee.</strong> If any SILVIYARA product is found to be not as described in terms of metal purity — we will refund 2x the product value.</p>
          </div>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>2</span> Silver products</h3>
          <div style={{ paddingLeft: '32px', margin: '8px 0 12px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '100px', fontSize: '12px', fontWeight: '500', marginRight: '6px', marginBottom: '4px', background: 'rgba(39,174,96,0.1)', color: '#27ae60' }}>925 Sterling Silver</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '100px', fontSize: '12px', fontWeight: '500', marginRight: '6px', marginBottom: '4px', background: 'rgba(39,174,96,0.1)', color: '#27ae60' }}>Anti-tarnish treated</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '100px', fontSize: '12px', fontWeight: '500', marginRight: '6px', marginBottom: '4px', background: 'rgba(39,174,96,0.1)', color: '#27ae60' }}>Hallmark certified</span>
          </div>
          <ul style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '1.5rem', paddingLeft: '32px' }}>
            <li>All silver products are 925 sterling silver (92.5% pure silver)</li>
            <li>BIS Hallmark certification on eligible products</li>
            <li>Anti-tarnish coating for long-lasting shine</li>
            <li>Purity certificate included with every purchase</li>
          </ul>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>3</span> Gold products</h3>
          <div style={{ paddingLeft: '32px', margin: '8px 0 12px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '100px', fontSize: '12px', fontWeight: '500', marginRight: '6px', marginBottom: '4px', background: 'rgba(243,156,18,0.1)', color: '#e67e22' }}>14K / 18K / 22K</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '100px', fontSize: '12px', fontWeight: '500', marginRight: '6px', marginBottom: '4px', background: 'rgba(39,174,96,0.1)', color: '#27ae60' }}>BIS Hallmarked</span>
          </div>
          <ul style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '1.5rem', paddingLeft: '32px' }}>
            <li>All gold products are BIS hallmarked as per Government of India regulations</li>
            <li>Purity clearly mentioned on each product listing (14K / 18K / 22K)</li>
            <li>Karat and weight mentioned on all gold invoices</li>
          </ul>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>4</span> Gemstones</h3>
          <ul style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '1.5rem', paddingLeft: '32px' }}>
            <li>Natural gemstones are mentioned as "natural" with origin details</li>
            <li>Lab-grown stones are clearly labelled as "lab-grown" or "simulated"</li>
            <li>We do not misrepresent any stone as natural when it is synthetic</li>
          </ul>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg2)', color: 'var(--gold)', fontSize: '12px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>5</span> How to verify</h3>
          <ul style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '1.5rem', paddingLeft: '32px' }}>
            <li>Each product comes with a purity card and our stamp</li>
            <li>You can verify silver purity at any local jeweller with acid test</li>
            <li>For gold — BIS Hallmark number can be verified on BIS Care app</li>
            <li>Any doubt? Send us photos — we will arrange a third-party verification</li>
          </ul>

          <div style={{ height: '1px', background: 'var(--border)', margin: '2rem 0' }}></div>
          <p style={{ fontSize: '12px', color: 'var(--silver)', textAlign: 'center' }}>SILVIYARA · M/s SILVIYARA Partnership Firm · MSME Reg. UDYAM-UP-50-0270342 · Lucknow, UP 226022</p>
        </div>
      </section>

      {/* ═══ Auth Modal (Login / Register) ═══ */}
    </>
  );
}
