import { useState } from 'react';
import { useApp, SCREENS } from '../context/AppContext.jsx';
import { signInWithApple, signInWithGoogle, signInWithEmail } from '../services/auth.js';
import BrandMark from '../components/BrandMark.jsx';
import GlassButton from '../components/GlassButton.jsx';

/**
 * LoginScreen
 * Three sign-in options. Once authenticated, the user advances to camera capture.
 * The "ritual" tagline + frosted-glass pill matches the LAFENICE editorial tone.
 */
export default function LoginScreen() {
  const { goTo, setUser, SCREENS: S } = useApp();
  const [loading, setLoading] = useState(null);
  const [emailMode, setEmailMode] = useState(false);
  const [email, setEmail] = useState('');

  const handle = async (provider, fn) => {
    try {
      setLoading(provider);
      const user = await fn();
      setUser(user);
      goTo(S.CAMERA);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(null);
    }
  };

  return (
    <section className="s-login">
      <header className="login-mark">
        <BrandMark size="lg" glow />
        <div className="tag">
          Your private mirror for<br />
          face, cycle, and ritual
        </div>
        <div className="tagline-pill">— from 2050, for you</div>
      </header>

      <div className="login-block">
        <GlassButton
          variant="default"
          onClick={() => handle('apple', signInWithApple)}
          disabled={loading !== null}
          icon={
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.5 12.6c-.03-2.9 2.36-4.3 2.47-4.36-1.34-1.96-3.43-2.23-4.18-2.26-1.78-.18-3.47 1.05-4.37 1.05-.92 0-2.3-1.03-3.78-1-1.95.03-3.74 1.13-4.74 2.87-2.02 3.5-.52 8.68 1.45 11.53.96 1.4 2.1 2.96 3.59 2.9 1.45-.06 1.99-.93 3.74-.93 1.74 0 2.23.93 3.76.9 1.55-.03 2.54-1.42 3.49-2.83 1.1-1.62 1.55-3.19 1.58-3.27-.04-.02-3.03-1.17-3.06-4.64zM14.65 4.27c.8-.97 1.34-2.32 1.19-3.66-1.15.05-2.55.77-3.37 1.74-.74.86-1.39 2.24-1.21 3.55 1.28.1 2.59-.65 3.39-1.63z" />
            </svg>
          }
        >
          {loading === 'apple' ? 'Signing in…' : 'Continue with Apple'}
        </GlassButton>

        <GlassButton
          variant="default"
          onClick={() => handle('google', signInWithGoogle)}
          disabled={loading !== null}
          icon={
            <svg viewBox="0 0 24 24" aria-hidden>
              <path fill="#4285F4" d="M22.5 12.3c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.19 3.33v2.77h3.54c2.07-1.9 3.26-4.7 3.26-8.11z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.54-2.77c-.99.66-2.25 1.06-3.74 1.06-2.87 0-5.3-1.94-6.17-4.55H2.2v2.86A11 11 0 0 0 12 23z" />
              <path fill="#FBBC05" d="M5.83 14.08a6.6 6.6 0 0 1 0-4.21V7.02H2.2a11 11 0 0 0 0 9.92l3.63-2.86z" />
              <path fill="#EA4335" d="M12 4.75c1.62 0 3.07.56 4.21 1.65l3.15-3.15C17.45 1.46 14.97.5 12 .5A11 11 0 0 0 2.2 7l3.63 2.86C6.7 6.7 9.13 4.75 12 4.75z" />
            </svg>
          }
        >
          {loading === 'google' ? 'Signing in…' : 'Continue with Google'}
        </GlassButton>

        {!emailMode ? (
          <div className="login-or">
            or <a onClick={() => setEmailMode(true)}>sign in with email</a>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
            <input
              type="email"
              placeholder="you@lafenice.studio"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: '13px 18px',
                borderRadius: 999,
                border: '1px solid rgba(0,0,0,.1)',
                background: 'rgba(255,255,255,.7)',
                fontSize: 14,
                outline: 'none',
                width: '100%',
              }}
            />
            <GlassButton
              variant="dark"
              onClick={() => email && handle('email', () => signInWithEmail(email))}
              disabled={loading !== null || !/.+@.+\..+/.test(email)}
            >
              {loading === 'email' ? 'Sending link…' : 'Continue with Email'}
            </GlassButton>
          </div>
        )}
      </div>

      <div className="login-foot">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M9 7V5a3 3 0 0 1 6 0v2" />
        </svg>
        안전한 카메라 사용과 민감 정보 보호를 위해 최선을 다합니다.
      </div>
    </section>
  );
}
