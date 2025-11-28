import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/**
 * Format net worth with separate dollars and cents for styling
 */
export interface NetWorthFormatted {
  dollars: string; // e.g., "$5,200,000" or "-$1,234"
  cents: string; // e.g., ".84" or ".00"
  full: string; // e.g., "$5,200,000.84"
}

export function formatNetWorthWithCents(value: number): NetWorthFormatted {
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  const dollars = Math.floor(absValue);
  const cents = Math.round((absValue - dollars) * 100);

  const sign = isNegative ? "-" : "";
  const dollarsFormatted = dollars.toLocaleString("en-US");
  const centsFormatted = cents.toString().padStart(2, "0");

  return {
    dollars: `${sign}$${dollarsFormatted}`,
    cents: `.${centsFormatted}`,
    full: `${sign}$${dollarsFormatted}.${centsFormatted}`,
  };
}

/**
 * Get rank color class name for medal styling
 * Top 3 get medal colors (gold, silver, bronze), others get muted
 */
export function getRankColor(rank: number): string {
  if (rank === 1) return "text-rank-gold";
  if (rank === 2) return "text-rank-silver";
  if (rank === 3) return "text-rank-bronze";
  return "text-text-muted";
}

/**
 * Format net worth in compact form for leaderboard
 * e.g., $15.321M, $500.25K, $12,000
 */
export function formatNetWorthCompact(value: number): string {
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  const sign = isNegative ? "-" : "";

  if (absValue >= 1000000) {
    // Millions: $15.321M
    const millions = absValue / 1000000;
    return `${sign}$${millions.toFixed(3)}M`;
  } else if (absValue >= 1000) {
    // Thousands: $500.25K or just show full number for smaller values
    const thousands = absValue / 1000;
    if (absValue >= 100000) {
      return `${sign}$${thousands.toFixed(2)}K`;
    } else if (absValue >= 10000) {
      return `${sign}$${thousands.toFixed(2)}K`;
    } else {
      // Under 10K, show full number
      return `${sign}$${absValue.toLocaleString("en-US")}`;
    }
  } else {
    // Under 1000
    return `${sign}$${absValue.toLocaleString("en-US")}`;
  }
}
