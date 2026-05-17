/**
 * BrandMark
 * The LAFENICE wordmark rendered as a gold-gradient serif.
 * Sizes: 'sm' | 'md' | 'lg'. Optional glow halo.
 */
export default function BrandMark({ size = 'md', glow = false, className = '' }) {
  return (
    <span className={`wordmark size-${size} ${glow ? 'glow' : ''} ${className}`}>
      LAFENICE
    </span>
  );
}
