# 🔥 Veloop Rewards — User Profile Dashboard

<div align="center">

![Veloop Rewards](https://img.shields.io/badge/Veloop-Rewards-ff6b00?style=for-the-badge&logo=react&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=for-the-badge&logo=greensock&logoColor=white)

**A premium, fully responsive user profile dashboard for the Veloop Rewards platform — built with React 19, Vite, TailwindCSS v4, and GSAP animations.**

</div>

---

## ✨ Features

- 🎨 **Premium Dark UI** — Glassmorphism design with ambient background orbs and smooth gradients
- 🏆 **XP & Level System** — Interactive experience point tracking with level-up confetti animations
- 💰 **VE Asset Management** — Live balance display for VEs, Gems, and Tokens
- 📊 **Analytics Dashboard** — Withdrawal analytics and referral performance stats
- 🔗 **Referral System** — One-click copy referral links with a unique referral code
- 💸 **Withdraw Modal** — Guided withdrawal flow with balance validation and status tracking
- ⚙️ **Settings Modal** — In-app profile editing with instant toast feedback
- 🌗 **Theme Support** — Built-in theming system via React Context
- 📱 **Fully Responsive** — Dedicated mobile bottom nav, collapsible sidebar, and fluid layouts
- ⚡ **GSAP Animations** — Smooth fade-in entrance animations and confetti on level-up
- 🔔 **Toast Notifications** — Contextual success, info, error, and celebration toasts

---

## 🖥️ Preview

> The dashboard features a fixed sidebar navigation on desktop and a bottom tab bar on mobile, with the main content area rendering stats, assets, referral, analytics, and profile info panels.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `v18+`
- **npm** `v9+`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/veloop-rewards-user-profile.git

# 2. Navigate into the project directory
cd veloop-rewards-user-profile

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at **`http://localhost:5173`**.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server with HMR |
| `npm run build` | Build the production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## 🏗️ Project Structure

```
veloop-rewards-user-profile/
├── public/
│   └── avatar.jpg              # Default user avatar
├── src/
│   ├── assets/                 # Static assets (images, icons)
│   ├── components/
│   │   ├── common/
│   │   │   └── Toast.jsx       # Global toast notification component
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx     # Fixed desktop sidebar navigation
│   │   │   └── TopNav.jsx      # Top navigation bar with mobile menu toggle
│   │   ├── profile/
│   │   │   ├── HeroBanner.jsx          # Hero section with XP progress bar
│   │   │   ├── WebStatsRow.jsx         # Key stats overview row
│   │   │   ├── WebAssetsPanel.jsx      # VEs, Gems & Tokens asset cards
│   │   │   ├── WebReferralPanel.jsx    # Referral code & share link panel
│   │   │   ├── WebAnalyticsPanel.jsx   # Withdrawal analytics panel
│   │   │   ├── ProfileInfoPanel.jsx    # User profile information card
│   │   │   ├── SettingsModal.jsx       # Profile settings modal
│   │   │   ├── WithdrawModal.jsx       # Withdrawal request modal
│   │   │   ├── XpProgressBar.jsx       # Animated XP/level progress bar
│   │   │   └── ...                     # Additional profile sub-components
│   │   └── states/             # Empty/loading state components
│   ├── context/
│   │   ├── ProfileContext.jsx  # Global profile state (XP, assets, modals, toasts)
│   │   └── ThemeContext.jsx    # Theme management context
│   ├── data/
│   │   └── mockUserData.js     # Mock user data (initial & active states)
│   ├── hooks/
│   │   ├── useGsapAnimations.js  # GSAP entrance animations & confetti trigger
│   │   └── useClipboard.js       # Clipboard copy utility hook
│   ├── pages/
│   │   └── UserProfilePage.jsx   # Main page — composes all layout & sections
│   ├── styles/                   # Additional CSS modules / theme variables
│   ├── App.jsx                   # Root component — wraps ThemeProvider & ProfileProvider
│   ├── index.css                 # Global styles, CSS custom properties & utilities
│   └── main.jsx                  # Application entry point
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## 🧠 Architecture

The app is driven by two React Contexts:

### `ProfileContext`
Manages all user-facing state:

| State / Action | Description |
|---|---|
| `userData` | Full user object (level, XP, assets, referral, etc.) |
| `gainXP(amount)` | Adds XP, triggers level-up logic & confetti |
| `handleWithdraw(amount)` | Processes a withdrawal with balance validation |
| `updateProfile(fields)` | Patches user profile fields from settings |
| `showToast(message, type)` | Fires a dismissable toast notification |
| `settingsOpen / withdrawOpen` | Controls modal visibility |

### `ThemeContext`
Handles light/dark theme switching via CSS custom properties injected on the root element.

---

## 🎮 Key Interactions

| Interaction | Behaviour |
|---|---|
| **Gain XP button** | Awards XP, updates level, fires confetti + toast on level-up |
| **Withdraw VEs** | Opens withdraw modal → validates balance → updates analytics |
| **Copy Referral Link** | One-click clipboard copy with success toast |
| **Settings** | Edit display name / email directly in a modal |
| **Sidebar / Bottom Nav** | Switches active tab with toast feedback |
| **Theme Toggle** | Switches dark/light theme seamlessly |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 19 | UI library |
| [Vite](https://vite.dev/) | 7 | Build tool & dev server |
| [TailwindCSS](https://tailwindcss.com/) | 4 | Utility-first styling |
| [GSAP](https://gsap.com/) | 3 | Entrance animations |
| [canvas-confetti](https://github.com/catdad/canvas-confetti) | 1.9 | Level-up celebration effect |
| [lucide-react](https://lucide.dev/) | 1.31 | Icon library |

---

## 🎨 Design System

The UI uses CSS custom properties for full theme support:

```css
--bg-base          /* Main page background */
--bg-sidebar       /* Sidebar background */
--bg-hover         /* Element hover state */
--text-primary     /* Primary text colour */
--text-secondary   /* Secondary text colour */
--text-muted       /* Muted / label text */
--border-subtle    /* Subtle border dividers */
--border-strong    /* Stronger border accents */
```

**Brand Colours:**
- 🟠 Primary Accent: `#ff6b00` / `#ff943d`
- 🟣 Secondary: `#7c3aed`
- 🔵 Tertiary: `#0ea5e9`

---

## 📄 License

This project was built as an **internship assignment** for the Veloop platform. All rights reserved.

---

<div align="center">

Made with ❤️ by **Deepanshu** · Internship · © 2026 Veloop Rewards

</div>
