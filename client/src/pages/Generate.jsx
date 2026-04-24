import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import { useSelector, useDispatch } from "react-redux";
import { ServerUrl } from "../App";
import axios from "axios";
import { LiveProvider, LivePreview, LiveError } from "react-live";
import {
  TbSparkles, TbCode, TbEye, TbCopy, TbCheck,
  TbDownload, TbRefresh, TbBookmark, TbBookmarkFilled,
  TbBolt, TbAlertCircle, TbCoins, TbInfoCircle,
} from "react-icons/tb";
import { setUserData } from "../redux/userSlice";

const SUGGESTIONS = [
  "A glassmorphic pricing card with toggle",
  "Animated sidebar navigation with icons",
  "Dark mode toggle with smooth transition",
  "Notification toast with progress bar",
  "Profile card with hover reveal stats",
  "Command palette with fuzzy search",
];

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

const downloadFile = (code, name) => {
  const blob = new Blob([code], { type: "text/javascript" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `${name}.jsx`;
  a.click();
  URL.revokeObjectURL(url);
};

export default function Generate() {
  const dispatch                        = useDispatch();
  const { userData }                    = useSelector((s) => s.user);
  const [prompt, setPrompt]             = useState("");
  const [status, setStatus]             = useState("idle");
  const [result, setResult]             = useState(null);
  const [credits, setCredits]           = useState(userData?.aiCredits ?? null);
  const [activeTab, setActiveTab]       = useState("preview");
  const [copied, setCopied]             = useState(false);
  const [saveStatus, setSaveStatus]     = useState("idle");
  const [error, setError]               = useState("");
  const [genTime, setGenTime]           = useState(null);
  const textareaRef                     = useRef(null);
  const startTimeRef                    = useRef(null);

  const isAdmin      = userData?.role === "admin";
  const isGenerating = status === "generating";
  const isDone       = status === "done";
  const isError      = status === "error";
  const isSaving     = saveStatus === "saving";
  const isSaved      = saveStatus === "saved";
  const creditCost   = 50;
  const hasCredits   = isAdmin || (credits !== null && credits >= creditCost);

  useEffect(() => {
    setCredits(userData?.aiCredits ?? null);
  }, [userData]);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating || !hasCredits) return;
    setStatus("generating");
    setResult(null);
    setError("");
    setSaveStatus("idle");
    startTimeRef.current = Date.now();
    try {
      const { data } = await axios.post(
        `${ServerUrl}/api/component/generate`,
        { prompt },
        { withCredentials: true }
      );
      const elapsed = ((Date.now() - startTimeRef.current) / 1000).toFixed(1);
      setGenTime(elapsed);
      setResult(data.parsed);
      if (data.remainingCredits !== null && data.remainingCredits !== undefined) {
        setCredits(data.remainingCredits);
        dispatch(setUserData({ ...userData, aiCredits: data.remainingCredits }));
      }
      setStatus("done");
      setActiveTab("preview");
    } catch (err) {
      console.error("[Generate] full error object:", err);
      console.error("[Generate] response:", err.response);
      console.error("[Generate] request sent:", err.request);

      let message;
      if (!err.response && !err.request) {
        message = `Setup error: ${err.message}`;
      } else if (!err.response) {
        message = "No response from server — likely a CORS error or the server is not running. Check browser console and server terminal.";
      } else {
        const s = err.response.status;
        const serverMsg = err.response?.data?.message;
        message = serverMsg
          ? `[${s}] ${serverMsg}`
          : `Server returned ${s} with no message — check your server terminal logs.`;
      }
      setError(message);
      setStatus("error");
    }
  };

  const handleSave = async () => {
    if (!result || isSaving || isSaved) return;
    setSaveStatus("saving");
    try {
      await axios.post(
        "/api/component/save",
        { name: result.name, code: result.code, props: result.props },
        { withCredentials: true }
      );
      setSaveStatus("saved");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save component.");
      setSaveStatus("idle");
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!result) return;
    downloadFile(result.code, result.name);
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") handleGenerate();
  };

  const handleReset = () => {
    setStatus("idle");
    setPrompt("");
    setResult(null);
    setError("");
    setSaveStatus("idle");
    setActiveTab("preview");
    setGenTime(null);
  };

  return (
    <div
      className="min-h-screen bg-[#050505] text-[#F5F5F7] overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        textarea:focus { outline: none; }
        textarea { resize: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2C2C2E; border-radius: 4px; }
      `}</style>

      <PageBackground />

      <div className="relative z-10 max-w-[860px] mx-auto px-4 sm:px-6 pt-16 pb-24">

        <GenerateHeader credits={credits} isAdmin={isAdmin} creditCost={creditCost} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <PromptBox
            prompt={prompt}
            setPrompt={setPrompt}
            onGenerate={handleGenerate}
            onKeyDown={handleKeyDown}
            isGenerating={isGenerating}
            isDone={isDone}
            onReset={handleReset}
            textareaRef={textareaRef}
            hasCredits={hasCredits}
            isAdmin={isAdmin}
          />
        </motion.div>

        <AnimatePresence>
          {isError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ErrorBanner message={error} onDismiss={() => setStatus("idle")} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isDone && !isGenerating && !isError && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <SuggestionChips
                onSelect={(s) => { setPrompt(s); textareaRef.current?.focus(); }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <GeneratingState />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isDone && result && (
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <ResultPanel
                result={result}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                copied={copied}
                saveStatus={saveStatus}
                onCopy={handleCopy}
                onSave={handleSave}
                onDownload={handleDownload}
                genTime={genTime}
                isSaving={isSaving}
                isSaved={isSaved}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
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

const GenerateHeader = ({ credits, isAdmin, creditCost }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    className="text-center mb-10"
  >
    <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
      <div className="inline-flex items-center gap-2 bg-[#7C6AF7]/[0.08] border border-[#7C6AF7]/20 rounded-full px-4 py-1.5">
        <TbSparkles size={12} color="#7C6AF7" />
        <span className="text-[11px] text-[#7C6AF7] font-semibold tracking-[0.08em] uppercase">
          AI Component Studio
        </span>
      </div>

      <CreditsIndicator credits={credits} isAdmin={isAdmin} creditCost={creditCost} />
    </div>

    <h1
      className="text-[42px] sm:text-[58px] font-bold text-[#F5F5F7] tracking-[-2.5px] leading-[1.0] mb-4"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      Build with <span className="text-[#7C6AF7]">LLMighty AI</span>
    </h1>
    <p className="text-[14px] sm:text-[15px] text-[#86868B] leading-[1.8] max-w-[420px] mx-auto">
      Describe your React component in plain English. Preview, save,
      and publish — all in one place.
    </p>
  </motion.div>
);

const CreditsIndicator = ({ credits, isAdmin, creditCost }) => {
  if (isAdmin) {
    return (
      <div className="inline-flex items-center gap-1.5 bg-[#28CA42]/[0.07] border border-[#28CA42]/20 rounded-full px-3.5 py-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-[#28CA42]" />
        <span className="text-[11px] text-[#28CA42]/80 font-semibold">Admin · Unlimited</span>
      </div>
    );
  }

  if (credits === null) return null;

  const isLow      = credits < creditCost * 2;
  const isDepleted = credits < creditCost;

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 border
      ${isDepleted
        ? "bg-[#FF5F57]/[0.07] border-[#FF5F57]/20"
        : isLow
        ? "bg-[#FFBD2E]/[0.07] border-[#FFBD2E]/20"
        : "bg-white/[0.04] border-white/[0.07]"
      }`}
    >
      <TbCoins size={12} color={isDepleted ? "#FF5F57" : isLow ? "#FFBD2E" : "#48484A"} />
      <span className={`text-[11px] font-semibold
        ${isDepleted ? "text-[#FF5F57]/80" : isLow ? "text-[#FFBD2E]/80" : "text-[#48484A]"}`}
      >
        {credits} credits
      </span>
      <span className="text-[10px] text-[#2C2C2E]">· {creditCost} / gen</span>
    </div>
  );
};

const ErrorBanner = ({ message, onDismiss }) => (
  <div className="mt-4 flex items-start gap-3 bg-[#FF5F57]/[0.07] border border-[#FF5F57]/20 rounded-[16px] px-4 py-3.5">
    <TbAlertCircle size={15} color="#FF5F57" className="shrink-0 mt-0.5" />
    <p className="text-[12.5px] text-[#FF5F57]/80 flex-1 leading-relaxed">{message}</p>
    <button
      onClick={onDismiss}
      className="text-[#FF5F57]/40 hover:text-[#FF5F57]/70 transition-colors bg-transparent border-none cursor-pointer text-[11px] font-medium shrink-0"
    >
      Dismiss
    </button>
  </div>
);

const PromptBox = ({
  prompt, setPrompt, onGenerate, onKeyDown,
  isGenerating, isDone, onReset, textareaRef,
  hasCredits, isAdmin,
}) => (
  <div className="relative bg-[#080808] border border-white/[0.07] rounded-[22px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] mb-4 hover:border-white/[0.11] transition-colors duration-300">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7C6AF7]/20 to-transparent" />

    <div className="flex items-start gap-3 px-5 pt-5 pb-2">
      <div className="mt-[3px] w-6 h-6 rounded-lg bg-[#7C6AF7]/10 border border-[#7C6AF7]/20 flex items-center justify-center shrink-0">
        <TbSparkles size={11} color="#7C6AF7" />
      </div>
      <textarea
        ref={textareaRef}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Describe your component... (e.g. An animated e-commerce card with image, rating, price and add to cart)"
        rows={3}
        disabled={isGenerating}
        className="flex-1 bg-transparent text-[13.5px] text-[#F5F5F7] placeholder-[#2C2C2E] leading-[1.7] border-none pt-0.5 disabled:opacity-40 transition-opacity"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      />
    </div>

    <div className="flex items-center justify-between px-5 py-3.5 border-t border-white/[0.04]">
      <span className="text-[10.5px] text-[#2C2C2E] font-mono">
        {isGenerating ? "Generating component..." : "⌘ + Enter to generate"}
      </span>
      <div className="flex items-center gap-2">
        {isDone && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onReset}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1.5 text-[11.5px] text-[#48484A] hover:text-[#86868B] bg-white/[0.03] border border-white/[0.06] px-3 py-2 rounded-xl cursor-pointer transition-colors"
          >
            <TbRefresh size={13} /> New
          </motion.button>
        )}
        {!hasCredits && !isAdmin && (
          <div className="flex items-center gap-1.5 text-[11px] text-[#FF5F57]/70 mr-1">
            <TbInfoCircle size={13} />
            Not enough credits
          </div>
        )}
        <motion.button
          onClick={onGenerate}
          disabled={!prompt.trim() || isGenerating || !hasCredits}
          whileHover={prompt.trim() && !isGenerating && hasCredits ? { scale: 1.03, y: -1 } : {}}
          whileTap={prompt.trim() && !isGenerating && hasCredits ? { scale: 0.97 } : {}}
          className={`flex items-center gap-2 text-[12.5px] font-semibold px-5 py-2.5 rounded-xl border-none transition-all
            ${prompt.trim() && !isGenerating && hasCredits
              ? "bg-[#7C6AF7] text-white cursor-pointer shadow-[0_0_24px_rgba(124,106,247,0.35)] hover:shadow-[0_0_36px_rgba(124,106,247,0.5)]"
              : "bg-[#7C6AF7]/20 text-[#7C6AF7]/40 cursor-not-allowed"
            }`}
        >
          {isGenerating ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <TbBolt size={14} />
            </motion.div>
          ) : (
            <TbSparkles size={14} />
          )}
          {isGenerating ? "Generating" : isDone ? "Regenerate" : "Generate"}
        </motion.button>
      </div>
    </div>
  </div>
);

const SuggestionChips = ({ onSelect }) => (
  <div className="mt-5 mb-8">
    <p className="text-[10px] text-[#2C2C2E] uppercase tracking-[0.18em] font-semibold mb-3 text-center">
      Try an example
    </p>
    <div className="flex flex-wrap justify-center gap-2">
      {SUGGESTIONS.map((s, i) => (
        <motion.button
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 + i * 0.04, duration: 0.4 }}
          onClick={() => onSelect(s)}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="text-[11px] text-[#48484A] hover:text-[#86868B] bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] hover:border-white/[0.1] rounded-full px-3.5 py-2 cursor-pointer transition-all"
        >
          {s}
        </motion.button>
      ))}
    </div>
  </div>
);

const GeneratingState = () => (
  <div className="mt-6 bg-[#080808] border border-white/[0.06] rounded-[22px] p-8 text-center">
    <div className="flex items-center justify-center gap-3 mb-5">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-[#7C6AF7]"
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18, ease: easeInOut }}
          />
        ))}
      </div>
    </div>
    <p className="text-[13px] text-[#48484A] font-medium mb-5">Building your component</p>
    <div className="flex justify-center gap-6">
      {["Parsing prompt", "Generating JSX", "Adding props"].map((step, i) => (
        <motion.div
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.7 }}
          className="flex items-center gap-1.5"
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-[#7C6AF7]"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.7 }}
          />
          <span className="text-[10.5px] text-[#3A3A3C]">{step}</span>
        </motion.div>
      ))}
    </div>
  </div>
);

const ResultPanel = ({
  result, activeTab, setActiveTab,
  copied, saveStatus, onCopy, onSave, onDownload,
  genTime, isSaving, isSaved,
}) => (
  <div className="mt-6 bg-[#080808] border border-white/[0.07] rounded-[22px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
    <ResultHeader
      result={result}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      copied={copied}
      onCopy={onCopy}
    />

    <div className="min-h-[340px]">
      <AnimatePresence mode="wait">
        {activeTab === "preview" ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.25 }}
          >
            <LivePreviewPane code={result.code} name={result.name} />
          </motion.div>
        ) : (
          <motion.div
            key="code"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25 }}
          >
            <CodePane code={result.code} name={result.name} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>

    <ResultFooter
      result={result}
      genTime={genTime}
      isSaving={isSaving}
      isSaved={isSaved}
      onSave={onSave}
      onDownload={onDownload}
    />
  </div>
);

const ResultHeader = ({ result, activeTab, setActiveTab, copied, onCopy }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-white/[0.05] bg-[#070707]">
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 rounded-lg bg-[#7C6AF7]/10 border border-[#7C6AF7]/20 flex items-center justify-center shrink-0">
        <TbSparkles size={12} color="#7C6AF7" />
      </div>
      <div>
        <p
          className="text-[13px] font-bold text-[#F5F5F7] tracking-[-0.2px]"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {result.name}
        </p>
        <p className="text-[10px] text-[#3A3A3C] mt-0.5 truncate max-w-[320px]">
          Props: {Array.isArray(result.props) ? result.props.join(", ") : result.props}
        </p>
      </div>
    </div>

    <div className="flex items-center gap-2 shrink-0">
      <div className="flex items-center bg-[#0d0d0d] border border-white/[0.06] rounded-xl p-1">
        {["preview", "code"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11.5px] font-semibold cursor-pointer border-none transition-all capitalize
              ${activeTab === tab
                ? "bg-[#7C6AF7] text-white shadow-[0_0_12px_rgba(124,106,247,0.3)]"
                : "bg-transparent text-[#48484A] hover:text-[#86868B]"
              }`}
          >
            {tab === "preview" ? <TbEye size={12} /> : <TbCode size={12} />}
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <motion.button
        onClick={onCopy}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-8 h-8 flex items-center justify-center bg-white/[0.04] border border-white/[0.07] hover:border-white/[0.12] rounded-xl text-[#48484A] hover:text-[#86868B] cursor-pointer transition-all"
      >
        {copied ? <TbCheck size={13} color="#7C6AF7" /> : <TbCopy size={13} />}
      </motion.button>
    </div>
  </div>
);

const LivePreviewPane = ({ code, name }) => {
  const liveCode = getLiveCode(code, name);
  return (
    <div className="relative bg-[#020617] min-h-[340px] flex items-center justify-center p-8 overflow-auto">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.007)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.007)_1px,transparent_1px)] bg-[size:28px_28px]" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full flex justify-center"
      >
        <LiveProvider code={liveCode} scope={LIVE_SCOPE} noInline>
          <LiveError
            className="text-[11.5px] font-mono text-[#FF5F57] bg-[#FF5F57]/[0.07] border border-[#FF5F57]/20 rounded-xl p-4 mb-3 w-full"
          />
          <LivePreview />
        </LiveProvider>
      </motion.div>
    </div>
  );
};

const tokenise = (line) => {
  if (!line.trim()) return [{ c: "#F5F5F7", t: " " }];
  if (line.trim().startsWith("//")) return [{ c: "#3A3A3C", t: line }];
  const keywords = ["import", "export", "const", "return", "from", "default", "let", "var", "if", "else", "function"];
  for (const kw of keywords) {
    const re = new RegExp(`\\b${kw}\\b`);
    if (re.test(line)) {
      const idx = line.search(re);
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

const CodePane = ({ code, name }) => {
  const lines = code.split("\n");
  return (
    <div className="relative">
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/[0.04] bg-[#070707]">
        <div className="flex gap-1.5">
          {["#FF5F57", "#FFBD2E", "#28CA42"].map((c) => (
            <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
          ))}
        </div>
        <span className="text-[10px] text-[#2C2C2E] font-mono">{name}.jsx</span>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#28CA42]" />
          <span className="text-[9.5px] text-[#28CA42]/60">{lines.length} lines</span>
        </div>
      </div>
      <div className="overflow-x-auto max-h-[480px] overflow-y-auto">
        <div className="p-5 font-mono text-[11.5px] leading-[1.95] min-w-[480px]">
          {lines.map((line, li) => (
            <div key={li} className="flex gap-4 group">
              <span className="select-none text-[#2C2C2E] w-6 text-right shrink-0 group-hover:text-[#3A3A3C] transition-colors">
                {li + 1}
              </span>
              <span>
                {tokenise(line).map((tok, ti) => (
                  <span key={ti} style={{ color: tok.c }}>{tok.t}</span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ResultFooter = ({ result, genTime, isSaving, isSaved, onSave, onDownload }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 border-t border-white/[0.05] bg-[#070707]">
    <div className="flex items-center gap-3">
      {genTime && (
        <>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#28CA42]" />
            <span className="text-[10.5px] text-[#28CA42]/70 font-medium">Generated in {genTime}s</span>
          </div>
          <div className="w-px h-3 bg-white/[0.06]" />
        </>
      )}
      <span className="text-[10.5px] text-[#2C2C2E]">
        {result.code.split("\n").length} lines · Inline styles · React
      </span>
    </div>

    <div className="flex items-center gap-2">
      <motion.button
        onClick={onDownload}
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2 text-[12px] text-[#86868B] hover:text-[#F5F5F7] bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.1] px-4 py-2 rounded-xl cursor-pointer transition-all"
      >
        <TbDownload size={13} /> Export
      </motion.button>

      <motion.button
        onClick={onSave}
        disabled={isSaving || isSaved}
        whileHover={!isSaving && !isSaved ? { scale: 1.03, y: -1 } : {}}
        whileTap={!isSaving && !isSaved ? { scale: 0.97 } : {}}
        className={`flex items-center gap-2 text-[12px] font-semibold px-4 py-2 rounded-xl border-none transition-all
          ${isSaved
            ? "bg-[#7C6AF7]/15 text-[#7C6AF7] border border-[#7C6AF7]/25 cursor-default"
            : isSaving
            ? "bg-[#7C6AF7]/30 text-[#7C6AF7]/50 cursor-not-allowed"
            : "bg-[#7C6AF7] text-white cursor-pointer shadow-[0_0_20px_rgba(124,106,247,0.3)] hover:shadow-[0_0_30px_rgba(124,106,247,0.45)]"
          }`}
      >
        {isSaving ? (
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
            <TbBolt size={13} />
          </motion.div>
        ) : isSaved ? (
          <TbBookmarkFilled size={13} />
        ) : (
          <TbBookmark size={13} />
        )}
        {isSaving ? "Saving..." : isSaved ? "Saved!" : "Save Component"}
      </motion.button>
    </div>
  </div>
);