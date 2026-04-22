import React from "react";

export const DownloadButton = () => {
  return (
    <a 
      href="./Adeyemi_Divine_CV.pdf" // This looks in your public folder
      download="Adeyemi_Divine_CV.pdf"
      className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand text-void font-bold uppercase tracking-widest text-sm overflow-hidden transition-all duration-300 hover:bg-white"
    >
      {/* Button Text */}
      <span className="relative z-10 transition-colors duration-300">
        Download CV
      </span>

      {/* Download Icon SVG */}
      <svg 
        className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-y-1" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <path strokeLinecap="square" strokeLinejoin="miter" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    </a>
  );
};