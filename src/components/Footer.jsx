/**
 * Footer component containing creator credentials and the required exact external button link.
 */
export const Footer = () => {
  return (
    <footer className="footer" aria-label="Footer Area">
      <div className="footer-inner">
        <div className="footer-meta">
          <div className="footer-author">Ujair Faizahmed Inamdar</div>
          <a 
            href="mailto:inamdarujair@gmail.com" 
            className="footer-email"
            aria-label="Send email to creator"
          >
            inamdarujair@gmail.com
          </a>
        </div>
        <a 
          href="https://digitalheroesco.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="footer-btn"
          role="button"
          aria-label="Visit Digital Heroes website"
        >
          Built for Digital Heroes
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
