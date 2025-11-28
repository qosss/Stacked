import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-block font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider",
  {
    variants: {
      variant: {
        og: "bg-[#332d00] text-rank-gold",
        early: "bg-accent-dim text-accent",
        you: "bg-accent text-text-inverse",
      },
    },
    defaultVariants: {
      variant: "early",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

export function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props}>
      {children}
    </span>
  );
}
