# QRify – Smart QR Code Generator

A premium, portfolio-grade SaaS-style web application for generating stylish QR codes. Engineered with a futuristic dark glassmorphism design system, smooth animations, and zero heavy UI libraries.

## 🚀 Live Demo
*Link to be added after Vercel deployment*
* [Live Demo Placeholder](https://qrify-smart-qr-generator.vercel.app)

---

## ✨ Features

- **5 QR Code Formats supported**:
  - **URL**: Generates QR codes for links (automatically prepends `https://` if protocol is omitted).
  - **Plain Text**: Supports messages up to 500 characters with live character counter limit safeguards.
  - **Email**: Pre-configures complete `mailto:` envelopes with optional subject and body lines.
  - **Phone**: Sanitizes and produces `tel:` strings with full country code support.
  - **WiFi**: Secure WPA, WEP, or unsecured configuration strings (`WIFI:T:WPA;S:ssid;P:password;;`).
- **Live Preview & Loading State**: Simulated micro-interaction processing spinner to sell a high-end feel.
- **Export Formats**: Canvas-rendered QR outputs downloadable directly as high-resolution PNG images.
- **Clipboard Utility**: One-click "Copy Raw" copies formatted QR payload string contents directly.
- **Persistence (History)**: Store the last 5 generated QR codes locally. History items can be clicked to reload inputs and preview parameters or cleared entirely.
- **Responsive Layout**: Designed for 1440px desktop grids, 1024px tablet columns, 768px portrait cards, and 375px mobile stacked layouts (touch-friendly targets & horizontal history swipe).

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Modern Plain CSS (Variables, Flexbox/Grid, Glassmorphic Backdrop filters, Transitions)
- **Dependencies**: `qrcode.react` (canvas QR generator)
- **State Management & Context**: Native React hooks (`useState`, `useEffect`, `useCallback`)
- **Storage**: Browser `localStorage` API
- **Toasts**: Custom Glassmorphic React Toast Notification provider

---

## 📸 Screenshots

*Screenshots to be added upon project build and local preview*

---

## 💻 Local Setup & Installation

To run this application locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/qrify-smart-qr-generator.git
   cd qrify-smart-qr-generator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build the production bundle**:
   ```bash
   npm run build
   ```

5. **Preview production build locally**:
   ```bash
   npm run preview
   ```
