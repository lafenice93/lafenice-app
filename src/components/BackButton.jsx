/**
 * BackButton
 * Small circular back arrow, floats on top of any screen.
 * Theme-aware via parent .theme-dark.
 */
export default function BackButton({ onClick }) {
  return (
    <button className="back-btn" onClick={onClick} aria-label="Back">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 6l-6 6 6 6" />
      </svg>
    </button>
  );
}
