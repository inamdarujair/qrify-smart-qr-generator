import { createContext } from 'react';

/**
 * Shared context for Toast notifications to keep the file structure modular
 * and prevent fast-refresh eslint warnings.
 */
export const ToastContext = createContext(null);
export default ToastContext;
