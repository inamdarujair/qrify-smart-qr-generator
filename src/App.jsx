import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GeneratorCard from './components/GeneratorCard';
import QRPreview from './components/QRPreview';
import HistorySection from './components/HistorySection';
import Footer from './components/Footer';
import { useQRHistory } from './hooks/useQRHistory';
import { useToast } from './hooks/useToast';

/**
 * App is the root container assembly managing local states and layout grid.
 */
export const App = () => {
  const { showToast } = useToast();
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeRestoreItem, setActiveRestoreItem] = useState(null);
  const { history, addToHistory, clearHistory } = useQRHistory();


  // Receives valid inputs, shows loading, then saves to history and toasts exactly once.
  // Keeping this logic here (not in a useEffect) avoids React StrictMode's
  // double-effect-invocation which caused duplicate toasts.
  const handleGenerate = (data) => {
    setLoading(true);
    setTimeout(() => {
      const newQrData = {
        ...data,
        isFromHistory: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setQrData(newQrData);
      setLoading(false);

      // Capture canvas thumbnail slightly after render, then save + toast once.
      setTimeout(() => {
        const canvas = document.getElementById('qrify-qr-canvas');
        if (canvas) {
          try {
            const thumbnail = canvas.toDataURL('image/png');
            addToHistory({
              thumbnail,
              type: newQrData.type,
              content: newQrData.content,
              rawData: newQrData.rawData,
              formData: newQrData.formData
            });
            showToast('QR code generated', 'success');
          } catch (e) {
            console.error('Failed to capture canvas thumbnail:', e);
          }
        }
      }, 120);
    }, 450);
  };

  // Restores a generated QR code from history back into current state
  const handleSelectHistoryItem = (item) => {
    setQrData(item);
    setActiveRestoreItem(item);
  };

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Hero />
        
        {/* Interactive layout grid */}
        <div className="grid-layout">
          <GeneratorCard 
            key={activeRestoreItem ? activeRestoreItem.id : 'default'}
            onGenerate={handleGenerate} 
            activeRestoreItem={activeRestoreItem} 
          />
          <QRPreview 
            qrData={qrData} 
            loading={loading}
          />
        </div>

        {/* History row/grid */}
        <HistorySection 
          history={history} 
          onSelect={handleSelectHistoryItem} 
          onClear={clearHistory} 
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;
