import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StylishSpinner } from "../components/ui/StylishSpinner";

gsap.registerPlugin(ScrollTrigger);

// ===== HIDDEN JOBS =====
/*
const EXPERIENCE = [
    {
        company: "Strativ AB",
        role: "Software Engineer (Frontend)",
        date: "Dec 2024 - Present",
        description: "Collaborated with cross-functional teams to build enterprise-level applications..."
    },
    {
        company: "Epikcoders",
        role: "Frontend Developer",
        date: "Oct 2023 - Nov 2024",
        description: "Developed and maintained user-facing features using modern React and Tailwind workflows..."
    },
    {
        company: "Anchorblock Technology",
        role: "Frontend Engineer",
        date: "Oct 2022 - Sep 2023",
        description: "Architected frontend solutions for Web3 and blockchain-adjacent platforms..."
    }
];
*/

// ===== ACTIVE JOBS =====
const EXPERIENCE = [
    {
        company: "Personal Projects",
        role: "React & JavaScript Web Apps",
        date: "Jan 2025 - Present",
        description: "Engineered interactive, logic-heavy web applications and games. Focused on complex state management, component lifecycles, and rendering performance outside of standard UI layouts."
    },
    {
        company: "Frontend Mentor",
        role: "Frontend Challenger",
        date: "Early 2025 - Present",
        description: "’ve completed several Frontend Mentor challenges to sharpen my skills in HTML, CSS, JavaScript, and ReactJS, focusing on responsive design and clean code."
    },
   
];

export const ExperienceSection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate each job row when it scrolls into view
            const rows = gsap.utils.toArray(".exp-row");

            rows.forEach((row) => {
                const items = row.querySelectorAll(".exp-animate-item");

                gsap.fromTo(items, 
                    { opacity: 0, y: 30, scale: 0.98 },
                    {
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        duration: 0.4,
                        stagger: 0.08,
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

            // Fade in section header
            gsap.fromTo(".exp-main-header",
                { opacity: 0, x: -20 },
                {
                    opacity: 1, x: 0, duration: 0.5, ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play reverse play reverse",
                    }
                }
            );

            // Fade out section as user scrolls past
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
            id="experience" 
            className="relative py-24 md:py-32 z-10 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-8">
                
                {/* Section Title */}
                <div className="exp-main-header opacity-0 flex items-center gap-4 mb-10">
                    <StylishSpinner className="text-brand w-6 h-6" />
                    <h2 className="text-2xl tracking-[0.5em] text-secondary uppercase font-medium">
                        Practical Experience
                    </h2>
                </div>

                {/* Job List */}
                <div className="flex flex-col gap-24">
                    {EXPERIENCE.map((job, idx) => (
                        <div key={idx} className="exp-row grid grid-cols-1 lg:grid-cols-12 items-start border-t border-white/5 pt-12 relative group">
                            
                            {/* Company Name & Date */}
                            <div className="lg:col-span-4 mb-6 lg:mb-0 flex flex-col gap-2">
                                <h3 className="exp-animate-item opacity-0 text-3xl md:text-4xl font-display font-bold text-primary tracking-tighter">
                                    {job.company}
                                </h3>
                                <span className="exp-animate-item opacity-0 text-sm font-medium text-brand tracking-widest uppercase mt-2">
                                    {job.date}
                                </span>
                            </div>

                            {/* Job Title & Description */}
                            <div className="lg:col-span-8 flex flex-col gap-6">
                                <h4 className="exp-animate-item opacity-0 text-3xl md:text-4xl font-display font-bold text-primary/80 tracking-tighter">
                                    {job.role}
                                </h4>
                                <p className="exp-animate-item opacity-0 text-lg md:text-xl text-secondary leading-relaxed font-body max-w-2xl">
                                    {job.description}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
