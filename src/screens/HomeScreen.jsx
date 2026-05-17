import { SCREENS } from '../constants/screens.js';
import { useApp } from '../context/AppContext.jsx';
import ScreenFrame from '../components/ScreenFrame.jsx';
import { HomeTabBar } from '../components/PhotoChrome.jsx';

export default function HomeScreen({ isActive = false }) {
  const { goTo } = useApp();

  return (
    <ScreenFrame className="s-home dark-status" isActive={isActive}>
      <div className="home-topbar">
        <button type="button" className="menu" aria-label="Menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="word">LAFENICE</div>
        <button type="button" className="bell" aria-label="Notifications">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="M18 16v-5a6 6 0 1 0-12 0v5l-2 3h16l-2-3z" />
            <path d="M10 19a2 2 0 0 0 4 0" />
          </svg>
        </button>
      </div>

      <div className="home-tagpill">Your private mirror for face, cycle, and ritual.</div>

      <div className="home-title">
        <div className="h">
          EVE<em>(이브)</em> 입니다.
        </div>
        <div className="sub">당신을 대신해 보여주고 설명하는 정중한 인터페이스입니다.</div>
      </div>

      <div className="eve-stage">
        <div className="eve-halo" aria-hidden />
        <svg className="eve-circuits" viewBox="0 0 200 200" fill="none" stroke="rgba(255,235,200,.7)" strokeWidth="1" aria-hidden>
          <circle cx="100" cy="100" r="80" strokeOpacity=".5" />
          <circle cx="100" cy="100" r="92" strokeOpacity=".3" />
          <path d="M22 100 H42 L48 94 H62 L68 100 H78" />
          <path d="M178 100 H158 L152 106 H138 L132 100 H122" />
          <circle cx="42" cy="100" r="2" fill="rgba(255,235,200,.9)" />
          <circle cx="158" cy="100" r="2" fill="rgba(255,235,200,.9)" />
        </svg>
        <div className="eve-portrait" />
      </div>

      <div className="home-quickrow">
        <button type="button" className="hq" onClick={() => goTo(SCREENS.MOOD_PICK)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z" fill="currentColor" />
          </svg>
          Make up
        </button>
        <button type="button" className="hq" onClick={() => goTo(SCREENS.HAIR_DETECT)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <circle cx="12" cy="9" r="4" />
            <path d="M5 22c0-5 3-8 7-8s7 3 7 8" />
          </svg>
          Hair style
        </button>
        <button type="button" className="hq" onClick={() => goTo(SCREENS.CODY_MIRROR)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="M7 5l-4 3 2 3 2-1v9h10v-9l2 1 2-3-4-3-3 2h-4l-3-2z" />
          </svg>
          Cody
        </button>
      </div>

      <HomeTabBar />
    </ScreenFrame>
  );
}
