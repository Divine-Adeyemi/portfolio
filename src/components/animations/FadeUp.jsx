import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const FadeUp = ({ children, delay = 0, stagger = 0 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // We animate the children inside the container
      const elements = containerRef.current.children;

      gsap.fromTo(elements, 
        { 
          y: 40, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: delay,
          stagger: stagger, // Allows cascading animations if multiple items are inside
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%", // Triggers when the top of the element is 15% above the bottom of the screen
            toggleActions: "play none none reverse" // Plays on enter, reverses if scrolled all the way back up
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