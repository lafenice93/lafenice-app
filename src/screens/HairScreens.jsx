import { SCREENS } from '../constants/screens.js';
import { useApp } from '../context/AppContext.jsx';
import ScreenFrame from '../components/ScreenFrame.jsx';
import { PhotoTopBar, PhotoTabBar } from '../components/PhotoChrome.jsx';

export function HairDetectScreen({ isActive = false }) {
  const { goTo } = useApp();
  return (
    <ScreenFrame className="s-photo s-hair-detect" isActive={isActive}>
      <div className="photo-bg" />
      <PhotoTopBar onBack={() => goTo(SCREENS.HOME)} />
      <button
        type="button"
        className="hd-detect-label"
        onClick={() => goTo(SCREENS.HAIR_PICK)}
      >
        Face shape · Oval
        <br />
        Tap to choose style →
      </button>
      <PhotoTabBar />
    </ScreenFrame>
  );
}

export function HairPickScreen({ isActive = false }) {
  const { goTo } = useApp();
  const cards = ['Natural Wave', 'Natural Wave', 'Slick Back Pony', 'Half-up Fancy', 'Half-up Frame'];
  return (
    <ScreenFrame className="s-photo s-hair-pick" isActive={isActive}>
      <div className="photo-bg" />
      <PhotoTopBar onBack={() => goTo(SCREENS.HAIR_DETECT)} />
      <div className="hp-humidity">Humidity 65% · 6h outdoor</div>
      <div className="hp-selected">
        <div className="name">Natural Wave</div>
        <div className="meta">
          8 min · Humidity resistant <span className="stars">★★★★☆</span>
        </div>
      </div>
      <button type="button" className="hp-toggle" onClick={() => goTo(SCREENS.HAIR_TUTORIAL)}>
        Slick Back Pony
      </button>
      <div className="hp-styles">
        <div className="hp-style-row">
          {cards.map((nm, i) => (
            <button
              key={`${nm}-${i}`}
              type="button"
              className={`hp-style-card${i === 1 ? ' selected' : ''}`}
              onClick={() => goTo(SCREENS.HAIR_TUTORIAL)}
            >
              <div className="hp-style-thumb" />
              <div className="nm">{nm}</div>
            </button>
          ))}
        </div>
      </div>
      <PhotoTabBar activeTab="analysis" />
    </ScreenFrame>
  );
}

export function HairTutorialScreen({ isActive = false }) {
  const { goTo } = useApp();
  return (
    <ScreenFrame className="s-photo s-hair-tutorial" isActive={isActive}>
      <div className="photo-bg" />
      <PhotoTopBar onBack={() => goTo(SCREENS.HAIR_PICK)} />
      <div className="tut-header">
        <div className="h">Today&apos;s Hair · Fire&apos;s Composure</div>
        <div className="sub">8 min · Dyson Airwrap + Mise en Scène mist</div>
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
