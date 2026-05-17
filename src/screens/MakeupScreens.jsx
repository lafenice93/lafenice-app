import { SCREENS } from '../constants/screens.js';
import { useApp } from '../context/AppContext.jsx';
import ScreenFrame from '../components/ScreenFrame.jsx';
import { PhotoTopBar, PhotoTabBar } from '../components/PhotoChrome.jsx';

function HomeQuickRow({ highlightMakeup }) {
  const { goTo } = useApp();
  return (
    <div className="home-quickrow" style={{ bottom: 130 }}>
      <button
        type="button"
        className="hq"
        style={highlightMakeup ? { background: 'rgba(200,168,216,.4)', borderColor: '#C8A8D8' } : undefined}
        onClick={() => goTo(SCREENS.MOOD_PICK)}
      >
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
  );
}

export function MoodPickScreen({ isActive = false }) {
  const { goTo } = useApp();
  return (
    <ScreenFrame className="s-photo s-moodpick dark-status" isActive={isActive}>
      <div className="photo-bg" />
      <PhotoTopBar onBack={() => goTo(SCREENS.HOME)} />
      <div className="mp-title">
        <div className="mp-tagpill">Your private mirror for face, cycle, and ritual.</div>
        <div className="h">
          EVE<em>(이브)</em> 입니다.
        </div>
        <div className="sub">당신을 대신해 보여주고 설명하는 정중한 인터페이스입니다.</div>
      </div>
      <div className="mp-card-row">
        <button type="button" className="mp-card c1" onClick={() => goTo(SCREENS.MAKEUP_RESULT)}>
          <div className="mp-card-photo" />
          <div className="mp-mood">
            Mood: Office Clean
            <br />· 4 products
          </div>
        </button>
        <button type="button" className="mp-card c3 selected" onClick={() => goTo(SCREENS.MAKEUP_RESULT)}>
          <div className="selector-ring" aria-hidden />
          <div className="mp-card-photo" />
          <div className="mp-mood">
            Mood: Soft Feminity
            <br />· 4 products
          </div>
        </button>
        <button type="button" className="mp-card c2" onClick={() => goTo(SCREENS.MAKEUP_RESULT)}>
          <div className="mp-card-photo" />
          <div className="mp-mood">
            Romantic Date
            <br />· 5 products
          </div>
        </button>
      </div>
      <HomeQuickRow highlightMakeup />
      <PhotoTabBar activeTab="home" />
    </ScreenFrame>
  );
}

export function MakeupResultScreen({ isActive = false }) {
  const { goTo } = useApp();
  const fridge = [
    { dot: 'c1', text: 'Hera Black Cushion #21', check: true },
    { dot: 'c2', text: 'Dior Backstage Blush 001', check: true },
    { dot: 'c3', text: 'Owned · Eyeshadow #03', check: false },
    { dot: 'c4', text: 'Romand Juicy Tint #11', check: true },
  ];
  return (
    <ScreenFrame className="s-photo s-makeup-result" isActive={isActive}>
      <div className="photo-bg" />
      <PhotoTopBar onBack={() => goTo(SCREENS.MOOD_PICK)} />
      <div className="mood-panel">
        <div className="ml">TODAY&apos;S MOOD</div>
        <div className="mv">
          Natural glow,
          <br />
          Fire&apos;s vitality
        </div>
        <div className="mz">
          • Focus Zones:
          <br />
          <b>Eyes + Cheeks</b>
        </div>
      </div>
      <div className="fridge-panel">
        <div className="ft">Beauty Fridge</div>
        {fridge.map((item) => (
          <div key={item.text} className="fr">
            <span className={`fr-dot ${item.dot}`} />
            {item.text}
            {item.check && (
              <div className="fr-check">
                <svg viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2.5" fill="none" aria-hidden>
                  <path d="M2 6l3 3 6-6" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="look-variations">
        <div className="look-row">
          {['c1', 'c2 selected', 'c3', 'c4 violet', 'c5'].map((cls, i) => (
            <div key={i} className={`look-card ${cls}`}>
              <div className="lc-name">{i < 4 ? 'Natural Glow' : 'Beauty Fridge'}</div>
              <div className="lc-thumb" />
            </div>
          ))}
        </div>
      </div>
      <button type="button" className="continue-link" onClick={() => goTo(SCREENS.MAKEUP_TUTORIAL)}>
        Continue: 3 more moods →
      </button>
      <PhotoTabBar activeTab="home" />
    </ScreenFrame>
  );
}

export function MakeupTutorialScreen({ isActive = false }) {
  const { goTo } = useApp();
  return (
    <ScreenFrame className="s-photo s-makeup-tutorial" isActive={isActive}>
      <div className="photo-bg" />
      <PhotoTopBar onBack={() => goTo(SCREENS.MAKEUP_RESULT)} />
      <div className="tut-header">
        <div className="h">
          Today&apos;s Make Up · Spring Warm <span className="em">🔥</span>
        </div>
        <div className="sub">4 products from your Beauty Fridge.</div>
      </div>
      <div className="tut-buttons">
        <button type="button" className="tut-btn">Styling Guide</button>
        <button type="button" className="tut-btn">Tutorial</button>
        <button type="button" className="tut-btn">Save</button>
      </div>
      <PhotoTabBar activeTab="routine" />
    </ScreenFrame>
  );
}
