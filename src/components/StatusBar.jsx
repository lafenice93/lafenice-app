/**
 * StatusBar
 * iOS-style top bar with clock, signal, wifi, battery.
 * Theme inherits from parent (.theme-dark flips text to white).
 */
export default function StatusBar({ time = '9:16' }) {
  return (
    <div className="statusbar">
      <div className="time">{time}</div>
      <div className="icons">
        {/* signal */}
        <svg viewBox="0 0 18 12" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx=".5" />
          <rect x="5" y="6" width="3" height="6" rx=".5" />
          <rect x="10" y="3" width="3" height="9" rx=".5" />
          <rect x="15" y="0" width="3" height="12" rx=".5" />
        </svg>
        {/* wifi */}
        <svg viewBox="0 0 16 12" fill="currentColor">
          <path d="M8 12L11 8.5 A4 4 0 0 0 5 8.5L8 12Z" />
          <path d="M1 4.5 A11 11 0 0 1 15 4.5L13 6.5 A8 8 0 0 0 3 6.5L1 4.5Z" opacity=".7" />
        </svg>
        {/* battery */}
        <svg viewBox="0 0 26 11" fill="none">
          <rect x=".5" y=".5" width="22" height="10" rx="2.5" stroke="currentColor" strokeOpacity=".6" />
          <rect x="23.5" y="3.5" width="2" height="4" rx="1" fill="currentColor" fillOpacity=".4" />
          <rect x="2" y="2" width="19" height="7" rx="1.3" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}
