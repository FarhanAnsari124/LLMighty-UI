import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { STATS } from "../constants/data";
import { FONTS } from "../constants/tokens";

const Stats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative py-12 border-y border-white/[0.04] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#050505_0%,#080808_50%,#050505_100%)]" />
      <div className="relative max-w-[1100px] mx-auto px-5 sm:px-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {STATS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.55 }}
            className="text-center"
          >
            <div
              className="text-[28px] sm:text-[34px] font-bold text-[#F5F5F7] tracking-[-1px] leading-none mb-1"
              style={{ fontFamily: FONTS.display }}
            >
              {s.val}
            </div>
            <div className="text-[11px] text-[#48484A] font-medium">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
