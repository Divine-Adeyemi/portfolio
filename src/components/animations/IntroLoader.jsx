import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export const IntroLoader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    // Reset scroll to top
    window.scrollTo(0, 0);

    // 1. SET: Ensure text starts completely hidden below the window
    gsap.set(textRef.current, { yPercent: 110 }); 

    tl.to(textRef.current, {
        yPercent: 0,              // STAGE 1: Come from the darkness (Slide Up)
        duration: 1.2,
        ease: "expo.out",
        delay: 0.5,
      })
      .to(textRef.current, {
        yPercent: -110,           // STAGE 2: Slide up again (Exit)
        duration: 1,
        ease: "expo.in",
        delay: 0.5,               // STAGE 3: STAY (The pause in the middle)
      })
      .to(loaderRef.current, {
        y: "-100%",               // FINAL: The curtain slides up
        duration: 0.5,
        ease: "expo.inOut",
      }, "-=0.2");                // Start slightly before the text finishes
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[200] bg-[#050505] flex items-center justify-center overflow-hidden"
    >
      {/* The 'Window' (Mask) */}
      <div className="overflow-hidden py-2 px-4 flex items-center justify-center">
        <h1
          ref={textRef}
          className="text-white text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-none"
        >
          DIVINE
        </h1>
      </div>
    </div>
  );
};