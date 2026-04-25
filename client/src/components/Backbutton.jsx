import React from "react";
import { motion } from "motion/react";
import { TbArrowLeft } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const BackButton = ({ to = -1 }) => {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate(to)}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ x: -3 }}
      whileTap={{ scale: 0.96 }}
      className="flex items-center gap-2 text-[#48484A] hover:text-[#F5F5F7] bg-transparent border-none cursor-pointer transition-colors duration-200 group"
    >
      <div className="w-7 h-7 rounded-xl bg-white/[0.04] border border-white/[0.07] group-hover:border-white/[0.13] group-hover:bg-white/[0.07] flex items-center justify-center transition-all duration-200">
        <TbArrowLeft size={13} />
      </div>
      <span className="text-[12.5px] font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {label}
      </span>
    </motion.button>
  );
};

export default BackButton;