<div align="center">

# ⚡ LLMighty UI

### AI-Powered React Component Library & SaaS Platform

[![npm version](https://img.shields.io/npm/v/llmighty-ui-lib?color=6ee7b7&style=flat-square)](https://www.npmjs.com/package/llmighty-ui-lib)
[![npm downloads](https://img.shields.io/npm/dm/llmighty-ui-lib?color=818cf8&style=flat-square)](https://www.npmjs.com/package/llmighty-ui-lib)
[![license](https://img.shields.io/github/license/farhanansari/llmighty-ui?color=fb7185&style=flat-square)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](./CONTRIBUTING.md)

**Use production-ready components — or generate entirely new ones with a single AI prompt.**

[Documentation](#) · [Live Demo](#) · [NPM Package](#) · [Report a Bug](../../issues)

</div>

---

## Overview

LLMighty UI is a dual-mode React UI solution. It ships as a standard npm library of pre-built, customizable components, and layers an AI generation engine on top — so developers can describe any UI in plain English and receive a ready-to-use React component instantly.

Built on a full MERN stack with subscription-based access, LLMighty UI is designed to be the last component toolkit you'll reach for.

---

## Features

| Feature | Description |
|---|---|
| 🧩 **Component Library** | Production-ready React components, installable via npm |
| 🤖 **AI Generation** | Prompt-to-component via OpenRouter API — no design skills needed |
| 💳 **SaaS Subscriptions** | Razorpay-powered billing for tiered access plans |
| 🔐 **Auth System** | Full user authentication and session management |
| 🎨 **Prop-based Theming** | Every component is customizable via props — no CSS overrides |
| 📦 **NPM Ready** | Packaged with `tsup` for ESM/CJS dual output |

---

## Tech Stack

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
- npm — package distribution

---

## Getting Started

### Installation

```bash
npm install llmighty-ui-lib
```

### Basic Usage

```jsx
import { Button, Card, ProfileCard } from "llmighty-ui-lib";

function App() {
  return (
    <>
      <Button variant="primary" size="md">
        Get Started
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

## Components

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

## AI Component Generation

LLMighty UI includes a prompt-based generation layer for users on paid plans. Describe any UI in natural language and receive a complete, copy-paste-ready React component.

**Example prompt:**

```
"Create a responsive pricing card with 3 tiers, a dark theme, and a highlighted recommended plan."
```

**Output:** A fully functional React component, rendered live in the playground and exportable to your project.

> AI generation is powered by [OpenRouter](https://openrouter.ai) and requires an active subscription. See [Pricing](#) for plan details.

---

## Project Structure

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

## Roadmap

- [ ] CLI tool for scaffolding (à la shadcn/ui)
- [ ] Visual customization dashboard
- [ ] Dark / light / custom theme tokens
- [ ] Figma plugin for design-to-code export
- [ ] Extended component library (Table, Modal, Toast, etc.)
- [ ] Component versioning and changelogs

---

## Contributing

Contributions are welcome and appreciated. To get started:

1. Fork the repository
2. Create a feature branch — `git checkout -b feat/your-feature`
3. Commit your changes — `git commit -m "feat: add your feature"`
4. Push to the branch — `git push origin feat/your-feature`
5. Open a Pull Request

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before submitting. For major changes, open an issue first to discuss what you'd like to change.

---

## License

Distributed under the MIT License. See [LICENSE](./LICENSE) for details.

---

<div align="center">

Built with ☕ by **[Farhan Ansari](https://github.com/farhanansari)**

If this project helped you, please consider giving it a ⭐ — it keeps the project alive!

</div>
