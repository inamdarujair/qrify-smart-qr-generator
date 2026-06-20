/**
 * Validators for each QR code type
 */

/**
 * Validates a URL input.
 * If URL doesn't have http:// or https://, the formatter will auto-prepend it.
 * @param {string} url
 * @returns {string|null} Error message or null if valid
 */
export const validateUrl = (url) => {
  if (!url || url.trim() === '') {
    return 'URL is required';
  }

  // Regex to validate a domain structure
  // Matches domain.com, sub.domain.co.uk, localhost, etc.
  const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(:\d+)?(\/.*)?$/i;
  
  // Allow localhost specifically for developer friendliness
  const localhostPattern = /^(https?:\/\/)?localhost(:\d+)?(\/.*)?$/i;

  const trimmed = url.trim();
  if (!urlPattern.test(trimmed) && !localhostPattern.test(trimmed)) {
    return 'Please enter a valid URL (e.g., example.com)';
  }

  return null;
};

/**
 * Validates text input.
 * @param {string} text
 * @returns {string|null} Error message or null if valid
 */
export const validateText = (text) => {
  if (!text || text.trim() === '') {
    return 'Text content is required';
  }
  if (text.length > 500) {
    return 'Text must be 500 characters or less';
  }
  return null;
};

/**
 * Validates email input.
 * @param {string} email
 * @returns {string|null} Error message or null if valid
 */
export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return 'Email address is required';
  }
  
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email.trim())) {
    return 'Please enter a valid email address';
  }
  return null;
};

/**
 * Validates phone input.
 * @param {string} phone
 * @returns {string|null} Error message or null if valid
 */
export const validatePhone = (phone) => {
  if (!phone || phone.trim() === '') {
    return 'Phone number is required';
  }

  // Permissive but safe regex for phone numbers: optional +, numbers, spaces, dashes, parentheses
  const phonePattern = /^\+?[\d\s\-()]{3,20}$/;
  if (!phonePattern.test(phone.trim())) {
    return 'Please enter a valid phone number';
  }
  return null;
};

/**
 * Validates WiFi credentials.
 * @param {string} ssid
 * @param {string} password
 * @param {string} encryption - 'WPA', 'WEP', or 'none'
 * @returns {string|null} Error message or null if valid
 */
export const validateWifi = (ssid, password, encryption) => {
  if (!ssid || ssid.trim() === '') {
    return 'SSID (Network Name) is required';
  }

  if (encryption !== 'none') {
    if (!password || password.trim() === '') {
      return 'Password is required for secure networks';
    }
    if (encryption === 'WPA' && password.length < 8) {
      return 'WPA password must be at least 8 characters';
    }
    if (encryption === 'WEP' && password.length !== 5 && password.length !== 13 && password.length !== 10 && password.length !== 26) {
      return 'WEP password must be 5/13 ASCII chars or 10/26 hex chars';
    }
  }

  return null;
};
