export const V = "#7C6AF7";
export const V10 = "rgba(124,106,247,0.10)";
export const V06 = "rgba(124,106,247,0.06)";
export const BG = "#050505";
export const BG2 = "#070707";
export const BG3 = "#0d0d0d";
export const T1 = "#F5F5F7";
export const T2 = "#86868B";
export const T3 = "#48484A";
export const T4 = "#3A3A3C";
export const T5 = "#2C2C2E";

export const FONTS = {
  display: "'Syne', sans-serif",
  body: "'DM Sans', sans-serif",
};

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay },
});
