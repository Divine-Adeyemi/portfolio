import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

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
        factor={4} 
        saturation={1}
        fade 
        speed={0.5} 
      />
    </group>
  );
};

// Main starfield background component
export const StarfieldBackground = () => {
  return (
    // Fixed background that doesn't block clicks
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 2]}
      >
        <RotatingStars />
      </Canvas>
    </div>
  );
};
