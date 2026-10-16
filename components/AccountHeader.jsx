'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

// account.html ka apna simplified header
export default function AccountHeader() {
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <header style={{
      padding: '1rem 5%', borderBottom: '1px solid var(--border)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: 'var(--nav-bg)', backdropFilter: 'blur(10px)',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <Link href="/" className="logo">Silviyara Jewels</Link>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link href="/shop" style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '0.9rem' }}>
          Shop
        </Link>
        <a
          href="#"
          style={{ color: 'var(--text2)', textDecoration: 'none', fontSize: '0.9rem' }}
          onClick={(e) => { e.preventDefault(); logout(); router.push('/'); }}
        >
          Logout
        </a>
      </div>
    </header>
  );
}
