import { useEffect, useState } from 'react';
import { SCREENS } from '../constants/screens.js';
import { useApp } from '../context/AppContext.jsx';
import ScreenFrame from '../components/ScreenFrame.jsx';

const CHIPS = ['눈썹', '눈', '입술', '윤곽', '피부결'];

export default function FaceCaptureScreen({ isActive = false }) {
  const { goTo, screen } = useApp();
  const [pct, setPct] = useState(68);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    if (screen !== SCREENS.FACE) return undefined;
    const id = setInterval(() => {
      setPct((p) => {
        let next = p + dir * 0.6;
        if (next >= 96) {
          setDir(-1);
          next = 96;
        }
        if (next <= 60) {
          setDir(1);
          next = 60;
        }
        return next;
      });
    }, 80);
    return () => clearInterval(id);
  }, [screen, dir]);

  const rounded = Math.round(pct);
  const chipState = (i) => {
    if (rounded > 92) return 'done';
    if (rounded < 65) {
      if (i < 3) return 'done';
      if (i === 3) return 'scanning';
    }
    if (i < 3) return 'done';
    if (i === 3) return 'scanning';
    return '';
  };

  return (
    <ScreenFrame className="s-face" isActive={isActive}>
      <div className="scr-pad" style={{ paddingTop: 60 }}>
        <div className="face-head">
          <div className="word">LAFENICE</div>
          <div className="ko">얼굴 캡처</div>
        </div>
        <div className="face-progress-bar">
          <span style={{ width: '75%' }} />
        </div>
        <div className="face-step">Step 3 of 4</div>

        <div className="face-viewport">
          <div className="face-img" />
          <div className="scan-overlay" aria-hidden />
          <div className="face-label">랜드마크 인식</div>
        </div>

        <div className="face-card">
          <p className="desc">
            얼굴의 비율, 결, 시그널을
            <br />
            정밀하게 읽고 있습니다.
          </p>
          <div className="chips">
            {CHIPS.map((label, i) => (
              <div key={label} className={`chip ${chipState(i)}`.trim()}>
                {(chipState(i) === 'done' || chipState(i) === 'scanning') && (
                  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    {chipState(i) === 'done' ? (
                      <path d="M2 8l3 3 7-7" />
                    ) : (
                      <circle cx="7" cy="7" r="3" fill="currentColor" />
                    )}
                  </svg>
                )}{' '}
                {label}
              </div>
            ))}
          </div>
          <div className="mini-progress">
            <div className="pct">{rounded}%</div>
            <span style={{ width: `${rounded}%` }} />
          </div>
        </div>

        <button type="button" className="cta-mapping" onClick={() => goTo(SCREENS.CYCLE)}>
          <div className="spinner" aria-hidden />
          아바타 매핑 중…
        </button>
      </div>
    </ScreenFrame>
  );
}
