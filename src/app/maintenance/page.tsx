'use client';

import { useState } from 'react';

export default function MaintenancePage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/maintenance-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        window.location.href = '/';
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data?.message || 'Ungültiges Passwort.');
      }
    } catch (err) {
      setError('Unerwarteter Fehler. Bitte erneut versuchen.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 420, border: '1px solid #e5e7eb', borderRadius: 12, padding: 24, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Wartungsmodus</h1>
        <p style={{ color: '#6b7280', marginBottom: 16 }}>
          Diese Webseite befindet sich aktuell in Wartung. Bitte geben Sie das Passwort ein, um fortzufahren.
        </p>
        <form onSubmit={onSubmit}>
          <label htmlFor="password" style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>
            Passwort
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passwort eingeben"
            aria-label="Passwort"
            required
            style={{
              width: '100%',
              border: '1px solid #d1d5db',
              borderRadius: 8,
              padding: '10px 12px',
              outline: 'none',
              marginBottom: 12,
            }}
          />
          {error ? (
            <div role="alert" style={{ color: '#b91c1c', marginBottom: 12 }}>
              {error}
            </div>
          ) : null}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: '#111827',
              color: 'white',
              padding: '10px 12px',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              opacity: loading ? 0.8 : 1,
            }}
          >
            {loading ? 'Prüfe…' : 'Freischalten'}
          </button>
        </form>
      </div>
    </div>
  );
}


