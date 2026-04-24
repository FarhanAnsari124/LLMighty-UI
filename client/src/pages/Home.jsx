import React, { useState } from "react";
import { AnimatePresence } from "motion/react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Features from "../components/Features";
import Components from "../components/Components";
import NPMSection from "../components/NPMSection";
import { CTABanner, Footer } from "../components/CTAAndFooter";
import Auth from "../components/Auth";
import { FONTS } from "../constants/tokens";
import { useSelector } from "react-redux";

export default function HomePage() {
  const [authOpen, setAuthOpen] = useState(false);
  const {userData} = useSelector((state)=>state.user)
  const open = () => setAuthOpen(true);
  const close = () => setAuthOpen(false);

  return (
    <div
      className="min-h-screen bg-[#050505] text-[#F5F5F7] overflow-x-hidden"
      style={{ fontFamily: FONTS.body }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        * { box-sizing: border-box; }
      `}</style>

      <Navbar onLogin={open} />
      <Hero onLogin={open} />
      <Stats />
      <Features />
      <Components />
      <NPMSection />
      <CTABanner onLogin={open} />
      <Footer />

      <AnimatePresence>{authOpen && <Auth onClose={()=>setAuthOpen(false)} />}</AnimatePresence>
    </div>
  );
}
