/**
 * Sticky Navbar featuring the brand gradient logo and logo text.
 */
export const Navbar = () => {
  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <nav className="navbar" aria-label="Main Navigation">
      <div className="navbar-inner">
        <div 
          className="logo-wrapper" 
          onClick={handleLogoClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleLogoClick();
            }
          }}
        >
          <svg 
            className="logo-icon" 
            viewBox="0 0 32 32" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="var(--color-cyan)" />
                <stop offset="50%" stopColor="var(--color-blue)" />
                <stop offset="100%" stopColor="var(--color-purple)" />
              </linearGradient>
            </defs>
            <rect x="2" y="2" width="28" height="28" rx="8" stroke="url(#logo-grad)" strokeWidth="2.5" fill="none" />
            <rect x="8" y="8" width="6" height="6" rx="1" fill="url(#logo-grad)" />
            <rect x="18" y="8" width="6" height="6" rx="1" fill="url(#logo-grad)" />
            <rect x="8" y="18" width="6" height="6" rx="1" fill="url(#logo-grad)" />
            <rect x="18" y="18" width="3" height="3" fill="url(#logo-grad)" />
            <rect x="21" y="21" width="3" height="3" fill="url(#logo-grad)" />
          </svg>
          <span className="logo-text">QRify</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
