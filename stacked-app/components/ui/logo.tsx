import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl",
};

export function Logo({ size = "md", className }: LogoProps) {
  return (
    <span
      className={cn(
        "font-bold tracking-wider inline-flex items-baseline",
        sizes[size],
        className
      )}
    >
      <span className="text-accent font-mono font-normal">[</span>
      <span className="text-white font-display">STACKED</span>
      <span className="text-accent font-mono font-normal">]</span>
    </span>
  );
}
