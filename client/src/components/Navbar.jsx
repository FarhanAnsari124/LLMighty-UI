import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import axios from "axios";
import {
  TbSparkles,
  TbArrowRight,
  TbBrandGithub,
  TbX,
  TbMenu2,
  TbLogout,
  TbSettings,
  TbUser,
  TbChevronDown,
  TbComponents,
} from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { NAV_LINKS } from "../constants/data";
import { FONTS } from "../constants/tokens";
import { ServerUrl } from "../App";
import { linkWithCredential } from "firebase/auth";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import {getAuth , signOut} from 'firebase/auth'

const Navbar = ({ onLogin, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setprofileOpen] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(ServerUrl + "/api/auth/logout", { withCredentials: true });
      await signOut(getAuth());
      dispatch(setUserData(null));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    setprofileOpen(false);
  };
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
          <a
            href="https://www.npmjs.com/package/llmighty-ui-lib"
            className="text-[12.5px] text-[#86868B] hover:text-[#F5F5F7] transition-colors"
          >
            Docs
          </a>
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

          {userData ? (
            <UserMenu userData={userData} onLogout={handleLogout} />
          ) : (
            <motion.button
              onClick={onLogin}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 bg-[#7C6AF7] text-white text-[12px] font-semibold px-4 py-2 rounded-xl cursor-pointer border-none shadow-[0_0_20px_rgba(124,106,247,0.3)] hover:shadow-[0_0_32px_rgba(124,106,247,0.5)] transition-shadow"
            >
              Get Started <TbArrowRight size={13} />
            </motion.button>
          )}

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
              <a
                href="https://www.npmjs.com/package/llmighty-ui-lib"
                className="text-[13px] text-[#86868B] hover:text-[#F5F5F7] transition-colors"
              >
                Docs
              </a>
              {userData && (
                <button
                  onClick={handleLogout}
                  className="text-left text-[13px] text-[#FF5F57]/70 hover:text-[#FF5F57] transition-colors bg-transparent border-none cursor-pointer p-0"
                >
                  Sign out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const UserMenu = ({ userData, onLogout={handleLogout} }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initials = userData?.displayName
    ? userData.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : (userData?.email?.[0]?.toUpperCase() ?? "U");

  const menuItems = [
    {
      icon: TbComponents,
      label: "My Components",
      action: () => {},
      danger: false,
    },
    { icon: TbLogout, label: "Sign out", action: onLogout, danger: true },
  ];

  return (
    <div ref={ref} className="relative">
      <motion.button
        onClick={() => setOpen((p) => !p)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.14] rounded-xl px-2.5 py-1.5 cursor-pointer transition-all"
      >
        <Avatar userData={userData} initials={initials} size="sm" />
        <span className="hidden sm:block text-[12px] text-[#F5F5F7] font-medium max-w-[90px] truncate">
          {userData?.name?.split(" ")[0] ?? userData?.email?.split("@")[0]}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <TbChevronDown size={13} color="#48484A" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-[calc(100%+8px)] w-[220px] bg-[#0d0d0d] border border-white/[0.07] rounded-[18px] shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden z-50"
          >
            <DropdownHeader userData={userData} initials={initials} />

            <div className="p-1.5">
              {menuItems.map(({ icon: Icon, label, action, danger }) => (
                <button
                  key={label}
                  onClick={() => {
                      action();
                      setOpen(false);
                    }} 
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12.5px] font-medium transition-colors cursor-pointer bg-transparent border-none text-left
                      ${
                        danger
                          ? "text-[#FF5F57]/60 hover:text-[#FF5F57] hover:bg-[#FF5F57]/[0.06]"
                          : "text-[#86868B] hover:text-[#F5F5F7] hover:bg-white/[0.05]"
                      }`}
                  >
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DropdownHeader = ({ userData, initials }) => (
  <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.05]">
    <Avatar userData={userData} initials={initials} size="md" />
    <div className="flex flex-col min-w-0">
      <span className="text-[12.5px] font-semibold text-[#F5F5F7] truncate">
        {userData?.name ?? "User"}
      </span>
      <span className="text-[10.5px] text-[#3A3A3C] truncate">
        {userData?.email}
      </span>
    </div>
  </div>
);

const Avatar = ({ userData, initials, size }) => {
  const dim = size === "md" ? "w-8 h-8 text-[11px]" : "w-6 h-6 text-[9px]";
  return userData?.photoURL ? (
    <img
      src={userData.photoURL}
      alt={initials}
      className={`${dim} rounded-full object-cover border border-white/[0.08] shrink-0`}
    />
  ) : (
    <div
      className={`${dim} rounded-full bg-[#7C6AF7] flex items-center justify-center font-bold text-white shrink-0 shadow-[0_0_10px_rgba(124,106,247,0.35)]`}
    >
      {initials}
    </div>
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
