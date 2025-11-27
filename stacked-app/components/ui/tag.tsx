import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tagVariants = cva(
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

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  children: React.ReactNode;
}

export function Tag({ className, variant, children, ...props }: TagProps) {
  return (
    <span className={cn(tagVariants({ variant, className }))} {...props}>
      {children}
    </span>
  );
}
