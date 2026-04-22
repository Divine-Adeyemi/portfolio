import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const ScrollProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    gsap.to(barRef.current, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3, // Makes the bar grow smoothly as you scroll
      },
    });
  }, []);


};