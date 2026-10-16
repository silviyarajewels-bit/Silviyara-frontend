import { IcSuccess, IcError } from '@/lib/icons';
export const metadata = {
  title: 'Care Instructions — Silviyara Jewels',
  description: 'How to keep your 925 sterling silver jewellery shining.',
};

export default function Page() {
  return (
    <>
      <section className="about-hero" style={{ paddingBottom: '40px' }}>
        <p className="section-label">✦ Silviyara Jewels</p>
        <h1>Care <em>Instructions</em></h1>
      </section>

      <section className="story-section" style={{ paddingTop: '60px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--card)', border: '1px solid var(--border)', padding: '40px' }}>
          <h2 style={{ fontFamily: '\'Playfair Display\',serif', fontSize: '2rem', marginBottom: '1rem', fontWeight: '400' }}>Caring for Sterling Silver</h2>
          <p style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '2rem' }}>With the right care, your 925 sterling silver jewellery will retain its brilliance for generations.</p>
    
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '2rem' }}>
            <div style={{ background: 'var(--bg2)', padding: '20px', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}><IcSuccess /> Do&apos;s</h3>
              <ul style={{ color: 'var(--text2)', paddingLeft: '20px', lineHeight: '1.6' }}>
                <li>Store in anti-tarnish pouches or separate compartments.</li>
                <li>Clean gently with mild soap and water.</li>
                <li>Use a silver polishing cloth to restore shine.</li>
                <li>Wear it often — natural oils keep silver shining!</li>
              </ul>
            </div>
            <div style={{ background: 'var(--bg2)', padding: '20px', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}><IcError /> Don&apos;ts</h3>
              <ul style={{ color: 'var(--text2)', paddingLeft: '20px', lineHeight: '1.6' }}>
                <li>Avoid exposure to harsh chemicals or bleach.</li>
                <li>Keep away from perfumes, lotions, and hairspray.</li>
                <li>Remove before swimming in pools (chlorine) or oceans.</li>
                <li>Avoid sleeping in delicate pieces.</li>
              </ul>
            </div>
          </div>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', marginTop: '2rem' }}>Tarnish Prevention</h3>
          <p style={{ color: 'var(--text2)', lineHeight: '1.8', marginBottom: '1.5rem' }}>Silver naturally tarnishes when exposed to air and humidity. Keep your pieces in an airtight zip-lock bag when not in use. If severe tarnishing occurs, professional cleaning is recommended.</p>
        </div>
      </section>

      {/* ═══ Auth Modal (Login / Register) ═══ */}
    </>
  );
}
