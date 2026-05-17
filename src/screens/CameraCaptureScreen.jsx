import { useEffect } from 'react';
import { useApp } from '../context/AppContext.jsx';
import useCamera from '../hooks/useCamera.js';
import ScanOverlay from '../components/ScanOverlay.jsx';
import BackButton from '../components/BackButton.jsx';
import GlassButton from '../components/GlassButton.jsx';

/**
 * CameraCaptureScreen
 * Opens the front-facing camera, overlays the mint scan UI, and captures
 * a JPEG of the user's face on shutter tap. The dataURL is stored in
 * AppContext so the next screen can send it to /api/generate-avatar.
 *
 * Permission flow:
 *   1. status==='idle'      → show a polite request card
 *   2. status==='requesting'→ briefly while the prompt is open
 *   3. status==='active'    → live preview + scan overlay
 *   4. status==='denied'    → guidance card with a retry button
 */
export default function CameraCaptureScreen() {
  const { goTo, SCREENS, setCapture, screen } = useApp();
  const { videoRef, status, error, start, stop, capture } = useCamera();

  // auto-start when user lands here; cleanup when leaving
  useEffect(() => {
    if (screen === SCREENS.CAMERA && status === 'idle') start();
    return () => {
      if (screen !== SCREENS.CAMERA) stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  const onCapture = () => {
    const dataUrl = capture();
    if (!dataUrl) return;
    setCapture(dataUrl);
    stop();
    goTo(SCREENS.GENERATE);
  };

  return (
    <section className="s-camera">
      <BackButton onClick={() => { stop(); goTo(SCREENS.LOGIN); }} />

      {status === 'active' ? (
        <>
          <div className="camera-stage">
            <video ref={videoRef} playsInline muted autoPlay />
          </div>
          <ScanOverlay />
          <div className="scan-foot">
            <div className="cam-hint">정면을 가이드 안에 맞춰주세요</div>
            <button className="shutter" onClick={onCapture} aria-label="Capture" />
          </div>
        </>
      ) : (
        <div className="camera-stage permission-required">
          <div className="perm-card">
            <div className="ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4 7h4l2-3h4l2 3h4v13H4z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
            <h3 className="h">Mirror access</h3>
            <p className="d">
              {status === 'denied' || status === 'error'
                ? '카메라 권한이 차단되어 있어요. 브라우저 주소창의 카메라 아이콘에서 권한을 허용해주세요.'
                : '얼굴을 정중하게 읽기 위해 전면 카메라에 잠깐 접근할게요. 이미지는 분석 직후 폐기됩니다.'}
            </p>
            <GlassButton variant="dark" onClick={start} disabled={status === 'requesting'}>
              {status === 'requesting' ? '카메라 여는 중…' : '카메라 허용'}
            </GlassButton>
            {error && status === 'error' && (
              <div style={{ marginTop: 14, fontSize: 11, color: '#FFB4B4', opacity: .85 }}>
                {error}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
