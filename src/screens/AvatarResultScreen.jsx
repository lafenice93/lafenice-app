import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import GlassButton from '../components/GlassButton.jsx';
import BackButton from '../components/BackButton.jsx';

/**
 * AvatarResultScreen
 * Displays the generated avatar with a breathing scale animation and a
 * subtle blink overlay. The three actions cover the v1 onboarding loop:
 *
 *   - Regenerate    → re-run the API call with a fresh seed
 *   - Continue      → advance to the next phase of onboarding
 *                     (today: TODO; hand-off point for cycle/birthdata flow)
 *   - Save Profile  → persist the avatar to the user's profile
 *                     (today: TODO; wire to /api/profile later)
 */
export default function AvatarResultScreen() {
  const { avatar, error, goTo, SCREENS, reset } = useApp();
  const [saved, setSaved] = useState(false);

  const handleContinue = () => {
    // TODO: route to the next onboarding step (Cycle setup, Lifestyle, etc.)
    // For now we restart the flow as a demo. Replace with goTo(SCREENS.CYCLE_SETUP).
    console.info('[continue] handing off to next onboarding step');
    reset();
  };

  const handleSave = () => {
    // TODO: POST { avatar.imageDataUrl, identityScore } to /api/profile
    console.info('[save] persisting avatar to profile (stub)');
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const handleRegenerate = () => {
    goTo(SCREENS.GENERATE);
  };

  const score = Math.round((avatar?.identityScore ?? 0.78) * 100);

  return (
    <section className="s-result">
      <BackButton onClick={() => goTo(SCREENS.CAMERA)} />

      <header className="result-head">
        <div className="label">EVE · 당신의 거울</div>
        <div className="title">Your luminous twin</div>
        <div className="sub">정중하게 정돈된, 당신만의 인터페이스</div>
      </header>

      <div className="avatar-stage">
        <svg className="avatar-circuits" viewBox="0 0 360 360" fill="none" stroke="rgba(255,235,200,.7)" strokeWidth="1" aria-hidden>
          <circle cx="180" cy="180" r="150" strokeOpacity=".4" />
          <circle cx="180" cy="180" r="172" strokeOpacity=".25" />
          <path d="M30 180 H78 L86 172 H110 L120 180 H144" />
          <path d="M330 180 H282 L274 188 H250 L240 180 H216" />
          <path d="M60 240 H100 L108 230" />
          <path d="M300 130 H260 L252 140" />
          <circle cx="78" cy="180" r="3" fill="rgba(255,235,200,.95)" />
          <circle cx="282" cy="180" r="3" fill="rgba(255,235,200,.95)" />
          <circle cx="100" cy="240" r="2" fill="rgba(255,235,200,.95)" />
          <circle cx="260" cy="130" r="2" fill="rgba(255,235,200,.95)" />
        </svg>

        <div className="avatar-portrait">
          {avatar?.imageDataUrl ? (
            <img src={avatar.imageDataUrl} alt="Your AI avatar" />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              background: 'linear-gradient(160deg, #f0d8b8, #d4b88c)',
            }} />
          )}
          <div className="avatar-blink" />
        </div>
        <div className="avatar-halo" />
        <div className="identity-pill">
          IDENTITY · {score}%
        </div>
      </div>

      {(error || avatar?.placeholder) && (
        <div className="error-card">
          {avatar?.failed ? (
            <>아바타 생성에 실패했어요. <b>다시 시도해주세요.</b></>
          ) : avatar?.placeholder ? (
            <>현재 <b>데모 모드</b>입니다. <code style={{ fontFamily: 'inherit' }}>OPENAI_API_KEY</code>가 설정되면 실제 아바타가 생성됩니다.</>
          ) : (
            error
          )}
        </div>
      )}

      <div className="result-actions">
        <GlassButton variant="outline" onClick={handleRegenerate}>
          ↺ Regenerate
        </GlassButton>
        <GlassButton variant="gold" onClick={handleContinue}>
          Continue →
        </GlassButton>
        <GlassButton variant="ghost" onClick={handleSave}>
          {saved ? '✓ Saved' : '♡ Save Profile'}
        </GlassButton>
      </div>
    </section>
  );
}
