import { QRCodeCanvas } from 'qrcode.react';
import { useToast } from '../hooks/useToast';

/**
 * QRPreview handles the QR rendering, simulated premium loading state, PNG export,
 * and a styled empty state illustration with an animated scanline.
 * @param {object} props
 * @param {object|null} props.qrData - Active QR code metadata
 * @param {boolean} props.loading - Processing state passed from parent
 */
export const QRPreview = ({ qrData, loading }) => {
  const { showToast } = useToast();

  const handleDownload = () => {
    const canvas = document.getElementById('qrify-qr-canvas');
    if (!canvas) {
      showToast('No QR code found to download', 'error');
      return;
    }

    try {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = `qrify-${qrData?.type?.toLowerCase() || 'code'}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Downloaded as PNG', 'success');
    } catch (error) {
      console.error('Download failed:', error);
      showToast('Download failed', 'error');
    }
  };

  const handleCopyValue = () => {
    if (!qrData?.rawData) return;
    
    navigator.clipboard.writeText(qrData.rawData)
      .then(() => {
        showToast('Copied to clipboard', 'success');
      })
      .catch(() => {
        showToast('Failed to copy content', 'error');
      });
  };

  return (
    <div className="glass-card" style={{ height: '100%' }}>
      <div className="preview-card-inner">
        {loading ? (
          <div className="spinner-container" aria-busy="true" aria-live="polite">
            <div className="loading-spinner"></div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontFamily: 'var(--font-heading)' }}>
              Encoding payloads...
            </p>
          </div>
        ) : qrData ? (
          <>
            <div className="preview-badge-row">
              <span className="type-badge">{qrData.type}</span>
              <span className="timestamp-text">{qrData.timestamp || 'Just now'}</span>
            </div>

            <div className="qr-canvas-container" onClick={handleCopyValue} title="Click to copy raw content" style={{ cursor: 'pointer' }}>
              <QRCodeCanvas
                id="qrify-qr-canvas"
                value={qrData.rawData}
                size={220}
                bgColor="#ffffff"
                fgColor="#0a0e1a"
                level="H"
                includeMargin={true}
              />
            </div>

            <div className="preview-actions">
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={handleDownload}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download PNG
              </button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={handleCopyValue}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy Content
              </button>
            </div>
          </>
        ) : (
          <div className="empty-state-container">
            <svg 
              className="empty-state-icon" 
              viewBox="0 0 100 100" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect x="15" y="15" width="70" height="70" rx="14" strokeDasharray="4 4" />
              <rect x="28" y="28" width="16" height="16" rx="3" stroke="var(--text-muted)" strokeWidth="2" />
              <rect x="33" y="33" width="6" height="6" rx="1" fill="var(--text-muted)" />
              <rect x="56" y="28" width="16" height="16" rx="3" stroke="var(--text-muted)" strokeWidth="2" />
              <rect x="61" y="61" width="12" height="12" rx="2.5" stroke="var(--text-muted)" strokeWidth="2" />
              <line x1="20" y1="50" x2="80" y2="50" stroke="var(--color-cyan)" strokeWidth="2" strokeLinecap="round" opacity="0.8">
                <animate attributeName="y1" values="25;75;25" dur="3s" repeatCount="indefinite" />
                <animate attributeName="y2" values="25;75;25" dur="3s" repeatCount="indefinite" />
              </line>
            </svg>
            <h3 className="empty-state-title">Scan Preview</h3>
            <p className="empty-state-subtitle">Your QR code will appear here after generation.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRPreview;
