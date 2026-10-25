// src/App.jsx
import React, { useState } from "react";

// 1. Layout & Architecture
import { NavigationMenu } from "./components/layout/NavigationMenu";
import { StarfieldBackground } from "./components/canvas/Starfield";

// 2. Animations
import { IntroLoader } from "./components/animations/IntroLoader";
import { SmoothScroll } from "./components/animations/SmoothScroll";

// 3. Page Sections
import { HeroSection } from "./sections/HeroSection";
import { AboutSection } from "./sections/AboutSection";
import { StackSection } from "./sections/StackSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { ProjectsSection } from "./sections/ProjectsSection";

// 4. UI
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { CustomCursor } from "./components/ui/CustomCursor";
export default function App() {
  // Global state to hold the UI until the GSAP staircase finishes
  const [isLoaded, setIsLoaded] = useState(false);

 
return (
  <main className="bg-void text-primary">
    {!isLoaded && <IntroLoader onComplete={() => setIsLoaded(true)} />}

    {isLoaded && (
      <>
        {!window.matchMedia("(pointer: coarse)").matches && <CustomCursor />}
        <NavigationMenu />
        <ScrollProgress /> 
        <StarfieldBackground />
        
        <SmoothScroll>
          <div className="relative z-10">
            <HeroSection />
            <AboutSection />
            <StackSection />
            <ExperienceSection />
            <ProjectsSection />
          </div>
        </SmoothScroll>
      </>
    )}
  </main>
);
}