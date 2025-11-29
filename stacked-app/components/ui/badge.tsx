import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center shrink-0 h-5 font-mono text-[11px] font-bold px-2 rounded-sm uppercase tracking-wider",
  {
    variants: {
      variant: {
        og: "bg-[#332d00] text-rank-gold",
        early: "bg-accent-dim text-accent",
        you: "bg-accent text-text-inverse",
        verified: "bg-positive/20 text-positive",
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
