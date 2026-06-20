/**
 * Formatters to convert structured form data into QR payload strings
 */

/**
 * Escapes WiFi fields (SSID, Password) as per standard rules.
 * Backslashes, semicolons, colons, and commas must be escaped with a backslash.
 * @param {string} val 
 * @returns {string} Escaped string
 */
const escapeWifiField = (val) => {
  if (!val) return '';
  return val.replace(/\\/g, '\\\\')
            .replace(/;/g, '\\;')
            .replace(/:/g, '\\:')
            .replace(/,/g, '\\,');
};

/**
 * Formats URL payload. Prepends https:// if protocol is missing.
 * @param {string} url 
 * @returns {string} Formatted URL
 */
export const formatUrl = (url) => {
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

/**
 * Formats Text payload (no modifications).
 * @param {string} text 
 * @returns {string} Formatted text
 */
export const formatText = (text) => {
  return text;
};

/**
 * Formats Email to mailto scheme.
 * @param {object} data
 * @param {string} data.email
 * @param {string} data.subject
 * @param {string} data.body
 * @returns {string} Formatted mailto URI
 */
export const formatEmail = ({ email, subject = '', body = '' }) => {
  const mailtoParts = [];
  if (subject) {
    mailtoParts.push(`subject=${encodeURIComponent(subject)}`);
  }
  if (body) {
    mailtoParts.push(`body=${encodeURIComponent(body)}`);
  }
  
  const query = mailtoParts.length > 0 ? `?${mailtoParts.join('&')}` : '';
  return `mailto:${email.trim()}${query}`;
};

/**
 * Formats Phone to tel scheme.
 * @param {string} phone 
 * @returns {string} Formatted tel URI
 */
export const formatPhone = (phone) => {
  return `tel:${phone.trim()}`;
};

/**
 * Formats WiFi credentials to standard WIFI scheme.
 * Schema: WIFI:T:WPA;S:SSID;P:PASSWORD;;
 * @param {object} data
 * @param {string} data.ssid
 * @param {string} data.password
 * @param {string} data.encryption - 'WPA', 'WEP', or 'none'
 * @returns {string} Formatted WIFI payload
 */
export const formatWifi = ({ ssid, password = '', encryption = 'WPA' }) => {
  const escapedSsid = escapeWifiField(ssid);
  
  if (encryption === 'none') {
    return `WIFI:T:nopass;S:${escapedSsid};;`;
  }
  
  const escapedPassword = escapeWifiField(password);
  return `WIFI:T:${encryption};S:${escapedSsid};P:${escapedPassword};;`;
};
