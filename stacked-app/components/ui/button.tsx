import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-mono font-bold rounded-sm transition-all duration-200 relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background-deep focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-text-inverse hover:bg-accent-hover shadow-[0_2px_8px_rgba(200,255,0,0.15)] hover:shadow-[0_4px_20px_rgba(200,255,0,0.3)] hover:-translate-y-0.5 active:translate-y-0",
        ghost:
          "bg-transparent text-text-muted border border-border hover:border-accent hover:text-accent hover:-translate-y-px",
        danger:
          "bg-transparent text-negative border border-negative/50 hover:bg-negative/10 hover:border-negative hover:-translate-y-px",
      },
      size: {
        default: "px-5 py-2.5 text-xs",
        sm: "px-4 py-2 text-xs",
        lg: "px-6 py-3 text-sm",
        icon: "h-9 w-9 p-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={loading || props.disabled}
        ref={ref}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
