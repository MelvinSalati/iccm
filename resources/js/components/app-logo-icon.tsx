import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            fill="none"
            {...props}
        >
            <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EC4899" />
                    <stop offset="40%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
                <linearGradient id="innerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FDF2F8" />
                    <stop offset="100%" stopColor="#FCE7F3" />
                </linearGradient>
            </defs>

            {/* Main shield with gradient */}
            <path
                d="M20 5 L8 13 L8 26 C8 34 13 40 20 43 C27 40 32 34 32 26 L32 13 L20 5Z"
                fill="url(#logoGrad)"
            />

            {/* Inner white shield for contrast */}
            <path
                d="M20 9 L11 15 L11 25 C11 32 15 37 20 39 C25 37 29 32 29 25 L29 15 L20 9Z"
                fill="white"
                opacity="0.92"
            />

            {/* Medical cross */}
            <g stroke="url(#logoGrad)" strokeWidth="3" strokeLinecap="round">
                <path d="M20 17 L20 27" />
                <path d="M15 22 L25 22" />
            </g>

            {/* Small decorative circles */}
            <circle cx="14" cy="16" r="2" fill="#EC4899" opacity="0.4" />
            <circle cx="26" cy="16" r="2" fill="#3B82F6" opacity="0.4" />
            <circle cx="20" cy="33" r="1.5" fill="#8B5CF6" opacity="0.4" />

            {/* Bottom accent line */}
            <path
                d="M14 36 L20 38 L26 36"
                stroke="url(#logoGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.6"
            />
        </svg>
    );
}
