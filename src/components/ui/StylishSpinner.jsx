import React from "react";

export const StylishSpinner = ({ className = "" }) => {
    return (
        <div className={`inline-block select-none ${className}`}>
            <svg 
                width="40" 
                height="40" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="animate-[spin_4s_linear_infinite]"
            >
                {/* Vertical and horizontal lines */}
                <path 
                    d="M12 4V20M4 12H20" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round"
                    className="text-accent" 
                />
                {/* Diagonal lines with fade effect */}
                <path 
                    d="M7 7L17 17M17 7L7 17" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    className="text-accent opacity-30" 
                />
            </svg>
        </div>
    );
};