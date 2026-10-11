import React, { useState, useRef } from "react";

export default function TiltGlowCard({
  children,
  className = "",
  glowColor = "rgba(99, 102, 241, 0.15)", // Subtle indigo glow
}) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    // Relative pointer coords
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    // Calculate rotation (-15 to 15 degrees)
    const cardWidth = rect.width;
    const cardHeight = rect.height;
    const rotateY = (x / cardWidth - 0.5) * 20;
    const rotateX = (y / cardHeight - 0.5) * -20;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: isHovered
          ? "none"
          : "transform 0.5s ease, box-shadow 0.5s ease",
      }}
      className={`group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-2xl cursor-pointer ${className}`}
    >
      {/* Interactive Laser Glow Trail */}
      {isHovered && (
        <div
          className="pointer-events-none absolute rounded-full blur-[80px]"
          style={{
            width: "300px",
            height: "300px",
            background: `radial-gradient(circle, ${glowColor} 0%, rgba(255,255,255,0) 70%)`,
            left: `${coords.x - 150}px`,
            top: `${coords.y - 150}px`,
            transform: "translate3d(0, 0, 0)",
            transition: "opacity 0.2s ease",
          }}
        />
      )}

      {/* Decorative Floating Sparkle Dots */}
      <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-60 transition-opacity duration-300">
        <svg
          className="w-5 h-5 text-indigo-500 animate-pulse"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3-4.8-2.5-4.8 2.5.9-5.3-3.8-3.7 5.3-.8z" />
        </svg>
      </div>

      {/* Glassy Overlay for 3D depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50/10 via-transparent to-pink-50/10 pointer-events-none rounded-2xl" />

      {/* Main Card Content */}
      <div className="relative z-10 transition-transform duration-300 group-hover:scale-[1.01] transform-gpu">
        {children}
      </div>
    </div>
  );
}
