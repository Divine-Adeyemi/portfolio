// src/App.jsx
import React, { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  // The page mounts underneath the loader so it's fully ready when the curtain lifts
  const [revealed, setRevealed] = useState(false);
  const [loaderGone, setLoaderGone] = useState(false);

  // No scrolling behind the intro
  useEffect(() => {
    document.documentElement.style.overflow = loaderGone ? "" : "hidden";
    if (loaderGone) ScrollTrigger.refresh();
  }, [loaderGone]);

  return (
    <main className="bg-void text-primary">
      {!loaderGone && (
        <IntroLoader
          onReveal={() => setRevealed(true)}
          onComplete={() => setLoaderGone(true)}
        />
      )}

      {!window.matchMedia("(pointer: coarse)").matches && <CustomCursor />}
      <NavigationMenu />
      <ScrollProgress />
      <StarfieldBackground />

      <SmoothScroll>
        <div className="relative z-10">
          <HeroSection ready={revealed} />
          <AboutSection />
          <StackSection />
          <ExperienceSection />
          <ProjectsSection />
        </div>
      </SmoothScroll>
    </main>
  );
}
