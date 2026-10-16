'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useUI } from '@/context/UIContext';
import {
  IcDesign, IcLock, IcEdit, IcExpert, IcDiamond, IcClock,
  IcUpload, IcImage, IcFile, IcClose, IcSuccess, IcError,
} from '@/lib/icons';

const MAX_MB = 10;
const ACCEPT = '.jpg,.jpeg,.png,.webp,.svg,.pdf,.dwg,.dxf,.step,.stp,.igs,.iges';

const fmtSize = (b) =>
  b < 1024 * 1024 ? `${(b / 1024).toFixed(0)} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`;

export default function CustomDesignPage() {
  const { user, token, isLoggedIn } = useAuth();
  const { openAuth } = useUI();
  const fileRef = useRef(null);

  const [form, setForm] = useState({ phone: '', title: '', desc: '' });
  const [file, setFile] = useState(null);
  const [fileB64, setFileB64] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState('');
  const [subs, setSubs] = useState(null);

  const loadSubs = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/custom-design/my', { headers: { 'x-auth-token': token } });
      const data = await res.json();
      setSubs(Array.isArray(data) ? data : []);
    } catch { setSubs([]); }
  }, [token]);

  useEffect(() => { loadSubs(); }, [loadSubs]);

  const pickFile = (f) => {
    if (!f) return;
    if (f.size > MAX_MB * 1024 * 1024) { setErr(`File size must be under ${MAX_MB}MB`); return; }
    setErr('');
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setFileB64(e.target.result);
    reader.readAsDataURL(f);
  };

  const removeFile = () => {
    setFile(null); setFileB64('');
    if (fileRef.current) fileRef.current.value = '';
  };

  const submit = async (e) => {
    e.preventDefault();
    setErr(''); setOk(false);
    if (!form.title.trim()) { setErr('Please enter a design title'); return; }
    if (!fileB64) { setErr('Please upload a design file'); return; }

    setBusy(true);
    try {
      const res = await fetch('/api/custom-design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
        body: JSON.stringify({
          designTitle: form.title,
          description: form.desc,
          fileName: file?.name,
          fileType: file?.type,
          fileData: fileB64,
          customerName: user?.name,
          customerEmail: user?.email,
          customerPhone: form.phone || user?.phone || '',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setOk(true);
        setForm({ phone: form.phone, title: '', desc: '' });
        removeFile();
        loadSubs();
        setTimeout(() => setOk(false), 8000);
      } else setErr(data.msg || 'Could not submit your design. Please try again.');
    } catch { setErr('Could not reach the server. Please try again.'); }
    setBusy(false);
  };

  return (
    <>
      <section className="cd-hero">
        <div className="cd-hero-glow" />
        <div className="cd-hero-glow2" />
        <span className="cd-hero-icon"><IcDesign /></span>
        <p className="section-label">✦ Bespoke Creations</p>
        <h1>Imagine It.<br />We&apos;ll <em>Craft It.</em></h1>
        <p>
          Have a unique jewellery design in mind? Share your vision with us and our master craftsmen
          will bring it to life in pure 925 sterling silver.
        </p>
      </section>

      {!isLoggedIn ? (
        <div className="login-gate" style={{ display: 'block' }}>
          <span className="login-gate-icon"><IcLock /></span>
          <h2>Sign In to Continue</h2>
          <p>
            To submit a custom design request, please sign in to your Silviyara account first. This
            helps us keep you updated on your submission status.
          </p>
          <button className="btn-login-gate" onClick={() => openAuth('login')}>
            Sign In / Create Account
          </button>
        </div>
      ) : (
        <div className="cd-main" style={{ display: 'block' }}>
          <div className="cd-info-grid">
            <div className="cd-info-card">
              <span className="cd-info-icon"><IcEdit /></span>
              <h3 className="cd-info-title">Upload Your Design</h3>
              <p className="cd-info-text">Share a sketch, photograph, or professional CAD file of your dream jewellery piece.</p>
            </div>
            <div className="cd-info-card">
              <span className="cd-info-icon"><IcExpert /></span>
              <h3 className="cd-info-title">Expert Review</h3>
              <p className="cd-info-text">Our artisans carefully evaluate your design for feasibility and craftsmanship within 5–7 business days.</p>
            </div>
            <div className="cd-info-card">
              <span className="cd-info-icon"><IcDiamond /></span>
              <h3 className="cd-info-title">Brought to Life</h3>
              <p className="cd-info-text">Once accepted, we&apos;ll craft your piece in 925 sterling silver and deliver it with love.</p>
            </div>
          </div>

          <div className="cd-notice">
            <span className="cd-notice-icon">✦</span>
            <p className="cd-notice-text">
              <strong>Acceptance Policy:</strong> Our artisans carefully evaluate every submission. If
              your design is feasible to craft in sterling silver, we&apos;ll happily accept and begin
              working on it. If a design isn&apos;t possible due to technical constraints, we&apos;ll kindly
              let you know with an explanation. We truly appreciate your creativity and understanding!
            </p>
          </div>
          <div className="cd-notice">
            <span className="cd-notice-icon"><IcClock /></span>
            <p className="cd-notice-text">
              <strong>Processing Time:</strong> Once submitted, please allow{' '}
              <strong>5–7 business days</strong> for our team to review your design and get back to
              you with an update. We&apos;ll notify you of the status right here on this page.
            </p>
          </div>

          <div className="cd-form-section">
            <h2>Submit Your Design</h2>
            <p>
              Fill in the details below and upload your design file. We accept images (JPG, PNG,
              WebP, SVG) and CAD files (PDF, DWG, DXF, STEP, IGES).
            </p>

            <form className="cd-form" onSubmit={submit}>
              <div className="cd-form-row">
                <div className="cd-form-group">
                  <label>Your Name</label>
                  <input type="text" className="cd-form-input" value={user?.name || ''} readOnly />
                </div>
                <div className="cd-form-group">
                  <label>Email Address</label>
                  <input type="email" className="cd-form-input" value={user?.email || ''} readOnly />
                </div>
              </div>

              <div className="cd-form-row">
                <div className="cd-form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel" className="cd-form-input" placeholder="9876543210"
                    value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div className="cd-form-group">
                  <label>Design Title *</label>
                  <input
                    type="text" className="cd-form-input" required
                    placeholder="e.g. Lotus Pendant, Custom Ring"
                    value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                </div>
              </div>

              <div className="cd-form-group">
                <label>Description / Notes</label>
                <textarea
                  className="cd-form-input"
                  placeholder="Tell us about your design — dimensions, style preferences, any special requirements..."
                  value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })}
                />
              </div>

              <div className="cd-form-group">
                <label>Upload Design File *</label>
                <div
                  className={`cd-file-drop ${dragOver ? 'dragover' : ''}`}
                  onClick={() => fileRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => { e.preventDefault(); setDragOver(false); pickFile(e.dataTransfer.files[0]); }}
                >
                  <span className="cd-file-drop-icon"><IcUpload /></span>
                  <p className="cd-file-drop-text">Click to browse or drag &amp; drop your file here</p>
                  <p className="cd-file-drop-sub">
                    Images: JPG, PNG, WebP, SVG • CAD: PDF, DWG, DXF, STEP, IGES • Max {MAX_MB}MB
                  </p>
                  <input
                    ref={fileRef} type="file" accept={ACCEPT}
                    onChange={(e) => pickFile(e.target.files[0])}
                  />
                </div>

                {file && (
                  <div className="cd-file-preview" style={{ display: 'flex' }}>
                    <span className="cd-file-preview-icon">
                      {file.type.startsWith('image/') ? <IcImage /> : <IcFile />}
                    </span>
                    <div className="cd-file-preview-info">
                      <div className="cd-file-preview-name">{file.name}</div>
                      <div className="cd-file-preview-size">{fmtSize(file.size)}</div>
                    </div>
                    <button type="button" className="cd-file-preview-remove" onClick={removeFile} aria-label="Remove file"><IcClose /></button>
                  </div>
                )}
              </div>

              <button type="submit" className="cd-submit-btn" disabled={busy}>
                {busy ? 'Submitting...' : 'Submit Design Request →'}
              </button>

              {ok && (
                <div className="cd-success-msg" style={{ display: 'block' }}>
                  ✦ Your design has been submitted successfully! We&apos;ll review it within 5–7 business days.
                </div>
              )}
              {err && <div className="cd-error-msg" style={{ display: 'block' }}>{err}</div>}
            </form>
          </div>

          <div className="cd-submissions">
            <h2>My Submissions</h2>
            {subs === null ? (
              <div className="cd-sub-empty">Loading your submissions...</div>
            ) : subs.length === 0 ? (
              <div className="cd-sub-empty">
                You haven&apos;t submitted any custom designs yet. Use the form above to submit your first one!
              </div>
            ) : (
              subs.map((d) => {
                const Icon = d.status === 'Accepted' ? IcSuccess : d.status === 'Rejected' ? IcError : IcClock;
                const date = new Date(d.createdAt).toLocaleDateString('en-IN', {
                  day: '2-digit', month: 'short', year: 'numeric',
                });
                return (
                  <div className="cd-sub-card" key={d._id}>
                    <div className="cd-sub-icon"><Icon /></div>
                    <div className="cd-sub-info">
                      <div className="cd-sub-title">{d.designTitle}</div>
                      <div className="cd-sub-date">
                        Submitted on {date} • {d.fileName || 'File attached'}
                      </div>
                      {d.adminNote && <p className="cd-sub-note">&quot;{d.adminNote}&quot;</p>}
                    </div>
                    <div className={`cd-sub-status ${String(d.status).toLowerCase()}`}>{d.status}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </>
  );
}
