import React, { useState } from "react";

export const Sidebar = ({
  logo = "VirtualAI",
  links = ["Dashboard", "Projects", "Settings", "Help"],
  icons = ["M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    "M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z",
    "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    "M12 21a9 9 0 100-18 9 9 0 000 18zm0 0a9 9 0 100-18 9 9 0 000 18z"],
  accent = "#6366f1",
  bg = "#0f172a",
  onLinkClick = () => {}
}) => {
  const [active, setActive] = useState(links[0]);
  const [expanded, setExpanded] = useState(true);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div style={{ position: "fixed", top: 0, left: 0, bottom: 0, width: expanded ? "280px" : "80px", background: bg, borderRight: "1px solid rgba(255,255,255,0.06)", fontFamily: "system-ui,sans-serif", transition: "width 0.3s", overflow: "hidden" }}>
      <div style={{ padding: "20px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => setExpanded(!expanded)}>
          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg, " + accent + ", " + alpha(accent, 0.6) + ")" , display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "800", color: "#fff" }}>{logo[0]}</div>
          {expanded && <span style={{ fontSize: "16px", fontWeight: "800", color: "#fff" }}>{logo}</span>}
        </div>
      </div>
      <div style={{ padding: "12px 8px" }}>
        {links.map((link, i) => (
          <button
            key={link}
            onClick={() => { setActive(link); onLinkClick(link); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              width: "100%",
              padding: "10px 12px",
              borderRadius: "8px",
              background: active === link ? alpha(accent, 0.12) : "transparent",
              border: "none",
              cursor: "pointer",
              color: active === link ? accent : "rgba(255,255,255,0.5)",
              fontWeight: active === link ? "700" : "500",
              fontSize: "14px",
              transition: "all 0.2s"
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active === link ? accent : "rgba(255,255,255,0.5)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={icons[i]} />
            </svg>
            {expanded && <span>{link}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};