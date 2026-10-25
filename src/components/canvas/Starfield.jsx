import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useThemeTransitioning } from "../../hooks/useTheme";

// Rotating stars animation component
const RotatingStars = () => {
  const groupRef = useRef(null);

  // Update rotation every frame
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotate stars smoothly using delta time for consistent speed
      groupRef.current.rotation.y -= delta * 0.05;
      groupRef.current.rotation.x -= delta * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Stars component with custom settings */}
      <Stars 
        radius={50} 
        depth={100} 
        count={500} 
        factor={5} 
        saturation={1}
        fade 
        speed={0.5} 
      />
    </group>
  );
};

// Main starfield background. In light mode the same stars are drawn black via a CSS filter
const isTouch = window.matchMedia("(pointer: coarse)").matches;

export const StarfieldBackground = () => {
  const busy = useThemeTransitioning();

  return (
    // Fixed background that doesn't block clicks
    <div className="fixed inset-0 z-0 pointer-events-none bg-void">
      <Canvas
        className="light:[filter:brightness(0)]"
        frameloop={busy ? "never" : "always"}
        camera={{ position: [0, 0, 1] }}
        dpr={[1, isTouch ? 1.25 : 2]}
      >
        <RotatingStars />
      </Canvas>
    </div>
  );
};
