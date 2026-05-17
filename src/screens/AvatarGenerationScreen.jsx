import { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { generateAvatar } from '../services/avatar.js';
import LoadingAura from '../components/LoadingAura.jsx';

/**
 * AvatarGenerationScreen
 * Posts the captured selfie to /api/generate-avatar, displays an ambient
 * loading aura, and routes to the Result screen on completion (success or
 * graceful failure with the error stored in context).
 *
 * The stage labels cycle to keep the user oriented during the 6–20s wait.
 */
const STAGES = [
  'READING FEATURES',
  'MAPPING IDENTITY',
  'RENDERING AVATAR',
  'POLISHING FRAME',
];

export default function AvatarGenerationScreen() {
  const { capture, setAvatar, goTo, SCREENS, setError, screen } = useApp();
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const startedRef = useRef(false);

  // Run the avatar generation exactly once when this screen activates.
  useEffect(() => {
    if (screen !== SCREENS.GENERATE) {
      startedRef.current = false;
      setProgress(0);
      setStage(0);
      return;
    }
    if (startedRef.current || !capture) return;
    startedRef.current = true;

    let cancelled = false;
    let progressTimer;
    let stageTimer;

    // simulated progress bar — real generation takes 6–20s; ease the UI
    progressTimer = setInterval(() => {
      setProgress((p) => (p < 92 ? p + (p < 70 ? 1.8 : 0.5) : p));
    }, 220);
    stageTimer = setInterval(() => {
      setStage((s) => (s + 1) % STAGES.length);
    }, 2200);

    (async () => {
      try {
        const result = await generateAvatar(capture, { identityLock: 0.75 });
        if (cancelled) return;
        setAvatar({
          imageDataUrl: result.imageDataUrl,
          identityScore: result.identityScore ?? 0.78,
          placeholder: !!result.placeholder,
        });
        setProgress(100);
        setTimeout(() => !cancelled && goTo(SCREENS.RESULT), 500);
      } catch (e) {
        console.error(e);
        if (cancelled) return;
        setError(e?.message || 'Avatar 생성에 문제가 있었어요.');
        setAvatar({ imageDataUrl: capture, identityScore: 1, placeholder: true, failed: true });
        goTo(SCREENS.RESULT);
      }
    })();

    return () => {
      cancelled = true;
      clearInterval(progressTimer);
      clearInterval(stageTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  return (
    <section className="s-generate">
      <LoadingAura label="EVE" />

      <h2 className="gen-title">Composing your mirror</h2>
      <p className="gen-sub">
        당신의 얼굴 신호를 읽어<br />
        조용히 정돈된 형태로 옮기는 중입니다.
      </p>

      <div className="gen-progress">
        <span style={{ width: `${Math.round(progress)}%` }} />
      </div>
      <div className="gen-stage">· {STAGES[stage]} ·</div>
    </section>
  );
}
