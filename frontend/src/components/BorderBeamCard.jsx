import React from "react";

export default function BorderBeamCard({
  children,
  className = "",
  accentColor = "from-teal-400 via-cyan-500 to-indigo-500",
  active = false,
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${className}`}
    >
      {/* Animated Border Glow for active/urgent items */}
      {active && (
        <>
          <div className="pointer-events-none absolute -inset-[2px] rounded-2xl overflow-hidden z-0">
            <div className="absolute inset-[-150%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_300deg,#06b6d4_360deg)] opacity-70" />
          </div>
          {/* Inner card background to keep content readable over the glow */}
          <div className="absolute inset-[1px] rounded-[15px] bg-white z-[1]" />
        </>
      )}

      {/* Subtle top indicator bar */}
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accentColor} opacity-80 z-10`}
      />

      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
