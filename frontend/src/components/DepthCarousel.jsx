import React, { useState } from "react";

const DEFAULT_METRICS = [
  {
    id: 1,
    title: "PostgreSQL Isolation Engine",
    tag: "Row Level Security",
    value: "100% Isolated",
    detail: "Multi-tenant tenant_id schemas verified across active sessions.",
    gradient: "from-cyan-500/20 via-sky-600/10 to-blue-900/30",
    border: "border-cyan-500/40",
    accent: "text-cyan-400",
    badgeBg: "bg-cyan-950/80 border-cyan-400/40 text-cyan-300",
    icon: "🛡️",
  },
  {
    id: 2,
    title: "Campus Telemetry Stream",
    tag: "Real-Time Ingestion",
    value: "12.4 ms Latency",
    detail: "Sub-second sync processing events across all university nodes.",
    gradient: "from-emerald-500/20 via-teal-600/10 to-emerald-950/30",
    border: "border-emerald-500/40",
    accent: "text-emerald-400",
    badgeBg: "bg-emerald-950/80 border-emerald-400/40 text-emerald-300",
    icon: "⚡",
  },
  {
    id: 3,
    title: "Automated GPA Verification",
    tag: "Consensus Ledger",
    value: "3,842 Records",
    detail: "Cryptographic GPA tamper-proof validation complete for semester.",
    gradient: "from-purple-500/20 via-fuchsia-600/10 to-indigo-950/30",
    border: "border-purple-500/40",
    accent: "text-purple-400",
    badgeBg: "bg-purple-950/80 border-purple-400/40 text-purple-300",
    icon: "🎓",
  },
  {
    id: 4,
    title: "Faculty Node Cluster",
    tag: "Workload Orchestrator",
    value: "148 Active Mentors",
    detail: "Dynamic scheduling balance and research paper citation index.",
    gradient: "from-amber-500/20 via-orange-600/10 to-amber-950/30",
    border: "border-amber-500/40",
    accent: "text-amber-400",
    badgeBg: "bg-amber-950/80 border-amber-400/40 text-amber-300",
    icon: "🏛️",
  },
];

export default function DepthCarousel({ items = DEFAULT_METRICS }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full flex flex-col items-center select-none py-4">
      {/* 3D Perspective Stage */}
      <div
        className="relative w-full max-w-4xl h-72 flex items-center justify-center"
        style={{ perspective: "1100px" }}
      >
        {items.map((item, index) => {
          // Calculate relative position to activeIndex (-1, 0, 1, or hidden)
          let offset = index - activeIndex;
          if (offset < -1 && activeIndex === items.length - 1 && index === 0) {
            offset = 1;
          } else if (
            offset > 1 &&
            activeIndex === 0 &&
            index === items.length - 1
          ) {
            offset = -1;
          }

          const isActive = offset === 0;
          const isLeft = offset === -1;
          const isRight = offset === 1;
          const isHidden = Math.abs(offset) > 1;

          // 3D Depth transform styles
          let transformStyle = "translate3d(0, 0, -250px) scale(0.65)";
          let opacity = 0;
          let zIndex = 0;

          if (isActive) {
            transformStyle = "translate3d(0, 0, 0) scale(1) rotateY(0deg)";
            opacity = 1;
            zIndex = 20;
          } else if (isLeft) {
            transformStyle =
              "translate3d(-52%, 0, -140px) scale(0.85) rotateY(18deg)";
            opacity = 0.55;
            zIndex = 10;
          } else if (isRight) {
            transformStyle =
              "translate3d(52%, 0, -140px) scale(0.85) rotateY(-18deg)";
            opacity = 0.55;
            zIndex = 10;
          }

          return (
            <div
              key={item.id}
              onClick={() => setActiveIndex(index)}
              style={{
                transform: transformStyle,
                opacity,
                zIndex,
                transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
              className={`absolute w-full max-w-md p-6 rounded-3xl border bg-slate-900/90 backdrop-blur-2xl shadow-2xl cursor-pointer ${item.border} ${item.gradient} ${
                isHidden ? "pointer-events-none" : ""
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">{item.icon}</span>
                <span
                  className={`text-[10px] font-mono px-2.5 py-1 rounded-full border ${item.badgeBg}`}
                >
                  {item.tag}
                </span>
              </div>

              {/* Metric Value */}
              <p
                className={`text-2xl font-black tracking-tight mb-1 ${item.accent}`}
              >
                {item.value}
              </p>
              <h4 className="text-base font-bold text-white mb-2">
                {item.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {item.detail}
              </p>

              {/* Status Indicator */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>STATUS: VERIFIED</span>
                <span className="text-emerald-400">TELEMETRY ACTIVE</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Control Buttons & Indicators */}
      <div className="flex items-center gap-4 mt-2">
        <button
          onClick={prevSlide}
          className="h-9 w-9 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-200 transition cursor-pointer active:scale-95"
        >
          &larr;
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === i
                  ? "w-6 bg-cyan-400"
                  : "w-2 bg-slate-700 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="h-9 w-9 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-200 transition cursor-pointer active:scale-95"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}
