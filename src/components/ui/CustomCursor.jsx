import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;

      // The dot is instant
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0,
      });

      // The circle has a "trailing" delay for that premium feel
      gsap.to(follower, {
        x: clientX,
        y: clientY,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    const onMouseEnterLink = () => {
      gsap.to(follower, {
        scale: 2.5,
        backgroundColor: "rgba(34, 197, 94, 0.1)", // brand color with low opacity
        borderColor: "rgba(34, 197, 94, 1)",
        duration: 0.3,
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(follower, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(255, 255, 255, 0.2)",
        duration: 0.3,
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    // Attach listeners to all links and buttons
    const links = document.querySelectorAll("a, button");
    links.forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnterLink);
      link.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", onMouseEnterLink);
        link.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      {/* The tiny center dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-brand rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      />
      {/* The outer following circle */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-white/20 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
};