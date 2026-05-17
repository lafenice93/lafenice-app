import { useCallback, useEffect, useRef } from 'react';
import {
  DARK_STATUS_SCREENS,
  SCREEN_CLOCKS,
  SCREEN_LABELS,
  SCREEN_ORDER,
  SCREENS,
} from './constants/screens.js';
import { useApp } from './context/AppContext.jsx';
import { BatteryIcon, SignalIcon, WifiIcon } from './components/StatusIcons.jsx';
import SplashScreen from './screens/SplashScreen.jsx';
import SignInScreen from './screens/SignInScreen.jsx';
import FaceCaptureScreen from './screens/FaceCaptureScreen.jsx';
import CycleScreen from './screens/CycleScreen.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import {
  MoodPickScreen,
  MakeupResultScreen,
  MakeupTutorialScreen,
} from './screens/MakeupScreens.jsx';
import {
  HairDetectScreen,
  HairPickScreen,
  HairTutorialScreen,
} from './screens/HairScreens.jsx';
import {
  CodyMirrorScreen,
  CodyOutfitScreen,
  CodyAnalysisScreen,
} from './screens/CodyScreens.jsx';

const SCREEN_COMPONENTS = {
  [SCREENS.SPLASH]: SplashScreen,
  [SCREENS.SIGN_IN]: SignInScreen,
  [SCREENS.FACE]: FaceCaptureScreen,
  [SCREENS.CYCLE]: CycleScreen,
  [SCREENS.HOME]: HomeScreen,
  [SCREENS.MOOD_PICK]: MoodPickScreen,
  [SCREENS.MAKEUP_RESULT]: MakeupResultScreen,
  [SCREENS.MAKEUP_TUTORIAL]: MakeupTutorialScreen,
  [SCREENS.HAIR_DETECT]: HairDetectScreen,
  [SCREENS.HAIR_PICK]: HairPickScreen,
  [SCREENS.HAIR_TUTORIAL]: HairTutorialScreen,
  [SCREENS.CODY_MIRROR]: CodyMirrorScreen,
  [SCREENS.CODY_OUTFIT]: CodyOutfitScreen,
  [SCREENS.CODY_ANALYSIS]: CodyAnalysisScreen,
};

function StatusBar({ time, dark }) {
  return (
    <div className={`statusbar${dark ? ' dark-status' : ''}`}>
      <div className="time">{time}</div>
      <div className="icons">
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  );
}

function ScreenRouter({ active }) {
  return (
    <>
      {SCREEN_ORDER.map((id) => {
        const Component = SCREEN_COMPONENTS[id];
        const isActive = id === active;
        return (
          <Component key={id} isActive={isActive} />
        );
      })}
    </>
  );
}

export default function App() {
  const { screen, screenIndex, goTo, goNext, goPrev } = useApp();
  const phoneRef = useRef(null);
  const touchX = useRef(null);

  const dark = DARK_STATUS_SCREENS.has(screen);
  const clock = SCREEN_CLOCKS[screen] ?? '9:16';
  const label = SCREEN_LABELS[screen] ?? screen;
  const indexStr = String(screenIndex + 1).padStart(2, '0');

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  const onTouchStart = useCallback((e) => {
    touchX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (e) => {
      if (touchX.current == null) return;
      const dx = e.changedTouches[0].clientX - touchX.current;
      if (dx < -40) goNext();
      if (dx > 40) goPrev();
      touchX.current = null;
    },
    [goNext, goPrev],
  );

  return (
    <div className="app-shell">
      <header className="studio-head">
        <div className="mark">LAFENICE</div>
        <div className="sub">Interactive prototype · face · cycle · ritual</div>
      </header>

      <div
        className="phone"
        ref={phoneRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="pbtn-right" aria-hidden />
        <div className={`screen${dark ? ' dark-status' : ''}`} id="screen">
          <div className="dynamic-island" aria-hidden />
          <StatusBar time={clock} dark={dark} />
          <div className="deck">
            <ScreenRouter active={screen} />
          </div>
        </div>
      </div>

      <nav className="nav-row" aria-label="Screen navigation">
        <button
          type="button"
          className="nav-btn"
          onClick={goPrev}
          disabled={screenIndex === 0}
          aria-label="Previous screen"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <div className="dots" role="tablist">
          {SCREEN_ORDER.map((id, i) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={i === screenIndex}
              aria-label={SCREEN_LABELS[id]}
              className={`dot${i === screenIndex ? ' active' : ''}`}
              onClick={() => goTo(id)}
            />
          ))}
        </div>
        <button
          type="button"
          className="nav-btn"
          onClick={goNext}
          disabled={screenIndex === SCREEN_ORDER.length - 1}
          aria-label="Next screen"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </nav>

      <p className="screen-label">
        <b>{indexStr}</b> {label}
      </p>
    </div>
  );
}
