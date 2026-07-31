import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STACK } from "../data/constants"; 
import { StylishSpinner } from "../components/ui/StylishSpinner";

gsap.registerPlugin(ScrollTrigger);

export const StackSection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            
            // Animate each row of tech items as they scroll into view
            const rows = gsap.utils.toArray(".stack-row");

            rows.forEach((row) => {
                const items = row.querySelectorAll(".stack-animate-item");

                gsap.fromTo(items, 
                    { 
                        opacity: 0, 
                        y: 40,
                        scale: 0.9 
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        stagger: { amount: 0.4 },
                        ease: "expo.out",
                        force3D: true,
                        scrollTrigger: {
                            trigger: row,
                            start: "top 85%",
                            end: "bottom 15%",
                            toggleActions: "play reverse play reverse", 
                        }
                    }
                );
            });

            // Fade in the header with spinner when section enters view
            gsap.fromTo(".stack-main-header",
                { opacity: 0, x: -30 },
                {
                    opacity: 1, x: 0, duration: 0.8, ease: "expo.out", force3D: true,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play reverse play reverse",
                    }
                }
            );

            // Fade out entire section as you scroll past it
            gsap.to(sectionRef.current, {
                opacity: 0.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "bottom 95%",
                    end: "bottom 0%",
                    scrub: true,
                },
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section 
            ref={sectionRef} 
            id="stack" 
            className="relative py-24 md:py-32 z-10 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-8">
                
                {/* Header with spinner and title */}
                <div className="stack-main-header opacity-0 flex items-center gap-6 mb-16 lg:mb-24">
                    <StylishSpinner className="text-brand w-8 h-8 flex-shrink-0" />
                    <h2 className="text-2xl md:text-3xl tracking-[0.4em] text-secondary uppercase font-medium mt-1">
                        My Stack
                    </h2>
                </div>

                <div className="flex flex-col gap-16 md:gap-24">
                    {STACK.map((group, groupIdx) => (
                        <div key={groupIdx} className="stack-row grid grid-cols-1 lg:grid-cols-12 items-start gap-8 lg:gap-0">
                            
                            {/* Category title */}
                            <div className="lg:col-span-3 mb-10 lg:mb-0">
                                <h3 className="stack-animate-item opacity-0 text-4xl md:text-4xl font-display font-bold text-primary uppercase tracking-tighter opacity-80 origin-left">
                                    {group.category}
                                </h3>
                            </div>

                            {/* Tech items with icons */}
                            <div className="lg:col-span-9 flex flex-wrap gap-4 md:gap-6">
                                {group.items.map((item) => (
                                    <div 
                                        key={item.name} 
                                        className="stack-animate-item opacity-0 flex items-center gap-4 bg-white/[0.03] border border-white/5 px-6 py-3 rounded-xl hover:bg-brand/10 hover:border-brand/30 transition-all duration-300 group cursor-default origin-center"
                                    >
                                        <img 
                                            src={item.icon} 
                                            alt={item.name} 
                                            className="w-6 h-6 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                                            onError={(e) => { 
                                                e.target.src = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"; 
                                            }} 
                                        />
                                        <span className="text-md font-medium text-secondary group-hover:text-primary tracking-tight">
                                            {item.name}
                                        </span>
                                    </div>
                                ))}
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
