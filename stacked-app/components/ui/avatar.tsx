import { cn } from "@/lib/utils";

interface AvatarProps {
  initial: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "w-7 h-7 text-[10px]",
  md: "w-8 h-8 text-xs",
  lg: "w-14 h-14 text-xl",
};

export function Avatar({ initial, size = "md", className }: AvatarProps) {
  return (
    <div
      className={cn(
        "rounded-full bg-background-elevated flex items-center justify-center font-mono text-accent transition-all duration-250",
        "hover:bg-background-hover hover:shadow-[0_0_12px_rgba(200,255,0,0.15)]",
        sizeMap[size],
        className
      )}
    >
      {initial.charAt(0).toUpperCase()}
    </div>
  );
}
