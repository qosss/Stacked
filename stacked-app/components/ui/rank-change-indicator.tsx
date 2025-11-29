"use client";

import { cn } from "@/lib/utils";

interface RankChangeIndicatorProps {
  currentRank: number;
  previousRank?: number;
  size?: "sm" | "md";
  showNew?: boolean;
}

export function RankChangeIndicator({
  currentRank,
  previousRank,
  size = "sm",
  showNew = true,
}: RankChangeIndicatorProps) {
  // No previous rank - show NEW badge if enabled
  if (previousRank === undefined) {
    if (!showNew) return null;
    return (
      <span
        className={cn(
          "inline-flex items-center font-bold text-accent animate-fade-in",
          size === "sm" ? "text-xs mr-1" : "text-sm mr-2"
        )}
      >
        NEW
      </span>
    );
  }

  // Calculate change (positive = moved up, negative = moved down)
  const change = previousRank - currentRank;

  // No change - show dot
  if (change === 0) {
    return (
      <span
        className={cn(
          "inline-flex items-center font-bold text-positive",
          size === "sm" ? "text-xs mr-1" : "text-sm mr-2"
        )}
      >
        •
      </span>
    );
  }

  // Moved up (lower rank number = better)
  if (change > 0) {
    return (
      <span
        className={cn(
          "inline-flex items-center font-bold text-positive animate-fade-in",
          size === "sm" ? "text-xs mr-1" : "text-sm mr-2"
        )}
      >
        <span className="mr-0.5">↑</span>
        {change}
      </span>
    );
  }

  // Moved down
  return (
    <span
      className={cn(
        "inline-flex items-center font-bold text-negative animate-fade-in",
        size === "sm" ? "text-xs mr-1" : "text-sm mr-2"
      )}
    >
      <span className="mr-0.5">↓</span>
      {Math.abs(change)}
    </span>
  );
}
