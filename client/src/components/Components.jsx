import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { TbCheck, TbBraces } from "react-icons/tb";
import { fadeUp, FONTS, V } from "../constants/tokens";

const ShowcaseCard = ({ label, children, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="bg-[#070707] border border-white/[0.06] rounded-[22px] p-6 flex flex-col gap-5 shrink-0 w-[240px] sm:w-[260px] hover:border-[#7C6AF7]/15 transition-colors duration-500 cursor-default"
    >
      <div className="flex-1 flex items-center justify-center min-h-[110px]">
        {children}
      </div>
      <p className="text-[10.5px] text-[#3A3A3C] uppercase tracking-[0.14em] font-semibold text-center">
        {label}
      </p>
    </motion.div>
  );
};

const ButtonShowcase = () => (
  <div className="flex flex-col gap-2.5 w-full items-center">
    <button className="w-full bg-[#7C6AF7] text-white text-[11px] font-semibold py-2.5 rounded-xl border-none cursor-pointer shadow-[0_0_16px_rgba(124,106,247,0.3)]">
      Primary Action
    </button>
    <button className="w-full bg-transparent text-[#7C6AF7] text-[11px] font-semibold py-2.5 rounded-xl border border-[#7C6AF7]/25 cursor-pointer">
      Secondary
    </button>
    <button className="w-full bg-white/[0.04] text-[#86868B] text-[11px] font-semibold py-2.5 rounded-xl border border-white/[0.06] cursor-pointer">
      Ghost
    </button>
  </div>
);

const BadgeShowcase = () => (
  <div className="flex flex-wrap gap-2 justify-center">
    {[
      { t: "New", c: "#7C6AF7" },
      { t: "Beta", c: "#28CA42" },
      { t: "Live", c: "#FF5F57" },
      { t: "Stable", c: "#FFBD2E" },
      { t: "OSS", c: "#86868B" },
    ].map(({ t, c }) => (
      <span
        key={t}
        className="text-[9.5px] font-semibold rounded-full px-2.5 py-1 border"
        style={{ color: c, borderColor: `${c}30`, background: `${c}12` }}
      >
        {t}
      </span>
    ))}
  </div>
);

const InputShowcase = () => (
  <div className="w-full flex flex-col gap-2.5">
    <div className="w-full bg-[#0d0d0d] border border-white/[0.07] rounded-xl px-3 py-2.5 flex items-center gap-2">
      <TbBraces size={11} color="#3A3A3C" />
      <span className="text-[10.5px] text-[#3A3A3C] font-mono">
        email@example.com
      </span>
    </div>
    <div className="w-full bg-[#0d0d0d] border border-[#7C6AF7]/30 rounded-xl px-3 py-2.5 shadow-[0_0_0_3px_rgba(124,106,247,0.1)]">
      <span className="text-[10.5px] text-[#86868B] font-mono">
        Focused state
      </span>
    </div>
  </div>
);

const ToggleShowcase = () => (
  <div className="flex flex-col gap-4 w-full">
    {[true, false, true].map((on, i) => (
      <div key={i} className="flex items-center justify-between">
        <span className="text-[10px] text-[#48484A]">
          {["Dark mode", "Notifications", "Analytics"][i]}
        </span>
        <div
          className={`w-9 h-5 rounded-full relative transition-all ${on ? "bg-[#7C6AF7]" : "bg-white/[0.08]"}`}
        >
          <div
            className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${on ? "right-0.5" : "left-0.5"}`}
          />
        </div>
      </div>
    ))}
  </div>
);

const AvatarShowcase = () => (
  <div className="flex flex-col items-center gap-3">
    <div className="flex items-center">
      {["#7C6AF7", "#FF5F57", "#FFBD2E", "#28CA42"].map((c, i) => (
        <div
          key={i}
          className="w-9 h-9 rounded-full border-2 border-[#070707] flex items-center justify-center text-[10px] font-bold text-white"
          style={{
            background: c,
            marginLeft: i > 0 ? "-10px" : 0,
            zIndex: 4 - i,
          }}
        >
          {["A", "B", "C", "D"][i]}
        </div>
      ))}
      <div
        className="w-9 h-9 rounded-full border-2 border-[#070707] bg-[#0d0d0d] flex items-center justify-center text-[8px] text-[#3A3A3C] font-bold"
        style={{ marginLeft: "-10px" }}
      >
        +8
      </div>
    </div>
    <span className="text-[9px] text-[#3A3A3C]">12 team members</span>
  </div>
);

const StatCardShowcase = () => (
  <div className="w-full bg-[#0d0d0d] border border-white/[0.06] rounded-2xl p-4">
    <p className="text-[9.5px] text-[#3A3A3C] uppercase tracking-widest mb-2">
      Revenue
    </p>
    <p
      className="text-[24px] font-bold text-[#F5F5F7] tracking-tight leading-none mb-1"
      style={{ fontFamily: FONTS.display }}
    >
      $24.8K
    </p>
    <div className="flex items-center gap-1">
      <span className="text-[9px] text-[#28CA42] font-semibold">+12.4%</span>
      <span className="text-[9px] text-[#3A3A3C]">vs last mo</span>
    </div>
  </div>
);

const Components = () => (
  <section id="components" className="py-24 overflow-hidden">
    <div className="max-w-[1100px] mx-auto px-5 sm:px-8 mb-12">
      <motion.div {...fadeUp(0)} className="text-center">
        <p className="text-[10.5px] text-[#7C6AF7] uppercase tracking-[0.22em] font-semibold mb-4">
          Component Library
        </p>
        <h2
          className="text-[34px] sm:text-[46px] font-bold text-[#F5F5F7] tracking-[-2px] leading-[1.05] mb-4"
          style={{ fontFamily: FONTS.display }}
        >
          See what gets built.
        </h2>
        <p className="text-[14px] text-[#86868B] max-w-[380px] mx-auto leading-[1.75]">
          Every component is AI-generated, live-previewed, and export-ready.
        </p>
      </motion.div>
    </div>

    <div className="flex gap-4 overflow-x-auto px-5 sm:px-12 pb-4 scrollbar-hide snap-x">
      <ShowcaseCard label="Button" delay={0}>
        <ButtonShowcase />
      </ShowcaseCard>
      <ShowcaseCard label="Badge" delay={0.07}>
        <BadgeShowcase />
      </ShowcaseCard>
      <ShowcaseCard label="Input" delay={0.14}>
        <InputShowcase />
      </ShowcaseCard>
      <ShowcaseCard label="Toggle" delay={0.21}>
        <ToggleShowcase />
      </ShowcaseCard>
      <ShowcaseCard label="Avatar Group" delay={0.28}>
        <AvatarShowcase />
      </ShowcaseCard>
      <ShowcaseCard label="Stat Card" delay={0.35}>
        <StatCardShowcase />
      </ShowcaseCard>
    </div>
  </section>
);

export default Components;
