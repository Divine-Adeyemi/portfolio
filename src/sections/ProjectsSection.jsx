import React, { useState } from "react";
import { SELECTED_PROJECTS } from "../data/constants";
import { StylishSpinner } from "../components/ui/StylishSpinner";

export const ProjectsSection = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const isSomethingHoveredGlobal = hoveredIndex !== null;

    return (
        <section id="projects" className="relative py-16 md:py-32 min-h-svh z-10">
            <div className="max-w-7xl mx-auto px-8 w-full">
                
                {/* Header with spinner and title */}
                <div className="flex items-center gap-6 mb-10 lg:mb-24">
                    <StylishSpinner className="text-accent w-8 h-8 flex-shrink-0" />
                    <h2 className="text-xl md:text-3xl tracking-[0.2em] md:tracking-[0.4em] text-secondary uppercase font-medium mt-1">
                        Selected Projects
                    </h2>
                </div>
                
                <div className="flex flex-col lg:flex-row relative">
                    
                    {/* Left: Project list */}
                    <div className="w-full lg:w-[50%] flex flex-col z-20 pb-32 lg:pr-12">
                        {SELECTED_PROJECTS.map((project, index) => {
                            const isHovered = hoveredIndex === index;
                            const isSomethingHovered = hoveredIndex !== null;
                            const isMuted = isSomethingHovered && !isHovered;

                            return (
                                <a
                                    key={project.id}
                                    href={project.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    onPointerEnter={(e) => e.pointerType === "mouse" && setHoveredIndex(index)}
                                    onPointerLeave={(e) => e.pointerType === "mouse" && setHoveredIndex(null)}
                                    className={`group py-10 border-b border-primary/5 transition-all duration-700 ${
                                        isMuted ? "opacity-30 grayscale blur-[2px]" : "opacity-100 grayscale-0 blur-0"
                                    }`}
                                    style={{ willChange: "opacity, filter" }}
                                >
                                    <div className="flex items-baseline gap-3 md:gap-8">
                                        {/* Project number */}
                                        <span className={`w-10 md:w-14 shrink-0 tabular-nums text-xl md:text-3xl font-bold transition-colors duration-500 ${
                                                isHovered ? "text-secondary" : "text-tertiary"
                                        }`}>
                                            {project.id}
                                        </span>
                                        
                                        {/* Slide animation wrapper */}
                                        <div className="flex-1 transform transition-transform duration-[600ms] ease-out group-hover:translate-x-6">
                                            
                                            {/* Title and icon together */}
                                            <div className="flex items-center gap-3 mb-4 inline-flex">
                                                <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-primary transition-colors duration-[400ms] group-hover:text-accent">
                                                    {project.title}
                                                </h3>
                                                
                                                {/* External link icon appears on hover */}
                                                <svg 
                                                    className="w-8 h-8 md:w-10 md:h-10 text-primary transform opacity-0 scale-75 translate-y-3 touch:opacity-100 touch:scale-100 touch:translate-y-0 transition-all duration-[500ms] ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0" 
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor" 
                                                    strokeWidth="2"
                                                >
                                                    <path strokeLinecap="square" strokeLinejoin="miter" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </div>

                                            {/* Tech stack tags */}
                                            <div className="flex flex-wrap gap-x-3 gap-y-2 text-xs tracking-widest uppercase text-secondary">
                                                {project.stack.map((t, i) => (
                                                    <span key={i} className="flex items-center gap-3">
                                                        {t}
                                                        {i < project.stack.length - 1 && <span className="w-1 h-1 rounded-full bg-tertiary hidden sm:block" />}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Touch screens can't hover, so the preview sits inline on small screens */}
                                            <img
                                                src={project.image}
                                                alt={`${project.title} preview`}
                                                loading="lazy"
                                                className="lg:hidden mt-5 w-full aspect-[16/10] object-cover object-top rounded-lg border border-primary/10"
                                            />

                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>

                    {/* Right: Image preview window */}
                    <div className="hidden lg:block absolute right-0 top-0 w-[45%] h-full pointer-events-none z-10">
                        <div className={`sticky top-32 w-full aspect-[4/3] overflow-hidden rounded-xl bg-primary/[0.02] border border-primary/5 transition-opacity duration-500 ${isSomethingHoveredGlobal ? "opacity-100" : "opacity-0"}`}>
                            
                            {SELECTED_PROJECTS.map((project, index) => (
                                <img
                                    key={`img-${project.id}`}
                                    src={project.image || "https://placehold.co/800x600/111111/333333?text=Image+Coming+Soon"} 
                                    alt={`${project.title} preview`}
                                    className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-[800ms] ease-out ${
                                        hoveredIndex === index 
                                            ? "opacity-100 translate-y-0 scale-100" 
                                            : "opacity-0 -translate-y-12 scale-[1.02]"
                                    }`}
                                    style={{ willChange: "opacity, transform" }}
                                />
                            ))}
                            
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
