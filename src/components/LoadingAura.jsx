/**
 * LoadingAura
 * Spinning conic-gradient halo with a luminous pearl center.
 * Used during avatar generation.
 */
export default function LoadingAura({ label = 'EVE' }) {
  return (
    <div className="gen-aura">
      <div className="gen-orb">{label}</div>
    </div>
  );
}
