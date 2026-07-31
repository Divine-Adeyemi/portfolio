import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const FadeUp = ({ children, delay = 0, stagger = 0 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        const elements = containerRef.current.children;

        gsap.fromTo(elements, 
        { 
            y: 60, 
            opacity: 0 
        },
        {
            y: 0,
            opacity: 1,
            duration: 1.2,
            delay: delay,
            stagger: stagger,
            ease: "expo.out",
            force3D: true, // Forces hardware acceleration for smoother animation
            scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
            }
        }
        );
    });
    return () => ctx.revert();
  }, [delay, stagger]);

  return (
    <div ref={containerRef} style={{ willChange: "transform, opacity" }}>
      {children}
    </div>
  );
};