import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  // Spotlight & 3D Tilt State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, px: 50, py: 50 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  // Decryption / Hacker cipher effect for the badge
  const [badgeText, setBadgeText] = useState(
    "UniFlow • Real-Time Telemetry & Isolation",
  );
  const targetBadge = "UniFlow • Real-Time Telemetry & Isolation";
  const charset = "ABCDEF0123456789_#@*&%!";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setBadgeText(
        targetBadge
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return targetBadge[index];
            }
            if (
              letter === " " ||
              letter === "•" ||
              letter === "&" ||
              letter === "-"
            )
              return letter;
            return charset[Math.floor(Math.random() * charset.length)];
          })
          .join(""),
      );

      if (iteration >= targetBadge.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Percentage for spotlight
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;

    // 3D rotation angle
    const rx = -((y - rect.height / 2) / rect.height) * 10;
    const ry = ((x - rect.width / 2) / rect.width) * 10;

    setMousePos({ x, y, px, py });
    setTilt({ rx, ry });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    setMousePos({ x: 0, y: 0, px: 50, py: 50 });
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#04060f] text-slate-100 select-none px-4 py-8">
      {/* Dynamic Background Aurora Grids */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Pulsing colored energy fields */}
        <div className="absolute -top-36 -left-36 w-[36rem] h-[36rem] bg-emerald-500/15 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute -bottom-36 -right-36 w-[36rem] h-[36rem] bg-indigo-600/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[46rem] h-[46rem] bg-cyan-500/10 rounded-full blur-[170px]" />

        {/* High-tech Perspective Mesh Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      {/* Main Spotlight Tilt Card Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: "transform 0.14s ease-out, box-shadow 0.3s ease",
          boxShadow: `0 30px 80px -20px rgba(0, 0, 0, 0.95)`,
        }}
        className="relative z-10 max-w-4xl w-full mx-auto bg-slate-900/80 backdrop-blur-3xl border border-slate-700/60 rounded-3xl p-8 sm:p-14 text-center overflow-hidden group"
      >
        {/* 1. Interactive Spotlight Flashlight Glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(650px circle at ${mousePos.px}% ${mousePos.py}%, rgba(56, 189, 248, 0.12), transparent 45%)`,
          }}
        />

        {/* 2. Top Pill with Decryption Matrix Animation */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-mono font-medium mb-6 shadow-md transition-all duration-300 hover:border-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{badgeText}</span>
        </div>

        {/* 3. Hero Headline with Dynamic Gradient Glow */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-5 text-white">
          Unifying Higher Education <br />
          Through{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(45,212,191,0.35)] animate-pulse">
            Real-Time
          </span>{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(192,132,252,0.35)]">
            Intelligence
          </span>
        </h1>

        {/* 4. Subtitle Description */}
        <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base mb-9 leading-relaxed font-normal">
          Orchestrate administrators, faculty mentors, and students with
          end-to-end data pipelines, row-level security, and sub-second
          campus-wide telemetry powered by UniFlow.
        </p>

        {/* 5. Interactive Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-11">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-teal-500/25 cursor-pointer transform hover:-translate-y-0.5 active:scale-95"
          >
            <span>Launch Institutional Portal</span>
            <span className="text-base leading-none">&rarr;</span>
          </button>
          <button
            onClick={() => navigate("/admin")}
            className="px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 hover:border-slate-500 text-slate-200 text-xs uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer"
          >
            Access Role Demo
          </button>
        </div>

        {/* 6. Live Telemetry Feature Badges with Hover Glow */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-left">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/90 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/50 hover:bg-slate-950/90 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/10">
            <p className="text-xs font-bold text-emerald-400 flex items-center gap-2">
              <span className="text-sm">🛡️</span> PostgreSQL RLS
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Strict Multi-Tenant Isolation
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/90 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-950/90 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10">
            <p className="text-xs font-bold text-sky-400 flex items-center gap-2">
              <span className="text-sm">🎓</span> GPA Verification
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Automated Grade Ledger
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/90 backdrop-blur-md transition-all duration-300 hover:border-purple-500/50 hover:bg-slate-950/90 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10">
            <p className="text-xs font-bold text-purple-400 flex items-center gap-2">
              <span className="text-sm">⚡</span> Live Telemetry
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Sub-second Sync Across Campus
            </p>
          </div>
        </div>
      </div>

      {/* Global Shortcut Hint */}
      <div className="absolute bottom-4 text-center w-full text-[11px] font-mono text-slate-400 pointer-events-none">
        Press{" "}
        <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-bold">
          ENTER ↵
        </span>{" "}
        to cycle views
      </div>
    </div>
  );
}
