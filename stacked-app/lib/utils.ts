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
