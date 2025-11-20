"use client";

export function BackgroundEffects() {
  return (
    <>
      {/* Gradient Mesh Background */}
      <div className="gradient-mesh" />

      {/* Dot Pattern Overlay */}
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Orb 1 - Top Right */}
        <div
          className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-20 floating-orb"
          style={{
            background: 'radial-gradient(circle, rgba(217, 119, 6, 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />

        {/* Orb 2 - Bottom Left */}
        <div
          className="absolute bottom-32 left-10 w-80 h-80 rounded-full opacity-20 floating-orb-slow"
          style={{
            background: 'radial-gradient(circle, rgba(234, 88, 12, 0.25) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />

        {/* Orb 3 - Center */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 floating-orb-delay"
          style={{
            background: 'radial-gradient(circle, rgba(5, 150, 105, 0.2) 0%, transparent 70%)',
            filter: 'blur(80px)'
          }}
        />
      </div>
    </>
  );
}
