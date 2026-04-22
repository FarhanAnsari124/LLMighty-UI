import React,{ useState } from "react";

export const Card = ({
  title = "Card Title",
  subtitle = "A short supporting line",
  description = "This is the card body content. It can contain any descriptive text you want to show the user.",
  tag = "New",
  accentColor = "#6ee7b7",
  bgColor = "#0f172a",
  textColor = "#f1f5f9",
  size = "md",
  collapsible = true,
  footer = null,
}) => {
  const [expanded, setExpanded] = useState(true);
  const [hovered, setHovered] = useState(false);

  const sizes = {
    sm: { padding: "16px 20px", width: "280px", titleSize: "15px", bodySize: "13px" },
    md: { padding: "24px 28px", width: "360px", titleSize: "18px", bodySize: "14px" },
    lg: { padding: "32px 36px", width: "460px", titleSize: "22px", bodySize: "16px" },
  };

  const s = sizes[size] || sizes.md;

  const styles = {
    card: {
      width: s.width,
      backgroundColor: bgColor,
      color: textColor,
      borderRadius: "16px",
      border: `1px solid ${hovered ? accentColor : "rgba(255,255,255,0.08)"}`,
      boxShadow: hovered
        ? `0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px ${accentColor}22`
        : "0 8px 24px rgba(0,0,0,0.3)",
      transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
      transform: hovered ? "translateY(-3px)" : "translateY(0)",
      overflow: "hidden",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      cursor: "default",
    },
    header: {
      padding: s.padding,
      paddingBottom: expanded ? "16px" : s.padding.split(" ")[0],
      borderBottom: expanded ? `1px solid rgba(255,255,255,0.06)` : "none",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "12px",
    },
    headerLeft: {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      flex: 1,
    },
    tag: {
      display: "inline-block",
      fontSize: "10px",
      fontWeight: 700,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: accentColor,
      backgroundColor: `${accentColor}18`,
      border: `1px solid ${accentColor}40`,
      borderRadius: "4px",
      padding: "2px 8px",
      marginBottom: "6px",
      width: "fit-content",
    },
    title: {
      fontSize: s.titleSize,
      fontWeight: 700,
      margin: 0,
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    subtitle: {
      fontSize: "12px",
      color: "rgba(255,255,255,0.45)",
      marginTop: "4px",
    },
    toggleBtn: {
      background: "none",
      border: `1px solid rgba(255,255,255,0.1)`,
      color: "rgba(255,255,255,0.5)",
      width: "28px",
      height: "28px",
      borderRadius: "8px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      flexShrink: 0,
      transition: "all 0.2s",
      transform: expanded ? "rotate(0deg)" : "rotate(-180deg)",
    },
    body: {
      padding: expanded ? `16px ${s.padding.split(" ")[1]}` : "0",
      maxHeight: expanded ? "300px" : "0",
      opacity: expanded ? 1 : 0,
      overflow: "hidden",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    description: {
      fontSize: s.bodySize,
      lineHeight: 1.7,
      color: "rgba(255,255,255,0.65)",
      margin: 0,
    },
    footer: {
      padding: `12px ${s.padding.split(" ")[1]}`,
      paddingTop: "12px",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "8px",
    },
    accentLine: {
      height: "3px",
      background: `linear-gradient(90deg, ${accentColor}, transparent)`,
    },
  };

  return (
    <div
      style={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.accentLine} />
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          {tag && <span style={styles.tag}>{tag}</span>}
          <h3 style={styles.title}>{title}</h3>
          {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
        </div>
        {collapsible && (
          <button
            style={styles.toggleBtn}
            onClick={() => setExpanded((prev) => !prev)}
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            ▾
          </button>
        )}
      </div>
      <div style={styles.body}>
        <p style={styles.description}>{description}</p>
      </div>
      {footer && expanded && <div style={styles.footer}>{footer}</div>}
    </div>
  );
};