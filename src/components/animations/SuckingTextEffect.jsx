import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const SuckingTextEffect = ({ children }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Create a context to manage all animations
        const ctx = gsap.context(() => {
            
            gsap.to(containerRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 20%",     // Start animation when element reaches 20% from top
                    end: "bottom top",    // End animation when element leaves viewport
                    scrub: 1,             // Smooth animation tied to scroll
                },
                y: -150,                // Move up
                scale: 0.8,             // Make smaller
                opacity: 0,             // Fade out
                filter: "blur(12px)",   // Add blur effect
                ease: "none"            // No easing for scroll animations
            });

        });

        // Clean up animations when component unmounts
        return () => ctx.revert(); 
    }, []);

    return (
        <div 
            ref={containerRef} 
            className="origin-top inline-block" 
            style={{ willChange: "transform, opacity, filter" }}
        >
            {children}
        </div>
    );
};
