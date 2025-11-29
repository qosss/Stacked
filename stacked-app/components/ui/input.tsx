import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "w-full bg-background-deep border border-border rounded-sm px-3 py-3 font-mono text-base text-text-primary",
          "hover:border-border-light",
          "focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(200,255,0,0.1)]",
          "placeholder:text-text-muted",
          "transition-all duration-200",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-text-primary",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
