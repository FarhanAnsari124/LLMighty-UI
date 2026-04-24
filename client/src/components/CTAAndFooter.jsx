import React from "react";
import { motion } from "motion/react";
import { TbSparkles, TbBrandGithub, TbBrandTwitter } from "react-icons/tb";
import { fadeUp, FONTS } from "../constants/tokens";

export const CTABanner = ({ onLogin }) => (
  <section className="py-24 px-5 sm:px-8">
    <motion.div
      {...fadeUp(0)}
      className="relative max-w-[1100px] mx-auto rounded-[32px] overflow-hidden border border-white/[0.06] bg-[#070707] p-12 sm:p-16 text-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,106,247,0.08)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#7C6AF7]/40 to-transparent" />

      <div className="relative z-10">
        <p className="text-[10.5px] text-[#7C6AF7] uppercase tracking-[0.22em] font-semibold mb-5">
          Start free today
        </p>
        <h2
          className="text-[34px] sm:text-[52px] font-bold text-[#F5F5F7] tracking-[-2.5px] leading-[1.02] mb-5"
          style={{ fontFamily: FONTS.display }}
        >
          Your next component
          <br />
          is one prompt away.
        </h2>
        <p className="text-[14px] text-[#86868B] max-w-[380px] mx-auto leading-[1.8] mb-9">
          150 free credits. No card required. Generate, preview, and export in
          under 2 seconds.
        </p>
        <motion.button
          onClick={onLogin}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2.5 bg-[#7C6AF7] text-white text-[13.5px] font-semibold px-8 py-4 rounded-2xl cursor-pointer border-none shadow-[0_0_50px_rgba(124,106,247,0.45)] hover:shadow-[0_0_70px_rgba(124,106,247,0.65)] transition-shadow"
        >
          <TbSparkles size={17} />
          Get started — it's free
        </motion.button>
      </div>
    </motion.div>
  </section>
);

export const Footer = () => (
  <footer className="border-t border-white/[0.04] py-10 px-5 sm:px-8">
    <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
      <div className="flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-[8px] bg-[#7C6AF7] flex items-center justify-center">
          <TbSparkles size={11} color="#fff" />
        </div>
        <span
          className="text-[12.5px] font-bold text-[#F5F5F7]"
          style={{ fontFamily: FONTS.display }}
        >
          LLMightyUI
        </span>
        <span className="text-[11px] text-[#2C2C2E] ml-1">© 2025</span>
      </div>

      <div className="flex items-center gap-6">
        {["Components", "Pricing", "Blog", "GitHub"].map((l) => (
          <a
            key={l}
            href="#"
            className="text-[11.5px] text-[#3A3A3C] hover:text-[#86868B] transition-colors"
          >
            {l}
          </a>
        ))}
        <a href="https://www.npmjs.com/package/llmighty-ui-lib" className="text-[11.5px] text-[#3A3A3C] hover:text-[#86868B] transition-colors">Docs</a>
      </div>

      <div className="flex items-center gap-3">
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noreferrer"
          className="text-[#3A3A3C] hover:text-[#86868B] transition-colors"
        >
          <TbBrandTwitter size={16} />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="text-[#3A3A3C] hover:text-[#86868B] transition-colors"
        >
          <TbBrandGithub size={16} />
        </a>
      </div>
    </div>
  </footer>
);
