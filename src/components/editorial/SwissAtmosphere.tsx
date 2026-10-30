"use client";

export default function SwissAtmosphere() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-background transition-colors duration-300"
    >
      {/* Horizon Warm Amber, Peach, and Pale Mineral Sky Wash (matching reference video atmosphere) */}
      <div className="absolute -bottom-[18%] -left-[8%] w-[58vw] h-[62vh] rounded-full bg-[#EB9478]/[0.26] dark:bg-[#EB9478]/[0.09] blur-[110px]" />
      <div className="absolute -bottom-[22%] left-[24%] w-[52vw] h-[56vh] rounded-full bg-[#B6D4E0]/[0.24] dark:bg-[#B6D4E0]/[0.07] blur-[115px]" />
      <div className="absolute -bottom-[16%] -right-[8%] w-[58vw] h-[66vh] rounded-full bg-[#E69E67]/[0.30] dark:bg-[#E69E67]/[0.11] blur-[110px]" />

      {/* Ultra-faint 6-column Swiss Architectural Grid */}
      <div className="max-w-[1600px] mx-auto h-full grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 px-4 sm:px-8">
        <div className="border-l border-r border-foreground/[0.045] h-full" />
        <div className="border-r border-foreground/[0.045] h-full" />
        <div className="hidden sm:block border-r border-foreground/[0.045] h-full" />
        <div className="hidden sm:block border-r border-foreground/[0.045] h-full" />
        <div className="hidden lg:block border-r border-foreground/[0.045] h-full" />
        <div className="hidden lg:block border-r border-foreground/[0.045] h-full" />
      </div>
    </div>
  );
}
