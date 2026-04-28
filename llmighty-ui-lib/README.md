<div align="center">

<img src="https://img.shields.io/npm/v/llmighty-ui-lib?color=6ee7b7&style=for-the-badge&label=llmighty-ui-lib" alt="npm version" />
<img src="https://img.shields.io/npm/dm/llmighty-ui-lib?color=818cf8&style=for-the-badge" alt="npm downloads" />
<img src="https://img.shields.io/github/license/FarhanAnsari124/LLMighty-UI?color=fb7185&style=for-the-badge" alt="license" />
<img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge" alt="PRs Welcome" />

# ⚡ LLMighty UI

### The last React component library you'll ever need.

**Production-ready components + AI generation in one package.**  
Describe any UI in plain English → get a ready-to-use React component instantly.

[GitHub](https://github.com/FarhanAnsari124/LLMighty-UI) · [Report a Bug](https://github.com/FarhanAnsari124/LLMighty-UI/issues) · [Request a Feature](https://github.com/FarhanAnsari124/LLMighty-UI/issues)

</div>

---

## 🚀 Quick Start

```bash
npm install llmighty-ui-lib
```

```jsx
import { Button, Card, ProfileCard } from "llmighty-ui-lib";

function App() {
  return (
    <>
      <Button variant="primary" size="md" icon="🚀">
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

## ✨ Why LLMighty UI?

| | LLMighty UI | Other Libraries |
|---|---|---|
| Pre-built components | ✅ | ✅ |
| AI component generation | ✅ | ❌ |
| Prop-based theming (no CSS overrides) | ✅ | ⚠️ |
| ESM + CJS dual output | ✅ | ⚠️ |
| SaaS-ready with subscriptions | ✅ | ❌ |

---

## 🧩 Components

### `<Button />`

A fully featured button with variants, icons, loading states, and custom theming.

```jsx
<Button
  variant="primary"     // primary | secondary | outline | ghost | danger
  size="md"             // sm | md | lg
  icon="🚀"
  iconPosition="left"   // left | right
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

---

### `<Card />`

A versatile content card with collapsible support, custom accents, and footer slots.

```jsx
<Card
  title="Card Title"
  subtitle="Supporting line"
  description="Body content goes here."
  tag="New"
  size="md"             // sm | md | lg
  accentColor="#6ee7b7"
  collapsible={true}
  footer={<span>Footer content</span>}
/>
```

---

### `<ProfileCard />`

A developer-focused profile card with stats, badges, and action buttons.

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

## 🤖 AI Component Generation

> Available on paid plans via the [LLMighty UI Platform](https://github.com/FarhanAnsari124/LLMighty-UI)

Describe any UI in natural language and receive a complete, copy-paste-ready React component — rendered live in the playground and exportable to your project.

**Example:**
```
"Create a responsive pricing card with 3 tiers, a dark theme,
and a highlighted recommended plan."
```

**Output:** A fully functional React component, live-rendered and ready to drop into your codebase.

Powered by [OpenRouter](https://openrouter.ai) for multi-model AI routing.

---

## 🎨 Theming

Every component is customizable via props — no CSS overrides, no `!important` hacks.

```jsx
// Swap accent color per component instance
<Button accentColor="#f59e0b" variant="primary">Custom Theme</Button>
<Card accentColor="#ec4899" title="Pink Card" />
```

Dark mode, light mode, and custom theme token support coming soon on the roadmap.

---

## 📦 Package Info

| Property | Value |
|---|---|
| Bundle formats | ESM + CJS (via `tsup`) |
| Framework | React |
| Peer dependency | `react >= 17` |
| License | MIT |

---

## 🗺️ Roadmap

- [ ] CLI tool for scaffolding (à la shadcn/ui)
- [ ] Visual customization dashboard
- [ ] Dark / light / custom theme tokens
- [ ] Figma plugin for design-to-code export
- [ ] Extended library — Table, Modal, Toast, Drawer, and more
- [ ] Component versioning and changelogs

---

## 🤝 Contributing

Contributions are welcome! To get started:

```bash
# 1. Fork the repo and clone it
git clone https://github.com/FarhanAnsari124/LLMighty-UI.git

# 2. Create a feature branch
git checkout -b feat/your-feature

# 3. Commit and push
git commit -m "feat: add your feature"
git push origin feat/your-feature

# 4. Open a Pull Request
```

Please read [CONTRIBUTING.md](https://github.com/FarhanAnsari124/LLMighty-UI/blob/main/CONTRIBUTING.md) before submitting.

---

## 📄 License

Distributed under the **MIT License**. See [LICENSE](https://github.com/FarhanAnsari124/LLMighty-UI/blob/main/LICENSE) for details.

---

<div align="center">

Built with ☕ by **[Farhan Ansari](https://github.com/FarhanAnsari124)**

If this project helped you, please give it a ⭐ on [GitHub](https://github.com/FarhanAnsari124/LLMighty-UI) — it keeps the project alive!

</div>