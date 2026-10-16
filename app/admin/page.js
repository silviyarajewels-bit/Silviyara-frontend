'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IcError } from '@/lib/icons';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);

  // Pehle se logged in ho to seedha dashboard
  useEffect(() => {
    if (localStorage.getItem('Silviyara_admin_token')) router.replace('/admin/dashboard');
  }, [router]);

  const doLogin = async (e) => {
    e.preventDefault();
    setErr(false); setBusy(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('Silviyara_admin_token', data.token);
        router.push('/admin/dashboard');
      } else setErr(true);
    } catch { setErr(true); }
    setBusy(false);
  };

  return (
    <div className="admin-login-page">
      <div className="login-card">
      <h1 className="login-logo">Silviyara <span>Admin</span></h1>
      <p className="login-sub">Secure Access Only</p>
      <form onSubmit={doLogin}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text" className="form-input" placeholder="Silviyara_admin" required
            value={username} onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password" className="form-input" placeholder="••••••••" required
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-btn" disabled={busy}>
          {busy ? 'Signing in...' : 'Login to Dashboard'}
        </button>
        {err && (
          <div className="error-msg" style={{ display: 'block' }}>
            <IcError /> Wrong username or password
          </div>
        )}
      </form>
        <Link href="/" className="back-link">← Back to Website</Link>
      </div>
    </div>
  );
}
