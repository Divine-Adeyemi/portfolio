import React from "react";
import { FadeUp } from "../components/animations/FadeUp";

// Spinning star icon
const Star = () => (
    <span className="inline-block animate-[spin_4s_linear_infinite] text-brand text-xl font-bold">
        *
    </span>
);

export const AboutSection = () => {
    return (
        <section id="about-me" className="relative py-24 md:py-32 z-10">
            <div className="max-w-7xl mx-auto px-8 w-full">
                
                {/* Main philosophy statement */}
                <div className="grid grid-cols-1 lg:grid-cols-12 mb-10">
                    <div className="lg:col-span-12">
                        <FadeUp>
                            <h3 className="text-xl md:text-3xl lg:text-3xl font-display font-light text-primary leading-tight tracking-tighter">
                                I believe in a user centered design approach, ensuring that every project I work on is tailored to meet the specific needs of its users.
                            </h3>
                        </FadeUp>
                    </div>
                </div>

                {/* Section label with star */}
                <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-3 flex flex-col items-start gap-2 mb-2">
                        <Star />
                        <h2 className="text-[20px] tracking-tight text-secondary uppercase font-medium">
                            This is me.
                        </h2>
                    </div>
                </div>

                {/* Bio content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-white/10 pt-12">
                    
                    {/* Name and description in two columns */}
                    <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-10">
                        
                        {/* Left: Name  */}
                        <div className="flex flex-col items-start gap-5">
                            <FadeUp delay={0.3}>
                                <h4 className="text-5xl md:text-6xl font-display font-bold text-primary tracking-tighter leading-none">
                                    Hi, I'm <span className="text-brand">Divine.</span>
                                </h4>
                            </FadeUp>
                        </div>

                        {/* Right: Bio */}
                        <div className="flex flex-col items-start gap-8">
                            <Star />
                            <FadeUp delay={0.4}>
                                <div className="flex flex-col gap-6">
                                    <p className="text-lg text-secondary leading-relaxed font-body">
                                        I'm a frontend web developer dedicated to turning ideas into creative solutions. I specialize in creating seamless and intuitive user experiences.
                                    </p>
                                    <p className="text-lg text-secondary leading-relaxed font-body">
                                        My approach focuses on creating scalable, high-performing solutions tailored to both user needs and business objectives. By prioritizing performance, accessibility, and responsiveness, I strive to deliver experiences that not only engage users but also drive tangible results.
                                    </p>
                                </div>
                            </FadeUp>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};
