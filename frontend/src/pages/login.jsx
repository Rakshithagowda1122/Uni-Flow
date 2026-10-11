import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PASS_DATA = {
  student: {
    tab: "Scholar Ticket",
    category: "STUDENT GATE ACCESS",
    seat: "STU-04A",
    gate: "GATE 3B",
    zone: "ZONE 1",
    name: "Rohan Varma",
    initials: "RV",
    program: "B.Tech Spacecraft & Robotics",
    dept: "Dept. of Aerospace Engineering",
    ticketNo: "UF-TKT-ISRO-994",
    campus: "UniFlow Central Institute of Technology",
    email: "rohan.varma@cit.uniflow.ac.in",
    kpi1: "CGPA: 9.71 / 10",
    kpi2: "Attendance: 97.4%",
    barcodeText: "*UF-STU-2026-994*",
    accent: "from-cyan-400 via-teal-300 to-blue-500",
    themeColor: "#06b6d4",
    glow: "rgba(6, 182, 212, 0.4)",
    badgeBg: "bg-cyan-950/80 text-cyan-300 border-cyan-400/40",
    targetPath: "/student",
  },
  faculty: {
    tab: "Faculty Ticket",
    category: "RESEARCH FELLOW PASS",
    seat: "FAC-01F",
    gate: "LAB 7A",
    zone: "ZONE VIP",
    name: "Prof. Nandita Krishnan",
    initials: "NK",
    program: "Director, Center for Neural Systems",
    dept: "Dept. of Cognitive Robotics",
    ticketNo: "UF-TKT-NEURO-204",
    campus: "UniFlow Central Institute of Technology",
    email: "nandita.k@cit.uniflow.ac.in",
    kpi1: "Research Citations: 3,120+",
    kpi2: "Senior Tenured Chair",
    barcodeText: "*UF-FAC-2026-204*",
    accent: "from-fuchsia-400 via-purple-400 to-indigo-500",
    themeColor: "#c084fc",
    glow: "rgba(192, 132, 252, 0.4)",
    badgeBg: "bg-purple-950/80 text-purple-300 border-purple-400/40",
    targetPath: "/faculty",
  },
  admin: {
    tab: "Registrar Ticket",
    category: "CAMPUS ROOT ACCESS",
    seat: "ADM-000",
    gate: "MAIN SENATE",
    zone: "ALL ACCESS",
    name: "Dr. K. S. Rajagopalan",
    initials: "KR",
    program: "Chief Controller of Admissions",
    dept: "Office of Academic Governance",
    ticketNo: "UF-TKT-ROOT-001",
    campus: "UniFlow Central Institute of Technology",
    email: "admissions.head@cit.uniflow.ac.in",
    kpi1: "32 Academic Colleges",
    kpi2: "Root Level 0 Clearance",
    barcodeText: "*UF-ROOT-2026-001*",
    accent: "from-amber-400 via-orange-400 to-rose-500",
    themeColor: "#fbbf24",
    glow: "rgba(251, 191, 36, 0.4)",
    badgeBg: "bg-amber-950/80 text-amber-300 border-amber-400/40",
    targetPath: "/admin",
  },
};

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [passkey, setPasskey] = useState("••••••••••••••••");
  const [isTorn, setIsTorn] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const active = PASS_DATA[role];

  // Trigger Ticket Tear Animation & Route Navigation
  const handleTearTicket = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setIsTorn(true);

    setTimeout(() => {
      navigate(active.targetPath);
    }, 750);
  };

  const handleRoleChange = (key) => {
    setIsTorn(false);
    setIsProcessing(false);
    setRole(key);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#050711] text-slate-100 select-none px-4 sm:px-8 py-6">
      {/* Background Animated Atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-36 left-1/4 w-[38rem] h-[38rem] rounded-full blur-[150px] transition-all duration-700 opacity-25"
          style={{ background: active.themeColor }}
        />
        <div className="absolute -bottom-36 right-1/4 w-[34rem] h-[34rem] bg-indigo-900/30 rounded-full blur-[150px]" />

        {/* Subtle Cyber Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(#ffffff 1.2px, transparent 1.2px)",
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      {/* Main Container */}
      <main className="relative z-10 mx-auto my-auto flex w-full max-w-6xl flex-col items-center justify-center gap-10 lg:flex-row lg:items-center">
        {/* Left Side: Gate Auth Console */}
        <div className="w-full max-w-lg rounded-3xl border border-slate-800/90 bg-[#090d1c]/85 p-8 sm:p-9 shadow-2xl backdrop-blur-3xl transition-all duration-300">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between border-b border-slate-800/80 pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-700 border border-slate-600/50 shadow-inner">
                <span className="text-xl font-black bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                  🎫
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black tracking-tight text-white">
                    UNIFLOW
                  </h1>
                  <span className="rounded-full bg-slate-800/90 px-2 py-0.5 text-[10px] font-mono text-cyan-400 border border-cyan-400/20">
                    AIRPORT GATE PASS
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Autonomous Campus Boarding Terminal
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                GATE OPEN
              </span>
              <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                READY FOR TEAR
              </span>
            </div>
          </div>

          {/* Ticket Type Switcher Tabs */}
          <div className="mb-6 grid grid-cols-3 gap-1.5 rounded-2xl bg-[#060813] p-1.5 border border-slate-800/90">
            {Object.keys(PASS_DATA).map((key) => {
              const item = PASS_DATA[key];
              const isSelected = role === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleRoleChange(key)}
                  className={`py-2 text-xs font-bold rounded-xl transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? `bg-slate-800 text-white shadow-md border border-slate-700`
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {item.tab}
                </button>
              );
            })}
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTearTicket();
            }}
            className="space-y-4"
          >
            <div>
              <label className="mb-1.5 flex justify-between text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <span>Boarding Terminal Campus</span>
                <span className="font-mono text-emerald-400 text-[10px]">
                  Verified Origin
                </span>
              </label>
              <input
                type="text"
                readOnly
                value={active.campus}
                className="w-full rounded-xl border border-slate-800 bg-[#060813]/90 py-2.5 px-3.5 text-xs text-slate-300 font-medium focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 flex justify-between text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <span>Passholder Identity</span>
                <span className="font-mono text-cyan-400 text-[10px]">
                  Active Boarding UID
                </span>
              </label>
              <input
                type="email"
                readOnly
                value={active.email}
                className="w-full rounded-xl border border-slate-800 bg-[#060813]/90 py-2.5 px-3.5 text-xs font-mono text-cyan-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 flex justify-between text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <span>Gate Authentication Token</span>
                <span className="font-mono text-slate-500 text-[10px]">
                  Hardware Token
                </span>
              </label>
              <input
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-[#060813]/90 py-2.5 px-3.5 text-xs text-slate-200 tracking-wider focus:outline-none"
              />
            </div>

            {/* Launch Tear Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r ${active.accent} text-slate-950 font-black text-xs uppercase tracking-widest shadow-xl transition-all duration-300 hover:brightness-110 active:scale-95 cursor-pointer flex items-center justify-center gap-2`}
              style={{ boxShadow: `0 10px 25px -5px ${active.glow}` }}
            >
              <span>
                {isProcessing
                  ? "Tearing Ticket & Validating..."
                  : `Tear Ticket to Enter ${active.name.split(" ")[0]}'s Portal`}
              </span>
              <span className="text-base leading-none">✂️</span>
            </button>
          </form>

          {/* Telemetry Footer */}
          <div className="mt-6 flex justify-between items-center text-[11px] text-slate-400 border-t border-slate-800/80 pt-4 font-mono">
            <span>
              Route: <strong className="text-emerald-400">200 OK</strong>
            </span>
            <span>
              Security:{" "}
              <strong className="text-cyan-400">PostgreSQL Multi-RLS</strong>
            </span>
          </div>
        </div>

        {/* Right Side: DIGITAL TEAR-OFF TICKET PASS */}
        <div className="relative flex flex-col items-center">
          {/* Main Ticket Shell */}
          <div
            className="relative w-84 rounded-3xl bg-[#0a0f24] border border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-500"
            style={{ boxShadow: `0 20px 50px -10px ${active.glow}` }}
          >
            {/* --- TOP TICKET SECTION (BOARDING DETAILS) --- */}
            <div className="p-6 bg-gradient-to-b from-[#0f1738] to-[#0a0f24]">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-3 mb-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 block uppercase">
                    Boarding Pass
                  </span>
                  <span className="text-xs font-black text-white tracking-wider">
                    UNIFLOW PASS
                  </span>
                </div>
                <span
                  className={`text-[9px] font-mono px-2 py-0.5 rounded-md border font-black ${active.badgeBg}`}
                >
                  {active.category}
                </span>
              </div>

              {/* Boarding Gate Matrix */}
              <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-black/40 border border-slate-800/80 mb-4 text-center font-mono">
                <div>
                  <p className="text-[9px] text-slate-400">GATE</p>
                  <p className="text-xs font-bold text-emerald-400">
                    {active.gate}
                  </p>
                </div>
                <div className="border-x border-slate-800">
                  <p className="text-[9px] text-slate-400">ZONE</p>
                  <p className="text-xs font-bold text-sky-400">
                    {active.zone}
                  </p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400">SEAT</p>
                  <p className="text-xs font-bold text-cyan-300">
                    {active.seat}
                  </p>
                </div>
              </div>

              {/* Avatar & Person Details */}
              <div className="flex items-center gap-3.5 mb-4">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${active.accent} flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shrink-0`}
                >
                  {active.initials}
                </div>
                <div className="overflow-hidden">
                  <h3 className="truncate text-base font-bold text-white tracking-tight">
                    {active.name}
                  </h3>
                  <p className="truncate text-xs text-slate-300">
                    {active.program}
                  </p>
                  <p className="truncate text-[10px] text-slate-400">
                    {active.dept}
                  </p>
                </div>
              </div>

              {/* KPIs */}
              <div className="flex justify-between items-center text-[11px] font-mono text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                <span>{active.kpi1}</span>
                <span className="text-emerald-400">{active.kpi2}</span>
              </div>
            </div>

            {/* --- REALISTIC PERFORATED TEAR-LINE (WITH CIRCULAR HOLE-PUNCH CUTOUTS) --- */}
            <div className="relative flex items-center justify-between my-0 bg-[#0a0f24] h-7 overflow-visible">
              {/* Left Cutout Circle */}
              <div className="w-6 h-6 rounded-full bg-[#050711] -ml-3 border-r border-slate-800 shadow-inner" />

              {/* Dashed Tear Line */}
              <div className="flex-1 border-b-2 border-dashed border-slate-600/80 mx-2 relative flex justify-center items-center">
                <span className="absolute bg-[#0a0f24] px-2 text-[9px] font-mono text-slate-400 tracking-widest flex items-center gap-1">
                  <span>✂</span> TEAR HERE TO VALIDATE
                </span>
              </div>

              {/* Right Cutout Circle */}
              <div className="w-6 h-6 rounded-full bg-[#050711] -mr-3 border-l border-slate-800 shadow-inner" />
            </div>

            {/* --- BOTTOM TICKET STUB (TEARS AWAY ON CLICK) --- */}
            <div
              onClick={handleTearTicket}
              style={{
                transform: isTorn
                  ? "translateY(120px) rotate(14deg) scale(0.92)"
                  : "translateY(0px) rotate(0deg) scale(1)",
                opacity: isTorn ? 0 : 1,
                transition:
                  "transform 0.65s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.55s ease",
              }}
              className="p-5 bg-gradient-to-b from-[#0c122c] to-[#070b18] cursor-pointer hover:bg-[#0f1738] transition-colors group"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
                <span>
                  PASS STUB:{" "}
                  <strong className="text-slate-200">{active.ticketNo}</strong>
                </span>
                <span className="text-emerald-400 font-bold group-hover:scale-110 transition-transform">
                  CLICK TO TEAR ✂
                </span>
              </div>

              {/* Realistic SVG Barcode Graphic */}
              <div className="p-2.5 rounded-lg bg-black/60 border border-slate-800 flex flex-col items-center justify-center">
                <div className="h-9 w-full flex items-center justify-between px-1">
                  {[
                    4, 2, 6, 1, 5, 3, 2, 7, 1, 4, 3, 6, 2, 5, 1, 3, 6, 2, 4, 1,
                    5, 3, 2, 7, 2, 4, 6,
                  ].map((w, i) => (
                    <div
                      key={i}
                      className="bg-slate-200 h-full"
                      style={{
                        width: `${w}px`,
                        opacity: i % 2 === 0 ? 0.95 : 0.65,
                      }}
                    />
                  ))}
                </div>
                <span className="mt-1 text-[9px] font-mono text-slate-400 tracking-widest">
                  {active.barcodeText}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  BOARDING READY
                </span>
                <span>RLS VERIFIED</span>
              </div>
            </div>
          </div>

          <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
            <span className="text-cyan-400">✂️</span> Click the lower stub or
            launch button to play the tear animation
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex flex-wrap items-center justify-between border-t border-slate-800/60 pt-4 text-[11px] text-slate-400">
        <div>
          <span className="font-bold text-slate-200 tracking-wider">
            UNIFLOW CORE
          </span>{" "}
          &bull; Full-Stack Campus Mesh
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="hover:text-cyan-400 transition cursor-pointer font-medium"
          >
            &larr; Return to Landing
          </button>
          <span className="font-mono text-slate-400">TERMINAL: READY</span>
        </div>
      </footer>
    </div>
  );
}
