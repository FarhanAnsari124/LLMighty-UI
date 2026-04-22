import React,{ useState } from "react";

export const Button = ({
  label = "Click Me",
  onClick = () => {},
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = "left",
  fullWidth = false,
  accentColor = "#6ee7b7",
  rounded = false,
}) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [ripples, setRipples] = useState([]);

  const sizes = {
    sm: { padding: "6px 14px", fontSize: "12px", height: "32px", iconSize: "14px", gap: "6px" },
    md: { padding: "10px 22px", fontSize: "14px", height: "42px", iconSize: "16px", gap: "8px" },
    lg: { padding: "14px 30px", fontSize: "16px", height: "52px", iconSize: "18px", gap: "10px" },
  };

  const s = sizes[size] || sizes.md;

  const variantStyles = {
    primary: {
      background: disabled
        ? "rgba(255,255,255,0.08)"
        : hovered
        ? `linear-gradient(135deg, ${accentColor}ee, ${accentColor}aa)`
        : `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
      color: disabled ? "rgba(255,255,255,0.25)" : "#0f172a",
      border: "none",
      boxShadow:
        !disabled && hovered
          ? `0 8px 24px ${accentColor}55, 0 0 0 1px ${accentColor}33`
          : !disabled
          ? `0 4px 12px ${accentColor}33`
          : "none",
    },
    secondary: {
      background: disabled
        ? "rgba(255,255,255,0.03)"
        : hovered
        ? "rgba(255,255,255,0.1)"
        : "rgba(255,255,255,0.06)",
      color: disabled ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.85)",
      border: `1px solid ${hovered && !disabled ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)"}`,
      boxShadow: "none",
    },
    outline: {
      background: hovered && !disabled ? `${accentColor}12` : "transparent",
      color: disabled ? "rgba(255,255,255,0.2)" : hovered ? accentColor : `${accentColor}cc`,
      border: `1px solid ${disabled ? "rgba(255,255,255,0.1)" : hovered ? accentColor : `${accentColor}66`}`,
      boxShadow: hovered && !disabled ? `0 0 16px ${accentColor}22` : "none",
    },
    ghost: {
      background: hovered && !disabled ? "rgba(255,255,255,0.06)" : "transparent",
      color: disabled ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)",
      border: "1px solid transparent",
      boxShadow: "none",
    },
    danger: {
      background: disabled
        ? "rgba(255,255,255,0.06)"
        : hovered
        ? "#ef4444dd"
        : "#ef4444",
      color: disabled ? "rgba(255,255,255,0.2)" : "#fff",
      border: "none",
      boxShadow: hovered && !disabled ? "0 8px 24px rgba(239,68,68,0.4)" : "none",
    },
  };

  const v = variantStyles[variant] || variantStyles.primary;

  const handleClick = (e) => {
    if (disabled || loading) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
    onClick(e);
  };

  const styles = {
    button: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: s.gap,
      padding: s.padding,
      height: s.height,
      fontSize: s.fontSize,
      fontWeight: 600,
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      letterSpacing: "0.01em",
      borderRadius: rounded ? "999px" : "10px",
      cursor: disabled || loading ? "not-allowed" : "pointer",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      transform: pressed && !disabled ? "scale(0.96)" : "scale(1)",
      width: fullWidth ? "100%" : "auto",
      overflow: "hidden",
      outline: "none",
      userSelect: "none",
      whiteSpace: "nowrap",
      ...v,
    },
    ripple: (x, y) => ({
      position: "absolute",
      left: x,
      top: y,
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.35)",
      transform: "translate(-50%, -50%) scale(0)",
      animation: "ripple 0.6s ease-out forwards",
      pointerEvents: "none",
    }),
    icon: {
      fontSize: s.iconSize,
      display: "flex",
      alignItems: "center",
      lineHeight: 1,
    },
    spinner: {
      width: s.iconSize,
      height: s.iconSize,
      border: "2px solid rgba(0,0,0,0.2)",
      borderTop: "2px solid currentColor",
      borderRadius: "50%",
      animation: "spin 0.7s linear infinite",
    },
  };

  return (
    <>
      <style>{`
        @keyframes ripple {
          to { transform: translate(-50%, -50%) scale(20); opacity: 0; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <button
        style={styles.button}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setPressed(false); }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        disabled={disabled}
        aria-disabled={disabled || loading}
        aria-label={label}
      >
        {ripples.map((r) => (
          <span key={r.id} style={styles.ripple(r.x, r.y)} />
        ))}
        {loading ? (
          <span style={styles.spinner} />
        ) : (
          icon && iconPosition === "left" && <span style={styles.icon}>{icon}</span>
        )}
        <span>{loading ? "Loading…" : label}</span>
        {!loading && icon && iconPosition === "right" && (
          <span style={styles.icon}>{icon}</span>
        )}
      </button>
    </>
  );
};