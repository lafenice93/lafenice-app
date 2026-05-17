import { SCREENS } from '../constants/screens.js';
import { useApp } from '../context/AppContext.jsx';
import ScreenFrame from '../components/ScreenFrame.jsx';

export default function CycleScreen({ isActive = false }) {
  const { goTo } = useApp();

  return (
    <ScreenFrame className="s-cycle" isActive={isActive}>
      <div className="scr-pad" style={{ paddingTop: 60 }}>
        <div className="cycle-head">Cycle</div>

        <div className="cycle-orb-wrap">
          <div className="cycle-orb-bg" aria-hidden />
          <div className="cycle-orb-tick" aria-hidden />
          <div className="cycle-orb">
            <div className="day">Cycle Day 14 ·</div>
            <div className="phase">Ovulation</div>
            <div className="mood">(calm)</div>
          </div>
        </div>

        <div className="cycle-advice">
          <div className="ko">
            오늘은 과한 자극보다 리듬을 지켜주는
            <br />
            선택이 더 좋아요.
          </div>
          <div className="en">Your system is asking for softness today.</div>
        </div>

        <div className="cycle-quick">
          <button type="button" className="qc">
            <div className="qc-ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <path d="M3 14c2-1 4-1 6-3s4-4 6-4 6 2 6 4-3 5-6 5-3-2-6-2-4 1-6 0z" />
              </svg>
            </div>
            <div className="lbl">
              Skin &<br />Mood
            </div>
          </button>
          <button type="button" className="qc">
            <div className="qc-ico">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
              </svg>
            </div>
            <div className="lbl">Energy</div>
          </button>
          <button type="button" className="qc">
            <div className="qc-ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <path d="M21 12.5A8.5 8.5 0 1 1 11.5 3a7 7 0 0 0 9.5 9.5z" />
              </svg>
            </div>
            <div className="lbl">
              Suggested<br />Softness
            </div>
          </button>
          <button type="button" className="qc">
            <div className="qc-ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <circle cx="12" cy="12" r="9" />
                <path d="M5 5l14 14" />
              </svg>
            </div>
            <div className="lbl">
              What to<br />avoid today
            </div>
          </button>
        </div>

        <div className="forecast">
          <div className="forecast-title">Forecast</div>
          <div className="forecast-track">
            <div className="forecast-line" />
            <div className="forecast-days">
              <div className="fd" />
              <div className="fd" />
              <div className="fd" />
              <div className="fd now" />
              <div className="fd" />
              <div className="fd" />
              <div className="fd" />
            </div>
          </div>
          <div className="forecast-labels">
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span className="now">Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
          </div>
        </div>

        <div className="cycle-cta-row">
          <button type="button" className="cycle-cta" onClick={() => goTo(SCREENS.HOME)}>
            Open Ritual
          </button>
          <button type="button" className="cycle-cta" onClick={() => goTo(SCREENS.HOME)}>
            Food Support
          </button>
        </div>
      </div>
    </ScreenFrame>
  );
}
