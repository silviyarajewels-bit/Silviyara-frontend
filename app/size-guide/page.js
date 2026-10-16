export const metadata = {
  title: 'Size Guide — Silviyara Jewels',
  description: 'Find your perfect ring, anklet and bracelet size.',
};

export default function Page() {
  return (
    <>
      <section className="about-hero" style={{ paddingBottom: '40px' }}>
        <p className="section-label">✦ Silviyara Jewels</p>
        <h1>Size <em>Guide</em></h1>
      </section>

      <section className="story-section" style={{ paddingTop: '60px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--card)', border: '1px solid var(--border)', padding: '40px' }}>
          <h2 style={{ fontFamily: '\'Playfair Display\',serif', fontSize: '2rem', marginBottom: '1rem', fontWeight: '400' }}>Find Your Perfect Fit</h2>
    
          <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', marginTop: '2rem', fontFamily: '\'Playfair Display\',serif' }}>Ring Sizing</h3>
          <p style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '1rem' }}>Measure the circumference of your finger using a string, then check our chart.</p>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem', textAlign: 'left' }}>
            <tbody>
            <tr style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '12px', fontWeight: '500' }}>Indian Size</th>
              <th style={{ padding: '12px', fontWeight: '500' }}>Circumference (mm)</th>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '12px' }}>10</td><td style={{ padding: '12px' }}>50 mm</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '12px' }}>12</td><td style={{ padding: '12px' }}>52 mm</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '12px' }}>14</td><td style={{ padding: '12px' }}>54 mm</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '12px' }}>16</td><td style={{ padding: '12px' }}>56 mm</td>
            </tr>
          </tbody>
          </table>

          <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', marginTop: '2rem', fontFamily: '\'Playfair Display\',serif' }}>Necklace Lengths</h3>
          <ul style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '1.5rem', paddingLeft: '20px' }}>
            <li><strong>14" Choker:</strong> Wraps closely around the neck.</li>
            <li><strong>16" Collar:</strong> Rests perfectly around the base of the neck.</li>
            <li><strong>18" Princess:</strong> Falls just below the throat at the collarbone.</li>
            <li><strong>20" Matinee:</strong> Sits nicely on the collarbone.</li>
          </ul>

          <div style={{ background: 'var(--bg2)', padding: '20px', border: '1px solid var(--border)', textAlign: 'center', marginTop: '2rem' }}>
            <p style={{ marginBottom: '1rem', color: 'var(--text2)' }}>Still unsure about your size? We're here to help.</p>
            <a href="https://wa.me/918004703038" target="_blank" className="btn-primary" style={{ textDecoration: 'none' }}>Chat on WhatsApp</a>
          </div>
        </div>
      </section>

      {/* ═══ Auth Modal (Login / Register) ═══ */}
    </>
  );
}
