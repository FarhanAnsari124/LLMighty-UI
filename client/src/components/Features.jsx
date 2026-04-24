import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { FEATURES } from "../constants/data";
import { fadeUp, FONTS, T4 } from "../constants/tokens";

const FeatureCard = ({ f, i }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 26 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.07, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.25 } }}
      className={`relative group rounded-[22px] border border-white/[0.06] overflow-hidden
        ${f.wide ? "sm:col-span-2" : "sm:col-span-1"}
        ${f.accent ? "bg-gradient-to-br from-[#0f0b24] to-[#070707]" : "bg-[#070707]"}
      `}
    >
      {f.accent && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(124,106,247,0.12)_0%,transparent_60%)] pointer-events-none" />
      )}
      <div className="absolute inset-0 rounded-[22px] border border-[#7C6AF7]/0 group-hover:border-[#7C6AF7]/15 transition-all duration-500 pointer-events-none" />

      <div className="relative p-7 sm:p-8 h-full flex flex-col">
        <div
          className={`w-9 h-9 rounded-[11px] flex items-center justify-center mb-5 border
          ${
            f.accent
              ? "bg-[#7C6AF7] border-transparent shadow-[0_0_20px_rgba(124,106,247,0.4)]"
              : "bg-white/[0.03] border-white/[0.07]"
          }`}
        >
          <f.icon size={16} color={f.accent ? "#fff" : T4} />
        </div>
        <h3
          className="text-[14.5px] font-bold text-[#F5F5F7] mb-2 tracking-[-0.3px]"
          style={{ fontFamily: FONTS.display }}
        >
          {f.title}
        </h3>
        <p className="text-[12.5px] text-[#48484A] leading-[1.75]">{f.body}</p>
      </div>
    </motion.div>
  );
};

const Features = () => (
  <section id="features" className="py-24 px-5 sm:px-8 max-w-[1100px] mx-auto">
    <motion.div {...fadeUp(0)} className="text-center mb-14">
      <p className="text-[10.5px] text-[#7C6AF7] uppercase tracking-[0.22em] font-semibold mb-4">
        Why LLMightyUI
      </p>
      <h2
        className="text-[34px] sm:text-[46px] font-bold text-[#F5F5F7] tracking-[-2px] leading-[1.05] mb-4"
        style={{ fontFamily: FONTS.display }}
      >
        Everything you need.
        <br />
        <span className="text-[#3A3A3C]">Nothing you don't.</span>
      </h2>
      <p className="text-[14px] text-[#86868B] max-w-[400px] mx-auto leading-[1.75]">
        A focused toolset for engineers who want AI speed without sacrificing
        code quality.
      </p>
    </motion.div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {FEATURES.map((f, i) => (
        <FeatureCard key={i} f={f} i={i} />
      ))}
    </div>
  </section>
);

export default Features;
