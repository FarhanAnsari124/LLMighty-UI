import React, { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSelector } from "react-redux";
import axios from "axios";
import { LiveProvider, LivePreview, LiveError } from "react-live";
import { ServerUrl } from "../App";
import BackButton from "../components/BackButton";
import {
  TbSparkles,
  TbCode,
  TbEye,
  TbCopy,
  TbCheck,
  TbTrash,
  TbSearch,
  TbPackage,
  TbX,
  TbAlertCircle,
  TbLayoutGrid,
  TbLayoutList,
  TbRocket,
} from "react-icons/tb";

const LIVE_SCOPE = {
  React,
  useState: React.useState,
  useEffect: React.useEffect,
  useRef: React.useRef,
  useCallback: React.useCallback,
};

const getLiveCode = (code, name) => {
  const stripped = code
    .split("\n")
    .filter((l) => !l.trim().startsWith("import"))
    .join("\n")
    .replace(/export\s+const\s+/, "const ")
    .trim();
  return `${stripped}\n\nrender(<${name} />)`;
};

export default function Components() {
  const { userData } = useSelector((s) => s.user);
  const [components, setComponents] = useState([]);
  const [publishing, setPublishing] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [layout, setLayout] = useState("grid");
  const [activeId, setActiveId] = useState(null);
  const [activeTab, setActiveTab] = useState({});
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [copied, setCopied] = useState({});

  const fetchComponents = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(`${ServerUrl}/api/component/my`, {
        withCredentials: true,
      });
      setComponents(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load components.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComponents();
  }, [fetchComponents]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await axios.delete(`${ServerUrl}/api/component/${deleteId}`, {
        withCredentials: true,
      });
      setComponents((prev) => prev.filter((c) => c._id !== deleteId));
      if (activeId === deleteId) setActiveId(null);
      setDeleteId(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete component.");
    } finally {
      setDeleting(false);
    }
  };

  const handleCopy = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopied((p) => ({ ...p, [id]: true }));
    setTimeout(() => setCopied((p) => ({ ...p, [id]: false })), 2000);
  };

  const getTab = (id) => activeTab[id] ?? "preview";
  const setTab = (id, tab) => setActiveTab((p) => ({ ...p, [id]: tab }));
  const filtered = components.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );
  const handlePublish = async (id) => {
    if (publishing[id]) return;
    setPublishing((p) => ({ ...p, [id]: true }));
    try {
      await axios.post(
        `${ServerUrl}/api/component/publish`,
        { componentId: id },
        { withCredentials: true },
      );
      setComponents((prev) =>
        prev.map((c) => (c._id === id ? { ...c, visibility: "public" } : c)),
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to publish component.");
    } finally {
      setPublishing((p) => ({ ...p, [id]: false }));
    }
  };

  return (
    <div
      className="min-h-screen bg-[#050505] text-[#F5F5F7] overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        input:focus { outline: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2C2C2E; border-radius: 4px; }
      `}</style>

      <PageBackground />

      <div className="relative z-10 max-w-[1000px] mx-auto px-4 sm:px-6 pt-16 pb-24">
        <div className="mb-8">
          <BackButton />
        </div>

        <PageHeader count={components.length} />

        <Toolbar
          search={search}
          setSearch={setSearch}
          layout={layout}
          setLayout={setLayout}
          count={filtered.length}
          total={components.length}
        />

        {error && (
          <ErrorBanner message={error} onDismiss={() => setError("")} />
        )}

        {loading ? (
          <LoadingState />
        ) : filtered.length === 0 ? (
          <EmptyState search={search} />
        ) : (
          <motion.div
            layout
            className={
              layout === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 gap-5"
                : "flex flex-col gap-4"
            }
          >
            <AnimatePresence>
              {filtered.map((comp, i) => (
                <ComponentCard
                  key={comp._id}
                  comp={comp}
                  i={i}
                  tab={getTab(comp._id)}
                  setTab={(tab) => setTab(comp._id, tab)}
                  isExpanded={activeId === comp._id}
                  onExpand={() =>
                    setActiveId((p) => (p === comp._id ? null : comp._id))
                  }
                  onCopy={() => handleCopy(comp._id, comp.code)}
                  copied={!!copied[comp._id]}
                  onDelete={() => setDeleteId(comp._id)}
                  isAdmin={userData?.role === "admin"}
                  onPublish={() => handlePublish(comp._id)}
                  publishing={!!publishing[comp._id]}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {deleteId && (
          <DeleteModal
            name={components.find((c) => c._id === deleteId)?.name}
            deleting={deleting}
            onConfirm={handleDelete}
            onCancel={() => setDeleteId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

const PageBackground = () => (
  <div className="fixed inset-0 pointer-events-none">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(124,106,247,0.07)_0%,transparent_65%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.011)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.011)_1px,transparent_1px)] bg-[size:44px_44px]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050505_100%)]" />
  </div>
);

const PageHeader = ({ count }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    className="mb-10"
  >
    <div className="inline-flex items-center gap-2 bg-[#7C6AF7]/[0.08] border border-[#7C6AF7]/20 rounded-full px-4 py-1.5 mb-5">
      <TbPackage size={12} color="#7C6AF7" />
      <span className="text-[11px] text-[#7C6AF7] font-semibold tracking-[0.08em] uppercase">
        My Library
      </span>
    </div>
    <h1
      className="text-[38px] sm:text-[52px] font-bold text-[#F5F5F7] tracking-[-2.5px] leading-[1.0] mb-3"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      Saved <span className="text-[#7C6AF7]">Components</span>
    </h1>
    <p className="text-[14px] text-[#86868B] leading-[1.8] max-w-[420px]">
      All your AI-generated components in one place. Preview, copy, or delete
      anytime.
    </p>
  </motion.div>
);

const Toolbar = ({ search, setSearch, layout, setLayout, count, total }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.55 }}
    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-7"
  >
    <div className="relative flex-1 max-w-[320px]">
      <TbSearch
        size={13}
        color="#3A3A3C"
        style={{
          position: "absolute",
          left: "14px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search components..."
        className="w-full bg-[#080808] border border-white/[0.07] hover:border-white/[0.11] text-[12.5px] text-[#F5F5F7] placeholder-[#2C2C2E] rounded-xl py-2.5 transition-colors"
        style={{
          paddingLeft: "36px",
          paddingRight: search ? "36px" : "14px",
          fontFamily: "'DM Sans', sans-serif",
        }}
      />
      {search && (
        <button
          onClick={() => setSearch("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3A3A3C] hover:text-[#86868B] transition-colors bg-transparent border-none cursor-pointer"
        >
          <TbX size={13} />
        </button>
      )}
    </div>

    <div className="flex items-center gap-2.5">
      {search && (
        <span className="text-[11px] text-[#3A3A3C]">
          {count} of {total}
        </span>
      )}
      <div className="flex items-center bg-[#080808] border border-white/[0.07] rounded-xl p-1">
        {[
          { id: "grid", icon: TbLayoutGrid },
          { id: "list", icon: TbLayoutList },
        ].map(({ id, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setLayout(id)}
            className={`w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer border-none transition-all
              ${
                layout === id
                  ? "bg-[#7C6AF7] text-white shadow-[0_0_10px_rgba(124,106,247,0.3)]"
                  : "bg-transparent text-[#48484A] hover:text-[#86868B]"
              }`}
          >
            <Icon size={13} />
          </button>
        ))}
      </div>
    </div>
  </motion.div>
);

const ComponentCard = ({
  comp,
  i,
  tab,
  setTab,
  isExpanded,
  onExpand,
  onCopy,
  copied,
  onDelete,
  isAdmin,
  onPublish,
  publishing,
}) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 22 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.97 }}
    transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    className="bg-[#080808] border border-white/[0.07] rounded-[20px] overflow-hidden hover:border-white/[0.11] transition-colors duration-300"
  >
    <CardHeader
      comp={comp}
      tab={tab}
      setTab={setTab}
      isExpanded={isExpanded}
      onExpand={onExpand}
      onCopy={onCopy}
      copied={copied}
      onDelete={onDelete}
      isAdmin={isAdmin}
      onPublish={onPublish}
      publishing={publishing}
    />

    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ overflow: "hidden" }}
        >
          <AnimatePresence mode="wait">
            {tab === "preview" ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CardPreview code={comp.code} name={comp.name} />
              </motion.div>
            ) : (
              <motion.div
                key="code"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CardCode code={comp.code} name={comp.name} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const CardHeader = ({
  comp,
  tab,
  setTab,
  isExpanded,
  onExpand,
  onCopy,
  copied,
  onDelete,
  isAdmin,
  onPublish,
  publishing,
}) => (
  <div className="flex items-center justify-between px-5 py-4">
    <button
      onClick={onExpand}
      className="flex items-center gap-3 flex-1 min-w-0 text-left bg-transparent border-none cursor-pointer group"
    >
      <div className="w-8 h-8 rounded-[10px] bg-[#7C6AF7]/10 border border-[#7C6AF7]/20 flex items-center justify-center shrink-0 group-hover:bg-[#7C6AF7]/18 transition-colors">
        <TbSparkles size={13} color="#7C6AF7" />
      </div>
      <div className="min-w-0 flex-1">
        <p
          className="text-[13px] font-bold text-[#F5F5F7] truncate tracking-[-0.2px] group-hover:text-white transition-colors"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {comp.name}
        </p>
        <p className="text-[10px] text-[#3A3A3C] truncate mt-0.5">
          {Array.isArray(comp.props)
            ? comp.props.join(", ")
            : comp.props || "No props"}
        </p>
      </div>
      <motion.span
        animate={{ rotate: isExpanded ? 180 : 0 }}
        transition={{ duration: 0.25 }}
        className="text-[#2C2C2E] shrink-0 mr-1"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M2 4L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.span>
    </button>

    <div className="flex items-center gap-1.5 shrink-0">
      {isExpanded && (
        <div className="flex items-center bg-[#0d0d0d] border border-white/[0.06] rounded-lg p-0.5 mr-1">
          {["preview", "code"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10.5px] font-semibold cursor-pointer border-none transition-all
                ${
                  tab === t
                    ? "bg-[#7C6AF7] text-white"
                    : "bg-transparent text-[#48484A] hover:text-[#86868B]"
                }`}
            >
              {t === "preview" ? <TbEye size={11} /> : <TbCode size={11} />}
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      )}

      <motion.button
        onClick={onCopy}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="w-7 h-7 flex items-center justify-center bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.11] rounded-lg text-[#48484A] hover:text-[#86868B] cursor-pointer transition-all"
      >
        {copied ? <TbCheck size={12} color="#7C6AF7" /> : <TbCopy size={12} />}
      </motion.button>
      {isAdmin && (
        <motion.button
          onClick={onPublish}
          disabled={publishing || comp.visibility === "public"}
          whileHover={
            !publishing && comp.visibility !== "public" ? { scale: 1.08 } : {}
          }
          whileTap={
            !publishing && comp.visibility !== "public" ? { scale: 0.92 } : {}
          }
          className={`w-7 h-7 flex items-center justify-center rounded-lg border cursor-pointer transition-all
        ${
          comp.visibility === "public"
            ? "bg-[#28CA42]/10 border-[#28CA42]/20 text-[#28CA42]/40 cursor-default"
            : "bg-white/[0.03] border-white/[0.06] hover:border-[#28CA42]/20 hover:bg-[#28CA42]/[0.05] text-[#48484A] hover:text-[#28CA42]"
        } disabled:opacity-50`}
          title={
            comp.visibility === "public"
              ? "Already published"
              : "Publish to npm"
          }
        >
          {publishing ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <TbRocket size={12} />
            </motion.div>
          ) : (
            <TbRocket size={12} />
          )}
        </motion.button>
      )}
      <motion.button
        onClick={onDelete}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="w-7 h-7 flex items-center justify-center bg-white/[0.03] border border-white/[0.06] hover:border-[#FF5F57]/20 hover:bg-[#FF5F57]/[0.05] rounded-lg text-[#48484A] hover:text-[#FF5F57] cursor-pointer transition-all"
      >
        <TbTrash size={12} />
      </motion.button>
    </div>
  </div>
);

const CardPreview = ({ code, name }) => {
  const liveCode = getLiveCode(code, name);
  return (
    <div className="border-t border-white/[0.05] bg-[#020617] min-h-[280px] flex items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.007)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.007)_1px,transparent_1px)] bg-[size:28px_28px]" />
      <div className="relative z-10 w-full flex justify-center">
        <LiveProvider code={liveCode} scope={LIVE_SCOPE} noInline>
          <LiveError className="text-[11px] font-mono text-[#FF5F57] bg-[#FF5F57]/[0.07] border border-[#FF5F57]/20 rounded-xl p-3 mb-2 w-full" />
          <LivePreview />
        </LiveProvider>
      </div>
    </div>
  );
};

const CardCode = ({ code, name }) => {
  const lines = code.split("\n");
  const tokenise = (line) => {
    if (!line.trim()) return [{ c: "#1a1a1a", t: " " }];
    if (line.trim().startsWith("//")) return [{ c: "#3A3A3C", t: line }];
    const keywords = [
      "import",
      "export",
      "const",
      "return",
      "from",
      "default",
      "let",
      "var",
      "if",
      "else",
      "function",
    ];
    for (const kw of keywords) {
      if (new RegExp(`\\b${kw}\\b`).test(line)) {
        const idx = line.search(new RegExp(`\\b${kw}\\b`));
        return [
          { c: "#86868B", t: line.slice(0, idx) },
          { c: "#7C6AF7", t: kw },
          { c: "#86868B", t: line.slice(idx + kw.length) },
        ].filter((t) => t.t !== "");
      }
    }
    if (line.includes('"') || line.includes("'") || line.includes("`"))
      return [{ c: "#86868B", t: line }];
    return [{ c: "#F5F5F7", t: line }];
  };

  return (
    <div className="border-t border-white/[0.05]">
      <div className="flex items-center justify-between px-5 py-2 bg-[#070707] border-b border-white/[0.04]">
        <div className="flex gap-1.5">
          {["#FF5F57", "#FFBD2E", "#28CA42"].map((c) => (
            <div
              key={c}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
        <span className="text-[9.5px] text-[#2C2C2E] font-mono">
          {name}.jsx · {lines.length} lines
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-[#28CA42]" />
      </div>
      <div className="overflow-x-auto max-h-[320px] overflow-y-auto">
        <div className="p-4 font-mono text-[11px] leading-[1.9] min-w-[400px]">
          {lines.map((line, li) => (
            <div key={li} className="flex gap-3 group">
              <span className="select-none text-[#2C2C2E] w-5 text-right shrink-0 group-hover:text-[#3A3A3C] transition-colors">
                {li + 1}
              </span>
              <span>
                {tokenise(line).map((tok, ti) => (
                  <span key={ti} style={{ color: tok.c }}>
                    {tok.t}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ErrorBanner = ({ message, onDismiss }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-start gap-3 bg-[#FF5F57]/[0.07] border border-[#FF5F57]/20 rounded-[16px] px-4 py-3.5 mb-5"
  >
    <TbAlertCircle
      size={15}
      color="#FF5F57"
      style={{ marginTop: "2px", flexShrink: 0 }}
    />
    <p className="text-[12.5px] text-[#FF5F57]/80 flex-1 leading-relaxed">
      {message}
    </p>
    <button
      onClick={onDismiss}
      className="text-[#FF5F57]/40 hover:text-[#FF5F57]/70 transition-colors bg-transparent border-none cursor-pointer text-[11px] font-medium shrink-0"
    >
      Dismiss
    </button>
  </motion.div>
);

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center py-24 gap-4">
    <div className="flex gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-[#7C6AF7]"
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </div>
    <p className="text-[13px] text-[#48484A]">Loading your components...</p>
  </div>
);

const EmptyState = ({ search }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-24 text-center"
  >
    <div className="w-14 h-14 rounded-[18px] bg-[#080808] border border-white/[0.07] flex items-center justify-center mb-5">
      {search ? (
        <TbSearch size={22} color="#3A3A3C" />
      ) : (
        <TbPackage size={22} color="#3A3A3C" />
      )}
    </div>
    <h3
      className="text-[17px] font-bold text-[#3A3A3C] mb-2 tracking-[-0.3px]"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      {search ? "No components match" : "No saved components yet"}
    </h3>
    <p className="text-[12.5px] text-[#2C2C2E] leading-relaxed max-w-[280px]">
      {search
        ? `Nothing found for "${search}". Try a different name.`
        : "Go to the Generate page, build something great, and hit Save Component."}
    </p>
  </motion.div>
);

const DeleteModal = ({ name, deleting, onConfirm, onCancel }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#0a0a0a] border border-white/[0.08] rounded-[24px] p-7 w-full max-w-[360px] shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
    >
      <div className="w-10 h-10 rounded-[12px] bg-[#FF5F57]/[0.08] border border-[#FF5F57]/20 flex items-center justify-center mb-5">
        <TbTrash size={17} color="#FF5F57" />
      </div>
      <h3
        className="text-[16px] font-bold text-[#F5F5F7] mb-2 tracking-[-0.3px]"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        Delete component?
      </h3>
      <p className="text-[12.5px] text-[#48484A] leading-relaxed mb-7">
        <span className="text-[#86868B] font-medium">{name}</span> will be
        permanently deleted. This cannot be undone.
      </p>
      <div className="flex gap-2.5">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl text-[12.5px] font-semibold text-[#86868B] hover:text-[#F5F5F7] bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.07] cursor-pointer transition-all"
        >
          Cancel
        </button>
        <motion.button
          onClick={onConfirm}
          disabled={deleting}
          whileHover={!deleting ? { scale: 1.02 } : {}}
          whileTap={!deleting ? { scale: 0.97 } : {}}
          className={`flex-1 py-2.5 rounded-xl text-[12.5px] font-semibold border-none transition-all
            ${
              deleting
                ? "bg-[#FF5F57]/30 text-[#FF5F57]/40 cursor-not-allowed"
                : "bg-[#FF5F57] text-white cursor-pointer shadow-[0_0_20px_rgba(255,95,87,0.3)] hover:shadow-[0_0_30px_rgba(255,95,87,0.45)]"
            }`}
        >
          {deleting ? "Deleting..." : "Delete"}
        </motion.button>
      </div>
    </motion.div>
  </motion.div>
);
