#  TruthGuard

**AI-powered fact-checking platform for the Democratic Republic of Congo.**

TruthGuard helps users verify news, articles, URLs, and images before sharing them — combining AI analysis with trusted source comparison to produce a clear credibility report.

---

##  Features

-  **Text verification** — paste an article or claim to check
-  **URL verification** — analyze a news link directly
-  **Image verification** — check images for manipulation or misattribution
-  **AI Analysis** — automated evidence gathering and comparison
-  **Trusted Sources** — cross-references reputable outlets (Reuters, BBC, WHO, etc.)
-  **Transparency** — every source is cited and clickable
-  **AI Assistant** — ask follow-up questions about a report
-  **Bilingual (FR/EN)** — French by default, English available instantly, with room to add Lingala, Swahili, Kikongo, and Tshiluba later

---

##  Tech Stack

| Layer | Technology |
|---|---|
| Framework | React + TypeScript (Vite) |
| Styling | Tailwind CSS v4 |
| Routing | React Router v6 |
| Animation | Framer Motion |
| Icons | Lucide React |
| HTTP Client | Axios |
| i18n | i18next, react-i18next, i18next-browser-languagedetector |

---

##  Design System

**Colors**

| Name | Hex | Usage |
|---|---|---|
| Primary | `#072B74` | Logo, buttons, links |
| Primary Hover | `#0A3A96` | Button hover |
| Accent | `#1976D2` | Icons, highlights |
| Background | `#F8FAFC` | Page background |
| Surface | `#FFFFFF` | Cards |
| Border | `#E5E7EB` | Borders |
| Text | `#111827` | Main text |
| Secondary Text | `#6B7280` | Descriptions |
| Success | `#16A34A` | Verified |
| Warning | `#F59E0B` | Needs verification |
| Danger | `#DC2626` | Low credibility |

**Typography**
- Headings → `Poppins`
- Body → `Inter`

**Spacing**
- Section padding: `80px`
- Card padding: `24px`
- Button radius: `12px`
- Card radius: `18px`

---

##  Project Structure

```
src/
├── assets/              # Logo, icons, images
├── components/
│   ├── ui/              # Atoms: Button, Card, Badge, Input, Textarea, Tabs, Progress Ring
│   ├── layout/           # Navbar, Footer
│   ├── home/             # Hero, Features, How It Works
│   ├── verify/            # Input cards, analyze form
│   └── report/           # Results dashboard, source cards, AI assistant
├── locales/
│   ├── fr/common.json    # French translations (default)
│   └── en/common.json    # English translations
├── pages/                 # Home, Verify, About
├── services/               # API calls
├── hooks/                  # Custom React hooks
├── types/                  # TypeScript types
├── i18n/                   # i18next config
├── styles/                 # Global styles / design tokens
└── App.tsx
```

Architecture follows **Atomic Design**:
`Atoms → Molecules → Organisms → Pages`

---

## Internationalization

French is the default language, with English available via a language switcher in the navbar. Adding a new language only requires a new `locales/<lang>/common.json` file — no code changes required.

```tsx
const { t } = useTranslation();
<h1>{t("hero_title")}</h1>
```

---

##  Getting Started

### Prerequisites
- Node.js (LTS recommended)
- npm

### Installation

```bash
# Clone the repo
git clone <your-repo-url>
cd truthguard-frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

### Build for production

```bash
npm run build
```

---

## 🏆 Roadmap / Sprint Plan

**Sprint 1 — Foundation & Home Page**
- [ ] Initialize React + Vite + TypeScript project
- [ ] Install Tailwind CSS
- [ ] Set up fonts and color system
- [ ] Set up i18n (FR default, EN)
- [ ] Build reusable Button and Card components
- [ ] Build the Navbar (with language switcher)
- [ ] Build the Hero section
- [ ] Build the Features section
- [ ] Build the Footer

**Sprint 2 — Verify Page**
- [ ] Build input cards (Text / URL / Image)
- [ ] Build the Analyze form
- [ ] Build the loading state (Reading Article → Searching Sources → Comparing Evidence → Generating Report)

**Sprint 3 — Results & Backend Integration**
- [ ] Build the results dashboard (credibility score, evidence, sources, recommendation)
- [ ] Build the AI assistant follow-up chat
- [ ] Connect to backend API

---

##  Contributing

This project follows a component-by-component, commit-by-commit workflow to keep the Git history clean and each change testable. See open issues or the roadmap above for current priorities.

---

##  License

_Add your license here (e.g. MIT)._

---

##  Vite Template Reference

This project was scaffolded with the React + TypeScript + Vite template. The notes below are kept from the default template for reference.

### React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

### React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
