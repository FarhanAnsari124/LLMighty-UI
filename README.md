<div align="center">

<img src="https://img.shields.io/badge/Beta-Live-6ee7b7?style=flat-square&labelColor=0a0a0a" />
&nbsp;
<img src="https://img.shields.io/npm/v/llmighty-ui-lib?color=818cf8&style=flat-square&label=npm" />
&nbsp;
<img src="https://img.shields.io/npm/dm/llmighty-ui-lib?color=fb7185&style=flat-square&label=downloads" />
&nbsp;
<img src="https://img.shields.io/github/license/farhanansari/llmighty-ui?color=6ee7b7&style=flat-square" />
&nbsp;
<img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square" />

<br /><br />

# ⚡ LLMightyUI

### Generate Beautiful UI Components with AI

**Describe what you need. LLMightyUI generates production-ready JSX components,  
customisable in real time, export-ready in seconds.**

[🚀 Start Generating Free](https://llmighty-ui.vercel.app/)&nbsp;·&nbsp; [📦 NPM Package](https://www.npmjs.com/package/llmighty-ui-lib) &nbsp;·&nbsp; [📖 Docs](https://www.npmjs.com/package/llmighty-ui-lib) &nbsp;·&nbsp; [🐛 Report Bug](../../issues)

<br />

</div>

---

## ✨ What is LLMightyUI?

LLMightyUI is a **dual-mode React UI solution** — a production-ready component library *and* an AI-powered component generation studio, all in one. Developers can install pre-built components via npm or simply describe any UI in plain English and receive a complete, copy-paste-ready React component instantly.

Built on the MERN stack with subscription-based access, LLMightyUI is designed to be the last component toolkit you'll ever reach for.

---

## 🖼️ Screenshots

### Landing Page — Hero
> Generate production-ready JSX components, customisable in real time.

![LLMightyUI Landing Page](https://github.com/FarhanAnsari124/LLMighty-UI/blob/24ee21aa389d0e05edc6d8d0baa0b5f484d5987c/screenshots/Screenshot%202026-04-25%20183121.png)

---

### Sign In — Welcome Back
> AI-powered components, live customisation, and instant export — engineered for speed.  
> New users get **150 free credits** on sign-in.

![LLMightyUI Login Modal](https://github.com/FarhanAnsari124/LLMighty-UI/blob/24ee21aa389d0e05edc6d8d0baa0b5f484d5987c/screenshots/Screenshot%202026-04-25%20183147.png)

---

### AI Component Studio
> Describe your React component in plain English. Preview, save, and publish — all in one place.

![LLMightyUI AI Studio](https://github.com/FarhanAnsari124/LLMighty-UI/blob/24ee21aa389d0e05edc6d8d0baa0b5f484d5987c/screenshots/Screenshot%202026-04-25%20183247.png)

---

### My Library — Saved Components
> All your AI-generated components in one place. Preview, copy, or delete anytime.

![LLMightyUI Saved Library](https://github.com/FarhanAnsari124/LLMighty-UI/blob/24ee21aa389d0e05edc6d8d0baa0b5f484d5987c/screenshots/Screenshot%202026-04-25%20183222.png)

---

## 🌊 User Flow

```
1. Sign In (Google OAuth)
        │
        ▼
2. Receive 150 Free Credits
        │
        ▼
3. AI Component Studio
   └── Describe your component in plain English
   └── Click "Generate" (or press Enter)
   └── Live preview renders instantly
        │
        ▼
4. Review & Export
   └── Preview rendered component
   └── Copy JSX code
   └── Save to My Library
        │
        ▼
5. My Library
   └── Browse all saved components
   └── Search by name
   └── Preview / Copy / Delete anytime
```

---

## 🧩 Features

| Feature | Description |
|---|---|
| 🤖 **AI Generation** | Describe any UI in plain English — receive a production-ready JSX component instantly |
| ⚡ **Live Preview** | See your component rendered in real time, right in the browser |
| 📚 **My Library** | Save, search, preview, and manage all your generated components |
| 💾 **JSX Export** | Copy clean, export-ready code with a single click |
| 🎛️ **Prop Tuning** | Every generated component is customisable via props — no CSS overrides needed |
| 🧩 **Component Library** | Pre-built, production-ready React components installable via `npm` |
| 💳 **SaaS Subscriptions** | Razorpay-powered billing for tiered access plans |
| 🔐 **Auth System** | Full user authentication and session management via Google OAuth |
| 📦 **NPM Ready** | Packaged with `tsup` for ESM/CJS dual output |

---

## 🚀 Getting Started

### Option A — Use the AI Studio (Recommended)

1. Visit [LLMightyUI](#) and click **"Start Generating Free"**
2. Sign in with Google — you'll receive **150 free credits**
3. Describe your component in the AI Component Studio
4. Preview, copy, and export your JSX — done!

**Example prompts to try:**
- `A glassmorphic pricing card with toggle`
- `Animated sidebar navigation with icons`
- `Dark mode toggle with smooth transition`
- `Notification toast with progress bar`
- `Command palette with fuzzy search`

---

### Option B — Install via NPM

Use the pre-built component library in your project:

```bash
npm install llmighty-ui-lib
```

```jsx
import { Button, Card, ProfileCard } from "llmighty-ui-lib";

function App() {
  return (
    <>
      <Button variant="primary" size="md" icon="🚀">
        Deploy
      </Button>

      <Card
        title="Quantum Renderer"
        tag="Stable"
        accentColor="#6ee7b7"
        description="GPU-accelerated rendering at 120fps."
      />

      <ProfileCard
        name="Farhan Ansari"
        role="Fullstack Developer"
        company="LLMighty"
        accentColor="#818cf8"
      />
    </>
  );
}
```

---

## 📦 Components

### `<Button />`

```jsx
<Button
  variant="primary"       // primary | secondary | outline | ghost | danger
  size="md"               // sm | md | lg
  icon="🚀"
  iconPosition="left"     // left | right
  rounded={false}
  fullWidth={false}
  loading={false}
  disabled={false}
  accentColor="#6ee7b7"
  onClick={() => {}}
>
  Deploy
</Button>
```

### `<Card />`

```jsx
<Card
  title="Card Title"
  subtitle="Supporting line"
  description="Body content goes here."
  tag="New"
  size="md"               // sm | md | lg
  accentColor="#6ee7b7"
  collapsible={true}
  footer={<span>Footer content</span>}
/>
```

### `<ProfileCard />`

```jsx
<ProfileCard
  name="Farhan Ansari"
  role="Fullstack Developer"
  company="LLMighty"
  bio="Building cool things with React and AI."
  initials="FA"
  accentColor="#818cf8"
  stats={[
    { label: "Projects", value: "42" },
    { label: "Followers", value: "1.2k" },
  ]}
  badges={["React", "Node.js", "AI"]}
  onFollow={() => {}}
  onMessage={() => {}}
/>
```

---

## 🛠️ Tech Stack

**Frontend**
- React.js — component development and playground UI

**Backend**
- Node.js + Express.js — REST API and AI proxy layer
- MongoDB — user data, component metadata, and usage logs

**Integrations**
- [OpenRouter API](https://openrouter.ai) — AI model routing for component generation
- [Razorpay](https://razorpay.com) — payment processing and subscription management

**Tooling**
- `tsup` — library bundling (ESM + CJS)
- `npm` — package distribution

---

## 🗂️ Project Structure

```
llmighty-ui-lib/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   └── index.js
│   │   ├── Card/
│   │   │   ├── Card.jsx
│   │   │   └── index.js
│   │   └── ProfileCard/
│   │       ├── ProfileCard.jsx
│   │       └── index.js
│   └── index.js
├── tsup.config.js
├── package.json
└── README.md
```

---

## 🗺️ Roadmap

- [ ] CLI tool for scaffolding (à la shadcn/ui)
- [ ] Visual customization dashboard
- [ ] Dark / light / custom theme tokens
- [ ] Figma plugin for design-to-code export
- [ ] Extended component library (Table, Modal, Toast, etc.)
- [ ] Component versioning and changelogs

---

## 🤝 Contributing

Contributions are welcome and appreciated. To get started:

1. Fork the repository
2. Create a feature branch — `git checkout -b feat/your-feature`
3. Commit your changes — `git commit -m "feat: add your feature"`
4. Push to the branch — `git push origin feat/your-feature`
5. Open a Pull Request

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before submitting. For major changes, open an issue first to discuss what you'd like to change.

---

## 📄 License

Distributed under the MIT License. See [LICENSE](./LICENSE) for details.

---

<div align="center">

Built with ☕ by **[Farhan Ansari](https://github.com/FarhanAnsari124)**

If this project helped you, please consider giving it a ⭐ — it keeps the project alive!

</div>
