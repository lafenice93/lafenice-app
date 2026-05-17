/** Wraps screen content with prototype opacity transition classes */
export default function ScreenFrame({ className = '', isActive = false, children, ...rest }) {
  return (
    <div className={`scr ${className}${isActive ? ' active' : ''}`.trim()} {...rest}>
      {children}
    </div>
  );
}
