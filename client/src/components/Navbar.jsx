import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  TbSparkles,
  TbArrowRight,
  TbBrandGithub,
  TbX,
  TbMenu2,
} from "react-icons/tb";
import { NAV_LINKS } from "../constants/data";
import { FONTS } from "../constants/tokens";

const Navbar = ({ onLogin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-[#050505]/80 backdrop-blur-2xl border-b border-white/[0.05]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
        <NavBrand />

        <div className="hidden sm:flex items-center gap-7">
          
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-[12.5px] text-[#86868B] hover:text-[#F5F5F7] transition-colors duration-200 cursor-pointer"
            >
              {l}
            </a>
            
          ))}
          <a href="https://www.npmjs.com/package/llmighty-ui-lib" className="text-[13px] text-[#86868B] hover:text-[#F5F5F7] transition-colors">Docs</a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/FarhanAnsari124/LLMighty-UI"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex text-[#3A3A3C] hover:text-[#86868B] transition-colors"
          >
            <TbBrandGithub size={18} />
          </a>
          <motion.button
            onClick={onLogin}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 bg-[#7C6AF7] text-white text-[12px] font-semibold px-4 py-2 rounded-xl cursor-pointer border-none shadow-[0_0_20px_rgba(124,106,247,0.3)] hover:shadow-[0_0_32px_rgba(124,106,247,0.5)] transition-shadow"
          >
            Get Started <TbArrowRight size={13} />
          </motion.button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden text-[#86868B] hover:text-[#F5F5F7] transition-colors bg-transparent border-none cursor-pointer"
          >
            {menuOpen ? <TbX size={20} /> : <TbMenu2 size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="sm:hidden overflow-hidden bg-[#070707] border-b border-white/[0.05]"
          >
            <div className="px-5 py-4 flex flex-col gap-4">
              
              {NAV_LINKS.map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-[13px] text-[#86868B] hover:text-[#F5F5F7] transition-colors"
                >
                  {l}
                </a>
              ))}
              <a href="https://www.npmjs.com/package/llmighty-ui-lib" className="text-[13px] text-[#86868B] hover:text-[#F5F5F7] transition-colors">Docs</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const NavBrand = () => (
  <div className="flex items-center gap-2.5">
    <div className="w-7 h-7 rounded-[9px] bg-[#7C6AF7] flex items-center justify-center shadow-[0_0_18px_rgba(124,106,247,0.4)]">
      <img className="w-4 h-4" src="logo.svg" alt="" />
    </div>
    <span
      className="text-[13.5px] font-bold text-[#F5F5F7] tracking-[-0.2px]"
      style={{ fontFamily: FONTS.display }}
    >
      LLMightyUI
    </span>
  </div>
);

export default Navbar;
