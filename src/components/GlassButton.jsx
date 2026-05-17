/**
 * GlassButton
 * Reusable button matching the LAFENICE design system.
 *
 * Variants:
 *   - default: white/cream pill (primary)
 *   - outline: transparent with mint glow border
 *   - ghost:   blurred glass
 *   - gold:    cream/gold luxury button
 *   - dark:    midnight pill with mint glow
 *
 * Props pass through to <button>.
 */
export default function GlassButton({
  variant = 'default',
  icon = null,
  children,
  className = '',
  ...rest
}) {
  return (
    <button className={`gbtn ${variant} ${className}`} {...rest}>
      {icon}
      <span>{children}</span>
    </button>
  );
}
