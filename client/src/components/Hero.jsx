import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  TbSparkles,
  TbEye,
  TbBrandNpm,
  TbCopy,
  TbCheck,
  TbCode,
} from "react-icons/tb";
import { HERO_CYCLE_WORDS } from "../constants/data";
import { FONTS } from "../constants/tokens";
import { TypingText, FakePricingCard } from "./HeroWidgets";

const PROMPT_TEXT =
  'A glassmorphic pricing card with monthly/yearly toggle, gradient border, and a highlighted "Pro" tier.';

const Hero = ({ onLogin }) => {
  const [wordIdx, setWordIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const NPM_CMD = "npm install llmightyui";

  useEffect(() => {
    const t = setInterval(
      () => setWordIdx((p) => (p + 1) % HERO_CYCLE_WORDS.length),
      2200,
    );
    return () => clearInterval(t);
  }, []);

  const copy = () => {
    navigator.clipboard.writeText(NPM_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 overflow-hidden px-5">
      <HeroBackground />

      <HeroBadge />

      <div className="relative z-10 text-center max-w-[720px]">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="text-[46px] sm:text-[72px] lg:text-[84px] font-bold leading-[0.95] tracking-[-4px] text-[#F5F5F7] mb-3"
          style={{ fontFamily: FONTS.display }}
        >
          Generate
        </motion.h1>

        <div className="h-[72px] sm:h-[90px] lg:h-[104px] overflow-hidden mb-3 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={wordIdx}
              initial={{ y: 50, opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -50, opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[46px] sm:text-[72px] lg:text-[84px] font-bold leading-[0.95] tracking-[-4px] text-[#7C6AF7]"
              style={{ fontFamily: FONTS.display }}
            >
              {HERO_CYCLE_WORDS[wordIdx]}
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="text-[46px] sm:text-[72px] lg:text-[84px] font-bold leading-[0.95] tracking-[-4px] text-[#F5F5F7] mb-8"
          style={{ fontFamily: FONTS.display }}
        >
          UI Components
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.65 }}
          className="text-[15px] sm:text-[17px] text-[#86868B] leading-[1.75] max-w-[480px] mx-auto mb-10"
        >
          Describe what you need. LLMightyUI generates production-ready JSX
          components, customisable in real time, export-ready in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
        >
          <motion.button
            onClick={onLogin}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 bg-[#7C6AF7] text-white text-[13.5px] font-semibold px-7 py-3.5 rounded-2xl cursor-pointer border-none shadow-[0_0_40px_rgba(124,106,247,0.35)] hover:shadow-[0_0_60px_rgba(124,106,247,0.55)] transition-all"
          >
            <TbSparkles size={16} /> Start generating free
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 bg-white/[0.04] text-[#F5F5F7] text-[13.5px] font-semibold px-7 py-3.5 rounded-2xl cursor-pointer border border-white/[0.08] hover:bg-white/[0.07] transition-all"
          >
            <TbEye size={16} /> View components
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.55 }}
          className="inline-flex items-center gap-3 bg-[#0a0a0a] border border-white/[0.07] rounded-2xl px-5 py-3 cursor-pointer group"
          onClick={copy}
        >
          <TbBrandNpm size={16} color="#CC3534" />
          <code className="text-[12.5px] text-[#86868B] font-mono tracking-tight">
            {NPM_CMD}
          </code>
          <div className="text-[#3A3A3C] group-hover:text-[#7C6AF7] transition-colors">
            {copied ? (
              <TbCheck size={14} color="#7C6AF7" />
            ) : (
              <TbCopy size={14} />
            )}
          </div>
        </motion.div>
      </div>

      <HeroPlayground />
    </section>
  );
};

const HeroBackground = () => (
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(124,106,247,0.09)_0%,transparent_65%)]" />
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-[radial-gradient(circle,rgba(124,106,247,0.04)_0%,transparent_70%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:44px_44px]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#050505_100%)]" />
  </div>
);

const HeroBadge = () => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1, duration: 0.6 }}
    className="relative z-10 flex items-center gap-2 bg-[#7C6AF7]/[0.08] border border-[#7C6AF7]/20 rounded-full px-4 py-1.5 mb-8"
  >
    <div className="w-1.5 h-1.5 rounded-full bg-[#7C6AF7] animate-pulse" />
    <span className="text-[11px] text-[#7C6AF7] font-medium tracking-wide">
      AI-Powered UI Generation · Now in Beta
    </span>
  </motion.div>
);

const HeroPlayground = () => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.75, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    className="relative z-10 mt-16 w-full max-w-[640px] mx-auto"
  >
    <div className="relative bg-[#080808] border border-white/[0.07] rounded-[24px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.03)]">
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.05] bg-[#070707]">
        <div className="flex gap-1.5">
          {["#FF5F57", "#FFBD2E", "#28CA42"].map((c) => (
            <div
              key={c}
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
        <div className="flex-1 mx-4 h-6 bg-[#0d0d0d] border border-white/[0.05] rounded-lg flex items-center px-3">
          <span className="text-[10px] text-[#3A3A3C] font-mono">
            llmightyui.dev/playground
          </span>
        </div>
        <div className="w-5 h-5 rounded-md bg-[#7C6AF7]/10 border border-[#7C6AF7]/20 flex items-center justify-center">
          <TbSparkles size={10} color="#7C6AF7" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row min-h-[220px]">
        <div className="sm:w-[44%] p-5 border-b sm:border-b-0 sm:border-r border-white/[0.05]">
          <p className="text-[9.5px] text-[#3A3A3C] uppercase tracking-[0.14em] font-medium mb-3">
            Prompt
          </p>
          <div className="bg-[#0d0d0d] border border-white/[0.05] rounded-xl p-3.5 mb-3">
            <TypingText
              text={PROMPT_TEXT}
              className="text-[11px] text-[#86868B] leading-[1.7] font-mono"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["Tailwind", "Motion", "TypeScript"].map((t) => (
              <span
                key={t}
                className="text-[8.5px] text-[#7C6AF7]/50 bg-[#7C6AF7]/[0.06] border border-[#7C6AF7]/10 rounded-full px-2 py-0.5 font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="sm:w-[56%] p-5 flex items-center justify-center bg-[#050505]">
          <FakePricingCard />
        </div>
      </div>

      <div className="border-t border-white/[0.05] bg-[#070707] px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TbCode size={12} color="#3A3A3C" />
          <span className="text-[10px] text-[#3A3A3C] font-mono">
            PricingCard.jsx · 87 lines
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#28CA42]" />
          <span className="text-[9.5px] text-[#28CA42]/70 font-medium">
            Generated in 1.2s
          </span>
        </div>
      </div>
    </div>

    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-[radial-gradient(ellipse,rgba(124,106,247,0.15)_0%,transparent_70%)] pointer-events-none blur-xl" />
  </motion.div>
);

export default Hero;
