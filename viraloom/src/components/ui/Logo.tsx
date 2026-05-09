"use client";

import { motion } from "framer-motion";

interface LogoProps {
  collapsed?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ collapsed = false, size = "md" }: LogoProps) {
  const sizes = {
    sm: { icon: 24, text: "text-lg" },
    md: { icon: 32, text: "text-xl" },
    lg: { icon: 44, text: "text-3xl" },
  };

  const s = sizes[size];

  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Logo Mark */}
      <div className="relative flex-shrink-0">
        <svg
          width={s.icon}
          height={s.icon}
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer glow ring */}
          <circle
            cx="22"
            cy="22"
            r="20"
            stroke="url(#logoGrad)"
            strokeWidth="2"
            opacity="0.3"
          />
          {/* Inner hexagonal shape */}
          <path
            d="M22 4L38 13V31L22 40L6 31V13L22 4Z"
            fill="url(#logoGrad)"
            opacity="0.15"
          />
          <path
            d="M22 4L38 13V31L22 40L6 31V13L22 4Z"
            stroke="url(#logoGrad)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* V + play arrow */}
          <path
            d="M15 15L22 30L29 15"
            stroke="url(#logoGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 20L26 20"
            stroke="url(#logoAccent)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
          />
          <defs>
            <linearGradient
              id="logoGrad"
              x1="6"
              y1="4"
              x2="38"
              y2="40"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#a78bfa" />
              <stop offset="1" stopColor="#22d3ee" />
            </linearGradient>
            <linearGradient
              id="logoAccent"
              x1="18"
              y1="20"
              x2="26"
              y2="20"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#22d3ee" />
              <stop offset="1" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
        </svg>
        {/* Ambient glow */}
        <div className="absolute inset-0 blur-lg opacity-30 bg-brand-500 rounded-full" />
      </div>

      {/* Wordmark */}
      {!collapsed && (
        <motion.span
          className={`${s.text} font-bold tracking-tight gradient-text-brand`}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          ViraLoom
        </motion.span>
      )}
    </motion.div>
  );
}
