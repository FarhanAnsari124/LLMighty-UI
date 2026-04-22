import React,{ useState } from "react";

export const ProfileCard = ({
  name = "Alexandra Chen",
  role = "Senior Product Designer",
  company = "Anthropic",
  bio = "Crafting interfaces that feel inevitable. Obsessed with the space between design and engineering.",
  avatar = null,
  initials = "AC",
  accentColor = "#6ee7b7",
  bgColor = "#0f172a",
  stats = [
    { label: "Projects", value: "128" },
    { label: "Followers", value: "4.2k" },
    { label: "Following", value: "381" },
  ],
  badges = ["Design Systems", "Figma", "React"],
  socials = [
    { platform: "X", url: "#", icon: "𝕏" },
    { platform: "GitHub", url: "#", icon: "⌥" },
    { platform: "LinkedIn", url: "#", icon: "in" },
  ],
  onFollow = () => {},
  onMessage = () => {},
}) => {
  const [followed, setFollowed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [msgSent, setMsgSent] = useState(false);

  const handleFollow = () => {
    setFollowed((f) => !f);
    onFollow(!followed);
  };

  const handleMessage = () => {
    setMsgSent(true);
    setTimeout(() => setMsgSent(false), 2000);
    onMessage();
  };

  const styles = {
    wrapper: {
      width: "340px",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      position: "relative",
    },
    card: {
      backgroundColor: bgColor,
      borderRadius: "20px",
      border: `1px solid ${hovered ? accentColor + "55" : "rgba(255,255,255,0.07)"}`,
      boxShadow: hovered
        ? `0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px ${accentColor}22`
        : "0 8px 32px rgba(0,0,0,0.4)",
      transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
      transform: hovered ? "translateY(-4px)" : "translateY(0)",
      overflow: "hidden",
      position: "relative",
    },
    banner: {
      height: "88px",
      background: `linear-gradient(135deg, ${accentColor}33 0%, ${accentColor}11 50%, transparent 100%)`,
      position: "relative",
      overflow: "hidden",
    },
    bannerPattern: {
      position: "absolute",
      inset: 0,
      backgroundImage: `radial-gradient(circle at 20% 50%, ${accentColor}22 0%, transparent 60%), radial-gradient(circle at 80% 20%, ${accentColor}15 0%, transparent 50%)`,
    },
    bannerLine: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "1px",
      background: `linear-gradient(90deg, transparent, ${accentColor}44, transparent)`,
    },
    avatarWrapper: {
      position: "absolute",
      top: "52px",
      left: "24px",
      zIndex: 2,
    },
    avatarRing: {
      width: "72px",
      height: "72px",
      borderRadius: "50%",
      padding: "2px",
      background: `linear-gradient(135deg, ${accentColor}, ${accentColor}44)`,
      boxShadow: `0 0 20px ${accentColor}44`,
    },
    avatarInner: {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      backgroundColor: bgColor,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      border: `3px solid ${bgColor}`,
    },
    avatarImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "50%",
    },
    initials: {
      fontSize: "22px",
      fontWeight: 800,
      color: accentColor,
      letterSpacing: "-0.02em",
    },
    statusDot: {
      position: "absolute",
      bottom: "2px",
      right: "2px",
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      backgroundColor: "#22c55e",
      border: `2px solid ${bgColor}`,
    },
    body: {
      padding: "48px 24px 20px",
    },
    topRow: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      marginBottom: "8px",
      gap: "8px",
    },
    socialBtn: (platform) => ({
      width: "30px",
      height: "30px",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "11px",
      fontWeight: 700,
      cursor: "pointer",
      border: `1px solid ${hoveredSocial === platform ? accentColor + "66" : "rgba(255,255,255,0.1)"}`,
      backgroundColor: hoveredSocial === platform ? accentColor + "15" : "transparent",
      color: hoveredSocial === platform ? accentColor : "rgba(255,255,255,0.45)",
      transition: "all 0.18s",
      textDecoration: "none",
    }),
    nameRow: {
      marginBottom: "4px",
    },
    name: {
      fontSize: "20px",
      fontWeight: 800,
      color: "#f1f5f9",
      letterSpacing: "-0.03em",
      margin: 0,
    },
    roleLine: {
      fontSize: "12px",
      color: "rgba(255,255,255,0.4)",
      marginBottom: "12px",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    companyAccent: {
      color: accentColor,
      fontWeight: 600,
    },
    dot: {
      width: "3px",
      height: "3px",
      borderRadius: "50%",
      backgroundColor: "rgba(255,255,255,0.2)",
    },
    bio: {
      fontSize: "13px",
      color: "rgba(255,255,255,0.55)",
      lineHeight: 1.65,
      marginBottom: "18px",
    },
    badges: {
      display: "flex",
      flexWrap: "wrap",
      gap: "6px",
      marginBottom: "20px",
    },
    badge: {
      fontSize: "11px",
      fontWeight: 600,
      color: accentColor,
      backgroundColor: accentColor + "15",
      border: `1px solid ${accentColor}30`,
      borderRadius: "6px",
      padding: "3px 10px",
      letterSpacing: "0.01em",
    },
    divider: {
      height: "1px",
      background: "rgba(255,255,255,0.06)",
      margin: "0 -24px 20px",
    },
    stats: {
      display: "flex",
      justifyContent: "space-around",
      marginBottom: "20px",
    },
    stat: {
      textAlign: "center",
    },
    statValue: {
      fontSize: "18px",
      fontWeight: 800,
      color: "#f1f5f9",
      letterSpacing: "-0.03em",
      lineHeight: 1,
    },
    statLabel: {
      fontSize: "10px",
      color: "rgba(255,255,255,0.3)",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      marginTop: "4px",
    },
    statDivider: {
      width: "1px",
      background: "rgba(255,255,255,0.06)",
      alignSelf: "stretch",
    },
    actions: {
      display: "flex",
      gap: "10px",
    },
    followBtn: {
      flex: 1,
      height: "38px",
      borderRadius: "10px",
      border: followed ? `1px solid ${accentColor}55` : "none",
      background: followed ? "transparent" : `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)`,
      color: followed ? accentColor : "#0f172a",
      fontSize: "13px",
      fontWeight: 700,
      cursor: "pointer",
      transition: "all 0.2s",
      letterSpacing: "0.01em",
    },
    msgBtn: {
      flex: 1,
      height: "38px",
      borderRadius: "10px",
      border: "1px solid rgba(255,255,255,0.1)",
      background: msgSent ? accentColor + "22" : "rgba(255,255,255,0.05)",
      color: msgSent ? accentColor : "rgba(255,255,255,0.6)",
      fontSize: "13px",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.2s",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div
        style={styles.card}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Banner */}
        <div style={styles.banner}>
          <div style={styles.bannerPattern} />
          <div style={styles.bannerLine} />
        </div>

        {/* Avatar */}
        <div style={styles.avatarWrapper}>
          <div style={styles.avatarRing}>
            <div style={styles.avatarInner}>
              {avatar ? (
                <img src={avatar} alt={name} style={styles.avatarImg} />
              ) : (
                <span style={styles.initials}>{initials}</span>
              )}
            </div>
          </div>
          <div style={styles.statusDot} />
        </div>

        {/* Body */}
        <div style={styles.body}>
          {/* Socials top-right */}
          <div style={styles.topRow}>
            {socials.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                style={styles.socialBtn(s.platform)}
                onMouseEnter={() => setHoveredSocial(s.platform)}
                onMouseLeave={() => setHoveredSocial(null)}
                title={s.platform}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Name & Role */}
          <div style={styles.nameRow}>
            <h3 style={styles.name}>{name}</h3>
          </div>
          <div style={styles.roleLine}>
            <span>{role}</span>
            <span style={styles.dot} />
            <span style={styles.companyAccent}>{company}</span>
          </div>

          {/* Bio */}
          <p style={styles.bio}>{bio}</p>

          {/* Badges */}
          {badges.length > 0 && (
            <div style={styles.badges}>
              {badges.map((b) => (
                <span key={b} style={styles.badge}>{b}</span>
              ))}
            </div>
          )}

          <div style={styles.divider} />

          {/* Stats */}
          <div style={styles.stats}>
            {stats.map((st, i) => (
              <>
                <div key={st.label} style={styles.stat}>
                  <div style={styles.statValue}>{st.value}</div>
                  <div style={styles.statLabel}>{st.label}</div>
                </div>
                {i < stats.length - 1 && <div style={styles.statDivider} />}
              </>
            ))}
          </div>

          {/* Actions */}
          <div style={styles.actions}>
            <button style={styles.followBtn} onClick={handleFollow}>
              {followed ? "✓ Following" : "+ Follow"}
            </button>
            <button style={styles.msgBtn} onClick={handleMessage}>
              {msgSent ? "✓ Sent!" : "Message"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};