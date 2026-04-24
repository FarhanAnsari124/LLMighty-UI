import React, { useState } from "react";
import { motion } from "motion/react";
import { TbBrandNpm, TbCopy, TbCheck } from "react-icons/tb";
import { NPM_CODE_LINES } from "../constants/data";
import { fadeUp, FONTS, V } from "../constants/tokens";

const NPMSection = () => {
  const [copied, setCopied] = useState(false);
  const CMD = "npm install llmightyui";

  const copy = () => {
    navigator.clipboard.writeText(CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="pricing" className="py-24 px-5 sm:px-8 max-w-[1100px] mx-auto">
      <div className="grid sm:grid-cols-2 gap-6 items-center">
        <motion.div {...fadeUp(0)}>
          <p className="text-[10.5px] text-[#7C6AF7] uppercase tracking-[0.22em] font-semibold mb-5">
            npm package
          </p>
          <h2
            className="text-[34px] sm:text-[42px] font-bold text-[#F5F5F7] tracking-[-2px] leading-[1.05] mb-4"
            style={{ fontFamily: FONTS.display }}
          >
            One install.
            <br />
            Infinite UI.
          </h2>
          <p className="text-[13.5px] text-[#86868B] leading-[1.8] mb-8 max-w-[320px]">
            Import any generated component directly. Tree-shakeable, zero
            runtime dependencies, full SSR support.
          </p>

          <div
            className="flex items-center gap-3 bg-[#0a0a0a] border border-white/[0.07] rounded-2xl px-5 py-3.5 w-fit cursor-pointer group"
            onClick={copy}
          >
            <TbBrandNpm size={18} color="#CC3534" />
            <code className="text-[13px] text-[#86868B] font-mono">{CMD}</code>
            <div className="text-[#3A3A3C] group-hover:text-[#7C6AF7] transition-colors ml-2">
              {copied ? <TbCheck size={15} color={V} /> : <TbCopy size={15} />}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-5">
            {["Tree-shakeable", "SSR ready", "Zero deps", "TypeScript"].map(
              (t) => (
                <span
                  key={t}
                  className="text-[10px] text-[#3A3A3C] bg-white/[0.03] border border-white/[0.05] rounded-full px-3 py-1 font-medium"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.12)}>
          <div className="bg-[#070707] border border-white/[0.07] rounded-[22px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.05]">
              {["#FF5F57", "#FFBD2E", "#28CA42"].map((c) => (
                <div
                  key={c}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: c }}
                />
              ))}
              <span className="ml-2 text-[10px] text-[#3A3A3C] font-mono">
                App.jsx
              </span>
            </div>
            <div className="p-5 font-mono text-[11.5px] leading-[1.9]">
              {NPM_CODE_LINES.map((line, li) => (
                <div key={li}>
                  {line.tokens.length === 0 ? (
                    <br />
                  ) : (
                    line.tokens.map((tok, ti) => (
                      <span key={ti} style={{ color: tok.c }}>
                        {tok.t}
                      </span>
                    ))
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NPMSection;
