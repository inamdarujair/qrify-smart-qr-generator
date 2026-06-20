import { useState } from 'react';

/**
 * Custom hook to manage the local storage of generated QR codes.
 * Persists the last 5 entries, preventing duplicates of the same raw code.
 */
export const useQRHistory = () => {
  // Lazily load from localStorage to avoid calling setState during render/effects
  const [history, setHistory] = useState(() => {
    try {
      const stored = localStorage.getItem('qrify_history');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to read QR history from localStorage:', error);
      return [];
    }
  });

  /**
   * Adds an entry to the top of the history stack.
   * Removes duplicates of the same raw payload, and caps the list at 5 items.
   * @param {object} item
   */
  const addToHistory = (item) => {
    setHistory((prevHistory) => {
      // Remove any existing history item with the same raw payload to prevent duplicates
      const filtered = prevHistory.filter((h) => h.rawData !== item.rawData);

      const newItem = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ...item
      };

      const updatedHistory = [newItem, ...filtered].slice(0, 5);

      try {
        localStorage.setItem('qrify_history', JSON.stringify(updatedHistory));
      } catch (error) {
        console.error('Failed to write QR history to localStorage:', error);
      }

      return updatedHistory;
    });
  };

  /**
   * Clears all stored QR history.
   */
  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('qrify_history');
    } catch (error) {
      console.error('Failed to clear QR history from localStorage:', error);
    }
  };

  return {
    history,
    addToHistory,
    clearHistory
  };
};

export default useQRHistory;
