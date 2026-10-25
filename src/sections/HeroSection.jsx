import React, { useEffect } from "react"
import gsap from "gsap";
import { SuckingTextEffect } from "../components/animations/SuckingTextEffect";
import { FadeUp } from "../components/animations/FadeUp";
import { StylishSpinner } from "../components/ui/StylishSpinner";
import { DownloadButton } from "../components/ui/DownloadButton";

export const HeroSection = ({ ready }) => {
    // Entrance: hero elements rise in one after another once the intro curtain lifts
    useEffect(() => {
        if (!ready) return;
        const tween = gsap.fromTo(
            ".hero-reveal",
            { y: 36, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.8, stagger: 0.14, ease: "power3.out", clearProps: "transform" }
        );
        return () => tween.kill();
    }, [ready]);

    return (
        <section id="home" className="relative min-h-svh flex flex-col justify-center z-10">

            <div className="max-w-7xl mx-auto px-8 w-full flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16">

                {/* Left content area */}
                <div className="flex-1 w-full relative z-20">

                    {/* Text animation for heading */}
                    <SuckingTextEffect>
                     <h1 className="hero-reveal opacity-0 font-display text-3xl md:text-4xl lg:text-[4rem] font-bold uppercase leading-[0.8] tracking-tighter m">
                            <span className="block text-accent">Frontend</span>
                            <span className="block text-primary p-5">Developer</span>
                        </h1>
                    </SuckingTextEffect>

                    {/* About section with buttons */}
                    <div className="max-w-md">
                        <p className="hero-reveal opacity-0 font-body text-lg md:text-xl text-secondary max-w-lg leading-relaxed">
                            Hi I'm <strong className="text-accent">DIVINE</strong>. A creative Frontend Developer...
                        </p>

                        {/* Two action buttons */}
                        <div className="hero-reveal opacity-0 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-10">
                            {/* Contact button */}
                            <a
                                href="mailto:divineadevemi2006@gmail.com"
                                className="inline-flex items-center justify-center bg-brand text-black px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-primary hover:text-void transition-colors duration-300"
                            >
                                Let's Talk
                            </a>

                            {/* Download CV button */}
                            <DownloadButton />
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};
