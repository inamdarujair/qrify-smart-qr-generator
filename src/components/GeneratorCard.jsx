import { useState } from 'react';
import { validateUrl, validateText, validateEmail, validatePhone, validateWifi } from '../utils/validators';
import { formatUrl, formatText, formatEmail, formatPhone, formatWifi } from '../utils/qrFormatters';
import { useToast } from '../hooks/useToast';

/**
 * GeneratorCard handles tabs, form inputs, validation, and triggers QR code generation.
 * @param {object} props
 * @param {function} props.onGenerate - Triggered on valid generation
 * @param {object} props.activeRestoreItem - A history item to restore fields from
 */
export const GeneratorCard = ({ onGenerate, activeRestoreItem }) => {
  const { showToast } = useToast();

  // Lazy initialize activeTab based on restored history item if present
  const [activeTab, setActiveTab] = useState(() => {
    if (activeRestoreItem) {
      return activeRestoreItem.type.toLowerCase();
    }
    return 'url';
  });

  // Lazy initialize formData based on restored history item if present
  const [formData, setFormData] = useState(() => {
    const base = {
      url: '',
      text: '',
      email: '',
      subject: '',
      body: '',
      phone: '',
      ssid: '',
      password: '',
      encryption: 'WPA'
    };
    if (activeRestoreItem) {
      return {
        ...base,
        ...activeRestoreItem.formData
      };
    }
    return base;
  });

  const [touched, setTouched] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
    setTouched((prev) => ({
      ...prev,
      [field]: true
    }));
  };

  // Perform validation on the active tab fields
  const getErrors = () => {
    const errors = {};
    if (activeTab === 'url') {
      const err = validateUrl(formData.url);
      if (err) errors.url = err;
    } else if (activeTab === 'text') {
      const err = validateText(formData.text);
      if (err) errors.text = err;
    } else if (activeTab === 'email') {
      const err = validateEmail(formData.email);
      if (err) errors.email = err;
    } else if (activeTab === 'phone') {
      const err = validatePhone(formData.phone);
      if (err) errors.phone = err;
    } else if (activeTab === 'wifi') {
      const err = validateWifi(formData.ssid, formData.password, formData.encryption);
      if (err) errors.ssid = err;
    }
    return errors;
  };

  const errors = getErrors();

  const isFormEmpty = () => {
    if (activeTab === 'url') return !formData.url.trim();
    if (activeTab === 'text') return !formData.text.trim();
    if (activeTab === 'email') return !formData.email.trim();
    if (activeTab === 'phone') return !formData.phone.trim();
    if (activeTab === 'wifi') {
      if (!formData.ssid.trim()) return true;
      if (formData.encryption !== 'none' && !formData.password.trim()) return true;
      return false;
    }
    return true;
  };

  const handleClear = () => {
    if (activeTab === 'url') {
      setFormData((prev) => ({ ...prev, url: '' }));
      setTouched((prev) => ({ ...prev, url: false }));
    } else if (activeTab === 'text') {
      setFormData((prev) => ({ ...prev, text: '' }));
      setTouched((prev) => ({ ...prev, text: false }));
    } else if (activeTab === 'email') {
      setFormData((prev) => ({ ...prev, email: '', subject: '', body: '' }));
      setTouched((prev) => ({ ...prev, email: false, subject: false, body: false }));
    } else if (activeTab === 'phone') {
      setFormData((prev) => ({ ...prev, phone: '' }));
      setTouched((prev) => ({ ...prev, phone: false }));
    } else if (activeTab === 'wifi') {
      setFormData((prev) => ({ ...prev, ssid: '', password: '', encryption: 'WPA' }));
      setTouched((prev) => ({ ...prev, ssid: false, password: false }));
    }
    showToast('Form cleared', 'info');
  };

  const getFormattedPayload = () => {
    switch (activeTab) {
      case 'url':
        return formatUrl(formData.url);
      case 'text':
        return formatText(formData.text);
      case 'email':
        return formatEmail({
          email: formData.email,
          subject: formData.subject,
          body: formData.body
        });
      case 'phone':
        return formatPhone(formData.phone);
      case 'wifi':
        return formatWifi({
          ssid: formData.ssid,
          password: formData.password,
          encryption: formData.encryption
        });
      default:
        return '';
    }
  };

  const getDisplayContent = () => {
    switch (activeTab) {
      case 'url':
        return formData.url.trim();
      case 'text':
        return formData.text.trim();
      case 'email':
        return formData.email.trim();
      case 'phone':
        return formData.phone.trim();
      case 'wifi':
        return formData.ssid.trim();
      default:
        return '';
    }
  };

  const handleGenerate = (e) => {
    if (e) e.preventDefault();

    const currentErrors = getErrors();
    const hasErrors = Object.keys(currentErrors).length > 0;

    if (hasErrors) {
      const newTouched = { ...touched };
      if (activeTab === 'url') newTouched.url = true;
      if (activeTab === 'text') newTouched.text = true;
      if (activeTab === 'email') {
        newTouched.email = true;
        newTouched.subject = true;
        newTouched.body = true;
      }
      if (activeTab === 'phone') newTouched.phone = true;
      if (activeTab === 'wifi') {
        newTouched.ssid = true;
        newTouched.password = true;
      }
      setTouched(newTouched);
      showToast('Please check your input', 'error');
      return;
    }

    const rawData = getFormattedPayload();
    const content = getDisplayContent();
    const tabName = activeTab.charAt(0).toUpperCase() + activeTab.slice(1);

    onGenerate({
      type: tabName,
      rawData,
      content,
      formData: { ...formData }
    });
  };

  const handleCopy = () => {
    const rawData = getFormattedPayload();
    if (!rawData) {
      showToast('Nothing to copy', 'error');
      return;
    }

    navigator.clipboard.writeText(rawData)
      .then(() => {
        showToast('Copied to clipboard', 'success');
      })
      .catch(() => {
        showToast('Failed to copy', 'error');
      });
  };

  const tabs = [
    { id: 'url', label: 'URL' },
    { id: 'text', label: 'Text' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone' },
    { id: 'wifi', label: 'WiFi' }
  ];

  return (
    <div className="glass-card">
      <div className="generator-card-inner">
        <div className="tabs-container" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleGenerate}>
          {activeTab === 'url' && (
            <div id="panel-url" role="tabpanel" className="form-group">
              <label htmlFor="url-input" className="form-label">
                Link URL
              </label>
              <input
                id="url-input"
                type="text"
                className={`form-input ${touched.url && errors.url ? 'error' : ''}`}
                placeholder="example.com"
                value={formData.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
              />
              {touched.url && errors.url && (
                <span className="error-message" role="alert">{errors.url}</span>
              )}
            </div>
          )}

          {activeTab === 'text' && (
            <div id="panel-text" role="tabpanel" className="form-group">
              <div className="form-label">
                <label htmlFor="text-input">Plain Text</label>
                <span className={`char-counter ${formData.text.length > 400 ? 'limit-near' : ''}`}>
                  {formData.text.length}/500
                </span>
              </div>
              <textarea
                id="text-input"
                className={`form-textarea ${touched.text && errors.text ? 'error' : ''}`}
                placeholder="Type your message here..."
                maxLength={500}
                value={formData.text}
                onChange={(e) => handleInputChange('text', e.target.value)}
              />
              {touched.text && errors.text && (
                <span className="error-message" role="alert">{errors.text}</span>
              )}
            </div>
          )}

          {activeTab === 'email' && (
            <div id="panel-email" role="tabpanel">
              <div className="form-group">
                <label htmlFor="email-input" className="form-label">
                  Email Address
                </label>
                <input
                  id="email-input"
                  type="email"
                  className={`form-input ${touched.email && errors.email ? 'error' : ''}`}
                  placeholder="hello@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
                {touched.email && errors.email && (
                  <span className="error-message" role="alert">{errors.email}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="subject-input" className="form-label">
                  Subject (Optional)
                </label>
                <input
                  id="subject-input"
                  type="text"
                  className="form-input"
                  placeholder="Inquiry about services"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="body-input" className="form-label">
                  Message Body (Optional)
                </label>
                <textarea
                  id="body-input"
                  className="form-textarea"
                  placeholder="Write your email template message here..."
                  value={formData.body}
                  onChange={(e) => handleInputChange('body', e.target.value)}
                />
              </div>
            </div>
          )}

          {activeTab === 'phone' && (
            <div id="panel-phone" role="tabpanel" className="form-group">
              <label htmlFor="phone-input" className="form-label">
                Phone Number
              </label>
              <input
                id="phone-input"
                type="tel"
                className={`form-input ${touched.phone && errors.phone ? 'error' : ''}`}
                placeholder="+1 (555) 019-2834"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
              {touched.phone && errors.phone && (
                <span className="error-message" role="alert">{errors.phone}</span>
              )}
            </div>
          )}

          {activeTab === 'wifi' && (
            <div id="panel-wifi" role="tabpanel">
              <div className="form-group">
                <label htmlFor="ssid-input" className="form-label">
                  Network Name (SSID)
                </label>
                <input
                  id="ssid-input"
                  type="text"
                  className={`form-input ${touched.ssid && errors.ssid ? 'error' : ''}`}
                  placeholder="Home_WiFi"
                  value={formData.ssid}
                  onChange={(e) => handleInputChange('ssid', e.target.value)}
                />
                {touched.ssid && errors.ssid && (
                  <span className="error-message" role="alert">{errors.ssid}</span>
                )}
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="encryption-input" className="form-label">
                    Security Type
                  </label>
                  <select
                    id="encryption-input"
                    className="form-select"
                    value={formData.encryption}
                    onChange={(e) => handleInputChange('encryption', e.target.value)}
                  >
                    <option value="WPA">WPA/WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="none">Unsecured (None)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="password-input" className="form-label">
                    Password
                  </label>
                  <input
                    id="password-input"
                    type="password"
                    className="form-input"
                    placeholder={formData.encryption === 'none' ? 'No password required' : '••••••••'}
                    value={formData.password}
                    disabled={formData.encryption === 'none'}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClear}
              disabled={isFormEmpty()}
            >
              Clear
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCopy}
              disabled={isFormEmpty() || Object.keys(errors).length > 0}
            >
              Copy Raw
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isFormEmpty() || Object.keys(errors).length > 0}
              style={{ flex: 1 }}
            >
              Generate QR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeneratorCard;
