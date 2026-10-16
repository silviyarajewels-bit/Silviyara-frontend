'use client';

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { IcFlash, IcSun, IcMoon } from '@/lib/icons';

// track.html ka simplified nav — logo + 3 links + theme toggle
export default function MinimalNav() {
  const { theme, toggleTheme, mounted } = useTheme();
  return (
    <nav className="no-banner">
      <Link href="/" className="logo">Silviyara <span>Jewels</span></Link>
      <div className="nav-links">
        <Link href="/shop">Shop</Link>
        <Link href="/flash-sale">Sale <IcFlash /></Link>
        <Link href="/about">About</Link>
        <button className="theme-toggle" onClick={toggleTheme}>
          {mounted && theme === 'dark' ? <IcSun /> : <IcMoon />}
        </button>
      </div>
    </nav>
  );
}
