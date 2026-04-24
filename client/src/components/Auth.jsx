import React, { useEffect, useState } from "react";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import {
  TbX,
  TbLogin2,
  TbSettings,
  TbCopy,
  TbDownload,
  TbSparkles,
  TbCode,
  TbEye,
} from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import axios from "axios";
import { ServerUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
const steps = [
  {
    icon: TbLogin2,
    title: "Sign in instantly",
    desc: "Google OAuth — one tap, zero friction, full access.",
  },
  {
    icon: TbSparkles,
    title: "150 credits, free",
    desc: "Enough tokens to explore every generation feature.",
  },
  {
    icon: TbEye,
    title: "Live preview",
    desc: "Every prop change renders in real time, no reloads.",
  },
  {
    icon: TbCode,
    title: "AI writes the JSX",
    desc: "Production-ready components built by the model.",
  },
  {
    icon: TbDownload,
    title: "Export anywhere",
    desc: "Drop clean, typed code straight into your repo.",
  },
];

const caps = [
  "AI Generation",
  "Live Preview",
  "JSX Export",
  "Prop Tuning",
  "Zero Config",
];

const Auth = ({ onClose }) => {
  const [active, setActive] = useState(0);
  const dispatch = useDispatch()

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const lineProgress = (active / (steps.length - 1)) * 100;
  const googleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      let User = response.user;
      let name = User.displayName;
      let email = User.email;

      const result = await axios.post(
        `${ServerUrl}/api/auth/google`,
        { name, email },
        { withCredentials: true },
      );
      dispatch(setUserData(result.data))
      onClose();
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-start sm:items-center justify-center bg-black/90 backdrop-blur-xl z-50 p-4 pt-6 overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 24, opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row w-full max-w-[780px] rounded-3xl border border-white/[0.06] bg-[#050505] shadow-[0_80px_160px_rgba(0,0,0,1),inset_0_1px_0_rgba(255,255,255,0.04)] relative overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 w-7 h-7 rounded-full bg-white/6 hover:bg-white/12 border border-white/8 flex items-center justify-center text-white/35 hover:text-white/70 transition-all cursor-pointer"
          >
            <TbX size={13} />
          </button>
          <div className="sm:w-[54%] bg-[#070707] p-6 sm:p-11 relative overflow-hidden flex flex-col">
            <div className="absolute -top-24 -left-12 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(124,106,247,0.07)_0%,transparent_65%)] pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.18 }}
              className="flex items-center gap-2.5 mb-10 sm:mb-12"
            >
              <div className="w-8 h-8 rounded-[10px] bg-[#7C6AF7] flex items-center justify-center shadow-[0_0_24px_rgba(124,106,247,0.45)]">
                <img src="logo.svg" alt="" className="w-4 h-4" />
              </div>
              <span
                className="text-[14px] font-bold text-[#F5F5F7] tracking-[-0.2px]"
                style={{ fontFamily: "'Syne',sans-serif" }}
              >
                LLMightyUI
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="mb-5 sm:mb-11"
            >
              <h2
                className="text-[24px] sm:text-[36px] font-bold text-[#F5F5F7] leading-[1.1] tracking-[-1.5px] mb-2"
                style={{ fontFamily: "'Syne',sans-serif" }}
              >
                Build UI.
                <br />
                <span className="text-[#7C6AF7]">Ship faster.</span>
              </h2>
              <p className="text-[12.5px] text-[#86868B] leading-[1.7] max-w-65">
                AI-powered components, live customisation, and instant export —
                engineered for speed.
              </p>
            </motion.div>

            <div className="relative flex flex-col flex-1">
              <div className="absolute left-3 top-3 bottom-3 w-px bg-white/[0.07]">
                <motion.div
                  className="w-full bg-[#7C6AF7] origin-top rounded-full"
                  animate={{ height: `${lineProgress}%` }}
                  transition={{ duration: 0.6, ease: easeInOut }}
                />
              </div>

              {steps.map((item, i) => (
                <motion.div
                  key={i}
                  className="relative flex items-start gap-4 py-2.5"
                >
                  <div
                    className={`relative z-10 mt-0.5 min-w-6.25 h-6.25 rounded-full flex items-center justify-center border transition-all duration-400 ${
                      active === i
                        ? "bg-[#7C6AF7] border-[#7C6AF7] shadow-[0_0_14px_rgba(124,106,247,0.55)]"
                        : active > i
                          ? "bg-[#7C6AF7]/20 border-[#7C6AF7]/30"
                          : "bg-[#0e0e0e] border-white/8"
                    }`}
                  >
                    {item.icon && (
                      <item.icon
                        size={10}
                        color={
                          active === i
                            ? "#fff"
                            : active > i
                              ? "#7C6AF7"
                              : "#3A3A3C"
                        }
                      />
                    )}
                  </div>

                  <div className="pt-px">
                    <p
                      className={`text-[12px] font-semibold leading-tight transition-colors duration-300 ${
                        active === i
                          ? "text-[#F5F5F7]"
                          : active > i
                            ? "text-[#48484A]"
                            : "text-[#2C2C2E]"
                      }`}
                    >
                      {item.title}
                    </p>
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        active === i
                          ? "max-h-8 opacity-100 mt-1"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-[10.5px] text-[#7C6AF7]/55 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex gap-1.5 mt-6 sm:mt-8">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-0.75 rounded-full transition-all duration-400 ${
                    active === i
                      ? "w-5 bg-[#7C6AF7]"
                      : "w-0.75 bg-white/8"
                  }`}
                />
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.28, duration: 0.55 }}
            className="sm:w-[46%] bg-[#050505] px-6 sm:px-10 py-7 sm:py-12 flex flex-col justify-center items-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-size-[30px_30px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(124,106,247,0.055)_0%,transparent_65%)] pointer-events-none" />

            <div className="relative z-10 w-full max-w-60 text-center mx-auto flex flex-col items-center">
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: easeInOut,
                }}
                className="w-13 h-13 rounded-[18px] mb-6 bg-[#0d0d0d] border border-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] flex items-center justify-center"
              >
                <img src="logo.svg" alt="" className="w-6 h-6" />
              </motion.div>

              <h3
                className="text-[19px] font-bold text-[#F5F5F7] tracking-[-0.5px] mb-1"
                style={{ fontFamily: "'Syne',sans-serif" }}
              >
                Welcome back
              </h3>
              <p className="text-[11.5px] text-[#48484A] leading-relaxed mb-7">
                Sign in to generate production-ready
                <br />
                UI components with AI
              </p>
              <div className="w-full flex justify-between mb-7 px-1">
                {[
                  ["150", "Credits"],
                  ["∞", "Components"],
                  ["JSX", "Ready"],
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span className="text-[16px] font-bold text-[#7C6AF7] tracking-tight leading-none">
                      {item[0]}
                    </span>
                    <span className="text-[8.5px] text-[#3A3A3C] uppercase tracking-[0.12em] font-medium">
                      {item[1]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="w-full h-px bg-white/4 mb-7" />
              <motion.button
                onClick={googleAuth}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-white text-[#1D1D1F] font-semibold text-[13px] cursor-pointer border-none shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_32px_rgba(124,106,247,0.22)] transition-shadow"
              >
                <FcGoogle size={17} />
                Continue with Google
              </motion.button>
              <div className="flex flex-wrap justify-center gap-1.5 mt-5 mb-5">
                {caps.map((c, i) => (
                  <span
                    key={i}
                    className="text-[9px] text-[#3A3A3C] bg-white/3 border border-white/5 rounded-full px-2.5 py-[4px] font-medium tracking-wide"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <p className="text-[10px] text-[#2C2C2E] leading-relaxed">
                No account needed for npm.{" "}
                <a
                    href="https://www.npmjs.com/package/llmighty-ui-lib"
                  className="text-[#7C6AF7]/50 border-b border-[#7C6AF7]/20 cursor-pointer hover:text-[#7C6AF7]/80 hover:border-[#7C6AF7]/50 transition-colors"
                >
                  View docs →
                </a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Auth;
