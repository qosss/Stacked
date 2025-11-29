"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  animated?: boolean;
}

const sizes = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl",
};

export function Logo({ size = "md", className, animated = false }: LogoProps) {
  const [isLoaded, setIsLoaded] = useState(!animated);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!animated) return;
    // Delay before animation starts so user sees closed brackets first
    const timer = setTimeout(() => setIsLoaded(true), 800);
    return () => clearTimeout(timer);
  }, [animated]);

  return (
    <span
      className={cn(
        "font-bold tracking-wider inline-flex items-baseline cursor-pointer select-none",
        sizes[size],
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left bracket */}
      <span
        className="text-accent font-mono font-normal"
        style={{
          transform: isLoaded
            ? isHovered
              ? "translateX(4px)"
              : "translateX(0)"
            : "translateX(calc(50% + 3.5ch))",
          transition: isLoaded
            ? "transform 0.2s ease-out"
            : "transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        [
      </span>

      {/* STACKED text - rises up with glow */}
      <span className="overflow-hidden">
        <span
          className={cn(
            "text-white font-display inline-block",
            isLoaded && "animate-logo-rise"
          )}
          style={{
            transform: isLoaded ? "translateY(0)" : "translateY(110%)",
            opacity: isLoaded ? 1 : 0,
            transition: isLoaded
              ? "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.25s, opacity 0.5s ease-out 0.25s"
              : "none",
          }}
        >
          STACKED
        </span>
      </span>

      {/* Right bracket */}
      <span
        className="text-accent font-mono font-normal"
        style={{
          transform: isLoaded
            ? isHovered
              ? "translateX(-4px)"
              : "translateX(0)"
            : "translateX(calc(-50% - 3.5ch))",
          transition: isLoaded
            ? "transform 0.2s ease-out"
            : "transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        ]
      </span>
    </span>
  );
}
