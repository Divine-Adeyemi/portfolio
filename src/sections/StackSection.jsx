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
                        y: 30,
                        scale: 0.9 
                    },
                    {
                        opacity: 1,
                        y: 1,
                        scale: 1,
                        duration: 0.05,
                        stagger: 0.5, 
                        ease: "back.out(1.5)",
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
                { opacity: 0, x: -20 },
                {
                    opacity: 1, x: 0, duration: 0.03, ease: "power3.out",
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
            className="relative py-24 md:py-48 z-10 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-8">
                
                {/* Header with spinner and title */}
                <div className="stack-main-header opacity-0 flex items-center gap-4 mb-10">
                    <StylishSpinner className="text-brand w-6 h-6" />
                    <h2 className="text-2xl tracking-[0.5em] text-secondary uppercase font-medium">
                        My Stack
                    </h2>
                </div>

                <div className="flex flex-col gap-32">
                    {STACK.map((group, groupIdx) => (
                        <div key={groupIdx} className="stack-row grid grid-cols-1 lg:grid-cols-12 items-start">
                            
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
