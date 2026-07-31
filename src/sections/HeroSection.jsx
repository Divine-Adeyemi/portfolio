import React from "react"
import { SuckingTextEffect } from "../components/animations/SuckingTextEffect";
import { CAREER_STATS } from "../data/constants";
import { FadeUp } from "../components/animations/FadeUp";
import { StylishSpinner } from "../components/ui/StylishSpinner";
import { DownloadButton } from "../components/ui/DownloadButton";

export const HeroSection = () => {
    return (
        <section id="home" className="relative min-h-screen flex flex-col justify-center z-10">

            <div className="max-w-7xl mx-auto px-8 w-full flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16">

                {/* Left content area */}
                <div className="flex-1 w-full relative z-20">

                    {/* Text animation for heading */}
                    <SuckingTextEffect>
                     <h1 className="font-display text-3xl md:text-4xl lg:text-[4rem] font-bold uppercase leading-[0.8] tracking-tighter m">
                            <span className="block text-brand">Frontend</span>
                            <span className="block text-white p-5">Developer</span>
                        </h1>
                    </SuckingTextEffect>

                    {/* About section with buttons */}
                    <div className="max-w-md">
                        <p className="font-body text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed">
                            Hi I'm <strong className="text-brand">DIVINE</strong>. A creative Frontend Developer...
                        </p>

                        {/* Two action buttons */}
                        <div className="flex flex-wrap items-center gap-6 mt-10">
                            {/* Contact button */}
                            <a
                                href="mailto:divineadevemi2006@gmail.com"
                                className="inline-flex items-center justify-center bg-brand text-black px-8 py-4 font-bold tracking-widest uppercase hover:bg-white transition-colors duration-300"
                            >
                                Hire Me
                            </a>

                            {/* Download CV button */}
                            <DownloadButton />
                        </div>

                    </div>
                </div>

                {/* Stats section - vertical on desktop, horizontal on mobile */}
                <div className="flex flex-row lg:flex-col gap-8 lg:gap-16 w-full lg:w-auto overflow-x-auto pb-4 lg:pb-0 z-20">
                    {CAREER_STATS.map((stat, index) => (
                        <div key={index} className="flex flex-col flex-shrink-0">
                            <span className="text-4xl md:text-5xl font-black text-brand mb-2">
                                {stat.value}
                            </span>
                            <span className="text-sm text-gray-500 tracking-widest uppercase whitespace-nowrap">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};
