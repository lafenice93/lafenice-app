import { SCREENS } from '../constants/screens.js';
import { useApp } from '../context/AppContext.jsx';
import { BackChevron, BellIcon } from './StatusIcons.jsx';

export function PhotoTopBar({ onBack }) {
  return (
    <div className="photo-topbar">
      <button type="button" className="back" onClick={onBack} aria-label="Back">
        <BackChevron />
      </button>
      <div className="word">LAFENICE</div>
      <button type="button" className="bell" aria-label="Notifications">
        <BellIcon />
      </button>
    </div>
  );
}

function TabIcon({ name }) {
  const props = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6 };
  switch (name) {
    case 'home':
      return <svg {...props}><path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2v-9z" /></svg>;
    case 'analysis':
      return <svg {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
    case 'camera':
      return <svg {...props}><path d="M4 7h4l2-3h4l2 3h4v13H4z" /><circle cx="12" cy="13" r="4" /></svg>;
    case 'routine':
      return <svg {...props}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></svg>;
    case 'profile':
      return <svg {...props}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" /></svg>;
    default:
      return null;
  }
}

export function PhotoTabBar({ activeTab = 'home' }) {
  const { goTo } = useApp();
  const tabs = [
    { id: 'home', label: 'Home', screen: SCREENS.HOME },
    { id: 'analysis', label: 'Analysis', screen: SCREENS.CODY_ANALYSIS },
    { id: 'camera', label: 'Camera', screen: null },
    { id: 'routine', label: 'Routine', screen: SCREENS.CYCLE },
    { id: 'profile', label: 'Profile', screen: SCREENS.HOME },
  ];

  return (
    <div className="photo-tabbar">
      {tabs.map((tab) => {
        if (tab.id === 'camera') {
          return (
            <button
              key={tab.id}
              type="button"
              className="tabitem camera"
              onClick={() => goTo(SCREENS.FACE)}
              aria-label="Camera"
            >
              <div className="tab-cam-btn">
                <TabIcon name="camera" />
              </div>
            </button>
          );
        }
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            className={`tabitem${isActive ? ' active' : ''}`}
            onClick={() => tab.screen && goTo(tab.screen)}
          >
            <TabIcon name={tab.id} />
            <div className="lbl">{tab.label}</div>
          </button>
        );
      })}
    </div>
  );
}

export function HomeTabBar() {
  const { goTo } = useApp();
  return (
    <div className="home-tabbar">
      <button type="button" className="tabitem active" aria-current="page">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2v-9z" />
        </svg>
        <div className="lbl">Home</div>
      </button>
      <button type="button" className="tabitem" onClick={() => goTo(SCREENS.CODY_ANALYSIS)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
        <div className="lbl">Analysis</div>
      </button>
      <button type="button" className="tabitem camera" onClick={() => goTo(SCREENS.FACE)} aria-label="Camera">
        <div className="tab-cam-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="M4 7h4l2-3h4l2 3h4v13H4z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </div>
      </button>
      <button type="button" className="tabitem" onClick={() => goTo(SCREENS.CYCLE)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 3v4M16 3v4" />
        </svg>
        <div className="lbl">Routine</div>
      </button>
      <button type="button" className="tabitem">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
        </svg>
        <div className="lbl">Profile</div>
      </button>
    </div>
  );
}
