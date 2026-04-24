// import React,{useEffect, useState} from "react";
// import { AnimatePresence, easeInOut, motion } from "motion/react";
// import { TbX,TbLogin2,TbSettings,TbCopy ,TbDownload, TbSparkles} from "react-icons/tb";
// import { FcGoogle } from "react-icons/fc";
// import { FaArrowRight } from "react-icons/fa";
// const steps = [
//     { icon: TbLogin2, title: "Login with Google", desc: "Secure OAuth tounlock all AI tools instantly." },
//     { icon: TbSparkles, title: "Get 150 AI Credits", desc: "Free credits to generate premium UI components." },
//     { icon: TbSettings, title: "Customize Props", desc: "Fine-tune and preview every change live." },
//     { icon: TbCopy, title: "Generate Components", desc: "AI builds production-ready JSX components." },
//     { icon: TbDownload, title: "Copy or Save", desc: "Export clean code straight into your project." },
//     ];
// const Auth = ({ onClose }) => {
//     const [active, setActive] = useState(0);
//     useEffect(() => {
//         const interval = setInterval(() => {
//           setActive((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
//         }, 2400);
//         return () => clearInterval(interval);
//       }, []);
//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 p-4"
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 38, scale: 0.97 }}
//           animate={{ scale: 1, y: 0, opacity: 1 }}
//           exit={{ scale: 0.96, y: 20, opacity: 0 }}
//           transition={{ duration: 0.5 }}
//           className="flex flex-col sm:flex-row w-full max-w-220 max-h-[90vh] overflow-y-auto rounded-2xl border border-[#3be8ff]/10 bg-[#040f12] shadow-[0_40px_80px_rgba(0,0,0,0.8)] relative overflow-hidden"
//         >
//           <button
//             className="absolute top-3 right-3 z-20 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all cursor-pointer"
//             onClick={onClose}
//           >
//             <TbX size={15} />
//           </button>
//           <div className="sm:w-[52%] bg-gradient-to-br from-[#03181c] to-[#041e24] p-6 sm:p-10 relative overflow-hidden">
//             <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(59,232,255,0.08)_0%,transparent_70%)] pointer-events-none" />
//             <motion.div
//               initial={{ opacity: 0, x: -14 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.2 }}
//               className="flex items-center gap-3 mb-7 sm:mb-9"
//             >
//               <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3be8ff] to-[#0ab8d4] flex items-center justify-center shadow-[0_0_18px_rgba(59,232,255,0.35)]">
//                 <img src="logo.svg" alt="" />
//               </div>
//               <span className="text-xl font-bold text-[#e8f8fa] tracking-tight" style={{fontFamily:"'Syne',sans-serif"}}>LLMightyUI</span>
//             </motion.div>
//             <p className="text-[10px] font-semibold tracking-[3px] text-[#3be8ff] uppercase mb-4 sm:mb-5">
//               Welcome to LLMightyUI! Please sign in or create an account to get started.
//             </p>
//             <div className='flex sm:flex-col gap-2 sm:gap-1 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 -mx-1 px-1'>
//                 {steps.map((item,i)=>(
//                 <motion.div key={i} className={`shrink-0 sm:shrink-0
//                 flex items-start gap-3 px-3 py-2.5 rounded-xl border
//                 transition-all duration-300 min-w-50 sm:min-w-0 ${active
//                 ===i? "bg-[#3be8ff]/[0.07] border-[#3be8ff]/20":
//                 "bg-transparent border-transparent"}`}>
//                     <div className={`min-w-7 h-7 rounded-lg flex items-center
//                     justify-center border transition-all duration-300 ${active ===
//                     i? "bg-linear-to-br from-[#3be8ff] to-[#0ab8d6] border-transparent": "bg-[#3be8ff]/8 border-[#3be8ff]/20"}`}>
//                         {item.icon && <item.icon size={13} color={active === i? "#051c20":"#3be8ff"}/>}
//                     </div>
//                     <div>
//                         <p className={`text-[12.5px] font-semibold transition-colors
//                         duration-300 whitespace-nowrap sm:whitespace-normal ${active===
//                         i ? "text-[#d4f5fa]": "text-white/55"}`}>{item.title}
//                         </p>
//                         <div className={`overflow-hidden transition-all duration-500
//                         ${active === i ? "max-h-8 opacity-100 mt-0.5" : "max-h-0 opacity-0"}`}>
//                         <p className="text-[11px] text-[#3be8ff]/40 leading-relaxed">{item.desc}</p>
//                         </div>
//                     </div>
//                 </motion.div>
//                 ))}
//             </div>
//           </div>
//           {/* rightbox */}
//           <motion.div 
//             initial={{ opacity: 0, x: 28 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.25,duration: 0.5 }}
//           className="sm:w-[48%] bg-[#040f12] px-6 sm:px-10 py-8 sm:py-12 flex flex-col justify-center items-center relative overflow-hidden">

//             <div className='absolute inset-0 bg-[linear-gradient(rgba(59,232,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(59,232,255,0.08)_1px, transparent_1px)] bg-size-[32px_32px] z-10'/>
//             <div className="relative z-10 w-full max-w-[280px] sm:max-w-[260px] text-center mx-auto" >
//                 <motion.div
//                 animate={{y:[0,6,0]}}
//                 transition={{duration:3, repeat:Infinity,ease:easeInOut}} 
//                 className='w-12 h-12 sm:w-14 sm:h-14 rounded-2x1 mx-auto mb-5 sm:mb-6   bg-linear-to-br from-[#3be8ff]/15 to-[#040f12] border border-[#3be8ff]/20 flex items-center justify-center'>
//                 <img src="logo.svg" alt="" />
//                 </motion.div>
//                 <h3 className="text-xl font-bold text-[#e4f6f8] tracking-tight" style={{fontFamily:"'Syne',sans-serif"}}>Welcome</h3>
//                 <p className="text-[13px] text-[#96bec8]/55 leading-relaxed mb-6 sm:mb-7" >SignIn to generate AI-powered UI components in seconds</p>
//                 <div className="flex justify-center gap-4 sm:gap-5 mb-6 sm:mb-7">
//                 {
//                     [["150","Tokens"],["∞","Components"],["JSX","Ready"]].map((item,i)=>(
//                     <div key={i} className="flex flex-col text-center">
//                         <div className="text-base font-bold text-[#3be8ff]">
//                             {item[0]}
//                         </div>
//                         <div className="text-[9px] text-[#78aab4]/45 uppercase tracking-wider font-medium">
//                             {item[1]}
//                         </div>
//                     </div>
//                     ))
//                 }
//                 </div>
//                 <motion.button
//                 whileHover={{y:-2,scale:1.02}}
//                 whileTap={{scale:0.98}}
//                  className='w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-white text-[#0a1a1d] font-semibold text-sm cursor-pointer border-none shadow-[0_4px_20px_rgba(0,0,0,0.3)]hover:shadow-[0_12px_40px_rgba(59,232,255,0.2)] transition-shadow'>
//                     <FcGoogle size={19}/>
//                     Continue with Google
//                 </motion.button>
//                 <p className="text-[11px] text-[#64919b]/45 mt-4 sm:mt-5">No account needed for npm.{" "}<span onClick={onClose} className="text-[#3be8ff]/50 border-b border-[#3be8ff]/20 cursor-pointer hover:border-[#3be8ff]/80">View docs→</span></p>
//             </div>

//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default Auth;


// import React,{useEffect, useState} from "react";
// import { AnimatePresence, easeInOut, motion } from "motion/react";
// import { TbX,TbLogin2,TbSettings,TbCopy ,TbDownload, TbSparkles} from "react-icons/tb";
// import { FcGoogle } from "react-icons/fc";
// import { FaArrowRight } from "react-icons/fa";

// const steps = [
//     { icon: TbLogin2, title: "Sign in with Google", desc: "One-click OAuth to unlock every AI feature instantly." },
//     { icon: TbSparkles, title: "Claim 150 Free Credits", desc: "Start generating premium UI components right away." },
//     { icon: TbSettings, title: "Tune Your Props", desc: "Tweak every detail and preview changes in real time." },
//     { icon: TbCopy, title: "Build with AI", desc: "Get production-ready JSX components on demand." },
//     { icon: TbDownload, title: "Export in One Click", desc: "Copy clean code directly into your project." },
//     ];

// const Auth = ({ onClose }) => {
//     const [active, setActive] = useState(0);
//     useEffect(() => {
//         const interval = setInterval(() => {
//           setActive((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
//         }, 2400);
//         return () => clearInterval(interval);
//       }, []);

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 p-4"
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 38, scale: 0.97 }}
//           animate={{ scale: 1, y: 0, opacity: 1 }}
//           exit={{ scale: 0.96, y: 20, opacity: 0 }}
//           transition={{ duration: 0.5 }}
//           className="flex flex-col sm:flex-row w-full max-w-220 max-h-[90vh] overflow-y-auto rounded-2xl border border-[#b8d435]/10 bg-[#0a1202] shadow-[0_40px_80px_rgba(0,0,0,0.8)] relative overflow-hidden"
//         >
//           <button
//             className="absolute top-3 right-3 z-20 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all cursor-pointer"
//             onClick={onClose}
//           >
//             <TbX size={15} />
//           </button>

//           {/* Left panel */}
//           <div className="sm:w-[52%] bg-gradient-to-br from-[#0d1a03] to-[#111f05] p-6 sm:p-10 relative overflow-hidden">
//             <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(184,212,53,0.08)_0%,transparent_70%)] pointer-events-none" />
//             <motion.div
//               initial={{ opacity: 0, x: -14 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.2 }}
//               className="flex items-center gap-3 mb-7 sm:mb-9"
//             >
//               <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#b8d435] to-[#7ea318] flex items-center justify-center shadow-[0_0_18px_rgba(184,212,53,0.35)]">
//                 <img src="logo.svg" alt="" />
//               </div>
//               <span className="text-xl font-bold text-[#edf7d4] tracking-tight" style={{fontFamily:"'Syne',sans-serif"}}>LLMightyUI</span>
//             </motion.div>

//             <p className="text-[10px] font-semibold tracking-[3px] text-[#b8d435] uppercase mb-4 sm:mb-5">
//               Welcome to LLMightyUI! Sign in or create an account to begin.
//             </p>

//             <div className='flex sm:flex-col gap-2 sm:gap-1 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 -mx-1 px-1'>
//                 {steps.map((item,i)=>(
//                 <motion.div key={i} className={`shrink-0 sm:shrink-0
//                 flex items-start gap-3 px-3 py-2.5 rounded-xl border
//                 transition-all duration-300 min-w-50 sm:min-w-0 ${active
//                 ===i? "bg-[#b8d435]/[0.07] border-[#b8d435]/20":
//                 "bg-transparent border-transparent"}`}>
//                     <div className={`min-w-7 h-7 rounded-lg flex items-center
//                     justify-center border transition-all duration-300 ${active ===
//                     i? "bg-linear-to-br from-[#b8d435] to-[#7ea318] border-transparent": "bg-[#b8d435]/8 border-[#b8d435]/20"}`}>
//                         {item.icon && <item.icon size={13} color={active === i? "#0d1a03":"#b8d435"}/>}
//                     </div>
//                     <div>
//                         <p className={`text-[12.5px] font-semibold transition-colors
//                         duration-300 whitespace-nowrap sm:whitespace-normal ${active===
//                         i ? "text-[#ddf2b0]": "text-white/55"}`}>{item.title}
//                         </p>
//                         <div className={`overflow-hidden transition-all duration-500
//                         ${active === i ? "max-h-8 opacity-100 mt-0.5" : "max-h-0 opacity-0"}`}>
//                         <p className="text-[11px] text-[#b8d435]/40 leading-relaxed">{item.desc}</p>
//                         </div>
//                     </div>
//                 </motion.div>
//                 ))}
//             </div>
//           </div>

//           {/* Right panel */}
//           <motion.div
//             initial={{ opacity: 0, x: 28 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.25, duration: 0.5 }}
//           className="sm:w-[48%] bg-[#0a1202] px-6 sm:px-10 py-8 sm:py-12 flex flex-col justify-center items-center relative overflow-hidden">

//             <div className='absolute inset-0 bg-[linear-gradient(rgba(184,212,53,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(184,212,53,0.07)_1px,transparent_1px)] bg-size-[32px_32px] z-10'/>

//             <div className="relative z-10 w-full max-w-[280px] sm:max-w-[260px] text-center mx-auto">
//                 <motion.div
//                 animate={{y:[0,6,0]}}
//                 transition={{duration:3, repeat:Infinity, ease:easeInOut}}
//                 className='w-12 h-12 sm:w-14 sm:h-14 rounded-2xl mx-auto mb-5 sm:mb-6 bg-linear-to-br from-[#b8d435]/15 to-[#0a1202] border border-[#b8d435]/20 flex items-center justify-center'>
//                 <img src="logo.svg" alt="" />
//                 </motion.div>

//                 <h3 className="text-xl font-bold text-[#eaf5d4] tracking-tight" style={{fontFamily:"'Syne',sans-serif"}}>Get Started</h3>
//                 <p className="text-[13px] text-[#a8c876]/55 leading-relaxed mb-6 sm:mb-7">Sign in to craft AI-powered UI components in seconds</p>

//                 <div className="flex justify-center gap-4 sm:gap-5 mb-6 sm:mb-7">
//                 {
//                     [["150","Credits"],["∞","Components"],["JSX","Ready"]].map((item,i)=>(
//                     <div key={i} className="flex flex-col text-center">
//                         <div className="text-base font-bold text-[#b8d435]">
//                             {item[0]}
//                         </div>
//                         <div className="text-[9px] text-[#8aaa54]/45 uppercase tracking-wider font-medium">
//                             {item[1]}
//                         </div>
//                     </div>
//                     ))
//                 }
//                 </div>

//                 <motion.button
//                 whileHover={{y:-2,scale:1.02}}
//                 whileTap={{scale:0.98}}
//                 className='w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-white text-[#0d1a03] font-semibold text-sm cursor-pointer border-none shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(184,212,53,0.2)] transition-shadow'>
//                     <FcGoogle size={19}/>
//                     Continue with Google
//                 </motion.button>

//                 <p className="text-[11px] text-[#6a9040]/45 mt-4 sm:mt-5">No account needed for npm.{" "}<span onClick={onClose} className="text-[#b8d435]/50 border-b border-[#b8d435]/20 cursor-pointer hover:border-[#b8d435]/80">View docs →</span></p>
//             </div>

//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default Auth;


import React, { useEffect, useState } from "react";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import { TbX, TbLogin2, TbSettings, TbCopy, TbDownload, TbSparkles, TbCode, TbEye } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";

const steps = [
  { icon: TbLogin2,   title: "Sign in instantly",   desc: "Google OAuth — one tap, zero friction, full access." },
  { icon: TbSparkles, title: "150 credits, free",    desc: "Enough tokens to explore every generation feature." },
  { icon: TbEye,      title: "Live preview",         desc: "Every prop change renders in real time, no reloads." },
  { icon: TbCode,     title: "AI writes the JSX",    desc: "Production-ready components built by the model." },
  { icon: TbDownload, title: "Export anywhere",      desc: "Drop clean, typed code straight into your repo." },
];

const caps = ["AI Generation", "Live Preview", "JSX Export", "Prop Tuning", "Zero Config"];

const Auth = ({ onClose }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const lineProgress = (active / (steps.length - 1)) * 100;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-xl z-50 p-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 24, opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row w-full max-w-[780px] max-h-[90vh] overflow-y-auto rounded-[32px] border border-white/[0.06] bg-[#050505] shadow-[0_80px_160px_rgba(0,0,0,1),inset_0_1px_0_rgba(255,255,255,0.04)] relative overflow-hidden"
        >

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 w-7 h-7 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] flex items-center justify-center text-white/35 hover:text-white/70 transition-all cursor-pointer"
          >
            <TbX size={13} />
          </button>

          {/* ══ LEFT PANEL ══ */}
          <div className="sm:w-[54%] bg-[#070707] p-8 sm:p-11 relative overflow-hidden flex flex-col">

            {/* Ambient violet bloom */}
            <div className="absolute -top-24 -left-12 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(124,106,247,0.07)_0%,transparent_65%)] pointer-events-none" />

            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.18 }}
              className="flex items-center gap-2.5 mb-10 sm:mb-12"
            >
              <div className="w-8 h-8 rounded-[10px] bg-[#7C6AF7] flex items-center justify-center shadow-[0_0_24px_rgba(124,106,247,0.45)]">
                <img src="logo.svg" alt="" className="w-4 h-4" />
              </div>
              <span className="text-[14px] font-bold text-[#F5F5F7] tracking-[-0.2px]" style={{ fontFamily: "'Syne',sans-serif" }}>
                LLMightyUI
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="mb-9 sm:mb-11"
            >
              <h2
                className="text-[30px] sm:text-[36px] font-bold text-[#F5F5F7] leading-[1.1] tracking-[-1.5px] mb-3"
                style={{ fontFamily: "'Syne',sans-serif" }}
              >
                Build UI.<br />
                <span className="text-[#7C6AF7]">Ship faster.</span>
              </h2>
              <p className="text-[12.5px] text-[#86868B] leading-[1.7] max-w-[260px]">
                AI-powered components, live customisation, and instant export — engineered for speed.
              </p>
            </motion.div>

            {/* Vertical timeline */}
            <div className="relative flex flex-col flex-1">
              {/* Track line */}
              <div className="absolute left-[12px] top-3 bottom-3 w-px bg-white/[0.07]">
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
                  {/* Node */}
                  <div
                    className={`relative z-10 mt-[2px] min-w-[25px] h-[25px] rounded-full flex items-center justify-center border transition-all duration-400 ${
                      active === i
                        ? "bg-[#7C6AF7] border-[#7C6AF7] shadow-[0_0_14px_rgba(124,106,247,0.55)]"
                        : active > i
                        ? "bg-[#7C6AF7]/20 border-[#7C6AF7]/30"
                        : "bg-[#0e0e0e] border-white/[0.08]"
                    }`}
                  >
                    {item.icon && (
                      <item.icon
                        size={10}
                        color={active === i ? "#fff" : active > i ? "#7C6AF7" : "#3A3A3C"}
                      />
                    )}
                  </div>

                  <div className="pt-[1px]">
                    <p
                      className={`text-[12px] font-semibold leading-tight transition-colors duration-300 ${
                        active === i ? "text-[#F5F5F7]" : active > i ? "text-[#48484A]" : "text-[#2C2C2E]"
                      }`}
                    >
                      {item.title}
                    </p>
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        active === i ? "max-h-8 opacity-100 mt-1" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-[10.5px] text-[#7C6AF7]/55 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Step progress dots */}
            <div className="flex gap-1.5 mt-6 sm:mt-8">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-[3px] rounded-full transition-all duration-400 ${
                    active === i ? "w-5 bg-[#7C6AF7]" : "w-[3px] bg-white/[0.08]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ══ RIGHT PANEL ══ */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.28, duration: 0.55 }}
            className="sm:w-[46%] bg-[#050505] px-8 sm:px-10 py-9 sm:py-12 flex flex-col justify-center items-center relative overflow-hidden"
          >
            {/* Precision grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
            {/* Bottom bloom */}
            <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(124,106,247,0.055)_0%,transparent_65%)] pointer-events-none" />

            <div className="relative z-10 w-full max-w-[240px] text-center mx-auto flex flex-col items-center">

              {/* Floating icon */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: easeInOut }}
                className="w-[52px] h-[52px] rounded-[18px] mb-6 bg-[#0d0d0d] border border-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] flex items-center justify-center"
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
                Sign in to generate production-ready<br />UI components with AI
              </p>

              {/* Stats row */}
              <div className="w-full flex justify-between mb-7 px-1">
                {[["150", "Credits"], ["∞", "Components"], ["JSX", "Ready"]].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span className="text-[16px] font-bold text-[#7C6AF7] tracking-tight leading-none">{item[0]}</span>
                    <span className="text-[8.5px] text-[#3A3A3C] uppercase tracking-[0.12em] font-medium">{item[1]}</span>
                  </div>
                ))}
              </div>

              {/* Separator */}
              <div className="w-full h-px bg-white/[0.04] mb-7" />

              {/* Google CTA */}
              <motion.button
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2.5 py-[14px] rounded-2xl bg-white text-[#1D1D1F] font-semibold text-[13px] cursor-pointer border-none shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_32px_rgba(124,106,247,0.22)] transition-shadow"
              >
                <FcGoogle size={17} />
                Continue with Google
              </motion.button>

              {/* Capability pills */}
              <div className="flex flex-wrap justify-center gap-1.5 mt-5 mb-5">
                {caps.map((c, i) => (
                  <span
                    key={i}
                    className="text-[9px] text-[#3A3A3C] bg-white/[0.03] border border-white/[0.05] rounded-full px-2.5 py-[4px] font-medium tracking-wide"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <p className="text-[10px] text-[#2C2C2E] leading-relaxed">
                No account needed for npm.{" "}
                <span
                  onClick={onClose}
                  className="text-[#7C6AF7]/50 border-b border-[#7C6AF7]/20 cursor-pointer hover:text-[#7C6AF7]/80 hover:border-[#7C6AF7]/50 transition-colors"
                >
                  View docs →
                </span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Auth;