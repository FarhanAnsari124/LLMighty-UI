import {
  TbLogin2,
  TbSparkles,
  TbEye,
  TbCode,
  TbDownload,
  TbWand,
  TbPalette,
  TbCpu,
  TbPackage,
  TbBraces,
} from "react-icons/tb";

export const AUTH_STEPS = [
  {
    icon: TbLogin2,
    title: "Sign in instantly",
    desc: "Google OAuth — one tap, zero friction, full access.",
  },
  {
    icon: TbSparkles,
    title: "150 credits, free",
    desc: "Enough tokens to explore every generation feature.",
  },
  {
    icon: TbEye,
    title: "Live preview",
    desc: "Every prop change renders in real time, no reloads.",
  },
  {
    icon: TbCode,
    title: "AI writes the JSX",
    desc: "Production-ready components built by the model.",
  },
  {
    icon: TbDownload,
    title: "Export anywhere",
    desc: "Drop clean, typed code straight into your repo.",
  },
];

export const HERO_CYCLE_WORDS = [
  "Beautiful",
  "Scalable",
  "Typed",
  "Instant",
  "Yours",
];

export const NAV_LINKS = ["Features", "Components", "Pricing"];

export const STATS = [
  { val: "10K+", label: "Components Generated" },
  { val: "2.1s", label: "Avg. Generation Time" },
  { val: "98%", label: "TypeScript Coverage" },
  { val: "4.9★", label: "Developer Rating" },
];

export const FEATURES = [
  {
    icon: TbWand,
    title: "Describe → Generate",
    body: "Write a plain-English prompt. The AI produces a complete, prop-typed JSX component in under 2 seconds.",
    wide: true,
    accent: true,
  },
  {
    icon: TbEye,
    title: "Live Preview",
    body: "Every tweak renders instantly. No browser refresh, no build step.",
    wide: false,
  },
  {
    icon: TbPalette,
    title: "Prop Tuning",
    body: "Fine-tune colours, sizes, variants and states through an intelligent prop panel.",
    wide: false,
  },
  {
    icon: TbCpu,
    title: "AI that learns your stack",
    body: "Tell it you use Tailwind, ShadCN, or bare CSS. LLMightyUI adapts output to your project conventions exactly.",
    wide: false,
  },
  {
    icon: TbBraces,
    title: "TypeScript First",
    body: "Every component ships with full type definitions. Zero any.",
    wide: false,
  },
  {
    icon: TbPackage,
    title: "npm · Copy · Download",
    body: "Three ways to get your code. One command, one click, or a direct file download.",
    wide: true,
  },
];

export const CAPABILITY_PILLS = [
  "AI Generation",
  "Live Preview",
  "JSX Export",
  "Prop Tuning",
  "Zero Config",
];

export const NPM_CODE_LINES = [
  {
    tokens: [
      { c: "#86868B", t: "import" },
      { c: "#F5F5F7", t: " { Button, Card, Badge } " },
      { c: "#86868B", t: "from" },
      { c: "#7C6AF7", t: " 'llmightyui'" },
    ],
  },
  { tokens: [] },
  {
    tokens: [
      { c: "#7C6AF7", t: "export" },
      { c: "#86868B", t: " default " },
      { c: "#28CA42", t: "function" },
      { c: "#F5F5F7", t: " App() {" },
    ],
  },
  { tokens: [{ c: "#86868B", t: "  return (" }] },
  {
    tokens: [
      { c: "#86868B", t: "    <" },
      { c: "#FFBD2E", t: "Card" },
      { c: "#7C6AF7", t: " variant" },
      { c: "#86868B", t: "=" },
      { c: "#7C6AF7", t: '"glass"' },
      { c: "#86868B", t: ">" },
    ],
  },
  {
    tokens: [
      { c: "#86868B", t: "      <" },
      { c: "#FFBD2E", t: "Badge" },
      { c: "#7C6AF7", t: " color" },
      { c: "#86868B", t: "=" },
      { c: "#7C6AF7", t: '"violet"' },
      { c: "#86868B", t: " />" },
    ],
  },
  {
    tokens: [
      { c: "#86868B", t: "      <" },
      { c: "#FFBD2E", t: "Button" },
      { c: "#86868B", t: ">" },
      { c: "#F5F5F7", t: "Get started" },
      { c: "#86868B", t: "</" },
      { c: "#FFBD2E", t: "Button" },
      { c: "#86868B", t: ">" },
    ],
  },
  {
    tokens: [
      { c: "#86868B", t: "    </" },
      { c: "#FFBD2E", t: "Card" },
      { c: "#86868B", t: ">" },
    ],
  },
  { tokens: [{ c: "#86868B", t: "  )" }] },
  { tokens: [{ c: "#F5F5F7", t: "}" }] },
];
