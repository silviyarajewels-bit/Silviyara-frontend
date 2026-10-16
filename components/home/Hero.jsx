'use client';

import Link from 'next/link';
import { IcFlash, IcSparkle } from '@/lib/icons';
import { useEffect, useState, useRef } from 'react';

/**
 * Particles client par hi banate hain — Math.random() server aur client par
 * alag value deta hai, jisse React hydration error dega.
 * Original: 25 particles, 40% silver tinted (index.html L1820–1836)
 */
function useParticles(count = 25) {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    setParticles(
      Array.from({ length: count }, () => ({
        size: Math.random() * 4 + 2,
        left: Math.random() * 100,
        duration: Math.random() * 12 + 8,
        delay: Math.random() * 10,
        silver: Math.random() > 0.6,
      }))
    );
  }, [count]);
  return particles;
}

// 0 se target tak count-up (original L1839: 0 → 2500, "+" ke saath)
function useCountUp(target, duration = 1600, start = false) {
  const [value, setValue] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration, start]);
  return value;
}

export default function Hero() {
  const particles = useParticles();
  const [started, setStarted] = useState(false);
  const customers = useCountUp(2500, 1800, started);
  const videoRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 400);
    return () => clearTimeout(t);
  }, []);

  // Video force-play — kuch browsers (iOS low power mode) autoplay block karte hain
  // (original L1853–1859)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  // Scroll parallax — video hero ke saath slow-scroll karta hai (original L1862–1871)
  useEffect(() => {
    const onScroll = () => {
      const hero = heroRef.current;
      const video = videoRef.current;
      if (!hero || !video) return;
      const rect = hero.getBoundingClientRect();
      if (rect.bottom > 0) {
        video.style.transform = `translateY(${-rect.top * 0.2}px) scale(1.05)`;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-video-bg">
        <video ref={videoRef} autoPlay muted loop playsInline poster="">
          <source src="/silver-bg.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="hero-gradient-overlay" />
      <div className="hero-noise" />

      <div className="hero-particles">
        {particles.map((p, i) => (
          <span
            key={i}
            className="hero-particle"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              ...(p.silver ? { background: 'rgba(138,138,154,0.3)' } : {}),
            }}
          />
        ))}
      </div>

      <div className="hero-glow" style={{ width: 300, height: 300, background: 'rgba(201,168,76,0.15)', top: '15%', right: '10%', animationDelay: '0s' }} />
      <div className="hero-glow" style={{ width: 200, height: 200, background: 'rgba(138,138,154,0.12)', bottom: '20%', left: '5%', animationDelay: '3s' }} />
      <div className="hero-glow" style={{ width: 150, height: 150, background: 'rgba(201,168,76,0.1)', top: '60%', right: '35%', animationDelay: '1.5s' }} />

      <div className="hero-content">
        <p className="hero-eyebrow">
          <span className="live-dot" />Pure Silver · Handcrafted in Lucknow
        </p>
        <h1>
          Wear Your<br />
          <span className="text-shimmer">Confidence.</span><br />
          Own Your <em>Glow.</em>
        </h1>
        <p className="hero-sub">
          Silver that speaks your vibe <IcSparkle /> — from everyday minimal to statement pieces, crafted for
          the bold, the elegant, and the unapologetically you.
        </p>

        <div className="hero-actions">
          <Link href="/shop" className="btn-primary">Shop the Drop ✦</Link>
          <Link href="/flash-sale" className="btn-outline"><IcFlash /> Flash Sale Live</Link>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-num">{customers.toLocaleString('en-IN')}+</div>
            <div className="hero-stat-label">Happy Customers</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">925</div>
            <div className="hero-stat-label">Sterling Silver</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">₹499+</div>
            <div className="hero-stat-label">Starting At</div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="hero-scroll-mouse" />
        <span className="hero-scroll-text">Scroll</span>
      </div>
    </section>
  );
}
