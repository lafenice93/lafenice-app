import { useEffect } from 'react';
import { SCREENS } from '../constants/screens.js';
import { useApp } from '../context/AppContext.jsx';

export default function SplashScreen({ isActive = false }) {
  const { goTo } = useApp();

  useEffect(() => {
    const t = setTimeout(() => goTo(SCREENS.SIGN_IN), 3200);
    return () => clearTimeout(t);
  }, [goTo]);

  return (
    <div
      className={`scr s-splash${isActive ? ' active' : ''}`}
      role="button"
      tabIndex={0}
      onClick={() => goTo(SCREENS.SIGN_IN)}
      onKeyDown={(e) => e.key === 'Enter' && goTo(SCREENS.SIGN_IN)}
    >
      <div className="splash-inner">
        <div className="splash-aura" aria-hidden />
        <div className="splash-wordmark">LAFENICE</div>
        <p className="splash-tag">
          Your private mirror for
          <br />
          face, cycle, and ritual.
        </p>
        <svg className="splash-wave" width="220" height="36" viewBox="0 0 220 36" fill="none" aria-hidden>
          <path
            d="M2 18 Q 30 18 50 18 T 90 10 Q 100 4 110 18 Q 120 32 130 22 T 170 18 Q 190 18 218 18"
            stroke="#7FD9B8"
            strokeWidth="1.3"
            fill="none"
            strokeLinecap="round"
            opacity=".85"
          />
          <g transform="translate(105 12)">
            <rect width="2" height="12" rx="1" fill="#5BB098" />
            <rect x="3" y="-2" width="2" height="16" rx="1" fill="#7FD9B8" />
            <rect x="6" y="2" width="2" height="8" rx="1" fill="#5BB098" />
            <rect x="9" y="-3" width="2" height="18" rx="1" fill="#7FD9B8" />
            <rect x="12" y="0" width="2" height="12" rx="1" fill="#5BB098" />
          </g>
        </svg>
        <div className="splash-progress">
          <span />
        </div>
        <p className="splash-foot-ko">당신의 오늘을, 가장 조용한 방식으로 읽어드립니다.</p>
      </div>
    </div>
  );
}
