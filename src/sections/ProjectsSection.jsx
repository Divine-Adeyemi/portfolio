import React, { useState } from "react";
import { SELECTED_PROJECTS } from "../data/constants";
import { StylishSpinner } from "../components/ui/StylishSpinner";

export const ProjectsSection = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section id="projects" className="relative min-h-screen py-32 z-10">
            <div className="max-w-7xl mx-auto px-8 w-full">
                
                {/* Header with spinner and title */}
                <h2 className="text-sm tracking-widest text-gray-500 uppercase mb-16 flex items-center gap-4">
                    <StylishSpinner className="text-brand w-6 h-6" />
                    Selected Projects
                </h2>
                
                <div className="flex flex-col lg:flex-row relative">
                    
                    {/* Left: Project list */}
                    <div className="w-full lg:w-1/2 flex flex-col z-20 pb-32">
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
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    className={`group py-10 border-b border-white/5 transition-all duration-700 ${
                                        isMuted ? "opacity-30 grayscale blur-[2px]" : "opacity-100 grayscale-0 blur-0"
                                    }`}
                                    style={{ willChange: "opacity, filter" }}
                                >
                                    <div className="flex items-baseline gap-8">
                                        {/* Project number */}
                                        <span className={`text-xl md:text-3xl font-bold transition-colors duration-500 ${
                                                isHovered ? "text-gray-400" : "text-gray-600"
                                        }`}>
                                            {project.id}
                                        </span>
                                        
                                        {/* Slide animation wrapper */}
                                        <div className="flex-1 transform transition-transform duration-[600ms] ease-out group-hover:translate-x-6">
                                            
                                            {/* Title and icon together */}
                                            <div className="flex items-center gap-3 mb-4 inline-flex">
                                                <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white transition-colors duration-[400ms] group-hover:text-brand">
                                                    {project.title}
                                                </h3>
                                                
                                                {/* External link icon appears on hover */}
                                                <svg 
                                                    className="w-8 h-8 md:w-10 md:h-10 text-white transform opacity-0 scale-75 translate-y-3 transition-all duration-[500ms] ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0" 
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor" 
                                                    strokeWidth="2"
                                                >
                                                    <path strokeLinecap="square" strokeLinejoin="miter" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </div>

                                            {/* Tech stack tags */}
                                            <div className="flex flex-wrap gap-4 text-xs tracking-widest uppercase text-gray-500">
                                                {project.stack.map((t, i) => (
                                                    <span key={i} className="flex items-center gap-2">
                                                        {t}
                                                        {i < project.stack.length - 1 && <span className="w-1 h-1 rounded-full bg-gray-700 block" />}
                                                    </span>
                                                ))}
                                            </div>

                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>

                    {/* Right: Image preview window */}
                    <div className="hidden lg:block absolute right-0 top-0 w-[45%] h-full pointer-events-none z-10">
                        <div className="sticky top-32 w-full aspect-[4/3] overflow-hidden rounded-xl bg-white/[0.02] border border-white/5">
                            
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
