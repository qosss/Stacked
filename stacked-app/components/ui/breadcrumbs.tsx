import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      className={cn("flex items-center gap-1 text-sm text-text-muted mb-6", className)}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <div key={`${item.href}-${index}`} className="flex items-center gap-1">
          {index > 0 && (
            <ChevronRight className="h-4 w-4 text-text-muted/50 flex-shrink-0" />
          )}
          {index === items.length - 1 ? (
            <span className="text-text-primary font-medium">{item.label}</span>
          ) : (
            <Link
              href={item.href}
              className="text-text-muted hover:text-accent transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
