/**
 * ScanOverlay
 * Mint-glowing face scan UI for the camera screen.
 * Pure CSS animation, no JS runtime cost.
 */
export default function ScanOverlay({ label = 'FACE READING', hint = '얼굴을 가이드 안에 맞춰주세요' }) {
  return (
    <div className="scan-overlay">
      <div className="scan-meta">
        <div className="label">{label}</div>
        <div className="hint">{hint}</div>
      </div>

      <div className="scan-face-frame" />
      <div className="scan-ring" />
      <div className="scan-ring r2" />
      <div className="scan-ring r3" />
      <div className="scan-line" />

      <div className="scan-corners"><span /></div>
    </div>
  );
}
