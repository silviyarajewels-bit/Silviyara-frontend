'use client';

import { useState, useEffect } from 'react';
import { useUI } from '@/context/UIContext';
import { useAuth } from '@/context/AuthContext';
import { IcCheck, IcClose } from '@/lib/icons';

export default function AuthModal() {
  const { authOpen, setAuthOpen, authMode, setAuthMode } = useUI();
  const { login, register } = useAuth();

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [regForm, setRegForm] = useState({ name: '', phone: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const [ok, setOk] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (authOpen) { setErr(''); setOk(''); }
  }, [authOpen, authMode]);

  const close = () => setAuthOpen(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr(''); setBusy(true);
    try {
      const data = await login(loginForm.email, loginForm.password);
      if (data.success) close();
      else setErr(data.msg || 'Login failed');
    } catch {
      setErr('Could not reach the server. Please try again.');
    }
    setBusy(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr(''); setOk(''); setBusy(true);
    try {
      const data = await register(regForm.name, regForm.email, regForm.phone, regForm.password);
      if (data.success) {
        setOk('Account created! Signing you in...');
        setTimeout(close, 900);
      } else setErr(data.msg || 'Registration failed');
    } catch {
      setErr('Could not reach the server. Please try again.');
    }
    setBusy(false);
  };

  return (
    <div
      className={`auth-modal-overlay ${authOpen ? 'open' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div className="auth-modal">
        <div className="auth-modal-stripe">
          <button className="auth-modal-close" onClick={close} aria-label="Close"><IcClose /></button>
          <p className="auth-modal-eyebrow">✦ Silviyara Jewels</p>
          <h2 className="auth-modal-title">
            {authMode === 'login' ? <>Welcome <em>back.</em></> : <>Join the <em>family.</em></>}
          </h2>
        </div>

        <div className="auth-tabs">
          <div
            className={`auth-tab ${authMode === 'login' ? 'active' : ''}`}
            onClick={() => setAuthMode('login')}
          >
            Sign In
          </div>
          <div
            className={`auth-tab ${authMode === 'register' ? 'active' : ''}`}
            onClick={() => setAuthMode('register')}
          >
            Create Account
          </div>
        </div>

        <div className="auth-form-body">
          <form
            className={`auth-form ${authMode === 'login' ? 'active' : ''}`}
            onSubmit={handleLogin}
          >
            <div className="auth-form-group">
              <label>Email Address</label>
              <input
                type="email" className="auth-input" placeholder="you@example.com" required
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              />
            </div>
            <div className="auth-form-group">
              <label>Password</label>
              <input
                type="password" className="auth-input" placeholder="••••••••" required
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              />
            </div>
            <button type="submit" className="btn-auth" disabled={busy}>
              {busy ? 'Signing in...' : 'Sign In →'}
            </button>
            {err && authMode === 'login' && (
              <p className="auth-err" style={{ display: 'block' }}>{err}</p>
            )}
          </form>

          <form
            className={`auth-form ${authMode === 'register' ? 'active' : ''}`}
            onSubmit={handleRegister}
          >
            <div className="auth-form-group">
              <label>Full Name</label>
              <input
                type="text" className="auth-input" placeholder="Aditi Sharma" required
                value={regForm.name}
                onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
              />
            </div>
            <div className="auth-form-row">
              <div className="auth-form-group">
                <label>Mobile Number</label>
                <input
                  type="tel" className="auth-input" placeholder="9876543210" required
                  value={regForm.phone}
                  onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                />
              </div>
              <div className="auth-form-group">
                <label>Email Address</label>
                <input
                  type="email" className="auth-input" placeholder="you@email.com" required
                  value={regForm.email}
                  onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                />
              </div>
            </div>
            <div className="auth-form-group">
              <label>Password (min 6 chars)</label>
              <input
                type="password" className="auth-input" placeholder="••••••••" required minLength={6}
                value={regForm.password}
                onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
              />
            </div>
            <button type="submit" className="btn-auth" disabled={busy}>
              {busy ? 'Creating...' : 'Create Account →'}
            </button>
            {err && authMode === 'register' && (
              <p className="auth-err" style={{ display: 'block' }}>{err}</p>
            )}
            {ok && <p className="auth-ok" style={{ display: 'block' }}><IcCheck /> {ok}</p>}
          </form>
        </div>

        <div className="auth-footer">
          By continuing you agree to our <a href="/privacy-policy">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}
