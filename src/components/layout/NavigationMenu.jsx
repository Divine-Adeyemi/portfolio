import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LINKS } from "../../data/constants";

gsap.registerPlugin(ScrollTrigger);

export const NavigationMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const progressBarRef = useRef(null);

    useEffect(() => {
        gsap.to(progressBarRef.current, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
                trigger: document.documentElement,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.3,
            },
        });
    }, []);

    const navLinks = ["Home", "About Me", "Experience", "Projects"];
    
    const socialLinks = [
        { name: "Github", url: LINKS.github },
        { name: "Linkedin", url: LINKS.linkedin },
    ];
     
    return (
        <>
            {/* Email on left side */}
            <div className="fixed left-8 bottom-32 -rotate-90 origin-bottom-left z-40 hidden lg:block">
                <a 
                    href={LINKS.email} 
                    className="text-[10px] tracking-[0.3em] text-gray-500 hover:text-brand transition-colors font-body uppercase"
                >
                    {LINKS.email.replace("mailto:", "")}
                </a>
            </div>

            {/* Progress bar on right side */}
            <div className="fixed right-10 top-1/2 -translate-y-1/2 h-40 w-1.5 bg-gray-900 rounded-full z-40 hidden lg:block overflow-hidden">
                <div ref={progressBarRef} className="w-full h-full bg-brand origin-top scale-y-0 rounded-full" />
            </div>

            {/* Top navigation with logo and menu button */}
            <nav className="fixed top-0 left-0 w-full z-[110] px-8 py-8 flex justify-between items-center pointer-events-none">
                <div className="pointer-events-auto">
                    {/* Logo goes here */}
                </div>
                
                {/* Animated hamburger menu button */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative w-10 h-10 flex items-center justify-center pointer-events-auto group z-[120]"
                >
                    <div className="relative w-8 h-4">
                        <span className={`absolute left-0 w-8 h-[1.5px] bg-white transition-all duration-500 ${
                            isOpen ? "rotate-45 top-2 bg-brand" : "top-0"
                        }`}></span>
                        <span className={`absolute right-0 h-[1.5px] bg-white transition-all duration-500 ${
                            isOpen ? "-rotate-45 top-2 w-8 bg-brand" : "top-3 w-5 group-hover:w-8"
                        }`}></span>
                    </div>
                </button>
            </nav>

            {/* Side menu drawer */}
            <div 
                className={`fixed top-0 right-0 h-screen w-full lg:w-[60%] bg-void/80 backdrop-blur-2xl z-[100] border-l border-white/5 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="h-full w-full flex items-center px-5 md:px-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 w-full mt-20 lg:mt-0">
                        
                        {/* Social links column */}
                        <div className="order-2 lg:order-1">
                            <p className="text-gray-600 text-[10px] tracking-[0.4em] uppercase mb-5 border-b border-white/10 pb-2 inline-block">Social</p>
                            <ul className="space-y-2">
                                {socialLinks.map((link) => (
                                    <li key={link.name}>
                                        <a 
                                            href={link.url} 
                                            target="_blank" 
                                            rel="noreferrer" 
                                            className="relative inline-block text-lg text-gray-400 group overflow-hidden hover:text-white transition-colors"
                                        >
                                            {link.name}
                                            <span className="absolute left-0 top-6 h-[3px] w-0 bg-brand transition-all duration-300 group-hover:w-full"></span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-12">
                                <p className="text-gray-600 text-[10px] tracking-[0.4em] uppercase mb-4">Get in touch</p>
                                <a 
                                    href={LINKS.email} 
                                    className="text-sm font-mono text-brand hover:text-white transition-colors"
                                >
                                    {LINKS.email.replace("mailto:", "")}
                                </a>
                            </div>
                        </div>

                        {/* Navigation menu column */}
                        <div className="order-1 lg:order-2">
                            <p className="text-gray-600 text-[10px] tracking-[0.4em] uppercase mb-8 border-b border-white/10 pb-2 inline-block">Menu</p>
                            <ul className="space-y-2 lg:space-y-6">
                                {navLinks.map((link) => (
                                    <li key={link}>
                                        <a 
                                            href={`#${link.toLowerCase().replace(" ", "-")}`}
                                            onClick={() => setIsOpen(false)}
                                            className="group flex items-center text-3xl md:text-3xl lg:text-3xl font-display font-bold tracking-tighter hover:text-brand transition-all duration-300"
                                        >
                                            <span className="w-0 h-0 rounded-full bg-brand opacity-0 group-hover:w-3 group-hover:h-3 lg:group-hover:w-4 lg:group-hover:h-4 group-hover:opacity-100 group-hover:mr-4 lg:group-hover:mr-8 transition-all duration-300 ease-out"></span>
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};
