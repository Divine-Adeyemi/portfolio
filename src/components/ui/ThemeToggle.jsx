import React, { useRef } from "react";
import gsap from "gsap";
import { setTheme, useTheme } from "../../hooks/useTheme";

const RAYS = [0, 45, 90, 135, 180, 225, 270, 315];
const MAX_PULL = 56;
const TRIGGER = 24;
const EASE = "0.6s cubic-bezier(0.76, 0, 0.24, 1)";

// A pull cord hanging from the top edge. Tug it (drag, click or Enter) to flip the theme;
// the new theme spreads out from the bead.
export const ThemeToggle = () => {
  const isLight = useTheme() === "light";
  const beadRef = useRef(null);
  const lineRef = useRef(null);
  const state = useRef({ pull: 0, sway: 0 });
  const drag = useRef({ active: false, startY: 0 });

  const render = () => {
    const { pull, sway } = state.current;
    gsap.set(beadRef.current, { y: pull, x: sway });
    const base = lineRef.current.offsetHeight || 1;
    gsap.set(lineRef.current, { scaleY: (base + pull) / base, x: sway / 2 });
  };

  const flip = () => {
    const rect = beadRef.current.getBoundingClientRect();
    setTheme(isLight ? "dark" : "light", {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

  const release = () => {
    gsap.killTweensOf(state.current);
    state.current.sway = (Math.random() < 0.5 ? -1 : 1) * 5;
    gsap.to(state.current, {
      pull: 0,
      sway: 0,
      duration: 1.4,
      ease: "elastic.out(1, 0.3)",
      onUpdate: render,
    });
  };

  const tug = () => {
    gsap.killTweensOf(state.current);
    gsap.to(state.current, {
      pull: 40,
      duration: 0.14,
      ease: "power2.out",
      onUpdate: render,
      onComplete: () => {
        flip();
        release();
      },
    });
  };

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    gsap.killTweensOf(state.current);
    drag.current = { active: true, startY: e.clientY, moved: false };
  };

  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    const dy = e.clientY - drag.current.startY;
    if (Math.abs(dy) > 4) drag.current.moved = true;
    // rubber-band: pulling gets harder the further you go
    state.current.pull = Math.min(MAX_PULL, Math.max(0, dy) * 0.8);
    render();
  };

  const onPointerUp = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    if (!drag.current.moved) return tug();
    if (state.current.pull >= TRIGGER) flip();
    release();
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      tug();
    }
  };

  return (
    <div className="fixed top-0 right-24 z-[115] w-10 flex flex-col items-center pointer-events-none">
      <div ref={lineRef} className="w-px h-8 bg-primary/40 origin-top will-change-transform" />
      <button
        ref={beadRef}
        aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        className="pointer-events-auto touch-none select-none w-9 h-9 -mt-px rounded-full border border-primary/30 bg-void/80 backdrop-blur-sm text-primary hover:text-accent hover:border-accent transition-colors flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        {/* Sun and moon are one shape: a cutout circle slides across the disc */}
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 pointer-events-none"
          style={{ transform: `rotate(${isLight ? 90 : 0}deg)`, transition: `transform ${EASE}` }}
        >
          <mask id="theme-moon-cut">
            <rect width="24" height="24" fill="#fff" />
            <circle
              fill="#000"
              r="6"
              style={{
                cx: isLight ? 30 : 17,
                cy: isLight ? 0 : 7,
                transition: `cx ${EASE}, cy ${EASE}`,
              }}
            />
          </mask>
          <circle
            cx="12"
            cy="12"
            fill="currentColor"
            mask="url(#theme-moon-cut)"
            style={{ r: isLight ? 5 : 9, transition: `r ${EASE}` }}
          />
          <g
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            style={{ opacity: isLight ? 1 : 0, transition: `opacity ${EASE}` }}
          >
            {RAYS.map((deg) => (
              <line key={deg} x1="12" y1="2" x2="12" y2="4.2" transform={`rotate(${deg} 12 12)`} />
            ))}
          </g>
        </svg>
      </button>
    </div>
  );
};
