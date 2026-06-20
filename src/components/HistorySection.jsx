/**
 * HistorySection displays the last 5 generated QR codes.
 * Allows clicking an item to re-load it into the active states,
 * and clearing the history.
 * @param {object} props
 * @param {Array} props.history - List of stored history items
 * @param {function} props.onSelect - Triggered when a history item is selected
 * @param {function} props.onClear - Triggered when clearing history
 */
export const HistorySection = ({ history, onSelect, onClear }) => {
  const handleItemClick = (item) => {
    onSelect({
      ...item,
      isFromHistory: true
    });
  };

  return (
    <section className="history-section" aria-labelledby="history-heading">
      <div className="history-header">
        <h2 id="history-heading" className="history-title">Recent Generations</h2>
        {history.length > 0 && (
          <button
            type="button"
            className="clear-history-btn"
            onClick={onClear}
            aria-label="Clear all history entries"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
            Clear History
          </button>
        )}
      </div>

      <div className="history-grid">
        {history.length > 0 ? (
          history.map((item) => (
            <div
              key={item.id}
              className="glass-card history-item"
              onClick={() => handleItemClick(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleItemClick(item);
                }
              }}
              aria-label={`Restore generated ${item.type} QR code for ${item.content}`}
            >
              <div className="history-thumbnail">
                <img
                  src={item.thumbnail}
                  alt={`${item.type} QR Thumbnail`}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <span className="history-type">{item.type}</span>
              <span className="history-desc" title={item.content}>
                {item.content}
              </span>
              <span className="history-time">{item.timestamp}</span>
            </div>
          ))
        ) : (
          <div className="history-empty">
            No recent generations found. Generate a QR code to save it here.
          </div>
        )}
      </div>
    </section>
  );
};

export default HistorySection;
