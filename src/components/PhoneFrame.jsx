/**
 * PhoneFrame
 * Wraps the screen in an iPhone-style luxury frame on desktop;
 * collapses to full-bleed on mobile (≤ 480px) via CSS.
 *
 * Props:
 *   - children:    screen contents
 *   - themeDark:   when true, applies dark status-bar text colors
 */
export default function PhoneFrame({ children, themeDark = false }) {
  return (
    <div className={`phone ${themeDark ? 'theme-dark' : ''}`}>
      <div className="phone-screen">
        <div className="island" />
        {children}
      </div>
    </div>
  );
}
