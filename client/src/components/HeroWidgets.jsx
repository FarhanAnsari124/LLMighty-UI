import React, { useEffect, useState } from "react";
import { TbCheck } from "react-icons/tb";
import { V } from "../constants/tokens";

export const TypingText = ({ text, className }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(t);
    }, 28);
    return () => clearInterval(t);
  }, [text]);

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse text-[#7C6AF7]">|</span>
    </span>
  );
};

export const FakePricingCard = () => (
  <div className="relative w-full max-w-[210px]">
    <div className="flex items-center justify-center gap-2 mb-4">
      <span className="text-[9px] text-[#7C6AF7] font-medium">Monthly</span>
      <div className="w-7 h-4 bg-[#7C6AF7] rounded-full relative">
        <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm" />
      </div>
      <span className="text-[9px] text-[#3A3A3C] font-medium">Yearly</span>
    </div>
    <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-[#7C6AF7]/40 via-transparent to-[#7C6AF7]/10">
      <div className="rounded-2xl bg-[#0d0d0d] p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] text-[#7C6AF7] font-bold uppercase tracking-widest">
            Pro
          </span>
          <span className="text-[8px] bg-[#7C6AF7]/10 text-[#7C6AF7] border border-[#7C6AF7]/20 rounded-full px-2 py-0.5 font-medium">
            Popular
          </span>
        </div>
        <div className="mb-3">
          <span className="text-[26px] font-bold text-[#F5F5F7] tracking-tight leading-none">
            $19
          </span>
          <span className="text-[9px] text-[#3A3A3C]">/mo</span>
        </div>
        {[
          "Unlimited components",
          "Live preview",
          "Priority AI",
          "JSX + TS export",
        ].map((f) => (
          <div key={f} className="flex items-center gap-1.5 mb-1.5">
            <TbCheck size={9} color={V} />
            <span className="text-[9px] text-[#48484A]">{f}</span>
          </div>
        ))}
        <div className="mt-4 w-full bg-[#7C6AF7] rounded-xl py-2 flex items-center justify-center">
          <span className="text-[10px] text-white font-semibold">
            Get started
          </span>
        </div>
      </div>
    </div>
  </div>
);
